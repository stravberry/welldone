
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import PageTransition from './components/PageTransition';
import RouteChangeTracker from './components/RouteChangeTracker';
import CMSLoginPage from './pages/CMSLoginPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FreeAuditPage from './pages/FreeAuditPage';
import QuotePage from './pages/QuotePage';
import RealizationsPage from './pages/RealizationsPage';
import KnowledgePage from './pages/KnowledgePage';
import WozkiUnoszacePage from './pages/WozkiUnoszacePage';
import UdtOperatorzyPage from './pages/UdtOperatorzyPage';
import UdtSzkoleniaPage from './pages/UdtSzkoleniaPage';
import UdtKonserwatorzePage from './pages/UdtKonserwatorzePage';
import SepPage from './pages/SepPage';
import LutowaniePage from './pages/LutowaniePage';
import EventyPage from './pages/EventyPage';
import SitemapPage from './pages/SitemapPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFound from './pages/NotFound';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ContentStudio from './pages/admin/ContentStudio';
import Dashboard from './pages/admin/Dashboard';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <RouteChangeTracker />
            <PageTransition>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/kontakt" element={<ContactPage />} />
                <Route path="/o-nas" element={<AboutPage />} />
                <Route path="/uslugi" element={<ServicesPage />} />
                <Route path="/bezplatny-audyt" element={<FreeAuditPage />} />
                <Route path="/wycena" element={<QuotePage />} />
                <Route path="/realizacje" element={<RealizationsPage />} />
                <Route path="/wiedza" element={<KnowledgePage />} />
                
                {/* Service Subpages */}
                <Route path="/uslugi/udt-operatorzy" element={<UdtOperatorzyPage />} />
                <Route path="/udt-szkolenia" element={<UdtSzkoleniaPage />} />
                <Route path="/udt-konserwatorze" element={<UdtKonserwatorzePage />} />
                <Route path="/sep" element={<SepPage />} />
                <Route path="/lutowanie" element={<LutowaniePage />} />
                <Route path="/eventy" element={<EventyPage />} />
                <Route path="/szkolenie-wozki-unoszace" element={<WozkiUnoszacePage />} />
                
                {/* Additional Pages */}
                <Route path="/mapa-strony" element={<SitemapPage />} />
                <Route path="/polityka-prywatnosci" element={<PrivacyPolicyPage />} />
                <Route path="/regulamin" element={<TermsPage />} />
                
                {/* CMS Login */}
                <Route path="/cms-login" element={<CMSLoginPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="content-studio" element={<ContentStudio />} />
                  <Route path="blog" element={<div className="p-6">Blog management coming soon...</div>} />
                  <Route path="media" element={<div className="p-6">Media library coming soon...</div>} />
                  <Route path="users" element={<div className="p-6">User management coming soon...</div>} />
                  <Route path="settings" element={<div className="p-6">Settings coming soon...</div>} />
                </Route>
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
