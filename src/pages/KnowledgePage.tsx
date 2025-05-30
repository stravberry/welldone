
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnowledgeHeroSection from '@/components/KnowledgeHeroSection';
import KnowledgeVideosTab from '@/components/KnowledgeVideosTab';
import KnowledgeBlogTab from '@/components/KnowledgeBlogTab';
import KnowledgeGuidesTab from '@/components/KnowledgeGuidesTab';
import KnowledgeTestsTab from '@/components/KnowledgeTestsTab';
import KnowledgeNewsletterSection from '@/components/KnowledgeNewsletterSection';
import KnowledgeCTASection from '@/components/KnowledgeCTASection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const KnowledgePage = () => {
  return (
    <div>
      <Navbar />
      <KnowledgeHeroSection />
      
      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="videos" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-4 lg:max-w-lg lg:grid-cols-4">
                <TabsTrigger value="videos" className="text-sm lg:text-base">Filmy</TabsTrigger>
                <TabsTrigger value="blog" className="text-sm lg:text-base">Blog</TabsTrigger>
                <TabsTrigger value="guides" className="text-sm lg:text-base">Poradniki</TabsTrigger>
                <TabsTrigger value="tests" className="text-sm lg:text-base">Testy</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="videos">
              <KnowledgeVideosTab />
            </TabsContent>
            
            <TabsContent value="blog">
              <KnowledgeBlogTab />
            </TabsContent>
            
            <TabsContent value="guides">
              <KnowledgeGuidesTab />
            </TabsContent>
            
            <TabsContent value="tests">
              <KnowledgeTestsTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <KnowledgeNewsletterSection />
      <KnowledgeCTASection />
      <Footer />
    </div>
  );
};

export default KnowledgePage;
