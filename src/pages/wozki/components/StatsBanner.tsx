
import React from 'react';

const StatsBanner: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-blue-800 bg-opacity-50 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          <div>
            <div className="text-lg font-bold">15+</div>
            <div className="text-xs">Lat doświadczenia</div>
          </div>
          <div>
            <div className="text-lg font-bold">100%</div>
            <div className="text-xs">Zadowolonych klientów</div>
          </div>
          <div>
            <div className="text-lg font-bold">24/7</div>
            <div className="text-xs">Wsparcie techniczne</div>
          </div>
          <div>
            <div className="text-lg font-bold">UDT</div>
            <div className="text-xs">Certyfikowane kursy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
