
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Users, Briefcase, BarChart, BookOpen, ArrowRight, CheckCircle, Clock, ThumbsUp, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServicesPage = () => {
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation<HTMLDivElement>();

  const services = [
    {
      title: "Uprawnienia UDT dla operatorów",
      description: "Szkolenia i certyfikacja dla operatorów urządzeń transportu bliskiego, takich jak wózki widłowe, suwnice i podesty ruchome.",
      icon: <Award size={40} className="text-orange-500" />,
      link: "/uslugi/udt-operatorzy",
      features: ["Wózki widłowe", "Suwnice", "Podesty ruchome", "Certyfikaty UDT"]
    },
    {
      title: "Uprawnienia UDT dla konserwatorów",
      description: "Kursy dla konserwatorów urządzeń transportu bliskiego, takich jak suwnice i żurawie. Teoria online, praktyka stacjonarna.",
      icon: <Briefcase size={40} className="text-orange-500" />,
      link: "/udt-konserwatorze",
      features: ["Suwnice i żurawie", "Teoria online", "Praktyka stacjonarna", "Certyfikacja UDT"]
    },
    {
      title: "Uprawnienia SEP",
      description: "Szkolenia i certyfikacja w zakresie uprawnień SEP: elektryczne, cieplne i gazowe dla pracowników obsługujących specjalistyczne urządzenia.",
      icon: <BookOpen size={40} className="text-orange-500" />,
      link: "/sep",
      features: ["Uprawnienia elektryczne", "Uprawnienia cieplne", "Uprawnienia gazowe", "Certyfikaty SEP"]
    },
    {
      title: "Szkolenia z lutowania",
      description: "Profesjonalne kursy dla firm zajmujących się procesami lutowania. Podnosimy jakość produkcji i redukujemy liczbę błędów.",
      icon: <BarChart size={40} className="text-orange-500" />,
      link: "/lutowanie",
      features: ["Techniki lutowania", "Kontrola jakości", "Redukcja błędów", "Certyfikacja"]
    },
    {
      title: "Eventy edukacyjne",
      description: "Organizacja wydarzeń edukacyjnych dla firm, które chcą zwiększyć świadomość pracowników w zakresie bezpieczeństwa technicznego.",
      icon: <Users size={40} className="text-orange-500" />,
      link: "/eventy",
      features: ["Wydarzenia edukacyjne", "Bezpieczeństwo", "Świadomość pracowników", "Organizacja eventów"]
    },
    {
      title: "Szkolenia na wózki unoszące",
      description: "Specjalistyczne szkolenia dla operatorów wózków unoszących. Bezpieczna obsługa i certyfikacja zgodna z przepisami.",
      icon: <Shield size={40} className="text-orange-500" />,
      link: "/szkolenie-wozki-unoszace",
      features: ["Wózki unoszące", "Bezpieczna obsługa", "Praktyczne ćwiczenia", "Certyfikacja"]
    }
  ];

  const benefits = [
    {
      icon: <Clock size={24} className="text-orange-500" />,
      title: "Elastyczny harmonogram",
      description: "Dostosowujemy terminy szkoleń do Twojego harmonogramu pracy i potrzeb firmy."
    },
    {
      icon: <Award size={24} className="text-orange-500" />,
      title: "Doświadczeni trenerzy",
      description: "Nasi trenerzy to specjaliści z wieloletnim doświadczeniem w branży produkcyjnej."
    },
    {
      icon: <CheckCircle size={24} className="text-orange-500" />,
      title: "Szkolenia szyte na miarę",
      description: "Każde szkolenie jest dopasowane do specyficznych potrzeb Twojej firmy."
    },
    {
      icon: <ThumbsUp size={24} className="text-orange-500" />,
      title: "Najwyższa jakość",
      description: "Gwarantujemy najwyższą jakość szkoleń i wsparcie na każdym etapie współpracy."
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Nasze usługi
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Kompleksowe szkolenia
              <span className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
                dla firm produkcyjnych
              </span>
            </h1>
            <p className="text-xl mb-8 text-orange-50 leading-relaxed max-w-3xl mx-auto">
              Zapewniamy pełną zgodność uprawnień UDT i SEP dla pracowników. Nasze szkolenia są dopasowane 
              do indywidualnych potrzeb każdej firmy i przeprowadzane przez doświadczonych ekspertów.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
                <Link to="/wycena">Uzyskaj wycenę</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-orange-500/20 text-white hover:bg-orange-400/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                <Link to="/bezplatny-audyt">
                  Bezpłatny audyt
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Pełna oferta
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Nasze specjalizacje
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferujemy szeroki zakres szkoleń technicznych i certyfikacji dla sektora produkcyjnego.
            </p>
          </div>

          <div 
            ref={servicesRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
              servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {services.map((service, index) => (
              <div key={index} className="transform hover:scale-105 transition-all duration-300">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Dlaczego my?
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Korzyści ze współpracy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nasze doświadczenie i profesjonalne podejście gwarantują najwyższą jakość szkoleń.
            </p>
          </div>

          <div 
            ref={benefitsRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Rozpocznij współpracę już dziś
          </h2>
          <p className="text-xl mb-8 text-orange-50 max-w-3xl mx-auto">
            Skontaktuj się z nami, aby otrzymać spersonalizowaną ofertę szkoleń dla Twojej firmy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
              <Link to="/kontakt">Skontaktuj się z nami</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-orange-400/20 text-white hover:bg-orange-300/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
              <Link to="/wycena">
                Uzyskaj wycenę
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
