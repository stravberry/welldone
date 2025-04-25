
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dataLayer for GTM
window.dataLayer = window.dataLayer || [];

createRoot(document.getElementById("root")!).render(<App />);
