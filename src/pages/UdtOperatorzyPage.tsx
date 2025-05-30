
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
      icon: <Truck className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Podesty ruchome",
      description: "Kurs operatora podestów ruchomych i platform roboczych",
      duration: "16 godzin", 
      price: "od 500 zł",
      icon: <Settings className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Suwnice",
      description: "Szkolenie operatorów suwnic i żurawi stacjonarnych",
      duration: "24 godziny",
      price: "od 650 zł", 
      icon: <HardHat className="h-8 w-8 text-orange-500" />
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
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
          
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

        {/* Courses Section */}
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
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="mb-6">{course.icon}</div>
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
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                    <Link to="/wycena">Zapisz się na kurs</Link>
                  </Button>
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
