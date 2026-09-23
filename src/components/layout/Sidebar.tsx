import React from 'react';
import { 
  HeartPulse, 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  FileHeart, 
  Pill, 
  ShieldCheck, 
  HeartHandshake, 
  HandHeart, 
  Sparkles, 
  BarChart3, 
  Lock, 
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { RoleType } from '../../types';

interface SidebarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onReturnToLanding: () => void;
  userRole: RoleType;
  lowMedicineCount: number;
  lowFoodCount: number;
  pendingOrdersCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  onReturnToLanding,
  userRole,
  lowMedicineCount,
  lowFoodCount,
  pendingOrdersCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Admin Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'beneficiaries',
      label: 'Beneficiary Registry',
      icon: Users,
      badge: '158'
    },
    {
      id: 'food',
      label: 'Food Management',
      icon: UtensilsCrossed,
      badge: lowFoodCount > 0 ? `${lowFoodCount} low` : null,
      badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-500/20'
    },
    {
      id: 'medical',
      label: 'Medical Records',
      icon: FileHeart,
      badge: null
    },
    {
      id: 'medicines',
      label: 'Medicine Inventory',
      icon: Pill,
      badge: lowMedicineCount > 0 ? `${lowMedicineCount} alert` : null,
      badgeColor: 'text-rose-400 bg-rose-950/40 border-rose-500/20'
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy Pre-Orders',
      icon: ShieldCheck,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : null,
      badgeColor: 'text-indigo-300 bg-indigo-950/40 border-indigo-500/20'
    },
    {
      id: 'donations',
      label: 'Donation Management',
      icon: HeartHandshake,
      badge: null
    },
    {
      id: 'volunteers',
      label: 'Volunteer Network',
      icon: HandHeart,
      badge: null
    },
    {
      id: 'children',
      label: 'Child Trust Program',
      icon: Sparkles,
      badge: 'Special',
      badgeColor: 'text-purple-300 bg-purple-950/50 border-purple-400/30'
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'security',
      label: 'User Roles & Audit',
      icon: Lock,
      badge: null
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#0a0c1a]/90 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 hidden lg:flex select-none z-20">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div 
            onClick={onReturnToLanding}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight flex items-center">
                Care<span className="text-purple-400">Trust</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider">
                NGO OS · v2.4
              </div>
            </div>
          </div>

          <button
            onClick={onReturnToLanding}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Public Landing Page"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Role Banner */}
        <div className="px-4 py-2.5 mx-3 mt-3 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">Active Profile</div>
          <span className="text-xs font-semibold text-purple-300">
            {userRole}
          </span>
        </div>

        {/* Navigation Item List */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white font-semibold shadow-md border border-purple-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }
                `}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`
                      text-[10px] px-1.5 py-0.5 rounded font-mono border tabular-nums
                      ${item.badgeColor || 'text-slate-300 bg-white/10 border-white/10'}
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={onReturnToLanding}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>Public Website View</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <div className="text-[10px] text-slate-500 text-center">
          CareTrust Non-Profit Cloud
        </div>
      </div>
    </aside>
  );
};
