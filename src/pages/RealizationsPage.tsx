
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import FAQ from '@/components/FAQ';

const RealizationsPage = () => {
  const realizations = [
    {
      title: "Szkolenie z obsługi wózków widłowych dla firmy XYZ",
      description: "Firma XYZ, lider w produkcji komponentów do samochodów, zleciła nam przeszkolenie 100 pracowników z obsługi wózków widłowych. Dzięki naszym szkoleniom udało się zwiększyć efektywność pracy w magazynie o 25%.",
      scope: "UDT – Wózki widłowe",
      effect: "100 przeszkolonych pracowników, certyfikacja w UDT",
      image: "/public/lovable-uploads/2d3fe45c-4078-43ab-b479-ea144210537f.png"
    },
    {
      title: "Szkolenia SEP dla pracowników produkcyjnych firmy ABC",
      description: "Firma ABC, producent urządzeń grzewczych, potrzebowała uprawnień SEP dla swoich pracowników. Przeprowadziliśmy szkolenie SEP dla 50 pracowników, co umożliwiło firmie bezpieczną i zgodną z prawem pracę przy urządzeniach elektrycznych.",
      scope: "SEP – Elektryczne (E1)",
      effect: "50 przeszkolonych pracowników, uzyskane uprawnienia SEP",
      image: ""
    },
    {
      title: "Kompleksowe szkolenia UDT i SEP dla firmy DEF",
      description: "Firma DEF, międzynarodowy producent urządzeń przemysłowych, potrzebowała kompleksowego programu szkoleń dla swoich pracowników. Zrealizowaliśmy program szkoleń obejmujący zarówno uprawnienia UDT, jak i SEP dla ponad 200 pracowników.",
      scope: "UDT – różne kategorie, SEP – E1, E2, E3",
      effect: "200 przeszkolonych pracowników, 100% zdawalność",
      image: ""
    },
    {
      title: "Szkolenia z lutowania dla firmy GHI",
      description: "Firma GHI, producent elektroniki, zleciła nam przeprowadzenie specjalistycznych szkoleń z lutowania dla pracowników produkcji. Szkolenia przyczyniły się do znacznego zmniejszenia liczby wadliwych produktów i redukcji kosztów napraw gwarancyjnych.",
      scope: "Szkolenia z lutowania precyzyjnego",
      effect: "30 przeszkolonych pracowników, redukcja wadliwych produktów o 40%",
      image: ""
    },
    {
      title: "Dzień bezpieczeństwa technicznego dla firmy JKL",
      description: "Firma JKL, producent maszyn przemysłowych, zorganizowała we współpracy z nami Dzień Bezpieczeństwa Technicznego dla swoich pracowników. Wydarzenie obejmowało warsztaty, pokazy i konkursy, które znacząco podniosły świadomość pracowników w zakresie bezpieczeństwa.",
      scope: "Event edukacyjny – Dzień Bezpieczeństwa Technicznego",
      effect: "150 uczestników, wzrost świadomości bezpieczeństwa",
      image: ""
    },
    {
      title: "Audyt szkoleniowy i optymalizacja procesów dla firmy MNO",
      description: "Firma MNO, producent komponentów motoryzacyjnych, zleciła nam przeprowadzenie audytu szkoleniowego. Dzięki naszym rekomendacjom firma zoptymalizowała procesy szkoleniowe i zredukowała koszty o 30% przy jednoczesnym utrzymaniu jakości szkoleń.",
      scope: "Audyt szkoleniowy i optymalizacja procesów",
      effect: "Redukcja kosztów szkoleń o 30%, zwiększenie efektywności",
      image: ""
    }
  ];
  
  const testimonials = [
    {
      quote: "Szkolenia przeprowadzone przez firmę pozwoliły nam na uzyskanie certyfikacji UDT, dzięki czemu poprawiliśmy bezpieczeństwo i wydajność pracy w zakładzie.",
      author: "Jan Kowalski",
      role: "Kierownik Działu Produkcji",
      company: "Firma Produkcyjna XYZ"
    },
    {
      quote: "Bezpłatny audyt pomógł nam zoptymalizować proces szkoleniowy, co przełożyło się na realne oszczędności.",
      author: "Anna Nowak",
      role: "HR Manager",
      company: "ABC Manufacturing"
    },
    {
      quote: "Profesjonalne podejście, elastyczność i doskonała organizacja szkoleń. Nasi pracownicy bardzo docenili praktyczne aspekty szkolenia.",
      author: "Piotr Wiśniewski",
      role: "Specjalista BHP",
      company: "DEF Industries"
    }
  ];
  
  const faqItems = [
    {
      question: "Czy możecie dostosować szkolenia do specyfiki naszej firmy?",
      answer: "Tak, wszystkie nasze szkolenia są indywidualnie dostosowywane do potrzeb i wymagań klienta. Analizujemy specyfikę Twojej firmy, aby zapewnić najbardziej efektywne rozwiązania."
    },
    {
      question: "Jakie korzyści osiągnęły firmy, które skorzystały z Waszych usług?",
      answer: "Firmy, z którymi współpracowaliśmy, zauważyły wzrost kompetencji pracowników, zwiększenie efektywności produkcji oraz poprawę bezpieczeństwa pracy. Dodatkowo, wiele firm zoptymalizowało koszty szkoleń po przeprowadzonym przez nas audycie."
    },
    {
      question: "Czy oferujecie wsparcie po zakończeniu szkolenia?",
      answer: "Tak, po realizacji projektu pozostajemy do dyspozycji naszych klientów, oferując wsparcie i doradztwo w razie potrzeby. Pomagamy również w cyklicznym odnawianiu uprawnień i planowaniu szkoleń przypominających."
    },
    {
      question: "Jak mogę skontaktować się w sprawie realizacji projektu w naszej firmie?",
      answer: "Zapraszamy do kontaktu poprzez formularz na stronie lub telefonicznie. Chętnie omówimy szczegóły i przygotujemy ofertę dostosowaną do Twoich potrzeb."
    },
    {
      question: "Czy mogę uzyskać referencje od Waszych dotychczasowych klientów?",
      answer: "Tak, na życzenie możemy udostępnić referencje od firm, które skorzystały z naszych usług i wyraziły zgodę na ich udostępnienie. Zapraszamy również do zapoznania się z opiniami naszych klientów zamieszczonymi na stronie."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Nasze realizacje</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Zobacz wybrane projekty szkoleniowe, które zrealizowaliśmy dla firm produkcyjnych. Każdy z naszych klientów osiągnął wymierne korzyści dzięki naszemu wsparciu w obszarze szkoleń i certyfikacji.
            </p>
          </div>
        </div>
      </section>

      {/* Realizations List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {realizations.map((realization, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-md overflow-hidden ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:flex`}
              >
                <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
                  {realization.image ? (
                    <img 
                      src={realization.image} 
                      alt={realization.title} 
                      className="w-full h-auto object-cover rounded" 
                    />
                  ) : (
                    <div className="w-full aspect-video bg-blue-100 flex items-center justify-center rounded">
                      <p className="text-blue-500 font-medium">Zdjęcie realizacji</p>
                    </div>
                  )}
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-4">{realization.title}</h2>
                  <p className="text-gray-600 mb-4">{realization.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Zakres szkolenia:</h3>
                      <p className="text-gray-600">{realization.scope}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Efekt:</h3>
                      <p className="text-gray-600">{realization.effect}</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/kontakt">
                      Zapytaj o szczegóły <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Opinie klientów</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sprawdź, co mówią o nas nasi klienci po zrealizowanych projektach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="inline-block w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Dlaczego warto wybrać naszą firmę?</h2>
              <p className="text-gray-600 mb-6">
                Nasze doświadczenie i indywidualne podejście do każdego klienta zapewniają najwyższą jakość usług szkoleniowych. Oto kilka powodów, dla których firmy produkcyjne wybierają właśnie nas:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                  <p className="text-gray-600">Specjalizacja w szkoleniach dla firm produkcyjnych</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                  <p className="text-gray-600">Doświadczeni trenerzy z praktyczną wiedzą branżową</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                  <p className="text-gray-600">Elastyczne formy szkolenia dopasowane do potrzeb klienta</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                  <p className="text-gray-600">Kompleksowa obsługa procesu certyfikacji</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                  <p className="text-gray-600">Bezpłatny audyt szkoleniowy pozwalający na optymalizację kosztów</p>
                </li>
              </ul>
              <Button asChild className="mt-8">
                <Link to="/o-nas">
                  Dowiedz się więcej o nas
                </Link>
              </Button>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-center">Nasze liczby mówią same za siebie</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <p className="text-gray-600">zadowolonych firm</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                  <p className="text-gray-600">zrealizowanych szkoleń</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <p className="text-gray-600">zdawalność egzaminów</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                  <p className="text-gray-600">lat doświadczenia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Gotowy, aby rozpocząć współpracę?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Skontaktuj się z nami, aby omówić Twoje potrzeby szkoleniowe i dowiedzieć się, jak możemy pomóc Twojej firmie.
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
      <FAQ title="Najczęściej zadawane pytania dotyczące naszych realizacji" items={faqItems} />
    </div>
  );
};

export default RealizationsPage;
