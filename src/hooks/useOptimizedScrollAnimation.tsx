import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOptimizedScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

// Shared IntersectionObserver for better performance
class IntersectionObserverPool {
  private observers: Map<string, IntersectionObserver> = new Map();
  private callbacks: Map<Element, () => void> = new Map();

  getObserver(threshold: number, triggerOnce: boolean): IntersectionObserver {
    const key = `${threshold}-${triggerOnce}`;
    
    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const callback = this.callbacks.get(entry.target);
              if (callback) {
                callback();
                if (triggerOnce) {
                  observer.unobserve(entry.target);
                  this.callbacks.delete(entry.target);
                }
              }
            }
          });
        },
        { threshold, rootMargin: '50px' }
      );
      this.observers.set(key, observer);
    }
    
    return this.observers.get(key)!;
  }

  observe(element: Element, callback: () => void, threshold: number, triggerOnce: boolean) {
    const observer = this.getObserver(threshold, triggerOnce);
    this.callbacks.set(element, callback);
    observer.observe(element);
  }

  unobserve(element: Element, threshold: number, triggerOnce: boolean) {
    const key = `${threshold}-${triggerOnce}`;
    const observer = this.observers.get(key);
    if (observer) {
      observer.unobserve(element);
      this.callbacks.delete(element);
    }
  }
}

const observerPool = new IntersectionObserverPool();

export const useOptimizedScrollAnimation = <T extends HTMLElement>({
  threshold = 0.1,
  triggerOnce = true
}: UseOptimizedScrollAnimationOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  const handleIntersection = useCallback(() => {
    setIsInView(true);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerPool.observe(element, handleIntersection, threshold, triggerOnce);

    return () => {
      if (element) {
        observerPool.unobserve(element, threshold, triggerOnce);
      }
    };
  }, [handleIntersection, threshold, triggerOnce]);

  return { elementRef, isInView };
};

// Optimized counter hook with requestAnimationFrame
export const useOptimizedCounterAnimation = <T extends HTMLElement>(
  targetValue: number,
  duration: number = 2000
) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<T>(null);
  const { isInView } = useOptimizedScrollAnimation({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(targetValue * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, targetValue, duration]);

  return { elementRef, count };
};