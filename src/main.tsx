
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure dataLayer is properly initialized before React
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer for GTM safely
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
