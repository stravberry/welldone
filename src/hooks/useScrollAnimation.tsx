
import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  reducedMotion?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.05, rootMargin = '50px', triggerOnce = true, reducedMotion = false } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || reducedMotion) {
      setIsInView(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const isMobile = window.innerWidth < 768;
    const adjustedThreshold = isMobile ? 0.01 : threshold;
    const adjustedRootMargin = isMobile ? '100px' : rootMargin;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold: adjustedThreshold,
        rootMargin: adjustedRootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, reducedMotion]);

  return { elementRef, isInView };
};

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showAllFallback, setShowAllFallback] = useState(false);
  const { elementRef, isInView } = useScrollAnimation<T>({
    threshold: 0.02,
    rootMargin: '100px',
    triggerOnce: true
  });

  useEffect(() => {
    // Fallback timer to show all items after 2 seconds
    const fallbackTimer = setTimeout(() => {
      setShowAllFallback(true);
    }, 2000);

    if (isInView && !hasTriggered) {
      setHasTriggered(true);
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setVisibleItems(Array.from({ length: itemCount }, (_, i) => i));
        setShowAllFallback(true);
        clearTimeout(fallbackTimer);
        return;
      }

      const isMobile = window.innerWidth < 768;
      const adjustedDelay = isMobile ? 50 : delay;

      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * adjustedDelay);
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
        clearTimeout(fallbackTimer);
      };
    }

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [isInView, itemCount, delay, hasTriggered]);

  return { elementRef, visibleItems, showAllFallback };
};

export const useCounterAnimation = <T extends HTMLElement = HTMLElement>(endValue: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  const { elementRef, isInView } = useScrollAnimation<T>();

  useEffect(() => {
    if (isInView) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setCount(endValue);
        return;
      }

      let startTime: number;
      const startValue = 0;
      const isMobile = window.innerWidth < 768;
      const adjustedDuration = isMobile ? 600 : duration;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / adjustedDuration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, endValue, duration]);

  return { elementRef, count };
};
