
import React from 'react';
import type { PageBlock } from '../types';

interface StatsBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const StatsBlock: React.FC<StatsBlockProps> = ({ block }) => {
  const stats = block.content.stats || [
    { value: 10, label: 'lat doświadczenia', suffix: '+' },
    { value: 500, label: 'zadowolonych firm', suffix: '+' },
    { value: 1000, label: 'zrealizowanych szkoleń', suffix: '+' },
    { value: 80, label: 'zleceń dla produkcji', suffix: '%' }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {block.content.title || 'Dlaczego warto z nami współpracować?'}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBlock;
