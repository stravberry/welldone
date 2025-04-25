
import usePageTracking from '@/hooks/usePageTracking';

/**
 * Component that tracks page views using the usePageTracking hook.
 * Simply include this component once in your app, and it will
 * automatically track all route changes.
 */
const RouteChangeTracker = () => {
  usePageTracking(); // Use the tracking hook
  return null; // This component doesn't render anything
};

export default RouteChangeTracker;
