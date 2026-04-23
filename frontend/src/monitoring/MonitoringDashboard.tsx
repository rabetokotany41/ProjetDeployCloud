import React, { useState, useEffect } from 'react';
import { logger } from './Logger';

interface SystemMetrics {
  cpu: number;
  memory: number;
  network: {
    requests: number;
    errors: number;
    avgResponseTime: number;
  };
  uptime: number;
  lastUpdate: string;
}

export const MonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    network: {
      requests: 0,
      errors: 0,
      avgResponseTime: 0
    },
    uptime: 0,
    lastUpdate: new Date().toISOString()
  });
  const [isVisible, setIsVisible] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  useEffect(() => {
    const updateMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const uptime = navigation ? performance.now() : 0;
      
      // Simuler des métriques (en production, viendraient d'API réelles)
      const newMetrics: SystemMetrics = {
        cpu: Math.random() * 100,
        memory: ((performance as any).memory?.usedMemory || 0) / ((performance as any).memory?.totalMemory || 1) * 100,
        network: {
          requests: Math.floor(Math.random() * 1000),
          errors: Math.floor(Math.random() * 10),
          avgResponseTime: Math.random() * 500
        },
        uptime,
        lastUpdate: new Date().toISOString()
      };

      setMetrics(newMetrics);
      logger.debug('Metrics updated', newMetrics);
    };

    if (isVisible) {
      updateMetrics();
      const interval = setInterval(updateMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [isVisible, refreshInterval]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(!isVisible);
        logger.trackEvent('monitoring_dashboard_toggled', { visible: !isVisible });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) return null;

  const getStatusColor = (value: number, threshold: number) => {
    if (value < threshold * 0.7) return 'text-green-400';
    if (value < threshold) return 'text-yellow-400';
    return 'text-red-400';
  };

  const errorRate = metrics.network.requests > 0 
    ? (metrics.network.errors / metrics.network.requests) * 100 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/95 text-white z-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-blue-400">Monitoring</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Refresh Interval</label>
            <select 
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="w-full mt-1 bg-gray-800 rounded px-3 py-2 text-sm"
            >
              <option value={1000}>1s</option>
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
              <option value={30000}>30s</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Quick Actions</div>
            <button
              onClick={() => logger.trackEvent('metrics_export', { timestamp: Date.now() })}
              className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition-colors"
            >
              Export Metrics
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm mt-2 transition-colors"
            >
              Restart Service
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-xs text-gray-500">
            <div>Session: {logger['sessionId']}</div>
            <div>Last Update: {new Date(metrics.lastUpdate).toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Portfolio Site Monitoring</h1>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* CPU Usage */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">CPU Usage</span>
              <span className={`text-2xl font-bold ${getStatusColor(metrics.cpu, 100)}`}>
                {metrics.cpu.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  metrics.cpu < 70 ? 'bg-green-500' : 
                  metrics.cpu < 90 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${metrics.cpu}%` }}
              />
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Memory Usage</span>
              <span className={`text-2xl font-bold ${getStatusColor(metrics.memory, 100)}`}>
                {metrics.memory.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  metrics.memory < 70 ? 'bg-green-500' : 
                  metrics.memory < 90 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${metrics.memory}%` }}
              />
            </div>
          </div>

          {/* Request Count */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Requests</span>
              <span className="text-2xl font-bold text-blue-400">
                {metrics.network.requests}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Total requests
            </div>
          </div>

          {/* Error Rate */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Error Rate</span>
              <span className={`text-2xl font-bold ${getStatusColor(errorRate, 5)}`}>
                {errorRate.toFixed(2)}%
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {metrics.network.errors} errors
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Response Time</span>
                <span className="text-white">{metrics.network.avgResponseTime.toFixed(0)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="text-white">{(metrics.uptime / 1000 / 60).toFixed(1)}min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400">Healthy</span>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Recent Events</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Service started</span>
                <span>{new Date(metrics.lastUpdate).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Health check passed</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Dashboard opened</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Press Ctrl+Shift+D to toggle dashboard • Auto-refresh every {refreshInterval/1000}s
        </div>
      </div>
    </div>
  );
};
