import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { StatusBadge } from '../ui/StatusBadge';
import { 
  Users, 
  UtensilsCrossed, 
  Pill, 
  HeartHandshake, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { FoodItem, MedicineItem, PharmacyOrder, Donation, AlertNotification } from '../../types';

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
  onOpenOrderModal: (orderId: string) => void;
  onGenerateFoodRequest: () => void;
  foodItems: FoodItem[];
  medicines: MedicineItem[];
  pharmacyOrders: PharmacyOrder[];
  donations: Donation[];
  alerts: AlertNotification[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onOpenOrderModal,
  onGenerateFoodRequest,
  foodItems,
  medicines,
  pharmacyOrders,
  donations,
  alerts
}) => {
  const criticalMeds = medicines.filter(m => m.status === 'Critical' || m.status === 'Reorder');
  const lowFoodItems = foodItems.filter(f => f.status === 'Low stock' || f.status === 'Critical');

  return (
    <div className="space-y-7">
      {/* Top Banner with Quick Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel-elevated border-purple-500/25">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
              CareTrust Central NGO Console
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Institutional Operations & Beneficiary Welfare
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time status of 158 residents across Adult Hospice and Child Trust care wings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={onGenerateFoodRequest}
            icon={<UtensilsCrossed className="w-4 h-4 text-emerald-400" />}
          >
            Kitchen Request
          </GlassButton>
          <GlassButton
            variant="primary"
            size="sm"
            onClick={() => onNavigate('pharmacy')}
            icon={<Pill className="w-4 h-4" />}
          >
            Review Pre-Orders
          </GlassButton>
        </div>
      </div>

      {/* Top KPI Cards (8 Key Indicators) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <GlassCard 
          onClick={() => onNavigate('beneficiaries')}
          className="p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Beneficiaries</span>
            <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">158</div>
          <div className="text-xs text-purple-300/90 mt-2 flex items-center justify-between">
            <span>94 Elderly · 64 Children</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </GlassCard>

        {/* KPI 2 */}
        <GlassCard 
          onClick={() => onNavigate('food')}
          className="p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Food Inventory</span>
            <UtensilsCrossed className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">
            989 <span className="text-sm font-normal text-slate-400">kg/L</span>
          </div>
          <div className="text-xs text-emerald-300/90 mt-2 flex items-center justify-between">
            <span>{lowFoodItems.length} Low / Critical Items</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </GlassCard>

        {/* KPI 3 */}
        <GlassCard 
          onClick={() => onNavigate('medicines')}
          className="p-5 cursor-pointer group border-rose-500/30"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Medicine Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400 tabular-nums">
            {criticalMeds.length} <span className="text-sm font-normal text-rose-300">items</span>
          </div>
          <div className="text-xs text-rose-300/90 mt-2 flex items-center justify-between">
            <span>Immediate Reorder Required</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </GlassCard>

        {/* KPI 4 */}
        <GlassCard 
          onClick={() => onNavigate('donations')}
          className="p-5 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Monthly Grants & Donations</span>
            <HeartHandshake className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">₹3.55 L</div>
          <div className="text-xs text-indigo-300/90 mt-2 flex items-center justify-between">
            <span>5 Major Donors This Month</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </GlassCard>
      </div>

      {/* Main Widgets Grid: Food Overview & Medicine Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Food Distribution & Daily Serving Chart */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                  Today's Nutritional Serving Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Breakdown across General, Diabetes-Friendly, Soft Diet, and Child Trust meals.
                </p>
              </div>
              <button
                onClick={() => onNavigate('food')}
                className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Kitchen Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Meal Breakdown Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-white font-semibold">Breakfast (75 Total Servings)</span>
                  <span className="text-slate-400">45 Gen · 8 Diabetic/Soft · 22 Child</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden flex">
                  <div style={{ width: '60%' }} className="bg-purple-500 h-full" title="General: 45" />
                  <div style={{ width: '11%' }} className="bg-amber-400 h-full" title="Diabetic/Soft: 8" />
                  <div style={{ width: '29%' }} className="bg-indigo-400 h-full" title="Child: 22" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-white font-semibold">Lunch (87 Total Servings)</span>
                  <span className="text-slate-400">50 Gen · 12 Diabetic/Soft · 25 Child</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden flex">
                  <div style={{ width: '57%' }} className="bg-purple-500 h-full" />
                  <div style={{ width: '14%' }} className="bg-amber-400 h-full" />
                  <div style={{ width: '29%' }} className="bg-indigo-400 h-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-white font-semibold">Dinner (81 Total Servings)</span>
                  <span className="text-slate-400">48 Gen · 10 Diabetic/Soft · 23 Child</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden flex">
                  <div style={{ width: '59%' }} className="bg-purple-500 h-full" />
                  <div style={{ width: '12%' }} className="bg-amber-400 h-full" />
                  <div style={{ width: '29%' }} className="bg-indigo-400 h-full" />
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 pt-5 mt-5 border-t border-white/5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>General Approved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Special Diet (Diabetes / Soft Food)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span>Child Trust Pediatric</span>
              </div>
            </div>
          </GlassCard>

          {/* Pending Pharmacy Pre-Orders Widget */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  Active Pharmacy Pre-Orders
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tied-up community pharmacies fulfilling subsidized supplies.
                </p>
              </div>
              <button
                onClick={() => onNavigate('pharmacy')}
                className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({pharmacyOrders.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {pharmacyOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => onOpenOrderModal(order.id)}
                  className="p-3.5 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/8 hover:border-purple-400/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-white text-xs">{order.id}</span>
                      <StatusBadge status={order.status} />
                      {order.urgency === 'Emergency' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Emergency
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">{order.pharmacyName}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {order.items.map(i => `${i.medicineName} (${i.quantity})`).join(', ')}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-white tabular-nums">₹{order.totalAmount}</div>
                    <div className="text-[10px] text-slate-400">Exp: {order.expectedDelivery}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column (5 cols): Medicine Alerts & Live Activity Feed */}
        <div className="lg:col-span-5 space-y-6">
          {/* Medicine Alerts Card */}
          <GlassCard className="p-6 border-rose-500/20">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Medicines Requiring Action
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Calculated based on daily prescribed consumption rate
                </div>
              </div>
              <button
                onClick={() => onNavigate('medicines')}
                className="text-xs font-semibold text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {criticalMeds.map((med) => (
                <div
                  key={med.id}
                  className="p-3 rounded-xl bg-white/[0.025] border border-white/8 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-white text-xs">{med.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Stock: <span className="text-white font-mono">{med.currentStock} {med.unit}</span> · Usage: {med.dailyUsage}/day
                    </div>
                    <div className="text-[11px] text-amber-300 font-medium mt-0.5">
                      Est. {med.estimatedDaysRemaining} days remaining
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={med.status} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
              <GlassButton
                size="sm"
                variant="outline"
                onClick={() => onNavigate('pharmacy')}
                className="w-full text-xs"
              >
                Generate Pharmacy Pre-Order for 4 Medicines
              </GlassButton>
            </div>
          </GlassCard>

          {/* Live Recent Activity Feed */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Live NGO Activity Feed
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Synchronized</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-300 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium text-white">Medicine order #ORD-1024 approved</div>
                  <div className="text-[11px] text-slate-400">Dr. Priya authorized supply from MedPlus</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">15 mins ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300 mt-0.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium text-white">₹1,50,000 donation received</div>
                  <div className="text-[11px] text-slate-400">Dr. Swaminathan for Medical Clinic Fund</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">2 hours ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-300 mt-0.5">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium text-white">Vegetable inventory updated</div>
                  <div className="text-[11px] text-slate-400">Cauvery Valley farm delivery of 42 kg logged</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">4 hours ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-300 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-medium text-white">Beneficiary #CT-1025 follow-up scheduled</div>
                  <div className="text-[11px] text-slate-400">Pediatric checkup for Ananya Verma by Dr. Mehta</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Yesterday at 16:30</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
