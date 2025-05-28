
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useEventTracking from '@/hooks/useEventTracking';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link }) => {
  const { trackEvent } = useEventTracking();
  
  const handleClick = () => {
    trackEvent({
      category: 'navigation',
      action: 'click',
      label: `service-card-${title}`,
      additionalData: {
        serviceTitle: title,
        destination: link
      }
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 flex flex-col group cursor-pointer hover:bg-gradient-to-br hover:from-white hover:to-orange-50 border border-transparent hover:border-orange-200">
      <div className="text-orange-500 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce-gentle">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 transition-colors duration-300 group-hover:text-orange-600">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow transition-colors duration-300 group-hover:text-gray-700">{description}</p>
      <Button 
        asChild 
        variant="outline" 
        className="mt-auto transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-lg transform group-hover:scale-105" 
        onClick={handleClick}
      >
        <Link to={link} className="flex items-center justify-center">
          Dowiedz się więcej <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
};

export default ServiceCard;
