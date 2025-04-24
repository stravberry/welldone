
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Lock } from 'lucide-react';

// Simple hardcoded auth for demonstration purposes
// In a real app, this should be replaced with proper authentication
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const CMSLoginPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    // Simple validation
    if (!username || !password) {
      toast({
        title: "Błąd logowania",
        description: "Podaj nazwę użytkownika i hasło",
        variant: "destructive"
      });
      setIsLoggingIn(false);
      return;
    }

    // Simple authentication logic (replace with real auth in production)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set auth state in localStorage
      localStorage.setItem('cmsAuth', 'true');
      localStorage.setItem('cmsUsername', username);
      
      toast({
        title: "Zalogowano pomyślnie",
        description: "Przekierowuję do panelu administratora"
      });
      
      // Redirect to admin panel
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      toast({
        title: "Błąd logowania",
        description: "Nieprawidłowa nazwa użytkownika lub hasło",
        variant: "destructive"
      });
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-orange-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Panel CMS</h2>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa użytkownika
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                  placeholder="Wprowadź nazwę użytkownika"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Hasło
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  placeholder="Wprowadź hasło"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logowanie..." : "Zaloguj się"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CMSLoginPanel;
