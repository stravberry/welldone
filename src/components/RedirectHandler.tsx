import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const RedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkForRedirect = async () => {
      // Użyj tylko ścieżki + query string, bez domeny
      const currentPath = `${location.pathname}${location.search}`;
      
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
        }
      } catch (error) {
        // Zapisz błąd 404 do monitorowania
        if (location.pathname !== '/') {
          await supabase
            .from('not_found_errors')
            .insert([{
              url: `${window.location.origin}${currentPath}`,
              referrer: document.referrer || null,
              user_agent: navigator.userAgent,
              occurred_at: new Date().toISOString()
            }]);
        }
      }
    };

    checkForRedirect();
  }, [location, navigate]);

  return null;
};

// Hook do sprawdzania przekierowań w komponentach
export const useRedirectCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const checkRedirect = async (url: string) => {
    try {
      const { data: redirect, error } = await supabase
        .from('redirects')
        .select('target_url, redirect_type')
        .eq('source_url', url)
        .eq('is_active', true)
        .single();

      if (redirect && !error) {
        if (redirect.target_url.startsWith('http')) {
          window.location.href = redirect.target_url;
        } else {
          navigate(redirect.target_url, { replace: redirect.redirect_type === 301 });
        }
        return true;
      }
    } catch (error) {
      console.error('Error checking redirect:', error);
    }
    return false;
  };

  return { checkRedirect };
};