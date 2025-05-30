
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Users, Target, Building, CheckCircle, Clock, Shield, Zap, TrendingUp, Star, Heart, Lightbulb, Trophy, MapPin } from 'lucide-react';
import AnimatedProcessSection from '@/components/AnimatedProcessSection';
import ContactForm from '@/components/ContactForm';
import AnimatedCounter from '@/components/AnimatedCounter';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedIcon from '@/components/AnimatedIcon';
import InteractiveValueCard from '@/components/InteractiveValueCard';
import ComparisonSection from '@/components/ComparisonSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutPage = () => {
  const { elementRef: heroRef, isInView: heroVisible } = useScrollAnimation();
  const { elementRef: statsRef, isInView: statsVisible } = useScrollAnimation();
  const { elementRef: valuesRef, isInView: valuesVisible } = useScrollAnimation();
  const { elementRef: teamRef, isInView: teamVisible } = useScrollAnimation();

  const values = [
    {
      icon: Clock,
      title: "Elastyczność",
      description: "Dostosowujemy się do potrzeb i harmonogramu Twojej firmy",
      bgColor: "bg-blue-500",
      percentage: 95,
      frontContent: "Szybka realizacja szkoleń zgodnie z Twoim harmonogramem",
      backContent: "Organizujemy szkolenia w weekendy, po godzinach pracy i w lokalizacjach klienta. Pełna elastyczność terminów."
    },
    {
      icon: Users,
      title: "Specjalizacja",
      description: "Koncentrujemy się wyłącznie na branży produkcyjnej",
      bgColor: "bg-purple-500",
      percentage: 98,
      frontContent: "15+ lat doświadczenia w przemyśle",
      backContent: "Znamy specyfikę fabryk, magazynów i zakładów produkcyjnych. Nasze szkolenia są tworzone przez praktyków dla praktyków."
    },
    {
      icon: Target,
      title: "Bezpłatny audyt",
      description: "Sprawdzimy stan uprawnień Twoich pracowników za darmo",
      bgColor: "bg-green-500",
      percentage: 100,
      frontContent: "Kompleksowa analiza potrzeb szkoleniowych",
      backContent: "Dokładnie sprawdzimy jakie uprawnienia są wymagane w Twojej firmie i zaproponujemy optymalny plan szkoleń."
    },
    {
      icon: CheckCircle,
      title: "Kompleksowa obsługa",
      description: "Zajmiemy się wszystkim - od zapisów po certyfikaty",
      bgColor: "bg-orange-500",
      percentage: 100,
      frontContent: "Od A do Z - pełna obsługa procesu szkoleniowego",
      backContent: "Zapisy, organizacja egzaminów, dokumentacja, certyfikaty. Ty się nie martwisz o nic - my załatwiamy wszystko."
    },
    {
      icon: Award,
      title: "Doświadczenie",
      description: "Ponad 15 lat doświadczenia w szkoleniach przemysłowych",
      bgColor: "bg-red-500",
      percentage: 96,
      frontContent: "Tysiące przeszkolonych pracowników",
      backContent: "Przez 15 lat przeszkoliliśmy ponad 5000 osób. Nasze doświadczenie to gwarancja najwyższej jakości szkoleń."
    },
    {
      icon: Building,
      title: "Różnorodność szkoleń",
      description: "Szeroka oferta kursów i certyfikacji branżowych",
      bgColor: "bg-blue-600",
      percentage: 90,
      frontContent: "UDT, SEP, lutowanie i wiele więcej",
      backContent: "Oferujemy pełną gamę szkoleń technicznych. Jeden partner - wszystkie potrzebne uprawnienia."
    }
  ];

  const teamMembers = [
    {
      name: "Jan Kowalski",
      role: "Dyrektor ds. Szkoleń UDT",
      experience: "12 lat",
      certifications: "UDT, ISO 9001",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Anna Nowak",
      role: "Specjalista SEP",
      experience: "8 lat",
      certifications: "SEP do 30kV, Audytor",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Piotr Wiśniewski",
      role: "Instruktor Lutowania",
      experience: "10 lat",
      certifications: "IPC, J-STD-001",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const achievements = [
    { label: "Lat doświadczenia", value: 15, suffix: "+" },
    { label: "Przeszkolonych osób", value: 5000, suffix: "+" },
    { label: "Zadowolonych klientów", value: 98, suffix: "%" },
    { label: "Certyfikatów wydanych", value: 2500, suffix: "+" }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Revolutionary Animated Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
        <FloatingParticles />
        
        {/* Animated gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
          <div 
            ref={heroRef}
            className={`grid lg:grid-cols-2 gap-12 items-center w-full transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <div className="inline-block mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide backdrop-blur-sm">
                  🏆 Lider szkoleń technicznych
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Budujemy bezpieczeństwo
                <span className="block bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  poprzez wiedzę
                </span>
              </h1>
              
              <p className="text-xl mb-8 text-orange-50 leading-relaxed">
                Jesteśmy więcej niż firmą szkoleniową - jesteśmy partnerem w budowaniu 
                kultury bezpieczeństwa i profesjonalizmu w Twojej organizacji.
              </p>

              {/* Real-time stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {achievements.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      <AnimatedCounter 
                        endValue={stat.value} 
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </div>
                    <div className="text-orange-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
                  <Link to="/bezplatny-audyt">
                    <Shield className="mr-2 h-5 w-5" />
                    Bezpłatny audyt uprawnień
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-orange-500/20 text-white hover:bg-orange-400/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                  <Link to="/uslugi">
                    Poznaj nasze usługi
                  </Link>
                </Button>
              </div>
            </div>

            {/* Animated central icon */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <AnimatedIcon type="lightbulb" size={64} className="transform hover:scale-110 transition-transform duration-300" />
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Shield className="h-6 w-6 text-white/70" />
                  </div>
                  <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <Award className="h-6 w-6 text-white/70" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <Users className="h-6 w-6 text-white/70" />
                  </div>
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                    <Target className="h-6 w-6 text-white/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Values Section with Flip Cards */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-orange-500/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Nasze wartości
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Co napędza naszą misję
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Każda z naszych wartości przekłada się na konkretne korzyści dla Twoich pracowników
            </p>
          </div>
          
          <div 
            ref={valuesRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
              valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {values.map((value, index) => (
              <InteractiveValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                percentage={value.percentage}
                bgColor={value.bgColor}
                frontContent={value.frontContent}
                backContent={value.backContent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Enhanced Team Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Nasz zespół
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Praktycy z pasją do nauczania
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nasz zespół to doświadczeni specjaliści, którzy łączą wiedzę teoretyczną z praktyką przemysłową
            </p>
          </div>

          <div 
            ref={teamRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
              teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{member.experience} doświadczenia</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="h-4 w-4" />
                      <span>{member.certifications}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Counter Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <FloatingParticles />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Nasze osiągnięcia w liczbach
            </h2>
            <p className="text-xl text-orange-50 max-w-3xl mx-auto">
              Każda liczba to historia sukcesu naszych klientów i ich pracowników
            </p>
          </div>

          <div 
            ref={statsRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {achievements.map((stat, index) => (
              <div 
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 transform hover:scale-105 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl font-bold mb-4">
                  <AnimatedCounter 
                    endValue={stat.value} 
                    suffix={stat.suffix}
                    duration={2500}
                    className="text-white"
                  />
                </div>
                <p className="text-orange-100 text-lg font-medium">{stat.label}</p>
                
                {/* Circular progress indicator */}
                <div className="mt-4 mx-auto w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="28" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none" 
                      className="text-white/20"
                    />
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="28" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none" 
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - (index + 1) * 0.25)}`}
                      className="text-white transition-all duration-1000 ease-out"
                      style={{ transitionDelay: `${index * 200}ms` }}
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Process Section */}
      <AnimatedProcessSection />

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Poznajmy się lepiej"
            subtitle="Masz pytania o nasze wartości czy sposób pracy? Skontaktuj się z nami - chętnie opowiemy Ci więcej o naszej misji."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
