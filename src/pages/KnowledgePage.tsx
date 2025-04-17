
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Youtube, Book, ExternalLink } from 'lucide-react';

const KnowledgePage = () => {
  const blogPosts = [
    {
      title: "Najważniejsze zmiany w przepisach UDT na rok 2023",
      description: "Poznaj najważniejsze zmiany w przepisach UDT, które weszły w życie w 2023 roku i mają wpływ na firmy produkcyjne.",
      date: "10.03.2023",
      category: "Przepisy",
      image: "",
      link: "/wiedza/blog/1"
    },
    {
      title: "Jak przygotować się do egzaminu SEP - praktyczne wskazówki",
      description: "Sprawdzone metody i wskazówki, które pomogą w skutecznym przygotowaniu się do egzaminu SEP.",
      date: "25.04.2023",
      category: "Porady",
      image: "",
      link: "/wiedza/blog/2"
    },
    {
      title: "Bezpieczeństwo przy obsłudze suwnic - najczęstsze błędy",
      description: "Analiza najczęstszych błędów popełnianych podczas obsługi suwnic i sposoby ich unikania.",
      date: "15.06.2023",
      category: "Bezpieczeństwo",
      image: "",
      link: "/wiedza/blog/3"
    },
    {
      title: "Jak zoptymalizować koszty szkoleń w dużej firmie produkcyjnej",
      description: "Praktyczne metody optymalizacji kosztów szkoleń bez obniżania ich jakości i efektywności.",
      date: "30.07.2023",
      category: "Zarządzanie",
      image: "",
      link: "/wiedza/blog/4"
    },
    {
      title: "Wózki widłowe - nowe technologie i ich wpływ na szkolenia",
      description: "Jak nowe technologie w wózkach widłowych wpływają na programy szkoleniowe i wymagane umiejętności operatorów.",
      date: "12.09.2023",
      category: "Technologie",
      image: "",
      link: "/wiedza/blog/5"
    },
    {
      title: "Hybrydowe formy szkoleń - wady i zalety",
      description: "Analiza zalet i wad hybrydowych form szkoleń łączących elementy nauki online i stacjonarnej.",
      date: "05.11.2023",
      category: "Metodyka",
      image: "",
      link: "/wiedza/blog/6"
    }
  ];
  
  const videos = [
    {
      title: "Przygotowanie do egzaminu UDT - wózki widłowe",
      description: "Kompleksowy poradnik wideo pokazujący, jak przygotować się do egzaminu UDT na wózki widłowe.",
      duration: "15:24",
      thumbnail: "",
      link: "https://youtube.com/watch?v=example1"
    },
    {
      title: "Praktyczne aspekty obsługi suwnic",
      description: "Pokaz praktycznych aspektów obsługi suwnic z komentarzem eksperta.",
      duration: "18:36",
      thumbnail: "",
      link: "https://youtube.com/watch?v=example2"
    },
    {
      title: "Bezpieczeństwo przy pracach elektrycznych - uprawnienia SEP",
      description: "Omówienie kluczowych aspektów bezpieczeństwa przy pracach elektrycznych w kontekście uprawnień SEP.",
      duration: "22:15",
      thumbnail: "",
      link: "https://youtube.com/watch?v=example3"
    },
    {
      title: "Jak skutecznie zarządzać szkoleniami w dużej firmie produkcyjnej",
      description: "Wywiad z ekspertem HR na temat zarządzania procesami szkoleniowymi w firmach produkcyjnych.",
      duration: "28:42",
      thumbnail: "",
      link: "https://youtube.com/watch?v=example4"
    }
  ];
  
  const tests = [
    {
      title: "Test przygotowawczy - Wózki widłowe",
      description: "Test zawierający 20 pytań podobnych do tych, które mogą pojawić się na egzaminie UDT dla operatorów wózków widłowych.",
      questions: 20,
      difficulty: "Średni",
      link: "https://testy.well-done.pl/test-wozki-widlowe"
    },
    {
      title: "Test przygotowawczy - Suwnice",
      description: "Zestaw pytań testowych dla kandydatów przygotowujących się do egzaminu na uprawnienia do obsługi suwnic.",
      questions: 25,
      difficulty: "Zaawansowany",
      link: "https://testy.well-done.pl/test-suwnice"
    },
    {
      title: "Test przygotowawczy - SEP E1",
      description: "Przykładowy test sprawdzający wiedzę z zakresu uprawnień SEP E1 (eksploatacja urządzeń elektrycznych).",
      questions: 30,
      difficulty: "Zaawansowany",
      link: "https://testy.well-done.pl/test-sep-e1"
    },
    {
      title: "Test przygotowawczy - SEP E2",
      description: "Zestaw pytań przygotowujących do egzaminu na uprawnienia SEP E2 (urządzenia cieplne).",
      questions: 25,
      difficulty: "Średni",
      link: "https://testy.well-done.pl/test-sep-e2"
    }
  ];
  
  const guides = [
    {
      title: "Kompendium wiedzy operatora wózka widłowego",
      description: "Kompleksowy przewodnik zawierający wszystkie niezbędne informacje dla operatorów wózków widłowych.",
      pages: 45,
      format: "PDF",
      link: "/files/kompendium-wozki-widlowe.pdf"
    },
    {
      title: "Poradnik przygotowania do egzaminu SEP",
      description: "Przewodnik krok po kroku, jak skutecznie przygotować się do egzaminu SEP i uzyskać uprawnienia.",
      pages: 32,
      format: "PDF",
      link: "/files/poradnik-sep.pdf"
    },
    {
      title: "Przewodnik BHP dla firm produkcyjnych",
      description: "Kompendium wiedzy z zakresu BHP dostosowane do specyfiki firm produkcyjnych.",
      pages: 60,
      format: "PDF",
      link: "/files/przewodnik-bhp.pdf"
    },
    {
      title: "Słownik pojęć technicznych związanych z urządzeniami transportu bliskiego",
      description: "Słownik zawierający definicje i wyjaśnienia pojęć związanych z urządzeniami transportu bliskiego.",
      pages: 25,
      format: "PDF",
      link: "/files/slownik-udt.pdf"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Strefa Wiedzy</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Znajdź praktyczne poradniki, testy przygotowawcze i materiały, które pomogą Ci skutecznie przygotować się do egzaminów UDT i SEP oraz podnieść swoje kompetencje zawodowe.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="blog" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="blog" className="text-sm md:text-base">Blog</TabsTrigger>
                <TabsTrigger value="videos" className="text-sm md:text-base">Poradniki wideo</TabsTrigger>
                <TabsTrigger value="tests" className="text-sm md:text-base">Testy UDT i SEP</TabsTrigger>
                <TabsTrigger value="guides" className="text-sm md:text-base">E-booki i poradniki</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Blog Posts */}
            <TabsContent value="blog">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <Card key={index} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <Link to={post.link}>
                          Czytaj więcej <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="default">
                  <Link to="/wiedza/blog">Zobacz wszystkie artykuły</Link>
                </Button>
              </div>
            </TabsContent>
            
            {/* Videos */}
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video, index) => (
                  <Card key={index} className="h-full flex flex-col">
                    <div className="aspect-video bg-gray-100 relative">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50">
                          <Youtube size={48} className="text-blue-500" />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <a href={video.link} target="_blank" rel="noopener noreferrer">
                          Obejrzyj na YouTube <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="default">
                  <a href="https://www.youtube.com/@operator-osz" target="_blank" rel="noopener noreferrer">
                    Odwiedź nasz kanał YouTube
                  </a>
                </Button>
              </div>
            </TabsContent>
            
            {/* Tests */}
            <TabsContent value="tests">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tests.map((test, index) => (
                  <Card key={index} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">Pytań: {test.questions}</Badge>
                        <Badge 
                          variant={test.difficulty === "Łatwy" ? "outline" : test.difficulty === "Średni" ? "secondary" : "default"}
                          className={
                            test.difficulty === "Łatwy" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : test.difficulty === "Średni" 
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {test.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{test.title}</CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <a href={test.link} target="_blank" rel="noopener noreferrer">
                          Rozpocznij test <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="default">
                  <a href="https://testy.well-done.pl/" target="_blank" rel="noopener noreferrer">
                    Zobacz wszystkie testy
                  </a>
                </Button>
              </div>
            </TabsContent>
            
            {/* Guides */}
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide, index) => (
                  <Card key={index} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{guide.format}</Badge>
                        <Badge variant="secondary">{guide.pages} stron</Badge>
                      </div>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <a href={guide.link} target="_blank" rel="noopener noreferrer">
                          Pobierz poradnik <FileText className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="default">
                  <Link to="/wiedza/poradniki">
                    Zobacz wszystkie poradniki
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Zapisz się do newslettera</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Bądź na bieżąco z najnowszymi zmianami w przepisach, poradami dotyczącymi szkoleń i aktualnościami z branży.
              </p>
            </div>
            <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit">
                Zapisz się
              </Button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              Zapisując się, zgadzasz się na otrzymywanie od nas wiadomości e-mail. Możesz zrezygnować w dowolnym momencie.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Potrzebujesz indywidualnego wsparcia?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Skontaktuj się z nami, aby skonsultować swoje potrzeby szkoleniowe lub umówić się na bezpłatny audyt.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/kontakt">Skontaktuj się z nami</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-blue-700">
              <Link to="/bezplatny-audyt">Zamów bezpłatny audyt</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgePage;
