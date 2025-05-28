
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

    // Use lower threshold for mobile devices
    const isMobile = window.innerWidth < 768;
    const adjustedThreshold = isMobile ? Math.min(threshold, 0.05) : threshold;

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
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, reducedMotion]);

  return { elementRef, isInView };
};

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(itemCount: number, delay: number = 200) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { elementRef, isInView } = useScrollAnimation<T>();

  useEffect(() => {
    if (isInView) {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setVisibleItems(Array.from({ length: itemCount }, (_, i) => i));
        return;
      }

      // Increase delay for mobile devices for better performance
      const isMobile = window.innerWidth < 768;
      const adjustedDelay = isMobile ? Math.max(delay, 250) : delay;

      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * adjustedDelay);
      }
    }
  }, [isInView, itemCount, delay]);

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
      
      // Shorter duration for mobile devices
      const isMobile = window.innerWidth < 768;
      const adjustedDuration = isMobile ? Math.min(duration, 1000) : duration;

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
