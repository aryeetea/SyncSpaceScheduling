import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  const hoverClass = hover ? 'glass-card-hover cursor-pointer' : '';
  
  return (
    <div className={`glass-card rounded-3xl p-8 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}