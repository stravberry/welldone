
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Users, Award, CheckCircle, Star, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const RealizationsPage = () => {
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: realizationsRef, isVisible: realizationsVisible } = useScrollAnimation<HTMLDivElement>();

  const stats = [
    { value: "500+", label: "Przeszkolonych pracowników", icon: <Users className="h-8 w-8 text-orange-500" /> },
    { value: "150+", label: "Zadowolonych firm", icon: <Building className="h-8 w-8 text-orange-500" /> },
    { value: "96%", label: "Zdawalność egzaminów", icon: <Award className="h-8 w-8 text-orange-500" /> },
    { value: "10+", label: "Lat doświadczenia", icon: <Star className="h-8 w-8 text-orange-500" /> }
  ];

  const realizations = [
    {
      company: "Firma Produkcyjna XYZ Sp. z o.o.",
      industry: "Przemysł motoryzacyjny",
      scope: "Szkolenia UDT dla 45 operatorów wózków widłowych",
      duration: "3 miesiące",
      location: "Wrocław",
      results: "100% zdawalność egzaminów, podniesienie bezpieczeństwa pracy",
      year: "2024"
    },
    {
      company: "ABC Manufacturing",
      industry: "Przemysł spożywczy",
      scope: "Kompleksowe szkolenia SEP i UDT dla 30 pracowników",
      duration: "2 miesiące",
      location: "Poznań",
      results: "Optymalizacja kosztów szkoleń o 25%, pełna zgodność z przepisami",
      year: "2024"
    },
    {
      company: "TechProd Solutions",
      industry: "Przemysł elektroniczny",
      scope: "Szkolenia z lutowania dla zespołu produkcyjnego",
      duration: "1 miesiąc",
      location: "Kraków",
      results: "Redukcja błędów produkcyjnych o 40%, poprawa jakości produktów",
      year: "2023"
    },
    {
      company: "Heavy Industry Corp.",
      industry: "Przemysł maszynowy",
      scope: "Uprawnienia UDT dla konserwatorów suwnic",
      duration: "4 miesiące",
      location: "Gdańsk",
      results: "Certyfikacja 20 konserwatorów, zwiększenie efektywności obsługi",
      year: "2023"
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
                Nasze realizacje
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Sukcesy naszych
              <span className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
                klientów
              </span>
            </h1>
            <p className="text-xl mb-8 text-orange-50 leading-relaxed max-w-3xl mx-auto">
              Zobacz, jak pomogliśmy firmom z różnych branż osiągnąć pełną zgodność 
              z przepisami bezpieczeństwa i podnieść kompetencje swoich pracowników.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
                <Link to="/wycena">Uzyskaj wycenę</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-orange-500/20 text-white hover:bg-orange-400/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                <Link to="/kontakt">
                  Skontaktuj się z nami
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Realizations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Case studies
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Przykłady naszych realizacji
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Każdy projekt to unikalne wyzwanie, które podejmujemy z pełnym zaangażowaniem i profesjonalizmem.
            </p>
          </div>

          <div 
            ref={realizationsRef}
            className={`grid gap-8 transition-all duration-1000 ${
              realizationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {realizations.map((realization, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{realization.company}</h3>
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {realization.year}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Building className="h-5 w-5 mr-2 text-orange-500" />
                        <span className="font-semibold mr-2">Branża:</span>
                        {realization.industry}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CheckCircle className="h-5 w-5 mr-2 text-orange-500" />
                        <span className="font-semibold mr-2">Zakres:</span>
                        {realization.scope}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                        <span className="font-semibold mr-2">Czas realizacji:</span>
                        {realization.duration}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                        <span className="font-semibold mr-2">Lokalizacja:</span>
                        {realization.location}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Osiągnięte rezultaty:</h4>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500">
                      <p className="text-gray-700 leading-relaxed">{realization.results}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Dołącz do grona zadowolonych klientów
          </h2>
          <p className="text-xl mb-8 text-orange-50 max-w-3xl mx-auto">
            Pozwól nam pomóc Twojej firmie osiągnąć podobne sukcesy. 
            Skontaktuj się z nami już dziś i rozpocznij drogę do pełnej zgodności z przepisami.
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

export default RealizationsPage;
