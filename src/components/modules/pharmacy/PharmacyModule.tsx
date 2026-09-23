import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { Drawer } from '../../ui/Drawer';
import { PharmacyPartner, PharmacyOrder, OrderStatus, MedicineItem } from '../../../types';
import { 
  ShieldCheck, 
  Plus, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  Truck, 
  PackageCheck,
  Send,
  Building2,
  FileCheck
} from 'lucide-react';

interface PharmacyModuleProps {
  pharmacyPartners: PharmacyPartner[];
  orders: PharmacyOrder[];
  medicines: MedicineItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onCreateOrder: (order: PharmacyOrder) => void;
}

export const PharmacyModule: React.FC<PharmacyModuleProps> = ({
  pharmacyPartners,
  orders,
  medicines,
  onUpdateOrderStatus,
  onCreateOrder
}) => {
  const [selectedOrder, setSelectedOrder] = useState<PharmacyOrder | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'partners' | 'workflow'>('orders');

  const workflowSteps = [
    { name: 'Medicine Stock', desc: 'Central dispensary monitoring' },
    { name: 'Low Stock Detection', desc: 'Depletion formula alert' },
    { name: 'Pre-Order Recommendation', desc: 'System generated quota' },
    { name: 'NGO Staff Approval', desc: 'Medical officer authorization' },
    { name: 'Tied-Up Pharmacy', desc: 'Subsidized partner routing' },
    { name: 'Order Submitted', desc: 'Encrypted purchase dispatch' },
    { name: 'Dispatched', desc: 'Courier transit & tracking' },
    { name: 'Received & Verified', desc: 'Nursing check-in' },
    { name: 'Inventory Updated', desc: 'Stock quantities restored' }
  ];

  const handleAdvanceStatus = (order: PharmacyOrder) => {
    const transitions: Record<OrderStatus, OrderStatus> = {
      'Draft': 'Pending Approval',
      'Pending Approval': 'Approved',
      'Approved': 'Ordered',
      'Ordered': 'Dispatched',
      'Dispatched': 'Delivered',
      'Delivered': 'Delivered'
    };
    const next = transitions[order.status];
    onUpdateOrderStatus(order.id, next);
    setSelectedOrder({ ...order, status: next });
  };

  return (
    <div className="space-y-7">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-indigo-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Tied-Up Healthcare Network
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Pharmacy Pre-Order & Procurement Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            End-to-end automated supply chain connecting care home dispensaries to verified subsidized pharmacies.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'orders' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'partners' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pharmacy Partners ({pharmacyPartners.length})
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'workflow' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workflow Architecture
          </button>
        </div>
      </div>

      {/* Workflow Visualizer Strip */}
      <GlassCard className="p-5 overflow-x-auto">
        <div className="text-xs font-semibold text-white mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Standard Pharmacy Pre-Order Lifecycle
          </span>
          <span className="text-[11px] text-slate-400">9-stage automated procurement loop</span>
        </div>

        <div className="flex items-center min-w-[780px] gap-2">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex-1 p-2.5 rounded-xl bg-white/[0.025] border border-white/8 text-center hover:bg-white/[0.05] transition-colors">
                <div className="text-[10px] font-mono text-purple-400 font-semibold mb-0.5">
                  0{idx + 1}
                </div>
                <div className="text-xs font-medium text-white leading-tight mb-1 truncate">
                  {step.name}
                </div>
                <div className="text-[9px] text-slate-400 truncate">
                  {step.desc}
                </div>
              </div>
              {idx < workflowSteps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </GlassCard>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">Active & Historical Pre-Orders</h3>
            <span className="text-xs text-slate-400 font-mono">Real-time settlement tracking</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orders.map((order) => (
              <GlassCard
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="p-5 flex flex-col justify-between cursor-pointer group hover:border-purple-400/40"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm">{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Ordered: {order.orderDate}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-white tabular-nums">
                        ₹{order.totalAmount}
                      </div>
                      {order.urgency === 'Emergency' && (
                        <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">
                          Emergency
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 mb-4">
                    <div className="text-xs font-semibold text-purple-200 truncate">
                      {order.pharmacyName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Req by: {order.requestedBy}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="text-[11px] font-medium text-slate-400">Medicines Requisitioned:</div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-white truncate max-w-[160px]">{item.medicineName}</span>
                        <span className="font-mono text-slate-400 tabular-nums">Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between text-xs">
                  <span className="text-slate-400">ETA: {order.expectedDelivery}</span>
                  <span className="text-purple-300 font-medium group-hover:text-purple-200 flex items-center gap-1">
                    <span>Manage Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Partners Tab */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">Verified Community Pharmacy Network</h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Pre-negotiated Non-Profit Tariffs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pharmacyPartners.map((p) => (
              <GlassCard key={p.id} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-amber-300 font-bold text-xs bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span>{p.rating}</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-white text-base mb-1">{p.name}</h4>
                  <div className="text-xs text-purple-300 font-medium mb-3">{p.discountRate}</div>

                  <div className="space-y-2 text-xs text-slate-300 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{p.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{p.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{p.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                    <div>
                      <div className="text-slate-400 text-[11px]">Available Medicines</div>
                      <div className="font-bold text-white font-mono mt-0.5">{p.availableMedicinesCount} SKUs</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Avg Delivery</div>
                      <div className="font-bold text-emerald-400 font-mono mt-0.5">~{p.averageDeliveryHours} hours</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/8">
                  <GlassButton
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                    className="w-full text-xs"
                  >
                    View Partner Orders
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Workflow Architecture Tab */}
      {activeTab === 'workflow' && (
        <GlassCard className="p-7 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Automated Closed-Loop Procurement</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              CareTrust eliminates medication stockouts in high-dependency care homes by continuously evaluating prescription consumption rates against shelf inventory. When inventory falls below safe thresholds, an automated recommendation is drafted for medical staff approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <div className="text-xs font-semibold text-purple-300 mb-1">1. Smart Depletion Sensor</div>
              <p className="text-xs text-slate-400">
                Calculates daily dosage requirements across 158 beneficiaries to forecast exact depletion dates before shortages occur.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <div className="text-xs font-semibold text-indigo-300 mb-1">2. Multi-Signoff Control</div>
              <p className="text-xs text-slate-400">
                Orders exceed threshold values require both Chief Medical Officer verification and NGO Managing Director signature.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <div className="text-xs font-semibold text-emerald-300 mb-1">3. Direct Stock Injection</div>
              <p className="text-xs text-slate-400">
                Upon courier handoff and batch verification, dispensary ledger counts automatically update without duplicate data entry.
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Detailed Order Drawer */}
      {selectedOrder && (
        <Drawer
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          title={`Order Dossier #${selectedOrder.id}`}
          subtitle={`Fulfillment Partner: ${selectedOrder.pharmacyName}`}
          width="lg"
        >
          <div className="space-y-6 text-xs">
            {/* Status & Action Stepper */}
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
              <div>
                <div className="text-slate-400 text-[11px]">Current Order Status</div>
                <div className="mt-1">
                  <StatusBadge status={selectedOrder.status} />
                </div>
              </div>

              {selectedOrder.status !== 'Delivered' && (
                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleAdvanceStatus(selectedOrder)}
                  icon={<Truck className="w-3.5 h-3.5" />}
                >
                  Advance to Next Stage
                </GlassButton>
              )}
            </div>

            {/* Requisition Meta */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <div>
                <span className="text-slate-400">Requested By:</span>
                <div className="font-semibold text-white mt-0.5">{selectedOrder.requestedBy}</div>
              </div>
              <div>
                <span className="text-slate-400">Authorized Signoff:</span>
                <div className="font-semibold text-emerald-400 mt-0.5">{selectedOrder.approvedBy || 'Pending Signoff'}</div>
              </div>
              <div>
                <span className="text-slate-400">Date Logged:</span>
                <div className="text-white font-mono mt-0.5">{selectedOrder.orderDate}</div>
              </div>
              <div>
                <span className="text-slate-400">Target Delivery:</span>
                <div className="text-white font-mono mt-0.5">{selectedOrder.expectedDelivery}</div>
              </div>
            </div>

            {/* Items Breakdown Table */}
            <div>
              <div className="font-bold text-white mb-2">Prescription Items Included</div>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 text-[11px]">
                    <tr>
                      <th className="p-3">Medicine</th>
                      <th className="p-3 text-right">Units</th>
                      <th className="p-3 text-right">Unit Rate</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-semibold text-white">{item.medicineName}</td>
                        <td className="p-3 text-right font-mono text-slate-300">{item.quantity}</td>
                        <td className="p-3 text-right font-mono text-slate-400">₹{item.unitPrice}</td>
                        <td className="p-3 text-right font-mono font-bold text-white">₹{item.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-white/[0.02] border-t border-white/10 font-bold text-white">
                    <tr>
                      <td colSpan={3} className="p-3 text-right">Total Subsidized Bill:</td>
                      <td className="p-3 text-right font-mono text-sm text-purple-300">
                        ₹{selectedOrder.totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-slate-400 font-medium mb-1">Clinical Justification & Notes:</div>
              <div className="text-slate-200 italic">"{selectedOrder.notes}"</div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};
