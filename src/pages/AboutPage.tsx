import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, Users, Target, CheckCircle, Award, Briefcase } from 'lucide-react';
import StatItem from '@/components/StatItem';
import Testimonial from '@/components/Testimonial';
import FAQ from '@/components/FAQ';

const AboutPage = () => {
  const stats = [
    { value: "10+", label: "lat doświadczenia" },
    { value: "500+", label: "zadowolonych firm" },
    { value: "1000+", label: "zrealizowanych szkoleń" },
    { value: "80%", label: "zleceń dla produkcji" }
  ];
  
  const teamMembers = [
    {
      name: "Adam Nowak",
      role: "Główny Trener UDT",
      description: "Specjalista z 15-letnim doświadczeniem w szkoleniach operatorów urządzeń transportu bliskiego."
    },
    {
      name: "Marta Kowalska",
      role: "Ekspert ds. Szkoleń SEP",
      description: "Ceryfikowany trener z zakresu uprawnień elektrycznych, cieplnych i gazowych."
    },
    {
      name: "Piotr Wiśniewski",
      role: "Konsultant ds. BHP",
      description: "Doświadczony praktyk z zakresu bezpieczeństwa w zakładach produkcyjnych."
    },
    {
      name: "Anna Jabłońska",
      role: "Koordynator Szkoleń",
      description: "Odpowiada za organizację i sprawny przebieg wszystkich szkoleń i certyfikacji."
    }
  ];
  
  const faqItems = [
    {
      question: "Czym zajmuje się Wasza firma?",
      answer: "Specjalizujemy się w szkoleniach z zakresu BHP, uprawnień UDT (zarówno dla operatorów, jak i konserwatorów), SEP oraz w szkoleniach specjalistycznych, takich jak spawalnicze i na wózki unoszące. Nasze usługi są skierowane głównie do dużych firm produkcyjnych, które potrzebują regularnych szkoleń dla swoich pracowników."
    },
    {
      question: "Do kogo skierowane są Wasze usługi?",
      answer: "Nasze usługi są dedykowane głównie dla dużych firm produkcyjnych, które chcą podnosić kompetencje swoich pracowników oraz zapewnić im wymagane uprawnienia do obsługi specjalistycznego sprzętu."
    },
    {
      question: "Co wyróżnia Waszą firmę na rynku?",
      answer: "Wyróżnia nas elastyczność oraz głęboka znajomość specyfiki branży produkcyjnej. Oferujemy szkolenia dostosowane do harmonogramu firm oraz możliwość realizacji szkoleń w formie stacjonarnej, online i hybrydowej. Dodatkowo, zapewniamy bezpłatny audyt, który pozwala na optymalizację kosztów szkoleń w firmach."
    },
    {
      question: "Jak wygląda proces współpracy?",
      answer: "Proces współpracy jest uzależniony od sytuacji klienta. Jeśli klient wie jakiego typu rozwiązań potrzebuje, dostaraczmy błyskawiczną wycenę która pozwala mu zrozumieć pełny koszt współpracy. Natomiast dla firm które potrzebują kompleksowego wsparcia i identyfikacji możliwych sposobów optymalizacji kosztów szkoleń rekomendujemy rozpoczęcie od audytu, który pozwala nam na zrozumienie potrzeb szkoleniowych firmy."
    },
    {
      question: "Jakie doświadczenie posiada Wasz zespół?",
      answer: "Nasz zespół składa się z doświadczonych trenerów, którzy od lat specjalizują się w szkoleniach dla sektora produkcyjnego. Każdy z naszych specjalistów posiada odpowiednie certyfikaty oraz praktyczne doświadczenie, co gwarantuje wysoką jakość szkoleń."
    }
  ];

  return (
    <div>
      {/* Hero Section with blurred background image */}
      <section className="relative py-16 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/public/lovable-uploads/e53f9387-8eab-484e-95d8-dae5efb914a0.png" 
            alt="Szkolenie w fabryce" 
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">O Nas</h1>
            <p className="text-xl max-w-3xl mx-auto text-white">
              Poznaj firmę, która od lat wspiera przedsiębiorstwa produkcyjne w podnoszeniu kwalifikacji pracowników i zapewnianiu zgodności z wymogami prawnymi.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Czym się zajmujemy i do kogo skierowana jest nasza usługa</h2>
              <p className="text-gray-600 mb-6">
                Firma specjalizuje się w szkoleniach z zakresu BHP oraz uzyskiwania uprawnień UDT (operatorzy i konserwatorzy), SEP, a także szkoleniach specjalistycznych, takich jak spawalnicze oraz na wózki unoszące. Usługi te są skierowane głównie do dużych firm produkcyjnych (powyżej 500 pracowników), które potrzebują regularnych szkoleń dla swoich pracowników oraz zapewnienia uprawnień do obsługi nowego i używanego sprzętu.
              </p>
              <p className="text-gray-600 mb-6">
                Naszym celem jest pokazanie, że firma posiada dogłębną wiedzę na temat specyficznych potrzeb firm produkcyjnych, co stanowi jedną z głównych przewag konkurencyjnych.
              </p>
              <Button asChild>
                <Link to="/uslugi">
                  Zobacz nasze usługi
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="Szkolenie pracowników w fabryce" 
                className="w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Advantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Na co stawiamy i co nas wyróżnia</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wyróżniamy się elastycznością i zdolnością adaptacji do potrzeb klienta. Oferujemy szkolenia dostosowane do harmonogramu firm, możliwość szkoleń stacjonarnych, online oraz hybrydowych.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Elastyczność</h3>
              <p className="text-gray-600">
                Dostosowujemy terminy i formę szkoleń do indywidualnych potrzeb i harmonogramu Twojej firmy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Specjalizacja</h3>
              <p className="text-gray-600">
                Specjalizujemy się wyłącznie we współpracy z firmami produkcyjnymi, co pozwala nam lepiej rozumieć ich wyzwania i potrzeby.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Bezpłatny audyt</h3>
              <p className="text-gray-600">
                Oferujemy bezpłatny audyt, który pozwala firmom ocenić, czy aktualnie przepłacają za szkolenia i uprawnienia pracowników.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Kompleksowa obsługa</h3>
              <p className="text-gray-600">
                Zapewniamy pełną obsługę – od organizacji szkoleń, po finalne uzyskanie uprawnień przez pracowników.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Doświadczenie</h3>
              <p className="text-gray-600">
                Posiadamy wieloletnie doświadczenie w branży szkoleniowej i certyfikacyjnej.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Briefcase size={40} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Różnorodność szkoleń</h3>
              <p className="text-gray-600">
                Oferujemy szeroki zakres szkoleń – od UDT, przez SEP, po szkolenia specjalistyczne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/public/lovable-uploads/f9dc5911-3540-4c1c-91a0-f031a4e94698.png" 
                alt="Buyer persona" 
                className="w-full h-auto rounded-lg shadow-xl" 
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Jak działamy</h2>
              <p className="text-gray-600 mb-6">
                Nasze działania są dostosowane do indywidualnych potrzeb każdej firmy. Rozpoczynamy od analizy potrzeb szkoleniowych przedsiębiorstwa poprzez oferowany audyt, następnie proponujemy plan szkoleń dostosowany do specyficznych wymagań firmy, zarówno pod kątem terminów, jak i formy (stacjonarne, online, hybrydowe).
              </p>
              <p className="text-gray-600 mb-6">
                Działamy szybko i efektywnie, zapewniając pełną obsługę – od organizacji szkoleń, po finalne uzyskanie uprawnień przez pracowników.
              </p>
              <Button asChild variant="outline">
                <Link to="/bezplatny-audyt">
                  Zamów bezpłatny audyt
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Statystyki</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Liczby, które pokazują skalę naszej działalności i wzmacniają naszą wiarygodność.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nasz Zespół</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz zespół to wykwalifikowani specjaliści, którzy od lat wspierają firmy produkcyjne w podnoszeniu kompetencji ich pracowników.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nasi klienci i opinie</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Współpracujemy z czołowymi firmami produkcyjnymi na polskim rynku. Poznaj opinie naszych klientów.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="Dzięki współpracy z firmą, nasi pracownicy uzyskali certyfikaty UDT, co pozwoliło nam na podniesienie standardów bezpieczeństwa w firmie."
              author="Jan Kowalski"
              role="Specjalista BHP"
              company="Firma X"
            />
            <Testimonial
              quote="Profesjonalne szkolenia, które dostosowali do naszych potrzeb. Współpraca była szybka i bezproblemowa."
              author="Anna Nowak"
              role="HR Manager"
              company="Firma Y"
            />
            <Testimonial
              quote="Bezpłatny audyt pomógł nam zoptymalizować proces szkoleniowy, co przełożyło się na realne oszczędności."
              author="Piotr Wiśniewski"
              role="Dyrektor Operacyjny"
              company="Firma Z"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Gotowy, aby rozpocząć współpracę?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Skontaktuj się z nami już dziś, aby omówić potrzeby szkoleniowe Twojej firmy i uzyskać indywidualną ofertę.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/kontakt">Skontaktuj się z nami</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-blue-700">
              <Link to="/wycena">Błyskawiczna Wycena</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={faqItems} />
    </div>
  );
};

export default AboutPage;
