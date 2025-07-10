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
      
      console.log('[REACT-REDIRECT] Checking for redirect:', currentPath);
      
      try {
        // Sprawdź różne warianty ścieżki
        const pathsToCheck = [
          currentPath,
          currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath + '/',
          currentPath.split('?')[0], // Bez parametrów query
        ];

        let redirect = null;
        
        for (const checkPath of pathsToCheck) {
          console.log('[REACT-REDIRECT] Checking path variant:', checkPath);
          
          const { data, error } = await supabase
            .from('redirects')
            .select('target_url, redirect_type, id, hit_count')
            .eq('source_url', checkPath)
            .eq('is_active', true)
            .maybeSingle();

          if (data && !error) {
            redirect = data;
            console.log('[REACT-REDIRECT] Found redirect:', data);
            break;
          }
        }

        if (redirect) {
          // Aktualizuj licznik hitów w tle
          const updateResult = await supabase
            .from('redirects')
            .update({ 
              hit_count: (redirect.hit_count || 0) + 1,
              last_accessed: new Date().toISOString() 
            })
            .eq('id', redirect.id);
            
          if (updateResult.error) {
            console.error('[REACT-REDIRECT] Failed to update hit count:', updateResult.error);
          } else {
            console.log('[REACT-REDIRECT] Updated hit count');
          }

          // Wykonaj przekierowanie
          console.log('[REACT-REDIRECT] Redirecting to:', redirect.target_url);
          
          if (redirect.target_url.startsWith('http')) {
            // Zewnętrzne przekierowanie
            window.location.href = redirect.target_url;
          } else {
            // Wewnętrzne przekierowanie
            navigate(redirect.target_url, { replace: true });
          }
          return;
        }

        // Loguj 404 tylko jeśli to nie jest strona główna
        if (currentPath !== '/' && currentPath !== '') {
          console.log('[REACT-REDIRECT] No redirect found, logging 404:', currentPath);
          
          // Loguj błąd 404 do bazy danych
          const insertResult = await supabase
            .from('not_found_errors')
            .insert({
              url: currentPath,
              referrer: document.referrer || null,
              user_agent: navigator.userAgent,
              ip_address: null // Nie możemy uzyskać IP po stronie klienta
            });
            
          if (insertResult.error) {
            console.error('[REACT-REDIRECT] Failed to log 404:', insertResult.error);
          } else {
            console.log('[REACT-REDIRECT] 404 error logged');
          }
        }
      } catch (error) {
        console.error('[REACT-REDIRECT] Error checking for redirects:', error);
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
      // Sprawdź różne warianty ścieżki
      const pathsToCheck = [
        url,
        url.endsWith('/') ? url.slice(0, -1) : url + '/',
        url.split('?')[0], // Bez parametrów query
      ];

      let redirect = null;
      
      for (const checkPath of pathsToCheck) {
        const { data, error } = await supabase
          .from('redirects')
          .select('target_url, redirect_type, id, hit_count')
          .eq('source_url', checkPath)
          .eq('is_active', true)
          .maybeSingle();

        if (data && !error) {
          redirect = data;
          break;
        }
      }

      if (redirect) {
        // Aktualizuj licznik hitów w tle
        const updateResult = await supabase
          .from('redirects')
          .update({ 
            hit_count: (redirect.hit_count || 0) + 1,
            last_accessed: new Date().toISOString() 
          })
          .eq('id', redirect.id);
          
        if (updateResult.error) {
          console.error('Failed to update hit count:', updateResult.error);
        }

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