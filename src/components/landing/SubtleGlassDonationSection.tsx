import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Lock, 
  ArrowRight,
  Info,
  Building2,
  CreditCard
} from 'lucide-react';
import { SUB_TOPICS } from '../../data/subTopicsData';

interface SubtleGlassDonationSectionProps {
  preselectedCause?: string;
  preselectedAmount?: number;
  onDonationSuccess?: (donationData: any) => void;
}

export const SubtleGlassDonationSection: React.FC<SubtleGlassDonationSectionProps> = ({
  preselectedCause,
  preselectedAmount,
  onDonationSuccess
}) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number>(preselectedAmount || 2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>(preselectedCause || SUB_TOPICS[0].title);
  
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [request80G, setRequest80G] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<any | null>(null);

  const presetTiers = [
    {
      amount: 1000,
      title: '25 Hot Meals',
      impact: 'Feeds 25 senior citizens or schoolchildren in the community kitchen.'
    },
    {
      amount: 2500,
      title: 'Monthly Diabetic Care',
      impact: 'Full monthly supply of insulin and cardiac drugs for 1 destitute elder.'
    },
    {
      amount: 5000,
      title: 'Child School Term',
      impact: 'Complete school tuition, textbooks, uniforms, and daily milk for 1 child.'
    },
    {
      amount: 10000,
      title: 'Full Elder Month',
      impact: '30 days of round-the-clock shelter, nursing, 3 hot meals daily, and physiotherapy.'
    }
  ];

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num)) {
      setSelectedAmount(num);
    }
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorEmail.trim()) {
      alert('Please provide your name and email to issue the tax receipt.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const receipt = {
        receiptNumber: `CT-80G-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        donorName,
        donorEmail,
        donorPan: donorPan || 'NOT PROVIDED',
        amount: selectedAmount,
        frequency,
        allocatedCause: selectedCause,
        taxExemptionStatus: request80G ? 'Section 80G Compliant (50% Tax Deduction)' : 'General Donation',
        trustPan: 'AABTC8823M',
        urn: 'AABTC8823ME20214'
      };
      setReceiptData(receipt);
      if (onDonationSuccess) {
        onDonationSuccess(receipt);
      }
    }, 900);
  };

  return (
    <section id="donate" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
            Direct Philanthropic Support
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Support Our Life-Changing Programs
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-normal">
            Your contribution directly funds medicine, meals, and schooling. 100% of donations qualify for an immediate 50% Indian Income Tax deduction under Section 80G.
          </p>
        </div>

        {/* SUBTLE GLASSMORPHISM CARD FOR DONATION SECTION ONLY */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-donation-card rounded-2xl p-6 sm:p-10">
            
            {receiptData ? (
              /* Confirmation & 80G Receipt Preview */
              <div className="space-y-6 text-center py-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    Transaction Confirmed & Verified
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Thank You, {receiptData.donorName}!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mt-2">
                    Your contribution of <strong className="text-slate-900 font-mono">₹{receiptData.amount.toLocaleString('en-IN')}</strong> has been earmarked for <strong>{receiptData.allocatedCause}</strong>.
                  </p>
                </div>

                {/* Simulated Official Tax Receipt Certificate */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-left text-xs space-y-3 font-mono">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">CareTrust Foundation</span>
                      <div className="text-[10px] text-slate-500 font-sans">Public Charitable Trust · Sec 80G & 12A Certified</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-blue-700 text-xs">{receiptData.receiptNumber}</span>
                      <div className="text-[10px] text-slate-500 font-sans">Date: {receiptData.date}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-700 font-sans">
                    <div><span className="text-slate-400">Donor Name:</span> <strong className="text-slate-900">{receiptData.donorName}</strong></div>
                    <div><span className="text-slate-400">Donor PAN:</span> <strong className="text-slate-900">{receiptData.donorPan}</strong></div>
                    <div><span className="text-slate-400">Amount Received:</span> <strong className="text-blue-700 font-mono font-bold">₹{receiptData.amount.toLocaleString('en-IN')}</strong></div>
                    <div><span className="text-slate-400">Mode:</span> Verified Gateway</div>
                    <div className="col-span-2"><span className="text-slate-400">Program Vertical:</span> {receiptData.allocatedCause}</div>
                    <div className="col-span-2"><span className="text-slate-400">Tax Exemption:</span> Qualified under Section 80G(5)(vi) of Income Tax Act 1961</div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                    <span>Trust URN: {receiptData.urn}</span>
                    <span className="text-emerald-700 font-medium">✓ Auto-Filing in Form 10BD</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => alert(`Receipt ${receiptData.receiptNumber} downloaded successfully. A copy has also been dispatched to ${receiptData.donorEmail}.`)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official 80G PDF Receipt</span>
                  </button>
                  <button
                    onClick={() => setReceiptData(null)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Make Another Contribution
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Donation Formulation */
              <form onSubmit={handleSubmitDonation} className="space-y-6">
                
                {/* 1. Frequency Switcher (Zero-pill segmented buttons) */}
                <div className="flex items-center justify-center">
                  <div className="inline-flex p-1 bg-slate-100/90 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`px-5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        frequency === 'one-time'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      One-Time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`px-5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly Sustainer (Cancel Anytime)
                    </button>
                  </div>
                </div>

                {/* 2. Cause Selection Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Direct Your Contribution Towards:
                  </label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-medium"
                  >
                    {SUB_TOPICS.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Preset Tiers Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Select Impact Amount (INR):
                    </label>
                    <span className="text-[11px] text-slate-500">
                      All amounts in Indian Rupees (₹)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {presetTiers.map((tier) => {
                      const isSelected = selectedAmount === tier.amount && !customAmount;
                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => handleAmountClick(tier.amount)}
                          className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-700 bg-blue-50/70 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`text-base font-bold font-mono tabular-nums ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                            ₹{tier.amount.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] font-medium text-slate-600 mt-0.5 truncate">
                            {tier.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Impact Display Box */}
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>
                      {presetTiers.find(t => t.amount === selectedAmount)?.impact || 
                        `Custom gift of ₹${selectedAmount.toLocaleString('en-IN')} directly funds essential medical and dietary supplies for our residents.`}
                    </span>
                  </div>

                  {/* Custom Amount Field */}
                  <div className="mt-3">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-semibold text-slate-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="Or enter custom donation amount..."
                        value={customAmount}
                        onChange={handleCustomChange}
                        className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Donor Information */}
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="text-xs font-semibold text-slate-700">
                    Donor Details (For Section 80G Tax Exemption Certificate):
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Legal Name *"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address (for 80G PDF receipt) *"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="tel"
                        placeholder="Mobile Number (Optional)"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="PAN Card No. (Required for 80G)"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                        maxLength={10}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 uppercase font-mono focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                      />
                    </div>
                  </div>

                  {/* 80G Checkbox */}
                  <label className="flex items-center gap-2 pt-1 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={request80G}
                      onChange={(e) => setRequest80G(e.target.checked)}
                      className="rounded border-slate-300 text-blue-700 focus:ring-blue-700"
                    />
                    <span>
                      Yes, issue official Section 80G certificate with annual Form 10BD filing for income tax deductions.
                    </span>
                  </label>
                </div>

                {/* 5. Prominent CTA in Accent Color */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <span>Verifying & Generating 80G Receipt...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          Proceed to Donate ₹{selectedAmount.toLocaleString('en-IN')} {frequency === 'monthly' ? '/ month' : ''} (Tax Deductible)
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" /> 256-Bit SSL Encrypted
                    </span>
                    <span>·</span>
                    <span>Direct UPI, Net Banking, Cards & NEFT</span>
                    <span>·</span>
                    <span>FCRA & 80G Compliant</span>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
