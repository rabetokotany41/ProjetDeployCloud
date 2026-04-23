interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: any;
  userId?: string;
  sessionId: string;
}

class Logger {
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupGlobalErrorHandling();
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private setupGlobalErrorHandling(): void {
    // Capture unhandled errors
    window.addEventListener('error', (event) => {
      this.error('Unhandled JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled Promise Rejection', {
        reason: event.reason,
        stack: event.reason?.stack
      });
    });
  }

  private createLogEntry(level: LogEntry['level'], message: string, context?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userId: this.userId,
      sessionId: this.sessionId
    };
  }

  private log(entry: LogEntry): void {
    // Console logging with appropriate level
    const logMessage = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    
    switch (entry.level) {
      case 'error':
        console.error(logMessage, entry.context);
        break;
      case 'warn':
        console.warn(logMessage, entry.context);
        break;
      case 'debug':
        console.debug(logMessage, entry.context);
        break;
      default:
        console.log(logMessage, entry.context);
    }

    // In production, send to logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToLoggingService(entry);
    }
  }

  private sendToLoggingService(entry: LogEntry): void {
    // Placeholder for sending logs to external service
    // Could be Google Cloud Logging, Sentry, etc.
    try {
      // Example: Send to Google Cloud Logging
      const logData = {
        ...entry,
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer
      };
      
      // In a real implementation, you would send this to your logging endpoint
      console.log('Log sent to service:', logData);
    } catch (error) {
      console.error('Failed to send log to service:', error);
    }
  }

  info(message: string, context?: any): void {
    this.log(this.createLogEntry('info', message, context));
  }

  warn(message: string, context?: any): void {
    this.log(this.createLogEntry('warn', message, context));
  }

  error(message: string, context?: any): void {
    this.log(this.createLogEntry('error', message, context));
  }

  debug(message: string, context?: any): void {
    this.log(this.createLogEntry('debug', message, context));
  }

  setUser(userId: string): void {
    this.userId = userId;
    this.info('User identified', { userId });
  }

  trackEvent(eventName: string, properties?: any): void {
    this.info(`Event: ${eventName}`, properties);
  }

  trackPageView(page: string): void {
    this.info(`Page view: ${page}`, { page });
  }

  trackPerformance(metric: string, value: number): void {
    this.info(`Performance: ${metric}`, { value, unit: 'ms' });
  }
}

export const logger = new Logger();
