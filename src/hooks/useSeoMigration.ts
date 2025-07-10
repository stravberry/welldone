import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  priority?: number;
  changefreq?: string;
  status?: 'pending' | 'analyzed' | 'mapped' | 'error';
  httpStatus?: number;
  category?: 'product' | 'service' | 'blog' | 'page' | 'category' | 'unknown';
  suggestedMapping?: string;
  action?: 'redirect' | 'recreate' | 'ignore';
}

export interface UrlAnalysis {
  url: string;
  httpStatus: number;
  category: string;
  keywords: string[];
  suggestedTargets: string[];
}

export const useSeoMigration = () => {
  const [sitemapUrls, setSitemapUrls] = useState<SitemapUrl[]>([]);
  const [analysis, setAnalysis] = useState<UrlAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    analyzed: 0,
    mapped: 0,
    toRedirect: 0,
    toRecreate: 0,
    errors: 0
  });
  const { toast } = useToast();

  const parseSitemap = useCallback(async (sitemapUrl: string) => {
    setLoading(true);
    try {
      const response = await fetch(sitemapUrl);
      const xmlText = await response.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      const urlElements = xmlDoc.querySelectorAll('url');
      const urls: SitemapUrl[] = Array.from(urlElements).map(urlEl => {
        const loc = urlEl.querySelector('loc')?.textContent || '';
        const lastmod = urlEl.querySelector('lastmod')?.textContent || '';
        const priority = parseFloat(urlEl.querySelector('priority')?.textContent || '0.5');
        const changefreq = urlEl.querySelector('changefreq')?.textContent || '';
        
        return {
          url: loc,
          lastmod,
          priority,
          changefreq,
          status: 'pending',
          category: categorizeUrl(loc),
          action: 'redirect'
        };
      });
      
      setSitemapUrls(urls);
      updateStats(urls);
      
      toast({
        title: "Sitemap załadowana",
        description: `Znaleziono ${urls.length} URL-i do analizy`,
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się załadować sitemapy",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const categorizeUrl = (url: string): SitemapUrl['category'] => {
    const path = new URL(url).pathname.toLowerCase();
    
    if (path.includes('/produkt') || path.includes('/product')) return 'product';
    if (path.includes('/usluga') || path.includes('/service')) return 'service';
    if (path.includes('/blog') || path.includes('/artykul')) return 'blog';
    if (path.includes('/kategoria') || path.includes('/category')) return 'category';
    
    return 'page';
  };

  const analyzeUrls = useCallback(async (urls: SitemapUrl[]) => {
    setLoading(true);
    const batchSize = 10;
    const updatedUrls = [...urls];
    
    try {
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async (urlData, batchIndex) => {
          try {
            const response = await fetch(urlData.url, { method: 'HEAD' });
            const globalIndex = i + batchIndex;
            updatedUrls[globalIndex] = {
              ...updatedUrls[globalIndex],
              httpStatus: response.status,
              status: 'analyzed'
            };
          } catch (error) {
            const globalIndex = i + batchIndex;
            updatedUrls[globalIndex] = {
              ...updatedUrls[globalIndex],
              httpStatus: 0,
              status: 'error'
            };
          }
        });
        
        await Promise.all(batchPromises);
        setSitemapUrls([...updatedUrls]);
        updateStats(updatedUrls);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "Analiza zakończona",
        description: `Przeanalizowano ${urls.length} URL-i`,
      });
    } catch (error) {
      toast({
        title: "Błąd analizy",
        description: "Wystąpił błąd podczas analizy URL-i",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const generateSmartMappings = useCallback(async () => {
    setLoading(true);
    try {
      // Get existing pages from database
      const { data: existingPages } = await supabase
        .from('site_pages')
        .select('path, title')
        .eq('is_active', true);

      const updatedUrls = sitemapUrls.map(urlData => {
        const suggestions = findSimilarPaths(urlData.url, existingPages || []);
        return {
          ...urlData,
          suggestedMapping: suggestions[0]?.path || '',
          status: 'mapped' as const
        };
      });

      setSitemapUrls(updatedUrls);
      updateStats(updatedUrls);

      toast({
        title: "Mapowanie wygenerowane",
        description: "Utworzono inteligentne sugestie mapowań",
      });
    } catch (error) {
      toast({
        title: "Błąd mapowania",
        description: "Nie udało się wygenerować mapowań",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [sitemapUrls, toast]);

  const findSimilarPaths = (sourceUrl: string, existingPages: any[]) => {
    const sourcePath = new URL(sourceUrl).pathname;
    const sourceKeywords = extractKeywords(sourcePath);
    
    return existingPages
      .map(page => {
        const targetKeywords = extractKeywords(page.path);
        const similarity = calculateSimilarity(sourceKeywords, targetKeywords);
        return { ...page, similarity };
      })
      .filter(page => page.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity);
  };

  const extractKeywords = (path: string) => {
    return path
      .toLowerCase()
      .split(/[\/\-_\s]+/)
      .filter(word => word.length > 2)
      .filter(word => !['www', 'http', 'https', 'com', 'pl'].includes(word));
  };

  const calculateSimilarity = (keywords1: string[], keywords2: string[]) => {
    const intersection = keywords1.filter(word => keywords2.includes(word));
    const union = [...new Set([...keywords1, ...keywords2])];
    return union.length > 0 ? intersection.length / union.length : 0;
  };

  const updateUrlAction = useCallback((index: number, action: SitemapUrl['action'], mapping?: string) => {
    const updatedUrls = [...sitemapUrls];
    updatedUrls[index] = {
      ...updatedUrls[index],
      action,
      suggestedMapping: mapping || updatedUrls[index].suggestedMapping
    };
    setSitemapUrls(updatedUrls);
    updateStats(updatedUrls);
  }, [sitemapUrls]);

  const createBulkRedirects = useCallback(async () => {
    const redirectsToCreate = sitemapUrls
      .filter(url => url.action === 'redirect' && url.suggestedMapping)
      .map(url => ({
        source_url: new URL(url.url).pathname,
        target_url: url.suggestedMapping!,
        redirect_type: 301,
        description: `SEO Migration: ${url.category}`
      }));

    if (redirectsToCreate.length === 0) {
      toast({
        title: "Brak przekierowań",
        description: "Nie ma URL-i do przekierowania",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('redirects')
        .insert(redirectsToCreate);

      if (error) throw error;

      toast({
        title: "Przekierowania utworzone",
        description: `Utworzono ${redirectsToCreate.length} przekierowań`,
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się utworzyć przekierowań",
        variant: "destructive",
      });
    }
  }, [sitemapUrls, toast]);

  const updateStats = (urls: SitemapUrl[]) => {
    setStats({
      total: urls.length,
      analyzed: urls.filter(u => u.status === 'analyzed' || u.status === 'mapped').length,
      mapped: urls.filter(u => u.status === 'mapped').length,
      toRedirect: urls.filter(u => u.action === 'redirect').length,
      toRecreate: urls.filter(u => u.action === 'recreate').length,
      errors: urls.filter(u => u.status === 'error').length
    });
  };

  return {
    sitemapUrls,
    analysis,
    loading,
    stats,
    parseSitemap,
    analyzeUrls,
    generateSmartMappings,
    updateUrlAction,
    createBulkRedirects
  };
};