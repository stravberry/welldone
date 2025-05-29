
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Youtube } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import KnowledgeStatsCounter from '@/components/KnowledgeStatsCounter';
import KnowledgeLoadingSkeleton from '@/components/KnowledgeLoadingSkeleton';
import KnowledgeHeroSection from '@/components/KnowledgeHeroSection';
import KnowledgeNewsletterSection from '@/components/KnowledgeNewsletterSection';
import KnowledgeCTASection from '@/components/KnowledgeCTASection';
import KnowledgeVideosTab from '@/components/KnowledgeVideosTab';
import KnowledgeBlogTab from '@/components/KnowledgeBlogTab';
import KnowledgeTestsTab from '@/components/KnowledgeTestsTab';
import KnowledgeGuidesTab from '@/components/KnowledgeGuidesTab';

const KnowledgePage = () => {
  const { channelStats, loading, error } = useYouTubeVideos();
  const { elementRef: tabsRef, isInView: tabsInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

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
      <KnowledgeHeroSection />

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
            
            <TabsContent value="videos">
              <KnowledgeVideosTab />
            </TabsContent>
            
            <TabsContent value="blog">
              <KnowledgeBlogTab />
            </TabsContent>
            
            <TabsContent value="tests">
              <KnowledgeTestsTab />
            </TabsContent>
            
            <TabsContent value="guides">
              <KnowledgeGuidesTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <KnowledgeNewsletterSection />
      <KnowledgeCTASection />
    </div>
  );
};

export default KnowledgePage;
