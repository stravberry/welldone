import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 errors for monitoring since server-side redirects handle most cases
    const logNotFoundError = async () => {
      const currentPath = `${location.pathname}${location.search}`;
      console.log('404 page reached for path:', currentPath);
      
      try {
        await supabase
          .from('not_found_errors')
          .insert([{
            url: `${window.location.origin}${currentPath}`,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            occurred_at: new Date().toISOString()
          }]);
      } catch (error) {
        console.error('Failed to log 404 error:', error);
      }
    };

    logNotFoundError();
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
