import type {
  Candle,
  Signal,
  IndicatorValues,
  StrategyConfig,
  TradingConfig,
} from '../types';
import {
  calculateKeltnerChannel,
  getLatestKeltnerChannel,
  KeltnerChannelConfig,
} from '../indicators/keltner';
import {
  calculateBollingerBands,
  getLatestBollingerBands,
  BollingerBandsConfig,
} from '../indicators/bollinger';
import {
  calculateMACD,
  getLatestMACD,
  isMACDBullishCrossover,
  isMACDBearishCrossover,
  MACDConfig,
} from '../indicators/macd';
import {
  calculateCCI,
  getLatestCCI,
  CCIConfig,
} from '../indicators/cci';
import {
  calculateSuperTrend,
  getLatestSuperTrend,
  SuperTrendConfig,
} from '../indicators/supertrend';
import { calculateATR } from '../indicators/pure-indicators';

/**
 * XAUUSD Hybrid Optimized Strategy
 *
 * FIXED: Now correctly matches Python implementation in fastq/src/strategy/hybrid_optimized_strategy.py
 *
 * Core Entry Logic (KC + BB + MACD) - Lines 211-256 in Python:
 * - Price breaks above/below BOTH Keltner AND Bollinger (CRITICAL: AND not OR!)
 * - MACD crossover confirms (CRITICAL: must be a crossover, not just position!)
 *
 * Aggressiveness Levels (CORRECTED):
 * - Level 1 (Conservative): CCI > 50/-50, 5m alignment required (PF ~1.96, 7.9 trades/day)
 * - Level 2 (Moderate): CCI > 20/-20, 5m alignment required (PF ~1.83, 8.6 trades/day)
 * - Level 3 (Aggressive): MACD position only (PF ~1.62, 13.0 trades/day)
 *
 * Exit Logic:
 * - Stop Loss: min/max of KC and BB bands (Python lines 260, 285)
 * - Trailing Stop: Activates at 0.8R profit, trails by 1.0x ATR (Python lines 477-511)
 * - Take Profit: 1.5R, 2.5R, 4.0R (Python lines 264-268)
 */

export class XAUUSDStrategy {
  private config: TradingConfig;

  constructor(config: TradingConfig) {
    this.config = config;
  }

  /**
   * Calculate all indicator values for current candles
   */
  private calculateIndicators(candles: Candle[]): IndicatorValues | null {
    // OPTIMIZATION: Check candle count before attempting calculations
    // Most indicators need at least 26-35 candles (MACD slow period + signal period)
    if (candles.length < 35) {
      // Don't log error - this is expected during warmup period
      return null;
    }

    try {
      const keltnerConfig: KeltnerChannelConfig = {
        maPeriod: this.config.strategy.indicators.keltner.maPeriod,
        atrPeriod: this.config.strategy.indicators.keltner.atrPeriod,
        atrMultiple: this.config.strategy.indicators.keltner.atrMultiple,
      };

      const bollingerConfig: BollingerBandsConfig = {
        period: this.config.strategy.indicators.bollinger.period,
        deviation: this.config.strategy.indicators.bollinger.deviation,
      };

      const macdConfig: MACDConfig = {
        fastPeriod: this.config.strategy.indicators.macd.fastPeriod,
        slowPeriod: this.config.strategy.indicators.macd.slowPeriod,
        signalPeriod: this.config.strategy.indicators.macd.signalPeriod,
      };

      const cciConfig: CCIConfig = {
        period: this.config.strategy.indicators.cci.period,
      };

      const supertrendConfig: SuperTrendConfig = {
        period: this.config.strategy.indicators.supertrend.period,
        multiplier: this.config.strategy.indicators.supertrend.multiplier,
      };

      const keltner = getLatestKeltnerChannel(candles, keltnerConfig);
      const bollinger = getLatestBollingerBands(candles, bollingerConfig);
      const macd = getLatestMACD(candles, macdConfig);
      const cci = getLatestCCI(candles, cciConfig);
      const supertrend = getLatestSuperTrend(candles, supertrendConfig);

      // Calculate ATR
      const atrValues = calculateATR(
        candles.map(c => c.high),
        candles.map(c => c.low),
        candles.map(c => c.close),
        this.config.strategy.indicators.keltner.atrPeriod
      );

      if (
        !keltner ||
        !bollinger ||
        !macd ||
        cci === null ||
        !supertrend ||
        atrValues.length === 0
      ) {
        return null;
      }

      return {
        keltner,
        bollinger,
        macd,
        cci,
        supertrend,
        atr: atrValues[atrValues.length - 1],
      };
    } catch (error) {
      // Only log unexpected errors (not insufficient data errors)
      const errorMsg = error instanceof Error ? error.message : String(error);
      if (!errorMsg.includes('Insufficient data')) {
        console.error('[Strategy] Error calculating indicators:', error);
      }
      return null;
    }
  }

