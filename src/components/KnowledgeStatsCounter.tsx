
import React from 'react';
import { useCounterAnimation } from '@/hooks/useScrollAnimation';
import { Youtube, PlayCircle, Users } from 'lucide-react';

interface KnowledgeStatsCounterProps {
  stats: {
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  };
}

const KnowledgeStatsCounter: React.FC<KnowledgeStatsCounterProps> = ({ stats }) => {
  const parseNumber = (str: string) => parseInt(str.replace(/,/g, ''));
  
  const { elementRef: subsRef, count: subsCount } = useCounterAnimation<HTMLDivElement>(parseNumber(stats.subscriberCount), 2000);
  const { elementRef: videosRef, count: videosCount } = useCounterAnimation<HTMLDivElement>(parseNumber(stats.videoCount), 1500);
  const { elementRef: viewsRef, count: viewsCount } = useCounterAnimation<HTMLDivElement>(parseNumber(stats.viewCount), 2500);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString('pl-PL');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Nasz kanał YouTube</h3>
        <p className="text-gray-600">Dołącz do tysięcy profesjonalistów, którzy rozwijają swoje umiejętności z nami</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div ref={subsRef} className="text-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
          <Users className="mx-auto mb-2 text-red-600" size={32} />
          <div className="text-2xl font-bold text-red-600">{formatNumber(subsCount)}</div>
          <div className="text-sm text-gray-600">Subskrybentów</div>
        </div>
        
        <div ref={videosRef} className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <PlayCircle className="mx-auto mb-2 text-blue-600" size={32} />
          <div className="text-2xl font-bold text-blue-600">{formatNumber(videosCount)}</div>
          <div className="text-sm text-gray-600">Filmów</div>
        </div>
        
        <div ref={viewsRef} className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <Youtube className="mx-auto mb-2 text-green-600" size={32} />
          <div className="text-2xl font-bold text-green-600">{formatNumber(viewsCount)}</div>
          <div className="text-sm text-gray-600">Wyświetleń</div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeStatsCounter;
