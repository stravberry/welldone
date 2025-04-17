
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Kontakt</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Masz pytania dotyczące naszych szkoleń? Skontaktuj się z nami - jesteśmy do Twojej dyspozycji.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Skontaktuj się z nami</h2>
              <p className="text-gray-600 mb-8">
                Jesteśmy dostępni, aby odpowiedzieć na wszystkie Twoje pytania dotyczące szkoleń, certyfikacji i innych usług. Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Phone size={24} className="text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                    <p>+48 123 456 789</p>
                    <p>+48 987 654 321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={24} className="text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p>kontakt@udt-sep-szkolenia.pl</p>
                    <p>szkolenia@udt-sep-szkolenia.pl</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={24} className="text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adres</h3>
                    <p>ul. Przemysłowa 1</p>
                    <p>00-001 Warszawa</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={24} className="text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Godziny pracy</h3>
                    <p>Poniedziałek - Piątek: 8:00 - 16:00</p>
                    <p>Sobota - Niedziela: Zamknięte</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Obserwuj nas</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-blue-50 transition-colors">
                    <Facebook size={20} className="text-blue-600" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-blue-50 transition-colors">
                    <Instagram size={20} className="text-blue-600" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-blue-50 transition-colors">
                    <Linkedin size={20} className="text-blue-600" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-blue-50 transition-colors">
                    <Youtube size={20} className="text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Nasza lokalizacja</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Znajdź nas na mapie. Nasza siedziba znajduje się w centrum Warszawy, z dogodnym dojazdem komunikacją miejską i samochodem.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                <p className="text-center p-4">Mapa z lokalizacją</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Potrzebujesz szybkiej wyceny?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Skorzystaj z naszego formularza błyskawicznej wyceny i otrzymaj szczegółową ofertę dostosowaną do potrzeb Twojej firmy.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/wycena">Uzyskaj błyskawiczną wycenę</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
