
import React from 'react';
import { Clock, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
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
}

const EnhancedCourseCard: React.FC<EnhancedCourseCardProps> = ({ course, index, isVisible, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
      }`}
      style={{
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 150}ms`
      }}
      onClick={onClick}
    >
      {/* Course Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img src={course.image} alt={course.imageAlt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Badge */}
        {course.badge && (
          <div className="absolute top-4 right-4 bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {course.badge}
          </div>
        )}
        
        {/* Course Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
          <p className="text-orange-100 text-sm line-clamp-2">{course.description}</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">{course.duration}</p>
          </div>
          <div className="text-center">
            <Users className="h-5 w-5 text-orange-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">{course.participants}</p>
          </div>
          <div className="text-center">
            <Star className="h-5 w-5 text-orange-600 mx-auto mb-1" />
            <p className="text-sm font-semibold text-orange-600">{course.price}</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {course.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        <Button className="w-full bg-orange-600 hover:bg-orange-700 transition-colors duration-300">
          Zapisz się na kurs
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCourseCard;
export type { Course };
