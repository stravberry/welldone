
import React from 'react';
import { Award, Lightbulb, Heart, Shield } from 'lucide-react';

interface AnimatedIconProps {
  type: 'award' | 'lightbulb' | 'heart' | 'shield';
  size?: number;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ type, size = 48, className = '' }) => {
  const iconMap = {
    award: Award,
    lightbulb: Lightbulb,
    heart: Heart,
    shield: Shield
  };

  const Icon = iconMap[type];

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-lg opacity-50 animate-pulse" />
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full">
        <Icon 
          size={size} 
          className="text-white animate-bounce" 
          style={{ animationDuration: '2s' }}
        />
      </div>
    </div>
  );
};

export default AnimatedIcon;
