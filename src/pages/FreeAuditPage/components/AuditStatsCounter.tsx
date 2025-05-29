
import React from 'react';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';

interface AuditStatsCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  index: number;
}

const AuditStatsCounter: React.FC<AuditStatsCounterProps> = ({ 
  icon, 
  value, 
  label, 
  suffix = '', 
  index 
}) => {
  const { elementRef, count } = useCounterAnimation<HTMLDivElement>(value, 2000);

  return (
    <div 
      ref={elementRef}
      className="text-center group"
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.6s ease-out',
        transitionDelay: `${index * 200}ms`
      }}
    >
      <div className="text-white mb-3 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-orange-100 text-sm md:text-base font-medium">
        {label}
      </div>
    </div>
  );
};

export default AuditStatsCounter;
