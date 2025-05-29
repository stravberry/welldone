
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Start transition sequence
    setIsLoading(true);
    setIsContentVisible(false);
    
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
    // Step 1: Fade out current content (0-150ms)
    // Step 2: Show crossfade overlay (150-300ms)
    const crossfadeTimer = setTimeout(() => {
      // Step 3: Start fading in new content (300-400ms)
      setIsContentVisible(true);
    }, 300);
    
    // Complete transition
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    
    return () => {
      clearTimeout(crossfadeTimer);
      clearTimeout(completeTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Crossfade overlay with loading spinner */}
      <div 
        className={`fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 transition-all duration-300 ease-out ${
          isLoading 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
        </div>
      </div>
      
      {/* Page content with crossfade + subtle slide */}
      <div 
        className={`transition-all duration-400 ease-out ${
          isContentVisible && !isLoading
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-[-10px]'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransition;
