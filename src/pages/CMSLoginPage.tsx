
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const CMSLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
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

    // Simple auth check (replace with real auth in production)
    if (username === "admin" && password === "admin123") {
      localStorage.setItem('cmsAuth', 'true');
      localStorage.setItem('cmsUsername', username);
      login(username);
      
      toast({
        title: "Zalogowano pomyślnie",
        description: "Przekierowuję do panelu administratora"
      });
      
      navigate('/admin');
    } else {
      toast({
        title: "Błąd logowania",
        description: "Nieprawidłowa nazwa użytkownika lub hasło",
        variant: "destructive"
      });
    }
    
    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img 
              src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
              alt="Well-done.pl Logo" 
              className="mx-auto h-12 w-auto mb-6" 
            />
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Panel Administracyjny CMS
            </h2>
          </div>

          <form className="space-y-6 mt-8" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nazwa użytkownika
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                placeholder="Wprowadź nazwę użytkownika"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Hasło
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CMSLoginPage;
