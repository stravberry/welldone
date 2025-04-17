
import React from 'react';

interface StatItemProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      {icon && <div className="text-blue-500 mb-2">{icon}</div>}
      <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-gray-600 text-center">{label}</div>
    </div>
  );
};

export default StatItem;
