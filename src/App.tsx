
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import UdtKonserwatorzePage from "@/pages/UdtKonserwatorzePage";
import SepPage from "@/pages/SepPage";
import LutowaniePage from "@/pages/LutowaniePage";
import EventyPage from "@/pages/EventyPage";
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
import UserManagement from "@/pages/admin/UserManagement";
import CMSLoginPage from "@/pages/CMSLoginPage";
import CMSLoginPanel from "@/components/CMSLoginPanel";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import ScrollTracker from "@/components/ScrollTracker";
import UdtLandingPage from "@/pages/UdtLandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
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
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Login Route */}
              <Route path="/cms-login" element={<CMSLoginPage />} />
              
              {/* UDT Landing Page */}
              <Route path="/udt-szkolenia" element={<UdtLandingPage />} />

              {/* Main Website Routes with Layout */}
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

              <Route path="/o-nas" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <AboutPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/uslugi" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <ServicesPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/uslugi/:serviceId" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <ServiceDetailPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              {/* New Service Detail Pages */}
              <Route path="/uslugi/udt-konserwatorzy" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <UdtKonserwatorzePage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/uslugi/sep" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <SepPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/uslugi/lutowanie" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <LutowaniePage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/uslugi/eventy" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <EventyPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/bezplatny-audyt" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <FreeAuditPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/realizacje" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <RealizationsPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/wiedza" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <KnowledgePage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/wycena" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <QuotePage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              <Route path="/kontakt" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <ContactPage />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />

              {/* 404 Route */}
              <Route path="*" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16">
                    <NotFound />
                  </main>
                  <Footer />
                  <CMSLoginPanel />
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
