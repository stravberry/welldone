import React, { useState, useCallback } from 'react';
import { Play } from 'lucide-react';

interface LazyYouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

const LazyYouTubeEmbed: React.FC<LazyYouTubeEmbedProps> = ({ 
  videoId, 
  title, 
  className = "" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (isLoaded) {
    return (
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        className={`w-full h-full border-none ${className}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  return (
    <div 
      className={`w-full h-full bg-black rounded-xl overflow-hidden cursor-pointer relative group ${className}`}
      onClick={handleClick}
    >
      {/* Thumbnail with optimized loading */}
      <img 
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300">
        <div className="bg-red-600 rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-all duration-300">
          <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
        </div>
      </div>
      
      {/* Click hint */}
      <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-90">
        Kliknij aby odtworzyć
      </div>
    </div>
  );
};

export default LazyYouTubeEmbed;