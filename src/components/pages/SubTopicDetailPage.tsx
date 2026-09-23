import React, { useState, useEffect } from 'react';
import { SubTopic, SUB_TOPICS } from '../../data/subTopicsData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  HeartHandshake, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  Users,
  DollarSign,
  Calendar,
  Share2,
  Sparkles
} from 'lucide-react';

interface SubTopicDetailPageProps {
  topicId: string;
  onBack: () => void;
  onSelectTopic: (id: string) => void;
  onOpenDonateForTopic: (topicTitle: string, defaultAmount?: number) => void;
}

export const SubTopicDetailPage: React.FC<SubTopicDetailPageProps> = ({
  topicId,
  onBack,
  onSelectTopic,
  onOpenDonateForTopic
}) => {
  const topic = SUB_TOPICS.find(t => t.id === topicId) || SUB_TOPICS[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'case-study' | 'budget' | 'schedule' | 'support'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('overview');
  }, [topicId]);

  // Find next and previous topics for smooth browsing
  const currentIndex = SUB_TOPICS.findIndex(t => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? SUB_TOPICS[currentIndex - 1] : SUB_TOPICS[SUB_TOPICS.length - 1];
  const nextTopic = currentIndex < SUB_TOPICS.length - 1 ? SUB_TOPICS[currentIndex + 1] : SUB_TOPICS[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-slate-200 bg-slate-50/70 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-medium text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 hidden sm:inline">Initiatives</span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="font-semibold text-slate-900 truncate max-w-[220px] sm:max-w-xs">{topic.title}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Topic'}</span>
            </button>
            <button
              onClick={() => onOpenDonateForTopic(topic.title, topic.howToSupportTiers[0]?.amount || 1500)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Donate to This Cause</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
                {topic.category} · Field Dossier & Operations
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight" style={{ textWrap: 'balance' }}>
                {topic.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
                {topic.subtitle}
              </p>
              
              <div className="p-4 bg-blue-50/70 border-l-4 border-blue-700 rounded-r-lg">
                <p className="text-sm font-medium text-blue-950 italic">
                  "{topic.heroTagline}"
                </p>
              </div>
            </div>

            {/* Quick Impact Metric Card */}
            <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-xl p-6 shrink-0">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>Verified Field Metrics</span>
                <ShieldCheck className="w-4 h-4 text-blue-700" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {topic.keyMetrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">
                      {m.value}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onOpenDonateForTopic(topic.title)}
                className="mt-6 w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sponsor This Initiative</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="border-b border-slate-200 bg-white sticky top-[49px] z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Overview & Narrative', icon: FileText },
              { id: 'pillars', label: 'Operational Pillars', icon: ShieldCheck },
              { id: 'case-study', label: 'Real Case Study', icon: Users },
              { id: 'budget', label: 'Audited Budget', icon: DollarSign },
              ...(topic.dailySchedule ? [{ id: 'schedule', label: 'Daily Schedule', icon: Clock }] : []),
              { id: 'support', label: 'Support & FAQs', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap inline-flex items-center gap-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Operational Mission & Background
                </h2>
                <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed text-base">
                  {topic.overviewNarrative.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Direct Guarantees */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                    Core Operational Commitments
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">Zero Administrative Waste</h4>
                          <p className="text-xs text-slate-600 mt-1">Direct allocations tracked to physical commodities, medicines, and schooling kits.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">Full Statutory Compliance</h4>
                          <p className="text-xs text-slate-600 mt-1">FSSAI food hygiene, POCSO child safeguarding, and WHO-GMP pharmaceuticals.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Sponsor & Info */}
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Ways to Back This Program
                  </h3>
                  <div className="space-y-3">
                    {topic.howToSupportTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white border border-slate-200 rounded-lg hover:border-blue-700 transition-colors cursor-pointer group"
                        onClick={() => onOpenDonateForTopic(topic.title, tier.amount)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{tier.title}</span>
                          <span className="text-sm font-bold text-blue-700 font-mono tabular-nums">₹{tier.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal">{tier.impactText}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Tax Exemption</span>
                    <span className="font-semibold text-blue-700">Section 80G Certified</span>
                  </div>
                </div>

                <div className="p-5 border border-slate-200 rounded-xl bg-blue-50/50">
                  <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Donor Guarantee</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    100% of your designated funds are strictly ring-fenced for this program. You will receive an automated Form 10BE tax invoice immediately via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATIONAL PILLARS */}
        {activeTab === 'pillars' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Operational Framework & Sub-Sections
              </h2>
              <p className="text-sm text-slate-600">
                Detailed methodology and standard operating procedures applied across our facilities daily.
              </p>
            </div>

            <div className="space-y-6">
              {topic.subSections.map((sub, idx) => (
                <div key={sub.id} className="p-6 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {sub.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 font-medium">
                    {sub.summary}
                  </p>
                  <ul className="space-y-2.5">
                    {sub.detailedPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REAL CASE STUDY */}
        {activeTab === 'case-study' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Verified Field Case Study
                  </span>
                  <span className="text-xs text-slate-500">
                    Location: {topic.caseStudy.location}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {topic.caseStudy.beneficiaryName}, {topic.caseStudy.age} Years Old
                </h2>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Initial Circumstances & Diagnosis
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200/80">
                    {topic.caseStudy.background}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    CareTrust Foundation Intervention
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-blue-50/40 p-4 rounded-lg border border-blue-100">
                    {topic.caseStudy.intervention}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Current Clinical & Social Outcome
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-emerald-50/40 p-4 rounded-lg border border-emerald-100">
                    {topic.caseStudy.currentOutcome}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <blockquote className="text-base sm:text-lg italic font-medium text-slate-800 border-l-4 border-blue-700 pl-4 py-1">
                    {topic.caseStudy.quote}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AUDITED BUDGET */}
        {activeTab === 'budget' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Monthly Program Financial Ledger
              </h2>
              <p className="text-sm text-slate-600">
                Audited monthly expenditure breakdown for this program. Total average operating budget is publicly accounted for.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-5">Operational Expense Category</th>
                      <th className="py-3.5 px-5 text-right">Allocation</th>
                      <th className="py-3.5 px-5 text-right">Avg Monthly Spend</th>
                      <th className="py-3.5 px-5">Scope & Deliverables</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topic.budgetBreakdown.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-5 font-semibold text-slate-900">{b.category}</td>
                        <td className="py-4 px-5 text-right font-mono tabular-nums font-bold text-blue-700">
                          {b.percentage}%
                        </td>
                        <td className="py-4 px-5 text-right font-mono tabular-nums text-slate-900 font-medium">
                          {b.amountPerMonth}
                        </td>
                        <td className="py-4 px-5 text-xs text-slate-600 leading-normal">{b.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Need Certified Balance Sheets?</h4>
                <p className="text-xs text-slate-500">Download our signed Form 10B audit filings and statutory return proofs.</p>
              </div>
              <button
                onClick={() => alert('CareTrust Foundation Form 10B & Statutory Audit Report (FY 2024-25) verified by R. Narayanan & Associates, Chartered Accountants is available in the Reports section.')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                View Auditor Certification
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: DAILY SCHEDULE */}
        {activeTab === 'schedule' && topic.dailySchedule && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Standard Daily Operational Schedule
              </h2>
              <p className="text-sm text-slate-600">
                Rigorous 24-hour care and routine timeline maintained 365 days a year.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl bg-white divide-y divide-slate-100 overflow-hidden shadow-sm">
              {topic.dailySchedule.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="sm:w-56 shrink-0">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                      {item.time}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{item.activity}</h4>
                    <p className="text-xs text-slate-600 leading-normal">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SUPPORT & FAQS */}
        {activeTab === 'support' && (
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Frequently Asked Questions & Donor Guide
              </h2>
              <p className="text-sm text-slate-600">
                Clear answers regarding admissions, donations, Section 80G tax benefits, and campus visits.
              </p>
            </div>

            <div className="space-y-4">
              {topic.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <h3 className="text-base font-semibold text-slate-900 mb-2 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Donation Banner */}
            <div className="p-6 sm:p-8 bg-blue-700 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-xl font-bold mb-2">Make a Direct Impact for {topic.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Join our patron circle today. All contributions receive an instant Section 80G certified tax exemption certificate valid throughout India.
                </p>
              </div>
              <button
                onClick={() => onOpenDonateForTopic(topic.title)}
                className="px-6 py-3 bg-white text-blue-800 hover:bg-blue-50 font-semibold text-sm rounded-lg transition-colors shadow-md shrink-0 cursor-pointer"
              >
                Donate to This Cause Now
              </button>
            </div>
          </div>
        )}

        {/* Sub-Topics Carousel / Explorer */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Explore More Programs
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Other Initiatives at CareTrust
              </h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
            >
              View All Sub-Topics →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUB_TOPICS.filter(t => t.id !== topic.id).slice(0, 3).map((other) => (
              <div
                key={other.id}
                onClick={() => onSelectTopic(other.id)}
                className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-700 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    {other.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {other.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-blue-700 font-medium">
                  <span>Read Full Dossier</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prev / Next Footer Switcher */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 text-xs">
            <button
              onClick={() => onSelectTopic(prevTopic.id)}
              className="text-slate-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous: {prevTopic.title}</span>
            </button>
            <button
              onClick={() => onSelectTopic(nextTopic.id)}
              className="text-slate-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Next: {nextTopic.title}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
