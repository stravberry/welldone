
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Users, CheckCircle, Award, Shield, Target, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';

const EventyPage = () => {
  const { trackEvent } = useEventTracking();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  
  useScrollToTop();

  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const { elementRef: servicesRef, visibleItems: visibleServices } = useStaggeredAnimation<HTMLDivElement>(4, 150);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowAllItems(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const services = [
    {
      id: 'konferencje-techniczne',
      title: 'Konferencje techniczne',
      description: 'Organizacja profesjonalnych konferencji i seminariów technicznych.',
      duration: '1-3 dni',
      participants: '50-300 osób',
      price: 'Wycena indywidualna',
      features: ['Agenda dostosowana do potrzeb', 'Eksperci branżowi', 'Materiały konferencyjne', 'Catering'],
      badge: 'Popularne',
      image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
      imageAlt: 'Konferencja techniczna z ekspertami branżowymi'
    },
    {
      id: 'warsztaty-firmowe',
      title: 'Warsztaty firmowe',
      description: 'Dedykowane warsztaty szkoleniowe dla zespołów pracowniczych.',
      duration: '4-16 godzin',
      participants: '10-50 osób',
      price: 'Od 3000 zł',
      features: ['Indywidualne podejście', 'Materiały własne', 'Praktyczne ćwiczenia', 'Certyfikaty'],
      badge: 'Na zamówienie',
      image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
      imageAlt: 'Warsztat firmowy dla pracowników'
    },
    {
      id: 'dni-otwarte',
      title: 'Dni otwarte i prezentacje',
      description: 'Organizacja dni otwartych i prezentacji produktów technicznych.',
      duration: '4-8 godzin',
      participants: '20-100 osób',
      price: 'Od 2000 zł',
      features: ['Prezentacje produktów', 'Demonstracje live', 'Networking', 'Materiały promocyjne'],
      image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
      imageAlt: 'Dzień otwarty z prezentacjami technicznymi'
    },
    {
      id: 'szkolenia-online',
      title: 'Eventy online',
      description: 'Webinary i szkolenia online dostosowane do potrzeb klienta.',
      duration: '1-4 godziny',
      participants: 'Bez limitu',
      price: 'Od 1500 zł',
      features: ['Platforma online', 'Interaktywne prezentacje', 'Nagrania sesji', 'Materiały cyfrowe'],
      badge: 'Elastyczne',
      image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
      imageAlt: 'Webinar i szkolenie online'
    }
  ];

  const stats = [
    { value: 150, label: 'Zorganizowanych eventów', suffix: '+' },
    { value: 95, label: 'Zadowolenie klientów', suffix: '%' },
    { value: 5000, label: 'Uczestników', suffix: '+' },
    { value: 80, label: 'Firm partnerskich', suffix: '+' }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Doświadczenie',
      description: 'Ponad 150 zorganizowanych eventów edukacyjnych'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Eksperci branżowi',
      description: 'Współpraca z najlepszymi specjalistami w dziedzinie'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Pełna obsługa',
      description: 'Od koncepcji po realizację - zajmujemy się wszystkim'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Dostosowanie',
      description: 'Eventy szyte na miarę potrzeb Twojej firmy'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Najwyższa jakość',
      description: '95% zadowolenia klientów z organizowanych eventów'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Terminowość',
      description: 'Zawsze dotrzymujemy ustalonych terminów'
    }
  ];

  const isItemVisible = (index: number, visibleItems: number[]) => {
    return showAllItems || visibleItems.includes(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`flex items-center space-x-2 text-purple-100 mb-8 transition-all duration-600 ${
            heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
            <span>/</span>
            <span className="text-white font-medium">Eventy edukacyjne</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                🎯 Profesjonalne eventy edukacyjne
              </div>

              <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Eventy <span className="text-purple-200">Edukacyjne</span>
              </h1>

              <p className={`text-xl text-purple-100 mb-8 leading-relaxed transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                Organizujemy profesjonalne wydarzenia edukacyjne i szkoleniowe 
                dostosowane do potrzeb Twojej firmy i branży.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-xl"
                  onClick={() => setShowContactForm(true)}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Skontaktuj się z nami
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Otrzymaj wycenę
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nasze usługi eventowe
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kompleksowa organizacja eventów edukacyjnych - od konferencji po warsztaty firmowe.
          </p>
        </div>

        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
              isItemVisible(index, visibleServices) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="relative h-48 overflow-hidden">
                <img src={service.image} alt={service.imageAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {service.badge && (
                  <div className="absolute top-4 right-4 bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    {service.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Czas trwania</p>
                    <p className="font-semibold">{service.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Uczestnicy</p>
                    <p className="font-semibold">{service.participants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cena</p>
                    <p className="font-semibold text-purple-600">{service.price}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Zamów event
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
              Dlaczego warto zlecić nam organizację eventu?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-300">
                <div className="text-purple-600 mb-4 mx-auto w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
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
      <div className="relative bg-gradient-to-r from-purple-600 to-purple-500 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Masz pomysł na event edukacyjny?
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Skontaktuj się z nami i omówmy szczegóły Twojego wydarzenia. Zapewnimy profesjonalną organizację od A do Z.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={() => setShowContactForm(true)}
            >
              Skontaktuj się z nami
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300"
            >
              Otrzymaj wycenę
            </Button>
          </div>
        </div>
      </div>

      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default EventyPage;
