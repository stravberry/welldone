import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Course {
  id?: string;
  title: string;
  description: string;
  duration: string;
  groupSize?: string;
  participants?: string;
  price: string;
  features: string[];
  badge?: string;
  image: string;
  alt?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
}

interface CourseCardProps {
  course: Course;
  index: number;
  isVisible?: boolean;
  onClick?: () => void;
  onEnroll?: () => void;
  enrollLink?: string;
  detailsLink?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  index,
  isVisible = true,
  onClick,
  onEnroll,
  enrollLink = "/wycena",
  detailsLink = "/kontakt"
}) => {
  const participants = course.participants || course.groupSize;
  const imageAlt = course.imageAlt || course.alt || course.title;

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

      {/* Icon overlay for courses with icons */}
      {course.icon && (
        <div className="absolute top-4 left-4 bg-orange-500 text-white p-2 rounded-lg z-10">
          {course.icon}
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={imageAlt}
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
          <div className="flex items-center justify-center text-center">
            <div>
              <Clock className="h-4 w-4 text-orange-600 mx-auto mb-1" />
              <span className="text-sm text-gray-600 block font-semibold">{course.duration}</span>
            </div>
          </div>
          {participants && (
            <div className="flex items-center justify-center text-center">
              <div>
                <Users className="h-4 w-4 text-orange-600 mx-auto mb-1" />
                <span className="text-sm text-gray-600 block font-semibold">{participants}</span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center text-center">
            <div>
              <span className="text-sm font-semibold text-orange-600 block">{course.price}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-gray-900">Co zawiera kurs:</h4>
          {course.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button 
            asChild
            className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:shadow-lg"
          >
            <Link 
              to={enrollLink}
              onClick={() => {
                onEnroll?.();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Zapisz się na kurs
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300"
          >
            <Link 
              to={detailsLink}
              onClick={() => onClick?.()}
            >
              Szczegóły
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;