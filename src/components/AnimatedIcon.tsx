
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
      {/* Simple background circle */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-6 rounded-full shadow-lg">
        <Icon 
          size={size} 
          className="text-white" 
        />
      </div>
    </div>
  );
};

export default AnimatedIcon;
