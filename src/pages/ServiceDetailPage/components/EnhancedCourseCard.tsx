
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, CheckCircle } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: string;
  price: string;
  features: string[];
  badge?: string;
  image: string;
  imageAlt: string;
}

interface EnhancedCourseCardProps {
  course: Course;
  index: number;
  isVisible: boolean;
  onClick: () => void;
  onEnroll?: () => void;
}

const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({
  course,
  index,
  isVisible,
  onClick,
  onEnroll
}) => {
  return (
    <div 
      className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-500 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Badge */}
      {course.badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="destructive" className="bg-orange-600 hover:bg-orange-700">
            {course.badge}
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Course Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-gray-600">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-gray-600">{course.participants}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-semibold text-gray-900">{course.price}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {course.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 hover:shadow-lg"
            onClick={onEnroll}
          >
            Zapisz się na kurs
          </Button>
          <Button 
            variant="outline" 
            className="border-orange-600 text-orange-600 hover:bg-orange-50 transition-all duration-300"
            onClick={onClick}
          >
            Szczegóły
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCourseCard;
