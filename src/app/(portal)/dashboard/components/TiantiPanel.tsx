"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function TiantiPanel() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [countdown, setCountdown] = useState(60);

  const imageUrl = 'https://qingwuwei.github.io/tianti/images/tianti.png';

  // Auto refresh logic
  useEffect(() => {
    if (!autoRefresh) {
      setCountdown(60);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setRefreshKey((k) => k + 1);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setRefreshKey((k) => k + 1);
    setCountdown(60);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              天梯趋势指示器
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              实时量化趋势分析数据
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Auto Refresh Toggle */}
            <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                自动刷新
              </span>
            </label>

            {/* Manual Refresh Button */}
            <button
              onClick={handleManualRefresh}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            >
               手动刷新
            </button>

            {/* Countdown Display */}
            {autoRefresh && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-mono font-bold"
              >
                {countdown}s
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Image Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="relative w-full overflow-auto">
          <img
            key={refreshKey}
            src={`${imageUrl}?t=${refreshKey}`}
            alt="天梯趋势指示器"
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3E加载失败%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          最后刷新时间: {new Date().toLocaleTimeString('zh-CN')}
        </div>
      </div>
    </div>
  );
}
