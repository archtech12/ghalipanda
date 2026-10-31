import React from 'react';

interface GridProps {
  children: React.ReactNode;
  isLandscape?: boolean;
  className?: string;
}

export const Grid = ({ children, isLandscape = true, className = '' }: GridProps) => {
  return (
    <div className={`flex-1 grid grid-cols-12 gap-[3cqw] relative min-h-0 ${!isLandscape ? 'grid-rows-[auto_1fr]' : ''} ${className}`}>
      {children}
    </div>
  );
};
