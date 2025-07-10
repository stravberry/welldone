import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useSeoMigration, SitemapUrl } from '@/hooks/useSeoMigration';
import { Loader2, ExternalLink, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const SeoMigrationWizard: React.FC = () => {
  const [sitemapUrl, setSitemapUrl] = useState('https://well-done.pl/wp-sitemap.xml');
  const [currentStep, setCurrentStep] = useState(1);
  
  const {
    sitemapUrls,
    loading,
    stats,
    parseSitemap,
    analyzeUrls,
    generateSmartMappings,
    updateUrlAction,
    createBulkRedirects
  } = useSeoMigration();

  const getStatusIcon = (status: SitemapUrl['status'], httpStatus?: number) => {
    if (status === 'error') return <XCircle className="h-4 w-4 text-destructive" />;
    if (status === 'analyzed' && httpStatus === 200) return <CheckCircle className="h-4 w-4 text-success" />;
    if (status === 'analyzed' && httpStatus !== 200) return <AlertTriangle className="h-4 w-4 text-warning" />;
    if (status === 'mapped') return <CheckCircle className="h-4 w-4 text-primary" />;
    return <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />;
  };

  const getCategoryColor = (category: SitemapUrl['category']) => {
    const colors = {
      product: 'bg-blue-100 text-blue-800',
      service: 'bg-green-100 text-green-800',
      blog: 'bg-purple-100 text-purple-800',
      category: 'bg-orange-100 text-orange-800',
      page: 'bg-gray-100 text-gray-800',
      unknown: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.unknown;
  };

  const getActionColor = (action: SitemapUrl['action']) => {
    const colors = {
      redirect: 'bg-blue-100 text-blue-800',
      recreate: 'bg-green-100 text-green-800',
      ignore: 'bg-gray-100 text-gray-800'
    };
    return colors[action];
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardHeader>
          <CardTitle>Kreator migracji SEO</CardTitle>
          <CardDescription>
            Krok {currentStep} z 4: {
              currentStep === 1 ? 'Import sitemapy' :
              currentStep === 2 ? 'Analiza URL-i' :
              currentStep === 3 ? 'Mapowanie' :
              'Implementacja'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(currentStep / 4) * 100} className="w-full" />
        </CardContent>
      </Card>

      {/* Statistics */}
      {stats.total > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Łącznie URL-i</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{stats.analyzed}</div>
              <p className="text-xs text-muted-foreground">Przeanalizowane</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.mapped}</div>
              <p className="text-xs text-muted-foreground">Zmapowane</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.toRedirect}</div>
              <p className="text-xs text-muted-foreground">Przekierowania</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.toRecreate}</div>
              <p className="text-xs text-muted-foreground">Do odtworzenia</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">{stats.errors}</div>
              <p className="text-xs text-muted-foreground">Błędy</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1">1. Import</TabsTrigger>
          <TabsTrigger value="2" disabled={stats.total === 0}>2. Analiza</TabsTrigger>
          <TabsTrigger value="3" disabled={stats.analyzed === 0}>3. Mapowanie</TabsTrigger>
          <TabsTrigger value="4" disabled={stats.mapped === 0}>4. Implementacja</TabsTrigger>
        </TabsList>

        {/* Step 1: Import Sitemap */}
        <TabsContent value="1" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import sitemapy WordPress</CardTitle>
              <CardDescription>
                Wklej URL do sitemapy XML swojej starej strony WordPress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sitemap-url">URL sitemapy</Label>
                <Input
                  id="sitemap-url"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://example.com/wp-sitemap.xml"
                />
              </div>
              <Button 
                onClick={() => parseSitemap(sitemapUrl)}
                disabled={loading || !sitemapUrl}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Załaduj sitemapę
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Analysis */}
        <TabsContent value="2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analiza URL-i</CardTitle>
              <CardDescription>
                Sprawdź status HTTP każdego URL-a i kategoryzuj je automatycznie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => analyzeUrls(sitemapUrls)}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analizuj wszystkie URL-e
              </Button>
              
              {sitemapUrls.length > 0 && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sitemapUrls.slice(0, 50).map((url, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 flex-1">
                        {getStatusIcon(url.status, url.httpStatus)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{url.url}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(url.category)}>{url.category}</Badge>
                            {url.httpStatus && (
                              <Badge variant={url.httpStatus === 200 ? "default" : "destructive"}>
                                {url.httpStatus}
                              </Badge>
                            )}
                            {url.priority && (
                              <Badge variant="outline">Priority: {url.priority}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                  {sitemapUrls.length > 50 && (
                    <p className="text-sm text-muted-foreground text-center">
                      ... i {sitemapUrls.length - 50} więcej URL-i
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Mapping */}
        <TabsContent value="3" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inteligentne mapowanie</CardTitle>
              <CardDescription>
                Automatycznie dopasuj stare URL-e do nowych stron lub oznacz do odtworzenia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={generateSmartMappings}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Wygeneruj inteligentne mapowania
              </Button>
              
              {sitemapUrls.length > 0 && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sitemapUrls.slice(0, 20).map((url, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{url.url}</p>
                          <Badge className={getCategoryColor(url.category)}>{url.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Akcja</Label>
                          <Select 
                            value={url.action} 
                            onValueChange={(value: SitemapUrl['action']) => updateUrlAction(index, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="redirect">Przekieruj</SelectItem>
                              <SelectItem value="recreate">Odtwórz jako landing</SelectItem>
                              <SelectItem value="ignore">Ignoruj</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {url.action === 'redirect' && (
                          <div>
                            <Label>Docelowy URL</Label>
                            <Input
                              value={url.suggestedMapping || ''}
                              onChange={(e) => updateUrlAction(index, url.action, e.target.value)}
                              placeholder="/nowa-strona"
                            />
                          </div>
                        )}
                      </div>
                      
                      <Badge className={getActionColor(url.action)}>
                        {url.action === 'redirect' ? 'Przekierowanie' : 
                         url.action === 'recreate' ? 'Landing page' : 'Ignorowany'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Implementation */}
        <TabsContent value="4" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Implementacja</CardTitle>
              <CardDescription>
                Utwórz przekierowania i zaplanuj landing pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={createBulkRedirects}
                  disabled={loading || stats.toRedirect === 0}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Utwórz {stats.toRedirect} przekierowań
                </Button>
                
                <Button variant="outline" disabled>
                  Zaplanuj {stats.toRecreate} landing pages
                  <span className="text-xs ml-2">(wkrótce)</span>
                </Button>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Podsumowanie migracji:</h4>
                <ul className="text-sm space-y-1">
                  <li>• {stats.toRedirect} URL-i zostanie przekierowanych</li>
                  <li>• {stats.toRecreate} landing pages do stworzenia</li>
                  <li>• {stats.errors} URL-i z błędami do sprawdzenia</li>
                  <li>• Zachowanie pozycji SEO przez 301 redirects</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};