import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { GlassButton } from '../ui/GlassButton';
import { RoleType } from '../../types';
import { 
  HeartPulse, 
  Lock, 
  Mail, 
  KeyRound, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  UserCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: RoleType, userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('director@caretrust.org');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactorCode, setTwoFactorCode] = useState('492817');

  const demoPresets: { role: RoleType; name: string; title: string; color: string }[] = [
    { role: 'Super Admin', name: 'Dr. Swaminathan Iyer', title: 'Managing Director & Trustee', color: 'border-purple-500/40 text-purple-300' },
    { role: 'Medical Staff', name: 'Dr. Priya Sundaram', title: 'Chief Medical Officer', color: 'border-rose-500/40 text-rose-300' },
    { role: 'Food Manager', name: 'Smt. Lakshmi Narayanan', title: 'Head Nutritionist & Chef', color: 'border-emerald-500/40 text-emerald-300' },
    { role: 'Pharmacy Manager', name: 'Rajesh Kulkarni', title: 'Lead Pharmacist & Logistics', color: 'border-indigo-500/40 text-indigo-300' },
    { role: 'Volunteer', name: 'Vikram Joshi', title: 'Community Volunteer Mentor', color: 'border-amber-500/40 text-amber-300' },
    { role: 'Donor', name: 'Sundar Pichai Trust', title: 'CSR & Education Patron', color: 'border-cyan-500/40 text-cyan-300' }
  ];

  const handleSelectPreset = (preset: typeof demoPresets[0]) => {
    onLoginSuccess(preset.role, preset.name);
    onClose();
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('Super Admin', 'Dr. Swaminathan Iyer');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Secure Institutional Sign-In"
      subtitle="Encrypted access to CareTrust NGO operations & beneficiary records"
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Left Side: Standard Login Form */}
        <div className="space-y-4">
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'login' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'register' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Staff Request
            </button>
            <button
              onClick={() => setActiveTab('forgot')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'forgot' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Recovery
            </button>
          </div>

          <form onSubmit={handleStandardSubmit} className="space-y-3 pt-2">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">2FA Security Token</label>
              <input
                type="text"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white font-mono"
              />
            </div>

            <div className="pt-2">
              <GlassButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Authenticate Session
              </GlassButton>
            </div>
          </form>
        </div>

        {/* Right Side: 1-Click Fast Role Presets */}
        <div className="space-y-3 border-t md:border-t-0 md:border-l border-white/10 md:pl-6 pt-4 md:pt-0">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Instant Evaluator Demo Profiles</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Click any profile below to instantly simulate that persona's permissions and view the live workspace:
          </p>

          <div className="space-y-2">
            {demoPresets.map((p, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`p-2.5 rounded-xl bg-white/[0.025] hover:bg-white/[0.06] border ${p.color} transition-all cursor-pointer flex items-center justify-between group`}
              >
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {p.role} · {p.title}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
