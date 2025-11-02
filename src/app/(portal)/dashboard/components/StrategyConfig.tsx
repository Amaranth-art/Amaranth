"use client";

import React, { useState, useEffect } from 'react';
import type { TradingConfig } from '@/lib/trading/types';

interface StrategyConfigProps {
  config: TradingConfig;
  onConfigChange: (config: TradingConfig) => void;
}

export default function StrategyConfig({ config, onConfigChange }: StrategyConfigProps) {
  const [popularSymbols, setPopularSymbols] = useState<string[]>([]);
  const [loadingSymbols, setLoadingSymbols] = useState(false);

  // 热门交易对列表（默认）
  const defaultSymbols = [
    'XAUUSDT', // 黄金
    'BTCUSDT', // 比特币
    'ETHUSDT', // 以太坊
    'SOLUSDT', // Solana
    'BNBUSDT', // BNB
    'ADAUSDT', // Cardano
    'DOGEUSDT', // Dogecoin
    'MATICUSDT', // Polygon
  ];

  useEffect(() => {
    // 从Binance获取热门交易对
    const fetchPopularSymbols = async () => {
      setLoadingSymbols(true);
      try {
        const response = await fetch('https://testnet.binancefuture.com/fapi/v1/exchangeInfo');
        if (response.ok) {
          const data = await response.json();
          const usdtSymbols = data.symbols
            .filter((s: any) => s.symbol.endsWith('USDT') && s.status === 'TRADING')
            .map((s: any) => s.symbol)
            .slice(0, 20); // 取前20个
          setPopularSymbols(usdtSymbols.length > 0 ? usdtSymbols : defaultSymbols);
        } else {
          setPopularSymbols(defaultSymbols);
        }
      } catch (error) {
        console.error('Failed to fetch symbols:', error);
        setPopularSymbols(defaultSymbols);
      } finally {
        setLoadingSymbols(false);
      }
    };

    fetchPopularSymbols();
  }, []);

  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...config };
    let current: any = newConfig;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    onConfigChange(newConfig);
  };

  // 预设配置
  const presets = {
    conservative: {
      name: '保守配置',
      config: {
        ...config,
        strategy: {
          ...config.strategy,
          aggressiveness: 1 as 1 | 2 | 3,
          trailingActivation: 1.0,
          trailingDistance: 1.2,
        },
        risk: {
          ...config.risk,
          maxDailyLoss: 300,
          maxDrawdown: 0.08,
          positionSize: 0.2,
        },
      },
    },
    moderate: {
      name: '适中配置',
      config: {
        ...config,
        strategy: {
          ...config.strategy,
          aggressiveness: 2 as 1 | 2 | 3,
          trailingActivation: 0.8,
          trailingDistance: 1.0,
        },
        risk: {
          ...config.risk,
          maxDailyLoss: 500,
          maxDrawdown: 0.10,
          positionSize: 0.3,
        },
      },
    },
    aggressive: {
      name: '激进配置',
      config: {
        ...config,
        strategy: {
          ...config.strategy,
          aggressiveness: 3 as 1 | 2 | 3,
          trailingActivation: 0.6,
          trailingDistance: 0.8,
        },
        risk: {
          ...config.risk,
          maxDailyLoss: 800,
          maxDrawdown: 0.15,
          positionSize: 0.5,
        },
      },
    },
  };

  const applyPreset = (presetKey: 'conservative' | 'moderate' | 'aggressive') => {
    onConfigChange(presets[presetKey].config);
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2 pb-3 border-b-2 border-black dark:border-white">
          快速配置预设
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          选择一个预设配置快速开始，或自定义参数
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => applyPreset('conservative')}
            className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors text-left"
          >
            <h3 className="text-lg font-bold text-black dark:text-white mb-2">保守配置</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              低风险，稳定盈利，适合新手
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 日最大亏损: $300</li>
              <li>• 仓位: 0.2手</li>
              <li>• 激进度: 保守</li>
            </ul>
          </button>

          <button
            onClick={() => applyPreset('moderate')}
            className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors text-left"
          >
            <h3 className="text-lg font-bold text-black dark:text-white mb-2">适中配置</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              平衡风险收益，推荐使用
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 日最大亏损: $500</li>
              <li>• 仓位: 0.3手</li>
              <li>• 激进度: 适中</li>
            </ul>
          </button>

          <button
            onClick={() => applyPreset('aggressive')}
            className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors text-left"
          >
            <h3 className="text-lg font-bold text-black dark:text-white mb-2">激进配置</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              高风险高收益，谨慎使用
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 日最大亏损: $800</li>
              <li>• 仓位: 0.5手</li>
              <li>• 激进度: 激进</li>
            </ul>
          </button>
        </div>
      </div>

      {/* Basic Settings */}
      <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
          基础设置
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              交易对 {loadingSymbols && <span className="text-xs text-gray-600 dark:text-gray-400">(加载中...)</span>}
            </label>
            <select
              value={config.symbol}
              onChange={(e) => updateConfig(['symbol'], e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            >
              {popularSymbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              默认: XAUUSDT (黄金/USDT)
            </p>
          </div>
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              时间周期
            </label>
            <select
              value={config.interval}
              onChange={(e) => updateConfig(['interval'], e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            >
              <option value="1m">1分钟</option>
              <option value="5m">5分钟</option>
              <option value="15m">15分钟</option>
              <option value="1h">1小时</option>
              <option value="4h">4小时</option>
              <option value="1d">1天</option>
            </select>
          </div>
        </div>
      </div>

      {/* Strategy Settings */}
      <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
          策略设置
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              激进度 (1=保守, 2=适中, 3=激进)
            </label>
            <select
              value={config.strategy.aggressiveness}
              onChange={(e) => updateConfig(['strategy', 'aggressiveness'], Number(e.target.value) as 1 | 2 | 3)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            >
              <option value={1}>1 - 保守 (所有条件必须满足)</option>
              <option value={2}>2 - 适中 (5个条件满足3个)</option>
              <option value={3}>3 - 激进 (条件要求较低)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                跟踪止损激活 (R倍数)
              </label>
              <input
                type="number"
                step="0.1"
                value={config.strategy.trailingActivation}
                onChange={(e) => updateConfig(['strategy', 'trailingActivation'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                跟踪止损距离 (ATR倍数)
              </label>
              <input
                type="number"
                step="0.1"
                value={config.strategy.trailingDistance}
                onChange={(e) => updateConfig(['strategy', 'trailingDistance'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicator Settings */}
      <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
          指标参数
        </h2>

        {/* Keltner Channel */}
        <div className="mb-6 pb-6 border-b-2 border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">
            Keltner Channel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                MA周期
              </label>
              <input
                type="number"
                value={config.strategy.indicators.keltner.maPeriod}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'keltner', 'maPeriod'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                ATR周期
              </label>
              <input
                type="number"
                value={config.strategy.indicators.keltner.atrPeriod}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'keltner', 'atrPeriod'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                ATR倍数
              </label>
              <input
                type="number"
                step="0.1"
                value={config.strategy.indicators.keltner.atrMultiple}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'keltner', 'atrMultiple'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bollinger Bands */}
        <div className="mb-6 pb-6 border-b-2 border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">
            Bollinger Bands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                周期
              </label>
              <input
                type="number"
                value={config.strategy.indicators.bollinger.period}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'bollinger', 'period'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                标准差倍数
              </label>
              <input
                type="number"
                step="0.1"
                value={config.strategy.indicators.bollinger.deviation}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'bollinger', 'deviation'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* MACD */}
        <div className="mb-6 pb-6 border-b-2 border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-bold text-black dark:text-white mb-4">
            MACD
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                快线周期
              </label>
              <input
                type="number"
                value={config.strategy.indicators.macd.fastPeriod}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'macd', 'fastPeriod'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                慢线周期
              </label>
              <input
                type="number"
                value={config.strategy.indicators.macd.slowPeriod}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'macd', 'slowPeriod'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                信号线周期
              </label>
              <input
                type="number"
                value={config.strategy.indicators.macd.signalPeriod}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'macd', 'signalPeriod'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* CCI & SuperTrend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
              CCI
            </h3>
            <div>
              <label className="block text-sm font-bold text-black dark:text-white mb-2">
                周期
              </label>
              <input
                type="number"
                value={config.strategy.indicators.cci.period}
                onChange={(e) => updateConfig(['strategy', 'indicators', 'cci', 'period'], Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
              SuperTrend
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  周期
                </label>
                <input
                  type="number"
                  value={config.strategy.indicators.supertrend.period}
                  onChange={(e) => updateConfig(['strategy', 'indicators', 'supertrend', 'period'], Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">
                  倍数
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={config.strategy.indicators.supertrend.multiplier}
                  onChange={(e) => updateConfig(['strategy', 'indicators', 'supertrend', 'multiplier'], Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Management */}
      <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
          风险管理
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              日最大亏损 (USDT)
            </label>
            <input
              type="number"
              value={config.risk.maxDailyLoss}
              onChange={(e) => updateConfig(['risk', 'maxDailyLoss'], Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              最大回撤 (百分比, 0.25 = 25%)
            </label>
            <input
              type="number"
              step="0.01"
              value={config.risk.maxDrawdown}
              onChange={(e) => updateConfig(['risk', 'maxDrawdown'], Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              最大仓位数
            </label>
            <input
              type="number"
              value={config.risk.maxPositions}
              onChange={(e) => updateConfig(['risk', 'maxPositions'], Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              仓位大小 (手)
            </label>
            <input
              type="number"
              step="0.1"
              value={config.risk.positionSize}
              onChange={(e) => updateConfig(['risk', 'positionSize'], Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black dark:text-white mb-2">
              止损倍数 (ATR倍数)
            </label>
            <input
              type="number"
              step="0.1"
              value={config.risk.stopLossMultiple}
              onChange={(e) => updateConfig(['risk', 'stopLossMultiple'], Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save/Load Config */}
      <div className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 pb-3 border-b-2 border-black dark:border-white">
          配置管理
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              const json = JSON.stringify(config, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `trading-config-${Date.now()}.json`;
              a.click();
            }}
            className="px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
          >
            导出配置
          </button>
          <button
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.json';
              input.onchange = (e: any) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event: any) => {
                  try {
                    const loadedConfig = JSON.parse(event.target.result);
                    onConfigChange(loadedConfig);
                    alert('配置导入成功！');
                  } catch (error) {
                    alert('配置文件格式错误');
                  }
                };
                reader.readAsText(file);
              };
              input.click();
            }}
            className="px-6 py-4 bg-white dark:bg-gray-900 text-black dark:text-white font-bold border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
          >
            导入配置
          </button>
        </div>
      </div>
    </div>
  );
}
