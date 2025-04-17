
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
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
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
