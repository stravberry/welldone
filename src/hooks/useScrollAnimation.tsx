
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

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
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isInView };
};

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { elementRef, isInView } = useScrollAnimation<T>();

  useEffect(() => {
    if (isInView) {
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * delay);
      }
    }
  }, [isInView, itemCount, delay]);

  return { elementRef, visibleItems };
};

export const useCounterAnimation = <T extends HTMLElement = HTMLElement>(endValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const { elementRef, isInView } = useScrollAnimation<T>();

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
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
