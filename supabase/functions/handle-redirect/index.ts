import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RedirectRecord {
  id: string;
  target_url: string;
  redirect_type: number;
  hit_count: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.searchParams.get('path')
    
    if (!path) {
      console.error('No path provided')
      return new Response(
        JSON.stringify({ error: 'Path parameter required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`[REDIRECT] Checking redirect for path: ${path}`)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check for redirect - try exact match first, then with variations
    const pathsToCheck = [
      path,
      path.endsWith('/') ? path.slice(0, -1) : path + '/',
      path.split('?')[0], // Without query params
    ]

    let redirect: RedirectRecord | null = null
    
    for (const checkPath of pathsToCheck) {
      const { data, error } = await supabase
        .from('redirects')
        .select('id, target_url, redirect_type, hit_count')
        .eq('source_url', checkPath)
        .eq('is_active', true)
        .maybeSingle()

      if (data && !error) {
        redirect = data
        console.log(`[REDIRECT] Found redirect for ${checkPath} -> ${data.target_url}`)
        break
      }
    }

    if (redirect) {
      // Update hit count in background
      supabase
        .from('redirects')
        .update({ 
          hit_count: (redirect.hit_count || 0) + 1,
          last_accessed: new Date().toISOString() 
        })
        .eq('id', redirect.id)
        .then(() => console.log(`[REDIRECT] Updated hit count for redirect ${redirect.id}`))
        .catch(err => console.error('[REDIRECT] Failed to update hit count:', err))

      // Return redirect response based on type
      const status = redirect.redirect_type === 301 ? 301 : 302
      
      return new Response(null, {
        status,
        headers: {
          ...corsHeaders,
          'Location': redirect.target_url,
          'Cache-Control': redirect.redirect_type === 301 ? 'max-age=31536000' : 'no-cache'
        }
      })
    }

    // No redirect found
    console.log(`[REDIRECT] No redirect found for path: ${path}`)
    return new Response(
      JSON.stringify({ redirect: false }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in handle-redirect:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})