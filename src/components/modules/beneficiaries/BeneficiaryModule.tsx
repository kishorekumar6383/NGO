import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { Modal } from '../../ui/Modal';
import { Beneficiary, FoodCategory } from '../../../types';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Utensils, 
  Pill, 
  Calendar, 
  ShieldAlert, 
  FileText, 
  Heart, 
  Sparkles,
  UserCheck
} from 'lucide-react';

interface BeneficiaryModuleProps {
  beneficiaries: Beneficiary[];
  onAddBeneficiary: () => void;
  onViewMedicalRecord: (beneficiaryId: string) => void;
}

export const BeneficiaryModule: React.FC<BeneficiaryModuleProps> = ({
  beneficiaries,
  onAddBeneficiary,
  onViewMedicalRecord
}) => {
  const [activeTypeTab, setActiveTypeTab] = useState<'All' | 'Adult / Elderly' | 'Child Trust'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  const categories: string[] = [
    'All',
    'General',
    'Diabetes-friendly',
    'Soft-food',
    'Allergy-restricted',
    'High-protein',
    'Pediatric Nutrition'
  ];

  const filtered = beneficiaries.filter(b => {
    const matchesType = activeTypeTab === 'All' || b.type === activeTypeTab;
    const matchesCat = selectedCategory === 'All' || b.foodCategory === selectedCategory;
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dietaryPlan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.allergies.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-7">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-purple-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Unified Care Registry
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Beneficiary Management & Food Profiles
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Care dossier tracking diet specifications, allergy restrictions, room wards, and medical conditions.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="md"
          onClick={onAddBeneficiary}
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Beneficiary
        </GlassButton>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Segmented Type Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 max-w-fit">
          <button
            onClick={() => setActiveTypeTab('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTypeTab === 'All' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Residents ({beneficiaries.length})
          </button>
          <button
            onClick={() => setActiveTypeTab('Adult / Elderly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTypeTab === 'Adult / Elderly' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Adult / Elderly Care ({beneficiaries.filter(b => b.type === 'Adult / Elderly').length})
          </button>
          <button
            onClick={() => setActiveTypeTab('Child Trust')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTypeTab === 'Child Trust' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Child Trust ({beneficiaries.filter(b => b.type === 'Child Trust').length})
          </button>
        </div>

        {/* Dietary Category Filter + Search */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl glass-input text-xs text-white cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#141628]">
                {c === 'All' ? 'All Dietary Plans' : c}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search name, ID, allergy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder:text-slate-500 w-56"
            />
          </div>
        </div>
      </div>

      {/* Beneficiary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((b) => (
          <GlassCard
            key={b.id}
            onClick={() => setSelectedBeneficiary(b)}
            className="p-5 flex flex-col justify-between cursor-pointer group hover:border-purple-400/40"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-md border ${
                    b.type === 'Child Trust' 
                      ? 'bg-gradient-to-tr from-indigo-500 to-cyan-500 border-cyan-400/40' 
                      : 'bg-gradient-to-tr from-purple-600 to-violet-600 border-purple-400/40'
                  }`}>
                    {b.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                      {b.name}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                      <span>#{b.id}</span>
                      <span>·</span>
                      <span>{b.age} yrs ({b.gender})</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  b.type === 'Child Trust'
                    ? 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30'
                    : 'text-purple-300 bg-purple-950/40 border-purple-500/30'
                }`}>
                  {b.type === 'Child Trust' ? 'Child Trust' : 'Elderly Care'}
                </span>
              </div>

              {/* Ward Location */}
              <div className="text-xs text-slate-300 mb-3 pb-3 border-b border-white/5 flex items-center gap-1.5">
                <span className="text-slate-500">Unit:</span>
                <span className="font-medium text-slate-200 truncate">{b.roomOrUnit}</span>
              </div>

              {/* Food Category & Allergy Box */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                    Food Category:
                  </span>
                  <span className="font-semibold text-emerald-300">{b.foodCategory}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[11px] text-slate-400 font-medium mb-1">Approved Meal Plan:</div>
                  <div className="text-slate-200 text-xs italic line-clamp-2">
                    "{b.dietaryPlan}"
                  </div>
                </div>

                {/* Allergies Notice */}
                {b.allergies.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-300">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">
                      Allergy: <span className="font-semibold text-rose-200">{b.allergies.join(', ')}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 mt-4 border-t border-white/8 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-indigo-400" />
                <span>{b.activeMedicationsCount} active meds</span>
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewMedicalRecord(b.id);
                }}
                className="text-purple-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Medical Timeline</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Beneficiary Detail Modal */}
      {selectedBeneficiary && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBeneficiary(null)}
          title={`Beneficiary Dossier: ${selectedBeneficiary.name}`}
          subtitle={`Permanent File #${selectedBeneficiary.id} · Admission: ${selectedBeneficiary.admissionDate}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs">
            {/* Top Quick Profile */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-slate-400">Care Program</div>
                <div className="font-bold text-white text-sm mt-0.5">{selectedBeneficiary.type}</div>
              </div>
              <div>
                <div className="text-slate-400">Age / Gender</div>
                <div className="font-bold text-white text-sm mt-0.5">{selectedBeneficiary.age} yrs · {selectedBeneficiary.gender}</div>
              </div>
              <div>
                <div className="text-slate-400">Diet Classification</div>
                <div className="font-bold text-emerald-300 text-sm mt-0.5">{selectedBeneficiary.foodCategory}</div>
              </div>
              <div>
                <div className="text-slate-400">Room / Unit</div>
                <div className="font-bold text-white text-sm mt-0.5 truncate">{selectedBeneficiary.roomOrUnit}</div>
              </div>
            </div>

            {/* Specific Child Trust or Elderly Details */}
            {selectedBeneficiary.type === 'Child Trust' ? (
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-2">
                <div className="font-semibold text-indigo-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Child Trust Guardianship & Education Record
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-400">Designated Guardian:</span> {selectedBeneficiary.guardianName || 'Institutional Trust Board'}
                  </div>
                  <div>
                    <span className="text-slate-400">Guardian Contact:</span> {selectedBeneficiary.guardianContact || '+91 80 4123 9900'}
                  </div>
                  <div>
                    <span className="text-slate-400">Enrolled School:</span> {selectedBeneficiary.schoolGrade || 'Standard Grade'}
                  </div>
                  <div>
                    <span className="text-slate-400">Attendance Rate:</span> {selectedBeneficiary.attendanceRate || 95}%
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2">
                <div className="font-semibold text-purple-200 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-400" />
                  Elderly Care Clinical Context
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400">Primary Chronic Condition:</span>{' '}
                  <span className="font-medium text-white">{selectedBeneficiary.primaryCondition || 'Geriatric Wellness Monitoring'}</span>
                </div>
              </div>
            )}

            {/* Nutrition & Allergies */}
            <div className="space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" />
                Nutritional Plan & Dietary Mandates
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 space-y-2">
                <div>
                  <span className="text-slate-400">Approved Meal Plan:</span>{' '}
                  <span className="text-slate-200">{selectedBeneficiary.dietaryPlan}</span>
                </div>
                <div>
                  <span className="text-slate-400">Known Allergens / Contraindications:</span>{' '}
                  <span className="text-rose-300 font-semibold">
                    {selectedBeneficiary.allergies.length > 0 ? selectedBeneficiary.allergies.join(', ') : 'None documented'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedBeneficiary(null)}
              >
                Close
              </GlassButton>
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => {
                  const id = selectedBeneficiary.id;
                  setSelectedBeneficiary(null);
                  onViewMedicalRecord(id);
                }}
              >
                Open Full Medical History
              </GlassButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
