
import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Monitor, Tablet, Smartphone, Save, Eye, Undo, Redo } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BlockLibrary from './PageBuilder/BlockLibrary';
import PageCanvas from './PageBuilder/PageCanvas';
import PropertiesPanel from './PageBuilder/PropertiesPanel';
import type { PageBlock, ViewportMode } from './PageBuilder/types';

interface PageBuilderProps {
  pageId: string;
  initialBlocks?: PageBlock[];
  onSave: (blocks: PageBlock[]) => Promise<void>;
}

const PageBuilder: React.FC<PageBuilderProps> = ({ pageId, initialBlocks = [], onSave }) => {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState<PageBlock | null>(null);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [history, setHistory] = useState<PageBlock[][]>([initialBlocks]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { toast } = useToast();

  const addToHistory = useCallback((newBlocks: PageBlock[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newBlocks]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);
    setActiveId(null);

    if (!over) return;

    // If dropping a new block from library
    if (active.data.current?.type === 'library-block') {
      const newBlock: PageBlock = {
        id: `block-${Date.now()}`,
        type: active.id as string,
        content: getDefaultContent(active.id as string),
        styles: getDefaultStyles(active.id as string),
        order: blocks.length,
      };
      
      const newBlocks = [...blocks, newBlock];
      setBlocks(newBlocks);
      addToHistory(newBlocks);
      setSelectedBlock(newBlock);
      return;
    }

    // If reordering existing blocks
    const oldIndex = blocks.findIndex(block => block.id === active.id);
    const newIndex = blocks.findIndex(block => block.id === over.id);

    if (oldIndex !== newIndex) {
      const newBlocks = arrayMove(blocks, oldIndex, newIndex).map((block, index) => ({
        ...block,
        order: index,
      }));
      setBlocks(newBlocks);
      addToHistory(newBlocks);
    }
  };

  const updateBlock = (blockId: string, updates: Partial<PageBlock>) => {
    const newBlocks = blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    
    if (selectedBlock?.id === blockId) {
      setSelectedBlock({ ...selectedBlock, ...updates });
    }
  };

  const deleteBlock = (blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find(block => block.id === blockId);
    if (!blockToDuplicate) return;

    const newBlock: PageBlock = {
      ...blockToDuplicate,
      id: `block-${Date.now()}`,
      order: blockToDuplicate.order + 1,
    };

    const newBlocks = [...blocks];
    newBlocks.splice(blockToDuplicate.order + 1, 0, newBlock);
    
    // Update order for subsequent blocks
    const reorderedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order: index,
    }));

    setBlocks(reorderedBlocks);
    addToHistory(reorderedBlocks);
  };

  const handleSave = async () => {
    try {
      await onSave(blocks);
      toast({
        title: "Sukces",
        description: "Strona została zapisana",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać strony",
        variant: "destructive",
      });
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
      setSelectedBlock(null);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
      setSelectedBlock(null);
    }
  };

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'tablet': return 'max-w-3xl';
      case 'mobile': return 'max-w-sm';
      default: return 'max-w-full';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Block Library Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Biblioteka bloków</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <BlockLibrary />
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewportMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewportMode('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewportMode === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewportMode('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewportMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewportMode('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex === 0}
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex === history.length - 1}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>

              <Badge variant="secondary">
                {blocks.length} {blocks.length === 1 ? 'blok' : 'bloków'}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Podgląd
              </Button>
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Zapisz
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100 p-6">
            <div className={`mx-auto transition-all duration-300 ${getViewportWidth()}`}>
              <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <PageCanvas
                  blocks={blocks}
                  selectedBlock={selectedBlock}
                  onSelectBlock={setSelectedBlock}
                  onUpdateBlock={updateBlock}
                  onDeleteBlock={deleteBlock}
                  onDuplicateBlock={duplicateBlock}
                  viewportMode={viewportMode}
                />
              </SortableContext>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedBlock && (
          <div className="w-80 bg-white border-l border-gray-200">
            <PropertiesPanel
              block={selectedBlock}
              onUpdateBlock={(updates) => updateBlock(selectedBlock.id, updates)}
              onClose={() => setSelectedBlock(null)}
            />
          </div>
        )}

        <DragOverlay>
          {activeId && isDragging && (
            <div className="bg-blue-500 text-white p-2 rounded shadow-lg opacity-80">
              Przeciąganie bloku...
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const getDefaultContent = (blockType: string): any => {
  switch (blockType) {
    case 'text':
      return { text: '<p>Wprowadź tekst...</p>' };
    case 'heading':
      return { text: 'Nagłówek', level: 2 };
    case 'image':
      return { src: '', alt: '', caption: '' };
    case 'button':
      return { text: 'Kliknij tutaj', url: '#', variant: 'primary' };
    case 'spacer':
      return { height: 40 };
    default:
      return {};
  }
};

const getDefaultStyles = (blockType: string): any => {
  return {
    margin: { top: 0, right: 0, bottom: 20, left: 0 },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    textAlign: 'left',
    backgroundColor: 'transparent',
  };
};

export default PageBuilder;
