
import React from 'react';
import { Link } from 'react-router-dom';

const CMSLoginPanel = () => {
  return (
    <div className="bg-gray-900 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link 
          to="/cms-login" 
          className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
        >
          System CMS
        </Link>
      </div>
    </div>
  );
};

export default CMSLoginPanel;
