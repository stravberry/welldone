
import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Copy, Move } from 'lucide-react';
import HeroBlock from './PageBuilder/blocks/HeroBlock';
import ServicesGridBlock from './PageBuilder/blocks/ServicesGridBlock';
import StatsBlock from './PageBuilder/blocks/StatsBlock';
import CTABlock from './PageBuilder/blocks/CTABlock';
import type { PageBlock, ViewportMode } from './PageBuilder/types';

interface LivePageCanvasProps {
  blocks: PageBlock[];
  selectedBlock: PageBlock | null;
  onSelectBlock: (block: PageBlock | null) => void;
  onUpdateBlock: (blockId: string, updates: Partial<PageBlock>) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  viewportMode: ViewportMode;
  isPreviewMode?: boolean;
}

interface SortableBlockProps {
  block: PageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<PageBlock>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  viewportMode: ViewportMode;
  isPreviewMode?: boolean;
}

const SortableBlock: React.FC<SortableBlockProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  viewportMode,
  isPreviewMode = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'hero':
        return <HeroBlock block={block} onUpdate={onUpdate} />;
      case 'services-grid':
        return <ServicesGridBlock block={block} onUpdate={onUpdate} />;
      case 'stats':
        return <StatsBlock block={block} onUpdate={onUpdate} />;
      case 'cta':
        return <CTABlock block={block} onUpdate={onUpdate} />;
      case 'text':
        return (
          <div className="p-6">
            <div dangerouslySetInnerHTML={{ __html: block.content.text || '<p>Tekst...</p>' }} />
          </div>
        );
      case 'heading':
        const HeadingTag = `h${block.content.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <div className="p-6">
            <HeadingTag className="text-3xl font-bold">
              {block.content.text || 'Nagłówek'}
            </HeadingTag>
          </div>
        );
      case 'image':
        return (
          <div className="p-6">
            {block.content.src ? (
              <img 
                src={block.content.src} 
                alt={block.content.alt || ''} 
                className="w-full h-auto rounded"
              />
            ) : (
              <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                <span className="text-gray-500">Brak obrazu</span>
              </div>
            )}
            {block.content.caption && (
              <p className="text-sm text-gray-600 mt-2">{block.content.caption}</p>
            )}
          </div>
        );
      case 'button':
        return (
          <div className="p-6">
            <Button 
              variant={block.content.variant || 'default'}
              asChild
            >
              <a href={block.content.url || '#'}>
                {block.content.text || 'Przycisk'}
              </a>
            </Button>
          </div>
        );
      case 'spacer':
        return (
          <div 
            className="w-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
            style={{ height: `${block.content.height || 40}px` }}
          >
            <span className="text-gray-500 text-sm">Odstęp {block.content.height || 40}px</span>
          </div>
        );
      default:
        return (
          <div className="p-6 bg-gray-100 border border-gray-300 rounded">
            <p className="text-gray-600">Nieznany typ bloku: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
        isHovered && !isPreviewMode ? 'ring-1 ring-gray-300' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isPreviewMode && onSelect()}
    >
      {/* Block content */}
      <div className="w-full">
        {renderBlock()}
      </div>

      {/* Edit overlay - only show in edit mode */}
      {!isPreviewMode && (isHovered || isSelected) && (
        <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 pointer-events-none">
          <div className="absolute top-2 right-2 flex space-x-1 pointer-events-auto">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-white shadow-md"
              {...attributes}
              {...listeners}
            >
              <Move className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-white shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-white shadow-md text-red-600 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="absolute top-2 left-2 pointer-events-auto">
            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
              {block.type}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LivePageCanvas: React.FC<LivePageCanvasProps> = ({
  blocks,
  selectedBlock,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  viewportMode,
  isPreviewMode = false,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'live-canvas',
  });

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div
      ref={setNodeRef}
      className="min-h-screen bg-white relative"
      onClick={() => !isPreviewMode && onSelectBlock(null)}
    >
      {sortedBlocks.length === 0 && !isPreviewMode ? (
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-lg font-medium">Przeciągnij bloki tutaj</p>
            <p className="text-sm">Zacznij budować swoją stronę</p>
          </div>
        </div>
      ) : (
        <div className="space-y-0">
          {sortedBlocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              isSelected={selectedBlock?.id === block.id}
              onSelect={() => onSelectBlock(block)}
              onUpdate={(updates) => onUpdateBlock(block.id, updates)}
              onDelete={() => onDeleteBlock(block.id)}
              onDuplicate={() => onDuplicateBlock(block.id)}
              viewportMode={viewportMode}
              isPreviewMode={isPreviewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LivePageCanvas;
