export default async function handler(req, res) {
  const { path } = req.query;
  
  console.log('[VERCEL] Redirect handler called for path:', path);
  
  if (!path) {
    console.log('[VERCEL] No path provided');
    return res.status(400).json({ error: 'Path required' });
  }

  try {
    console.log('[VERCEL] Calling Supabase edge function for path:', path);
    
    // Call our Supabase Edge Function
    const response = await fetch(`https://jfjkerifrcanlrjrjnih.supabase.co/functions/v1/handle-redirect?path=${encodeURIComponent(path)}`, {
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmamtlcmlmcmNhbmxyanJqbmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MjQxNDAsImV4cCI6MjA2NjIwMDE0MH0.b2Il4ItrSdtoLdwgGc_c-VvlJlPSg8XKsG_XmkNMApU'}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('[VERCEL] Edge function response status:', response.status);

    // If it's a redirect response (301/302), forward it
    if (response.status === 301 || response.status === 302) {
      const location = response.headers.get('Location');
      console.log('[VERCEL] Redirecting to:', location);
      if (location) {
        return res.redirect(response.status, location);
      }
    }

    // If no redirect found, continue to normal routing
    const data = await response.json();
    console.log('[VERCEL] Edge function response data:', data);
    
    if (!data.redirect) {
      console.log('[VERCEL] No redirect found, serving React app');
      // Rewrite to the React app
      return res.rewrite('/index.html');
    }

    // Should not reach here in normal case
    console.log('[VERCEL] Fallback to React app');
    return res.rewrite('/index.html');
    
  } catch (error) {
    console.error('[VERCEL] Redirect handler error:', error);
    // Fallback to normal routing if there's an error
    return res.rewrite('/index.html');
  }
}