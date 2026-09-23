import React from 'react';
import { LayoutDashboard, Users, UtensilsCrossed, FileHeart, Pill, HeartHandshake } from 'lucide-react';

interface MobileBottomNavProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentSection,
  onNavigate
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'beneficiaries', label: 'People', icon: Users },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'medical', label: 'Medical', icon: FileHeart },
    { id: 'medicines', label: 'Pharmacy', icon: Pill },
    { id: 'donations', label: 'Donations', icon: HeartHandshake }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#090b17]/90 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentSection === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`
              flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer
              ${isActive ? 'text-purple-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}
            `}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
