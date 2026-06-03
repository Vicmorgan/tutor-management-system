import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'surface';
  className?: string;
};

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
    error: 'bg-error text-on-error',
    surface: 'bg-surface-container-low text-on-surface-variant border border-outline-variant'
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
