import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Clock, Users, CheckCircle, ArrowRight, Truck, Settings, HardHat } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FAQ from '@/components/FAQ';
import BottomQuoteForm from '@/components/BottomQuoteForm';

const UdtOperatorzyPage = () => {
  const courses = [
    {
      title: "Wózki widłowe",
      description: "Szkolenie na uprawnienia do obsługi wózków widłowych wszystkich typów",
      duration: "16 godzin",
      price: "od 450 zł",
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      image: "/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png",
      alt: "Wózek widłowy w magazynie"
    },
    {
      title: "Podesty ruchome",
      description: "Kurs operatora podestów ruchomych i platform roboczych",
      duration: "16 godzin", 
      price: "od 500 zł",
      icon: <Settings className="h-8 w-8 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      alt: "Podest ruchomy nożycowy na budowie"
    },
    {
      title: "Suwnice",
      description: "Szkolenie operatorów suwnic i żurawi stacjonarnych",
      duration: "24 godziny",
      price: "od 650 zł", 
      icon: <HardHat className="h-8 w-8 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      alt: "Suwnica przemysłowa w hali produkcyjnej"
    }
  ];

  const benefits = [
    {
      title: "96% zdawalność egzaminów",
      description: "Nasi kursanci osiągają najwyższe wyniki zdawalności w regionie",
      icon: <Award className="h-6 w-6 text-orange-500" />
    },
    {
      title: "Elastyczne terminy",
      description: "Dostosowujemy harmonogram szkoleń do potrzeb Twojej firmy",
      icon: <Clock className="h-6 w-6 text-orange-500" />
    },
    {
      title: "Doświadczeni instruktorzy",
      description: "Nasz zespół to praktycy z wieloletnim doświadczeniem",
      icon: <Users className="h-6 w-6 text-orange-500" />
    },
    {
      title: "Kompleksowa obsługa",
      description: "Od szkolenia po załatwienie wszystkich formalności",
      icon: <CheckCircle className="h-6 w-6 text-orange-500" />
    }
  ];

  const faqItems = [
    {
      question: "Jak długo trwa szkolenie na uprawnienia UDT?",
      answer: "Czas trwania zależy od rodzaju urządzenia. Szkolenia na wózki widłowe i podesty ruchome trwają 16 godzin, a na suwnice 24 godziny. Szkolenia można realizować w formie stacjonarnej lub weekendowej."
    },
    {
      question: "Jakie dokumenty są potrzebne do zapisania się na kurs?",
      answer: "Potrzebne są: dowód osobisty, zaświadczenie lekarskie o braku przeciwwskazań do pracy na stanowisku operatora oraz wykształcenie minimum podstawowe."
    },
    {
      question: "Czy egzamin jest trudny?",
      answer: "Nasi kursanci osiągają 96% zdawalność dzięki solidnemu przygotowaniu teoretycznemu i praktycznemu. Zapewniamy kompleksowe materiały i indywidualne podejście do każdego uczestnika."
    },
    {
      question: "Ile kosztuje szkolenie UDT?",
      answer: "Ceny zaczynają się od 450 zł za kurs na wózki widłowe. Oferujemy atrakcyjne rabaty dla grup oraz firm. Skontaktuj się z nami po szczegółową wycenę."
    },
    {
      question: "Czy można płacić za szkolenie z funduszy szkoleniowych?",
      answer: "Tak, jesteśmy zarejestrowanym ośrodkiem szkoleniowym i nasze kursy można finansować z różnych źródeł, w tym funduszy szkoleniowych firm czy środków unijnych."
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Szkolenia UDT dla Operatorów - Wózki Widłowe, Podesty, Suwnice | Well-done</title>
        <meta name="description" content="Profesjonalne szkolenia UDT dla operatorów. Kursy na wózki widłowe, podesty ruchome, suwnice. 96% zdawalność. Elastyczne terminy dla firm." />
        <meta name="keywords" content="szkolenia UDT operatorzy, kurs wózki widłowe, podesty ruchome szkolenie, suwnice UDT, uprawnienia operatorów" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section with Background Illustration */}
        <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
          
          {/* Background Forklift and Warehouse Illustration */}
          <div className="absolute -right-32 top-0 bottom-0 flex justify-end items-center transition-all duration-800 opacity-100 translate-x-0">
            <svg
              width="1600"
              height="1600"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-10"
            >
              <g className="text-orange-200">
                {/* Warehouse shelves in background */}
                <rect x="50" y="80" width="8" height="120" fill="currentColor" opacity="0.3"/>
                <rect x="50" y="80" width="40" height="8" fill="currentColor" opacity="0.3"/>
                <rect x="50" y="120" width="40" height="8" fill="currentColor" opacity="0.3"/>
                <rect x="50" y="160" width="40" height="8" fill="currentColor" opacity="0.3"/>
                <rect x="50" y="200" width="40" height="8" fill="currentColor" opacity="0.3"/>
                
                <rect x="70" y="100" width="6" height="15" fill="currentColor" opacity="0.4"/>
                <rect x="78" y="100" width="6" height="15" fill="currentColor" opacity="0.4"/>
                <rect x="70" y="140" width="6" height="15" fill="currentColor" opacity="0.4"/>
                <rect x="78" y="140" width="6" height="15" fill="currentColor" opacity="0.4"/>
                <rect x="70" y="180" width="6" height="15" fill="currentColor" opacity="0.4"/>

                {/* Main forklift body */}
                <rect x="180" y="220" width="80" height="40" rx="4" fill="currentColor" opacity="0.8"/>
                
                {/* Forklift cabin */}
                <rect x="200" y="200" width="40" height="20" rx="2" fill="currentColor" opacity="0.7"/>
                <rect x="210" y="205" width="20" height="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
                
                {/* Operator silhouette */}
                <circle cx="220" cy="208" r="4" fill="currentColor" opacity="0.9"/>
                <rect x="218" y="212" width="4" height="8" fill="currentColor" opacity="0.9"/>
                
                {/* Forklift mast */}
                <rect x="175" y="120" width="6" height="100" fill="currentColor" opacity="0.8"/>
                <rect x="183" y="120" width="6" height="100" fill="currentColor" opacity="0.8"/>
                
                {/* Forklift forks */}
                <rect x="170" y="180" width="25" height="4" fill="currentColor" opacity="0.9"/>
                <rect x="170" y="188" width="25" height="4" fill="currentColor" opacity="0.9"/>
                
                {/* Pallet on forks */}
                <rect x="150" y="170" width="30" height="18" rx="2" fill="currentColor" opacity="0.6"/>
                <rect x="152" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
                <rect x="158" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
                <rect x="164" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
                <rect x="170" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
                <rect x="176" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
                
                {/* Boxes on pallet */}
                <rect x="152" y="165" width="12" height="10" fill="currentColor" opacity="0.7"/>
                <rect x="166" y="165" width="12" height="10" fill="currentColor" opacity="0.7"/>
                
                {/* Forklift wheels */}
                <circle cx="190" cy="268" r="8" fill="currentColor" opacity="0.8"/>
                <circle cx="230" cy="268" r="8" fill="currentColor" opacity="0.8"/>
                <circle cx="250" cy="268" r="6" fill="currentColor" opacity="0.8"/>
                
                {/* Wheel details */}
                <circle cx="190" cy="268" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <circle cx="230" cy="268" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <circle cx="250" cy="268" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                
                {/* Counterweight */}
                <rect x="245" y="235" width="20" height="25" rx="2" fill="currentColor" opacity="0.7"/>
                
                {/* Safety elements */}
                <circle cx="320" cy="120" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                <path d="M320 110 L320 130 M310 120 L330 120" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                
                {/* Warning triangle */}
                <path d="M300 300 L315 280 L330 300 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
                <circle cx="315" cy="290" r="2" fill="currentColor" opacity="0.5"/>
                <path d="M315 285 L315 295" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                
                {/* Movement arrows */}
                <path d="M280 160 Q300 140 320 160" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
                <polygon points="315,158 325,160 315,162" fill="currentColor" opacity="0.4"/>
                
                {/* Additional warehouse elements */}
                <rect x="350" y="200" width="6" height="80" fill="currentColor" opacity="0.3"/>
                <rect x="350" y="200" width="30" height="6" fill="currentColor" opacity="0.3"/>
                <rect x="350" y="230" width="30" height="6" fill="currentColor" opacity="0.3"/>
                <rect x="350" y="260" width="30" height="6" fill="currentColor" opacity="0.3"/>
                
                {/* Ground/floor markings */}
                <path d="M120 280 L380 280" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeDasharray="10,5"/>
                
                {/* Hydraulic lines */}
                <path d="M181 180 Q185 160 181 140" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
                <path d="M187 180 Q191 160 187 140" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
              </g>
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-6">
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                    Uprawnienia UDT
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Szkolenia UDT
                  <span className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
                    dla Operatorów
                  </span>
                </h1>
                <p className="text-xl mb-8 text-orange-50 leading-relaxed">
                  Zdobądź uprawnienia do obsługi wózków widłowych, podestów ruchomych i suwnic. 
                  Profesjonalne szkolenia z 96% zdawalnością egzaminów.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300">
                    <Link to="/wycena">Otrzymaj Wycenę</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-orange-500/20 text-white hover:bg-orange-400/30 border-white/30 hover:border-white/50 backdrop-blur-sm">
                    <Link to="/kontakt">Skontaktuj się</Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">96%</div>
                      <div className="text-orange-100">Zdawalność</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">500+</div>
                      <div className="text-orange-100">Operatorów</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">15</div>
                      <div className="text-orange-100">Lat doświadczenia</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">3</div>
                      <div className="text-orange-100">Dni kursu</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section with Images */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Rodzaje Szkoleń UDT</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferujemy kompleksowe szkolenia na wszystkie popularne urządzenia transportu bliskiego
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.alt} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white p-2 rounded-lg">
                      {course.icon}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                    <p className="text-gray-600 mb-6">{course.description}</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Czas trwania:</span>
                        <span className="font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cena:</span>
                        <span className="font-semibold text-orange-600">{course.price}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200">
                      <Link to="/wycena">Zapisz się na kurs</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Dlaczego Warto Wybrać Nas?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Jesteśmy liderem w szkoleniach UDT z wieloletnim doświadczeniem i najwyższą jakością
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Gotowy na Zdobycie Uprawnień?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Nie czekaj! Zapisz się już dziś na szkolenie UDT i zdobądź uprawnienia, 
              które otworzą przed Tobą nowe możliwości zawodowe.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <Link to="/wycena">
                  Otrzymaj Wycenę
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/kontakt">Zadzwoń do Nas</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ items={faqItems} />

        {/* Bottom Quote Form */}
        <BottomQuoteForm />
      </div>
    </div>
  );
};

export default UdtOperatorzyPage;
