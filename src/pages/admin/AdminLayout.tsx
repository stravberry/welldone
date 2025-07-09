import React from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Calculator, FileText, Settings, Image, LogOut, Users, Menu, Mail, ArrowRightLeft } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, username } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/quotes', label: 'Wyceny', icon: Calculator },
    { path: '/admin/crm', label: 'CRM', icon: Users },
    { path: '/admin/email-templates', label: 'Szablony E-mail', icon: Mail },
    { path: '/admin/redirects', label: 'Przekierowania', icon: ArrowRightLeft },
    { path: '/admin/blog', label: 'Blog', icon: FileText },
    { path: '/admin/media', label: 'Media Library', icon: Image },
    { path: '/admin/settings', label: 'Ustawienia', icon: Settings },
  ];

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
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
          <div className="mb-6">
            <p className="text-sm text-gray-500">Zalogowany jako:</p>
            <p className="font-medium truncate">{username}</p>
          </div>
          
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-500' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-orange-500' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto">
            <Button 
              variant="outline" 
              className="flex items-center w-full justify-start hover:bg-red-50 hover:border-red-200 hover:text-red-600" 
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
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex items-center px-3 py-2 rounded-md ${
                      isActive ? 'bg-orange-50 text-orange-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Navigation - Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-1 md:hidden z-10">
        {navigationItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);
          
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center p-2 min-w-0 ${
                isActive ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs mt-1 truncate">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden md:pt-0 pt-16 pb-16 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
