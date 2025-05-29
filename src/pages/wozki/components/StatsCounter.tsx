
import React from 'react';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';

const StatsCounter: React.FC = () => {
  const { elementRef: studentsRef, count: studentsCount } = useCounterAnimation<HTMLDivElement>(3000, 2000);
  const { elementRef: coursesRef, count: coursesCount } = useCounterAnimation<HTMLDivElement>(250, 2000);
  const { elementRef: successRef, count: successCount } = useCounterAnimation<HTMLDivElement>(94, 2000);

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div ref={studentsRef} className="opacity-100">
        <div className="text-2xl sm:text-3xl font-bold text-white">{studentsCount}+</div>
        <div className="text-blue-100 text-sm">Przeszkolonych operatorów</div>
      </div>
      <div ref={coursesRef} className="opacity-100">
        <div className="text-2xl sm:text-3xl font-bold text-white">{coursesCount}+</div>
        <div className="text-blue-100 text-sm">Przeprowadzonych kursów</div>
      </div>
      <div ref={successRef} className="opacity-100">
        <div className="text-2xl sm:text-3xl font-bold text-white">{successCount}%</div>
        <div className="text-blue-100 text-sm">Zdawalność</div>
      </div>
    </div>
  );
};

export default StatsCounter;
