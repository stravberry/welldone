
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CheckCircle, Users, DollarSign } from 'lucide-react';

interface AuditCardProps {
  title: string;
  description: string;
  icon: 'check' | 'users' | 'dollar-sign';
  index: number;
}

const iconMap = {
  'check': CheckCircle,
  'users': Users,
  'dollar-sign': DollarSign,
};

const AuditCard: React.FC<AuditCardProps> = ({ title, description, icon, index }) => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const IconComponent = iconMap[icon];

  return (
    <div 
      ref={elementRef}
      className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: isInView ? `${index * 200}ms` : '0ms'
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-150" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4 transition-transform duration-500 group-hover:scale-125" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="bg-white/20 rounded-lg p-3 mr-4 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
            <IconComponent size={28} className="text-white" />
          </div>
          <h3 className="font-bold text-xl text-white group-hover:text-orange-50 transition-colors duration-300">
            {title}
          </h3>
        </div>
        <p className="text-orange-50 leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    </div>
  );
};

export default AuditCard;
