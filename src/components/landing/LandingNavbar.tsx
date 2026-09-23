import React, { useState } from 'react';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';

interface LandingNavbarProps {
  onOpenApp: (section?: string) => void;
  onOpenAuth: () => void;
  onScrollToSection: (sectionId: string) => void;
  onSelectTopic: (topicId: string) => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onOpenApp,
  onOpenAuth,
  onScrollToSection,
  onSelectTopic
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Strict 3-Zone Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <div className="flex items-center gap-3">
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); onScrollToSection('top'); }}
              className="text-lg font-bold tracking-tight text-slate-900 hover:text-blue-700 transition-colors"
            >
              CareTrust Foundation
            </a>
            <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">
              80G Certified Non-Profit
            </span>
          </div>

          {/* Zone 2: 4-6 Clean Text Nav Links with Hover Underlines */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onScrollToSection('mission')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Our Mission
            </button>
            <button
              onClick={() => onScrollToSection('subtopics')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Sub-Topics & Programs
            </button>
            <button
              onClick={() => onScrollToSection('impact')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Verified Impact
            </button>
            <button
              onClick={() => onScrollToSection('transparency')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Financial Audits
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenApp('dashboard')}
              className="hidden lg:inline-flex px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Open Back-office NGO Management Suite"
            >
              Operations Portal
            </button>

            <button
              onClick={() => onScrollToSection('donate')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Donate Now
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3">
            <button
              onClick={() => { onScrollToSection('mission'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
            >
              Our Mission
            </button>
            <button
              onClick={() => { onScrollToSection('subtopics'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
            >
              Sub-Topics & Programs
            </button>
            <button
              onClick={() => { onScrollToSection('impact'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
            >
              Verified Impact
            </button>
            <button
              onClick={() => { onScrollToSection('transparency'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-700"
            >
              Financial Audits
            </button>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => { onOpenApp('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-center py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md"
              >
                Access Operations Portal
              </button>
              <button
                onClick={() => { onScrollToSection('donate'); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 text-xs font-semibold text-white bg-blue-700 rounded-md"
              >
                Donate Now (Section 80G)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
