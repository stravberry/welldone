
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, Eye } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface KnowledgeVideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    duration: string;
    viewCount: string;
    url: string;
  };
  index: number;
}

const KnowledgeVideoCard: React.FC<KnowledgeVideoCardProps> = ({ video, index }) => {
  const { elementRef, isInView } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card 
      ref={elementRef}
      className={`h-full flex flex-col group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${
        isInView ? 'animate-fade-in opacity-100' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-t-lg">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
          {video.duration}
        </div>
        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          <Eye size={12} />
          <span>{video.viewCount}</span>
        </div>
      </div>
      <CardHeader className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-xs">Film</Badge>
          <span className="text-xs text-gray-500">{formatDate(video.publishedAt)}</span>
        </div>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
          {video.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {video.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline" className="w-full group-hover:bg-orange-50 group-hover:border-orange-200">
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            Obejrzyj na YouTube <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KnowledgeVideoCard;
