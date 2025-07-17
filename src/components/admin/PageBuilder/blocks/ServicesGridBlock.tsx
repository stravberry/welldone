
import React from 'react';
import { Award, Briefcase, BookOpen, BarChart, Users } from 'lucide-react';
import type { PageBlock } from '../types';

interface ServicesGridBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const ServicesGridBlock: React.FC<ServicesGridBlockProps> = ({ block }) => {
  const services = block.content.services || [
    {
      title: "Uprawnienia UDT dla operatorów",
      description: "Szkolenia i uprawnienia dla operatorów urządzeń transportu bliskiego.",
      icon: "award"
    },
    {
      title: "Uprawnienia UDT dla konserwatorów", 
      description: "Kursy dla konserwatorów urządzeń transportu bliskiego.",
      icon: "briefcase"
    },
    {
      title: "Uprawnienia SEP",
      description: "Szkolenia i uprawnienia w zakresie uprawnień SEP.",
      icon: "book"
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'award': return <Award size={40} className="text-orange-500" />;
      case 'briefcase': return <Briefcase size={40} className="text-orange-500" />;
      case 'book': return <BookOpen size={40} className="text-orange-500" />;
      case 'chart': return <BarChart size={40} className="text-orange-500" />;
      case 'users': return <Users size={40} className="text-orange-500" />;
      default: return <Award size={40} className="text-orange-500" />;
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {block.content.title || 'Nasze Usługi'}
          </h2>
          <p className="text-lg text-gray-600">
            {block.content.description || 'Oferujemy kompleksowe szkolenia dla firm produkcyjnych.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="mb-4">{getIcon(service.icon)}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGridBlock;
