import React, { useState } from 'react';
import { ArrowRightLeft, Plus, Edit, Trash2, Download, TrendingUp, AlertCircle, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRedirectsManagement, Redirect } from '@/hooks/useRedirectsManagement';
import { RedirectForm } from '@/components/admin/RedirectForm';
import { SitemapImporter } from '@/components/admin/SitemapImporter';
import { SeoMigrationWizard } from '@/components/admin/SeoMigrationWizard';
import { RedirectTester } from '@/components/admin/RedirectTester';

const RedirectsManagement: React.FC = () => {
  const {
    redirects,
    notFoundErrors,
    loading,
    createRedirect,
    updateRedirect,
    deleteRedirect,
    resolveNotFoundError,
  } = useRedirectsManagement();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRedirect, setSelectedRedirect] = useState<Redirect | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [redirectToDelete, setRedirectToDelete] = useState<string | null>(null);

  // Filtrowanie przekierowań
  const filteredRedirects = redirects.filter(redirect =>
    redirect.source_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    redirect.target_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    redirect.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (redirect: Redirect) => {
    setSelectedRedirect(redirect);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedRedirect(null);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setRedirectToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (redirectToDelete) {
      await deleteRedirect(redirectToDelete);
      setRedirectToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const handleFormSubmit = async (data: any) => {
    if (selectedRedirect) {
      await updateRedirect(selectedRedirect.id, data);
    } else {
      await createRedirect(data);
    }
  };

  const generateSitemap = () => {
    // Pobierz wszystkie aktywne strony
    const pages = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/uslugi', priority: 0.9, changefreq: 'weekly' },
      { url: '/udt-szkolenia', priority: 0.8, changefreq: 'monthly' },
      { url: '/kontakt', priority: 0.7, changefreq: 'monthly' },
      // Dodaj więcej stron...
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${window.location.origin}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Statystyki
  const stats = {
    total: redirects.length,
    active: redirects.filter(r => r.is_active).length,
    inactive: redirects.filter(r => !r.is_active).length,
    permanent: redirects.filter(r => r.redirect_type === 301).length,
    temporary: redirects.filter(r => r.redirect_type === 302).length,
    totalHits: redirects.reduce((sum, r) => sum + r.hit_count, 0),
    unresolved404s: notFoundErrors.filter(e => !e.resolved).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <ArrowRightLeft className="h-7 w-7 text-primary" />
                Przekierowania
              </h1>
              <p className="text-muted-foreground mt-2 text-sm lg:text-base">
                Zarządzanie przekierowaniami URL, importowanie sitemap i monitoring SEO
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button onClick={generateSitemap} variant="outline" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Pobierz sitemap
              </Button>
              <Button onClick={handleAdd} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj przekierowanie
              </Button>
            </div>
          </div>
        </div>

        {/* Statystyki */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
              <p className="text-xs lg:text-sm text-muted-foreground">Łącznie</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
              <p className="text-xs lg:text-sm text-muted-foreground">Aktywne</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="text-xl lg:text-2xl font-bold text-gray-500 dark:text-gray-400">{stats.inactive}</div>
              <p className="text-xs lg:text-sm text-muted-foreground">Nieaktywne</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.permanent}</div>
              <p className="text-xs lg:text-sm text-muted-foreground">301</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.temporary}</div>
              <p className="text-xs lg:text-sm text-muted-foreground">302</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHits}</div>
              <p className="text-xs lg:text-sm text-muted-foreground">Użycia</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 lg:p-6">
              <div className="text-xl lg:text-2xl font-bold text-red-600 dark:text-red-400">{stats.unresolved404s}</div>
              <p className="text-xs lg:text-sm text-muted-foreground">404 błędy</p>
            </CardContent>
          </Card>
        </div>

        {/* Główny panel z tabami */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Tabs defaultValue="redirects" className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 pt-6">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl">
                <TabsTrigger value="redirects" className="text-xs sm:text-sm">Przekierowania</TabsTrigger>
                <TabsTrigger value="migration" className="text-xs sm:text-sm">Migracja SEO</TabsTrigger>
                <TabsTrigger value="import" className="text-xs sm:text-sm">Import sitemap</TabsTrigger>
                <TabsTrigger value="404errors" className="text-xs sm:text-sm">Błędy 404</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="redirects" className="space-y-6 px-6 pb-6">
              {/* Tester przekierowań */}
              <RedirectTester />
              
              {/* Wyszukiwanie */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj przekierowań..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Tabela przekierowań */}
              <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="font-semibold text-gray-900 dark:text-white">URL źródłowy</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white">URL docelowy</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white">Typ</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white hidden md:table-cell">Użycia</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white hidden lg:table-cell">Ostatnie użycie</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white">Akcje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRedirects.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <ArrowRightLeft className="h-8 w-8" />
                              <p>Brak przekierowań do wyświetlenia</p>
                              {searchTerm && (
                                <p className="text-sm">Spróbuj zmienić kryteria wyszukiwania</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRedirects.map((redirect) => (
                          <TableRow key={redirect.id} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <TableCell className="font-mono text-xs sm:text-sm max-w-xs truncate">
                              <div className="flex items-center gap-2">
                                <span className="truncate">{redirect.source_url}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs sm:text-sm max-w-xs truncate">
                              <div className="flex items-center gap-2">
                                <span className="truncate">{redirect.target_url}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={redirect.redirect_type === 301 ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {redirect.redirect_type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={redirect.is_active ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {redirect.is_active ? 'Aktywne' : 'Nieaktywne'}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-sm">{redirect.hit_count}</TableCell>
                            <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                              {redirect.last_accessed 
                                ? new Date(redirect.last_accessed).toLocaleDateString() 
                                : 'Nigdy'
                              }
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1 sm:gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(redirect)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(redirect.id)}
                                  className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="migration" className="px-6 pb-6">
              <SeoMigrationWizard />
            </TabsContent>

            <TabsContent value="import" className="px-6 pb-6">
              <SitemapImporter />
            </TabsContent>

            <TabsContent value="404errors" className="space-y-6 px-6 pb-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Błędy 404
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitorowanie błędów 404 i ich rozwiązywanie
                </p>
              </div>
              
              <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="font-semibold text-gray-900 dark:text-white">URL</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white hidden sm:table-cell">Referrer</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white">Data wystąpienia</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-white">Akcje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notFoundErrors.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <AlertCircle className="h-8 w-8" />
                              <p>Brak błędów 404 do wyświetlenia</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        notFoundErrors.slice(0, 20).map((error) => (
                          <TableRow key={error.id} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <TableCell className="font-mono text-xs sm:text-sm max-w-xs truncate">
                              {error.url}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm max-w-xs truncate hidden sm:table-cell">
                              {error.referrer || 'Brak'}
                            </TableCell>
                            <TableCell className="text-xs">
                              {new Date(error.occurred_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={error.resolved ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {error.resolved ? 'Rozwiązane' : 'Nierozwiązane'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {!error.resolved && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => resolveNotFoundError(error.id)}
                                  className="text-xs h-8"
                                >
                                  Oznacz jako rozwiązane
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Formularze i dialogi */}
        <RedirectForm
          open={showForm}
          onOpenChange={setShowForm}
          redirect={selectedRedirect}
          onSubmit={handleFormSubmit}
        />

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Czy na pewno chcesz usunąć to przekierowanie?</AlertDialogTitle>
              <AlertDialogDescription>
                Ta akcja nie może być cofnięta. Przekierowanie zostanie trwale usunięte.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Anuluj</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Usuń</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default RedirectsManagement;