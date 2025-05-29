
import React from 'react';
import EnhancedCourseCard, { type Course } from './EnhancedCourseCard';

interface CoursesSectionProps {
  visibleCourses: number[];
  showAllItems: boolean;
  onCourseClick: (courseId: string) => void;
  onCourseEnrollment: (courseTitle: string) => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({
  visibleCourses,
  showAllItems,
  onCourseClick,
  onCourseEnrollment
}) => {
  const courses: Course[] = [
    {
      id: 'wozki-widlowe',
      title: 'Wózki widłowe',
      description: 'Kompleksowe szkolenie na uprawnienia do obsługi wózków widłowych z napędem silnikowym.',
      duration: '16 godzin',
      participants: 'do 12 osób',
      price: '450 zł',
      features: ['Teoria i praktyka', 'Egzamin UDT', 'Certyfikat', 'Materiały szkoleniowe'],
      badge: 'Najpopularniejsze',
      image: '/lovable-uploads/657768d6-dc5a-419b-80b8-b664af6c6775.png',
      imageAlt: 'Operator wózka widłowego podczas pracy w magazynie'
    },
    {
      id: 'podesty-ruchome',
      title: 'Podesty ruchome',
      description: 'Szkolenie operatorów podestów ruchomych i platform roboczych.',
      duration: '14 godzin',
      participants: 'do 10 osób',
      price: '520 zł',
      features: ['Bezpieczeństwo pracy', 'Praktyka na różnych modelach', 'Egzamin UDT', 'Wsparcie po kursie'],
      image: '/lovable-uploads/e53f9387-8eab-484e-95d8-dae5efb914a0.png',
      imageAlt: 'Podest ruchomy nożycowy używany podczas prac na wysokości'
    },
    {
      id: 'suwnice',
      title: 'Suwnice i żurawie',
      description: 'Profesjonalne szkolenia operatorów suwnic i żurawi mobilnych.',
      duration: '20 godzin',
      participants: 'do 8 osób',
      price: '680 zł',
      features: ['Zaawansowana praktyka', 'Różne typy urządzeń', 'Egzamin UDT', 'Certyfikat'],
      badge: 'Zaawansowane',
      image: '/lovable-uploads/f9dc5911-3540-4c1c-91a0-f031a4e94698.png',
      imageAlt: 'Suwnica przemysłowa w hali produkcyjnej'
    },
    {
      id: 'ukladnice',
      title: 'Układnice magazynowe',
      description: 'Szkolenie na uprawnienia do obsługi układnic i systemów magazynowych.',
      duration: '12 godzin',
      participants: 'do 15 osób',
      price: '380 zł',
      features: ['Systemy magazynowe', 'Praktyczne ćwiczenia', 'Egzamin UDT', 'Materiały'],
      image: '/lovable-uploads/2d3fe45c-4078-43ab-b479-ea144210537f.png',
      imageAlt: 'Układnica magazynowa wysokiego składowania w nowoczesnym magazynie'
    }
  ];

  // Helper function to determine if item should be visible
  const isItemVisible = (index: number) => {
    return showAllItems || visibleCourses.includes(index);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Dostępne kursy i szkolenia
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Wybierz szkolenie dostosowane do Twoich potrzeb. Wszystkie kursy kończą się oficjalnym egzaminem UDT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course, index) => (
          <EnhancedCourseCard 
            key={course.id} 
            course={course} 
            index={index} 
            isVisible={isItemVisible(index)} 
            onClick={() => onCourseClick(course.id)}
            onEnroll={() => onCourseEnrollment(course.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;
