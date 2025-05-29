
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Flame, CheckCircle, Award, Users, Shield, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';

const LutowaniePage = () => {
  const { trackEvent } = useEventTracking();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  
  useScrollToTop();

  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const { elementRef: coursesRef, visibleItems: visibleCourses } = useStaggeredAnimation<HTMLDivElement>(3, 150);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowAllItems(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const courses = [
    {
      id: 'lutowanie-podstawowe',
      title: 'Podstawy lutowania',
      description: 'Kurs podstawowych technik lutowania dla początkujących.',
      duration: '16 godzin',
      participants: 'do 8 osób',
      price: '450 zł',
      features: ['Teoria lutowania', 'Praktyczne ćwiczenia', 'Narzędzia i materiały', 'Certyfikat ukończenia'],
      badge: 'Podstawowe',
      image: '/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png',
      imageAlt: 'Praktyczne szkolenie z lutowania elektroniki'
    },
    {
      id: 'lutowanie-zaawansowane',
      title: 'Zaawansowane techniki lutowania',
      description: 'Kurs dla doświadczonych - lutowanie SMD, BGA i mikrokomponenty.',
      duration: '24 godziny',
      participants: 'do 6 osób',
      price: '680 zł',
      features: ['Lutowanie SMD', 'Techniki BGA', 'Mikrokomponenty', 'Certyfikat eksperta'],
      badge: 'Zaawansowane',
      image: '/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png',
      imageAlt: 'Zaawansowane techniki lutowania SMD'
    },
    {
      id: 'lutowanie-przemyslowe',
      title: 'Lutowanie przemysłowe',
      description: 'Szkolenie z lutowania w produkcji przemysłowej i kontroli jakości.',
      duration: '20 godzin',
      participants: 'do 10 osób',
      price: '580 zł',
      features: ['Normy IPC', 'Kontrola jakości', 'Automatyzacja', 'Certyfikat IPC'],
      badge: 'Przemysłowe',
      image: '/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png',
      imageAlt: 'Lutowanie przemysłowe według norm IPC'
    }
  ];

  const stats = [
    { value: 800, label: 'Przeszkolonych specjalistów', suffix: '+' },
    { value: 100, label: 'Zadowolenie uczestników', suffix: '%' },
    { value: 6, label: 'Lat doświadczenia', suffix: '+' },
    { value: 50, label: 'Firm współpracujących', suffix: '+' }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Certyfikaty IPC',
      description: 'Międzynarodowo uznawane certyfikaty lutowania'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Doświadczeni instruktorzy',
      description: 'Praktycy z wieloletnim doświadczeniem w elektronice'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nowoczesne stanowiska',
      description: 'Najnowsze narzędzia i stacje lutownicze'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Małe grupy',
      description: 'Maksymalnie 8 osób - indywidualne podejście'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Praktyczne podejście',
      description: 'Hands-on learning na rzeczywistych projektach'
    },
    {
      icon: <Flame className="h-6 w-6" />,
      title: 'Wszystkie techniki',
      description: 'Od podstawowego lutowania do zaawansowanych metod'
    }
  ];

  const isItemVisible = (index: number, visibleItems: number[]) => {
    return showAllItems || visibleItems.includes(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`flex items-center space-x-2 text-red-100 mb-8 transition-all duration-600 ${
            heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
            <span>/</span>
            <span className="text-white font-medium">Szkolenia z lutowania</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                🔥 Praktyczne warsztaty lutowania
              </div>

              <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Szkolenia z <span className="text-red-200">Lutowania</span>
              </h1>

              <p className={`text-xl text-red-100 mb-8 leading-relaxed transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                Praktyczne warsztaty z lutowania prowadzone przez ekspertów. 
                Od podstaw do zaawansowanych technik przemysłowych.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-xl"
                  onClick={() => setShowContactForm(true)}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zapisz się na kurs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 hover:scale-105 transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Pobierz program
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dostępne kursy lutowania
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Praktyczne szkolenia z lutowania - od podstaw do zaawansowanych technik przemysłowych.
          </p>
        </div>

        <div ref={coursesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Zapisz się na kurs
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dlaczego warto wybrać nasze warsztaty lutowania?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-300">
                <div className="text-red-600 mb-4 mx-auto w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-500 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Rozwijaj swoje umiejętności lutowania
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            Dołącz do grona specjalistów lutowania i zdobądź praktyczne umiejętności w elektronice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={() => setShowContactForm(true)}
            >
              Zapisz się teraz
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 hover:scale-105 transition-all duration-300"
            >
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </div>

      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default LutowaniePage;
