import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Clock, Users, CheckCircle, ArrowRight, Truck, Settings, HardHat, Shield, Headphones, Zap } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from '@/components/Navbar';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import CourseCard, { Course } from '@/components/CourseCard';

const UdtOperatorzyPage = () => {
  const courses = [
    {
      title: "Wózki widłowe",
      description: "Szkolenie na uprawnienia do obsługi wózków widłowych wszystkich typów",
      duration: "16 godzin",
      groupSize: "do 6 osób",
      price: "od 450 zł",
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      image: "/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png",
      alt: "Wózek widłowy w magazynie",
      features: [
        "Teoria i praktyka",
        "Egzamin UDT",
        "Certyfikat uprawień",
        "Materiały szkoleniowe",
        "Wsparcie instruktora"
      ]
    },
    {
      title: "Podesty ruchome",
      description: "Kurs operatora podestów ruchomych i platform roboczych",
      duration: "16 godzin", 
      groupSize: "do 6 osób",
      price: "od 500 zł",
      icon: <Settings className="h-8 w-8 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      alt: "Podest ruchomy nożycowy na budowie",
      features: [
        "Teoria i praktyka",
        "Egzamin UDT",
        "Certyfikat uprawień",
        "Materiały szkoleniowe",
        "Wsparcie instruktora"
      ]
    },
    {
      title: "Suwnice i żurawie",
      description: "Szkolenie operatorów suwnic i żurawi stacjonarnych",
      duration: "24 godziny",
      groupSize: "do 8 osób",
      price: "od 650 zł", 
      icon: <HardHat className="h-8 w-8 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      alt: "Suwnica przemysłowa w hali produkcyjnej",
      features: [
        "Teoria i praktyka",
        "Egzamin UDT",
        "Certyfikat uprawień",
        "Materiały szkoleniowe",
        "Wsparcie instruktora"
      ]
    },
    {
      title: "Układnice magazynowe",
      description: "Uprawnienia do obsługi układnic teleskopowych i magazynowych",
      duration: "16 godzin",
      groupSize: "do 6 osób",
      price: "od 480 zł",
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      alt: "Układnica magazynowa w akcji",
      features: [
        "Teoria i praktyka",
        "Egzamin UDT",
        "Certyfikat uprawień",
        "Materiały szkoleniowe",
        "Wsparcie instruktora"
      ]
    }
  ];

  const benefits = [
    {
      title: "96% zdawalność",
      description: "Nasi kursanci osiągają najwyższe wyniki zdawalności egzaminów w regionie",
      icon: <Award className="h-6 w-6 text-white" />
    },
    {
      title: "Doświadczeni instruktorzy",
      description: "Nasz zespół to praktycy z wieloletnim doświadczeniem w branży",
      icon: <Users className="h-6 w-6 text-white" />
    },
    {
      title: "Nowoczesny sprzęt",
      description: "Szkolimy na najnowszych maszynach dostępnych na rynku",
      icon: <Settings className="h-6 w-6 text-white" />
    },
    {
      title: "Małe grupy",
      description: "Maksymalnie 6-8 osób w grupie zapewnia indywidualne podejście",
      icon: <Shield className="h-6 w-6 text-white" />
    },
    {
      title: "Wsparcie po kursie",
      description: "Oferujemy pomoc i doradztwo nawet po zakończeniu szkolenia",
      icon: <Headphones className="h-6 w-6 text-white" />
    },
    {
      title: "Szybka realizacja",
      description: "Elastyczne terminy dostosowane do potrzeb Twojej firmy",
      icon: <Zap className="h-6 w-6 text-white" />
    }
  ];

  const faqItems = [
    {
      question: "Jak długo trwa szkolenie na uprawnienia UDT?",
      answer: "Czas trwania zależy od rodzaju urządzenia. Szkolenia na wózki widłowe i podesty ruchome trwają 16 godzin, a na suwnice 24 godziny. Szkolenia można realizować w formie stacjonarnej lub weekendowej."
    },
    {
      question: "Czy mogę uczestniczyć w szkoleniu bez doświadczenia?",
      answer: "Tak, nasze szkolenia są skierowane zarówno do osób bez doświadczenia, jak i tych, które chcą podnieść swoje kwalifikacje. Zapewniamy kompleksowe przygotowanie od podstaw."
    },
    {
      question: "Jak wygląda egzamin UDT?",
      answer: "Egzamin składa się z części teoretycznej (test) oraz praktycznej (obsługa maszyny). Nasi instruktorzy dokładnie przygotowują do obu części, dlatego osiągamy 96% zdawalność."
    },
    {
      question: "Czy uprawnienia są ważne w całej Polsce?",
      answer: "Tak, uprawnienia UDT wydane przez Urząd Dozoru Technicznego są ważne na terenie całego kraju i uznawane przez wszystkich pracodawców."
    },
    {
      question: "Co się dzieje, jeśli nie zdam egzaminu za pierwszym razem?",
      answer: "Oferujemy bezpłatny dodatkowy termin egzaminu oraz wsparcie instruktora w przygotowaniu. Zależy nam na sukcesie każdego kursanta."
    },
    {
      question: "Ile kosztuje szkolenie UDT?",
      answer: "Ceny zaczynają się od 450 zł za kurs na wózki widłowe. Oferujemy atrakcyjne rabaty dla grup oraz firm. Skontaktuj się z nami po szczegółową wycenę."
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
        {/* Breadcrumbs */}
        <section className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Strona główna</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/uslugi">Usługi</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>UDT Operatorzy</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-6">
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                    Certyfikowane szkolenia UDT
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
                    <Link to="/wycena" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Otrzymaj Wycenę</Link>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <CourseCard
                  key={index}
                  course={course}
                  index={index}
                  enrollLink="/wycena"
                  detailsLink="/kontakt"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Dlaczego warto wybrać nasze szkolenia?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Jesteśmy liderem w szkoleniach UDT z wieloletnim doświadczeniem i najwyższą jakością
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
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
                <Link to="/wycena" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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

        {/* Contact Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Zapisz się na szkolenie</h2>
              <p className="text-xl text-gray-600">
                Gotowy na nowe możliwości? Skontaktuj się z nami już dziś!
              </p>
            </div>
            <ContactForm 
              title="Wyślij zapytanie o szkolenie UDT"
              subtitle="Wypełnij formularz, a nasz doradca skontaktuje się z Tobą w ciągu 24 godzin"
              initialMessage="Jestem zainteresowany/a szkoleniem UDT dla operatorów. Proszę o kontakt w sprawie szczegółów."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UdtOperatorzyPage;
