import React, { useState } from 'react';
import { Upload, FileText, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Redirect, useRedirectsManagement } from '@/hooks/useRedirectsManagement';

interface SitemapUrl {
  url: string;
  lastmod?: string;
  priority?: number;
  changefreq?: string;
}

interface MappingEntry extends SitemapUrl {
  targetUrl: string;
  redirectType: 301 | 302;
  status: 'unmapped' | 'mapped' | 'exists';
}

export const SitemapImporter: React.FC = () => {
  const [sitemapUrls, setSitemapUrls] = useState<MappingEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const { bulkImportRedirects } = useRedirectsManagement();
  const { toast } = useToast();

  // Lista istniejących podstron (można rozszerzyć)
  const availablePages = [
    '/uslugi',
    '/udt-szkolenia',
    '/udt-operatorzy',
    '/udt-konserwatorze',
    '/wozki-unoszace',
    '/lutowanie',
    '/kontakt',
    '/o-nas',
    '/realizacje',
    '/blog',
  ];

  const parseSitemap = async (file: File) => {
    try {
      setLoading(true);
      const text = await file.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');
      
      const urls = xmlDoc.getElementsByTagName('url');
      const parsedUrls: SitemapUrl[] = [];
      
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const loc = url.getElementsByTagName('loc')[0]?.textContent;
        const lastmod = url.getElementsByTagName('lastmod')[0]?.textContent;
        const priority = url.getElementsByTagName('priority')[0]?.textContent;
        const changefreq = url.getElementsByTagName('changefreq')[0]?.textContent;
        
        if (loc) {
          parsedUrls.push({
            url: loc,
            lastmod,
            priority: priority ? parseFloat(priority) : undefined,
            changefreq,
          });
        }
      }
      
      // Stwórz wpisy mapowania
      const mappingEntries: MappingEntry[] = parsedUrls.map(url => ({
        ...url,
        targetUrl: '',
        redirectType: 301 as const,
        status: 'unmapped' as const,
      }));
      
      setSitemapUrls(mappingEntries);
      toast({
        title: 'Sukces',
        description: `Zaimportowano ${parsedUrls.length} URL-i ze sitemapy`,
      });
    } catch (error) {
      toast({
        title: 'Błąd',
        description: 'Nie udało się sparsować sitemapy XML',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/xml') {
      parseSitemap(file);
    } else {
      toast({
        title: 'Błąd',
        description: 'Proszę wybrać plik XML sitemapy',
        variant: 'destructive',
      });
    }
  };

  const updateMapping = (index: number, field: keyof MappingEntry, value: any) => {
    setSitemapUrls(prev => prev.map((entry, i) => 
      i === index 
        ? { 
            ...entry, 
            [field]: value,
            status: field === 'targetUrl' && value ? 'mapped' : entry.status
          }
        : entry
    ));
  };

  const autoMapUrls = () => {
    setSitemapUrls(prev => prev.map(entry => {
      // Prosta heurystyka mapowania
      const path = new URL(entry.url).pathname;
      const matchedPage = availablePages.find(page => 
        path.includes(page.substring(1)) || 
        page.includes(path.substring(1))
      );
      
      return {
        ...entry,
        targetUrl: matchedPage || '',
        status: matchedPage ? 'mapped' as const : 'unmapped' as const,
      };
    }));
  };

  const createRedirects = async () => {
    const mappedUrls = sitemapUrls.filter(entry => entry.status === 'mapped' && entry.targetUrl);
    
    if (mappedUrls.length === 0) {
      toast({
        title: 'Brak mapowań',
        description: 'Nie ma zmapowanych URL-i do utworzenia przekierowań',
        variant: 'destructive',
      });
      return;
    }

    const redirectsData = mappedUrls.map(entry => ({
      source_url: entry.url,
      target_url: entry.targetUrl.startsWith('http') ? entry.targetUrl : `${window.location.origin}${entry.targetUrl}`,
      redirect_type: entry.redirectType,
      is_active: true,
      description: `Automatyczne przekierowanie ze starej sitemapy`,
    }));

    await bulkImportRedirects(redirectsData);
    setSitemapUrls([]);
  };

  const getMappingStats = () => {
    const mapped = sitemapUrls.filter(url => url.status === 'mapped').length;
    const unmapped = sitemapUrls.filter(url => url.status === 'unmapped').length;
    return { mapped, unmapped, total: sitemapUrls.length };
  };

  const stats = getMappingStats();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Import sitemapy XML
          </CardTitle>
          <CardDescription>
            Importuj starą sitemapę XML i zmapuj URL-e na nowe podstrony
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".xml"
              onChange={handleFileUpload}
              disabled={loading}
            />
            <Button 
              onClick={autoMapUrls} 
              disabled={sitemapUrls.length === 0}
              variant="outline"
            >
              Auto-mapowanie
            </Button>
          </div>
          
          {sitemapUrls.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="text-sm">
                <Badge variant="secondary">{stats.total} łącznie</Badge>
                <Badge variant="default" className="ml-2">{stats.mapped} zmapowane</Badge>
                <Badge variant="destructive" className="ml-2">{stats.unmapped} niezmapowane</Badge>
              </div>
              <Button 
                onClick={createRedirects}
                disabled={stats.mapped === 0}
                className="ml-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Utwórz {stats.mapped} przekierowań
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {sitemapUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mapowanie URL-i</CardTitle>
            <CardDescription>
              Przypisz stare URL-e do nowych podstron
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sitemapUrls.map((entry, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{entry.url}</div>
                    <div className="text-xs text-muted-foreground">
                      {entry.lastmod && `Ostatnia modyfikacja: ${new Date(entry.lastmod).toLocaleDateString()}`}
                    </div>
                  </div>
                  
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  
                  <Select
                    value={entry.targetUrl}
                    onValueChange={(value) => updateMapping(index, 'targetUrl', value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Wybierz stronę docelową" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePages.map(page => (
                        <SelectItem key={page} value={page}>
                          {page}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={entry.redirectType.toString()}
                    onValueChange={(value) => updateMapping(index, 'redirectType', parseInt(value))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="301">301</SelectItem>
                      <SelectItem value="302">302</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Badge variant={
                    entry.status === 'mapped' ? 'default' : 
                    entry.status === 'exists' ? 'secondary' : 'destructive'
                  }>
                    {entry.status === 'mapped' ? 'Zmapowane' :
                     entry.status === 'exists' ? 'Istnieje' : 'Nie zmapowane'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};