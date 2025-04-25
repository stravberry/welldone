
import { useEffect, useState } from 'react';
import useEventTracking from '@/hooks/useEventTracking';

/**
 * Komponent, który śledzi przewijanie strony i wysyła zdarzenia do GTM
 * gdy użytkownik przewinie do określonych punktów strony (25%, 50%, 75%, 100%)
 */
const ScrollTracker = () => {
  const { trackEvent } = useEventTracking();
  const [scrollPercentages, setScrollPercentages] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Oblicz procent przewinięcia
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      
      // Definiuj punkty przewijania, które chcemy śledzić
      const milestones = [25, 50, 75, 100];
      
      // Sprawdź, czy osiągnęliśmy nowy kamień milowy
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollPercentages.includes(milestone)) {
          setScrollPercentages(prev => [...prev, milestone]);
          
          trackEvent({
            category: 'engagement',
            action: 'scroll',
            label: `scroll-depth-${milestone}`,
            value: milestone
          });
          
          console.log(`Scroll tracking: ${milestone}%`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent, scrollPercentages]);

  return null; // Ten komponent nic nie renderuje
};

export default ScrollTracker;