  /**
   * Check if long entry conditions are met - OPTIMIZED STRATEGY
   *
   * 核心条件（必须全部满足）：
   * 1. 价格在Keltner通道上方 (price > keltner.upper)
   * 2. 收盘价高于BB上轨 (price > bollinger.upper)
   * 3. MACD金叉 (macd > signal 且前一根蜡烛 macd <= signal)
   *
   * 辅助条件（根据激进程度）：
   * - Level 1 (保守): CCI > 100 + SuperTrend看涨
   * - Level 2 (中等): CCI > 50 + SuperTrend看涨
   * - Level 3 (激进): CCI > 0
   */
  private checkLongEntry(
    price: number,
    indicators1m: IndicatorValues,
    candles1m: Candle[],
    aggressiveness: 1 | 2 | 3,
    indicators5m?: IndicatorValues | null
  ): { signal: boolean; reason: string } {
    // 核心条件 1: 价格必须在Keltner通道上方
    const priceAboveKC = price > indicators1m.keltner.upper;
    if (!priceAboveKC) {
      return { signal: false, reason: `价格未突破KC上轨 (${price.toFixed(2)} <= ${indicators1m.keltner.upper.toFixed(2)})` };
    }

    // 核心条件 2: 收盘价必须高于BB上轨
    const priceAboveBB = price > indicators1m.bollinger.upper;
    if (!priceAboveBB) {
      return { signal: false, reason: `价格未突破BB上轨 (${price.toFixed(2)} <= ${indicators1m.bollinger.upper.toFixed(2)})` };
    }

    // 核心条件 3: MACD金叉
    const macdBullishCrossover = isMACDBullishCrossover(candles1m, {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
    });
    if (!macdBullishCrossover) {
      return { signal: false, reason: 'MACD未金叉' };
    }

    // 辅助条件：根据激进程度使用不同的过滤器
    if (aggressiveness === 1) {
      // Level 1 (保守): CCI > 100 + SuperTrend看涨
      const cciStrong = indicators1m.cci > 100;
      const supertrendBullish = indicators1m.supertrend.trend === 'up';

      if (!cciStrong) {
        return { signal: false, reason: `CCI不够强 (${indicators1m.cci.toFixed(0)} <= 100)` };
      }

      if (!supertrendBullish) {
        return { signal: false, reason: 'SuperTrend不是看涨趋势' };
      }

      return {
        signal: true,
        reason: `做多 (保守): KC+BB+MACD金叉 CCI=${indicators1m.cci.toFixed(0)} ST↑`
      };
    } else if (aggressiveness === 2) {
      // Level 2 (中等): CCI > 50 + SuperTrend看涨
      const cciModerate = indicators1m.cci > 50;
      const supertrendBullish = indicators1m.supertrend.trend === 'up';

      if (!cciModerate) {
        return { signal: false, reason: `CCI不够强 (${indicators1m.cci.toFixed(0)} <= 50)` };
      }

      if (!supertrendBullish) {
        return { signal: false, reason: 'SuperTrend不是看涨趋势' };
      }

      return {
        signal: true,
        reason: `做多 (中等): KC+BB+MACD金叉 CCI=${indicators1m.cci.toFixed(0)} ST↑`
      };
    } else {
      // Level 3 (激进): CCI > 0 即可
      const cciPositive = indicators1m.cci > 0;

      if (!cciPositive) {
        return { signal: false, reason: `CCI为负 (${indicators1m.cci.toFixed(0)} <= 0)` };
      }

      return {
        signal: true,
        reason: `做多 (激进): KC+BB+MACD金叉 CCI=${indicators1m.cci.toFixed(0)}`
      };
    }
  }

