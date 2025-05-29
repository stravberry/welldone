import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Zap, CheckCircle, Award, Users, Shield, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';

const SepPage = () => {
  const { trackEvent } = useEventTracking();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  
  useScrollToTop();

  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const { elementRef: coursesRef, visibleItems: visibleCourses } = useStaggeredAnimation<HTMLDivElement>(4, 150);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowAllItems(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const courses = [
    {
      id: 'sep-do-1kv',
      title: 'SEP do 1kV',
      description: 'Uprawnienia elektryczne SEP do 1kV - podstawowe uprawnienia elektryczne.',
      duration: '40 godzin',
      participants: 'do 12 osób',
      price: '850 zł',
      features: ['Teoria elektrotechniki', 'Przepisy bezpieczeństwa', 'Egzamin UDT', 'Certyfikat SEP'],
      badge: 'Podstawowe',
      image: '/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png',
      imageAlt: 'Elektryk pracujący z instalacją do 1kV'
    },
    {
      id: 'sep-powyżej-1kv',
      title: 'SEP powyżej 1kV',
      description: 'Uprawnienia elektryczne SEP powyżej 1kV - wysokie napięcie.',
      duration: '50 godzin',
      participants: 'do 10 osób',
      price: '1200 zł',
      features: ['Wysokie napięcie', 'Zaawansowane procedury', 'Egzamin UDT', 'Certyfikat SEP'],
      badge: 'Zaawansowane',
      image: '/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png',
      imageAlt: 'Elektryk przy instalacji wysokiego napięcia'
    },
    {
      id: 'sep-eksploatacyjne',
      title: 'SEP eksploatacyjne',
      description: 'Uprawnienia eksploatacyjne SEP - obsługa urządzeń elektrycznych.',
      duration: '35 godzin',
      participants: 'do 15 osób',
      price: '750 zł',
      features: ['Eksploatacja urządzeń', 'Konserwacja', 'Egzamin UDT', 'Certyfikat'],
      image: '/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png',
      imageAlt: 'Elektryk podczas eksploatacji urządzeń'
    },
    {
      id: 'sep-odswiezajace',
      title: 'Szkolenia odświeżające SEP',
      description: 'Okresowe szkolenia odświeżające uprawnienia SEP.',
      duration: '8 godzin',
      participants: 'do 20 osób',
      price: '320 zł',
      features: ['Aktualizacja przepisów', 'Nowe technologie', 'Potwierdzenie uprawnień', 'Certyfikat'],
      badge: 'Odświeżające',
      image: '/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png',
      imageAlt: 'Szkolenie odświeżające SEP'
    }
  ];

  const stats = [
    { value: 2000, label: 'Posiadaczy uprawnień SEP', suffix: '+' },
    { value: 98, label: 'Zdawalność egzaminów', suffix: '%' },
    { value: 12, label: 'Lat doświadczenia', suffix: '+' },
    { value: 300, label: 'Firm współpracujących', suffix: '+' }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: '98% zdawalność',
      description: 'Najwyższa zdawalność egzaminów SEP w regionie'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Certyfikowani instruktorzy',
      description: 'Kadra z aktywnymi uprawnieniami i doświadczeniem'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nowoczesne laboratoria',
      description: 'Szkolenia na rzeczywistych instalacjach elektrycznych'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Elastyczne terminy',
      description: 'Kursy dostosowane do potrzeb uczestników'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Uznanie UDT',
      description: 'Oficjalne uprawnienia elektryczne w całej Polsce'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Praktyczne podejście',
      description: 'Nacisk na praktyczne zastosowanie wiedzy'
    }
  ];

  const isItemVisible = (index: number, visibleItems: number[]) => {
    return showAllItems || visibleItems.includes(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Lightning Bolt Background Icon - positioned more to the left */}
        <div className={`absolute right-32 top-0 bottom-0 flex justify-center items-center transition-all duration-800 ${
          heroInView || showAllItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <svg
            width="600"
            height="600"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-8"
          >
            <g className="text-yellow-200">
              {/* Simple Lightning Bolt */}
              <path 
                d="M80 20 L60 90 L90 90 L70 180 L120 70 L95 70 L120 20 Z" 
                fill="currentColor" 
                opacity="0.6"
              />
              {/* Lightning glow effect */}
              <path 
                d="M80 20 L60 90 L90 90 L70 180 L120 70 L95 70 L120 20 Z" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none" 
                opacity="0.4"
              />
            </g>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`flex items-center space-x-2 text-yellow-100 mb-8 transition-all duration-600 ${
            heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
            <span>/</span>
            <span className="text-white font-medium">Uprawnienia SEP</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                ⚡ Certyfikowane szkolenia elektryczne
              </div>

              <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Uprawnienia <span className="text-yellow-200">SEP</span>
              </h1>

              <p className={`text-xl text-yellow-100 mb-8 leading-relaxed transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                Zdobądź uprawnienia elektryczne SEP. Profesjonalne szkolenia 
                z najwyższą zdawalnością egzaminów w regionie.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <Button 
                  size="lg" 
                  className="bg-white text-yellow-600 hover:bg-yellow-50 hover:scale-105 transition-all duration-300 shadow-xl"
                  onClick={() => setShowContactForm(true)}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zapisz się na kurs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-yellow-600 bg-white hover:bg-yellow-50 hover:scale-105 transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Błyskawiczna wycena
                </Button>
              </div>
            </div>

            {/* Right column - kept empty since we moved the symbol to background */}
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dostępne kursy SEP
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kompletna oferta szkoleń elektrycznych SEP - od podstawowych do zaawansowanych uprawnień.
          </p>
        </div>

        <div ref={coursesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div key={course.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
              isItemVisible(index, visibleCourses) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="relative h-48 overflow-hidden">
                <img src={course.image} alt={course.imageAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {course.badge && (
                  <div className="absolute top-4 right-4 bg-white text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    <p className="font-semibold text-yellow-600">{course.price}</p>
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
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
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
              Dlaczego warto wybrać nasze szkolenia SEP?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition-all duration-300">
                <div className="text-yellow-600 mb-4 mx-auto w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
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
      <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-500 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Zdobądź uprawnienia elektryczne SEP
          </h2>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
            Rozpocznij karierę w branży elektrycznej z oficjalnymi uprawnieniami SEP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-yellow-600 hover:bg-yellow-50 hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={() => setShowContactForm(true)}
            >
              Zapisz się teraz
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-yellow-600 bg-white hover:bg-yellow-50 hover:scale-105 transition-all duration-300"
            >
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </div>

      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default SepPage;
