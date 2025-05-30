import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Users, Target, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedAdvantagesSection from '@/components/AnimatedAdvantagesSection';
import AnimatedTeamSection from '@/components/AnimatedTeamSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutPage = () => {
  const { elementRef: missionRef, isInView: missionVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: valuesRef, isInView: valuesVisible } = useScrollAnimation<HTMLDivElement>();

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Bezpieczeństwo",
      description: "Priorytetem jest zapewnienie najwyższych standardów bezpieczeństwa w każdym aspekcie naszej działalności."
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Jakość",
      description: "Dostarczamy szkolenia najwyższej jakości, które spełniają wszystkie wymagania branżowe i prawne."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Partnerstwo",
      description: "Budujemy długotrwałe relacje z klientami, oparte na zaufaniu i wzajemnym szacunku."
    },
    {
      icon: <Target className="h-8 w-8 text-orange-500" />,
      title: "Efektywność",
      description: "Optymalizujemy procesy szkoleniowe, aby osiągać maksymalne rezultaty w minimalnym czasie."
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
                O nas
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Pomagamy firmom produkcyjnym
              <span className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
                działać bez ryzyka
              </span>
            </h1>
            <p className="text-xl mb-8 text-orange-50 leading-relaxed max-w-3xl mx-auto">
              Od lat specjalizujemy się w dostarczaniu najwyższej jakości szkoleń dla sektora produkcyjnego. 
              Nasze doświadczenie i pasja do bezpieczeństwa pozwalają nam być liderem w branży.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
                <Link to="/kontakt">Skontaktuj się z nami</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-orange-500/20 text-white hover:bg-orange-400/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                <Link to="/uslugi">
                  Poznaj nasze usługi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={missionRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <div className="inline-block mb-4">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Nasza misja
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                Bezpieczeństwo jako podstawa rozwoju
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Naszą misją jest wspieranie firm produkcyjnych w osiąganiu najwyższych standardów bezpieczeństwa 
                poprzez profesjonalne szkolenia i certyfikacje. Wierzymy, że bezpieczne środowisko pracy to fundament 
                każdej prosperującej organizacji.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Kompleksowe podejście</h4>
                    <p className="text-gray-600">Analizujemy potrzeby każdej firmy indywidualnie</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Najwyższa jakość</h4>
                    <p className="text-gray-600">Współpracujemy tylko z certyfikowanymi ekspertami</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Długoterminowe partnerstwo</h4>
                    <p className="text-gray-600">Budujemy trwałe relacje z naszymi klientami</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/2d3fe45c-4078-43ab-b479-ea144210537f.png" 
                  alt="Profesjonalne szkolenia BHP" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Nasze wartości
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Na czym nam zależy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nasze działania kierują się fundamentalnymi wartościami, które definiują naszą kulturę organizacyjną.
            </p>
          </div>
          
          <div 
            ref={valuesRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <AnimatedAdvantagesSection />

      {/* Team Section */}
      <AnimatedTeamSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Gotowi na współpracę?
          </h2>
          <p className="text-xl mb-8 text-orange-50 max-w-3xl mx-auto">
            Skontaktuj się z nami już dziś i dowiedz się, jak możemy pomóc Twojej firmie 
            osiągnąć najwyższe standardy bezpieczeństwa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
              <Link to="/kontakt">Skontaktuj się z nami</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-orange-400/20 text-white hover:bg-orange-300/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
              <Link to="/bezplatny-audyt">
                Bezpłatny audyt
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

export default AboutPage;
