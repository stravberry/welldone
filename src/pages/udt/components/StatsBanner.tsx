
import React from 'react';

const StatsBanner: React.FC = () => {
  return (
    <div className="bg-white py-6 mt-16 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value="96%" label="Zdawalność" />
          <StatItem value="10+" label="Lat doświadczenia" />
          <StatItem value="5000+" label="Przeszkolonych osób" />
          <StatItem value="100%" label="Gwarancja jakości" />
        </div>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-3xl font-bold text-orange-600">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

export default StatsBanner;
