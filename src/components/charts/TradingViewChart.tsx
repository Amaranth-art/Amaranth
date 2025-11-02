"use client";

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import type { Trade, Candle } from '@/lib/trading/types';

interface TradingViewChartProps {
  candles: Candle[];
  trades: Trade[];
  height?: number;
}

export default function TradingViewChart({ candles, trades, height = 500 }: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#1f2937' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#374151' },
        horzLines: { color: '#374151' },
      },
      width: chartContainerRef.current.clientWidth,
      height,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
      },
    });

    // Add candlestick series
    const candlestickSeries = (chart as any).addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    // Format candle data
    const chartData = candles.map(candle => ({
      time: Math.floor(candle.closeTime / 1000),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    candlestickSeries.setData(chartData);

    // Add trade markers
    const markers: any[] = [];

    trades.forEach(trade => {
      // Entry marker
      markers.push({
        time: Math.floor(trade.entryTime / 1000),
        position: trade.side === 'long' ? 'belowBar' : 'aboveBar',
        color: trade.side === 'long' ? '#10b981' : '#ef4444',
        shape: trade.side === 'long' ? 'arrowUp' : 'arrowDown',
        text: `${trade.side === 'long' ? 'BUY' : 'SELL'} @${trade.entryPrice.toFixed(2)}`,
      });

      // Exit marker (if trade is closed)
      if (trade.exitTime && trade.exitPrice) {
        const isWin = (trade.pnl || 0) > 0;
        markers.push({
          time: Math.floor(trade.exitTime / 1000),
          position: trade.side === 'long' ? 'aboveBar' : 'belowBar',
          color: isWin ? '#6366f1' : '#9ca3af',
          shape: 'circle',
          text: `EXIT @${trade.exitPrice.toFixed(2)} ${isWin ? '' : ''} ${trade.pnl?.toFixed(2) || '0'}`,
        });
      }
    });

    candlestickSeries.setMarkers(markers);

    // Fit content
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [candles, trades, height]);

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="rounded-lg overflow-hidden" />
      <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Buy Entry</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Sell Entry</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          <span>Profitable Exit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span>Loss Exit</span>
        </div>
      </div>
    </div>
  );
}
