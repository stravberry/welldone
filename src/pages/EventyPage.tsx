import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Users, CheckCircle, Award, Shield, Target, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';
import EventyContactForm from './components/EventyContactForm';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const EventyPage = () => {
  const { trackEvent } = useEventTracking();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    trackEvent({
      category: 'form',
      action: 'submit',
      label: 'eventy-contact-form'
    });
  };

  const scrollToContactForm = (courseName: string) => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      // Auto-fill message with course name
      setFormData(prev => ({
        ...prev,
        message: `Jestem zainteresowany kursem ${courseName}`
      }));
    }
  };

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

        {/* Large Background Presentation Icon */}
        <div className={`absolute -right-32 top-0 bottom-0 flex justify-end items-center transition-all duration-800 ${
          heroInView || showAllItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <svg
            width="1600"
            height="1600"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-6"
          >
            <g className="text-purple-200">
              {/* Presentation Board */}
              <rect x="150" y="80" width="180" height="120" rx="8" fill="currentColor" opacity="0.6"/>
              <rect x="155" y="85" width="170" height="110" rx="5" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8"/>
              
              {/* Chart on board */}
              <rect x="170" y="100" width="8" height="40" fill="currentColor" opacity="0.7"/>
              <rect x="185" y="110" width="8" height="30" fill="currentColor" opacity="0.7"/>
              <rect x="200" y="95" width="8" height="45" fill="currentColor" opacity="0.7"/>
              <rect x="215" y="105" width="8" height="35" fill="currentColor" opacity="0.7"/>
              
              {/* Text lines on board */}
              <rect x="250" y="105" width="60" height="3" fill="currentColor" opacity="0.5"/>
              <rect x="250" y="115" width="50" height="3" fill="currentColor" opacity="0.5"/>
              <rect x="250" y="125" width="55" height="3" fill="currentColor" opacity="0.5"/>
              
              {/* Board stand */}
              <rect x="238" y="200" width="4" height="60" fill="currentColor" opacity="0.7"/>
              <path d="M220 260 L260 260" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6"/>
              
              {/* Group of people (audience) */}
              {/* Person 1 */}
              <circle cx="80" cy="220" r="12" fill="currentColor" opacity="0.5"/>
              <rect x="70" y="235" width="20" height="30" rx="10" fill="currentColor" opacity="0.5"/>
              
              {/* Person 2 */}
              <circle cx="110" cy="215" r="12" fill="currentColor" opacity="0.6"/>
              <rect x="100" y="230" width="20" height="30" rx="10" fill="currentColor" opacity="0.6"/>
              
              {/* Person 3 */}
              <circle cx="140" cy="225" r="12" fill="currentColor" opacity="0.5"/>
              <rect x="130" y="240" width="20" height="30" rx="10" fill="currentColor" opacity="0.5"/>
              
              {/* Person 4 */}
              <circle cx="80" cy="280" r="12" fill="currentColor" opacity="0.6"/>
              <rect x="70" y="295" width="20" height="30" rx="10" fill="currentColor" opacity="0.6"/>
              
              {/* Person 5 */}
              <circle cx="110" cy="285" r="12" fill="currentColor" opacity="0.5"/>
              <rect x="100" y="300" width="20" height="30" rx="10" fill="currentColor" opacity="0.5"/>
              
              {/* Person 6 */}
              <circle cx="140" cy="290" r="12" fill="currentColor" opacity="0.6"/>
              <rect x="130" y="305" width="20" height="30" rx="10" fill="currentColor" opacity="0.6"/>
              
              {/* Presenter */}
              <circle cx="240" cy="240" r="15" fill="currentColor" opacity="0.8"/>
              <rect x="228" y="260" width="24" height="35" rx="12" fill="currentColor" opacity="0.8"/>
              
              {/* Presenter arm pointing */}
              <path d="M250 270 L280 250" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.7"/>
              
              {/* Educational symbols */}
              <circle cx="350" cy="120" r="20" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4"/>
              <path d="M350 105 L350 135 M340 120 L360 120" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              
              {/* Light bulb (idea) */}
              <circle cx="320" cy="300" r="12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <rect x="316" y="308" width="8" height="4" fill="currentColor" opacity="0.4"/>
              <path d="M315 305 L325 305" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <path d="M315 307 L325 307" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              
              {/* Knowledge sharing arrows */}
              <path d="M180 250 Q200 270 220 250" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
              <polygon points="215,248 225,250 215,252" fill="currentColor" opacity="0.4"/>
            </g>
          </svg>
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
                  onClick={() => {
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Skontaktuj się z nami
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-purple-600 hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/wycena">
                    <Mail className="mr-2 h-5 w-5" />
                    Błyskawiczna wycena
                  </Link>
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
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => scrollToContactForm(service.title)}
                >
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
              onClick={() => {
                const contactForm = document.getElementById('contact-form');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Skontaktuj się z nami
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-purple-600 hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/wycena">
                Błyskawiczna wycena
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <EventyContactForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

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
