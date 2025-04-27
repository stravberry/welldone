
import { useCallback } from 'react';

type EventCategory = 'navigation' | 'engagement' | 'form' | 'download' | 'social' | 'button';
type EventAction = 'click' | 'submit' | 'view' | 'scroll' | 'download' | 'share' | 'input';

interface TrackEventProps {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value?: number;
  additionalData?: Record<string, any>;
}

/**
 * Hook do śledzenia interakcji użytkownika i wysyłania ich do Google Tag Manager
 * @returns Funkcję trackEvent do użycia przy zdarzeniach
 */
const useEventTracking = () => {
  const trackEvent = useCallback(({ category, action, label, value, additionalData }: TrackEventProps) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'userInteraction',
        eventCategory: category,
        eventAction: action,
        eventLabel: label || '',
        eventValue: value || 0,
        ...additionalData
      });

      console.log(`Event tracked: ${category} - ${action} - ${label || 'no label'}`);
    }
  }, []);

  return { trackEvent };
};

export default useEventTracking;
