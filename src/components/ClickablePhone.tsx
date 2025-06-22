
import React from 'react';
import { Phone } from 'lucide-react';
import { toast } from 'sonner';

interface ClickablePhoneProps {
  phoneNumber?: string;
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
  iconClassName?: string;
}

const ClickablePhone: React.FC<ClickablePhoneProps> = ({ 
  phoneNumber = '504-305-437',
  className = '',
  showIcon = false,
  iconSize = 20,
  iconClassName = 'mr-2 mt-1 text-orange-400 flex-shrink-0'
}) => {
  const handlePhoneClick = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      toast.success('Numer telefonu został skopiowany do schowka!', {
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
      textArea.value = phoneNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Numer telefonu został skopiowany do schowka!', {
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
      {showIcon && <Phone size={iconSize} className={iconClassName} />}
      <button
        onClick={handlePhoneClick}
        className={`hover:text-orange-400 transition-colors cursor-pointer text-left ${className}`}
        title="Kliknij aby skopiować numer telefonu"
      >
        {phoneNumber}
      </button>
    </div>
  );
};

export default ClickablePhone;
