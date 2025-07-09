import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SitePage {
  id: string;
  path: string;
  title: string;
  description?: string;
  is_active: boolean;
  last_indexed: string;
  created_at: string;
  updated_at: string;
}

export const useSitePages = () => {
  const [sitePages, setSitePages] = useState<SitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSitePages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('is_active', true)
        .order('title');

      if (error) {
        throw error;
      }

      setSitePages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    } finally {
      setLoading(false);
    }
  };

  const createSitePage = async (pageData: Omit<SitePage, 'id' | 'created_at' | 'updated_at' | 'last_indexed'>) => {
    try {
      const { data, error } = await supabase
        .from('site_pages')
        .insert([pageData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSitePages(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      throw err;
    }
  };

  const updateSitePage = async (id: string, updates: Partial<SitePage>) => {
    try {
      const { data, error } = await supabase
        .from('site_pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSitePages(prev => prev.map(page => page.id === id ? data : page));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      throw err;
    }
  };

  const deleteSitePage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('site_pages')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setSitePages(prev => prev.filter(page => page.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      throw err;
    }
  };

  const refreshSitePages = async () => {
    await fetchSitePages();
  };

  useEffect(() => {
    fetchSitePages();
  }, []);

  return {
    sitePages,
    loading,
    error,
    createSitePage,
    updateSitePage,
    deleteSitePage,
    refreshSitePages,
  };
};