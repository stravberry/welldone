import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectPageProps {
  to: string;
  redirectType?: 301 | 302;
}

const RedirectPage = ({ to, redirectType = 301 }: RedirectPageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Przekieruj natychmiast
    navigate(to, { replace: redirectType === 301 });
  }, [to, redirectType, navigate]);

  // Pokaż loading podczas przekierowania
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Przekierowywanie...</p>
      </div>
    </div>
  );
};

export default RedirectPage;