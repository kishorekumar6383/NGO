import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  elevated = false,
  ...props
}) => {
  return (
    <div
      className={`
        rounded-3xl p-6 sm:p-8
        ${elevated ? 'glass-panel-elevated' : 'glass-panel'}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
