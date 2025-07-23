import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Zap, CheckCircle, Award, Users, Shield, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';
import ContactForm from '@/components/ContactForm';
import EnhancedCourseCard, { Course } from '@/pages/ServiceDetailPage/components/EnhancedCourseCard';
import Navbar from '@/components/Navbar';

const SepPage = () => {
  const { trackEvent } = useEventTracking();
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
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

  const courses: Course[] = [
    {
      id: 'sep-do-1kv',
      title: 'Uprawnienia SEP do 1 kV',
      description: 'Podstawowe uprawnienia elektryczne do pracy przy urządzeniach do 1000V.',
      duration: '40 godzin',
      participants: 'do 12 osób',
      price: '450 zł',
      features: ['Teoria elektrotechniki', 'Przepisy BHP', 'Egzamin SEP', 'Legitymacja SEP'],
      badge: 'Podstawowe',
      image: '/lovable-uploads/657768d6-dc5a-419b-80b8-b664af6c6775.png',
      imageAlt: 'Elektryk przy pracy do 1kV'
    },
    {
      id: 'sep-do-10kv',
      title: 'Uprawnienia SEP do 10 kV',
      description: 'Rozszerzone uprawnienia elektryczne do pracy przy urządzeniach do 10kV.',
      duration: '80 godzin',
      participants: 'do 10 osób',
      price: '850 zł',
      features: ['Zaawansowana teoria', 'Pomiary elektryczne', 'Egzamin SEP', 'Certyfikat średniego napięcia'],
      badge: 'Zaawansowane',
      image: '/lovable-uploads/e53f9387-8eab-484e-95d8-dae5efb914a0.png',
      imageAlt: 'Elektryk przy instalacji do 10kV'
    },
    {
      id: 'sep-eksploatacja',
      title: 'SEP Eksploatacja',
      description: 'Uprawnienia do eksploatacji urządzeń i instalacji elektrycznych.',
      duration: '60 godzin',
      participants: 'do 8 osób',
      price: '650 zł',
      features: ['Eksploatacja urządzeń', 'Konserwacja instalacji', 'Egzamin SEP', 'Uprawnienia eksploatacyjne'],
      badge: 'Ekspert',
      image: '/lovable-uploads/f9dc5911-3540-4c1c-91a0-f031a4e94698.png',
      imageAlt: 'Eksploatacja instalacji elektrycznych'
    }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: '92% zdawalność',
      description: 'Wysokie wyniki naszych kursantów na egzaminach SEP'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Doświadczeni instruktorzy',
      description: 'Praktycy z wieloletnim doświadczeniem w elektrotechnice'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nowoczesne laboratorium',
      description: 'Szkolenia na profesjonalnym sprzęcie elektrycznym'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Małe grupy szkoleniowe',
      description: 'Maksymalnie 12 osób - indywidualne podejście'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Kompleksowe materiały',
      description: 'Wszystkie niezbędne materiały szkoleniowe w cenie'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Elastyczne terminy',
      description: 'Dostosujemy terminy do potrzeb Twojej firmy'
    }
  ];

  const isItemVisible = (index: number, visibleItems: number[]) => {
    return showAllItems || visibleItems.includes(index);
  };

  const handleCourseRegistration = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-yellow-600 via-yellow-500 to-orange-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ... keep existing code (hero section content) */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Large Background Electric Icon */}
        <div className={`absolute -right-32 top-0 bottom-0 flex justify-end items-center transition-all duration-800 ${
          heroInView || showAllItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <Zap className="w-96 h-96 text-yellow-200 opacity-20" />
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
                z elektrotechniki i bezpieczeństwa pracy przy urządzeniach elektrycznych.
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

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dostępne kursy SEP
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kompleksowe szkolenia elektryczne dostosowane do różnych poziomów zaawansowania.
          </p>
        </div>

        <div ref={coursesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <EnhancedCourseCard
              key={course.id}
              course={course}
              index={index}
              isVisible={isItemVisible(index, visibleCourses)}
              onClick={() => handleCourseRegistration(course.title)}
              onEnroll={() => handleCourseRegistration(course.title)}
            />
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

      {/* Contact Form Section */}
      <div id="contact-form" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ContactForm 
            title="Zapisz się na kurs SEP"
            subtitle="Wypełnij formularz, a nasz konsultant skontaktuje się z Tobą w ciągu 24 godzin"
            initialMessage={selectedCourse ? `Jestem zainteresowany kursem ${selectedCourse}` : ''}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-yellow-600 to-orange-500 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Zdobądź uprawnienia SEP już dziś
          </h2>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
            Dołącz do tysięcy osób, które zdobyły uprawnienia elektryczne SEP dzięki naszym szkoleniom.
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
              asChild
            >
              <Link to="/wycena">
                Skontaktuj się z nami
              </Link>
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
