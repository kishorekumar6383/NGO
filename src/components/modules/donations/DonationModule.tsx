import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { Modal } from '../../ui/Modal';
import { Donation, DonationType } from '../../../types';
import { 
  HeartHandshake, 
  Plus, 
  Download, 
  Coins, 
  Utensils, 
  Pill, 
  GraduationCap, 
  CheckCircle2, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  Heart
} from 'lucide-react';

interface DonationModuleProps {
  donations: Donation[];
  onAddDonation: (donation: Donation) => void;
}

export const DonationModule: React.FC<DonationModuleProps> = ({
  donations,
  onAddDonation
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [receiptDownloadedId, setReceiptDownloadedId] = useState<string | null>(null);

  // Form states
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [type, setType] = useState<DonationType>('Money');
  const [amountOrQuantity, setAmountOrQuantity] = useState('₹25,000');
  const [numericValue, setNumericValue] = useState(25000);
  const [allocatedProgram, setAllocatedProgram] = useState<'Elderly Nutrition' | 'Child Education Trust' | 'Medical Clinic Fund' | 'General Operations'>('Elderly Nutrition');

  const types: string[] = ['All', 'Money', 'Food Supplies', 'Medicines', 'School Support'];

  const filtered = donations.filter(d => {
    const matchesType = filterType === 'All' || d.type === filterType;
    const matchesSearch = 
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.allocatedProgram.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalRaised = donations.reduce((sum, d) => sum + d.numericValue, 0);

  const handleDownloadReceipt = (donation: Donation) => {
    setReceiptDownloadedId(donation.id);
    setTimeout(() => {
      setReceiptDownloadedId(null);
    }, 2500);
  };

  const handleCreateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) return;

    const newDonation: Donation = {
      id: `DON-${Math.floor(8946 + Math.random() * 900)}`,
      donorName,
      donorEmail: donorEmail || 'donor@caretrust.org',
      type,
      amountOrQuantity,
      numericValue: Number(numericValue),
      date: new Date().toISOString().split('T')[0],
      allocatedProgram,
      status: 'Completed',
      paymentMode: type === 'Money' ? 'Direct Bank Transfer' : 'In-Kind Logistics Handoff',
      isTaxExempt80G: true
    };

    onAddDonation(newDonation);
    setShowAddModal(false);
    setDonorName('');
    setDonorEmail('');
  };

  return (
    <div className="space-y-7">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-purple-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />
              Philanthropic Stewardship & 80G Receipts
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Donation Accounting & Resource Allocation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Audited tracking for financial contributions, in-kind grain sacks, clinical medicines, and child school sponsorships.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="md"
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Record Contribution
        </GlassButton>
      </div>

      {/* Impact Section Strip */}
      <div className="rounded-2xl glass-card p-6 border-purple-500/25 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Direct Programmatic Impact Counter</span>
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Tax Deductible (Section 80G)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-purple-400" />
              <span>₹ Amount Raised</span>
            </div>
            <div className="text-2xl font-extrabold text-white tabular-nums">
              ₹{(totalRaised / 100000).toFixed(2)} L
            </div>
            <div className="text-[11px] text-purple-300 mt-0.5">Audited FY 2026-27</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-emerald-400" />
              <span>Meals Supported</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 tabular-nums">
              14,200+
            </div>
            <div className="text-[11px] text-emerald-300 mt-0.5">Hot nutritious meals</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Beneficiaries Helped</span>
            </div>
            <div className="text-2xl font-extrabold text-white tabular-nums">
              158
            </div>
            <div className="text-[11px] text-rose-300 mt-0.5">Full daily care & shelter</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-indigo-400" />
              <span>Medicines Funded</span>
            </div>
            <div className="text-2xl font-extrabold text-indigo-300 tabular-nums">
              3,450
            </div>
            <div className="text-[11px] text-indigo-300 mt-0.5">Essential doses delivered</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Children Sponsored</span>
            </div>
            <div className="text-2xl font-extrabold text-cyan-300 tabular-nums">
              64
            </div>
            <div className="text-[11px] text-cyan-300 mt-0.5">Tuition, books & uniforms</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap
                ${
                  filterType === t
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {t === 'All' ? 'All Types' : t}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search donor, ID, program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder:text-slate-500 w-60"
          />
        </div>
      </div>

      {/* Donation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((d) => (
          <GlassCard key={d.id} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-mono text-xs font-semibold text-purple-300">
                    #{d.id}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">{d.donorName}</h4>
                  <div className="text-xs text-slate-400">{d.donorEmail}</div>
                </div>
                <StatusBadge status={d.status} />
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 mb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Contribution:</span>
                  <span className="font-bold text-white text-sm font-mono">{d.amountOrQuantity}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-purple-300 font-medium">{d.type}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Allocated Program:</span>
                  <span className="text-emerald-300 font-medium">{d.allocatedProgram}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between pb-3 border-b border-white/5">
                <span>Date: {d.date}</span>
                <span>{d.paymentMode}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                80G Exemption Receipt
              </span>

              <GlassButton
                variant={receiptDownloadedId === d.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleDownloadReceipt(d)}
                icon={receiptDownloadedId === d.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Download className="w-3.5 h-3.5 text-purple-300" />}
              >
                {receiptDownloadedId === d.id ? 'Receipt Saved!' : 'Download Tax Receipt'}
              </GlassButton>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Record Donation Modal */}
      {showAddModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowAddModal(false)}
          title="Record Philanthropic Donation"
          subtitle="Generate Section 80G tax receipt and log ledger allocation"
          maxWidth="xl"
        >
          <form onSubmit={handleCreateDonation} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Donor Full Name / Trust</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhakrishnan Foundation"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Donor Email (For 80G Dispatch)</label>
                <input
                  type="email"
                  placeholder="donor@foundation.org"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Contribution Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer"
                >
                  <option value="Money" className="bg-[#141628]">Money (Financial Grant)</option>
                  <option value="Food Supplies" className="bg-[#141628]">Food Supplies (In-Kind)</option>
                  <option value="Medicines" className="bg-[#141628]">Medicines & Clinical</option>
                  <option value="School Support" className="bg-[#141628]">School & Tuition Support</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Amount / Quantity Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹50,000 or 200 kg Rice"
                  value={amountOrQuantity}
                  onChange={(e) => setAmountOrQuantity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Estimated Value in INR</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={numericValue}
                  onChange={(e) => setNumericValue(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Allocated Care Program</label>
              <select
                value={allocatedProgram}
                onChange={(e) => setAllocatedProgram(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer"
              >
                <option value="Elderly Nutrition" className="bg-[#141628]">Elderly Nutrition & Hospice Kitchen</option>
                <option value="Child Education Trust" className="bg-[#141628]">Child Education Trust & Books</option>
                <option value="Medical Clinic Fund" className="bg-[#141628]">Medical Clinic Fund & Chronic Medicines</option>
                <option value="General Operations" className="bg-[#141628]">General Facility Operations</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <GlassButton
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                type="submit"
                variant="primary"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Record & Issue 80G Receipt
              </GlassButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
