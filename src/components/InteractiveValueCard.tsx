
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface InteractiveValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  percentage: number;
  bgColor: string;
  frontContent: string;
  backContent: string;
}

const InteractiveValueCard: React.FC<InteractiveValueCardProps> = ({
  icon: Icon,
  title,
  description,
  percentage,
  bgColor,
  frontContent,
  backContent
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 h-64"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className={`w-16 h-16 ${bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
          <p className="text-gray-600 mb-4">{frontContent}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 ${bgColor} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{percentage}% siły tej wartości</p>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg text-white">
          <div className="h-full flex flex-col justify-center">
            <Icon className="h-12 w-12 mb-4 text-orange-100" />
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-orange-50">{backContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveValueCard;
