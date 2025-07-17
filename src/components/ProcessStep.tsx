
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
                0 8px 25px rgba(255, 102, 0, 0.15);
            }
            5% {
              transform: scale(1.03);
              box-shadow: 
                0 0 12px 3px rgba(255, 102, 0, 0.4),
                0 8px 30px rgba(255, 102, 0, 0.2);
            }
          }
          
          @keyframes connectingLine {
            0% { width: 0; opacity: 0; }
            100% { width: 100%; opacity: 1; }
          }
        `}
      </style>
      <div 
        ref={elementRef}
        className="process-step relative group text-center"
      >
        {/* Connecting line to next step (except last) */}
        {index < 3 && (
          <div 
            className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-orange-200 z-0"
            style={{
              animation: isInView ? `connectingLine 1s ease-out ${index * 400 + 800}ms both` : 'none',
              marginLeft: '20px',
              marginRight: '20px',
              width: 'calc(100% - 40px)'
            }}
          />
        )}
        
        {/* Enhanced glowing circle */}
        <div 
          className="relative z-10 flex justify-center mb-6"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
            transitionDelay: isInView ? `${index * 200}ms` : '0ms'
          }}
        >
          {/* Main circle with enhanced styling */}
          <div 
            className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white font-bold transition-all duration-300 overflow-hidden shadow-lg"
            style={{
              animation: isInView ? `subtlePulse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite ${index * 1.5}s` : 'none',
              willChange: 'transform, box-shadow'
            }}
          >
            {/* Inner highlight for depth */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-orange-300 to-transparent opacity-50" />
            
            {/* Number */}
            <span className="text-2xl relative z-10 drop-shadow-sm font-extrabold">{number}</span>
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          </div>
        </div>
        
        {/* Content with staggered animation */}
        <div 
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out',
            transitionDelay: isInView ? `${index * 200 + 300}ms` : '0ms'
          }}
        >
          <h3 className="text-xl font-bold mb-3 text-gray-800 leading-tight">
            {title}
          </h3>
          {description && (
            <p 
              className="text-gray-600 text-sm leading-relaxed"
              style={{
                opacity: isInView ? 1 : 0,
                transition: 'opacity 0.6s ease-out',
                transitionDelay: isInView ? `${index * 200 + 500}ms` : '0ms'
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessStep;
