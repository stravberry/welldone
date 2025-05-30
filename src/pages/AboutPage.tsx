
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Users, Target, Building, CheckCircle, Clock } from 'lucide-react';
import AnimatedProcessSection from '@/components/AnimatedProcessSection';
import ContactForm from '@/components/ContactForm';

const AboutPage = () => {
  const values = [
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Elastyczność",
      description: "Dostosowujemy się do potrzeb i harmonogramu Twojej firmy",
      bgColor: "bg-blue-500"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Specjalizacja",
      description: "Koncentrujemy się wyłącznie na branży produkcyjnej",
      bgColor: "bg-purple-500"
    },
    {
      icon: <Target className="h-8 w-8 text-white" />,
      title: "Bezpłatny audyt",
      description: "Sprawdzimy stan uprawnień Twoich pracowników za darmo",
      bgColor: "bg-green-500"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: "Kompleksowa obsługa",
      description: "Zajmiemy się wszystkim - od zapisów po certyfikaty",
      bgColor: "bg-orange-500"
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Doświadczenie",
      description: "Ponad 10 lat doświadczenia w szkoleniach przemysłowych",
      bgColor: "bg-red-500"
    },
    {
      icon: <Building className="h-8 w-8 text-white" />,
      title: "Różnorodność szkoleń",
      description: "Szeroka oferta kursów i certyfikacji branżowych",
      bgColor: "bg-blue-600"
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            O Nas
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Jesteśmy firmą specjalizującą się w dostarczaniu najwyższej jakości szkoleń 
            dla sektora produkcyjnego. Pomagamy firmom w osiąganiu zgodności z przepisami 
            oraz podnoszeniu kwalifikacji ich pracowników poprzez profesjonalne szkolenia 
            UDT i SEP.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
                Czym się zajmujemy
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Specjalizujemy się w organizacji szkoleń i kursów dla firm produkcyjnych. 
                Naszą misją jest zapewnienie, że Twoi pracownicy posiadają wszystkie 
                niezbędne uprawnienia do bezpiecznego i skutecznego wykonywania swoich obowiązków.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Oferujemy kompleksową obsługę - od analizy potrzeb szkoleniowych, 
                przez organizację kursów, aż po uzyskanie certyfikatów. Dzięki naszemu 
                doświadczeniu i profesjonalizmowi, możesz być pewny, że Twoja firma 
                spełnia wszystkie wymagania prawne.
              </p>
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link to="/uslugi">Poznaj nasze usługi</Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80" 
                alt="Magazyn przemysłowy z wózkami widłowymi" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Na co stawiamy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nasze wartości definiują sposób, w jaki pracujemy z klientami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${value.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Process Section */}
      <AnimatedProcessSection />

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm 
            title="Skontaktuj się z nami"
            subtitle="Masz pytania o nasze usługi? Wypełnij formularz poniżej, a nasz zespół skontaktuje się z Tobą w ciągu 24 godzin."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
