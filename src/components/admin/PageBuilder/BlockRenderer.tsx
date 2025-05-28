
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, GripVertical } from 'lucide-react';
import TextBlock from './blocks/TextBlock';
import HeadingBlock from './blocks/HeadingBlock';
import ImageBlock from './blocks/ImageBlock';
import ButtonBlock from './blocks/ButtonBlock';
import SpacerBlock from './blocks/SpacerBlock';
import VideoBlock from './blocks/VideoBlock';
import type { PageBlock, ViewportMode } from './types';

interface BlockRendererProps {
  block: PageBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<PageBlock>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  viewportMode: ViewportMode;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  viewportMode,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'text':
        return <TextBlock block={block} onUpdate={onUpdate} />;
      case 'heading':
        return <HeadingBlock block={block} onUpdate={onUpdate} />;
      case 'image':
        return <ImageBlock block={block} onUpdate={onUpdate} />;
      case 'button':
        return <ButtonBlock block={block} onUpdate={onUpdate} />;
      case 'spacer':
        return <SpacerBlock block={block} onUpdate={onUpdate} />;
      case 'video':
        return <VideoBlock block={block} onUpdate={onUpdate} />;
      default:
        return (
          <div className="p-4 bg-gray-100 text-center text-gray-500">
            Nieznany typ bloku: {block.type}
          </div>
        );
    }
  };

  const getResponsiveStyles = () => {
    const baseStyles = block.styles;
    let responsiveStyles = { ...baseStyles };

    if (viewportMode === 'tablet' && block.responsive?.tablet) {
      responsiveStyles = { ...responsiveStyles, ...block.responsive.tablet };
    } else if (viewportMode === 'mobile' && block.responsive?.mobile) {
      responsiveStyles = { ...responsiveStyles, ...block.responsive.mobile };
    }

    return {
      marginTop: `${responsiveStyles.margin.top}px`,
      marginRight: `${responsiveStyles.margin.right}px`,
      marginBottom: `${responsiveStyles.margin.bottom}px`,
      marginLeft: `${responsiveStyles.margin.left}px`,
      paddingTop: `${responsiveStyles.padding.top}px`,
      paddingRight: `${responsiveStyles.padding.right}px`,
      paddingBottom: `${responsiveStyles.padding.bottom}px`,
      paddingLeft: `${responsiveStyles.padding.left}px`,
      backgroundColor: responsiveStyles.backgroundColor,
      textAlign: responsiveStyles.textAlign as any,
      borderRadius: responsiveStyles.borderRadius ? `${responsiveStyles.borderRadius}px` : undefined,
    };
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Block Controls */}
      {isSelected && (
        <div className="absolute -top-10 left-0 flex items-center space-x-1 bg-white shadow-md rounded px-2 py-1 border z-10">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-1"
          >
            <GripVertical className="h-4 w-4 text-gray-500" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="h-6 w-6 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Block Content */}
      <div style={getResponsiveStyles()}>
        {renderBlock()}
      </div>
    </div>
  );
};

export default BlockRenderer;
