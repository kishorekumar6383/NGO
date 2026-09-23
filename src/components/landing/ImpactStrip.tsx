import React from 'react';

export const ImpactStrip: React.FC = () => {
  const stats = [
    {
      value: '1,480+',
      label: 'Elders Cared For',
      sublabel: 'Full-time nursing, shelter & nutrition'
    },
    {
      value: '820+',
      label: 'Children Educated',
      sublabel: '100% board exam pass rate'
    },
    {
      value: '450K+',
      label: 'Nutritious Meals / Yr',
      sublabel: 'FSSAI certified steam kitchen'
    },
    {
      value: '99.2%',
      label: 'Prescription Fulfill',
      sublabel: 'Zero chronic medicine stock-outs'
    },
    {
      value: '87.4%',
      label: 'Direct Program Spend',
      sublabel: 'Under 6% administrative overhead'
    }
  ];

  return (
    <section id="impact" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
            Measurable Field Outcomes
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Real Numbers. Real Dignity.
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-normal">
            Every statistic represents a human life touched, monitored, and supported through verified non-profit operations.
          </p>
        </div>

        {/* Simple Clean Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-6 md:pt-0 md:pl-6' : ''}`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono tracking-tight tabular-nums mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-900 mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 font-normal leading-normal">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
