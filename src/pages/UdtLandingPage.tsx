import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import useEventTracking from '@/hooks/useEventTracking';

const UdtLandingPage = () => {
  const { trackEvent } = useEventTracking();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackEvent({
      category: 'form',
      action: 'submit',
      label: 'udt-landing-contact-form',
      additionalData: {
        formType: 'UDT Landing Contact'
      }
    });
    
    // Show success message
    toast.success("Dziękujemy! Wkrótce się z Tobą skontaktujemy.");
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const trackCTAClick = (ctaName: string) => {
    trackEvent({
      category: 'button',
      action: 'click',
      label: `udt-landing-${ctaName}`,
      additionalData: {
        buttonLocation: 'UDT Landing Page'
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
              alt="Well-done.pl Logo" 
              className="h-8" 
            />
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600">
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link to="/wiedza" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600">
              <BookOpen size={20} />
              <span className="hidden sm:inline">Blog</span>
            </Link>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                trackCTAClick('nav-contact');
                window.location.href = 'tel:504305437';
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Kontakt</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Add margin-top to account for fixed navigation */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-orange-600 to-orange-400 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <div className="bg-white bg-opacity-10 p-2 rounded inline-block mb-6">
                  <span className="text-white font-medium">Certyfikowane szkolenia UDT</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Zdobądź uprawnienia UDT<br/>
                  <span className="text-orange-200">dla operatorów</span>
                </h1>
                <p className="text-white text-xl mb-8">
                  Kompleksowe szkolenia na urządzenia techniczne ze zdawalnością 96%
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => {
                      trackCTAClick('hero-contact');
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white text-orange-600 hover:bg-orange-100"
                  >
                    Skontaktuj się z nami
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => {
                      trackCTAClick('hero-offerings');
                      document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                  >
                    Sprawdź ofertę szkoleń
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-orange-300 flex items-center justify-center text-xs font-bold text-white">
                        {i}
                      </div>
                    ))}
                  </div>
                  <p className="text-white">
                    <span className="font-bold">450+</span> przeszkolonych osób w tym roku
                  </p>
                </div>
              </div>
              <div className="lg:w-2/5 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Zostaw kontakt, oddzwonimy!</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Label htmlFor="quick-name" className="text-gray-700">Imię i nazwisko</Label>
                    <Input 
                      id="quick-name" 
                      placeholder="Jan Kowalski" 
                      className="mt-1" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="quick-phone" className="text-gray-700">Telefon</Label>
                    <Input 
                      id="quick-phone" 
                      placeholder="123 456 789" 
                      className="mt-1" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => trackCTAClick('hero-form')}
                  >
                    Zamów bezpłatną konsultację
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Skontaktujemy się w ciągu 24 godzin
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="bg-white py-6 mt-16 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">96%</p>
                  <p className="text-gray-600">Zdawalność</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">10+</p>
                  <p className="text-gray-600">Lat doświadczenia</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">5000+</p>
                  <p className="text-gray-600">Przeszkolonych osób</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">100%</p>
                  <p className="text-gray-600">Gwarancja jakości</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section id="offerings" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Dostępne szkolenia UDT</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Oferujemy kompleksowe szkolenia na wszystkie rodzaje urządzeń transportu bliskiego objętych nadzorem UDT
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Wózki widłowe",
                  description: "Szkolenia na wszystkie kategorie wózków jezdniowych podnośnikowych",
                  image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
                  features: ["Kategorie I WJO", "Kategorie II WJO", "Kategorie III WJO"]
                },
                {
                  title: "Podesty ruchome",
                  description: "Szkolenia na podesty przejezdne, wolnobieżne i przewoźne",
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
                  features: ["Podesty nożycowe", "Podesty przejezdne", "Podesty montowane"]
                },
                {
                  title: "Suwnice",
                  description: "Pełne szkolenia na obsługę suwnic hakowych i specjalistycznych",
                  image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
                  features: ["Suwnice sterowane z kabiny", "Suwnice sterowane z poziomu", "Suwnice specjalistyczne"]
                },
                {
                  title: "Układnice magazynowe",
                  description: "Profesjonalne szkolenia z obsługi układnic wysokiego składowania",
                  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
                  features: ["Układnice półautomatyczne", "Układnice automatyczne", "Układnice specjalistyczne"]
                }
              ].map((offering, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img 
                      src={offering.image} 
                      alt={offering.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {offering.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">
                      {offering.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {offering.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700 mt-2"
                      onClick={() => {
                        trackCTAClick(`offering-${offering.title}`);
                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Zapisz się na szkolenie
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-xl text-gray-700 mb-6">
                Nie znalazłeś interesującego Cię szkolenia? Skontaktuj się z nami!
              </p>
              <Button 
                size="lg"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  trackCTAClick('see-more-offerings');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Sprawdź wszystkie szkolenia
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">Dlaczego warto <span className="text-orange-600">wybrać nasze szkolenia?</span></h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Najwyższa zdawalność - 96% za pierwszym razem",
                      description: "Nasi kursanci zdają egzamin praktycznie za pierwszym razem, dzięki doświadczonym instruktorom i dopracowanym materiałom szkoleniowym."
                    },
                    {
                      title: "Szkolenia w całej Polsce",
                      description: "Organizujemy szkolenia w różnych lokalizacjach, możemy również przyjechać do Twojej firmy, by zorganizować szkolenie na miejscu."
                    },
                    {
                      title: "Kompleksowa organizacja",
                      description: "Zajmujemy się całym procesem od A do Z - szkoleniem, egzaminem, dokumentacją i opłatami. Wszystko w ramach jednej usługi."
                    },
                    {
                      title: "Doświadczeni instruktorzy-praktycy",
                      description: "Nasi trenerzy to praktycy z wieloletnim doświadczeniem, którzy nie tylko uczą teorii, ale przekazują praktyczną wiedzę z codziennej pracy."
                    }
                  ].map((point, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                          <Check className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{point.title}</h3>
                        <p className="text-gray-600 mt-1">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="mt-10 bg-orange-600 hover:bg-orange-700 text-white"
                  size="lg"
                  onClick={() => {
                    trackCTAClick('why-choose-us');
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Skontaktuj się z nami
                </Button>
              </div>
              
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
                    alt="Szkolenia UDT"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64 mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                    alt="Szkolenie na wózki widłowe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
                    alt="Obsługa urządzeń UDT"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64 mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
                    alt="Egzamin UDT"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Jak wygląda proces <span className="text-orange-600">szkolenia?</span></h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Przeprowadzimy Cię przez cały proces od pierwszego kontaktu do otrzymania zaświadczenia UDT
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-0 right-0 h-1 bg-orange-200 top-20 transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: "Krok 1",
                    title: "Kontakt i konsultacja",
                    description: "Skontaktuj się z nami telefonicznie lub przez formularz. Doradzimy i dobierzemy najlepsze rozwiązanie dla Twojej firmy."
                  },
                  {
                    step: "Krok 2",
                    title: "Ustalenie terminu",
                    description: "Wybieramy dogodny termin szkolenia, dostosowując się do Twoich możliwości czasowych."
                  },
                  {
                    step: "Krok 3",
                    title: "Szkolenie teoretyczne i praktyczne",
                    description: "Przeprowadzamy kompleksowe szkolenie teoretyczne oraz zajęcia praktyczne na urządzeniach."
                  },
                  {
                    step: "Krok 4",
                    title: "Egzamin i certyfikacja",
                    description: "Organizujemy egzamin UDT i pomagamy w uzyskaniu wszystkich niezbędnych dokumentów."
                  }
                ].map((step, index) => (
                  <div key={index} className="relative z-10">
                    <div className="bg-white rounded-lg p-6 shadow-md h-full">
                      <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xl mx-auto md:mx-0 mb-4 relative z-20">
                        {index + 1}
                      </div>
                      <h3 className="text-orange-600 font-semibold mb-1">{step.step}</h3>
                      <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-xl text-gray-700 mb-6">
                Chcesz dowiedzieć się więcej o procesie szkolenia?
              </p>
              <Button 
                size="lg"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  trackCTAClick('process-learn-more');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Zamów bezpłatną konsultację
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Co mówią nasi <span className="text-orange-600">klienci?</span></h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sprawdź opinie firm, które skorzystały z naszych usług szkoleniowych
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: "Niezwykle profesjonalne podejście. Instruktorzy przekazali praktyczną wiedzę, która jest bezcenna w codziennej pracy. 96% zdawalność to nie przypadek!",
                  author: "Marek Nowak",
                  position: "Kierownik działu logistyki",
                  company: "Logistic Solutions Sp. z o.o."
                },
                {
                  text: "Kompleksowa usługa od A do Z. Nie musieliśmy martwić się o żadne formalności, wszystko zostało perfekcyjnie zorganizowane. Polecam każdej firmie!",
                  author: "Anna Kowalska",
                  position: "HR Manager",
                  company: "Production Pro S.A."
                },
                {
                  text: "Szkolenie przeprowadzone na najwyższym poziomie. Cenimy sobie indywidualne podejście i elastyczność. Wszyscy nasi pracownicy zdali egzamin za pierwszym razem.",
                  author: "Tomasz Wiśniewski",
                  position: "Dyrektor operacyjny",
                  company: "Warehouse Systems Sp. z o.o."
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md relative">
                  <div className="absolute -top-5 left-6">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic mt-4 mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.position}</p>
                      <p className="text-orange-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Dlaczego warto wybrać <span className="text-orange-600">właśnie nas?</span></h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Zobacz, co wyróżnia nasze szkolenia na tle konkurencji
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 bg-gray-100 text-left text-gray-700 border-b-2 border-gray-200"></th>
                    <th className="p-4 bg-orange-600 text-center text-white font-bold border-b-2 border-orange-500">
                      <span className="text-xl">NASZE SZKOLENIA</span>
                      <p className="text-orange-200 font-normal text-sm mt-1">Lider szkoleń UDT</p>
                    </th>
                    <th className="p-4 bg-gray-100 text-center text-gray-700 border-b-2 border-gray-200">
                      <span>Konkurencja</span>
                      <p className="text-gray-500 font-normal text-sm mt-1">Standardowa oferta</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Zdawalność egzaminów",
                      us: "96% za pierwszym podejściem",
                      them: "70-80% za pierwszym podejściem"
                    },
                    {
                      feature: "Doświadczenie instruktorów",
                      us: "Min. 10 lat praktyki zawodowej",
                      them: "Zróżnicowane doświadczenie"
                    },
                    {
                      feature: "Materiały szkoleniowe",
                      us: "Autorskie, regularnie aktualizowane",
                      them: "Standardowe materiały szkoleniowe"
                    },
                    {
                      feature: "Organizacja egzaminów",
                      us: "Kompleksowa obsługa i organizacja",
                      them: "Często po stronie klienta"
                    },
                    {
                      feature: "Szkolenie w siedzibie klienta",
                      us: "Tak, w dowolnej lokalizacji w Polsce",
                      them: "Tylko wybrane lokalizacje"
                    },
                    {
                      feature: "Wsparcie po szkoleniu",
                      us: "Bezpłatne konsultacje i doradztwo",
                      them: "Brak lub dodatkowo płatne"
                    },
                    {
                      feature: "Formy płatności",
                      us: "Elastyczne, możliwość odroczenia",
                      them: "Standardowe, płatność z góry"
                    }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-4 font-medium text-gray-800">{row.feature}</td>
                      <td className="p-4 text-center bg-orange-50">
                        <div className="flex items-center justify-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="text-gray-800 font-medium">{row.us}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-gray-600">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center">
              <Button 
                size="lg"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  trackCTAClick('comparison-cta');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Wybierz najlepsze szkolenia UDT
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Najczęściej zadawane <span className="text-orange-600">pytania</span></h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Odpowiadamy na najczęstsze pytania dotyczące naszych szkoleń UDT
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "Jak długo trwa szkolenie UDT na wózki widłowe?",
                  answer: "Standardowe szkolenie UDT na wózki widłowe trwa zazwyczaj 2-3 dni (część teoretyczna i praktyczna). Dokładny czas trwania zależy od kategorii uprawnień oraz indywidualnych potrzeb klienta."
                },
                {
                  question: "Czy szkolenie obejmuje również egzamin UDT?",
                  answer: "Tak, w ramach naszej kompleksowej usługi organizujemy pełne szkolenie zakończone oficjalnym egzaminem UDT. Zajmujemy się wszystkimi formalnościami związanymi z egzaminem."
                },
                {
                  question: "Jakie są wymagania do przystąpienia do szkolenia?",
                  answer: "Podstawowym wymogiem jest ukończenie 18 lat, posiadanie co najmniej wykształcenia podstawowego oraz brak przeciwwskazań zdrowotnych do wykonywania zawodu operatora. W przypadku niektórych kategorii urządzeń mogą być wymagane dodatkowe kwalifikacje."
                },
                {
                  question: "Czy oferujecie szkolenia dla firm z dojazdem do siedziby klienta?",
                  answer: "Tak, specjalizujemy się w organizacji szkoleń wyjazdowych. Przyjeżdżamy do siedziby klienta w dowolnej lokalizacji w Polsce, co minimalizuje przestoje w pracy i zwiększa komfort uczestników szkolenia."
                },
                {
                  question: "Jak wygląda proces odnowienia uprawnień UDT?",
                  answer: "Uprawnienia UDT są wydawane na 5 lat. Aby je odnowić, należy złożyć wniosek o przedłużenie ważności zaświadczenia przed up��ywem terminu. Pomagamy w całym procesie odnowienia, włącznie z przygotowaniem dokumentacji i organizacją egzaminu sprawdzającego."
                },
                {
                  question: "Co obejmuje koszt szkolenia?",
                  answer: "Nasza oferta jest kompleksowa i obejmuje szkolenie teoretyczne i praktyczne, materiały szkoleniowe, organizację egzaminu UDT, opłaty egzaminacyjne oraz wsparcie w przygotowaniu wymaganej dokumentacji. Wszystko w ramach jednej ustalonej ceny."
                }
              ].map((faq, index) => (
                <div key={index} className="mb-6 p-6 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-gray-700 mb-6">
                Masz więcej pytań? Skontaktuj się z nami!
              </p>
              <Button 
                size="lg"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  trackCTAClick('faq-contact');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Zadaj pytanie ekspertowi
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-orange-600 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-6">Skontaktuj się z nami</h2>
                  <p className="mb-8">
                    Wypełnij formularz, a nasz konsultant skontaktuje się z Tobą w ciągu 24h, aby omówić szczegóły współpracy.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5" />
                      <span>504 305 437</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <span>kontakt@udt-szkolenia.pl</span>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h3 className="font-semibold mb-3">Dlaczego warto?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Bezpłatna konsultacja</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Indywidualna oferta</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Elastyczne terminy szkoleń</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Formularz kontaktowy</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">Imię i nazwisko</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Jan Kowalski" 
                          required 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-gray-700">Nazwa firmy</Label>
                        <Input 
                          id="company" 
                          name="company" 
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Firma Sp. z o.o." 
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          type="email" 
                          placeholder="jan@firma.pl" 
                          required 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-700">Telefon</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="123 456 789" 
                          required 
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-gray-700">Wiadomość</Label>
                      <textarea
                        id="message"
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        placeholder="Opisz swoje potrzeby szkoleniowe..."
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      size="lg"
                      onClick={() => trackCTAClick('contact-form-submit')}
                    >
                      Wyślij zapytanie
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Wysyłając formularz wyrażasz zgodę na przetwarzanie Twoich danych osobowych zgodnie z naszą polityką prywatności.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-400 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Zainwestuj w rozwój swoich pracowników już dziś!
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Skontaktuj się z nami, aby uzyskać bezpłatną konsultację i indywidualną ofertę szkoleniową dopasowaną do potrzeb Twojej firmy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-100"
                onClick={() => {
                  trackCTAClick('final-contact');
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Skontaktuj się z nami
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                onClick={() => {
                  trackCTAClick('final-phone');
                  window.location.href = 'tel:504305437';
                }}
              >
                Zadzwoń: 504 305 437
              </Button>
            </div>
          </div>
        </section>

        <Toaster />
      </div>
    </div>
  );
};

export default UdtLandingPage;
