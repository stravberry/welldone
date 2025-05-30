
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import CMSLoginPage from './pages/CMSLoginPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PriceListPage from './pages/PriceListPage';
import FreeAuditPage from './pages/FreeAuditPage';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ContentStudio from './pages/admin/ContentStudio';
import Dashboard from './pages/admin/Dashboard';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/o-nas" element={<AboutPage />} />
            <Route path="/uslugi" element={<ServicesPage />} />
            <Route path="/cennik" element={<PriceListPage />} />
            <Route path="/bezplatny-audyt" element={<FreeAuditPage />} />
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
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
