
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import BlockRenderer from './BlockRenderer';
import type { PageBlock, ViewportMode } from './types';

interface PageCanvasProps {
  blocks: PageBlock[];
  selectedBlock: PageBlock | null;
  onSelectBlock: (block: PageBlock | null) => void;
  onUpdateBlock: (blockId: string, updates: Partial<PageBlock>) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  viewportMode: ViewportMode;
}

const PageCanvas: React.FC<PageCanvasProps> = ({
  blocks,
  selectedBlock,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  viewportMode,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div
      ref={setNodeRef}
      className="bg-white min-h-[600px] shadow-sm rounded-lg border border-gray-200 relative"
    >
      {sortedBlocks.length === 0 ? (
        <div className="flex items-center justify-center h-60 text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-lg font-medium">Przeciągnij bloki tutaj</p>
            <p className="text-sm">Zacznij budować swoją stronę</p>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4">
          {sortedBlocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              isSelected={selectedBlock?.id === block.id}
              onSelect={() => onSelectBlock(block)}
              onUpdate={(updates) => onUpdateBlock(block.id, updates)}
              onDelete={() => onDeleteBlock(block.id)}
              onDuplicate={() => onDuplicateBlock(block.id)}
              viewportMode={viewportMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageCanvas;
