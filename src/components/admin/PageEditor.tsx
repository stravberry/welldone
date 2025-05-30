
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Eye, Code, Edit3, Save, ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import PageSectionEditor from './PageSectionEditor';
import HTMLCodeEditor from './HTMLCodeEditor';
import LivePageBuilder from './LivePageBuilder';
import { usePageSections } from '@/hooks/usePages';
import { useSavePageBlocks } from '@/hooks/usePageBlocks';
import type { Tables } from '@/integrations/supabase/types';
import type { PageBlock } from './PageBuilder/types';

type Page = Tables<'pages'> & {
  page_sections: Tables<'page_sections'>[];
};

interface PageEditorProps {
  page: Page;
  onSave?: (content: any) => void;
  onBack?: () => void;
}

type EditorMode = 'live-builder' | 'sections' | 'code';
type ViewportMode = 'desktop' | 'tablet' | 'mobile';

const PageEditor: React.FC<PageEditorProps> = ({ page, onSave, onBack }) => {
  const [activeEditor, setActiveEditor] = useState<EditorMode>('live-builder');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const { data: pageSections, isLoading } = usePageSections(page.id);
  const saveBlocks = useSavePageBlocks();

  const handleLiveBuilderSave = async (blocks: PageBlock[]) => {
    try {
      await saveBlocks.mutateAsync({ pageId: page.id, blocks });
      if (onSave) {
        onSave({ blocks });
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save blocks:', error);
      throw error;
    }
  };

  const handleCodeSave = () => {
    if (onSave) {
      onSave({ headCode, bodyCode });
    }
    setHasChanges(false);
  };

  const handleSectionDelete = (sectionId: string) => {
    console.log('Deleting section:', sectionId);
  };

  const getStatusBadge = () => {
    if (page.status === 'published') {
      return <Badge className="bg-green-100 text-green-800">Opublikowane</Badge>;
    }
    return <Badge variant="secondary">Wersja robocza</Badge>;
  };

  const getViewportIcon = () => {
    switch (viewportMode) {
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const renderEditor = () => {
    if (activeEditor === 'live-builder') {
      return (
        <div className="h-full">
          <LivePageBuilder
            pageId={page.id}
            onSave={handleLiveBuilderSave}
          />
        </div>
      );
    } else if (activeEditor === 'sections') {
      return (
        <div className="space-y-4 p-6 max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Ładowanie sekcji...</div>
            </div>
          ) : pageSections && pageSections.length > 0 ? (
            pageSections.map((section) => (
              <PageSectionEditor
                key={section.id}
                section={section}
                onDelete={handleSectionDelete}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Brak sekcji na tej stronie</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="p-6 max-w-6xl mx-auto">
          <HTMLCodeEditor
            headCode={headCode}
            bodyCode={bodyCode}
            onHeadCodeChange={(code) => {
              setHeadCode(code);
              setHasChanges(true);
            }}
            onBodyCodeChange={(code) => {
              setBodyCode(code);
              setHasChanges(true);
            }}
            onSave={handleCodeSave}
          />
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{page.title}</h1>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusBadge()}
                <span className="text-sm text-gray-500">/{page.slug}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Viewport Controls - only show in live-builder mode */}
          {activeEditor === 'live-builder' && (
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('desktop')}
                className="h-8"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('tablet')}
                className="h-8"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportMode('mobile')}
                className="h-8"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          {/* Editor Mode Tabs */}
          <Tabs value={activeEditor} onValueChange={(value) => setActiveEditor(value as EditorMode)}>
            <TabsList className="bg-gray-100">
              <TabsTrigger value="live-builder" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Live Builder</span>
              </TabsTrigger>
              <TabsTrigger value="sections" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Sekcje</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">HTML</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {hasChanges && (
              <span className="text-sm text-orange-600">Niezapisane zmiany</span>
            )}
            {activeEditor !== 'live-builder' && (
              <Button 
                onClick={handleCodeSave}
                disabled={!hasChanges}
                className="bg-orange-600 hover:bg-orange-700"
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Zapisz
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {renderEditor()}
      </div>
    </div>
  );
};

export default PageEditor;
