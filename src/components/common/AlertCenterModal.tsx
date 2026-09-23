import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { GlassButton } from '../ui/GlassButton';
import { StatusBadge } from '../ui/StatusBadge';
import { AlertNotification, AlertPriority } from '../../types';
import { 
  Bell, 
  Check, 
  Trash2, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react';

interface AlertCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: AlertNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateToModule: (actionLink?: string) => void;
}

export const AlertCenterModal: React.FC<AlertCenterModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateToModule
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('All');

  const filtered = filterPriority === 'All'
    ? alerts
    : alerts.filter(a => a.priority === filterPriority);

  const getPriorityIcon = (priority: any) => {
    switch (priority) {
      case 'Critical':
      case 'High':
        return <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] inline-block" title="Critical Priority" />;
      case 'Warning':
      case 'Medium':
        return <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] inline-block" title="Warning" />;
      case 'Action Required':
        return <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] inline-block" title="Action Required" />;
      case 'Success':
      case 'Low':
        return <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] inline-block" title="Success" />;
      default:
        return <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" title="Informational" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Centralized Alert Center"
      subtitle="Operational priority triggers across medicine, nutrition, pharmacy and donations"
      maxWidth="xl"
    >
      <div className="space-y-4 text-xs">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-1">
            {['All', 'Critical', 'Warning', 'Action Required', 'Success'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  filterPriority === p
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-purple-300 hover:text-white flex items-center gap-1 font-medium cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Alert Items List */}
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div>All operational alerts addressed. Dispensary and kitchen in sync.</div>
            </div>
          ) : (
            filtered.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  alert.isRead
                    ? 'bg-white/[0.015] border-white/5 opacity-75'
                    : 'bg-white/[0.04] border-purple-500/30 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getPriorityIcon(alert.priority)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{alert.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                    </div>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                      {alert.message}
                    </p>

                    {(alert.actionLink || alert.linkModule) && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateToModule(alert.actionLink || alert.linkModule);
                        }}
                        className="mt-2 text-purple-300 hover:text-purple-200 font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Resolve in Workspace</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {!alert.isRead && (
                  <button
                    onClick={() => onMarkAsRead(alert.id)}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Mark as read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-white/10">
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Close Center
          </GlassButton>
        </div>
      </div>
    </Modal>
  );
};
