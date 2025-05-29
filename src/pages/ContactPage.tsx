import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, Shield, Users, Award, Zap, CheckCircle, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: formRef, isInView: formInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: advantagesRef, isInView: advantagesInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: contactRef, isInView: contactInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: mapRef, isInView: mapInView } = useScrollAnimation<HTMLDivElement>();

  const advantages = [
    {
      icon: Award,
      title: "15+ lat doświadczenia",
      description: "Jesteśmy liderem w branży szkoleń techniczych z wieloletnim doświadczeniem."
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

  const features = [
    "Darmowa konsultacja i doradztwo",
    "Szkolenia w siedzibie klienta",
    "Elastyczne terminy realizacji",
    "Kompleksowa obsługa dokumentacji",
    "Wsparcie po ukończeniu kursu",
    "Najwyższa zdawalność egzaminów"
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

      {/* Contact Form Section - Moved to top */}
      <section 
        ref={formRef}
        className={`py-20 bg-white transition-all duration-800 ${
          formInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-800 delay-200 ${
            formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <ContactForm 
              title="Napisz do nas"
              subtitle="Wypełnij formularz poniżej, a nasz zespół skontaktuje się z Tobą w ciągu 24 godzin."
            />
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section 
        ref={advantagesRef}
        className={`py-20 bg-gray-50 transition-all duration-800 ${
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
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section 
        ref={contactRef}
        className={`py-20 transition-all duration-800 ${
          contactInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            <div className={`transition-all duration-800 delay-200 ${
              contactInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h2 className="text-3xl font-bold mb-6 text-center">Dane kontaktowe</h2>
              <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
                Jesteśmy dostępni, aby odpowiedzieć na wszystkie Twoje pytania dotyczące szkoleń, 
                certyfikacji i innych usług. Skontaktuj się z nami w dogodny dla Ciebie sposób.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="flex flex-col items-center text-center group">
                  <div className="bg-orange-100 p-4 rounded-full group-hover:bg-orange-200 transition-colors duration-300 mb-4">
                    <Phone size={32} className="text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                  <p className="text-gray-700 text-lg font-medium">504-305-437</p>
                  <p className="text-sm text-gray-500">Pon-Pt: 8:00-16:00</p>
                </div>
                
                <div className="flex flex-col items-center text-center group">
                  <div className="bg-orange-100 p-4 rounded-full group-hover:bg-orange-200 transition-colors duration-300 mb-4">
                    <Mail size={32} className="text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-gray-700 text-lg font-medium">pgerus@well-done.pl</p>
                  <p className="text-sm text-gray-500">Odpowiadamy w ciągu 24h</p>
                </div>
                
                <div className="flex flex-col items-center text-center group">
                  <div className="bg-orange-100 p-4 rounded-full group-hover:bg-orange-200 transition-colors duration-300 mb-4">
                    <MapPin size={32} className="text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Adres</h3>
                  <p className="text-gray-700">ul. Drzewieckiego 19/11</p>
                  <p className="text-gray-700">54-129 Wrocław</p>
                </div>
                
                <div className="flex flex-col items-center text-center group">
                  <div className="bg-orange-100 p-4 rounded-full group-hover:bg-orange-200 transition-colors duration-300 mb-4">
                    <Clock size={32} className="text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Godziny pracy</h3>
                  <p className="text-gray-700">Pon-Pt: 8:00-16:00</p>
                  <p className="text-gray-700">Sob-Nie: Zamknięte</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus
                </p>
                <p className="text-sm text-gray-500 mb-6">NIP: 884-248-74-55 | REGON: 022303775</p>
                
                <h3 className="font-semibold text-lg mb-4">Obserwuj nas</h3>
                <div className="flex justify-center space-x-4">
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
