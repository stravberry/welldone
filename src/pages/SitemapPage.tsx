
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Briefcase, FileText, Phone, Award, BookOpen, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SitemapPage = () => {
  const siteStructure = [
    {
      title: "Strona główna",
      icon: <Home className="h-5 w-5" />,
      link: "/",
      description: "Główna strona prezentująca nasze usługi i ofertę"
    },
    {
      title: "O nas",
      icon: <Users className="h-5 w-5" />,
      link: "/o-nas",
      description: "Poznaj naszą historię, misję i zespół ekspertów"
    },
    {
      title: "Usługi",
      icon: <Briefcase className="h-5 w-5" />,
      link: "/uslugi",
      description: "Kompletna oferta szkoleń i certyfikacji",
      children: [
        { title: "UDT Operatorzy", link: "/uslugi/udt-operatorzy", description: "Szkolenia dla operatorów urządzeń transportu bliskiego" },
        { title: "UDT Konserwatorzy", link: "/udt-konserwatorze", description: "Kursy dla konserwatorów suwnic i żurawi" },
        { title: "Uprawnienia SEP", link: "/sep", description: "Certyfikacja elektryczna, cieplna i gazowa" },
        { title: "Szkolenia z lutowania", link: "/lutowanie", description: "Profesjonalne kursy lutowania dla firm" },
        { title: "Eventy edukacyjne", link: "/eventy", description: "Wydarzenia zwiększające świadomość BHP" },
        { title: "Wózki unoszące", link: "/szkolenie-wozki-unoszace", description: "Specjalistyczne szkolenia na wózki unoszące" }
      ]
    },
    {
      title: "Realizacje",
      icon: <Award className="h-5 w-5" />,
      link: "/realizacje",
      description: "Przykłady naszych udanych projektów i osiągnięć"
    },
    {
      title: "Wiedza",
      icon: <BookOpen className="h-5 w-5" />,
      link: "/wiedza",
      description: "Artykuły, poradniki i materiały edukacyjne"
    },
    {
      title: "Bezpłatny audyt",
      icon: <Calendar className="h-5 w-5" />,
      link: "/bezplatny-audyt",
      description: "Skorzystaj z bezpłatnej analizy potrzeb szkoleniowych"
    },
    {
      title: "Wycena",
      icon: <FileText className="h-5 w-5" />,
      link: "/wycena",
      description: "Uzyskaj błyskawiczną wycenę na nasze usługi"
    },
    {
      title: "Kontakt",
      icon: <Phone className="h-5 w-5" />,
      link: "/kontakt",
      description: "Skontaktuj się z nami - dane kontaktowe i formularz"
    }
  ];

  const legalPages = [
    { title: "Polityka prywatności", link: "/polityka-prywatnosci" },
    { title: "Regulamin", link: "/regulamin" }
  ];

  return (
    <div>
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Mapa strony
              </h1>
              <p className="text-xl text-orange-50 leading-relaxed">
                Znajdź wszystkie dostępne sekcje i strony naszego serwisu
              </p>
            </div>
          </div>
        </section>

        {/* Main Sitemap Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
              {siteStructure.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mr-4">
                      {section.icon}
                    </div>
                    <div>
                      <Link 
                        to={section.link} 
                        className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300"
                      >
                        {section.title}
                      </Link>
                      <p className="text-gray-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                  
                  {section.children && (
                    <div className="ml-14 space-y-3">
                      {section.children.map((child, childIndex) => (
                        <div key={childIndex} className="border-l-2 border-orange-200 pl-4">
                          <Link 
                            to={child.link} 
                            className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300"
                          >
                            {child.title}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1">{child.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Pages Section */}
        <section className="py-12 bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Strony prawne</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legalPages.map((page, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Link 
                    to={page.link} 
                    className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300"
                  >
                    {page.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nie znajdziesz tego, czego szukasz?
            </h2>
            <p className="text-gray-600 mb-6">
              Skontaktuj się z nami - chętnie pomożemy!
            </p>
            <Link 
              to="/kontakt" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-300"
            >
              Skontaktuj się z nami
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default SitemapPage;
