
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link, index = 0 }) => {
  const { trackEvent } = useEventTracking();
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });
  
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
    <div 
      ref={elementRef}
      className="bg-white rounded-lg shadow-md p-6 transition-all duration-700 hover:shadow-lg flex flex-col transform hover:scale-105"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: isInView ? `${index * 150}ms` : '0ms'
      }}
    >
      <div className="text-orange-500 mb-4 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 transition-colors duration-300 hover:text-orange-600">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 flex-grow transition-colors duration-300">
        {description}
      </p>
      <Button 
        asChild 
        variant="outline" 
        className="mt-auto transition-all duration-300 hover:bg-orange-50 hover:border-orange-300 hover:shadow-md" 
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
