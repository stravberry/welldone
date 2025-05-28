
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Save, Eye, Globe, Settings, Image, Plus, Paintbrush } from 'lucide-react';
import { useUpdatePage, useCreatePageSection } from '@/hooks/usePages';
import { useToast } from '@/hooks/use-toast';
import PageSectionEditor from './PageSectionEditor';
import PageBuilder from './PageBuilder';
import type { Tables } from '@/integrations/supabase/types';
import type { PageBlock } from './PageBuilder/types';

type Page = Tables<'pages'> & {
  page_sections: Tables<'page_sections'>[];
};

interface PageEditorProps {
  page: Page;
}

const PageEditor: React.FC<PageEditorProps> = ({ page }) => {
  const [pageData, setPageData] = useState({
    title: page.title,
    slug: page.slug,
    meta_title: page.meta_title || '',
    meta_description: page.meta_description || '',
    meta_keywords: page.meta_keywords || '',
    og_title: page.og_title || '',
    og_description: page.og_description || '',
    og_image: page.og_image || '',
    status: page.status,
  });

  const [newSectionType, setNewSectionType] = useState('');
  const [activeEditor, setActiveEditor] = useState<'sections' | 'builder'>('sections');
  const updatePage = useUpdatePage();
  const createSection = useCreatePageSection();
  const { toast } = useToast();

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updatePage.mutateAsync({
        id: page.id,
        updates: {
          ...pageData,
          updated_at: new Date().toISOString(),
        }
      });
      
      toast({
        title: "Sukces",
        description: "Strona została zaktualizowana",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować strony",
        variant: "destructive",
      });
    }
  };

  const handleAddSection = async () => {
    if (!newSectionType) return;
    
    try {
      await createSection.mutateAsync({
        page_id: page.id,
        section_type: newSectionType,
        section_key: `${newSectionType}_${Date.now()}`,
        title: `Nowa sekcja ${newSectionType}`,
        content: '<p>Treść sekcji...</p>',
        order_index: (page.page_sections?.length || 0) + 1,
        is_active: true,
      });
      
      setNewSectionType('');
      toast({
        title: "Sukces",
        description: "Nowa sekcja została dodana",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się dodać sekcji",
        variant: "destructive",
      });
    }
  };

  const handleSavePageBuilder = async (blocks: PageBlock[]) => {
    // Convert blocks to page sections format
    const sectionsData = blocks.map((block, index) => ({
      page_id: page.id,
      section_type: 'builder_block',
      section_key: `builder_${block.type}_${block.id}`,
      title: `${block.type} block`,
      content: JSON.stringify(block),
      order_index: index,
      is_active: true,
    }));

    // Here you would save the blocks to the database
    // For now, we'll just show a success message
    console.log('Saving page builder blocks:', blocks);
  };

  const sectionTypes = [
    { value: 'hero', label: 'Hero/Nagłówek' },
    { value: 'about', label: 'O nas' },
    { value: 'services', label: 'Usługi' },
    { value: 'testimonials', label: 'Opinie' },
    { value: 'contact', label: 'Kontakt' },
    { value: 'cta', label: 'Call to Action' },
    { value: 'faq', label: 'FAQ' },
    { value: 'gallery', label: 'Galeria' },
  ];

  // Show full-screen page builder when active
  if (activeEditor === 'builder') {
    return (
      <PageBuilder
        pageId={page.id}
        onSave={handleSavePageBuilder}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{page.title}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
              {page.status === 'published' ? 'Opublikowana' : 'Szkic'}
            </Badge>
            <span className="text-sm text-gray-500">{page.slug}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Podgląd
          </Button>
          <Button onClick={handlePageSubmit} disabled={updatePage.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updatePage.isPending ? 'Zapisywanie...' : 'Zapisz'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Treść</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Podstawowe informacje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Tytuł strony</Label>
                  <Input
                    id="title"
                    value={pageData.title}
                    onChange={(e) => setPageData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Ścieżka URL</Label>
                  <Input
                    id="slug"
                    value={pageData.slug}
                    onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={pageData.status === 'published'}
                  onCheckedChange={(checked) => 
                    setPageData(prev => ({ ...prev, status: checked ? 'published' : 'draft' }))
                  }
                />
                <Label>Opublikuj stronę</Label>
              </div>
            </CardContent>
          </Card>

          {/* Editor Mode Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Tryb edycji</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button
                  variant={activeEditor === 'sections' ? 'default' : 'outline'}
                  onClick={() => setActiveEditor('sections')}
                  className="flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Sekcje (klasyczny)
                </Button>
                <Button
                  variant={activeEditor === 'builder' ? 'default' : 'outline'}
                  onClick={() => setActiveEditor('builder')}
                  className="flex items-center"
                >
                  <Paintbrush className="h-4 w-4 mr-2" />
                  Page Builder (wizualny)
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {activeEditor === 'sections' 
                  ? 'Edytuj sekcje strony za pomocą formularzy'
                  : 'Zbuduj stronę wizualnie przeciągając bloki'
                }
              </p>
            </CardContent>
          </Card>

          {/* Classic Sections Editor */}
          {activeEditor === 'sections' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Sekcje strony</CardTitle>
                <div className="flex items-center space-x-2">
                  <select
                    value={newSectionType}
                    onChange={(e) => setNewSectionType(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="">Wybierz typ sekcji</option>
                    {sectionTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <Button onClick={handleAddSection} size="sm" disabled={!newSectionType}>
                    <Plus className="h-4 w-4 mr-1" />
                    Dodaj
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {page.page_sections
                  ?.sort((a, b) => a.order_index - b.order_index)
                  .map(section => (
                    <PageSectionEditor
                      key={section.id}
                      section={section}
                    />
                  ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Optymalizacja SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta tytuł</Label>
                <Input
                  id="meta_title"
                  value={pageData.meta_title}
                  onChange={(e) => setPageData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="Tytuł widoczny w wynikach wyszukiwania"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Długość: {pageData.meta_title.length}/60 znaków
                </p>
              </div>
              
              <div>
                <Label htmlFor="meta_description">Meta opis</Label>
                <Textarea
                  id="meta_description"
                  value={pageData.meta_description}
                  onChange={(e) => setPageData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Opis strony widoczny w wynikach wyszukiwania"
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Długość: {pageData.meta_description.length}/160 znaków
                </p>
              </div>
              
              <div>
                <Label htmlFor="meta_keywords">Słowa kluczowe</Label>
                <Input
                  id="meta_keywords"
                  value={pageData.meta_keywords}
                  onChange={(e) => setPageData(prev => ({ ...prev, meta_keywords: e.target.value }))}
                  placeholder="słowo1, słowo2, słowo3"
                />
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Open Graph (Facebook, Twitter)</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="og_title">OG Tytuł</Label>
                    <Input
                      id="og_title"
                      value={pageData.og_title}
                      onChange={(e) => setPageData(prev => ({ ...prev, og_title: e.target.value }))}
                      placeholder="Tytuł przy udostępnianiu w social media"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="og_description">OG Opis</Label>
                    <Textarea
                      id="og_description"
                      value={pageData.og_description}
                      onChange={(e) => setPageData(prev => ({ ...prev, og_description: e.target.value }))}
                      placeholder="Opis przy udostępnianiu w social media"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="og_image">OG Obraz</Label>
                    <Input
                      id="og_image"
                      value={pageData.og_image}
                      onChange={(e) => setPageData(prev => ({ ...prev, og_image: e.target.value }))}
                      placeholder="URL obrazu do wyświetlenia w social media"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia strony</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Dodatkowe ustawienia będą dostępne wkrótce...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Zarządzanie mediami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Panel zarządzania mediami będzie dostępny wkrótce...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageEditor;
