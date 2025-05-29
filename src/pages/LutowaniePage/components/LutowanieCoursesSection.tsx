
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: string;
  price: string;
  features: string[];
  badge: string;
  image: string;
  imageAlt: string;
}

interface LutowanieCoursesSectionProps {
  courses: Course[];
  visibleCourses: number[];
  showAllItems: boolean;
  onCourseRegistration: (courseTitle: string) => void;
}

const LutowanieCoursesSection: React.FC<LutowanieCoursesSectionProps> = ({
  courses,
  visibleCourses,
  showAllItems,
  onCourseRegistration
}) => {
  const isItemVisible = (index: number, visibleItems: number[]) => {
    return showAllItems || visibleItems.includes(index);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Dostępne kursy lutowania
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Praktyczne szkolenia z lutowania - od podstaw do zaawansowanych technik przemysłowych.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div key={course.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
            isItemVisible(index, visibleCourses) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative h-48 overflow-hidden">
              <img src={course.image} alt={course.imageAlt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {course.badge && (
                <div className="absolute top-4 right-4 bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  {course.badge}
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">Czas trwania</p>
                  <p className="font-semibold">{course.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grupa</p>
                  <p className="font-semibold">{course.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cena</p>
                  <p className="font-semibold text-red-600">{course.price}</p>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {course.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => onCourseRegistration(course.title)}
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

export default LutowanieCoursesSection;
