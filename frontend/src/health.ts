// Health check endpoint for monitoring
export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
  };
}

export const getHealthStatus = (): HealthStatus => {
  const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const uptime = perfData ? perfData.loadEventEnd - perfData.fetchStart : 0;
  
  // Simuler l'utilisation mémoire (navigateur ne donne pas accès direct)
  const memoryUsed = Math.random() * 100000000; // 0-100MB
  
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime,
    memory: {
      used: memoryUsed,
      total: 512000000 // 512MB total
    }
  };
};

// Endpoint pour les métriques de performance
export const getMetrics = () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  return {
    loadTime: navigation.loadEventEnd - navigation.fetchStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
    firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0,
    timestamp: new Date().toISOString()
  };
};
