import React from 'react';

// This component inlines critical CSS for above-the-fold content
const CriticalCSS: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical hero section styles */
        .hero-gradient {
          background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
        }
        
        /* Critical button styles */
        .btn-primary {
          background: #ffffff;
          color: #ea580c;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          background: #fef7f0;
          transform: translateY(-1px);
        }
        
        /* Critical layout */
        .container-critical {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        /* Optimized fade animations */
        .fade-in-critical {
          animation: fadeInCritical 0.6s ease-out;
        }
        
        @keyframes fadeInCritical {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `
    }} />
  );
};

export default CriticalCSS;