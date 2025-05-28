
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Video, Edit } from 'lucide-react';
import type { PageBlock } from '../types';

interface VideoBlockProps {
  block: PageBlock;
  onUpdate: (updates: Partial<PageBlock>) => void;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ block, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(block.content.url || '');

  const handleSave = () => {
    onUpdate({
      content: { 
        ...block.content, 
        url: videoUrl,
        embedUrl: getEmbedUrl(videoUrl)
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setVideoUrl(block.content.url || '');
    setIsEditing(false);
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="URL video (YouTube, Vimeo)"
        />
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleSave}>
            Zapisz
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            Anuluj
          </Button>
        </div>
      </div>
    );
  }

  if (!block.content.embedUrl) {
    return (
      <div className="group relative">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Kliknij aby dodać video</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className="aspect-video">
        <iframe
          src={block.content.embedUrl}
          className="w-full h-full rounded"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VideoBlock;
