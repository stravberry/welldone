
import React from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

interface ClickableEmailProps {
  email?: string;
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
  iconClassName?: string;
}

const ClickableEmail: React.FC<ClickableEmailProps> = ({ 
  email = 'kontakt@well-done.pl',
  className = '',
  showIcon = false,
  iconSize = 20,
  iconClassName = 'mr-2 mt-1 text-orange-400 flex-shrink-0'
}) => {
  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('Adres email został skopiowany do schowka!', {
        style: {
          fontSize: '16px',
          padding: '16px 20px',
          minHeight: '60px',
          borderRadius: '12px'
        }
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Adres email został skopiowany do schowka!', {
        style: {
          fontSize: '16px',
          padding: '16px 20px',
          minHeight: '60px',
          borderRadius: '12px'
        }
      });
    }
  };

  return (
    <div className="flex items-start">
      {showIcon && <Mail size={iconSize} className={iconClassName} />}
      <button
        onClick={handleEmailClick}
        className={`hover:text-orange-400 transition-colors cursor-pointer text-left ${className}`}
        title="Kliknij aby skopiować adres email"
      >
        {email}
      </button>
    </div>
  );
};

export default ClickableEmail;
