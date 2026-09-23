import React from 'react';
import { ShieldCheck, FileCheck, Award, ArrowUpRight } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  return (
    <section id="transparency" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Institutional Trust & Governance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
              Radical Transparency. Zero Ambiguity.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              We operate as a public trust in every sense of the word. Our audited balance sheets, statutory Form 10B audit filings, and procurement receipts are open for public examination at all times.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">87.4% Direct Program Expenditure</h4>
                  <p className="text-xs text-slate-500">Every ₹100 contributed puts ₹87.40 directly into food, clinical medicine, and educational scholarships.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Annual External Statutory Audits</h4>
                  <p className="text-xs text-slate-500">Audited independently by Chartered Accountants with clean unqualified auditor opinions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">NITI Aayog Darpan & Section 12A Certified</h4>
                  <p className="text-xs text-slate-500">Registered NGO under Darpan portal (KA/2019/0248812) with perpetual Section 80G approval.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 pb-3 border-b border-slate-200">
                FY 2024-25 Fund Utilization Ledger
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-800">Elderly Assisted Living & Healthcare</span>
                    <span className="font-mono text-blue-700">46.5%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-700 rounded-full" style={{ width: '46.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-800">Child Trust Schooling & Pediatric Care</span>
                    <span className="font-mono text-blue-700">26.2%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '26.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-800">Community Steam Kitchen & Nutrition</span>
                    <span className="font-mono text-blue-700">14.7%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '14.7%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-800">Free Medicine Dispensary Reserve</span>
                    <span className="font-mono text-blue-700">7.4%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '7.4%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-800">Administrative, Audits & Statutory Filings</span>
                    <span className="font-mono text-slate-500">5.2%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 rounded-full" style={{ width: '5.2%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Auditor: R. Narayanan & Co.</span>
                <span className="font-semibold text-blue-700 hover:underline cursor-pointer inline-flex items-center gap-1" onClick={() => alert('CareTrust Foundation Full Annual Audit Report (FY 2024-25) has been marked for review.')}>
                  <span>Audited Returns PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
