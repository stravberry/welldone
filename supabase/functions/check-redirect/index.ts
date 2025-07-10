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
      return new Response(
        JSON.stringify({ error: 'Path parameter required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check for redirect
    const { data: redirect, error } = await supabase
      .from('redirects')
      .select('target_url, redirect_type, id, hit_count')
      .eq('source_url', path)
      .eq('is_active', true)
      .single()

    if (redirect && !error) {
      // Update hit count
      await supabase
        .from('redirects')
        .update({ 
          hit_count: (redirect.hit_count || 0) + 1,
          last_accessed: new Date().toISOString() 
        })
        .eq('id', redirect.id)

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

    return new Response(
      JSON.stringify({ redirect: false }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})