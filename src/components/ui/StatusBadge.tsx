import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'emerald' | 'amber' | 'crimson' | 'indigo' | 'purple' | 'slate';
  dot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant,
  dot = true,
  className = ''
}) => {
  // Determine variant automatically if not supplied
  const autoVariant = (): 'emerald' | 'amber' | 'crimson' | 'indigo' | 'purple' | 'slate' => {
    if (variant) return variant;
    const s = status.toLowerCase();
    if (s.includes('healthy') || s.includes('optimal') || s.includes('delivered') || s.includes('completed') || s.includes('verified') || s.includes('active now')) {
      return 'emerald';
    }
    if (s.includes('low') || s.includes('reorder') || s.includes('pending') || s.includes('away') || s.includes('due')) {
      return 'amber';
    }
    if (s.includes('critical') || s.includes('expiring') || s.includes('emergency') || s.includes('denied') || s.includes('flagged')) {
      return 'crimson';
    }
    if (s.includes('approved') || s.includes('ordered') || s.includes('dispatched')) {
      return 'indigo';
    }
    return 'purple';
  };

  const currentVariant = autoVariant();

  const variantStyles = {
    emerald: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20',
    amber: 'text-amber-300 bg-amber-950/40 border-amber-500/20',
    crimson: 'text-rose-400 bg-rose-950/40 border-rose-500/20',
    indigo: 'text-indigo-300 bg-indigo-950/40 border-indigo-500/20',
    purple: 'text-purple-300 bg-purple-950/40 border-purple-500/20',
    slate: 'text-slate-400 bg-slate-900/50 border-slate-700/30'
  };

  const dotColors = {
    emerald: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    amber: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    crimson: 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]',
    indigo: 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]',
    purple: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]',
    slate: 'bg-slate-400'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border
        tracking-wide whitespace-nowrap
        ${variantStyles[currentVariant]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[currentVariant]}`}
          aria-hidden="true"
        />
      )}
      <span>{status}</span>
    </span>
  );
};
