
import React from 'react';
import type { PageBlock } from '../types';

interface CTABlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const CTABlock: React.FC<CTABlockProps> = ({ block }) => {
  const { title, description, buttonText, buttonUrl, backgroundType } = block.content;

  return (
    <div className={`py-16 relative overflow-hidden ${
      backgroundType === 'gradient' 
        ? 'bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700' 
        : 'bg-orange-600'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {title || 'Skorzystaj z bezpłatnego audytu'}
          </h2>
          <p className="text-xl text-orange-50 max-w-3xl mx-auto mb-8">
            {description || 'Dowiedz się, jak możemy pomóc zoptymalizować Twoje szkolenia i zmniejszyć koszty.'}
          </p>
          <div className="relative inline-block">
            <button className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-4 rounded shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {buttonText || 'Zamów bezpłatny audyt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABlock;
