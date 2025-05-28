
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import type { PageBlock } from '../types';

interface TextBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ block, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(block.content.text || '');

  const handleSave = () => {
    onUpdate({
      content: { ...block.content, text: editText }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(block.content.text || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Wprowadź tekst..."
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
    <div className="group relative">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: block.content.text || '<p>Kliknij aby edytować tekst</p>' }}
      />
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
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

export default TextBlock;
