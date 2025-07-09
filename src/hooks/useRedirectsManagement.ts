import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Redirect {
  id: string;
  source_url: string;
  target_url: string;
  redirect_type: number;
  is_active: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
  hit_count: number;
  last_accessed?: string;
}

export interface SitemapEntry {
  id: string;
  url: string;
  priority: number;
  changefreq: string;
  lastmod: string;
  is_active: boolean;
}

export interface NotFoundError {
  id: string;
  url: string;
  referrer?: string;
  occurred_at: string;
  resolved: boolean;
}

export const useRedirectsManagement = () => {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [sitemapEntries, setSitemapEntries] = useState<SitemapEntry[]>([]);
  const [notFoundErrors, setNotFoundErrors] = useState<NotFoundError[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchRedirects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('redirects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRedirects(data || []);
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się pobrać przekierowań',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createRedirect = async (redirect: Omit<Redirect, 'id' | 'created_at' | 'updated_at' | 'hit_count' | 'last_accessed'>) => {
    try {
      const { error } = await supabase
        .from('redirects')
        .insert([redirect]);

      if (error) throw error;
      
      toast({
        title: 'Sukces',
        description: 'Przekierowanie zostało dodane',
      });
      
      fetchRedirects();
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się dodać przekierowania',
        variant: 'destructive',
      });
    }
  };

  const updateRedirect = async (id: string, updates: Partial<Redirect>) => {
    try {
      const { error } = await supabase
        .from('redirects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Sukces',
        description: 'Przekierowanie zostało zaktualizowane',
      });
      
      fetchRedirects();
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się zaktualizować przekierowania',
        variant: 'destructive',
      });
    }
  };

  const deleteRedirect = async (id: string) => {
    try {
      const { error } = await supabase
        .from('redirects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Sukces',
        description: 'Przekierowanie zostało usunięte',
      });
      
      fetchRedirects();
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się usunąć przekierowania',
        variant: 'destructive',
      });
    }
  };

  const bulkImportRedirects = async (redirectsData: Array<Omit<Redirect, 'id' | 'created_at' | 'updated_at' | 'hit_count' | 'last_accessed'>>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('redirects')
        .insert(redirectsData);

      if (error) throw error;
      
      toast({
        title: 'Sukces',
        description: `Zaimportowano ${redirectsData.length} przekierowań`,
      });
      
      fetchRedirects();
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się zaimportować przekierowań',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSitemapEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('sitemap_entries')
        .select('*')
        .order('url');

      if (error) throw error;
      setSitemapEntries(data || []);
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się pobrać wpisów sitemapy',
        variant: 'destructive',
      });
    }
  };

  const fetchNotFoundErrors = async () => {
    try {
      const { data, error } = await supabase
        .from('not_found_errors')
        .select('*')
        .order('occurred_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setNotFoundErrors(data || []);
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się pobrać błędów 404',
        variant: 'destructive',
      });
    }
  };

  const resolveNotFoundError = async (id: string) => {
    try {
      const { error } = await supabase
        .from('not_found_errors')
        .update({ resolved: true })
        .eq('id', id);

      if (error) throw error;
      fetchNotFoundErrors();
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się oznaczyć błędu jako rozwiązany',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchRedirects();
    fetchSitemapEntries();
    fetchNotFoundErrors();
  }, []);

  return {
    redirects,
    sitemapEntries,
    notFoundErrors,
    loading,
    createRedirect,
    updateRedirect,
    deleteRedirect,
    bulkImportRedirects,
    fetchRedirects,
    resolveNotFoundError,
  };
};