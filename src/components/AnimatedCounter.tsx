
import React from 'react';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  endValue,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  const { elementRef, count } = useCounterAnimation(endValue, duration);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
