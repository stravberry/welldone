export default async function handler(req, res) {
  const { path } = req.query;
  
  if (!path) {
    return res.status(400).json({ error: 'Path required' });
  }

  try {
    // Call our Supabase Edge Function
    const response = await fetch(`https://jfjkerifrcanlrjrjnih.supabase.co/functions/v1/handle-redirect?path=${encodeURIComponent(path)}`, {
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmamtlcmlmcmNhbmxyanJqbmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MjQxNDAsImV4cCI6MjA2NjIwMDE0MH0.b2Il4ItrSdtoLdwgGc_c-VvlJlPSg8XKsG_XmkNMApU'}`,
        'Content-Type': 'application/json'
      }
    });

    // If it's a redirect response (301/302), forward it
    if (response.status === 301 || response.status === 302) {
      const location = response.headers.get('Location');
      if (location) {
        return res.redirect(response.status, location);
      }
    }

    // If no redirect found, continue to normal routing
    const data = await response.json();
    if (!data.redirect) {
      // Rewrite to the React app
      return res.rewrite('/index.html');
    }

    return res.status(404).json({ error: 'Page not found' });
    
  } catch (error) {
    console.error('Redirect handler error:', error);
    // Fallback to normal routing if there's an error
    return res.rewrite('/index.html');
  }
}