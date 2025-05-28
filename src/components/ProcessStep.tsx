
import React from 'react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <div className="process-step flex md:block relative">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-600 text-white font-bold flex-shrink-0 z-10">
        {number}
      </div>
      <div className="ml-4 md:ml-0 md:mt-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
