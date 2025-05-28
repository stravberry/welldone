
import React from 'react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <div className="process-step flex md:block relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] will-change-transform">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-600 text-white font-bold flex-shrink-0 z-10 transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-105 group-hover:shadow-lg">
        {number}
      </div>
      <div className="ml-4 md:ml-0 md:mt-4 transition-transform duration-300 group-hover:translate-y-0.5">
        <h3 className="text-lg font-semibold mb-1 transition-colors duration-300 group-hover:text-orange-600">{title}</h3>
        <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
