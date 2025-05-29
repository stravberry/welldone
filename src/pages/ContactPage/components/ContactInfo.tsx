
import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactForm from '@/components/ContactForm';

const ContactInfo = () => {
  const { elementRef: formRef, isInView: formInView } = useScrollAnimation<HTMLDivElement>();

  return (
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
  );
};

export default ContactInfo;