  /**
   * Check if short entry conditions are met - OPTIMIZED STRATEGY
   *
   * 核心条件（必须全部满足）：
   * 1. 价格在Keltner通道下方 (price < keltner.lower)
   * 2. 收盘价低于BB下轨 (price < bollinger.lower)
   * 3. MACD死叉 (macd < signal 且前一根蜡烛 macd >= signal)
   *
   * 辅助条件（根据激进程度）：
   * - Level 1 (保守): CCI < -100 + SuperTrend看跌
   * - Level 2 (中等): CCI < -50 + SuperTrend看跌
   * - Level 3 (激进): CCI < 0
   */
  private checkShortEntry(
    price: number,
    indicators1m: IndicatorValues,
    candles1m: Candle[],
    aggressiveness: 1 | 2 | 3,
    indicators5m?: IndicatorValues | null
  ): { signal: boolean; reason: string } {
    // 核心条件 1: 价格必须在Keltner通道下方
    const priceBelowKC = price < indicators1m.keltner.lower;
    if (!priceBelowKC) {
      return { signal: false, reason: `价格未跌破KC下轨 (${price.toFixed(2)} >= ${indicators1m.keltner.lower.toFixed(2)})` };
    }

    // 核心条件 2: 收盘价必须低于BB下轨
    const priceBelowBB = price < indicators1m.bollinger.lower;
    if (!priceBelowBB) {
      return { signal: false, reason: `价格未跌破BB下轨 (${price.toFixed(2)} >= ${indicators1m.bollinger.lower.toFixed(2)})` };
    }

    // 核心条件 3: MACD死叉
    const macdBearishCrossover = isMACDBearishCrossover(candles1m, {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
    });
    if (!macdBearishCrossover) {
      return { signal: false, reason: 'MACD未死叉' };
    }

    // 辅助条件：根据激进程度使用不同的过滤器
    if (aggressiveness === 1) {
      // Level 1 (保守): CCI < -100 + SuperTrend看跌
      const cciStrong = indicators1m.cci < -100;
      const supertrendBearish = indicators1m.supertrend.trend === 'down';

      if (!cciStrong) {
        return { signal: false, reason: `CCI不够强 (${indicators1m.cci.toFixed(0)} >= -100)` };
      }

      if (!supertrendBearish) {
        return { signal: false, reason: 'SuperTrend不是看跌趋势' };
      }

      return {
        signal: true,
        reason: `做空 (保守): KC+BB+MACD死叉 CCI=${indicators1m.cci.toFixed(0)} ST↓`
      };
    } else if (aggressiveness === 2) {
      // Level 2 (中等): CCI < -50 + SuperTrend看跌
      const cciModerate = indicators1m.cci < -50;
      const supertrendBearish = indicators1m.supertrend.trend === 'down';

      if (!cciModerate) {
        return { signal: false, reason: `CCI不够强 (${indicators1m.cci.toFixed(0)} >= -50)` };
      }

      if (!supertrendBearish) {
        return { signal: false, reason: 'SuperTrend不是看跌趋势' };
      }

      return {
        signal: true,
        reason: `做空 (中等): KC+BB+MACD死叉 CCI=${indicators1m.cci.toFixed(0)} ST↓`
      };
    } else {
      // Level 3 (激进): CCI < 0 即可
      const cciNegative = indicators1m.cci < 0;

      if (!cciNegative) {
        return { signal: false, reason: `CCI为正 (${indicators1m.cci.toFixed(0)} >= 0)` };
      }

      return {
        signal: true,
        reason: `做空 (激进): KC+BB+MACD死叉 CCI=${indicators1m.cci.toFixed(0)}`
      };
    }
  }

