
import React from 'react';
import { toast } from 'sonner';

interface ClickableTextProps {
  text: string;
  className?: string;
  successMessage?: string;
  title?: string;
  children?: React.ReactNode;
}

const ClickableText: React.FC<ClickableTextProps> = ({ 
  text,
  className = '',
  successMessage = 'Tekst został skopiowany do schowka!',
  title = 'Kliknij aby skopiować',
  children
}) => {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage, {
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
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success(successMessage, {
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
    <button
      onClick={handleClick}
      className={`hover:text-orange-400 transition-colors cursor-pointer text-left ${className}`}
      title={title}
    >
      {children || text}
    </button>
  );
};

export default ClickableText;
