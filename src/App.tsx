
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import FreeAuditPage from "@/pages/FreeAuditPage";
import RealizationsPage from "@/pages/RealizationsPage";
import KnowledgePage from "@/pages/KnowledgePage";
import QuotePage from "@/pages/QuotePage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import PagesManagement from "@/pages/admin/PagesManagement";
import BlogManagement from "@/pages/admin/BlogManagement";
import BlogPostEditor from "@/pages/admin/BlogPostEditor";
import MediaManagement from "@/pages/admin/MediaManagement";
import SettingsPage from "@/pages/admin/SettingsPage";
import CMSLoginPage from "@/pages/CMSLoginPage";
import CMSLoginPanel from "@/components/CMSLoginPanel";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import ScrollTracker from "@/components/ScrollTracker";
import UdtLandingPage from "@/pages/UdtLandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteChangeTracker />
          <ScrollTracker />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<PagesManagement />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="blog/new" element={<BlogPostEditor />} />
              <Route path="blog/edit/:id" element={<BlogPostEditor />} />
              <Route path="media" element={<MediaManagement />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Login Route */}
            <Route path="/cms-login" element={<CMSLoginPage />} />
            
            {/* UDT Landing Page */}
            <Route path="/udt-szkolenia" element={<UdtLandingPage />} />

            {/* Public Routes */}
            <Route path="/" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-16">
                  <HomePage />
                </main>
                <Footer />
                <CMSLoginPanel />
              </div>
            } />

            <Route path="*" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-16">
                  <Routes>
                    <Route path="/o-nas" element={<AboutPage />} />
                    <Route path="/uslugi" element={<ServicesPage />} />
                    <Route path="/uslugi/:serviceId" element={<ServiceDetailPage />} />
                    <Route path="/bezplatny-audyt" element={<FreeAuditPage />} />
                    <Route path="/realizacje" element={<RealizationsPage />} />
                    <Route path="/wiedza" element={<KnowledgePage />} />
                    <Route path="/wycena" element={<QuotePage />} />
                    <Route path="/kontakt" element={<ContactPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <CMSLoginPanel />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
