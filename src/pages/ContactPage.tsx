import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, Shield, Users, Award, Zap, CheckCircle, Star, MessageCircle, Calendar, FileText, Headphones, Trophy, Building2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: formRef, isInView: formInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: advantagesRef, isInView: advantagesInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: servicesRef, isInView: servicesInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: mapRef, isInView: mapInView } = useScrollAnimation<HTMLDivElement>();

  const advantages = [
    {
      icon: Award,
      title: "15+ lat doświadczenia",
      description: "Jesteśmy liderem w branży szkoleń technicznych z wieloletnim doświadczeniem."
    },
    {
      icon: Users,
      title: "Ponad 5000 przeszkolonych",
      description: "Tysiące zadowolonych kursantów, którzy zdobyli uprawnienia dzięki nam."
    },
    {
      icon: Shield,
      title: "Najwyższa jakość",
      description: "Certyfikowane szkolenia zgodne z najwyższymi standardami UDT."
    },
    {
      icon: Zap,
      title: "Szybka realizacja",
      description: "Elastyczne terminy szkoleń dostosowane do potrzeb Twojej firmy."
    }
  ];

  const services = [
    {
      icon: MessageCircle,
      title: "Darmowa konsultacja i doradztwo",
      description: "Profesjonalne doradztwo w wyborze odpowiednich szkoleń dla Twojej firmy",
      highlight: "Bez zobowiązań"
    },
    {
      icon: Building2,
      title: "Szkolenia w siedzibie klienta",
      description: "Przeprowadzamy szkolenia bezpośrednio w Państwa firmie",
      highlight: "Na miejscu"
    },
    {
      icon: Clock,
      title: "Elastyczne terminy realizacji",
      description: "Dostosowujemy harmonogram szkoleń do potrzeb Twojej organizacji",
      highlight: "7 dni w tygodniu"
    },
    {
      icon: FileText,
      title: "Kompleksowa obsługa dokumentacji",
      description: "Zajmujemy się całą procedurą uzyskania uprawnień UDT",
      highlight: "Od A do Z"
    },
    {
      icon: Headphones,
      title: "Wsparcie po ukończeniu kursu",
      description: "Oferujemy ciągłe wsparcie techniczne i merytoryczne",
      highlight: "Przez 12 miesięcy"
    },
    {
      icon: Trophy,
      title: "Najwyższa zdawalność egzaminów",
      description: "Nasze metody szkoleniowe gwarantują sukces w egzaminach UDT",
      highlight: "95% zdawalność"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 relative overflow-hidden transition-all duration-800 ${
          heroInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center transition-all duration-800 delay-200 ${
            heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Skontaktuj się z nami</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Masz pytania dotyczące naszych szkoleń? Potrzebujesz indywidualnej wyceny? 
              Jesteśmy do Twojej dyspozycji!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Information Section */}
      <section 
        ref={formRef}
        className={`py-20 bg-white transition-all duration-800 ${
          formInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information - Left Side */}
            <div className={`transition-all duration-800 delay-200 ${
              formInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h2 className="text-3xl font-bold mb-6">Dane kontaktowe</h2>
              <p className="text-gray-600 mb-8">
                Jesteśmy dostępni, aby odpowiedzieć na wszystkie Twoje pytania dotyczące szkoleń, 
                certyfikacji i innych usług. Skontaktuj się z nami w dogodny dla Ciebie sposób.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                    <Phone size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Telefon</h3>
                    <p className="text-gray-700 text-lg font-medium">504-305-437</p>
                    <p className="text-sm text-gray-500">Pon-Pt: 8:00-16:00</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                    <Mail size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-700 text-lg font-medium">pgerus@well-done.pl</p>
                    <p className="text-sm text-gray-500">Odpowiadamy w ciągu 24h</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                    <MapPin size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Adres</h3>
                    <p className="text-gray-700">ul. Drzewieckiego 19/11</p>
                    <p className="text-gray-700">54-129 Wrocław</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                    <Clock size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Godziny pracy</h3>
                    <p className="text-gray-700">Pon-Pt: 8:00-16:00</p>
                    <p className="text-gray-700">Sob-Nie: Zamknięte</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 mb-2">
                  Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus
                </p>
                <p className="text-sm text-gray-500 mb-6">NIP: 884-248-74-55 | REGON: 022303775</p>
                
                <h3 className="font-semibold text-lg mb-4">Obserwuj nas</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: "https://facebook.com" },
                    { icon: Instagram, href: "https://instagram.com" },
                    { icon: Linkedin, href: "https://linkedin.com" },
                    { icon: Youtube, href: "https://youtube.com" }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gray-100 p-3 rounded-full hover:bg-orange-100 hover:scale-110 transition-all duration-300 group"
                    >
                      <social.icon size={20} className="text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className={`transition-all duration-800 delay-400 ${
              formInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <ContactForm 
                title="Napisz do nas"
                subtitle="Wypełnij formularz poniżej, a nasz zespół skontaktuje się z Tobą w ciągu 24 godzin."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <section 
        ref={servicesRef}
        className={`py-20 bg-gray-50 transition-all duration-800 ${
          servicesInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-800 delay-200 ${
            servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Standardy naszej obsługi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Profesjonalne podejście do każdego etapu współpracy - od pierwszego kontaktu po wsparcie poszkoleniowe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-white ${
                  servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors duration-300 flex-shrink-0">
                      <service.icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-2">
                        {service.title}
                      </h3>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium inline-block mb-3">
                        {service.highlight}
                      </span>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className={`mt-12 text-center transition-all duration-800 delay-800 ${
            servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white p-6 rounded-lg shadow-md inline-block">
              <p className="text-gray-700 font-medium mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 inline mr-2" />
                Gwarancja jakości potwierdzona certyfikatami i referencjami
              </p>
              <p className="text-sm text-gray-500">
                Wszystkie nasze usługi są objęte gwarancją satysfakcji klienta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section 
        ref={advantagesRef}
        className={`py-20 bg-white transition-all duration-800 ${
          advantagesInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-800 delay-200 ${
            advantagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dlaczego warto wybrać nas?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wybierając nasze szkolenia, inwestujesz w sprawdzoną jakość i profesjonalizm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-500 hover:scale-105 ${
                  advantagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className={`mt-16 bg-white rounded-lg p-8 shadow-md transition-all duration-800 delay-600 ${
            advantagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-2xl font-bold text-center mb-8">Co oferujemy?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/*{features.map((feature, index) => (*/}
              {/*  <div key={index} className="flex items-center space-x-3">*/}
              {/*    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />*/}
              {/*    <span className="text-gray-700">{feature}</span>*/}
              {/*  </div>*/}
              {/*))}*/}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        ref={mapRef}
        className={`py-20 bg-gray-50 transition-all duration-800 ${
          mapInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transition-all duration-800 delay-200 ${
            mapInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold mb-4">Nasza lokalizacja</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Znajdź nas na mapie. Nasza siedziba znajduje się we Wrocławiu, 
              z dogodnym dojazdem komunikacją miejską i samochodem.
            </p>
          </div>
          <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-800 delay-400 ${
            mapInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-200 to-gray-300 h-96">
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                  <p className="text-lg font-medium">Mapa Google</p>
                  <p className="text-sm">ul. Drzewieckiego 19/11, 54-129 Wrocław</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-yellow-300 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold">Gotowy na współpracę?</h2>
            <Star className="h-8 w-8 text-yellow-300 ml-2" />
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Skorzystaj z naszego formularza błyskawicznej wyceny i otrzymaj 
            szczegółową ofertę dostosowaną do potrzeb Twojej firmy.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Link to="/wycena">Uzyskaj błyskawiczną wycenę</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
