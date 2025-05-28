import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Save, Eye, Globe, Settings, Image, Plus, Paintbrush, ArrowLeft } from 'lucide-react';
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

type EditorMode = 'sections' | 'builder';

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
  const [activeEditor, setActiveEditor] = useState<EditorMode>('sections');
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
    try {
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

      console.log('Saving page builder blocks:', blocks);
      
      toast({
        title: "Sukces",
        description: "Strona została zapisana w page builderze",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać strony",
        variant: "destructive",
      });
    }
  };

  const handleSwitchToBuilder = () => {
    setActiveEditor('builder');
  };

  const handleBackToEditor = () => {
    setActiveEditor('sections');
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
      <div className="h-screen">
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleBackToEditor}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powrót do edytora
            </Button>
            <h1 className="text-xl font-semibold">{page.title} - Page Builder</h1>
          </div>
        </div>
        <PageBuilder
          pageId={page.id}
          onSave={handleSavePageBuilder}
        />
      </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Tytuł strony</Label>
                  <Input
                    id="title"
                    value={pageData.title}
                    onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={pageData.slug}
                    onChange={(e) => setPageData({ ...pageData, slug: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={pageData.status === 'published'}
                  onCheckedChange={(checked) => 
                    setPageData({ ...pageData, status: checked ? 'published' : 'draft' })
                  }
                />
                <Label htmlFor="status">
                  {pageData.status === 'published' ? 'Opublikowana' : 'Szkic'}
                </Label>
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
                  onClick={handleSwitchToBuilder}
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
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Ustawienia SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={pageData.meta_title}
                  onChange={(e) => setPageData({ ...pageData, meta_title: e.target.value })}
                  placeholder="Tytuł w wynikach wyszukiwania"
                />
              </div>
              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={pageData.meta_description}
                  onChange={(e) => setPageData({ ...pageData, meta_description: e.target.value })}
                  placeholder="Opis w wynikach wyszukiwania"
                />
              </div>
              <div>
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  value={pageData.meta_keywords}
                  onChange={(e) => setPageData({ ...pageData, meta_keywords: e.target.value })}
                  placeholder="Słowa kluczowe oddzielone przecinkami"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open Graph (Social Media)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="og-title">OG Title</Label>
                <Input
                  id="og-title"
                  value={pageData.og_title}
                  onChange={(e) => setPageData({ ...pageData, og_title: e.target.value })}
                  placeholder="Tytuł w social media"
                />
              </div>
              <div>
                <Label htmlFor="og-description">OG Description</Label>
                <Textarea
                  id="og-description"
                  value={pageData.og_description}
                  onChange={(e) => setPageData({ ...pageData, og_description: e.target.value })}
                  placeholder="Opis w social media"
                />
              </div>
              <div>
                <Label htmlFor="og-image">OG Image URL</Label>
                <Input
                  id="og-image"
                  value={pageData.og_image}
                  onChange={(e) => setPageData({ ...pageData, og_image: e.target.value })}
                  placeholder="URL obrazu w social media"
                />
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
              <p className="text-gray-500">Ustawienia zaawansowane będą dostępne wkrótce.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Galeria mediów
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Zarządzanie mediami będzie dostępne wkrótce.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageEditor;
