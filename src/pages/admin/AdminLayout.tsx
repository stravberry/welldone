
import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Settings, Image, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <img 
            src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
            alt="Well-done.pl Logo" 
            className="h-8" 
          />
          <span className="ml-2 text-lg font-semibold text-gray-800">CMS Panel</span>
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Zalogowany jako:</p>
            <p className="font-medium">{username}</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <Link to="/admin" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/pages" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <FileText className="w-5 h-5 mr-3" />
              <span>Strony</span>
            </Link>
            <Link to="/admin/blog" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <FileText className="w-5 h-5 mr-3" />
              <span>Blog</span>
            </Link>
            <Link to="/admin/media" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <Image className="w-5 h-5 mr-3" />
              <span>Media</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <Settings className="w-5 h-5 mr-3" />
              <span>Ustawienia</span>
            </Link>
          </nav>
          
          <div className="mt-auto">
            <Button 
              variant="outline" 
              className="flex items-center w-full" 
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Wyloguj się</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white w-full h-16 fixed top-0 left-0 z-10 shadow-sm flex items-center justify-between px-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
            alt="Well-done.pl Logo" 
            className="h-6" 
          />
          <span className="ml-2 text-base font-semibold text-gray-800">CMS Panel</span>
        </div>
        
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden z-10">
        <Link to="/admin" className="flex flex-col items-center p-2">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link to="/admin/pages" className="flex flex-col items-center p-2">
          <FileText className="w-5 h-5" />
          <span className="text-xs mt-1">Strony</span>
        </Link>
        <Link to="/admin/blog" className="flex flex-col items-center p-2">
          <FileText className="w-5 h-5" />
          <span className="text-xs mt-1">Blog</span>
        </Link>
        <Link to="/admin/media" className="flex flex-col items-center p-2">
          <Image className="w-5 h-5" />
          <span className="text-xs mt-1">Media</span>
        </Link>
        <Link to="/admin/settings" className="flex flex-col items-center p-2">
          <Settings className="w-5 h-5" />
          <span className="text-xs mt-1">Ustawienia</span>
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
