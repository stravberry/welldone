
import React from 'react';
import { benefits } from '../data/eventData';

const EventyBenefitsSection: React.FC = () => {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dlaczego warto zlecić nam organizację eventu?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-300">
                <div className="text-purple-600 mb-4 mx-auto w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventyBenefitsSection;
