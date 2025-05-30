
import React from 'react';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const SitemapPage = () => {
  const mainPages = [
    { title: 'Strona główna', href: '/', description: 'Główna strona Well-Done.pl' },
    { title: 'O nas', href: '/o-nas', description: 'Informacje o firmie i zespole' },
    { title: 'Usługi', href: '/uslugi', description: 'Pełna oferta szkoleń i usług' },
    { title: 'Kontakt', href: '/kontakt', description: 'Dane kontaktowe i formularz' },
    { title: 'Bezpłatny audyt', href: '/bezplatny-audyt', description: 'Darmowa analiza potrzeb szkoleniowych' },
    { title: 'Błyskawiczna wycena', href: '/wycena', description: 'Szybka wycena szkoleń online' },
  ];

  const services = [
    { title: 'Uprawnienia UDT dla operatorów', href: '/uslugi/udt-operatorzy', description: 'Szkolenia operatorów urządzeń transportu bliskiego' },
    { title: 'Szkolenia UDT', href: '/udt-szkolenia', description: 'Kompleksowe szkolenia UDT - wózki, podesty, suwnice' },
    { title: 'Uprawnienia UDT dla konserwatorów', href: '/udt-konserwatorze', description: 'Szkolenia konserwatorów urządzeń UDT' },
    { title: 'Uprawnienia SEP', href: '/sep', description: 'Szkolenia elektryczne SEP' },
    { title: 'Szkolenia z lutowania', href: '/lutowanie', description: 'Profesjonalne szkolenia lutowania' },
    { title: 'Eventy edukacyjne', href: '/eventy', description: 'Wydarzenia i konferencje branżowe' },
    { title: 'Szkolenie wózki unoszące', href: '/szkolenie-wozki-unoszace', description: 'Specjalistyczne szkolenia wózków unoszących' },
  ];

  const additionalPages = [
    { title: 'Polityka prywatności', href: '/polityka-prywatnosci', description: 'Zasady przetwarzania danych osobowych' },
    { title: 'Regulamin', href: '/regulamin', description: 'Warunki korzystania z usług' },
    { title: 'Mapa strony', href: '/mapa-strony', description: 'Struktura i nawigacja po stronie' },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mapa Strony</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Główne strony */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Główne strony</h2>
                <div className="space-y-4">
                  {mainPages.map((page) => (
                    <div key={page.href} className="border-l-4 border-orange-400 pl-4">
                      <Link 
                        to={page.href} 
                        className="text-lg font-medium text-orange-600 hover:text-orange-700 block"
                      >
                        {page.title}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usługi */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Usługi szkoleniowe</h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.href} className="border-l-4 border-blue-400 pl-4">
                      <Link 
                        to={service.href} 
                        className="text-lg font-medium text-blue-600 hover:text-blue-700 block"
                      >
                        {service.title}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dodatkowe strony */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informacje prawne</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {additionalPages.map((page) => (
                  <div key={page.href} className="border-l-4 border-gray-400 pl-4">
                    <Link 
                      to={page.href} 
                      className="text-lg font-medium text-gray-700 hover:text-gray-900 block"
                    >
                      {page.title}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kontakt */}
            <div className="mt-12 p-6 bg-orange-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Kontakt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-800">Centrum Kompetencji Zawodowych</p>
                  <p className="text-gray-700">Well-Done.pl Paweł Gerus</p>
                  <p className="text-gray-600">ul. Drzewieckiego 19/11</p>
                  <p className="text-gray-600">54-129 Wrocław</p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Telefon:</span> 504-305-437
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">E-mail:</span> pgerus@well-done.pl
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">NIP:</span> 884-248-74-55
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
