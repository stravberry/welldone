
import React from 'react';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';

const StatsBanner: React.FC = () => {
  return (
    <div className="bg-white py-6 mt-16 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStatItem endValue={96} suffix="%" label="Zdawalność" />
          <AnimatedStatItem endValue={10} suffix="+" label="Lat doświadczenia" />
          <AnimatedStatItem endValue={5000} suffix="+" label="Przeszkolonych osób" />
          <AnimatedStatItem endValue={100} suffix="%" label="Gwarancja jakości" />
        </div>
      </div>
    </div>
  );
};

const AnimatedStatItem: React.FC<{ endValue: number; suffix: string; label: string }> = ({ 
  endValue, 
  suffix, 
  label 
}) => {
  const { elementRef, count } = useCounterAnimation<HTMLDivElement>(endValue, 2000);
  
  return (
    <div ref={elementRef} className="text-center group">
      <p className="text-3xl font-bold text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-700">
        {count}{suffix}
      </p>
      <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{label}</p>
    </div>
  );
};

export default StatsBanner;
