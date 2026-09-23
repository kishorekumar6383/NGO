import React, { useState } from 'react';
import { SUB_TOPICS, SubTopic } from '../../data/subTopicsData';
import { 
  ArrowRight, 
  Heart, 
  BookOpen, 
  Utensils, 
  Stethoscope, 
  ShieldCheck, 
  Users, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface PlatformSectionProps {
  onSelectTopic: (topicId: string) => void;
  onOpenApp?: (module?: string) => void;
}

export const PlatformSection: React.FC<PlatformSectionProps> = ({
  onSelectTopic,
  onOpenApp
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Elder Care',
    'Child Trust',
    'Nutrition & Kitchen',
    'Healthcare & Pharmacy',
    'Governance & Tax',
    'Community & Volunteers'
  ];

  const filteredTopics = selectedCategory === 'All'
    ? SUB_TOPICS
    : SUB_TOPICS.filter(t => t.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Elder Care': return Heart;
      case 'Child Trust': return BookOpen;
      case 'Nutrition & Kitchen': return Utensils;
      case 'Healthcare & Pharmacy': return Stethoscope;
      case 'Governance & Tax': return ShieldCheck;
      case 'Community & Volunteers': return Users;
      default: return Sparkles;
    }
  };

  return (
    <section id="subtopics" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
            Program Verticals & Operational Dossiers
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3" style={{ textWrap: 'balance' }}>
            Choose an Initiative to View Full Details
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Click on any sub-topic below to redirect to its dedicated dossier containing in-depth background narratives, clinical protocols, audited balance sheets, beneficiary case studies, and daily operational schedules.
          </p>
        </div>

        {/* Category Filter Tabs (Zero-pill discipline: segmented control buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const Icon = getCategoryIcon(topic.category);
            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-700 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Category & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                      <Icon className="w-4 h-4" />
                      <span>{topic.category}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      #{topic.id.slice(0, 8)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
                    {topic.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                    {topic.shortDescription}
                  </p>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-2 gap-3 py-3 px-3.5 bg-slate-50 rounded-lg border border-slate-100 mb-6">
                    {topic.keyMetrics.slice(0, 2).map((km, idx) => (
                      <div key={idx}>
                        <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                          {km.value}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate">
                          {km.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Redirect Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:text-blue-900">
                  <span>View Complete Details & Dossier</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Operational Live Portal */}
        {onOpenApp && (
          <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="max-w-xl">
              <h4 className="text-sm font-bold text-slate-900">
                Are you a CareTrust doctor, food manager, or volunteer staff?
              </h4>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                Access our real-time operational ERP workspace to manage beneficiary admissions, medical charting, food commodity inventory, pharmacy pre-orders, and audit records.
              </p>
            </div>
            <button
              onClick={() => onOpenApp('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
            >
              Open Management Portal →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
