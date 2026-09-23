import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { GlassButton } from '../../ui/GlassButton';
import { FoodItem } from '../../../types';
import { ShoppingCart, Check, AlertCircle } from 'lucide-react';

interface PurchaseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodItems: FoodItem[];
  onSubmit: (request: any) => void;
}

export const PurchaseRequestModal: React.FC<PurchaseRequestModalProps> = ({
  isOpen,
  onClose,
  foodItems,
  onSubmit
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState('Annapurna Agro Co-Op');
  const [itemsToOrder, setItemsToOrder] = useState<Record<string, number>>({
    'FOOD-104': 50, // Pasteurized Fortified Milk
    'FOOD-102': 100 // Fresh Mixed Farm Vegetables
  });
  const [urgency, setUrgency] = useState<'Standard' | 'Urgent'>('Urgent');
  const [notes, setNotes] = useState('Replenish low morning milk and cooking vegetables before weekend kitchen prep.');
  const [submitted, setSubmitted] = useState(false);

  const handleQuantityChange = (id: string, qty: number) => {
    setItemsToOrder(prev => ({
      ...prev,
      [id]: qty
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({
        supplier: selectedSupplier,
        items: itemsToOrder,
        urgency,
        notes
      });
      setSubmitted(false);
      onClose();
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Food Purchase Request"
      subtitle="Institutional wholesale requisition for pantry & store-room staples"
      maxWidth="xl"
    >
      {submitted ? (
        <div className="py-10 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">Purchase Request #PR-FOOD-2026 Submitted</h4>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            Dispatched to Food Manager & Purchasing Director for authorization.
          </p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Approved Supplier / Co-Op
              </label>
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white text-xs cursor-pointer"
              >
                <option value="Annapurna Agro Co-Op" className="bg-[#141628]">Annapurna Agro Co-Op (Grains & Pulses)</option>
                <option value="Cauvery Valley Organic Farm" className="bg-[#141628]">Cauvery Valley Organic Farm (Fresh Produce)</option>
                <option value="Nandini Dairy Federation" className="bg-[#141628]">Nandini Dairy Federation (Milk & Curd)</option>
                <option value="Horticulture Trust Market" className="bg-[#141628]">Horticulture Trust Market (Seasonal Fruits)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Urgency Level
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white text-xs cursor-pointer"
              >
                <option value="Standard" className="bg-[#141628]">Standard (48-72h fulfillment)</option>
                <option value="Urgent" className="bg-[#141628]">Urgent (Next morning delivery)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-2">
              Select Commodities & Quantities
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {foodItems.map((item) => {
                const isSelected = itemsToOrder[item.id] !== undefined;
                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-white/[0.025] border border-white/8 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleQuantityChange(item.id, item.minStock);
                          } else {
                            const copy = { ...itemsToOrder };
                            delete copy[item.id];
                            setItemsToOrder(copy);
                          }
                        }}
                        className="rounded border-white/20 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <div>
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-[11px] text-slate-400">
                          Current: {item.currentStock} {item.unit} (Min: {item.minStock})
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Order:</span>
                        <input
                          type="number"
                          value={itemsToOrder[item.id]}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                          min={1}
                          className="w-20 px-2 py-1 rounded-lg glass-input text-right font-mono text-white text-xs"
                        />
                        <span className="text-slate-400 font-mono">{item.unit}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Requisition Notes & Dietary Justification
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-white text-xs resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <GlassButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </GlassButton>
            <GlassButton
              type="submit"
              variant="primary"
              size="sm"
              icon={<ShoppingCart className="w-4 h-4" />}
            >
              Authorize & Transmit Request
            </GlassButton>
          </div>
        </form>
      )}
    </Modal>
  );
};
