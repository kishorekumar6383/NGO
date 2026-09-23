import React, { useState } from 'react';
import { RoleType } from '../../types';
import { GlassButton } from '../ui/GlassButton';
import { 
  Bell, 
  Search, 
  ShieldCheck, 
  Plus, 
  Globe, 
  ChevronDown, 
  User, 
  SlidersHorizontal 
} from 'lucide-react';

interface AppHeaderProps {
  currentSection: string;
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  onOpenAlerts: () => void;
  unreadAlertsCount: number;
  onBackToLanding: () => void;
  onQuickAction: (action: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentSection,
  currentRole,
  onRoleChange,
  onOpenAlerts,
  unreadAlertsCount,
  onBackToLanding,
  onQuickAction,
  searchQuery,
  onSearchChange
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  const roles: RoleType[] = [
    'Super Admin',
    'NGO Admin',
    'Medical Staff',
    'Food Manager',
    'Pharmacy Manager',
    'Volunteer',
    'Donor'
  ];

  const sectionTitles: Record<string, string> = {
    dashboard: 'Administrative Overview',
    beneficiaries: 'Beneficiary Directory',
    food: 'Food & Nutrition Management',
    medical: 'Medical Records & Clinical Timeline',
    medicines: 'Medicine Inventory & Reorder Calculations',
    pharmacy: 'Pharmacy Pre-Order Network',
    donations: 'Donations & Resource Accounting',
    volunteers: 'Volunteer Registry & Skill Matching',
    children: 'Child Trust Program & Welfare',
    reports: 'Reports & Strategic Analytics',
    security: 'User Roles & Access Audit Logs'
  };

  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 bg-[#0a0c1a]/70 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between gap-4">
      {/* Breadcrumb Area */}
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <button
          onClick={onBackToLanding}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          title="Return to Public Landing Page"
        >
          <Globe className="w-4 h-4 text-purple-400" />
          <span className="hidden sm:inline">CareTrust</span>
        </button>
        <span className="text-slate-600">/</span>
        <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-none">
          {sectionTitles[currentSection] || currentSection}
        </span>
      </div>

      {/* Center Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search beneficiaries, medicines, food stock, donors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl glass-input text-xs sm:text-sm text-slate-200 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Right Action Icons & Role Switcher */}
      <div className="flex items-center gap-2.5">
        {/* Quick Action Button */}
        <div className="relative">
          <GlassButton
            size="sm"
            variant="secondary"
            onClick={() => setQuickMenuOpen(!quickMenuOpen)}
            icon={<Plus className="w-3.5 h-3.5 text-purple-400" />}
            className="hidden sm:inline-flex"
          >
            Quick Log
          </GlassButton>

          {quickMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#141628] border border-white/15 shadow-2xl p-1.5 z-40 text-xs text-slate-200 animate-in fade-in zoom-in-95">
              <button
                onClick={() => { onQuickAction('add-beneficiary'); setQuickMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ Beneficiary Profile</span>
              </button>
              <button
                onClick={() => { onQuickAction('purchase-request'); setQuickMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ Food Purchase Request</span>
              </button>
              <button
                onClick={() => { onQuickAction('log-donation'); setQuickMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ Record Donation</span>
              </button>
              <button
                onClick={() => { onQuickAction('match-volunteer'); setQuickMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ Volunteer Matching</span>
              </button>
            </div>
          )}
        </div>

        {/* Centralized Alert Center Icon Button */}
        <button
          onClick={onOpenAlerts}
          className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
          title="Open Alert Center"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.8)]">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Role Switcher (Simulates RBAC for NGO evaluation) */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs font-medium transition-colors cursor-pointer"
            title="Switch Simulated Role"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline font-semibold">{currentRole}</span>
            <ChevronDown className="w-3 h-3 text-purple-400" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#141628] border border-white/15 shadow-2xl p-1.5 z-40 text-xs animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider border-b border-white/5">
                Simulate Role Access (RBAC)
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onRoleChange(r);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    currentRole === r
                      ? 'bg-purple-600/30 text-purple-200 font-semibold border border-purple-500/30'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span>{r}</span>
                  {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Mini Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white border border-white/20 select-none shadow-sm">
          {currentRole.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
};
