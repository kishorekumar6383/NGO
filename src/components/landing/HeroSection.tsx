import React from 'react';
import { ArrowRight, HeartHandshake, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToDonate: () => void;
  onScrollToSubTopics: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToDonate,
  onScrollToSubTopics
}) => {
  return (
    <section id="mission" className="bg-white py-12 sm:py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Mission & Headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-xs font-semibold text-blue-800">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Registered Section 80G Public Charitable Trust · 50% Tax Exemption</span>
            </div>

            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              Dignity for Every Elder. <br className="hidden sm:inline" />
              <span className="text-blue-700">Hope for Every Child.</span>
            </h1>

            {/* Clear Mission Statement */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              CareTrust Foundation is a registered charitable foundation providing round-the-clock assisted living, geriatric healthcare, and child educational sponsorship across vulnerable communities. We operate with radical financial transparency, zero administrative waste, and measurable human outcomes.
            </p>

            {/* Key Trust Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>80G Tax Deductible</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Annual Public Audits</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Zero Food Waste Protocol</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                onClick={onScrollToDonate}
                className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Donate to CareTrust</span>
              </button>

              <button
                onClick={onScrollToSubTopics}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore All Sub-Topics & Dossiers</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Right Column: Real Photography Frame of People */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg">
              {/* Authentic Photography Visual Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor caring compassionately for an elderly patient at CareTrust community clinic"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to second real photo if primary has connectivity limits
                    const target = e.currentTarget;
                    if (!target.dataset.tried) {
                      target.dataset.tried = 'true';
                      target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80';
                    }
                  }}
                />

                {/* Subdued contrast scrim for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Authentic Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="text-[11px] font-semibold tracking-wide uppercase text-blue-200 mb-1">
                    CareTrust Campus · Bengaluru
                  </div>
                  <p className="text-sm font-medium leading-snug text-white/95">
                    Dr. Priya Sundaram conducting morning clinical rounds with resident elders in the Green Meadows Pavilion.
                  </p>
                </div>
              </div>

              {/* Bottom trust bar */}
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-900">184 Elders</span>
                <span className="text-slate-300">·</span>
                <span className="font-semibold text-slate-900">820 Children</span>
                <span className="text-slate-300">·</span>
                <span className="font-semibold text-blue-700">100% Non-Profit</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
