import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, FileText, Youtube, Book, ExternalLink, Search, Play, Star, TrendingUp } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import KnowledgeVideoCard from '@/components/KnowledgeVideoCard';
import KnowledgeStatsCounter from '@/components/KnowledgeStatsCounter';
import KnowledgeLoadingSkeleton from '@/components/KnowledgeLoadingSkeleton';

const KnowledgePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { videos, channelStats, loading, error } = useYouTubeVideos();
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { elementRef: tabsRef, isInView: tabsInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { elementRef: blogRef, visibleItems: visibleBlogItems } = useStaggeredAnimation<HTMLDivElement>(6, 150);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Wystąpił błąd</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white opacity-5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-center mb-4">
                <Star className="mr-2" size={32} />
                <h1 className="text-5xl md:text-6xl font-bold">Strefa Wiedzy</h1>
                <Star className="ml-2" size={32} />
              </div>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 leading-relaxed">
                Odkryj praktyczne poradniki, obejrzyj najnowsze filmy szkoleniowe i przetestuj swoją wiedzę 
                z zakresu UDT i SEP. Wszystko w jednym miejscu!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold">
                  <Play className="mr-2" size={20} />
                  Obejrzyj najnowsze filmy
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold">
                  <TrendingUp className="mr-2" size={20} />
                  Zobacz popularne treści
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Stats Section */}
      {loading ? (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <KnowledgeLoadingSkeleton />
          </div>
        </section>
      ) : (
        channelStats && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <KnowledgeStatsCounter stats={channelStats} />
            </div>
          </section>
        )
      )}

      {/* Enhanced Tabs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="videos" className="w-full">
            <div 
              ref={tabsRef}
              className={`flex justify-center mb-8 transition-all duration-700 ${
                tabsInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="videos" className="text-sm md:text-base font-medium">
                  <Youtube className="mr-2" size={16} />
                  Filmy YouTube
                </TabsTrigger>
                <TabsTrigger value="blog" className="text-sm md:text-base font-medium">Blog</TabsTrigger>
                <TabsTrigger value="tests" className="text-sm md:text-base font-medium">Testy</TabsTrigger>
                <TabsTrigger value="guides" className="text-sm md:text-base font-medium">E-booki</TabsTrigger>
              </TabsList>
            </div>
            
            {/* YouTube Videos Tab */}
            <TabsContent value="videos">
              <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Szukaj filmów..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-orange-500 rounded-lg"
                  />
                </div>
              </div>

              {loading ? (
                <KnowledgeLoadingSkeleton />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredVideos.map((video, index) => (
                      <KnowledgeVideoCard key={video.id} video={video} index={index} />
                    ))}
                  </div>
                  
                  {filteredVideos.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">Nie znaleziono filmów pasujących do frazy "{searchTerm}"</p>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                      <a href="https://www.youtube.com/@Well-Done.Szkolenia" target="_blank" rel="noopener noreferrer">
                        <Youtube className="mr-2" size={20} />
                        Odwiedź nasz kanał YouTube
                      </a>
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
            
            {/* Blog Posts */}
            <TabsContent value="blog">
              <div ref={blogRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <Card 
                    key={index} 
                    className={`h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                      visibleBlogItems.includes(index) ? 'animate-fade-in opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <CardTitle className="text-xl hover:text-orange-600 transition-colors">{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button asChild variant="outline" className="w-full hover:bg-orange-50 hover:border-orange-200">
                        <Link to={post.link}>
                          Czytaj więcej <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="default" size="lg">
                  <Link to="/wiedza/blog">Zobacz wszystkie artykuły</Link>
                </Button>
              </div>
            </TabsContent>
            
            {/* Tests */}
            <TabsContent value="tests">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tests.map((test, index) => (
                  <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
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
                      <CardTitle className="text-xl hover:text-orange-600 transition-colors">{test.title}</CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button asChild variant="outline" className="w-full hover:bg-orange-50 hover:border-orange-200">
                        <a href={test.link} target="_blank" rel="noopener noreferrer">
                          Rozpocznij test <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="default" size="lg">
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
                  <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{guide.format}</Badge>
                        <Badge variant="secondary">{guide.pages} stron</Badge>
                      </div>
                      <CardTitle className="text-xl hover:text-orange-600 transition-colors">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button asChild variant="outline" className="w-full hover:bg-orange-50 hover:border-orange-200">
                        <a href={guide.link} target="_blank" rel="noopener noreferrer">
                          Pobierz poradnik <FileText className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="default" size="lg">
                  <Link to="/wiedza/poradniki">
                    Zobacz wszystkie poradniki
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-orange-100 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Nie przegap najnowszych treści!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Bądź na bieżąco z najnowszymi filmami, zmianami w przepisach i praktycznymi poradami. 
                Otrzymuj powiadomienia o nowych treściach prosto na swoją skrzynkę.
              </p>
            </div>
            <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 max-w-lg mx-auto relative z-10">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                className="flex-grow px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <Button type="submit" size="lg" className="bg-orange-600 hover:bg-orange-700 font-semibold">
                Zapisz się
              </Button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4 relative z-10">
              Zapisując się, zgadzasz się na otrzymywanie od nas wiadomości e-mail. Możesz zrezygnować w dowolnym momencie.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Potrzebujesz indywidualnego wsparcia?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Skontaktuj się z nami, aby skonsultować swoje potrzeby szkoleniowe lub umówić się na bezpłatny audyt. 
            Pomożemy Ci wybrać najlepsze rozwiązania dla Twojej firmy.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold hover:scale-105 transition-all">
              <Link to="/kontakt">Skontaktuj się z nami</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white hover:bg-white hover:text-orange-600 font-semibold hover:scale-105 transition-all">
              <Link to="/bezplatny-audyt">Zamów bezpłatny audyt</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgePage;
