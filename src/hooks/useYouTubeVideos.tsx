
import { useState, useEffect } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  url: string;
}

interface YouTubeChannelStats {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

// Mock data that simulates real YouTube API responses
const mockVideos: YouTubeVideo[] = [
  {
    id: "1",
    title: "Przygotowanie do egzaminu UDT - wózki widłowe 2024",
    description: "Kompleksowy poradnik wideo pokazujący, jak przygotować się do egzaminu UDT na wózki widłowe. Omówimy wszystkie najważniejsze zagadnienia.",
    thumbnail: "/lovable-uploads/f9dc5911-3540-4c1c-91a0-f031a4e94698.png",
    publishedAt: "2024-01-15",
    duration: "15:24",
    viewCount: "12,543",
    url: "https://youtube.com/watch?v=example1"
  },
  {
    id: "2",
    title: "Praktyczne aspekty obsługi suwnic - nowe przepisy",
    description: "Pokaz praktycznych aspektów obsługi suwnic z komentarzem eksperta. Najnowsze zmiany w przepisach UDT.",
    thumbnail: "/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png",
    publishedAt: "2024-01-10",
    duration: "18:36",
    viewCount: "8,921",
    url: "https://youtube.com/watch?v=example2"
  },
  {
    id: "3",
    title: "Bezpieczeństwo przy pracach elektrycznych - uprawnienia SEP",
    description: "Omówienie kluczowych aspektów bezpieczeństwa przy pracach elektrycznych w kontekście uprawnień SEP.",
    thumbnail: "/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png",
    publishedAt: "2024-01-05",
    duration: "22:15",
    viewCount: "15,678",
    url: "https://youtube.com/watch?v=example3"
  },
  {
    id: "4",
    title: "Jak skutecznie zarządzać szkoleniami w firmie",
    description: "Wywiad z ekspertem HR na temat zarządzania procesami szkoleniowymi w firmach produkcyjnych.",
    thumbnail: "/lovable-uploads/657768d6-dc5a-419b-80b8-b664af6c6775.png",
    publishedAt: "2023-12-28",
    duration: "28:42",
    viewCount: "6,432",
    url: "https://youtube.com/watch?v=example4"
  },
  {
    id: "5",
    title: "Nowe technologie w wózkach widłowych 2024",
    description: "Przegląd najnowszych technologii stosowanych w wózkach widłowych i ich wpływ na szkolenia operatorów.",
    thumbnail: "/lovable-uploads/e53f9387-8eab-484e-95d8-dae5efb914a0.png",
    publishedAt: "2023-12-20",
    duration: "16:28",
    viewCount: "9,876",
    url: "https://youtube.com/watch?v=example5"
  },
  {
    id: "6",
    title: "Przygotowanie do egzaminu SEP - praktyczne wskazówki",
    description: "Sprawdzone metody i wskazówki, które pomogą w skutecznym przygotowaniu się do egzaminu SEP.",
    thumbnail: "/lovable-uploads/2d3fe45c-4078-43ab-b479-ea144210537f.png",
    publishedAt: "2023-12-15",
    duration: "19:33",
    viewCount: "11,234",
    url: "https://youtube.com/watch?v=example6"
  }
];

const mockChannelStats: YouTubeChannelStats = {
  subscriberCount: "2,543",
  videoCount: "127",
  viewCount: "89,432"
};

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [channelStats, setChannelStats] = useState<YouTubeChannelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setVideos(mockVideos);
        setChannelStats(mockChannelStats);
        setError(null);
      } catch (err) {
        setError('Błąd podczas pobierania filmów z YouTube');
        console.error('YouTube API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, channelStats, loading, error };
};
