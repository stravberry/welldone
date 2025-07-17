
import React from 'react';
import { Navigate } from 'react-router-dom';

const KnowledgePage = () => {
  // Redirect to the new blog page
  return <Navigate to="/strefa-wiedzy" replace />;
};

export default KnowledgePage;
