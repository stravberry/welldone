
import React from 'react';

const StatsCounter: React.FC = () => {
  return (
    <div className="flex items-center gap-4 mt-8">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-orange-300 flex items-center justify-center text-xs font-bold text-white">
            {i}
          </div>
        ))}
      </div>
      <p className="text-white">
        <span className="font-bold">450+</span> przeszkolonych osób w tym roku
      </p>
    </div>
  );
};

export default StatsCounter;
