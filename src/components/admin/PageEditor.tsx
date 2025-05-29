
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Code, Edit3 } from 'lucide-react';
import PageSectionEditor from './PageSectionEditor';
import HTMLCodeEditor from './HTMLCodeEditor';
import LivePageBuilder from './LivePageBuilder';
import { usePageSections } from '@/hooks/usePages';
import type { Tables } from '@/integrations/supabase/types';

type Page = Tables<'pages'> & {
  page_sections: Tables<'page_sections'>[];
};

interface PageEditorProps {
  page: Page;
  onSave?: (content: any) => void;
}

type EditorMode = 'sections' | 'code' | 'live-builder';

const PageEditor: React.FC<PageEditorProps> = ({ page, onSave }) => {
  const [activeEditor, setActiveEditor] = useState<EditorMode>('sections');
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const { data: pageSections, isLoading } = usePageSections(page.id);

  const handleCodeSave = () => {
    // Handle saving the HTML code
    if (onSave) {
      onSave({ headCode, bodyCode });
    }
    setHasChanges(false);
  };

  const handleSectionDelete = (sectionId: string) => {
    // This will be handled by the individual PageSectionEditor components
    console.log('Deleting section:', sectionId);
  };

  const renderEditor = () => {
    if (activeEditor === 'sections') {
      return (
        <div className="space-y-4 p-4">
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
    } else if (activeEditor === 'code') {
      return (
        <div className="p-4">
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
    } else {
      return (
        <LivePageBuilder
          pageId={page.id}
          onSave={async (blocks) => {
            const content = { blocks };
            if (onSave) {
              await onSave(content);
            }
          }}
        />
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{page.title}</h1>
          <Tabs value={activeEditor} onValueChange={(value) => setActiveEditor(value as EditorMode)}>
            <TabsList>
              <TabsTrigger value="sections" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Sekcje
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Kod HTML
              </TabsTrigger>
              <TabsTrigger value="live-builder" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Live Builder
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-sm text-orange-600">Niezapisane zmiany</span>
          )}
          <Button 
            onClick={handleCodeSave}
            disabled={!hasChanges}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Zapisz zmiany
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {renderEditor()}
      </div>
    </div>
  );
};

export default PageEditor;
