
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Settings, Smartphone, Tablet, Monitor, Palette, ArrowLeft } from 'lucide-react';
import PagesManagement from './PagesManagement';
import PageEditor from '@/components/admin/PageEditor';
import CreatePageDialog from '@/components/admin/CreatePageDialog';
import { usePagesManagement } from '@/hooks/usePagesManagement';
import { usePage } from '@/hooks/usePages';

const ContentStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  
  const {
    pages,
    isLoading,
    handleCreatePage,
    createPageLoading,
  } = usePagesManagement();

  const { data: selectedPage } = usePage(selectedPageId || '');

  const quickStats = {
    totalPages: pages?.length || 0,
    publishedPages: pages?.filter(p => p.status === 'published').length || 0,
    draftPages: pages?.filter(p => p.status === 'draft').length || 0,
  };

  // If a page is selected for editing, show the PageEditor
  if (selectedPageId && selectedPage) {
    return (
      <PageEditor
        page={selectedPage}
        onBack={() => setSelectedPageId(null)}
        onSave={async (content) => {
          console.log('Saving page content:', content);
        }}
      />
    );
  }

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Palette className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Studio</h1>
              <p className="text-gray-600">Zarządzaj treścią swojej witryny</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <CreatePageDialog 
              onCreatePage={handleCreatePage}
              isLoading={createPageLoading}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wszystkie strony</p>
                  <p className="text-2xl font-bold">{quickStats.totalPages}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Opublikowane</p>
                  <p className="text-2xl font-bold text-green-600">{quickStats.publishedPages}</p>
                </div>
                <div className="bg-green-100 p-2 rounded">
                  <Monitor className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wersje robocze</p>
                  <p className="text-2xl font-bold text-orange-600">{quickStats.draftPages}</p>
                </div>
                <div className="bg-orange-100 p-2 rounded">
                  <Edit className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Wszystkie strony</span>
              <span className="sm:hidden">Strony</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Szablony</span>
              <span className="sm:hidden">Szablony</span>
            </TabsTrigger>
            <TabsTrigger value="responsive" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Responsive</span>
              <span className="sm:hidden">Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Ustawienia</span>
              <span className="sm:hidden">Opcje</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-4">
            <PagesManagement onSelectPage={setSelectedPageId} />
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Galeria szablonów</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Palette className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Galeria szablonów</p>
                  <p className="text-sm">Ta funkcja będzie dostępna wkrótce</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responsive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Podgląd responsywny</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <div className="flex justify-center space-x-4 mb-4">
                    <Monitor className="h-8 w-8 text-gray-400" />
                    <Tablet className="h-8 w-8 text-gray-400" />
                    <Smartphone className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium">Podgląd responsywny</p>
                  <p className="text-sm">Ta funkcja będzie dostępna wkrótce</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ustawienia globalne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Ustawienia strony</p>
                  <p className="text-sm">Globalne style, SEO i inne ustawienia będą dostępne wkrótce</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentStudio;
