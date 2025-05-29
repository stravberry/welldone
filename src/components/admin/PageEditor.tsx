import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Code, Edit3 } from 'lucide-react';
import PageSectionEditor from './PageSectionEditor';
import HTMLCodeEditor from './HTMLCodeEditor';
import LivePageBuilder from './LivePageBuilder';

interface PageEditorProps {
  pageId: string;
  onSave?: (content: any) => void;
}

type EditorMode = 'sections' | 'code' | 'live-builder';

const PageEditor: React.FC<PageEditorProps> = ({ pageId, onSave }) => {
  const [activeEditor, setActiveEditor] = useState<EditorMode>('sections');
  const [pageContent, setPageContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadPageContent();
  }, [pageId]);

  const loadPageContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPageContent(data.content);
    } catch (error) {
      console.error("Could not load page content:", error);
      // Optionally set an error state to display an error message
    } finally {
      setIsLoading(false);
      setHasChanges(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: pageContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setHasChanges(false);
      if (onSave) {
        onSave(pageContent);
      }
    } catch (error) {
      console.error("Could not save page content:", error);
      // Optionally set an error state to display an error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (content: any) => {
    setPageContent(content);
    setHasChanges(true);
  };

  const renderEditor = () => {
    if (activeEditor === 'sections') {
      return (
        <PageSectionEditor
          pageId={pageId}
          content={pageContent}
          onChange={handleContentChange}
        />
      );
    } else if (activeEditor === 'code') {
      return (
        <HTMLCodeEditor
          initialContent={pageContent?.html || ''}
          onChange={(html) => handleContentChange({ ...pageContent, html })}
        />
      );
    } else {
      return (
        <LivePageBuilder
          pageId={pageId}
          onSave={onSave}
        />
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Ładowanie edytora...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
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

        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-sm text-orange-600">Niezapisane zmiany</span>
          )}
          <Button 
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Zapisz zmiany
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {renderEditor()}
      </div>
    </div>
  );
};

export default PageEditor;
