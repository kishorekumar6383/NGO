import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  UtensilsCrossed, 
  Pill, 
  Coins, 
  Users, 
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const [dateRange, setDateRange] = useState<'30d' | '90d' | '1yr'>('30d');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportCSV = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-7">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              Strategic Intelligence & Auditor Dossiers
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Reports, Analytics & Compliance Ledger
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Institutional metrics covering beneficiary welfare, nutritional sufficiency, medicine depletion, and fund utilization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
            <button
              onClick={() => setDateRange('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                dateRange === '30d' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setDateRange('90d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                dateRange === '90d' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Quarterly (90d)
            </button>
            <button
              onClick={() => setDateRange('1yr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                dateRange === '1yr' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Fiscal Year
            </button>
          </div>

          <GlassButton
            variant="primary"
            size="md"
            onClick={handleExportCSV}
            icon={downloadSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <FileSpreadsheet className="w-4 h-4" />}
          >
            {downloadSuccess ? 'Auditor Packet Ready' : 'Export Auditor CSV'}
          </GlassButton>
        </div>
      </div>

      {/* 4 Strategic Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Kitchen Food Wastage</span>
            <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tabular-nums">1.8%</div>
          <div className="text-xs text-emerald-300 mt-2 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-0.6% vs previous quarter</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Prescription Fulfillment</span>
            <Pill className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">99.1%</div>
          <div className="text-xs text-purple-300 mt-2">Zero clinical stockout days</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Pharmacy Pre-Order Savings</span>
            <Coins className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-300 tabular-nums">22.4%</div>
          <div className="text-xs text-indigo-300 mt-2">Via tied-up institutional rates</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Beneficiary Retention & Health</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 tabular-nums">98.5%</div>
          <div className="text-xs text-cyan-300 mt-2">Active health stabilization</div>
        </GlassCard>
      </div>

      {/* Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Food Consumption & Wastage Curve */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Nutritional Consumption Matrix</h3>
              <p className="text-xs text-slate-400">Grains, proteins, dairy and fresh produce distribution (kg)</p>
            </div>
            <span className="text-xs font-mono text-purple-300">989 kg Total</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Rice & Whole Grains', value: '480 kg', pct: 85, color: 'bg-purple-500' },
              { label: 'Pulses & Lentils (Proteins)', value: '195 kg', pct: 65, color: 'bg-indigo-500' },
              { label: 'Dairy & Calcium Fortification', value: '120 L', pct: 45, color: 'bg-blue-500' },
              { label: 'Fresh Vegetables & Greens', value: '142 kg', pct: 55, color: 'bg-emerald-500' },
              { label: 'Cold-pressed Cooking Oils', value: '52 L', pct: 30, color: 'bg-amber-400' }
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{bar.label}</span>
                  <span className="font-mono text-slate-300">{bar.value}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    style={{ width: `${bar.pct}%` }}
                    className={`${bar.color} h-full rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Chart 2: Donation Inflow & Utilization Trends */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">Donation & Grant Inflow Distribution</h3>
              <p className="text-xs text-slate-400">Quarterly trend vs operational allocation target</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">₹3.55 L Raised</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Elderly Nutrition & Hospice Kitchen', amount: '₹1,45,000', pct: 75, color: 'bg-emerald-500' },
              { label: 'Medical Clinic & Pharmacy Supply Fund', amount: '₹1,15,000', pct: 60, color: 'bg-purple-500' },
              { label: 'Child Education Trust (School & Books)', amount: '₹65,000', pct: 40, color: 'bg-cyan-500' },
              { label: 'Shelter Infrastructure & Solar Utilities', amount: '₹30,000', pct: 20, color: 'bg-amber-400' }
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{bar.label}</span>
                  <span className="font-mono text-slate-300">{bar.amount}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    style={{ width: `${bar.pct}%` }}
                    className={`${bar.color} h-full rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
