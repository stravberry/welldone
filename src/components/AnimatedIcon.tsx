
import React from 'react';
import { Award, Lightbulb, Heart, Shield, Users, Handshake } from 'lucide-react';

interface AnimatedIconProps {
  type: 'award' | 'lightbulb' | 'heart' | 'shield' | 'users' | 'handshake';
  size?: number;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ type, size = 120, className = '' }) => {
  const iconMap = {
    award: Award,
    lightbulb: Lightbulb,
    heart: Heart,
    shield: Shield,
    users: Users,
    handshake: Handshake
  };

  const Icon = iconMap[type];

  return (
    <div className={`relative ${className}`}>
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-2xl opacity-60 animate-pulse scale-150" />
      <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-40 animate-ping" />
      
      {/* Main icon container */}
      <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-8 rounded-full shadow-2xl">
        <Icon 
          size={size} 
          className="text-white animate-bounce drop-shadow-lg" 
          style={{ 
            animationDuration: '2s',
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
          }}
        />
      </div>
      
      {/* Orbiting particles */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-300 rounded-full opacity-70 animate-pulse" />
        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-2 h-2 bg-yellow-300 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-2 h-2 bg-red-300 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
};

export default AnimatedIcon;
