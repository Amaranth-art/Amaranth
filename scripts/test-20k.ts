/**
 * 20000根K线回测（约2周数据）
 */

import { BacktestEngine } from '../src/lib/trading/backtest/engine';
import { HistoricalDataProvider } from '../src/lib/trading/connectors/historicalDataProvider';
import type { TradingConfig } from '../src/lib/trading/types';

async function test20k() {
  console.log('🎯 回调策略 - 20000根K线回测（约2周）\n');

  const historicalProvider = new HistoricalDataProvider();
  const endDate = Date.now();
  const startDate = endDate - (14 * 24 * 60 * 60 * 1000);
  const initialCapital = 100000;

  console.log('📊 生成20000根K线...');
  const candles = await historicalProvider.generateHistoricalCandles(
    'XAUUSDT',
    '1m',
    20000,
    startDate,
    endDate
  );
  console.log(`✅ 生成了 ${candles.length} 根K线\n`);

  const config: TradingConfig = {
    symbol: 'XAUUSDT',
    interval: '1m',
    strategy: {
      aggressiveness: 3,
      trailingActivation: 1.5,
      trailingDistance: 1.0,
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
      stopLossMultiple: 2.0,
      takeProfitLevels: [3.0, 6.0, 9.0],
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

  console.log('='.repeat(80));
  console.log('📈 回测结果:\n');
  console.log(`总交易次数: ${result.totalTrades}`);
  console.log(`盈利交易: ${result.winningTrades || 0}`);
  console.log(`亏损交易: ${result.losingTrades || 0}`);
  console.log(`胜率: ${((result.winningTrades || 0) / result.totalTrades * 100).toFixed(2)}%`);
  console.log(`盈亏比: ${result.profitFactor.toFixed(2)}`);
  console.log(`总收益: ${(result.totalPnlPercent || 0).toFixed(2)}%`);
  console.log(`最终资金: $${(result.endCapital || initialCapital).toFixed(2)}`);
  console.log(`最大回撤: ${(result.maxDrawdownPercent || 0).toFixed(2)}%`);
  console.log('='.repeat(80));

  console.log('\n🎯 目标达成情况:');
  console.log(`盈亏比 ${result.profitFactor >= 1.5 ? '✅' : '❌'} ${result.profitFactor.toFixed(2)} (目标 >=1.5)`);
  console.log(`总收益 ${(result.totalPnlPercent || 0) > 0 ? '✅' : '❌'} ${(result.totalPnlPercent || 0).toFixed(2)}% (目标 >0%)`);

  if (result.profitFactor >= 1.5 && (result.totalPnlPercent || 0) > 0) {
    console.log('\n🎉 策略表现优秀！');
  } else if (result.profitFactor >= 1.0) {
    console.log('\n✅ 策略有盈利能力');
  } else {
    console.log('\n⚠️ 需要优化');
  }
}

test20k()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('测试失败:', err);
    process.exit(1);
  });
