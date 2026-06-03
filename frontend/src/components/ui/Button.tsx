import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string; // Material symbol string
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg transition-all active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:opacity-90',
    secondary: 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20 hover:bg-secondary-container',
    outline: 'border border-outline-variant text-on-surface hover:bg-surface-container-low',
    ghost: 'text-on-surface-variant hover:bg-surface-container-low'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-label-sm',
    md: 'px-4 py-2 text-label-md',
    lg: 'px-6 py-3 text-body-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined mr-2 text-[20px]">{icon}</span>}
      {children}
    </button>
  );
};
