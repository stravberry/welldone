
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Image, Square, Link, Minus, Video, Grid, Quote, Award, BarChart, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { BlockType } from './types';

const blockTypes: BlockType[] = [
  // Basic blocks
  {
    id: 'text',
    name: 'Tekst',
    icon: <Type className="h-6 w-6" />,
    category: 'basic',
    description: 'Blok tekstowy z formatowaniem',
  },
  {
    id: 'heading',
    name: 'Nagłówek',
    icon: <Type className="h-6 w-6 font-bold" />,
    category: 'basic',
    description: 'Nagłówki H1-H6',
  },
  {
    id: 'image',
    name: 'Obraz',
    icon: <Image className="h-6 w-6" />,
    category: 'basic',
    description: 'Blok obrazu z podpisem',
  },
  {
    id: 'button',
    name: 'Przycisk',
    icon: <Square className="h-6 w-6" />,
    category: 'basic',
    description: 'Konfigurowalny przycisk CTA',
  },
  {
    id: 'spacer',
    name: 'Odstęp',
    icon: <Minus className="h-6 w-6" />,
    category: 'layout',
    description: 'Dodaj przestrzeń między blokami',
  },

  // Homepage specific blocks
  {
    id: 'hero',
    name: 'Hero',
    icon: <Zap className="h-6 w-6" />,
    category: 'homepage',
    description: 'Sekcja hero z tytułem i video',
  },
  {
    id: 'services-grid',
    name: 'Siatka usług',
    icon: <Grid className="h-6 w-6" />,
    category: 'homepage',
    description: 'Siatka usług z ikonami',
  },
  {
    id: 'stats',
    name: 'Statystyki',
    icon: <BarChart className="h-6 w-6" />,
    category: 'homepage',
    description: 'Blok ze statystykami',
  },
  {
    id: 'cta',
    name: 'Call to Action',
    icon: <Award className="h-6 w-6" />,
    category: 'homepage',
    description: 'Sekcja zachęcająca do działania',
  },

  // Media blocks
  {
    id: 'video',
    name: 'Video',
    icon: <Video className="h-6 w-6" />,
    category: 'media',
    description: 'Embed YouTube/Vimeo',
  },
  {
    id: 'quote',
    name: 'Cytat',
    icon: <Quote className="h-6 w-6" />,
    category: 'advanced',
    description: 'Blok cytatu/testimonial',
  },
];

const DraggableBlock: React.FC<{ block: BlockType }> = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: {
      type: 'library-block',
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab hover:shadow-md transition-shadow mb-2"
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className="text-gray-500">{block.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{block.name}</h4>
            <p className="text-xs text-gray-500 truncate">{block.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BlockLibrary: React.FC = () => {
  const groupedBlocks = blockTypes.reduce((acc, block) => {
    if (!acc[block.category]) {
      acc[block.category] = [];
    }
    acc[block.category].push(block);
    return acc;
  }, {} as Record<string, BlockType[]>);

  const categoryLabels = {
    basic: 'Podstawowe',
    homepage: 'Strona główna',
    media: 'Media',
    layout: 'Layout',
    advanced: 'Zaawansowane',
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="homepage" className="text-xs">Strona główna</TabsTrigger>
          <TabsTrigger value="basic" className="text-xs">Podstawowe</TabsTrigger>
          <TabsTrigger value="all" className="text-xs">Wszystkie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="homepage" className="mt-4 space-y-4">
          {groupedBlocks.homepage?.map((block) => (
            <DraggableBlock key={block.id} block={block} />
          ))}
        </TabsContent>
        
        <TabsContent value="basic" className="mt-4 space-y-4">
          {groupedBlocks.basic?.map((block) => (
            <DraggableBlock key={block.id} block={block} />
          ))}
        </TabsContent>
        
        <TabsContent value="all" className="mt-4 space-y-6">
          {Object.entries(groupedBlocks).map(([category, blocks]) => (
            <div key={category}>
              <h3 className="font-medium text-sm text-gray-700 mb-2">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div className="space-y-2">
                {blocks.map((block) => (
                  <DraggableBlock key={block.id} block={block} />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockLibrary;
