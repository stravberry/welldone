import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import RouteChangeTracker from '@/components/RouteChangeTracker';
import ScrollTracker from '@/components/ScrollTracker';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

// Pages
import Index from '@/pages/Index';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import RealizationsPage from '@/pages/RealizationsPage';
import ContactPage from '@/pages/ContactPage';
import QuotePage from '@/pages/QuotePage';
import SepPage from '@/pages/SepPage';
import UdtKonserwatorzePage from '@/pages/UdtKonserwatorzePage';
import UdtLandingPage from '@/pages/UdtLandingPage';
import WozkiUnoszacePage from '@/pages/WozkiUnoszacePage';
import KnowledgePage from '@/pages/KnowledgePage';
import FreeAuditPage from '@/pages/FreeAuditPage';
import EventyPage from '@/pages/EventyPage';
import LutowaniePage from '@/pages/LutowaniePage';
import CMSLoginPage from '@/pages/CMSLoginPage';
import NotFound from '@/pages/NotFound';

// Admin
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UserManagement from '@/pages/admin/UserManagement';
import BlogManagement from '@/pages/admin/BlogManagement';
import BlogPostEditor from '@/pages/admin/BlogPostEditor';
import PagesManagement from '@/pages/admin/PagesManagement';
import MediaManagement from '@/pages/admin/MediaManagement';
import SettingsPage from '@/pages/admin/SettingsPage';

// Create a query client instance
const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Toaster />
              <RouteChangeTracker />
              <ScrollTracker />
              <Routes>
                {/* Existing routes */}
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/o-nas" element={<AboutPage />} />
                <Route path="/uslugi" element={<ServicesPage />} />
                <Route path="/uslugi/:serviceId" element={<ServiceDetailPage />} />
                <Route path="/realizacje" element={<RealizationsPage />} />
                <Route path="/kontakt" element={<ContactPage />} />
                <Route path="/wycena" element={<QuotePage />} />
                <Route path="/sep" element={<SepPage />} />
                <Route path="/udt-konserwatorze" element={<UdtKonserwatorzePage />} />
                <Route path="/udt-szkolenia" element={<UdtLandingPage />} />
                <Route path="/szkolenie-wozki-unoszace" element={<WozkiUnoszacePage />} />
                <Route path="/wiedza" element={<KnowledgePage />} />
                <Route path="/bezplatny-audyt" element={<FreeAuditPage />} />
                <Route path="/eventy" element={<EventyPage />} />
                <Route path="/lutowanie" element={<LutowaniePage />} />
                <Route path="/cms-login" element={<CMSLoginPage />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="blog" element={<BlogManagement />} />
                  <Route path="blog/new" element={<BlogPostEditor />} />
                  <Route path="blog/edit/:id" element={<BlogPostEditor />} />
                  <Route path="pages" element={<PagesManagement />} />
                  <Route path="media" element={<MediaManagement />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
