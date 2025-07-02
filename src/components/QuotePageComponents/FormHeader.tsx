import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

interface FormHeaderProps {
  step: number;
  getProgress: () => number;
}

const stepTitles = [
  'Wybierz usługę',
  'Szczegóły szkolenia',
  'Dane kontaktowe'
];

export const FormHeader: React.FC<FormHeaderProps> = ({ step, getProgress }) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Formularz wyceny</h2>
        <div className="text-sm text-gray-600 font-medium">
          Krok {step} z 3
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
          <span>Postęp</span>
          <span>{Math.round(getProgress())}%</span>
        </div>
        <Progress value={getProgress()} className="h-2 bg-gray-200" />
      </div>
      
      <div className="flex items-center justify-between">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 font-bold text-xs transition-all duration-300 ${
              step > index + 1 
                ? 'bg-green-500 border-green-500 text-white' 
                : step === index + 1 
                  ? 'bg-amber-500 border-amber-500 text-white' 
                  : 'bg-gray-200 border-gray-300 text-gray-500'
            }`}>
              {step > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
            </div>
            <span className={`text-xs mt-1 text-center transition-colors duration-300 hidden sm:block ${
              step >= index + 1 ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};