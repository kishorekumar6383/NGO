import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number | string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  size = 'md'
}) => {
  return (
    <div
      className={`
        inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10
        backdrop-blur-md overflow-x-auto max-w-full scrollbar-none
        ${className}
      `}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`
              inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-150
              whitespace-nowrap cursor-pointer shrink-0
              ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
              ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white shadow-md border border-purple-400/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
              }
            `}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`
                  text-[11px] px-1.5 py-0.2 rounded-full font-mono tabular-nums
                  ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}
                `}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
