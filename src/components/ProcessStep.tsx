
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
      {/* Simple scaling circle with number */}
      <div 
        className="relative z-10"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'scale(1)' : 'scale(0)',
          transition: 'all 0.5s ease-out',
          transitionDelay: isInView ? `${index * 400}ms` : '0ms'
        }}
      >
        {/* Main circle */}
        <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <span className="text-lg">{number}</span>
        </div>
      </div>
      
      {/* Content with staggered animation */}
      <div 
        className="ml-4 md:ml-0 md:mt-4"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out',
          transitionDelay: isInView ? `${index * 400 + 200}ms` : '0ms'
        }}
      >
        <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
          {title}
        </h3>
        <p 
          className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
          style={{
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.6s ease-out',
            transitionDelay: isInView ? `${index * 400 + 400}ms` : '0ms'
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProcessStep;
