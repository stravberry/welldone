
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Edit } from 'lucide-react';
import type { PageBlock } from '../types';

interface ImageBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(block.content.src || '');
  const [altText, setAltText] = useState(block.content.alt || '');

  const handleSave = () => {
    onUpdate({
      content: { 
        ...block.content, 
        src: imageUrl,
        alt: altText
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setImageUrl(block.content.src || '');
    setAltText(block.content.alt || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2 p-4 border border-dashed border-gray-300 rounded">
        <Input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL obrazu"
        />
        <Input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Tekst alternatywny"
        />
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleSave}>
            Zapisz
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            Anuluj
          </Button>
        </div>
      </div>
    );
  }

  if (!block.content.src) {
    return (
      <div className="group relative">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Kliknij aby dodać obraz</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative">
      <img
        src={block.content.src}
        alt={block.content.alt}
        className="max-w-full h-auto rounded"
      />
      {block.content.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          {block.content.caption}
        </p>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ImageBlock;
