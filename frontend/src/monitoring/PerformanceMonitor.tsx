import React, { useEffect, useState } from 'react';
import { getHealthStatus, getMetrics } from '../health';

interface PerformanceData {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  timestamp: string;
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceData | null>(null);
  const [health, setHealth] = useState(getHealthStatus());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getMetrics());
      setHealth(getHealthStatus());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible || !metrics) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-xl z-50 font-mono text-xs max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-green-400">Monitoring Dashboard</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-red-400 hover:text-red-300"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="border-b border-gray-600 pb-2">
          <div className="text-yellow-400 font-semibold">Health Status</div>
          <div className={`text-sm ${health.status === 'healthy' ? 'text-green-400' : 'text-red-400'}`}>
            {health.status.toUpperCase()}
          </div>
          <div className="text-gray-400">Uptime: {(health.uptime / 1000).toFixed(2)}s</div>
        </div>
        
        <div className="border-b border-gray-600 pb-2">
          <div className="text-yellow-400 font-semibold">Performance Metrics</div>
          <div className="text-gray-300">Load Time: {metrics.loadTime.toFixed(0)}ms</div>
          <div className="text-gray-300">DOM Ready: {metrics.domContentLoaded.toFixed(0)}ms</div>
          <div className="text-gray-300">First Paint: {metrics.firstPaint.toFixed(0)}ms</div>
          <div className="text-gray-300">FCP: {metrics.firstContentfulPaint.toFixed(0)}ms</div>
        </div>
        
        <div>
          <div className="text-yellow-400 font-semibold">Memory Usage</div>
          <div className="text-gray-300">
            Used: {(health.memory.used / 1024 / 1024).toFixed(2)}MB / 
            {(health.memory.total / 1024 / 1024).toFixed(0)}MB
          </div>
          <div className="text-gray-300">
            {((health.memory.used / health.memory.total) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-gray-500 text-xs">
        Press Ctrl+Shift+M to toggle
      </div>
    </div>
  );
};
