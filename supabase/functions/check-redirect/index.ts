import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
      console.error('No path provided to check-redirect')
      return new Response(
        JSON.stringify({ error: 'Path parameter required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Checking redirect for path: ${path}`)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check for redirect with multiple path variations
    const pathsToCheck = [
      path,
      path.endsWith('/') ? path.slice(0, -1) : path + '/',
      path.split('?')[0], // Remove query parameters
    ]

    let redirect = null
    
    for (const checkPath of pathsToCheck) {
      const { data, error } = await supabase
        .from('redirects')
        .select('target_url, redirect_type, id, hit_count')
        .eq('source_url', checkPath)
        .eq('is_active', true)
        .maybeSingle()

      if (data && !error) {
        redirect = data
        console.log(`Found redirect: ${checkPath} -> ${data.target_url}`)
        break
      }
    }

    if (redirect) {
      // Update hit count in background (don't await to avoid blocking)
      supabase
        .from('redirects')
        .update({ 
          hit_count: (redirect.hit_count || 0) + 1,
          last_accessed: new Date().toISOString() 
        })
        .eq('id', redirect.id)
        .then(() => console.log('Hit count updated'))
        .catch(err => console.error('Failed to update hit count:', err))

      return new Response(
        JSON.stringify({ 
          redirect: true, 
          target_url: redirect.target_url,
          redirect_type: redirect.redirect_type 
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`No redirect found for path: ${path}`)
    return new Response(
      JSON.stringify({ redirect: false }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in check-redirect:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})