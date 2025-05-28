
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Trash2, Plus, Globe, Search } from 'lucide-react';
import { usePages, useCreatePage, useDeletePage, usePage } from '@/hooks/usePages';
import { useToast } from '@/hooks/use-toast';
import PageEditor from '@/components/admin/PageEditor';

const PagesManagement: React.FC = () => {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPageData, setNewPageData] = useState({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
  });

  const { data: pages, isLoading } = usePages();
  const { data: selectedPage } = usePage(selectedPageId || '');
  const createPage = useCreatePage();
  const deletePage = useDeletePage();
  const { toast } = useToast();

  const filteredPages = pages?.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createPage.mutateAsync({
        ...newPageData,
        status: 'draft',
      });
      
      setIsCreateDialogOpen(false);
      setNewPageData({ title: '', slug: '', meta_title: '', meta_description: '' });
      toast({
        title: "Sukces",
        description: "Nowa strona została utworzona",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się utworzyć strony",
        variant: "destructive",
      });
    }
  };

  const handleDeletePage = async (id: string, title: string) => {
    if (!confirm(`Czy na pewno chcesz usunąć stronę "${title}"?`)) return;
    
    try {
      await deletePage.mutateAsync(id);
      toast({
        title: "Sukces",
        description: "Strona została usunięta",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć strony",
        variant: "destructive",
      });
    }
  };

  if (selectedPage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPageId(null)}
          >
            ← Powrót do listy
          </Button>
        </div>
        <PageEditor page={selectedPage} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zarządzanie Stronami</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj Stronę
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Utwórz nową stronę</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <Label htmlFor="title">Tytuł strony</Label>
                <Input
                  id="title"
                  value={newPageData.title}
                  onChange={(e) => setNewPageData(prev => ({ 
                    ...prev, 
                    title: e.target.value,
                    slug: e.target.value.toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .trim()
                  }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Ścieżka URL</Label>
                <Input
                  id="slug"
                  value={newPageData.slug}
                  onChange={(e) => setNewPageData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="/nowa-strona"
                  required
                />
              </div>
              <div>
                <Label htmlFor="meta_title">Meta tytuł (opcjonalnie)</Label>
                <Input
                  id="meta_title"
                  value={newPageData.meta_title}
                  onChange={(e) => setNewPageData(prev => ({ ...prev, meta_title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="meta_description">Meta opis (opcjonalnie)</Label>
                <Input
                  id="meta_description"
                  value={newPageData.meta_description}
                  onChange={(e) => setNewPageData(prev => ({ ...prev, meta_description: e.target.value }))}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button type="submit" disabled={createPage.isPending}>
                  {createPage.isPending ? 'Tworzenie...' : 'Utwórz'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Szukaj stron..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tytuł</TableHead>
              <TableHead>Ścieżka</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ostatnia modyfikacja</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Ładowanie stron...
                </TableCell>
              </TableRow>
            ) : filteredPages?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Nie znaleziono stron
                </TableCell>
              </TableRow>
            ) : (
              filteredPages?.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell className="font-mono text-sm">{page.slug}</TableCell>
                  <TableCell>
                    <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                      {page.status === 'published' ? 'Opublikowana' : 'Szkic'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(page.updated_at).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {page.status === 'published' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <a href={page.slug} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-1" />
                            Zobacz
                          </a>
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedPageId(page.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edytuj
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeletePage(page.id, page.title)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Usuń
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
  );
};

export default PagesManagement;
