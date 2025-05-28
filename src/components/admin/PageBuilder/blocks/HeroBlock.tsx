
import React from 'react';
import type { PageBlock } from '../types';

interface HeroBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ block, onUpdate }) => {
  const { title, subtitle, description, buttonText, buttonUrl, videoUrl } = block.content;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 rounded-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {title || 'Twój nagłówek hero'}
            </h1>
            <p className="text-lg mb-8">
              {description || 'Opis sekcji hero - wprowadź tekst zachęcający do działania'}
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-orange-600 px-6 py-3 rounded hover:bg-gray-100">
                {buttonText || 'Główny przycisk'}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            {videoUrl ? (
              <div className="w-full max-w-md aspect-video">
                <iframe 
                  src={videoUrl}
                  className="w-full h-full rounded"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full max-w-md aspect-video bg-white/20 rounded flex items-center justify-center">
                <span className="text-white/80">Video placeholder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBlock;
