import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(147,51,234,0.35)] hover:shadow-[0_0_35px_rgba(147,51,234,0.55)] border border-purple-400/30 hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-white/10 hover:bg-white/15 text-slate-100 border border-white/15 hover:border-white/25 backdrop-blur-md shadow-sm active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-white/5 text-purple-200 border border-purple-400/30 hover:border-purple-400/60 active:scale-[0.98]',
    danger:
      'bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 hover:border-red-500/50 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white active:scale-[0.98]'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        whitespace-nowrap select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
};
