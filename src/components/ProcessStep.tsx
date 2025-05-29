
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
          @keyframes pulseScale {
            0%, 75% {
              transform: scale(1);
            }
            8.33% {
              transform: scale(1.2);
            }
            16.66% {
              transform: scale(1);
            }
          }
          
          @keyframes pulseGlow {
            0% {
              box-shadow: 
                0 0 0 0 rgba(255, 102, 0, 0),
                0 4px 15px rgba(255, 102, 0, 0),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            4% {
              box-shadow: 
                0 0 0 0 rgba(255, 102, 0, 0.4),
                0 4px 15px rgba(255, 102, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            8.33% {
              box-shadow: 
                0 0 20px 8px rgba(255, 102, 0, 0.6),
                0 0 40px 15px rgba(255, 102, 0, 0.3),
                0 8px 25px rgba(255, 102, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
            }
            16.66% {
              box-shadow: 
                0 0 10px 4px rgba(255, 102, 0, 0.5),
                0 4px 20px rgba(255, 102, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            20% {
              box-shadow: 
                0 0 0 0 rgba(255, 102, 0, 0.4),
                0 4px 15px rgba(255, 102, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            75%, 100% {
              box-shadow: 
                0 0 0 0 rgba(255, 102, 0, 0.4),
                0 4px 15px rgba(255, 102, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
          }

          @keyframes glowFadeIn {
            from {
              box-shadow: 
                0 0 0 0 rgba(255, 102, 0, 0),
                0 4px 15px rgba(255, 102, 0, 0),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            to {
              box-shadow: 
                0 0 0 0 rgba(255, 102, 0, 0.4),
                0 4px 15px rgba(255, 102, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
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
            animation: isInView ? `pulseScale 4.8s ease-in-out infinite ${index * 0.8}s` : 'none',
            transition: 'opacity 0.5s ease-out',
            transformOrigin: 'center',
            willChange: 'transform'
          }}
        >
          {/* Main circle with enhanced styling and glow animation */}
          <div 
            className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white font-bold transition-all duration-300 overflow-hidden"
            style={{
              animation: isInView ? 
                `glowFadeIn 0.8s ease-out ${index * 0.8}s forwards, pulseGlow 4.8s ease-in-out infinite ${index * 0.8 + 0.8}s` : 
                'none',
              willChange: 'box-shadow',
              boxShadow: !isInView ? 
                '0 0 0 0 rgba(255, 102, 0, 0), 0 4px 15px rgba(255, 102, 0, 0), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 
                undefined
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
