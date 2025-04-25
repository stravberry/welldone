
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A hook that tracks page views and sends them to Google Tag Manager
 * whenever the route changes.
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Send virtual page view to Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'virtualPageview',
        virtualPagePath: location.pathname,
        virtualPageTitle: document.title
      });
      
      console.log('Virtual pageview sent to GTM:', location.pathname);
    }
  }, [location]);
};

export default usePageTracking;
