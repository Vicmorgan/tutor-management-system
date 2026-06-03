import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  elevation?: 'lowest' | 'low' | 'high';
};

export const Card = ({ children, elevation = 'lowest', className = '', ...props }: CardProps) => {
  const elevations = {
    lowest: 'bg-surface-container-lowest border border-outline-variant shadow-sm hover:shadow-md transition-shadow',
    low: 'bg-surface-container-low border border-outline-variant shadow-sm hover:shadow-md transition-shadow',
    high: 'bg-surface-container-high border border-outline shadow-md'
  };

  return (
    <div className={`rounded-xl p-6 ${elevations[elevation]} ${className}`} {...props}>
      {children}
    </div>
  );
};
