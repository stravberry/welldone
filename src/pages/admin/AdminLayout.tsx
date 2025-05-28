import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Settings, Image, LogOut, Users, Menu } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, username } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 border-b border-gray-200 px-4">
          <img 
            src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
            alt="Well-done.pl Logo" 
            className="h-4 w-auto flex-shrink-0 object-contain" 
          />
          <span className="ml-3 text-lg font-semibold text-gray-800 truncate">CMS Panel</span>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Zalogowany jako:</p>
            <p className="font-medium truncate">{username}</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <Link to="/admin" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
              <LayoutDashboard className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/pages" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <FileText className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Strony</span>
            </Link>
            <Link to="/admin/blog" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <FileText className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Blog</span>
            </Link>
            <Link to="/admin/media" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <Image className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Media</span>
            </Link>
            <Link to="/admin/users" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <Users className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Użytkownicy</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Ustawienia</span>
            </Link>
          </nav>
          
          <div className="mt-auto">
            <Button 
              variant="outline" 
              className="flex items-center w-full justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Wyloguj się</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white w-full h-16 fixed top-0 left-0 z-20 shadow-sm flex items-center justify-between px-4">
        <div className="flex items-center min-w-0 flex-1">
          <img 
            src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
            alt="Well-done.pl Logo" 
            className="h-3 w-auto flex-shrink-0 object-contain" 
          />
          <span className="ml-2 text-base font-semibold text-gray-800 truncate">CMS Panel</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="p-4 space-y-2">
              <Link 
                to="/admin" 
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/admin/pages" 
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Strony</span>
              </Link>
              <Link 
                to="/admin/blog" 
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>Blog</span>
              </Link>
              <Link 
                to="/admin/media" 
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image className="w-5 h-5 mr-3" />
                <span>Media</span>
              </Link>
              <Link 
                to="/admin/users" 
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5 mr-3" />
                <span>Użytkownicy</span>
              </Link>
              <Link 
                to="/admin/settings" 
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Ustawienia</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Navigation - Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-1 md:hidden z-10">
        <Link to="/admin" className="flex flex-col items-center p-2 min-w-0">
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs mt-1 truncate">Dashboard</span>
        </Link>
        <Link to="/admin/pages" className="flex flex-col items-center p-2 min-w-0">
          <FileText className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs mt-1 truncate">Strony</span>
        </Link>
        <Link to="/admin/blog" className="flex flex-col items-center p-2 min-w-0">
          <FileText className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs mt-1 truncate">Blog</span>
        </Link>
        <Link to="/admin/media" className="flex flex-col items-center p-2 min-w-0">
          <Image className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs mt-1 truncate">Media</span>
        </Link>
        <Link to="/admin/users" className="flex flex-col items-center p-2 min-w-0">
          <Users className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs mt-1 truncate">Użytkownicy</span>
        </Link>
        <Link to="/admin/settings" className="flex flex-col items-center p-2 min-w-0">
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs mt-1 truncate">Ustawienia</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden pt-16 pb-16 md:py-0">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
