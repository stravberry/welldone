
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FAQ from '@/components/FAQ';
import EnhancedTestimonialsSection from '@/components/EnhancedTestimonialsSection';
import AnimatedAdvantagesSection from '@/components/AnimatedAdvantagesSection';
import AnimatedProcessSection from '@/components/AnimatedProcessSection';
import AnimatedTeamSection from '@/components/AnimatedTeamSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Well-done.pl - Profesjonalne szkolenia UDT, SEP i techniczne</title>
        <meta name="description" content="Oferujemy kompleksowe szkolenia UDT dla operatorów i konserwatorów, uprawnienia SEP, kursy lutowania oraz eventy edukacyjne. Profesjonalna obsługa i najwyższa jakość szkoleń." />
        <meta name="keywords" content="szkolenia UDT, uprawnienia SEP, kursy lutowania, szkolenia techniczne, uprawnienia operatorów, konserwatorzy UDT" />
        <link rel="canonical" href="https://well-done.pl/" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section with proper top padding */}
        <section className="pt-16 hero-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20">
              <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Profesjonalne{" "}
                  <span className="text-gradient-orange block sm:inline">
                    Szkolenia Techniczne
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto lg:mx-0">
                  Zdobądź uprawnienia UDT, SEP i inne certyfikaty techniczne. 
                  Kompleksowe szkolenia z doświadczonymi instruktorami.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="/bezplatny-audyt" 
                    className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Bezpłatny Audyt
                  </a>
                  <a 
                    href="/uslugi" 
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
                  >
                    Nasze Usługi
                  </a>
                </div>
              </div>
              
              <div className="flex-1 max-w-lg">
                <img 
                  src="/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png"
                  alt="Profesjonalne szkolenia techniczne"
                  className="w-full h-auto animate-enhanced-float"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Nasze Główne Usługi
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Oferujemy szeroki zakres szkoleń technicznych dostosowanych do potrzeb Twojej firmy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Uprawnienia UDT",
                  description: "Szkolenia dla operatorów i konserwatorów urządzeń technicznych",
                  icon: "🏗️",
                  href: "/uslugi/udt-operatorzy"
                },
                {
                  title: "Uprawnienia SEP", 
                  description: "Kwalifikacje w zakresie eksploatacji urządzeń elektrycznych",
                  icon: "⚡",
                  href: "/sep"
                },
                {
                  title: "Szkolenia Lutowanie",
                  description: "Profesjonalne kursy lutowania dla różnych branż",
                  icon: "🔧",
                  href: "/lutowanie"
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 card-hover">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <a 
                    href={service.href}
                    className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                  >
                    Dowiedz się więcej →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AnimatedAdvantagesSection />
        <AnimatedProcessSection />
        <WhyChooseUsSection />
        <EnhancedTestimonialsSection />
        <AnimatedTeamSection />
        <PartnersSection />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
