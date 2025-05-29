
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  reducedMotion?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true, reducedMotion = false } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || reducedMotion) {
      setIsInView(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Better mobile optimization - more aggressive thresholds
    const isMobile = window.innerWidth < 768;
    const adjustedThreshold = isMobile ? Math.min(threshold, 0.02) : threshold;
    const adjustedRootMargin = isMobile ? '50px' : rootMargin;

    console.log('useScrollAnimation setup:', {
      isMobile,
      threshold,
      adjustedThreshold,
      adjustedRootMargin
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Intersection observed:', {
          isIntersecting: entry.isIntersecting,
          elementId: element.id || element.className
        });
        
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

    // Small delay to ensure element is properly rendered
    const timeoutId = setTimeout(() => {
      observer.observe(element);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, reducedMotion]);

  return { elementRef, isInView };
};

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(itemCount: number, delay: number = 200) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { elementRef, isInView } = useScrollAnimation<T>({
    threshold: 0.05,
    rootMargin: '50px',
    triggerOnce: true
  });

  useEffect(() => {
    console.log('useStaggeredAnimation:', {
      isInView,
      hasTriggered,
      itemCount,
      visibleItems: visibleItems.length
    });

    if (isInView && !hasTriggered) {
      setHasTriggered(true);
      
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setVisibleItems(Array.from({ length: itemCount }, (_, i) => i));
        return;
      }

      // Better mobile optimization - much faster animations
      const isMobile = window.innerWidth < 768;
      const adjustedDelay = isMobile ? 30 : delay;

      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * adjustedDelay);
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [isInView, itemCount, delay, hasTriggered]);

  return { elementRef, visibleItems };
};

export const useCounterAnimation = <T extends HTMLElement = HTMLElement>(endValue: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  const { elementRef, isInView } = useScrollAnimation<T>();

  useEffect(() => {
    if (isInView) {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setCount(endValue);
        return;
      }

      let startTime: number;
      const startValue = 0;
      
      // Much shorter duration for mobile
      const isMobile = window.innerWidth < 768;
      const adjustedDuration = isMobile ? 800 : duration;

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
