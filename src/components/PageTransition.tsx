
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start loading animation
    setIsLoading(true);
    
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
    // End loading animation after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Loading overlay with blur effect */}
      <div 
        className={`fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 transition-all duration-300 ${
          isLoading 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
      
      {/* Page content with fade transition */}
      <div 
        className={`transition-all duration-500 ${
          isLoading 
            ? 'opacity-0 blur-sm scale-105' 
            : 'opacity-100 blur-0 scale-100'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransition;
