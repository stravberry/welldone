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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ArrowRightLeft className="h-6 w-6" />
            Przekierowania
          </h1>
          <p className="text-muted-foreground mt-1">
            Zarządzanie przekierowaniami URL, importowanie sitemap i monitoring SEO
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSitemap} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Pobierz sitemap
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Dodaj przekierowanie
          </Button>
        </div>
      </div>

      {/* Statystyki */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Łącznie</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Aktywne</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-500">{stats.inactive}</div>
            <p className="text-xs text-muted-foreground">Nieaktywne</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.permanent}</div>
            <p className="text-xs text-muted-foreground">301</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.temporary}</div>
            <p className="text-xs text-muted-foreground">302</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalHits}</div>
            <p className="text-xs text-muted-foreground">Użycia</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.unresolved404s}</div>
            <p className="text-xs text-muted-foreground">404 błędy</p>
          </CardContent>
        </Card>
      </div>

      {/* Główny panel z tabami */}
      <Tabs defaultValue="redirects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="redirects">Przekierowania</TabsTrigger>
          <TabsTrigger value="import">Import sitemap</TabsTrigger>
          <TabsTrigger value="404errors">Błędy 404</TabsTrigger>
        </TabsList>

        <TabsContent value="redirects" className="space-y-4">
          {/* Wyszukiwanie */}
          <div className="flex gap-4">
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
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL źródłowy</TableHead>
                      <TableHead>URL docelowy</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Użycia</TableHead>
                      <TableHead>Ostatnie użycie</TableHead>
                      <TableHead>Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRedirects.map((redirect) => (
                      <TableRow key={redirect.id}>
                        <TableCell className="font-mono text-sm max-w-xs truncate">
                          {redirect.source_url}
                        </TableCell>
                        <TableCell className="font-mono text-sm max-w-xs truncate">
                          {redirect.target_url}
                        </TableCell>
                        <TableCell>
                          <Badge variant={redirect.redirect_type === 301 ? "default" : "secondary"}>
                            {redirect.redirect_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={redirect.is_active ? "default" : "secondary"}>
                            {redirect.is_active ? 'Aktywne' : 'Nieaktywne'}
                          </Badge>
                        </TableCell>
                        <TableCell>{redirect.hit_count}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {redirect.last_accessed 
                            ? new Date(redirect.last_accessed).toLocaleString() 
                            : 'Nigdy'
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(redirect)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(redirect.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import">
          <SitemapImporter />
        </TabsContent>

        <TabsContent value="404errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Błędy 404
              </CardTitle>
              <CardDescription>
                Monitorowanie błędów 404 i ich rozwiązywanie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Referrer</TableHead>
                      <TableHead>Data wystąpienia</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notFoundErrors.slice(0, 20).map((error) => (
                      <TableRow key={error.id}>
                        <TableCell className="font-mono text-sm max-w-xs truncate">
                          {error.url}
                        </TableCell>
                        <TableCell className="text-sm max-w-xs truncate">
                          {error.referrer || 'Brak'}
                        </TableCell>
                        <TableCell className="text-xs">
                          {new Date(error.occurred_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={error.resolved ? "default" : "destructive"}>
                            {error.resolved ? 'Rozwiązane' : 'Nierozwiązane'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {!error.resolved && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => resolveNotFoundError(error.id)}
                            >
                              Oznacz jako rozwiązane
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
  );
};

export default RedirectsManagement;