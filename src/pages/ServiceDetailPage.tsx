
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';

// Component imports
import EnhancedCourseCard, { type Course } from './ServiceDetailPage/components/EnhancedCourseCard';
import StatPreviewCard from './ServiceDetailPage/components/StatPreviewCard';
import BenefitsSection from './ServiceDetailPage/components/BenefitsSection';
import FAQSection from './ServiceDetailPage/components/FAQSection';
import CTASection from './ServiceDetailPage/components/CTASection';

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { trackEvent } = useEventTracking();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  
  useScrollToTop();

  // Animation hooks with better fallbacks
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const { elementRef: coursesRef, visibleItems: visibleCourses } = useStaggeredAnimation<HTMLDivElement>(4, 150);

  // Fallback mechanism - show all items after 3 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowAllItems(true);
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

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

  const stats = [
    { value: 1500, label: 'Przeszkolonych operatorów', suffix: '+' },
    { value: 96, label: 'Zdawalność egzaminów', suffix: '%' },
    { value: 8, label: 'Lat doświadczenia', suffix: '+' },
    { value: 150, label: 'Firm partnerskich', suffix: '+' }
  ];

  const handleCourseClick = (courseId: string) => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `udt-course-${courseId}`,
      additionalData: {
        courseId,
        page: 'service-detail'
      }
    });
  };

  // Helper function to determine if item should be visible
  const isItemVisible = (index: number, visibleItems: number[]) => {
    return showAllItems || visibleItems.includes(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Animated Breadcrumb */}
          <div 
            className={`flex items-center space-x-2 text-orange-100 mb-8 transition-all duration-600 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
            <span>/</span>
            <span className="text-white font-medium">Uprawnienia UDT dla operatorów</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div 
                className={`inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
                  heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                ⚡ Certyfikowane szkolenia UDT
              </div>

              <h1 
                className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
                  heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                Uprawnienia UDT dla <span className="text-orange-200">Operatorów</span>
              </h1>

              <p 
                className={`text-xl text-orange-100 mb-8 leading-relaxed transition-all duration-800 ${
                  heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                Zdobądź oficjalne uprawnienia do obsługi urządzeń technicznych. 
                Profesjonalne szkolenia z najwyższą zdawalnością w regionie.
              </p>

              <div 
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
                  heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl"
                  onClick={() => setShowContactForm(true)}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zapisz się na kurs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-orange-600 hover:scale-105 transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Pobierz program
                </Button>
              </div>
            </div>

            {/* Animated stats preview */}
            <div 
              className={`grid grid-cols-2 gap-6 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {stats.slice(0, 4).map((stat, index) => (
                <StatPreviewCard key={index} stat={stat} index={index} isVisible={heroInView || showAllItems} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Courses Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dostępne kursy i szkolenia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Wybierz szkolenie dostosowane do Twoich potrzeb. Wszystkie kursy kończą się oficjalnym egzaminem UDT.
          </p>
        </div>

        <div ref={coursesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <EnhancedCourseCard 
              key={course.id} 
              course={course} 
              index={index} 
              isVisible={isItemVisible(index, visibleCourses)} 
              onClick={() => handleCourseClick(course.id)} 
            />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection onContactClick={() => setShowContactForm(true)} />

      {/* Floating Back Button */}
      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default ServiceDetailPage;
