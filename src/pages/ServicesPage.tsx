import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import { Wrench, Wrench as Tool, Zap, Flame, Users, Star, Award, Shield, CheckCircle } from 'lucide-react';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation, useCounterAnimation } from '@/hooks/useScrollAnimation';
const ServicesPage = () => {
  const {
    trackEvent
  } = useEventTracking();

  // Automatyczne przewijanie na górę przy zmianie strony
  useScrollToTop();
  const services = [{
    title: 'Uprawnienia UDT dla operatorów',
    description: 'Profesjonalne szkolenia i certyfikacja dla operatorów urządzeń technicznych pod nadzorem UDT. Wózki widłowe, podesty ruchome i więcej.',
    icon: <Tool className="h-8 w-8" />,
    link: '/uslugi/udt-operatorzy',
    imageSrc: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    badge: 'Popularne',
    features: ['96% zdawalność', 'Certyfikat UDT', 'Praktyczne szkolenia']
  }, {
    title: 'Uprawnienia UDT dla konserwatorów',
    description: 'Kompleksowe szkolenia dla konserwatorów urządzeń technicznych z certyfikacją UDT i praktycznymi warsztatami.',
    icon: <Wrench className="h-8 w-8" />,
    link: '/uslugi/udt-konserwatorzy',
    imageSrc: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    badge: 'Zaawansowane',
    features: ['Doświadczeni trenerzy', 'Nowoczesny sprzęt', 'Małe grupy']
  }, {
    title: 'Uprawnienia SEP',
    description: 'Zdobądź uprawnienia elektryczne SEP pod okiem doświadczonych specjalistów z wieloletnim doświadczeniem w branży.',
    icon: <Zap className="h-8 w-8" />,
    link: '/uslugi/sep',
    imageSrc: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    badge: 'Certyfikowane',
    features: ['SEP do 1kV', 'SEP powyżej 1kV', 'Egzaminy UDT']
  }, {
    title: 'Szkolenia z lutowania',
    description: 'Praktyczne warsztaty z lutowania prowadzone przez ekspertów w dziedzinie elektroniki i mikromontażu.',
    icon: <Flame className="h-8 w-8" />,
    link: '/uslugi/lutowanie',
    imageSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    badge: 'Praktyczne',
    features: ['Hands-on learning', 'Nowoczesne stanowiska', 'Certyfikat ukończenia']
  }, {
    title: 'Eventy edukacyjne',
    description: 'Organizujemy profesjonalne wydarzenia edukacyjne i szkoleniowe dostosowane do potrzeb Twojej firmy.',
    icon: <Users className="h-8 w-8" />,
    link: '/uslugi/eventy',
    imageSrc: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    badge: 'Na zamówienie',
    features: ['Indywidualne podejście', 'Własne materiały', 'Zespół ekspertów']
  }];
  const stats = [{
    value: 1500,
    label: 'Zadowolonych uczestników',
    suffix: '+'
  }, {
    value: 96,
    label: 'Zdawalność egzaminów',
    suffix: '%'
  }, {
    value: 10,
    label: 'Lat doświadczenia',
    suffix: '+'
  }, {
    value: 200,
    label: 'Firm partnerskich',
    suffix: '+'
  }];
  const features = [{
    icon: <Star className="h-6 w-6" />,
    text: 'Doświadczeni instruktorzy'
  }, {
    icon: <Award className="h-6 w-6" />,
    text: 'Certyfikowane kursy'
  }, {
    icon: <Shield className="h-6 w-6" />,
    text: 'Gwarancja jakości'
  }, {
    icon: <CheckCircle className="h-6 w-6" />,
    text: 'Wsparcie po kursie'
  }];
  const {
    elementRef: heroRef,
    isInView: heroInView
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });
  const {
    elementRef: servicesRef,
    visibleItems
  } = useStaggeredAnimation<HTMLDivElement>(services.length, 150);
  const {
    elementRef: statsRef,
    isInView: statsInView
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });
  const handleServiceClick = (serviceName: string) => {
    trackEvent({
      category: 'navigation',
      action: 'click',
      label: `service-card-${serviceName}`,
      additionalData: {
        serviceTitle: serviceName
      }
    });
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center" style={{
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ✨ Certyfikowane szkolenia techniczne
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '200ms'
          }}>
              Nasze <span className="text-orange-200">Usługi</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto" style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '400ms'
          }}>
              Kompleksowe szkolenia i certyfikacje dla profesjonalistów. 
              Rozwijaj swoje umiejętności z najlepszymi w branży.
            </p>
            
            {/* Features list */}
            <div className="flex flex-wrap justify-center gap-4 mb-8" style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '600ms'
          }}>
              {features.map((feature, index) => <div key={index} className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 text-white">
                  {feature.icon}
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid with Staggered Animation */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <div key={service.link} style={{
          opacity: visibleItems.includes(index) ? 1 : 0,
          transform: visibleItems.includes(index) ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
              <EnhancedServiceCard {...service} index={index} onServiceClick={handleServiceClick} />
            </div>)}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" style={{
          opacity: statsInView ? 1 : 0,
          transform: statsInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dlaczego warto z nami współpracować?
            </h2>
            <p className="text-lg text-gray-600">
              Nasze osiągnięcia mówią same za siebie
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <StatCounter key={index} stat={stat} index={index} isVisible={statsInView} />)}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Nie znalazłeś tego, czego szukasz?
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Skontaktuj się z nami, aby omówić spersonalizowane rozwiązanie dla Twojej firmy. 
            Oferujemy również szkolenia na zamówienie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl" trackingLabel="contact-us-from-services">
              Skontaktuj się z nami
            </Button>
            <Button size="lg" variant="outline" trackingLabel="free-audit-from-services" className="border-white hover:bg-white hover:border-white hover:scale-105 transition-all duration-300 text-[#ff6200]">
              Bezpłatny audyt potrzeb
            </Button>
          </div>
        </div>
      </div>
    </div>;
};

// Enhanced Service Card Component
const EnhancedServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  imageSrc: string;
  badge: string;
  features: string[];
  index: number;
  onServiceClick: (title: string) => void;
}> = ({
  title,
  description,
  icon,
  link,
  imageSrc,
  badge,
  features,
  onServiceClick
}) => {
  const handleClick = () => {
    onServiceClick(title);
  };
  return <Link to={link} onClick={handleClick} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {badge}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            {icon}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
          <div className="space-y-2 mb-4">
            {features.map((feature, index) => <div key={index} className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                {feature}
              </div>)}
          </div>
          <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700 transition-colors duration-300">
            Dowiedz się więcej 
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </div>
      </div>
    </Link>;
};

// Animated Stats Counter Component
const StatCounter: React.FC<{
  stat: {
    value: number;
    label: string;
    suffix: string;
  };
  index: number;
  isVisible: boolean;
}> = ({
  stat,
  index,
  isVisible
}) => {
  const {
    elementRef,
    count
  } = useCounterAnimation<HTMLDivElement>(stat.value, 2000);
  return <div ref={elementRef} className="text-center p-6 bg-orange-50 rounded-xl" style={{
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
  }}>
      <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </div>;
};
export default ServicesPage;