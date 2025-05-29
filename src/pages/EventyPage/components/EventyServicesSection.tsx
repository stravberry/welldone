
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '../data/eventData';

interface EventyServicesSectionProps {
  visibleServices: number[];
  showAllItems: boolean;
  onCourseSelect: (courseName: string) => void;
}

const EventyServicesSection: React.FC<EventyServicesSectionProps> = ({
  visibleServices,
  showAllItems,
  onCourseSelect
}) => {
  const isItemVisible = (index: number) => {
    return showAllItems || visibleServices.includes(index);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nasze usługi eventowe
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Kompleksowa organizacja eventów edukacyjnych - od konferencji po warsztaty firmowe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={service.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
            isItemVisible(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative h-48 overflow-hidden">
              <img src={service.image} alt={service.imageAlt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {service.badge && (
                <div className="absolute top-4 right-4 bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {service.badge}
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">Czas trwania</p>
                  <p className="font-semibold">{service.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uczestnicy</p>
                  <p className="font-semibold">{service.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cena</p>
                  <p className="font-semibold text-purple-600">{service.price}</p>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => onCourseSelect(service.title)}
              >
                Zapisz się na kurs
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventyServicesSection;
