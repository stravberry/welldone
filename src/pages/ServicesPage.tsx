
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Users, Target, CheckCircle, Wrench, Building, Zap, Clock, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServicesPage = () => {
  const { elementRef: servicesRef, isInView: servicesVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: featuresRef, isInView: featuresVisible } = useScrollAnimation<HTMLDivElement>();

  const services = [
    {
      title: "Szkolenia UDT Operatorzy",
      description: "Kompleksowe szkolenia dla operatorów urządzeń technicznych - wózki widłowe, platformy ruchome, żurawie.",
      icon: <Wrench className="h-12 w-12 text-orange-500" />,
      link: "/uslugi/udt-operatorzy",
      features: ["Kursy podstawowe i odświeżające", "Wszystkie kategorie UDT", "Egzaminy w UDT"]
    },
    {
      title: "Szkolenia UDT Konserwatorzy", 
      description: "Specjalistyczne szkolenia dla konserwatorów urządzeń technicznych i osób odpowiedzialnych za ich eksploatację.",
      icon: <Shield className="h-12 w-12 text-orange-500" />,
      link: "/udt-konserwatorze",
      features: ["Uprawnienia konserwatorskie", "Dozór techniczny", "Uprawnienia UDT"]
    },
    {
      title: "Szkolenia SEP",
      description: "Uprawnienia elektryczne SEP we wszystkich grupach - od 1kV do najwyższych napięć.",
      icon: <Zap className="h-12 w-12 text-orange-500" />,
      link: "/sep",
      features: ["Wszystkie grupy SEP", "Kursy i egzaminy", "Dokumentacja"]
    },
    {
      title: "Szkolenia z lutowania",
      description: "Profesjonalne kursy lutowania dla przemysłu elektronicznego i nie tylko.",
      icon: <Target className="h-12 w-12 text-orange-500" />,
      link: "/lutowanie", 
      features: ["Lutowanie ręczne", "Lutowanie maszynowe", "Certyfikaty"]
    },
    {
      title: "Eventy szkoleniowe",
      description: "Organizacja eventów szkoleniowych, konferencji i seminariów dla firm.",
      icon: <Users className="h-12 w-12 text-orange-500" />,
      link: "/eventy",
      features: ["Konferencje", "Seminaria", "Warsztaty"]
    }
  ];

  const features = [
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Certyfikowane szkolenia",
      description: "Wszystkie nasze kursy są akredytowane przez odpowiednie instytucje państwowe."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Doświadczeni instruktorzy", 
      description: "Nasz zespół to praktycy z wieloletnim doświadczeniem w branży."
    },
    {
      icon: <Target className="h-8 w-8 text-orange-500" />,
      title: "Indywidualne podejście",
      description: "Dostosowujemy program szkoleń do specyfiki Twojej firmy."
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Pełna zgodność z przepisami",
      description: "Gwarantujemy zgodność z najnowszymi przepisami i standardami."
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-orange-300/30 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-20 w-4 h-4 bg-white/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-orange-200/20 rounded-full animate-bounce" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide backdrop-blur-sm">
                  🏆 Lider szkoleń technicznych
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Profesjonalne szkolenia,
                <span className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
                  które zwiększają bezpieczeństwo
                </span>
                <span className="block text-orange-100">
                  Twojej firmy
                </span>
              </h1>
              
              <p className="text-xl mb-8 text-orange-50 leading-relaxed">
                Zdobądź wszystkie wymagane uprawnienia w jednym miejscu. Nasze szkolenia to gwarancja 
                compliance, bezpieczeństwa i profesjonalnego rozwoju Twoich pracowników.
              </p>

              {/* Key benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Star className="h-6 w-6 text-orange-200 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">96%</div>
                  <div className="text-orange-100 text-sm">Zdawalność</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Clock className="h-6 w-6 text-orange-200 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">3-5</div>
                  <div className="text-orange-100 text-sm">Dni realizacji</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-orange-200 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2500+</div>
                  <div className="text-orange-100 text-sm">Certyfikatów</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
                  <Link to="/bezplatny-audyt">
                    <Shield className="mr-2 h-5 w-5" />
                    Bezpłatny audyt uprawnień
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-orange-500/20 text-white hover:bg-orange-400/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                  <Link to="/wycena">
                    Błyskawiczna wycena
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Enhanced stats section */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Nasze osiągnięcia</h3>
                  <p className="text-orange-100">w liczbach</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">15+</div>
                    <div className="text-orange-100 text-sm">Lat doświadczenia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">5000+</div>
                    <div className="text-orange-100 text-sm">Przeszkolonych</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">24h</div>
                    <div className="text-orange-100 text-sm">Czas odpowiedzi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">100%</div>
                    <div className="text-orange-100 text-sm">Zgodność z prawem</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-500/20 rounded-xl border border-orange-300/30">
                  <div className="flex items-center justify-center space-x-2 text-orange-100">
                    <Award className="h-5 w-5" />
                    <span className="text-sm font-medium">Certyfikowany partner UDT i SEP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Oferta
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Poznaj nasze usługi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specjalizujemy się w dostarczaniu profesjonalnych szkoleń technicznych dla różnych branż przemysłowych.
            </p>
          </div>

          <div 
            ref={servicesRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
              servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group transform hover:scale-105 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 group-hover:shadow-lg transition-all duration-300">
                  <Link to={service.link}>
                    Dowiedz się więcej
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Dlaczego my?
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Nasze przewagi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To co wyróżnia nas na rynku szkoleń technicznych i sprawia, że klienci wracają do nas ponownie.
            </p>
          </div>

          <div 
            ref={featuresRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-orange-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Zaoszczędź czas i pieniądze na szkoleniach
          </h2>
          <p className="text-xl mb-8 text-orange-50 max-w-3xl mx-auto">
            Skontaktuj się z nami już dziś i otrzymaj bezpłatny audyt aktualnych uprawnień 
            w Twojej firmie. Pokażemy Ci, jak zoptymalizować koszty szkoleń i zapewnić pełną zgodność z przepisami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
              <Link to="/bezplatny-audyt">
                <Shield className="mr-2 h-5 w-5" />
                Bezpłatny audyt uprawnień
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-orange-400/20 text-white hover:bg-orange-300/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
              <Link to="/kontakt">
                Skontaktuj się z ekspertem
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
