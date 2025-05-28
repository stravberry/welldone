
import React from 'react';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';

interface AuditStatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  index: number;
}

const AuditStatsCounter: React.FC<AuditStatsCounterProps> = ({ value, label, suffix = '', index }) => {
  const { elementRef, count } = useCounterAnimation<HTMLDivElement>(value, 2000);

  return (
    <div 
      ref={elementRef}
      className="text-center"
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.6s ease-out',
        transitionDelay: `${index * 150}ms`
      }}
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-count-up">
        {count}{suffix}
      </div>
      <div className="text-orange-100 text-sm md:text-base font-medium uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default AuditStatsCounter;
