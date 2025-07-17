
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
    <>
      <style>
        {`
          @keyframes subtlePulse {
            0%, 90% {
              transform: scale(1);
              box-shadow: 
                0 0 0 0 rgba(255, 102, 0, 0.3),
                0 4px 15px rgba(255, 102, 0, 0.15);
            }
            5% {
              transform: scale(1.03);
              box-shadow: 
                0 0 8px 2px rgba(255, 102, 0, 0.4),
                0 4px 20px rgba(255, 102, 0, 0.2);
            }
          }
        `}
      </style>
      <div 
        ref={elementRef}
        className="process-step flex md:block relative group"
      >
        {/* Enhanced glowing circle with lightbulb effect */}
        <div 
          className="relative z-10"
          style={{
            opacity: isInView ? 1 : 0,
            animation: isInView ? `subtlePulse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite ${index * 1.5}s` : 'none',
            transition: 'opacity 0.5s ease-out',
            transformOrigin: 'center',
            willChange: 'transform'
          }}
        >
          {/* Main circle with enhanced styling and glow animation */}
          <div 
            className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white font-bold transition-all duration-300 overflow-hidden"
            style={{
              animation: 'none',
              willChange: 'box-shadow'
            }}
          >
            {/* Inner highlight for depth */}
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-orange-300 to-transparent opacity-50" />
            
            {/* Number */}
            <span className="text-lg relative z-10 drop-shadow-sm">{number}</span>
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
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
          <h3 className="text-lg font-semibold mb-2 transition-colors duration-300">
            {title}
          </h3>
          <p 
            className="text-gray-600 transition-colors duration-300"
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
    </>
  );
};

export default ProcessStep;
