import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Wrench, CheckCircle, Award, Users, Shield, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';

const UdtKonserwatorzePage = () => {
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
      id: 'wozki-konserwator',
      title: 'Konserwacja wózków widłowych',
      description: 'Uprawnienia dla konserwatorów urządzeń transportu bliskiego - wózki widłowe.',
      duration: '24 godziny',
      participants: 'do 8 osób',
      price: '680 zł',
      features: ['Teoria konserwacji', 'Praktyka napraw', 'Egzamin UDT', 'Certyfikat konserwatora'],
      badge: 'Zaawansowane',
      image: '/lovable-uploads/657768d6-dc5a-419b-80b8-b664af6c6775.png',
      imageAlt: 'Konserwator sprawdzający wózek widłowy'
    },
    {
      id: 'podesty-konserwator',
      title: 'Konserwacja podestów ruchomych',
      description: 'Szkolenie konserwatorów podestów ruchomych i platform roboczych.',
      duration: '20 godzin',
      participants: 'do 8 osób',
      price: '750 zł',
      features: ['Diagnostyka usterek', 'Naprawa hydrauliki', 'Egzamin UDT', 'Wsparcie techniczne'],
      image: '/lovable-uploads/e53f9387-8eab-484e-95d8-dae5efb914a0.png',
      imageAlt: 'Konserwator naprawiający podest ruchomy'
    },
    {
      id: 'suwnice-konserwator',
      title: 'Konserwacja suwnic i żurawi',
      description: 'Profesjonalne szkolenia konserwatorów suwnic i żurawi mobilnych.',
      duration: '32 godziny',
      participants: 'do 6 osób',
      price: '920 zł',
      features: ['Naprawa mechanizmów', 'Systemy sterowania', 'Egzamin UDT', 'Certyfikat'],
      badge: 'Ekspert',
      image: '/lovable-uploads/f9dc5911-3540-4c1c-91a0-f031a4e94698.png',
      imageAlt: 'Konserwator pracujący przy suwni'
    }
  ];

  const stats = [
    { value: 800, label: 'Wykwalifikowanych konserwatorów', suffix: '+' },
    { value: 94, label: 'Zdawalność egzaminów', suffix: '%' },
    { value: 10, label: 'Lat doświadczenia', suffix: '+' },
    { value: 120, label: 'Firm obsługiwanych', suffix: '+' }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: '94% zdawalność',
      description: 'Wysoka skuteczność naszych szkoleń konserwatorskich'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Eksperci-praktycy',
      description: 'Instruktorzy z wieloletnim doświadczeniem w konserwacji'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nowoczesne stanowiska',
      description: 'Szkolenia na rzeczywistych urządzeniach'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Małe grupy',
      description: 'Maksymalnie 8 osób - indywidualne podejście'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Wsparcie techniczne',
      description: 'Pomoc i doradztwo również po ukończeniu szkolenia'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Certyfikacja UDT',
      description: 'Oficjalne uprawnienia uznawane w całej Polsce'
    }
  ];

  const isItemVisible = (index: number, visibleItems: number[]) => {
    return showAllItems || visibleItems.includes(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`flex items-center space-x-2 text-blue-100 mb-8 transition-all duration-600 ${
            heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
            <span>/</span>
            <span className="text-white font-medium">Uprawnienia UDT dla konserwatorów</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                🔧 Certyfikowane szkolenia konserwatorskie
              </div>

              <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Uprawnienia UDT dla <span className="text-blue-200">Konserwatorów</span>
              </h1>

              <p className={`text-xl text-blue-100 mb-8 leading-relaxed transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                Zdobądź uprawnienia konserwatorskie UDT. Specjalistyczne szkolenia 
                z napraw i konserwacji urządzeń technicznych.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl"
                  onClick={() => setShowContactForm(true)}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zapisz się na kurs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-blue-600 bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Błyskawiczna wycena
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
            Dostępne kursy konserwatorskie
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specjalistyczne szkolenia dla konserwatorów urządzeń technicznych pod nadzorem UDT.
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
                  <div className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
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
                    <p className="font-semibold text-blue-600">{course.price}</p>
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
              Dlaczego warto wybrać nasze szkolenia konserwatorskie?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                <div className="text-blue-600 mb-4 mx-auto w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
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
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Zostań certyfikowanym konserwatorem
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Zdobądź uprawnienia konserwatorskie i otwórz przed sobą nowe możliwości kariery w branży technicznej.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={() => setShowContactForm(true)}
            >
              Zapisz się teraz
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-blue-600 bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300"
            >
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </div>

      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default UdtKonserwatorzePage;
