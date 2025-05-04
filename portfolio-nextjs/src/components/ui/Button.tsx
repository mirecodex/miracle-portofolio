import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', variant = 'primary' }) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none transition duration-300';
  const variantStyles = variant === 'primary' 
    ? 'bg-orange-500 text-white hover:bg-orange-600' 
    : 'bg-gray-800 text-white hover:bg-gray-700';

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;