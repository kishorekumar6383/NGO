import React from 'react';
import { SUB_TOPICS } from '../../data/subTopicsData';
import { ShieldCheck, Heart } from 'lucide-react';

interface LandingFooterProps {
  onOpenApp: (section?: string) => void;
  onSelectTopic: (topicId: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onOpenApp,
  onSelectTopic,
  onScrollToSection
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 sm:py-16 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Identity & Legal */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              CareTrust Foundation
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              A registered Public Charitable Trust dedicated to round-the-clock elderly assisted care, geriatric healthcare, and child educational sponsorship.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div>Trust Reg: <strong className="text-slate-700">BLR-TRUST-2018-0941</strong></div>
              <div>Section 80G URN: <strong className="text-slate-700">AABTC8823ME20214</strong></div>
              <div>PAN: <strong className="text-slate-700 font-mono">AABTC8823M</strong></div>
              <div>Darpan ID: <strong className="text-slate-700">KA/2019/0248812</strong></div>
            </div>
          </div>

          {/* Col 2: Sub-Topics Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Sub-Topics
            </h4>
            <ul className="space-y-2">
              {SUB_TOPICS.slice(0, 4).map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTopic(t.id)}
                    className="text-slate-600 hover:text-blue-700 text-left transition-colors cursor-pointer"
                  >
                    {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Governance & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Transparency & Giving
            </h4>
            <ul className="space-y-2">
              {SUB_TOPICS.slice(4).map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTopic(t.id)}
                    className="text-slate-600 hover:text-blue-700 text-left transition-colors cursor-pointer"
                  >
                    {t.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onScrollToSection('donate')}
                  className="text-blue-700 hover:text-blue-900 font-medium transition-colors cursor-pointer"
                >
                  Section 80G Tax Donation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('transparency')}
                  className="text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Annual Audited Statements
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Staff Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Headquarters & Portal
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              CareTrust Campus, 42 Green Meadows Boulevard, JP Nagar 7th Phase, Bengaluru, Karnataka 560078
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenApp('dashboard')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-md transition-colors text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Staff & Management Portal</span>
                <span className="text-[10px] text-slate-500">→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CareTrust Foundation. All rights reserved. 50% Tax Deductible under Sec 80G.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-700 cursor-pointer">Privacy Safeguards</span>
            <span>·</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms of Trust</span>
            <span>·</span>
            <span className="hover:text-slate-700 cursor-pointer">FCRA Declarations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
