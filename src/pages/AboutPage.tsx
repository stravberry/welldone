import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Award, Clock, Trophy } from 'lucide-react';
import AnimatedProcessSection from '@/components/AnimatedProcessSection';
import ContactForm from '@/components/ContactForm';
import AnimatedCounter from '@/components/AnimatedCounter';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedIcon from '@/components/AnimatedIcon';
import ComparisonSection from '@/components/ComparisonSection';
import EnhancedTestimonialsSection from '@/components/EnhancedTestimonialsSection';
import PartnersSection from '@/components/PartnersSection';
import CertificationsSection from '@/components/CertificationsSection';
import SimpleValuesSection from '@/components/SimpleValuesSection';
import GuaranteesSection from '@/components/GuaranteesSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutPage = () => {
  const { elementRef: heroRef, isInView: heroVisible } = useScrollAnimation();
  const { elementRef: statsRef, isInView: statsVisible } = useScrollAnimation();
  const { elementRef: teamRef, isInView: teamVisible } = useScrollAnimation();

  React.useEffect(() => {
    document.title = "O nas - Profesjonalne szkolenia techniczne | Firma Szkoleniowa";
  }, []);

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
      
      {/* Compact Elegant Hero Section with proper spacing */}
      <section className="relative min-h-[70vh] sm:min-h-[60vh] bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-orange-500/10" />
        <FloatingParticles />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-8 sm:py-12">
          <div 
            ref={heroRef}
            className={`text-center w-full transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex justify-center mb-6 sm:mb-8">
              <AnimatedIcon 
                type="heart" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 aspect-square flex-shrink-0 transform hover:scale-110 transition-transform duration-300" 
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight text-white">
              O nas
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-orange-50 font-medium px-4">
              Budujemy bezpieczeństwo poprzez wiedzę
            </p>
            
            <p className="text-sm sm:text-base mb-4 sm:mb-6 text-orange-100 max-w-2xl mx-auto leading-relaxed px-4">
              Jesteśmy liderem w dziedzinie szkoleń technicznych. 
              Przez 15 lat pomagamy firmom rozwijać kompetencje swoich pracowników.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-4xl mx-auto px-4">
              {achievements.map((stat, index) => (
                <div key={index} className="bg-white/15 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1">
                    <AnimatedCounter 
                      endValue={stat.value} 
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </div>
                  <div className="text-orange-100 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center px-4">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                <Link to="/bezplatny-audyt">
                  <Shield className="mr-2 h-4 w-4" />
                  Bezpłatny audyt uprawnień
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Values Section - replaced the complex ValuesJourneySection */}
      <SimpleValuesSection />

      {/* Certifications Section - new trust factor */}
      <CertificationsSection />

      {/* Enhanced Testimonials Section */}
      <EnhancedTestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Guarantees Section - new trust factor */}
      <GuaranteesSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Enhanced Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Nasz zespół
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
              Praktycy z pasją do nauczania
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Nasz zespół to doświadczeni specjaliści, którzy łączą wiedzę teoretyczną z praktyką przemysłową
            </p>
          </div>

          <div 
            ref={teamRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 ${
              teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4 sm:mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-20 sm:w-24 h-20 sm:h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3 text-sm sm:text-base">{member.role}</p>
                  
                  <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{member.experience} doświadczenia</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <FloatingParticles />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Nasze osiągnięcia w liczbach
            </h2>
            <p className="text-lg sm:text-xl text-orange-50 max-w-3xl mx-auto">
              Każda liczba to historia sukcesu naszych klientów i ich pracowników
            </p>
          </div>

          <div 
            ref={statsRef}
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 transition-all duration-1000 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {achievements.map((stat, index) => (
              <div 
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                  <AnimatedCounter 
                    endValue={stat.value} 
                    suffix={stat.suffix}
                    duration={2500}
                    className="text-white"
                  />
                </div>
                <p className="text-orange-100 text-sm sm:text-lg font-medium">{stat.label}</p>
                
                <div className="mt-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 relative">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 64 64">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
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