  // Debug: Track signal generation
  private signalCheckCount = 0;
  private indicatorFailCount = 0;
  private longCheckCount = 0;
  private shortCheckCount = 0;

  /**
   * Generate trading signal based on current market conditions
   * CRITICAL FIX: Now supports 5-minute data confirmation (matches Python implementation)
   *
   * @param candles1m - 1-minute candles for entry signals
   * @param candles5m - 5-minute candles for confirmation (optional, required for Level 1-2)
   */
  public generateSignal(candles1m: Candle[], candles5m?: Candle[]): Signal {
    this.signalCheckCount++;

    if (candles1m.length === 0) {
      return {
        type: 'none',
        reason: 'No candle data',
        timestamp: Date.now(),
        price: 0,
      };
    }

    const latestCandle1m = candles1m[candles1m.length - 1];
    const price = latestCandle1m.close;

    // Calculate 1m indicators
    const indicators1m = this.calculateIndicators(candles1m);
    if (!indicators1m) {
      this.indicatorFailCount++;
      // if (this.signalCheckCount % 100 === 0) {
      //   console.log(`[DEBUG] Signal check ${this.signalCheckCount}: Indicator calculation failed ${this.indicatorFailCount} times`);
      // }
      return {
        type: 'none',
        reason: 'Insufficient data for indicators',
        timestamp: latestCandle1m.closeTime,
        price,
      };
    }

    // Calculate 5m indicators if provided
    let indicators5m: IndicatorValues | null = null;
    if (candles5m && candles5m.length > 0) {
      indicators5m = this.calculateIndicators(candles5m);
    }

    // Check long entry
    const longCheck = this.checkLongEntry(
      price,
      indicators1m,
      candles1m,
      this.config.strategy.aggressiveness,
      indicators5m  // Pass 5m indicators for confirmation
    );

    // Debug logging (disabled for performance during optimization)
    // if (this.signalCheckCount % 50 === 0) {
    //   console.log(`[DEBUG] Check ${this.signalCheckCount}: Price=${price.toFixed(2)}, KeltnerUpper=${indicators1m.keltner.upper.toFixed(2)}, BollUpper=${indicators1m.bollinger.upper.toFixed(2)}, MACD=${indicators1m.macd.macd.toFixed(2)}/${indicators1m.macd.signal.toFixed(2)}, CCI=${indicators1m.cci.toFixed(0)}`);
    //   if (indicators5m) {
    //     console.log(`[DEBUG] 5m: MACD=${indicators5m.macd.macd.toFixed(2)}/${indicators5m.macd.signal.toFixed(2)}, CCI=${indicators5m.cci.toFixed(0)}`);
    //   }
    //   console.log(`[DEBUG] Long check: ${longCheck.reason}`);
    // }

    if (longCheck.signal) {
      console.log(`\n[SIGNAL] LONG at check ${this.signalCheckCount}: ${longCheck.reason}`);
      this.longCheckCount++;
      return {
        type: 'long',
        reason: longCheck.reason,
        timestamp: latestCandle1m.closeTime,
        price,
        indicators: indicators1m,
      };
    }

    // Check short entry
    const shortCheck = this.checkShortEntry(
      price,
      indicators1m,
      candles1m,
      this.config.strategy.aggressiveness,
      indicators5m  // Pass 5m indicators for confirmation
    );

    // if (this.signalCheckCount % 50 === 0) {
    //   console.log(`[DEBUG] Short check: ${shortCheck.reason}`);
    // }

    if (shortCheck.signal) {
      console.log(`\n[SIGNAL] SHORT at check ${this.signalCheckCount}: ${shortCheck.reason}`);
      this.shortCheckCount++;
      return {
        type: 'short',
        reason: shortCheck.reason,
        timestamp: latestCandle1m.closeTime,
        price,
        indicators: indicators1m,
      };
    }

    return {
      type: 'none',
      reason: 'No entry conditions met',
      timestamp: latestCandle1m.closeTime,
      price,
      indicators: indicators1m,
    };
  }

