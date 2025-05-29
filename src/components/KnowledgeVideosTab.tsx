
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube, Search } from 'lucide-react';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import KnowledgeVideoCard from '@/components/KnowledgeVideoCard';
import KnowledgeLoadingSkeleton from '@/components/KnowledgeLoadingSkeleton';

const KnowledgeVideosTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { videos, loading } = useYouTubeVideos();

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <KnowledgeLoadingSkeleton />;
  }

  return (
    <div>
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
    </div>
  );
};

export default KnowledgeVideosTab;
