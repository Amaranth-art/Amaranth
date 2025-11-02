"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import type { TradingConfig, BacktestResult } from '@/lib/trading/types';

const ProfitChart = dynamic(() => import('./ProfitChart'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">加载图表中...</div>
});

interface BacktestPanelProps {
  tradingConfig: TradingConfig;
}

export default function BacktestPanel({ tradingConfig }: BacktestPanelProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BacktestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Date range state
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [initialCapital, setInitialCapital] = useState(10000);
  const [useHistoricalData, setUseHistoricalData] = useState(true);

  const runBacktest = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/trading/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: new Date(startDate).getTime(),
          endDate: new Date(endDate).getTime(),
          initialCapital,
          tradingConfig,
          useTestnet: true,
          useHistoricalData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Backtest failed');
      }

      const data: BacktestResult = await response.json();
      setResults(data);

      // Save results to localStorage for history page
      localStorage.setItem('latest_backtest_results', JSON.stringify(data));
      localStorage.setItem('latest_backtest_timestamp', Date.now().toString());

      // Save candles if included in response
      if ((data as any).candles) {
        localStorage.setItem('latest_backtest_candles', JSON.stringify((data as any).candles));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          回测参数配置
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              开始日期
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              结束日期
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              初始资金 (USDT)
            </label>
            <input
              type="number"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useHistoricalData}
              onChange={(e) => setUseHistoricalData(e.target.checked)}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              使用模拟历史数据 (不需要Binance连接)
            </span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-8">
            {useHistoricalData
              ? ' 将使用确定性算法生成的历史数据，每次运行相同参数结果一致'
              : ' 将尝试从Binance获取真实历史数据，需要API凭证'}
          </p>
        </div>

        <button
          onClick={runBacktest}
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              运行中...
            </span>
          ) : ' 运行回测'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-4"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">错误</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Data Source Info */}
          {(results as any).dataSource && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  数据来源: {(results as any).dataSource === 'binance' ? 'Binance API (真实数据)' : '模拟历史数据 (确定性生成)'}
                </p>
              </div>
            </div>
          )}

          {/* Performance Overview */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">核心表现指标</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="总交易次数"
                value={results.totalTrades.toString()}
                icon=""
                color="blue"
              />
              <MetricCard
                title="胜率"
                value={`${(results.winRate || 0).toFixed(1)}%`}
                icon=""
                color="green"
              />
              <MetricCard
                title="盈亏因子"
                value={(results.profitFactor || 0).toFixed(2)}
                icon=""
                color="purple"
              />
              <MetricCard
                title="总收益"
                value={`$${(results.totalPnl || 0).toFixed(2)}`}
                subtitle={`${(results.totalPnlPercent || 0) >= 0 ? '+' : ''}${(results.totalPnlPercent || 0).toFixed(2)}%`}
                icon={(results.totalPnl || 0) >= 0 ? '' : ''}
                color={(results.totalPnl || 0) >= 0 ? 'green' : 'red'}
              />
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">详细统计</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="最大回撤"
                value={`$${(results.maxDrawdown || 0).toFixed(2)}`}
                subtitle={`${(results.maxDrawdownPercent || 0).toFixed(2)}%`}
                icon=""
                color="red"
              />
              <MetricCard
                title="平均盈利"
                value={`$${(results.averageWin || 0).toFixed(2)}`}
                icon=""
                color="green"
              />
              <MetricCard
                title="平均亏损"
                value={`$${Math.abs(results.averageLoss || 0).toFixed(2)}`}
                icon=""
                color="red"
              />
              <MetricCard
                title="日均交易"
                value={(results.tradesPerDay || 0).toFixed(1)}
                icon=""
                color="blue"
              />
            </div>
          </div>

          {/* Equity Curve Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2"></span>
              资金曲线
            </h3>
            <ProfitChart results={results} />
          </div>

          {/* Trade List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2"></span>
              交易记录 ({results.trades.length})
            </h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">时间</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">方向</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">入场价</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">出场价</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">盈亏</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">退出原因</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.trades.slice(0, 50).map((trade) => (
                    <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {new Date(trade.entryTime).toLocaleString('zh-CN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          trade.side === 'long'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {trade.side === 'long' ? '做多 ' : '做空 '}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium text-gray-900 dark:text-gray-100">
                        ${trade.entryPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium text-gray-900 dark:text-gray-100">
                        ${trade.exitPrice?.toFixed(2) || '-'}
                      </td>
                      <td className={`px-4 py-3 text-right font-mono font-bold ${
                        (trade.pnl || 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {(trade.pnl || 0) >= 0 ? '+' : ''}${trade.pnl?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getExitReasonStyle(trade.exitReason)}`}>
                          {getExitReasonText(trade.exitReason)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.trades.length > 50 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-center border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    仅显示前 50 笔交易 (共 {results.trades.length} 笔)
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color: 'blue' | 'green' | 'red' | 'purple';
}

function MetricCard({ title, value, subtitle, icon, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20',
    green: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20',
    red: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
    purple: 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20',
  };

  const textColorClasses = {
    blue: 'text-blue-900 dark:text-blue-100',
    green: 'text-green-900 dark:text-green-100',
    red: 'text-red-900 dark:text-red-100',
    purple: 'text-purple-900 dark:text-purple-100',
  };

  return (
    <div className={`border-2 rounded-xl p-4 transition-all hover:shadow-lg ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{title}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className={`text-2xl font-bold ${textColorClasses[color]}`}>{value}</p>
      {subtitle && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function getExitReasonText(reason?: string): string {
  const reasons: Record<string, string> = {
    'stop_loss': '止损 ',
    'take_profit': '止盈 ',
    'trailing_stop': '跟踪止损 ',
    'signal': '反向信号 ',
    'daily_limit': '日限额 ⏸️',
    'drawdown_limit': '回撤限制 ',
  };
  return reasons[reason || ''] || '未知';
}

function getExitReasonStyle(reason?: string): string {
  const styles: Record<string, string> = {
    'stop_loss': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'take_profit': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'trailing_stop': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'signal': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'daily_limit': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'drawdown_limit': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  };
  return styles[reason || ''] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}