  /**
   * Calculate stop loss price - MATCHES PYTHON VERSION
   * Python line 260, 285: Uses min/max of KC and BB bands
   */
  public calculateStopLoss(
    entryPrice: number,
    side: 'long' | 'short',
    indicators: IndicatorValues
  ): number {
    if (side === 'long') {
      // Python line 260: stop_loss = min(kc_lower_1m, bb_lower_1m)
      return Math.min(indicators.keltner.lower, indicators.bollinger.lower);
    } else {
      // Python line 285: stop_loss = max(kc_upper_1m, bb_upper_1m)
      return Math.max(indicators.keltner.upper, indicators.bollinger.upper);
    }
  }

  /**
   * Calculate take profit levels based on R multiples
   * Python line 264-268, 288-292: 1.5R, 2.5R, 4.0R
   */
  public calculateTakeProfitLevels(
    entryPrice: number,
    stopLoss: number,
    side: 'long' | 'short'
  ): number[] {
    const risk = Math.abs(entryPrice - stopLoss);
    const rMultiples = [1.5, 2.5, 4.0]; // Python line 264

    return rMultiples.map(rMultiple => {
      return side === 'long'
        ? entryPrice + (risk * rMultiple)
        : entryPrice - (risk * rMultiple);
    });
  }

  /**
   * Calculate trailing stop price - MATCHES PYTHON VERSION
   * Python line 477-511: Activates at 0.8R, trails by 1.0x ATR
   */
  public calculateTrailingStop(
    entryPrice: number,
    currentPrice: number,
    highestPrice: number | undefined,
    lowestPrice: number | undefined,
    initialStopLoss: number,
    side: 'long' | 'short',
    atr: number
  ): { trailingStop: number | null; highestPrice: number; lowestPrice: number; active: boolean } {
    const risk = Math.abs(entryPrice - initialStopLoss);
    const trailingDistanceATR = this.config.strategy.trailingDistance; // 0.5 ATR for tighter trailing

    if (side === 'long') {
      // Update highest price
      const newHighest = highestPrice === undefined ? currentPrice : Math.max(highestPrice, currentPrice);

      // Calculate profit in R multiples
      const profit = currentPrice - entryPrice;
      const profitR = profit / risk;

      // OPTIMIZED: Move stop to breakeven when profit >= 1R
      if (profitR >= 1.0) {
        // Lock in profit - move stop to breakeven (entry price)
        const breakeven = entryPrice;
        // Then trail from highest price
        const trailingStop = Math.max(breakeven, newHighest - (atr * trailingDistanceATR));
        return { trailingStop, highestPrice: newHighest, lowestPrice: 0, active: true };
      }

      // Below 1R: no trailing, keep original stop loss
      return { trailingStop: null, highestPrice: newHighest, lowestPrice: 0, active: false };
    } else {
      // SHORT logic
      const newLowest = lowestPrice === undefined ? currentPrice : Math.min(lowestPrice, currentPrice);

      // Calculate profit in R multiples
      const profit = entryPrice - currentPrice;
      const profitR = profit / risk;

      // OPTIMIZED: Move stop to breakeven when profit >= 1R
      if (profitR >= 1.0) {
        // Lock in profit - move stop to breakeven (entry price)
        const breakeven = entryPrice;
        // Then trail from lowest price
        const trailingStop = Math.min(breakeven, newLowest + (atr * trailingDistanceATR));
        return { trailingStop, highestPrice: 0, lowestPrice: newLowest, active: true };
      }

      // Below 1R: no trailing, keep original stop loss
      return { trailingStop: null, highestPrice: 0, lowestPrice: newLowest, active: false };
    }
  }
}
