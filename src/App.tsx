import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import PageTransition from './components/PageTransition';
import RouteChangeTracker from './components/RouteChangeTracker';
import { RedirectHandler } from './components/RedirectHandler';
import CMSLoginPage from './pages/CMSLoginPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
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
import RedirectPage from './components/RedirectPage';
import Dashboard from './pages/admin/Dashboard';
import QuotesManagement from './pages/admin/QuotesManagement';
import CRMManagement from './pages/admin/CRMManagement';
import EmailTemplatesManagement from './pages/admin/EmailTemplatesManagement';
import RedirectsManagement from './pages/admin/RedirectsManagement';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <RedirectHandler />
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
                
                {/* Service Subpages - Updated structure */}
                <Route path="/uslugi/udt-operatorzy" element={<UdtOperatorzyPage />} />
                <Route path="/uslugi/udt-konserwatorzy" element={<UdtKonserwatorzePage />} />
                <Route path="/uslugi/sep" element={<SepPage />} />
                <Route path="/uslugi/lutowanie" element={<LutowaniePage />} />
                
                {/* Keep old routes for backward compatibility */}
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
                
                {/* Redirect Routes - Physical routes for SEO redirects */}
                <Route path="/admin" element={<RedirectPage to="/cms-login" />} />
                <Route path="/admin/" element={<RedirectPage to="/cms-login" />} />
                <Route path="/cms" element={<RedirectPage to="/cms-login" />} />
                <Route path="/panel" element={<RedirectPage to="/cms-login" />} />
                <Route path="/login" element={<RedirectPage to="/cms-login" />} />
                <Route path="/szkolenia-na-wozki-widlowe-na-dolnym-slasku/szkolenia-wozki-widlowe-wroclaw/" element={<RedirectPage to="/uslugi/udt-operatorzy" />} />
                
                {/* CMS Login */}
                <Route path="/cms-login" element={<CMSLoginPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="quotes" element={<QuotesManagement />} />
                  <Route path="crm" element={<CRMManagement />} />
                  <Route path="email-templates" element={<EmailTemplatesManagement />} />
                  <Route path="redirects" element={<RedirectsManagement />} />
                  <Route path="blog" element={<div className="p-6">Blog management coming soon...</div>} />
                  <Route path="media" element={<div className="p-6">Media library coming soon...</div>} />
                  <Route path="settings" element={<div className="p-6">Settings coming soon...</div>} />
                </Route>
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
            <Toaster position="top-center" richColors />
            <Analytics />
            <SpeedInsights />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
