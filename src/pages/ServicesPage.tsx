
import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceCard } from '@/components/ServiceCard';
import { Wrench, Tool, Zap, Flame, Users } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      title: 'Uprawnienia UDT dla operatorów',
      description: 'Profesjonalne szkolenia i certyfikacja dla operatorów urządzeń technicznych pod nadzorem UDT.',
      icon: <Tool className="h-8 w-8" />,
      link: '/uslugi/udt-operatorzy',
      imageSrc: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Uprawnienia UDT dla konserwatorów',
      description: 'Kompleksowe szkolenia dla konserwatorów urządzeń technicznych z certyfikacją UDT.',
      icon: <Wrench className="h-8 w-8" />,
      link: '/uslugi/udt-konserwatorzy',
      imageSrc: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Uprawnienia SEP',
      description: 'Zdobądź uprawnienia elektryczne SEP pod okiem doświadczonych specjalistów.',
      icon: <Zap className="h-8 w-8" />,
      link: '/uslugi/sep',
      imageSrc: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Szkolenia z lutowania',
      description: 'Praktyczne warsztaty z lutowania prowadzone przez ekspertów w dziedzinie.',
      icon: <Flame className="h-8 w-8" />,
      link: '/uslugi/lutowanie',
      imageSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Eventy edukacyjne',
      description: 'Organizujemy profesjonalne wydarzenia edukacyjne i szkoleniowe dla firm.',
      icon: <Users className="h-8 w-8" />,
      link: '/uslugi/eventy',
      imageSrc: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Nasze Usługi
          </h1>
          <p className="mt-4 text-xl text-orange-100">
            Kompleksowe szkolenia i certyfikacje dla profesjonalistów
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link key={service.link} to={service.link} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
                <div className="relative h-48">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-white p-4">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-50 py-16 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nie znalazłeś tego, czego szukasz?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Skontaktuj się z nami, aby omówić spersonalizowane rozwiązanie dla Twojej firmy.
          </p>
          <div className="mt-8">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Skontaktuj się z nami
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
