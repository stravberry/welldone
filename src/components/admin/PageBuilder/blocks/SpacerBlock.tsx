
import React from 'react';
import type { PageBlock } from '../types';

interface SpacerBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const SpacerBlock: React.FC<SpacerBlockProps> = ({ block }) => {
  const height = block.content.height || 40;

  return (
    <div
      style={{ height: `${height}px` }}
      className="border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm"
    >
      Odstęp ({height}px)
    </div>
  );
};

export default SpacerBlock;
