
import React from 'react';

const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300/30 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-purple-300/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-yellow-300/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-red-300/30 rounded-full animate-float" style={{ animationDelay: '5s' }} />
    </div>
  );
};

export default FloatingParticles;
