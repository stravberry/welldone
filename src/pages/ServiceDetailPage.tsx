import React from 'react';
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
          <h3 className="text-2xl font-semibold mb-4">Lista dostępnych kursów:</h3>
          <ul className="space-y-6 mb-8">
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Wózki widłowe (bez specjalizacji i specjalizowane)</h4>
              <p className="text-gray-600 mb-4">Szkolenie przeznaczone dla osób, które chcą uzyskać uprawnienia do obsługi wózków jezdniowych z mechanicznym napędem podnoszenia.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy firm produkcyjnych i magazynów obsługujący wózki widłowe.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Stacjonarna, online (część teoretyczna), hybrydowa</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Suwnice</h4>
              <p className="text-gray-600 mb-4">Kurs przygotowujący do zdobycia uprawnień na obsługę suwnic sterowanych z poziomu roboczego i kabiny.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy firm produkcyjnych obsługujący urządzenia dźwignicowe.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Stacjonarna, hybrydowa</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Wciągniki i wciągarki</h4>
              <p className="text-gray-600 mb-4">Szkolenie z obsługi wciągników i wciągarek wykorzystywanych w zakładach przemysłowych.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy firm produkcyjnych obsługujący wciągniki i wciągarek.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Stacjonarna, hybrydowa</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Podesty ruchome</h4>
              <p className="text-gray-600 mb-4">Kurs przygotowujący do obsługi podestów ruchomych przejezdnych i wiszących.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy firm produkcyjnych i budowlanych obsługujący podesty ruchome.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Stacjonarna, hybrydowa</p>
                </div>
              </div>
            </li>
          </ul>
          
          <h3 className="text-2xl font-semibold mb-4">Korzyści:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Możliwość uzyskania uprawnień uznawanych w całej Polsce</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Doświadczeni trenerzy z praktycznym doświadczeniem</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Elastyczne formy szkolenia dostosowane do potrzeb firmy</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Kompleksowa obsługa procesu certyfikacji</span>
            </li>
          </ul>
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
          <h3 className="text-2xl font-semibold mb-4">Lista oferowanych szkoleń:</h3>
          <ul className="space-y-6 mb-8">
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Suwnice</h4>
              <p className="text-gray-600 mb-4">Kurs przygotowujący do konserwacji i obsługi technicznej suwnic różnego typu.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy techniczni i serwisanci zajmujący się konserwacją suwnic.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Hybrydowa (teoria online, praktyka stacjonarna)</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Wciągniki i wciągarki</h4>
              <p className="text-gray-600 mb-4">Szkolenie z konserwacji wciągników i wciągarek wykorzystywanych w zakładach przemysłowych.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Personel techniczny odpowiedzialny za konserwację urządzeń dźwignicowych.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Hybrydowa (teoria online, praktyka stacjonarna)</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Żurawie stacjonarne</h4>
              <p className="text-gray-600 mb-4">Kurs przygotowujący do konserwacji żurawi stacjonarnych różnego typu.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy techniczni zajmujący się konserwacją żurawi.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Hybrydowa (teoria online, praktyka stacjonarna)</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Układnice magazynowe</h4>
              <p className="text-gray-600 mb-4">Szkolenie z konserwacji układnic magazynowych stosowanych w nowoczesnych centrach logistycznych.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Personel techniczny zajmujący się konserwacją systemów magazynowych.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Hybrydowa (teoria online, praktyka stacjonarna)</p>
                </div>
              </div>
            </li>
          </ul>
          
          <h3 className="text-2xl font-semibold mb-4">Kontakt i zapisy:</h3>
          <div className="bg-orange-50 p-6 rounded-lg mb-8">
            <p className="mb-4">Oferujemy możliwość organizacji szkoleń na terenie całego kraju, dostosowanych do specyfiki Twojej firmy.</p>
            <p className="mb-4">Organizujemy szkolenia nawet dla jednej osoby - skontaktuj się z nami, aby omówić szczegóły.</p>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Korzyści:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Oszczędność czasu dzięki hybrydowej formie szkolenia</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Szczegółowe materiały szkoleniowe i wsparcie wykładowców</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Praktyczne zajęcia na rzeczywistych urządzeniach</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Kompleksowa obsługa procesu egzaminacyjnego</span>
            </li>
          </ul>
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
          <h3 className="text-2xl font-semibold mb-4">Kategorie uprawnień:</h3>
          <ul className="space-y-6 mb-8">
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Elektryczne (E1, D1)</h4>
              <p className="text-gray-600 mb-4">Uprawnienia do eksploatacji (E1) i dozoru (D1) urządzeń, instalacji i sieci elektroenergetycznych.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Elektrycy, pracownicy utrzymania ruchu, osoby zajmujące się eksploatacją urządzeń elektrycznych.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Stacjonarna, online</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Cieplne (E2, D2)</h4>
              <p className="text-gray-600 mb-4">Uprawnienia do eksploatacji (E2) i dozoru (D2) urządzeń wytwarzających, przetwarzających i zużywających ciepło.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy kotłowni, ciepłowni, zakładów produkcyjnych z urządzeniami cieplnymi.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Stacjonarna, online</p>
                </div>
              </div>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Gazowe (E3, D3)</h4>
              <p className="text-gray-600 mb-4">Uprawnienia do eksploatacji (E3) i dozoru (D3) urządzeń, instalacji i sieci gazowych.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-semibold mb-2">Dla kogo:</h5>
                  <p className="text-gray-600">Pracownicy zakładów z instalacjami gazowymi, serwisanci urządzeń gazowych.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Forma szkolenia:</h5>
                  <p className="text-gray-600">Stacjonarna, online</p>
                </div>
              </div>
            </li>
          </ul>
          
          <h3 className="text-2xl font-semibold mb-4">Korzyści dla firmy:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Podniesienie kwalifikacji pracowników</h4>
              <p>Pracownicy z uprawnieniami SEP mogą samodzielnie wykonywać prace przy urządzeniach, co zwiększa efektywność działania firmy.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Zwiększenie bezpieczeństwa w miejscu pracy</h4>
              <p>Przeszkoleni pracownicy mają większą świadomość zagrożeń i potrafią im zapobiegać.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Zgodność z przepisami</h4>
              <p>Uprawnienia SEP są wymagane przez prawo dla osób obsługujących określone urządzenia.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Redukcja kosztów zewnętrznych usług</h4>
              <p>Pracownicy z uprawnieniami mogą wykonywać prace, które inaczej wymagałyby zatrudnienia zewnętrznych firm.</p>
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
          <h3 className="text-2xl font-semibold mb-4">Opis szkolenia:</h3>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-gray-600 mb-4">
              Nasze szkolenia z lutowania są przeznaczone dla firm z branży elektronicznej, elektrotechnicznej i produkcyjnej, które chcą podnieść kwalifikacje swoich pracowników w zakresie technik lutowania. Szkolenia obejmują zarówno teorię, jak i intensywne zajęcia praktyczne.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-semibold mb-2">Dla kogo:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Pracownicy produkcji zajmujący się lutowaniem</li>
                  <li>• Technolodzy nadzorujący procesy lutowania</li>
                  <li>• Kontrolerzy jakości produktów lutowanych</li>
                  <li>• Inżynierowie procesów produkcyjnych</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cele szkolenia:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Poprawa jakości połączeń lutowanych</li>
                  <li>• Zwiększenie efektywności procesów lutowania</li>
                  <li>• Redukcja błędów i poprawek</li>
                  <li>• Zapoznanie z nowymi technologiami lutowania</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Forma szkolenia:</h4>
              <p className="text-gray-600">
                Szkolenia realizujemy w formie praktycznych zajęć bezpośrednio w siedzibie Państwa firmy lub w naszych specjalistycznych ośrodkach. Program jest dostosowany do specyfiki produkcji i potrzeb konkretnej firmy.
              </p>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Korzyści dla firmy:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Zmniejszenie liczby reklamacji</h4>
              <p>Poprawnie wykonane połączenia lutowane to mniej usterek i reklamacji od klientów.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Oszczędności poprzez redukcję odpadów</h4>
              <p>Mniej błędów to mniej odpadów produkcyjnych i mniej zmarnowanych materiałów.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Zwiększenie wydajności produkcji</h4>
              <p>Wyszkoleni pracownicy pracują szybciej i dokładniej, co zwiększa przepustowość linii produkcyjnych.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Spełnienie standardów jakości</h4>
              <p>Szkolenia uwzględniają międzynarodowe standardy jakości połączeń lutowanych (IPC).</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Zakres tematyczny szkolenia:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Podstawy teoretyczne procesu lutowania</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Materiały lutownicze i topniki - charakterystyka i zastosowanie</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Techniki lutowania ręcznego i automatycznego</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Identyfikacja i zapobieganie typowym defektom</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Kontrola jakości połączeń lutowanych</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Praktyczne ćwiczenia na stanowiskach lutowniczych</span>
            </li>
          </ul>
          
          <h3 className="text-2xl font-semibold mb-4">Kontakt:</h3>
          <div className="bg-orange-50 p-6 rounded-lg">
            <p className="mb-4">Zapraszamy do kontaktu w celu przygotowania indywidualnej oferty szkoleniowej dostosowanej do potrzeb Państwa firmy.</p>
            <p>Możemy przygotować szkolenie zamknięte dla grupy pracowników lub cykliczne szkolenia dla całego zespołu.</p>
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
          <h3 className="text-2xl font-semibold mb-4">Opis wydarzeń:</h3>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-gray-600 mb-4">
              Nasze eventy edukacyjne to zorganizowane wydarzenia, które mają na celu promocję kultury bezpieczeństwa technicznego w firmach produkcyjnych. Organizujemy "Dni bezpieczeństwa technicznego", warsztaty, pokazy i inne formy edukacyjne, które angażują pracowników i podnoszą ich świadomość w zakresie bezpieczeństwa.
            </p>
            <h4 className="font-semibold mb-2">Cel eventu:</h4>
            <p className="text-gray-600 mb-4">
              Głównym celem naszych eventów jest promocja kultury bezpieczeństwa w firmie, zwiększenie zaangażowania pracowników oraz praktyczne przedstawienie zagadnień związanych z bezpieczeństwem technicznym.
            </p>
            <h4 className="font-semibold mb-2">Elementy programu:</h4>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li>• Prelekcje ekspertów z dziedziny bezpieczeństwa technicznego</li>
              <li>• Warsztaty praktyczne z zakresu BHP i obsługi urządzeń</li>
              <li>• Pokazy bezpiecznej eksploatacji urządzeń technicznych</li>
              <li>• Symulacje zagrożeń i ćwiczenia z zakresu reagowania na awarie</li>
              <li>• Konkursy z nagrodami sprawdzające wiedzę uczestników</li>
            </ul>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Korzyści dla firmy i pracowników:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Zwiększenie zaangażowania</h4>
              <p>Interaktywna forma przekazywania wiedzy zwiększa zaangażowanie pracowników w kwestie bezpieczeństwa.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Poprawa bezpieczeństwa pracy</h4>
              <p>Świadomi pracownicy popełniają mniej błędów, co przekłada się na mniejszą liczbę wypadków.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Budowanie kultury organizacyjnej</h4>
              <p>Eventy integrują pracowników i budują pozytywną kulturę organizacyjną zorientowaną na bezpieczeństwo.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Praktyczny wymiar szkoleń</h4>
              <p>Eventy pozwalają na przekazanie praktycznej wiedzy w atrakcyjnej formie, co zwiększa jej przyswajanie.</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Przykładowe formaty eventów:</h3>
          <ul className="space-y-6 mb-8">
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Dzień Bezpieczeństwa Technicznego</h4>
              <p className="text-gray-600">Całodniowe wydarzenie obejmujące szereg aktywności: prelekcje, warsztaty, pokazy, konkursy. Może być organizowane cyklicznie, np. raz do roku.</p>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Warsztaty tematyczne</h4>
              <p className="text-gray-600">Krótsze wydarzenia poświęcone konkretnym zagadnieniom, np. bezpieczeństwo przy obsłudze suwnic, zapobieganie porażeniom prądem elektrycznym.</p>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Roadshow bezpieczeństwa</h4>
              <p className="text-gray-600">Seria mniejszych wydarzeń organizowanych w różnych lokalizacjach firmy, np. w różnych zakładach produkcyjnych.</p>
            </li>
            <li className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Konkursy i kampanie edukacyjne</h4>
              <p className="text-gray-600">Długoterminowe działania angażujące pracowników, np. konkursy wiedzy, kampanie plakatowe, akcje "zgłoś zagrożenie".</p>
            </li>
          </ul>
          
          <h3 className="text-2xl font-semibold mb-4">Kontakt i organizacja:</h3>
          <div className="bg-orange-50 p-6 rounded-lg">
            <p className="mb-4">Każdy event jest dostosowany do indywidualnych potrzeb i specyfiki firmy. Współpracujemy z klientem na każdym etapie organizacji, od planowania po realizację.</p>
            <p>Zapraszamy do kontaktu w celu omówienia szczegółów i przygotowania oferty dopasowanej do Państwa potrzeb.</p>
          </div>
        </div>
      ),
      faqItems: [
        {
          question: "Ile czasu potrzeba na organizację eventu edukacyjnego?",
          answer: "Przygotowanie profesjonalnego eventu wymaga zwykle od 4 do 8 tygodni, w zależności od jego skali i złożoności. Im wcześniej rozpoczniemy współpracę, tym lepiej będziemy mogli dostosować program do potrzeb firmy."
        },
        {
          question: "Czy eventy mogą być organizowane poza godzinami pracy?",
          answer: "Tak, możemy zorganizować event zarówno w godzinach pracy, jak i poza nimi, np. w weekend. Elastycznie dostosowujemy się do preferencji klienta."
        },
        {
          question: "Jaka jest minimalna liczba uczestników eventu?",
          answer: "Nie ma sztywno określonej minimalnej liczby uczestników. Organizowaliśmy już eventy zarówno dla małych grup (20-30 osób), jak i dla dużych zakładów produkcyjnych (kilkaset osób)."
        },
        {
          question: "Czy zapewniacie sprzęt i materiały potrzebne do realizacji eventu?",
          answer: "Tak, zapewniamy wszelkie niezbędne materiały, sprzęt demonstracyjny, materiały edukacyjne i promocyjne. Na życzenie klienta możemy również zapewnić catering, fotografa, czy branding eventu."
        }
      ]
    }
  };
  
  const serviceInfo = servicesData[serviceId || ''] || {
    title: 'Usługa niedostępna',
    description: 'Przepraszamy, żądana usługa nie jest dostępna.',
    image: '/path/to/default-image.jpg',
    content: <p>Nie znaleziono informacji o żądanej usłudze.</p>,
    faqItems: []
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button asChild variant="ghost" className="mb-4 text-white hover:bg-orange-600">
              <Link to="/uslugi"><ArrowLeft className="mr-2 h-4 w-4" /> Powrót do usług</Link>
            </Button>
            <h1 className="text-4xl font-bold mb-6">{serviceInfo.title}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {serviceInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceInfo.content}
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/wycena">Uzyskaj Błyskawiczną Wycenę</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {serviceInfo.faqItems.length > 0 && (
        <FAQ 
          title={`Najczęściej zadawane pytania o ${serviceInfo.title}`} 
          items={serviceInfo.faqItems} 
        />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Potrzebujesz więcej informacji?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Skontaktuj się z nami, aby uzyskać szczegółowe informacje dotyczące naszych szkoleń i dopasować je do potrzeb Twojej firmy.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button asChild size="lg">
              <Link to="/kontakt">Skontaktuj się z nami</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/bezplatny-audyt">Zamów bezpłatny audyt</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
