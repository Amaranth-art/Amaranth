/**
 * 快速测试改进后的策略
 */

import { BacktestEngine } from '../src/lib/trading/backtest/engine';
import { HistoricalDataProvider } from '../src/lib/trading/connectors/historicalDataProvider';
import type { TradingConfig } from '../src/lib/trading/types';

async function quickTest() {
  console.log('🎯 全新回调策略测试 - 趋势回调入场，不追突破\n');

  const historicalProvider = new HistoricalDataProvider();
  const endDate = Date.now();
  const startDate = endDate - (30 * 24 * 60 * 60 * 1000); // 30天
  const initialCapital = 100000;

  console.log('📊 生成50000根K线（约1个月）...');
  const candles = await historicalProvider.generateHistoricalCandles(
    'XAUUSDT',
    '1m',
    50000, // 5倍数据量
    startDate,
    endDate
  );
  console.log(`✅ 生成了 ${candles.length} 根K线\n`);

  const config: TradingConfig = {
    symbol: 'XAUUSDT',
    interval: '1m',
    strategy: {
      aggressiveness: 3,
      // 回调策略: 适中的跟踪止损参数
      trailingActivation: 1.5,   // 1.5R激活
      trailingDistance: 1.0,      // 1 ATR距离
      indicators: {
        keltner: { maPeriod: 20, atrPeriod: 14, atrMultiple: 1.5 },
        bollinger: { period: 20, deviation: 2.0 },
        macd: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
        cci: { period: 14 },
        supertrend: { period: 10, multiplier: 3.0 },
      },
    },
    risk: {
      maxDailyLoss: 90000,
      maxDrawdown: 0.50,
      maxPositions: 1,
      positionSize: 0.01,
      leverage: 20,
      // 回调策略FINAL: 2 ATR止损，3R/6R/9R止盈
      stopLossMultiple: 2.0,               // 适中止损
      takeProfitLevels: [3.0, 6.0, 9.0],   // 最终目标，力求1.5+盈亏比
    },
  };

  console.log('🚀 运行回测...\n');
  const engine = new BacktestEngine({
    startDate,
    endDate,
    initialCapital,
    tradingConfig: config,
  });

  const result = await engine.runBacktest(candles);

  console.log('=' .repeat(80));
  console.log('📈 改进后策略测试结果:\n');
  console.log(`总交易次数: ${result.totalTrades}`);
  console.log(`盈利交易: ${result.winningTrades || 0}`);
  console.log(`亏损交易: ${result.losingTrades || 0}`);
  console.log(`胜率: ${((result.winningTrades || 0) / result.totalTrades * 100).toFixed(2)}%`);
  console.log(`盈亏比: ${result.profitFactor.toFixed(2)}`);
  console.log(`平均盈利: $${(result.averageWin || 0).toFixed(2)}`);
  console.log(`平均亏损: $${Math.abs(result.averageLoss || 0).toFixed(2)}`);
  console.log(`最大单笔盈利: $${(result.largestWin || 0).toFixed(2)}`);
  console.log(`最大单笔亏损: $${Math.abs(result.largestLoss || 0).toFixed(2)}`);
  console.log(`总收益: ${(result.totalPnlPercent || 0).toFixed(2)}%`);
  console.log(`净盈亏: $${(result.totalPnl || 0).toFixed(2)}`);
  console.log(`最终资金: $${(result.endCapital || initialCapital).toFixed(2)}`);
  console.log(`最大回撤: ${(result.maxDrawdownPercent || 0).toFixed(2)}%`);
  console.log('=' .repeat(80));

  console.log('\n🎯 目标达成情况:');
  console.log(`盈亏比 ${result.profitFactor >= 1.5 ? '✅' : '❌'} ${result.profitFactor.toFixed(2)} (目标 >=1.5)`);
  console.log(`总收益 ${(result.totalPnlPercent || 0) > 0 ? '✅' : '❌'} ${(result.totalPnlPercent || 0).toFixed(2)}% (目标 >0%)`);

  if (result.profitFactor >= 1.5 && (result.totalPnlPercent || 0) > 0) {
    console.log('\n🎉 改进成功！盈亏比达标！');
  } else if (result.profitFactor >= 1.0) {
    console.log('\n✅ 有进步！继续优化中。');
  } else if (result.profitFactor < 0.5) {
    console.log('\n⚠️ 策略需要重新设计。当前改进方向可能不对。');
  } else {
    console.log('\n⚠️ 需要进一步调整参数。');
  }

  console.log('\n📊 详细分析:');
  console.log(`- 平均每笔盈利: $${(result.averageWin || 0).toFixed(2)}`);
  console.log(`- 平均每笔亏损: $${Math.abs(result.averageLoss || 0).toFixed(2)}`);
  const winRate = result.winRate / 100;
  const loseRate = 1 - winRate;
  const expectedValue = winRate * (result.averageWin || 0) + loseRate * (result.averageLoss || 0);
  console.log(`- 期望收益: $${expectedValue.toFixed(2)}`);
}

quickTest().catch(console.error);
