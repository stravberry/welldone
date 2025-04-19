import React, { ReactElement, isValidElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import FAQ from '@/components/FAQ';

interface ServiceDetail {
  title: string;
  description: string;
  image: string;
  content: React.ReactNode;
  faqItems: { question: string; answer: string }[];
}

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  const servicesData: Record<string, ServiceDetail> = {
    'udt-operatorzy': {
      title: 'Uprawnienia UDT dla operatorów',
      description: 'Szkolenia dla operatorów urządzeń transportu bliskiego, takich jak wózki widłowe, suwnice i podesty ruchome.',
      image: '/path/to/image.jpg',
      content: (
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Lista dostępnych kursów:</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wybierz kurs który Cię interesuje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800"
                alt="Wózki widłowe"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Wózki widłowe (bez specjalizacji i specjalizowane)</h4>
                <p className="text-gray-600 mb-4">Szkolenie przeznaczone dla osób, które chcą uzyskać uprawnienia do obsługi wózków jezdniowych z mechanicznym napędem podnoszenia.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna, online (część teoretyczna), hybrydowa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800"
                alt="Suwnice"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Suwnice</h4>
                <p className="text-gray-600 mb-4">Kurs przygotowujący do zdobycia uprawnień na obsługę suwnic sterowanych z poziomu roboczego i kabiny.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna, hybrydowa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&w=800"
                alt="Wciągniki i wciągarki"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Wciągniki i wciągarki</h4>
                <p className="text-gray-600 mb-4">Szkolenie z obsługi wciągników i wciągarek wykorzystywanych w zakładach przemysłowych.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna, hybrydowa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1578864574232-89239b9c4174?auto=format&fit=crop&w=800"
                alt="Podesty ruchome"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Podesty ruchome</h4>
                <p className="text-gray-600 mb-4">Kurs przygotowujący do obsługi podestów ruchomych przejezdnych i wiszących.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna, hybrydowa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 py-16 px-4 rounded-xl mb-12">
            <h3 className="text-3xl font-semibold mb-12 text-center">Korzyści</h3>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1606189934846-a527add8a77b?auto=format&fit=crop&w=800"
                  alt="Korzyści ze szkolenia"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Możliwość uzyskania uprawnień uznawanych w całej Polsce</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Doświadczeni trenerzy z praktycznym doświadczeniem</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Elastyczne formy szkolenia dostosowane do potrzeb firmy</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Kompleksowa obsługa procesu certyfikacji</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      faqItems: [
        {
          question: "Jak długo trwa kurs uprawnienia UDT dla operatorów?",
          answer: "Czas trwania kursu zależy od rodzaju urządzenia i doświadczenia uczestnika. Standardowo kursy trwają od 1 do 5 dni. Szkolenia teoretyczne mogą być realizowane online, co znacznie skraca czas trwania części stacjonarnej."
        },
        {
          question: "Czy szkolenie kończy się egzaminem?",
          answer: "Tak, każde szkolenie kończy się egzaminem przed komisją UDT. Egzamin składa się z części teoretycznej i praktycznej."
        },
        {
          question: "Na jak długo wydawane są uprawnienia?",
          answer: "Uprawnienia UDT dla operatorów wydawane są na czas nieokreślony, jednak co 5 lat należy przejść szkolenie przypominające."
        },
        {
          question: "Czy szkolenie obejmuje również część praktyczną?",
          answer: "Tak, każde szkolenie obejmuje część teoretyczną i praktyczną. Część praktyczna realizowana jest na urządzeniach, do obsługi których uczestnik uzyskuje uprawnienia."
        }
      ]
    },
    'udt-konserwatorzy': {
      title: 'Uprawnienia UDT dla konserwatorów',
      description: 'Kursy dla konserwatorów urządzeń transportu bliskiego, takich jak suwnice i żurawie. Hybrydowa forma szkolenia.',
      image: '/path/to/image.jpg',
      content: (
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Lista dostępnych kursów:</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wybierz kurs który Cię interesuje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800"
                alt="Suwnice"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Suwnice</h4>
                <p className="text-gray-600 mb-4">Kurs przygotowujący do konserwacji i obsługi technicznej suwnic różnego typu.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Hybrydowa (teoria online, praktyka stacjonarna)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800"
                alt="Wciągniki i wciągarki"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Wciągniki i wciągarki</h4>
                <p className="text-gray-600 mb-4">Szkolenie z konserwacji wciągników i wciągarek wykorzystywanych w zakładach przemysłowych.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Hybrydowa (teoria online, praktyka stacjonarna)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 py-16 px-4 rounded-xl mb-12">
            <h3 className="text-3xl font-semibold mb-12 text-center">Korzyści</h3>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1606189934846-a527add8a77b?auto=format&fit=crop&w=800"
                  alt="Korzyści ze szkolenia"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Szkolenia dostosowane do specyfiki urządzeń</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Praktyczne zajęcia na rzeczywistych urządzeniach</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Doświadczona kadra szkoleniowa</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Wsparcie w procesie uzyskiwania uprawnień</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      faqItems: [
        {
          question: "Jakie są wymagania wstępne dla uczestników szkolenia dla konserwatorów?",
          answer: "Uczestnik szkolenia powinien posiadać odpowiednie wykształcenie techniczne (min. zawodowe) oraz doświadczenie w pracy z urządzeniami, których dotyczy szkolenie. Wymagane jest również zaświadczenie lekarskie o braku przeciwwskazań do wykonywania pracy na wysokości."
        },
        {
          question: "Jak długo trwa kurs dla konserwatorów?",
          answer: "Czas trwania kursu zależy od rodzaju urządzenia, ale zwykle trwa od 3 do 10 dni, w tym część teoretyczna i praktyczna."
        },
        {
          question: "Czy po ukończeniu szkolenia otrzymuję certyfikat UDT?",
          answer: "Tak, po pomyślnym zdaniu egzaminu przed komisją UDT, uczestnik otrzymuje zaświadczenie kwalifikacyjne UDT uprawniające do konserwacji określonych typów urządzeń."
        },
        {
          question: "Czy szkolenie obejmuje również naprawy urządzeń?",
          answer: "Tak, szkolenie obejmuje zarówno konserwację profilaktyczną, jak i podstawowe naprawy urządzeń. Szczegółowy zakres zależy od rodzaju urządzenia."
        }
      ]
    },
    'sep': {
      title: 'Uprawnienia SEP',
      description: 'Szkolenia i certyfikacja w zakresie uprawnień SEP: elektryczne, cieplne i gazowe dla pracowników.',
      image: '/path/to/image.jpg',
      content: (
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Lista dostępnych kursów:</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wybierz kurs który Cię interesuje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800"
                alt="Elektryczne"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Elektryczne (E1, D1)</h4>
                <p className="text-gray-600 mb-4">Uprawnienia do eksploatacji (E1) i dozoru (D1) urządzeń, instalacji i sieci elektroenergetycznych.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna, online</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800"
                alt="Cieplne"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Cieplne (E2, D2)</h4>
                <p className="text-gray-600 mb-4">Uprawnienia do eksploatacji (E2) i dozoru (D2) urządzeń wytwarzających, przetwarzających i zużywających ciepło.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna, online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 py-16 px-4 rounded-xl mb-12">
            <h3 className="text-3xl font-semibold mb-12 text-center">Korzyści</h3>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1606189934846-a527add8a77b?auto=format&fit=crop&w=800"
                  alt="Korzyści ze szkolenia"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Podniesienie kwalifikacji pracowników</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Zwiększenie bezpieczeństwa w miejscu pracy</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Zgodność z przepisami</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Redukcja kosztów zewnętrznych usług</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      faqItems: [
        {
          question: "Jaki jest okres ważności uprawnień SEP?",
          answer: "Uprawnienia SEP są ważne przez 5 lat od daty zdania egzaminu. Po tym okresie należy odnowić uprawnienia, przystępując do ponownego egzaminu."
        },
        {
          question: "Czy szkolenie jest wymagane przed przystąpieniem do egzaminu SEP?",
          answer: "Formalnie szkolenie nie jest wymagane, ale zdecydowanie zalecane, szczególnie dla osób przystępujących do egzaminu po raz pierwszy lub odnawiających uprawnienia po dłuższej przerwie."
        },
        {
          question: "Jakie są wymagania wstępne dla kandydatów na uprawnienia SEP?",
          answer: "Wymagania zależą od rodzaju uprawnień. Dla uprawnień eksploatacyjnych (E) zwykle wymagane jest min. wykształcenie zawodowe i praktyka zawodowa. Dla uprawnień dozoru (D) często wymagane jest wykształcenie techniczne średnie lub wyższe oraz dłuższa praktyka zawodowa."
        },
        {
          question: "Czy egzamin odbywa się od razu po szkoleniu?",
          answer: "Nie zawsze. Termin egzaminu jest ustalany przez komisję SEP, ale zwykle staramy się, aby odbywał się w krótkim czasie po zakończeniu szkolenia."
        }
      ]
    },
    'lutowanie': {
      title: 'Szkolenia z lutowania',
      description: 'Kursy dla firm zajmujących się procesami lutowania. Skupiamy się na podnoszeniu jakości produkcji i redukcji błędów.',
      image: '/path/to/image.jpg',
      content: (
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Lista dostępnych kursów:</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wybierz kurs który Cię interesuje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800"
                alt="Lutowanie podstawowe"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Lutowanie podstawowe</h4>
                <p className="text-gray-600 mb-4">Kurs podstawowy z technik lutowania dla pracowników produkcji.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800"
                alt="Lutowanie zaawansowane"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Lutowanie zaawansowane</h4>
                <p className="text-gray-600 mb-4">Zaawansowane techniki lutowania i kontroli jakości połączeń.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                    <p className="text-gray-600">Stacjonarna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 py-16 px-4 rounded-xl mb-12">
            <h3 className="text-3xl font-semibold mb-12 text-center">Korzyści</h3>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1606189934846-a527add8a77b?auto=format&fit=crop&w=800"
                  alt="Korzyści ze szkolenia"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Zmniejszenie liczby reklamacji</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Oszczędności poprzez redukcję odpadów</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Zwiększenie wydajności produkcji</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">Spełnienie standardów jakości</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      faqItems: [
        {
          question: "Jak długo trwa szkolenie z lutowania?",
          answer: "Standardowe szkolenie trwa od 1 do 3 dni, w zależności od zakresu tematycznego i poziomu zaawansowania. Możemy dostosować czas trwania do indywidualnych potrzeb firmy."
        },
        {
          question: "Czy szkolenie obejmuje lutowanie bezołowiowe?",
          answer: "Tak, nasze szkolenia obejmują zarówno tradycyjne lutowanie ołowiowe, jak i technologie bezołowiowe zgodne z dyrektywą RoHS."
        },
        {
          question: "Czy uczestnicy otrzymują certyfikaty po ukończeniu szkolenia?",
          answer: "Tak, każdy uczestnik otrzymuje certyfikat ukończenia szkolenia, a na życzenie możemy przygotować również indywidualne certyfikaty zgodne ze standardami IPC."
        },
        {
          question: "Czy szkolenie może być przeprowadzone na naszym sprzęcie, którym dysponujemy w firmie?",
          answer: "Tak, możemy przeprowadzić szkolenie na Państwa sprzęcie, co pozwala na praktyczne zastosowanie nabytych umiejętności w rzeczywistym środowisku produkcyjnym. Alternatywnie, możemy zapewnić pełne wyposażenie stanowisk szkoleniowych."
        }
      ]
    },
    'eventy': {
      title: 'Eventy edukacyjne',
      description: 'Organizacja eventów edukacyjnych dla firm, które chcą zwiększyć świadomość pracowników w zakresie bezpieczeństwa technicznego.',
      image: '/path/to/image.jpg',
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800"
                alt="Dzień Bezpieczeństwa"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Dzień Bezpieczeństwa Technicznego</h4>
                <p className="text-gray-600 mb-4">Całodniowe wydarzenie obejmujące szereg aktywności: prelekcje, warsztaty, pokazy, konkursy. Może być organizowane cyklicznie, np. raz do roku.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma:</h5>
                    <p className="text-gray-600">Stacjonarna</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800"
                alt="Warsztaty tematyczne"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">Warsztaty tematyczne</h4>
                <p className="text-gray-600 mb-4">Krótsze wydarzenia poświęcone konkretnym zagadnieniom bezpieczeństwa.</p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Forma:</h5>
                    <p className="text-gray-600">Stacjonarna lub online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Nasze eventy edukacyjne</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasze eventy edukacyjne to zorganizowane wydarzenia, które mają na celu promocję kultury bezpieczeństwa technicznego w firmach produkcyjnych. Organizujemy "Dni bezpieczeństwa technicznego", warsztaty, pokazy i inne formy edukacyjne, które angażują pracowników i podnoszą ich świadomość w zakresie bezpieczeństwa.
            </p>
          </div>

          <div className="bg-gray-50 py-10 px-4 rounded-xl mb-12">
            <div className="max-w-3xl mx-auto">
              <h4 className="text-2xl font-semibold mb-6 text-center">Cel eventu</h4>
              <p className="text-gray-700 text-lg text-center">
                Głównym celem naszych eventów jest promocja kultury bezpieczeństwa w firmie, zwiększenie zaangażowania pracowników oraz praktyczne przedstawienie zagadnień związanych z bezpieczeństwem technicznym.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-2xl font-semibold mb-6 text-center">Elementy programu</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Prelekcje ekspertów z dziedziny bezpieczeństwa technicznego",
                "Warsztaty praktyczne z zakresu BHP i obsługi urządzeń",
                "Pokazy bezpiecznej eksploatacji urządzeń technicznych",
                "Symulacje zagrożeń i ćwiczenia z zakresu reagowania na awarie",
                "Konkursy z nagrodami sprawdzające wiedzę uczestników"
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 py-16 px-4 rounded-xl mb-12">
            <h3 className="text-3xl font-semibold mb-12 text-center">Korzyści dla firmy i pracowników</h3>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Zwiększenie zaangażowania</h5>
                    <p className="text-gray-600">Interaktywna forma przekazywania wiedzy zwiększa zaangażowanie pracowników w kwestie bezpieczeństwa.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Poprawa bezpieczeństwa pracy</h5>
                    <p className="text-gray-600">Świadomi pracownicy popełniają mniej błędów, co przekłada się na mniejszą liczbę wypadków.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Budowanie kultury organizacyjnej</h5>
                    <p className="text-gray-600">Eventy integrują pracowników i budują pozytywną kulturę organizacyjną zorientowaną na bezpieczeństwo.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
                  <Check className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold mb-1">Praktyczny wymiar szkoleń</h5>
                    <p className="text-gray-600">Eventy pozwalają na przekazanie praktycznej wiedzy w atrakcyjnej formie, co zwiększa jej przyswajanie.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-2xl font-semibold mb-6 text-center">Przykładowe formaty eventów</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-2">Dzień Bezpieczeństwa Technicznego</h5>
                <p className="text-gray-600">Całodniowe wydarzenie obejmujące szereg aktywności: prelekcje, warsztaty, pokazy, konkursy. Może być organizowane cyklicznie, np. raz do roku.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-2">Warsztaty tematyczne</h5>
                <p className="text-gray-600">Krótsze wydarzenia poświęcone konkretnym zagadnieniom, np. bezpieczeństwo przy obsłudze suwnic, zapobieganie porażeniom prądem elektrycznym.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-2">Roadshow bezpieczeństwa</h5>
                <p className="text-gray-600">Seria mniejszych wydarzeń organizowanych w różnych lokalizacjach firmy, np. w różnych zakładach produkcyjnych.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-2">Konkursy i kampanie edukacyjne</h5>
                <p className="text-gray-600">Długoterminowe działania angażujące pracowników, np. konkursy wiedzy, kampanie plakatowe, akcje "zgłoś zagrożenie".</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 py-10 px-4 rounded-xl mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h4 className="text-2xl font-semibold mb-6">Kontakt i organizacja</h4>
              <p className="text-gray-700 text-lg mb-6">
                Każdy event jest dostosowany do indywidualnych potrzeb i specyfiki firmy. Współpracujemy z klientem na każdym etapie organizacji, od planowania po realizację.
              </p>
              <p className="text-gray-700 text-lg">
                Zapraszamy do kontaktu w celu omówienia szczegółów i przygotowania oferty dopasowanej do Państwa potrzeb.
              </p>
            </div>
          </div>
        </div>
      ),
      faqItems: [
        {
          question: "Jak duża musi być firma, aby zorganizować event edukacyjny?",
          answer: "Nasze eventy edukacyjne możemy dostosować do firm różnej wielkości. Dla mniejszych organizacji przygotowujemy kameralne warsztaty, a dla większych kompleksowe wydarzenia z wieloma aktywnościami."
        },
        {
          question: "Ile czasu potrzeba na przygotowanie eventu?",
          answer: "Czas przygotowania zależy od skali wydarzenia. Małe warsztaty tematyczne możemy zorganizować nawet w ciągu 2-3 tygodni, natomiast duże wydarzenia wymagają około 1-2 miesięcy przygotowań."
        },
        {
          question: "Czy zapewniacie materiały edukacyjne?",
          answer: "Tak, przygotowujemy komplet materiałów edukacyjnych dopasowanych do tematyki eventu: prezentacje, broszury, plakaty, filmy instruktażowe oraz materiały do ćwiczeń praktycznych."
        },
        {
          question: "Czy eventy mogą być organizowane cyklicznie?",
          answer: "Jak najbardziej. Wielu naszych klientów decyduje się na cykliczną organizację eventów, np. kwartalnych warsztatów tematycznych lub corocznego Dnia Bezpieczeństwa. Takie podejście pozwala na systematyczne budowanie kultury bezpieczeństwa w firmie."
        }
      ]
    }
  };

  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nie znaleziono usługi</h2>
          <p className="mb-6">Przepraszamy, ale nie znaleźliśmy wybranej usługi.</p>
          <Link to="/uslugi">
            <Button variant="outline">
              <ArrowLeft className="mr-2" />
              Powrót do listy usług
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/uslugi" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Powrót do listy usług</span>
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
        <p className="text-xl text-gray-600">{service.description}</p>
      </div>
      
      <div className="mb-12">
        {service.content}
      </div>
      
      <FAQ items={service.faqItems} />
    </div>
  );
};

export default ServiceDetailPage;
