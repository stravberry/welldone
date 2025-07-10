import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '@/integrations/supabase/client';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkForRedirect = async () => {
      const currentPath = `${location.pathname}${location.search}`;
      console.log('NotFound component checking path:', currentPath);
      
      try {
        // Sprawdź czy istnieje aktywne przekierowanie dla tej ścieżki
        const { data: redirect, error } = await supabase
          .from('redirects')
          .select('target_url, redirect_type, id, hit_count')
          .eq('source_url', currentPath)
          .eq('is_active', true)
          .single();

        if (redirect && !error) {
          // Zwiększ licznik użyć i zaktualizuj ostatni dostęp
          await supabase
            .from('redirects')
            .update({ 
              hit_count: (redirect.hit_count || 0) + 1,
              last_accessed: new Date().toISOString() 
            })
            .eq('id', redirect.id);

          // Wykonaj przekierowanie
          if (redirect.target_url.startsWith('http')) {
            // Zewnętrzny URL
            window.location.href = redirect.target_url;
          } else {
            // Wewnętrzny URL
            navigate(redirect.target_url, { replace: redirect.redirect_type === 301 });
          }
          return;
        }
      } catch (error) {
        console.error('Error checking redirect:', error);
        // Zapisz błąd 404 do monitorowania
        await supabase
          .from('not_found_errors')
          .insert([{
            url: `${window.location.origin}${currentPath}`,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            occurred_at: new Date().toISOString()
          }]);
      }
      
      setIsChecking(false);
    };

    checkForRedirect();
  }, [location, navigate]);

  // Pokaż loading podczas sprawdzania przekierowań
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Sprawdzanie przekierowań...</p>
        </div>
      </div>
    );
  }

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
