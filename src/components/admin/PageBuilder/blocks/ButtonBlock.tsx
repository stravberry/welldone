
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import type { PageBlock } from '../types';

interface ButtonBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ block, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [buttonText, setButtonText] = useState(block.content.text || '');
  const [buttonUrl, setButtonUrl] = useState(block.content.url || '');

  const handleSave = () => {
    onUpdate({
      content: { 
        ...block.content, 
        text: buttonText,
        url: buttonUrl
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setButtonText(block.content.text || '');
    setButtonUrl(block.content.url || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Input
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          placeholder="Tekst przycisku"
        />
        <Input
          type="url"
          value={buttonUrl}
          onChange={(e) => setButtonUrl(e.target.value)}
          placeholder="URL linku"
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

  return (
    <div className="group relative inline-block">
      <Button
        variant={block.content.variant === 'outline' ? 'outline' : 'default'}
        className="pointer-events-none"
      >
        {block.content.text || 'Kliknij tutaj'}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute -top-8 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow pointer-events-auto"
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

export default ButtonBlock;
