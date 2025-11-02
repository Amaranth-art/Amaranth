"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { TradingConfig, Signal } from '@/lib/trading/types';

interface LiveTradePanelProps {
  tradingConfig: TradingConfig;
}

export default function LiveTradePanel({ tradingConfig }: LiveTradePanelProps) {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [position, setPosition] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Binance连接状态和配置
  const [binanceConnected, setBinanceConnected] = useState<boolean>(false);
  const [binanceStatus, setBinanceStatus] = useState<string>('未连接');
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string>('');

  // 检查Binance连接状态
  const checkBinanceConnection = async () => {
    if (!apiKey || !apiSecret) {
      setBinanceConnected(false);
      setBinanceStatus('未配置');
      setConnectionError('请先配置API密钥');
      return;
    }

    setIsConnecting(true);
    setConnectionError('');
    setBinanceStatus('连接中...');

    try {
      const response = await fetch('/api/trading/binance-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, apiSecret }),
      });

      const data = await response.json();

      if (response.ok && data.connected) {
        setBinanceConnected(true);
        setBinanceStatus(`已连接  (余额: $${data.balance?.toFixed(2) || '0.00'})`);
        setConnectionError('');
      } else {
        setBinanceConnected(false);
        setBinanceStatus('连接失败');
        setConnectionError(data.error || '无法连接到Binance服务器');
      }
    } catch (err) {
      setBinanceConnected(false);
      setBinanceStatus('连接错误');
      setConnectionError(err instanceof Error ? err.message : '网络错误，请检查网络连接');
      console.error('Error checking Binance connection:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  // 保存API配置
  const saveApiConfig = () => {
    localStorage.setItem('binance_api_key', apiKey);
    localStorage.setItem('binance_api_secret', apiSecret);
    checkBinanceConnection();
    setShowApiConfig(false);
  };

  // 加载保存的API配置
  useEffect(() => {
    const savedKey = localStorage.getItem('binance_api_key');
    const savedSecret = localStorage.getItem('binance_api_secret');
    if (savedKey) setApiKey(savedKey);
    if (savedSecret) setApiSecret(savedSecret);

    // 初始检查连接
    checkBinanceConnection();
  }, []);

  const fetchCurrentSignal = async () => {
    try {
      const response = await fetch(
        `/api/trading/live?symbol=${tradingConfig.symbol}&interval=${tradingConfig.interval}`
      );
      if (response.ok) {
        const data = await response.json();
        setSignal(data.signal);
      }
    } catch (err) {
      console.error('Error fetching signal:', err);
    }
  };

  const fetchPosition = async () => {
    try {
      const response = await fetch(`/api/trading/positions?symbol=${tradingConfig.symbol}`);
      if (response.ok) {
        const data = await response.json();
        setPosition(data.position);
        setBalance(data.balance);
      }
    } catch (err) {
      console.error('Error fetching position:', err);
    }
  };

  const executeSignal = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trading/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'execute_signal',
          tradingConfig,
          symbol: tradingConfig.symbol,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to execute signal');
      }

      const data = await response.json();
      alert(`交易执行成功!\n类型: ${data.signal.type}\n价格: $${data.signal.price}`);
      await fetchPosition();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const closePosition = async () => {
    if (!confirm('确定要平仓吗？')) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trading/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'close_position',
          symbol: tradingConfig.symbol,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to close position');
      }

      const data = await response.json();
      alert(data.message);
      await fetchPosition();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentSignal();
    fetchPosition();

    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchCurrentSignal();
        fetchPosition();
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, tradingConfig]);

  return (
    <div className="space-y-6">
      {/* Binance Connection Status */}
      <div className={`rounded-lg p-4 shadow-md ${
        binanceConnected
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
          : isConnecting
          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              binanceConnected
                ? 'bg-green-500 animate-pulse'
                : isConnecting
                ? 'bg-blue-500 animate-pulse'
                : 'bg-red-500'
            }`} />
            <div>
              <h3 className={`text-sm font-semibold ${
                binanceConnected
                  ? 'text-green-800 dark:text-green-200'
                  : isConnecting
                  ? 'text-blue-800 dark:text-blue-200'
                  : 'text-red-800 dark:text-red-200'
              }`}>
                Binance 期货连接状态: {binanceStatus}
              </h3>
              {connectionError && (
                <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                  {connectionError}
                </p>
              )}
              {!binanceConnected && !isConnecting && !connectionError && (
                <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                  请配置Binance期货API密钥以启用实时交易功能
                </p>
              )}
              {isConnecting && (
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  正在测试连接，请稍候...
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={checkBinanceConnection}
              disabled={isConnecting || !apiKey || !apiSecret}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? '连接中...' : '测试连接'}
            </button>
            <button
              onClick={() => setShowApiConfig(!showApiConfig)}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              配置
            </button>
          </div>
        </div>

        {/* API Configuration Panel */}
        {showApiConfig && (
          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Binance 期货 API 配置
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                  placeholder="输入您的Binance API Key"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Secret
                </label>
                <input
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                  placeholder="输入您的Binance API Secret"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveApiConfig}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                >
                  保存并测试连接
                </button>
                <button
                  onClick={() => setShowApiConfig(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  取消
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                 提示: API密钥将保存在浏览器本地存储中。请确保您的API密钥具有<strong>期货交易权限</strong>，且在Binance后台启用了期货功能。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              期货合约交易警告
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              当前连接Binance期货测试网环境。请确保 API 密钥已正确配置且启用了期货交易权限。期货合约具有高杠杆，风险较大，请谨慎操作。
            </p>
          </div>
        </div>
      </div>

      {/* Auto Refresh Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          自动刷新 (5秒)
        </span>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            autoRefresh ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              autoRefresh ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <p className="text-red-800 dark:text-red-200 font-medium">错误: {error}</p>
        </motion.div>
      )}

      {/* Current Signal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          当前信号
        </h2>
        {signal ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`px-4 py-2 rounded-lg text-lg font-bold ${
                  signal.type === 'long'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : signal.type === 'short'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {signal.type === 'long' && '做多 ▲'}
                  {signal.type === 'short' && '做空 ▼'}
                  {signal.type === 'none' && '无信号 —'}
                  {signal.type === 'close' && '平仓 '}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">当前价格</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${signal.price.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="font-semibold">原因:</span> {signal.reason}
            </p>

            {signal.indicators && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">ATR</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {signal.indicators.atr.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">CCI</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {signal.indicators.cci.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">SuperTrend</p>
                  <p className={`text-sm font-semibold ${
                    signal.indicators.supertrend.trend === 'up'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {signal.indicators.supertrend.trend === 'up' ? '上升' : '下降'}
                  </p>
                </div>
              </div>
            )}

            {signal.type !== 'none' && !position && (
              <button
                onClick={executeSignal}
                disabled={loading}
                className="w-full mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '执行中...' : '执行交易'}
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        )}
      </div>

      {/* Current Position */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          当前仓位
        </h2>
        {position ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">持仓量</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {Math.abs(position.positionAmount).toFixed(3)} 手
                </p>
                <p className={`text-xs ${
                  position.positionAmount > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {position.positionAmount > 0 ? '多头' : '空头'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">入场价</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${position.entryPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">未实现盈亏</p>
                <p className={`text-lg font-semibold ${
                  position.unrealizedProfit >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {position.unrealizedProfit >= 0 ? '+' : ''}${position.unrealizedProfit.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={closePosition}
              disabled={loading}
              className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '平仓中...' : '平仓'}
            </button>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">无持仓</p>
        )}
      </div>

      {/* Account Balance */}
      {balance && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            账户余额
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">总余额</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${balance.totalBalance.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">可用余额</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${balance.availableBalance.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">未实现盈亏</p>
              <p className={`text-lg font-semibold ${
                balance.totalUnrealizedProfit >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {balance.totalUnrealizedProfit >= 0 ? '+' : ''}${balance.totalUnrealizedProfit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
