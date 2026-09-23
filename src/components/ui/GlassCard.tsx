import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  glow?: boolean;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  elevated = false,
  glow = false,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={`
        relative rounded-2xl transition-all duration-200
        ${elevated ? 'glass-panel-elevated' : 'glass-card'}
        ${glow ? 'shadow-[0_0_35px_rgba(168,85,247,0.18)] border-purple-500/30' : ''}
        ${!hoverEffect ? 'hover:transform-none hover:shadow-none' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
