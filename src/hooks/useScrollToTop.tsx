
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook that automatically scrolls to the top of the page when the route changes.
 * This is especially useful for pages with long content where users might be
 * scrolled down when navigating to a new page.
 */
const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
};

export default useScrollToTop;
