import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { MedicineItem } from '../../../types';
import { 
  Pill, 
  AlertTriangle, 
  Search, 
  Plus, 
  ShoppingCart, 
  ArrowUpRight, 
  ShieldAlert, 
  Clock, 
  TrendingDown, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface MedicineInventoryModuleProps {
  medicines: MedicineItem[];
  onOpenPreOrder: () => void;
  onUpdateMedicineStock: (id: string, newStock: number) => void;
}

export const MedicineInventoryModule: React.FC<MedicineInventoryModuleProps> = ({
  medicines,
  onOpenPreOrder,
  onUpdateMedicineStock
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Diabetes', 'Cardiovascular', 'Antibiotic', 'Gastrointestinal', 'Pediatric'];

  // Smart calculations for remaining days
  const enrichedMedicines = medicines.map(med => {
    const daysRemaining = med.dailyUsage > 0 
      ? Math.floor(med.currentStock / med.dailyUsage) 
      : 999;
    
    let computedStatus: 'Optimal' | 'Reorder' | 'Critical' = 'Optimal';
    if (daysRemaining <= 5) {
      computedStatus = 'Critical';
    } else if (daysRemaining <= 10 || med.currentStock <= med.reorderLevel) {
      computedStatus = 'Reorder';
    }

    return {
      ...med,
      calculatedDaysRemaining: daysRemaining,
      computedStatus
    };
  });

  const criticalMedicines = enrichedMedicines.filter(
    m => m.computedStatus === 'Critical' || m.computedStatus === 'Reorder'
  );

  const filtered = enrichedMedicines.filter(m => {
    const matchesCat = filterCategory === 'All' || m.category === filterCategory;
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.batchNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-7">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-rose-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-rose-400" />
              Automated Dispensary Stock & Depletion
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Medicine Inventory & Depletion Formula
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time projection: <span className="font-mono text-purple-300">Days Remaining = Current Stock ÷ Daily Prescribed Usage</span>
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="md"
          onClick={onOpenPreOrder}
          icon={<ShoppingCart className="w-4 h-4" />}
        >
          Draft Pharmacy Pre-Order
        </GlassButton>
      </div>

      {/* Prominent Alert Banner: 4 medicines require action */}
      {criticalMedicines.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-950/50 border border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400 mt-0.5">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-base font-bold text-rose-200">
                {criticalMedicines.length} medicines require immediate procurement action.
              </div>
              <div className="text-xs text-rose-300/90 mt-0.5">
                Current inventory levels for critical chronic care medicines have breached safety reorder thresholds.
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {criticalMedicines.map(m => (
                  <span key={m.id} className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-rose-900/60 text-rose-200 border border-rose-500/30">
                    {m.name.split(' ')[0]} ({m.calculatedDaysRemaining} days left)
                  </span>
                ))}
              </div>
            </div>
          </div>

          <GlassButton
            variant="danger"
            size="sm"
            onClick={onOpenPreOrder}
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="shrink-0"
          >
            Dispatch Order to Tied-up Pharmacy
          </GlassButton>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap
                ${
                  filterCategory === c
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {c === 'All' ? 'All Classes' : c}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search medicine, batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder:text-slate-500 w-60"
          />
        </div>
      </div>

      {/* Dedicated Medicine Inventory Table */}
      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-semibold">Medicine & Dosage</th>
                <th className="pb-3.5 font-semibold">Category</th>
                <th className="pb-3.5 font-semibold text-right">Current Stock</th>
                <th className="pb-3.5 font-semibold text-right">Daily Usage</th>
                <th className="pb-3.5 font-semibold text-right">Reorder Level</th>
                <th className="pb-3.5 font-semibold text-right">Estimated Days Remaining</th>
                <th className="pb-3.5 font-semibold">Status</th>
                <th className="pb-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((med) => {
                const isCritical = med.computedStatus === 'Critical';
                const isReorder = med.computedStatus === 'Reorder';

                return (
                  <tr 
                    key={med.id} 
                    className={`hover:bg-white/[0.025] transition-colors ${
                      isCritical ? 'bg-rose-950/20' : isReorder ? 'bg-amber-950/15' : ''
                    }`}
                  >
                    <td className="py-3.5 pr-3">
                      <div className="font-semibold text-white">{med.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Batch: {med.batchNo} · Exp: {med.expiryDate}
                      </div>
                    </td>

                    <td className="py-3.5 pr-3 text-slate-300">
                      {med.category}
                    </td>

                    <td className="py-3.5 pr-3 text-right">
                      <span className={`font-mono text-sm font-bold tabular-nums ${
                        isCritical ? 'text-rose-400' : isReorder ? 'text-amber-300' : 'text-white'
                      }`}>
                        {med.currentStock}
                      </span>{' '}
                      <span className="text-slate-400">{med.unit}</span>
                    </td>

                    <td className="py-3.5 pr-3 text-right text-slate-300 font-mono tabular-nums">
                      {med.dailyUsage}/{med.unit === 'tablets' ? 'day' : 'd'}
                    </td>

                    <td className="py-3.5 pr-3 text-right text-slate-400 font-mono tabular-nums">
                      {med.reorderLevel} {med.unit}
                    </td>

                    <td className="py-3.5 pr-3 text-right">
                      <span className={`font-mono font-bold text-xs tabular-nums px-2 py-0.5 rounded ${
                        isCritical 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : isReorder 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'text-slate-300'
                      }`}>
                        {med.calculatedDaysRemaining} days
                      </span>
                    </td>

                    <td className="py-3.5 pr-3">
                      <StatusBadge status={med.computedStatus} />
                    </td>

                    <td className="py-3.5 text-right">
                      <button
                        onClick={onOpenPreOrder}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer"
                      >
                        Order Refill
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
