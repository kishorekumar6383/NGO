import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { Modal } from '../../ui/Modal';
import { FoodItem, DailyMealRequirement } from '../../../types';
import { 
  UtensilsCrossed, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Package, 
  Clock, 
  Coffee,
  Sun,
  Moon,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FoodModuleProps {
  foodItems: FoodItem[];
  mealRequirements: DailyMealRequirement[];
  onGeneratePurchaseRequest: () => void;
  onUpdateStock: (id: string, newStock: number) => void;
}

export const FoodModule: React.FC<FoodModuleProps> = ({
  foodItems,
  mealRequirements,
  onGeneratePurchaseRequest,
  onUpdateStock
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedItemForEdit, setSelectedItemForEdit] = useState<FoodItem | null>(null);
  const [editStockValue, setEditStockValue] = useState<number>(0);

  const categories = ['all', 'Rice & Grains', 'Vegetables', 'Fruits', 'Milk & Dairy', 'Pulses & Lentils', 'Oils & Spices'];

  const filteredItems = filterCategory === 'all'
    ? foodItems
    : foodItems.filter(item => item.category === filterCategory);

  const totalStockKg = foodItems.reduce((acc, curr) => acc + (curr.unit === 'kg' ? curr.currentStock : 0), 0);
  const criticalItems = foodItems.filter(f => f.status === 'Critical' || f.status === 'Low stock');

  const handleOpenEdit = (item: FoodItem) => {
    setSelectedItemForEdit(item);
    setEditStockValue(item.currentStock);
  };

  const handleSaveStock = () => {
    if (selectedItemForEdit) {
      onUpdateStock(selectedItemForEdit.id, editStockValue);
      setSelectedItemForEdit(null);
    }
  };

  return (
    <div className="space-y-7">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Nutritional Sustenance & Inventory
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Food Management & Dietary Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time rationing for general residents, diabetic seniors, soft-food dysphagia diets, and Child Trust students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassButton
            variant="primary"
            size="md"
            onClick={onGeneratePurchaseRequest}
            icon={<FileText className="w-4 h-4" />}
          >
            Generate Purchase Request
          </GlassButton>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Grains & Solid Staples</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">
            {totalStockKg} <span className="text-sm font-normal text-slate-400">kg</span>
          </div>
          <div className="text-xs text-emerald-300 mt-2">
            Sufficiency: ~21 days institutional reserve
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-amber-500/25">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Low / Critical Supplies</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300 tabular-nums">
            {criticalItems.length} <span className="text-sm font-normal text-slate-400">commodities</span>
          </div>
          <div className="text-xs text-amber-400 mt-2">
            Fortified Milk (18L) & Fresh Farm Veg (42kg)
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Today's Total Servings</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">
            315 <span className="text-sm font-normal text-slate-400">meals planned</span>
          </div>
          <div className="text-xs text-purple-300 mt-2">
            Breakfast (75), Lunch (87), Snacks (72), Dinner (81)
          </div>
        </GlassCard>
      </div>

      {/* Daily Meal Requirements Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Special Food Categories & Daily Requirements
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Approved menu distribution by dietary category across care tiers
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Today's Schedule</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mealRequirements.map((req, idx) => {
            const icons = {
              Breakfast: Coffee,
              Lunch: Sun,
              'Evening Snack': Sparkles,
              Dinner: Moon
            };
            const Icon = icons[req.mealType] || Sun;

            return (
              <GlassCard key={idx} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">
                      {req.totalServings} Total
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{req.mealType}</h4>

                  <div className="space-y-1.5 text-xs text-slate-300 mb-4 pb-3 border-b border-white/5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">General Menu:</span>
                      <span className="font-semibold text-white">{req.generalCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Special Diet (Diabetic/Soft):</span>
                      <span className="font-semibold text-amber-300">{req.specialDietCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Child Trust Nutrition:</span>
                      <span className="font-semibold text-indigo-300">{req.childrenCount}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    "{req.menuSummary}"
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Food Inventory Table Section */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
          <div>
            <h3 className="text-base font-bold text-white">Food Stock Ledger</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live pantry and store-room commodity tracking
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors
                  ${
                    filterCategory === c
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {c === 'all' ? 'All Commodities' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Commodity</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold text-right">Current Stock</th>
                <th className="pb-3 font-semibold text-right">Min Buffer</th>
                <th className="pb-3 font-semibold text-right">Daily Usage</th>
                <th className="pb-3 font-semibold">Supplier</th>
                <th className="pb-3 font-semibold">Expiry Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 pr-3">
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{item.id}</div>
                  </td>
                  <td className="py-3.5 pr-3 text-slate-300">{item.category}</td>
                  <td className="py-3.5 pr-3 text-right">
                    <span className="font-bold text-white font-mono text-sm tabular-nums">
                      {item.currentStock}
                    </span>{' '}
                    <span className="text-slate-400">{item.unit}</span>
                  </td>
                  <td className="py-3.5 pr-3 text-right text-slate-400 font-mono tabular-nums">
                    {item.minStock} {item.unit}
                  </td>
                  <td className="py-3.5 pr-3 text-right text-slate-400 font-mono tabular-nums">
                    ~{item.dailyConsumptionRate} {item.unit}/day
                  </td>
                  <td className="py-3.5 pr-3 text-slate-300 max-w-[150px] truncate">
                    {item.supplier}
                  </td>
                  <td className="py-3.5 pr-3 text-slate-400 font-mono">
                    {item.expiryDate}
                  </td>
                  <td className="py-3.5 pr-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer"
                    >
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Edit Stock Modal */}
      {selectedItemForEdit && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedItemForEdit(null)}
          title={`Update Stock: ${selectedItemForEdit.name}`}
          subtitle={`Current recorded: ${selectedItemForEdit.currentStock} ${selectedItemForEdit.unit}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Quantity ({selectedItemForEdit.unit})
              </label>
              <input
                type="number"
                value={editStockValue}
                onChange={(e) => setEditStockValue(Number(e.target.value))}
                min={0}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-white font-mono text-base"
              />
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Minimum Buffer Level:</span>
                <span className="font-mono text-white">{selectedItemForEdit.minStock} {selectedItemForEdit.unit}</span>
              </div>
              <div className="flex justify-between">
                <span>Supplier:</span>
                <span className="text-white">{selectedItemForEdit.supplier}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedItemForEdit(null)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                size="sm"
                onClick={handleSaveStock}
              >
                Save Updated Count
              </GlassButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
