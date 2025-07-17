import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log Core Web Vitals for optimization tracking
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', (entry as any).value);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', (entry as any).processingStart - entry.startTime);
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });
      } catch (e) {
        // Fallback for older browsers
        console.log('Performance Observer not fully supported');
      }

      return () => observer.disconnect();
    }
  }, []);

  return null;
};

export default PerformanceMonitor;