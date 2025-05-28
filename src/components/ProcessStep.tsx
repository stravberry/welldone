
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  index: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, index }) => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div 
      ref={elementRef}
      className="process-step flex md:block relative group"
    >
      {/* Animated circle with number */}
      <div 
        className="relative z-10"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
          transition: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          transitionDelay: isInView ? `${index * 300}ms` : '0ms'
        }}
      >
        {/* Sequential growing background circle effect */}
        <div 
          className="absolute top-0 left-0 h-12 w-12 rounded-full bg-orange-400"
          style={{
            opacity: isInView ? 0.3 : 0,
            transform: isInView ? 'scale(1)' : 'scale(0)',
            transition: 'all 1s ease-out',
            transitionDelay: isInView ? `${index * 400}ms` : '0ms'
          }}
        />
        
        {/* Main circle */}
        <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <span className="text-lg">{number}</span>
          
          {/* Glowing effect on hover - more subtle */}
          <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        </div>
      </div>
      
      {/* Content with staggered animation */}
      <div 
        className="ml-4 md:ml-0 md:mt-4"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-10px)',
          transition: 'all 1s ease-out',
          transitionDelay: isInView ? `${index * 300 + 400}ms` : '0ms'
        }}
      >
        <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
          {title}
        </h3>
        <p 
          className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
          style={{
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
            transitionDelay: isInView ? `${index * 300 + 600}ms` : '0ms'
          }}
        >
          {description}
        </p>
      </div>
      
      {/* Floating icons animation - less frequent */}
      <div 
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110"
        style={{
          animation: isInView ? 'float 6s ease-in-out infinite' : 'none',
          animationDelay: `${index * 1}s`
        }}
      >
        <div className="w-4 h-4 bg-orange-200 rounded-full shadow-sm" />
      </div>
    </div>
  );
};

export default ProcessStep;
