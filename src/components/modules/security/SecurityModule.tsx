import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { AuditLogEntry, UserAccount, RoleType } from '../../../types';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Users, 
  Activity, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  History,
  FileCheck
} from 'lucide-react';

interface SecurityModuleProps {
  auditLogs: AuditLogEntry[];
  users: UserAccount[];
}

export const SecurityModule: React.FC<SecurityModuleProps> = ({
  auditLogs,
  users
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'users' | 'rbac'>('audit');
  const [searchLog, setSearchLog] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const actor = log.userName || (log as any).user || '';
    const act = log.action || '';
    const resource = log.targetResource || (log as any).entity || '';
    return (
      actor.toLowerCase().includes(searchLog.toLowerCase()) ||
      act.toLowerCase().includes(searchLog.toLowerCase()) ||
      resource.toLowerCase().includes(searchLog.toLowerCase())
    );
  });

  const rbacMatrix: { role: RoleType; permissions: string[] }[] = [
    {
      role: 'Super Admin',
      permissions: ['Full Tenant Access', 'User Provisioning', 'Audit Log Export', 'Financial Signoff', 'Clinical Authorization']
    },
    {
      role: 'NGO Admin',
      permissions: ['Beneficiary Management', 'Food Requisition Approval', 'Volunteer Dispatch', 'Reports View', 'Donation Ledger']
    },
    {
      role: 'Medical Staff',
      permissions: ['Clinical Consultations', 'Prescription Issuance', 'Medication Administration', 'Follow-up Scheduling']
    },
    {
      role: 'Food Manager',
      permissions: ['Food Stock Adjustment', 'Meal Matrix Planning', 'Dietary Restrictions Check', 'Vendor Requisitions']
    },
    {
      role: 'Pharmacy Manager',
      permissions: ['Dispensary Inventory', 'Pre-Order Dispatch', 'Order Receipt Check-in', 'Pharmacy Partner Coordination']
    },
    {
      role: 'Volunteer',
      permissions: ['Assigned Task Completion', 'Hour Logging', 'Read-Only Activity Schedule']
    },
    {
      role: 'Donor',
      permissions: ['Self Donation History', 'Section 80G Tax Receipt Downloads', 'Program Impact Metrics']
    }
  ];

  return (
    <div className="space-y-7">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-purple-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Role-Based Access Control & Immutable Ledger
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            User Roles, Permissions & Security Audits
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            256-bit encrypted audit trails safeguarding clinical privacy, child trust protections, and fiscal integrity.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'audit' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'users' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            User Accounts ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'rbac' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            RBAC Matrix
          </button>
        </div>
      </div>

      {/* Audit Log View */}
      {activeTab === 'audit' && (
        <GlassCard className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" />
                Immutable System Audit Trail
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every record modification, pharmacy approval, and clinical entry is hashed and logged
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter audit entries..."
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder:text-slate-500 w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">Log ID</th>
                  <th className="pb-3 font-semibold">Actor / User</th>
                  <th className="pb-3 font-semibold">Action Performed</th>
                  <th className="pb-3 font-semibold">Target Entity</th>
                  <th className="pb-3 font-semibold">Timestamp</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono text-purple-300 font-medium">#{log.id}</td>
                    <td className="py-3 font-semibold text-white">{log.userName || (log as any).user}</td>
                    <td className="py-3 text-slate-200">{log.action}</td>
                    <td className="py-3 font-mono text-slate-400">{log.targetResource || (log as any).entity}</td>
                    <td className="py-3 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="py-3 text-right">
                      <StatusBadge status={log.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((u) => (
            <GlassCard key={u.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-white text-base">{u.name}</h4>
                    <div className="text-xs text-slate-400">{u.email}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 rounded-full">
                    {u.role}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs text-slate-300 mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Two-Factor Authentication:</span>
                    <span className="text-emerald-400 font-semibold">{u.twoFactorEnabled ? 'Active (TOTP)' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Sign-in:</span>
                    <span className="font-mono text-slate-300">{u.lastLogin}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1">Key Permissions:</div>
                  <div className="flex flex-wrap gap-1">
                    {u.permissions.map((p, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-white/8 flex items-center justify-between text-xs text-slate-400">
                <span>Account: <strong className="text-emerald-400 font-medium">{u.status}</strong></span>
                <button className="text-purple-300 hover:text-white font-medium cursor-pointer">
                  Manage Access
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* RBAC Matrix Tab */}
      {activeTab === 'rbac' && (
        <GlassCard className="p-6">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-white mb-1">Role-Based Access Control (RBAC) Entitlements</h3>
            <p className="text-xs text-slate-400">
              Clear compartmentalization separating medical confidentiality, fiscal management, and volunteer operations.
            </p>
          </div>

          <div className="space-y-4">
            {rbacMatrix.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.025] border border-white/8 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="w-48 shrink-0">
                  <div className="font-bold text-white text-sm">{item.role}</div>
                  <div className="text-[11px] text-purple-300">Preset Clearance Level</div>
                </div>

                <div className="flex flex-wrap gap-1.5 flex-1">
                  {item.permissions.map((p, pIdx) => (
                    <span key={pIdx} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{p}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
