import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, CheckCircle, Phone, Mail, ChevronDown, ChevronUp, Star, Shield, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation, useCounterAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: string;
  price: string;
  features: string[];
  badge?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { trackEvent } = useEventTracking();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  
  useScrollToTop();

  // Animation hooks
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });

  const { elementRef: coursesRef, visibleItems: visibleCourses } = useStaggeredAnimation<HTMLDivElement>(4, 200);

  const { elementRef: benefitsRef, visibleItems: visibleBenefits } = useStaggeredAnimation<HTMLDivElement>(6, 150);

  const { elementRef: statsRef, isInView: statsInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: faqRef, isInView: faqInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });

  const courses: Course[] = [
    {
      id: 'wozki-widlowe',
      title: 'Wózki widłowe',
      description: 'Kompleksowe szkolenie na uprawnienia do obsługi wózków widłowych z napędem silnikowym.',
      duration: '16 godzin',
      participants: 'do 12 osób',
      price: '450 zł',
      features: ['Teoria i praktyka', 'Egzamin UDT', 'Certyfikat', 'Materiały szkoleniowe'],
      badge: 'Najpopularniejsze'
    },
    {
      id: 'podesty-ruchome',
      title: 'Podesty ruchome',
      description: 'Szkolenie operatorów podestów ruchomych i platform roboczych.',
      duration: '14 godzin',
      participants: 'do 10 osób',
      price: '520 zł',
      features: ['Bezpieczeństwo pracy', 'Praktyka na różnych modelach', 'Egzamin UDT', 'Wsparcie po kursie']
    },
    {
      id: 'suwnice',
      title: 'Suwnice i żurawie',
      description: 'Profesjonalne szkolenia operatorów suwnic i żurawi mobilnych.',
      duration: '20 godzin',
      participants: 'do 8 osób',
      price: '680 zł',
      features: ['Zaawansowana praktyka', 'Różne typy urządzeń', 'Egzamin UDT', 'Certyfikat'],
      badge: 'Zaawansowane'
    },
    {
      id: 'ukladnice',
      title: 'Układnice magazynowe',
      description: 'Szkolenie na uprawnienia do obsługi układnic i systemów magazynowych.',
      duration: '12 godzin',
      participants: 'do 15 osób',
      price: '380 zł',
      features: ['Systemy magazynowe', 'Praktyczne ćwiczenia', 'Egzamin UDT', 'Materiały']
    }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: '96% zdawalność',
      description: 'Najwyższa zdawalność egzaminów w regionie'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Doświadczeni instruktorzy',
      description: 'Kadra z wieloletnim doświadczeniem praktycznym'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nowoczesny sprzęt',
      description: 'Szkolenia na najnowszych modelach urządzeń'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Małe grupy',
      description: 'Indywidualne podejście do każdego uczestnika'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Wsparcie po kursie',
      description: 'Pomoc i doradztwo również po ukończeniu szkolenia'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Szybka realizacja',
      description: 'Elastyczne terminy dostosowane do Twoich potrzeb'
    }
  ];

  const stats = [
    { value: 1500, label: 'Przeszkolonych operatorów', suffix: '+' },
    { value: 96, label: 'Zdawalność egzaminów', suffix: '%' },
    { value: 8, label: 'Lat doświadczenia', suffix: '+' },
    { value: 150, label: 'Firm partnerskich', suffix: '+' }
  ];

  const faqs: FAQ[] = [
    {
      question: 'Jak długo trwa szkolenie na uprawnienia UDT?',
      answer: 'Długość szkolenia zależy od rodzaju urządzenia. Zazwyczaj trwa od 12 do 20 godzin, obejmując zarówno część teoretyczną jak i praktyczną.'
    },
    {
      question: 'Czy mogę uczestniczyć w szkoleniu bez doświadczenia?',
      answer: 'Tak! Nasze szkolenia są dostosowane również dla osób bez wcześniejszego doświadczenia. Zaczynamy od podstaw i stopniowo przechodzimy do zaawansowanych zagadnień.'
    },
    {
      question: 'Jak wygląda egzamin UDT?',
      answer: 'Egzamin składa się z części teoretycznej (test pisemny) oraz praktycznej (zadania na urządzeniu). Nasi instruktorzy przygotują Cię do obu części.'
    },
    {
      question: 'Czy uprawnienia są ważne w całej Polsce?',
      answer: 'Tak, uprawnienia UDT wydawane przez Urząd Dozoru Technicznego są ważne na terenie całej Polski.'
    },
    {
      question: 'Co się dzieje, jeśli nie zdam egzaminu za pierwszym razem?',
      answer: 'Oferujemy bezpłatny egzamin poprawkowy oraz dodatkowe zajęcia wyrównawcze, aby zapewnić Ci sukces.'
    }
  ];

  const handleCourseClick = (courseId: string) => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `udt-course-${courseId}`,
      additionalData: { courseId, page: 'service-detail' }
    });
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
            className="flex items-center space-x-2 text-orange-100 mb-8"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
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
                className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: '200ms'
                }}
              >
                ⚡ Certyfikowane szkolenia UDT
              </div>

              <h1 
                className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                style={{
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: '400ms'
                }}
              >
                Uprawnienia UDT dla <span className="text-orange-200">Operatorów</span>
              </h1>

              <p 
                className="text-xl text-orange-100 mb-8 leading-relaxed"
                style={{
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: '600ms'
                }}
              >
                Zdobądź oficjalne uprawnienia do obsługi urządzeń technicznych. 
                Profesjonalne szkolenia z najwyższą zdawalnością w regionie.
              </p>

              <div 
                className="flex flex-col sm:flex-row gap-4"
                style={{
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: '800ms'
                }}
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
              className="grid grid-cols-2 gap-6"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: '600ms'
              }}
            >
              {stats.slice(0, 4).map((stat, index) => (
                <StatPreviewCard key={index} stat={stat} index={index} isVisible={heroInView} />
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
              isVisible={visibleCourses.includes(index)}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dlaczego warto wybrać nasze szkolenia?
            </h2>
            <p className="text-lg text-gray-600">
              Przekonaj się, co wyróżnia nasze kursy na tle konkurencji
            </p>
          </div>

          <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-300 hover:scale-105"
                style={{
                  opacity: visibleBenefits.includes(index) ? 1 : 0,
                  transform: visibleBenefits.includes(index) ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="text-orange-600 mb-4 mx-auto w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <div ref={faqRef} className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Najczęściej zadawane pytania
          </h2>
          <p className="text-lg text-gray-600">
            Znajdź odpowiedzi na najważniejsze pytania dotyczące naszych szkoleń
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{
                opacity: faqInView ? 1 : 0,
                transform: faqInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-orange-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-orange-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-orange-600 flex-shrink-0" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Gotowy na nowe możliwości?
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Nie czekaj! Zapisz się już dziś na szkolenie i zdobądź uprawnienia, 
            które otworzą przed Tobą nowe możliwości zawodowe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={() => setShowContactForm(true)}
            >
              Zapisz się teraz
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 hover:scale-105 transition-all duration-300"
            >
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </div>

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

// Enhanced Course Card Component with restored simple design
const EnhancedCourseCard: React.FC<{
  course: Course;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}> = ({ course, index, isVisible, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={onClick}
    >
      {/* Course Header with Gradient */}
      <div className="relative p-6 bg-gradient-to-br from-orange-500 to-orange-600">
        {course.badge && (
          <div className="absolute top-4 right-4 bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {course.badge}
          </div>
        )}
        <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-orange-100">{course.description}</p>
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

// Animated Stats Preview Component
const StatPreviewCard: React.FC<{
  stat: { value: number; label: string; suffix: string };
  index: number;
  isVisible: boolean;
}> = ({ stat, index, isVisible }) => {
  const { elementRef, count } = useCounterAnimation<HTMLDivElement>(stat.value, 1500);

  return (
    <div 
      ref={elementRef}
      className="text-center p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 100 + 800}ms`
      }}
    >
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-orange-100 text-sm font-medium">{stat.label}</div>
    </div>
  );
};

export default ServiceDetailPage;
