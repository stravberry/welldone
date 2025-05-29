
import React from 'react';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';

interface StatPreviewCardProps {
  stat: { value: number; label: string; suffix: string };
  index: number;
  isVisible: boolean;
}

const StatPreviewCard: React.FC<StatPreviewCardProps> = ({ stat, index, isVisible }) => {
  const { elementRef, count } = useCounterAnimation<HTMLDivElement>(stat.value, 1500);
  
  return (
    <div 
      ref={elementRef}
      className={`text-center p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{
        transitionDelay: `${index * 100 + 800}ms`
      }}
    >
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-orange-100 text-sm font-medium">{stat.label}</div>
    </div>
  );
};

export default StatPreviewCard;
