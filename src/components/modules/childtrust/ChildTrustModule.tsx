import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { Modal } from '../../ui/Modal';
import { Beneficiary } from '../../../types';
import { 
  Sparkles, 
  GraduationCap, 
  Heart, 
  ShieldCheck, 
  UserCheck, 
  Utensils, 
  FileText, 
  Calendar, 
  BookOpen, 
  Plus, 
  AlertTriangle,
  Award
} from 'lucide-react';

interface ChildTrustModuleProps {
  childrenBeneficiaries: Beneficiary[];
  onOpenBeneficiaryDetail: (child: Beneficiary) => void;
  onAddChild: () => void;
}

export const ChildTrustModule: React.FC<ChildTrustModuleProps> = ({
  childrenBeneficiaries,
  onOpenBeneficiaryDetail,
  onAddChild
}) => {
  const [selectedCaseNoteChild, setSelectedCaseNoteChild] = useState<Beneficiary | null>(null);
  const [newNote, setNewNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<Record<string, string[]>>({
    'CT-1025': [
      '2026-09-12: Ananya passed Standard 5 Mathematics midterm with 92% score. Teacher noted strong aptitude in mental arithmetic.',
      '2026-08-20: Pediatric dental checkup completed. No caries found; daily fluoride rinse protocol continuing.'
    ],
    'CT-1027': [
      '2026-09-15: Vihaan demonstrated steady progress in reading fluency. Enrolled in weekend robotics club funded by Tech for Kids grant.',
      '2026-08-04: Mild seasonal rhinitis resolved with saline nebulization.'
    ]
  });

  const handleAddCaseNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedCaseNoteChild) return;

    const childId = selectedCaseNoteChild.id;
    const dateStamp = new Date().toISOString().split('T')[0];
    const fullNote = `${dateStamp}: ${newNote}`;

    setSavedNotes(prev => ({
      ...prev,
      [childId]: [fullNote, ...(prev[childId] || [])]
    }));
    setNewNote('');
  };

  return (
    <div className="space-y-7">
      {/* Top Banner with Cyan/Indigo Visual Separation */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-[#0a192f]/60 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(6,182,212,0.12)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Child Trust Safeguards & Education Shield
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Child Trust Welfare & Academic Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Safeguarded enclave managing 64 wards with encrypted educational files, guardian records, and nutritional health.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <GlassButton
              variant="primary"
              size="md"
              onClick={onAddChild}
              icon={<Plus className="w-4 h-4" />}
            >
              Enroll Child Ward
            </GlassButton>
          </div>
        </div>

        {/* Protection Notice */}
        <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-400/25 flex items-center gap-2.5 text-xs text-cyan-200">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Juvenile Justice (Care and Protection of Children) Governance: Child records are pseudonymized and restricted to authorized child welfare officers.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 border-cyan-500/20">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Child Trust Wards</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-300 tabular-nums">
            64 <span className="text-sm font-normal text-slate-400">children</span>
          </div>
          <div className="text-xs text-cyan-300 mt-2">Ages 5 to 17 under care</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>School Enrollment</span>
            <GraduationCap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">100%</div>
          <div className="text-xs text-purple-300 mt-2">Formal English-medium schools</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Average Attendance</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tabular-nums">96.8%</div>
          <div className="text-xs text-emerald-300 mt-2">Tracked daily via class reports</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Nutritional Fortification</span>
            <Utensils className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">Full</div>
          <div className="text-xs text-amber-300 mt-2">Iron, calcium & micro-nutrients</div>
        </GlassCard>
      </div>

      {/* Child Dossier Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Active Child Trust Enrolment Dossiers</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {childrenBeneficiaries.map((child) => (
            <GlassCard key={child.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 border border-cyan-400/40 flex items-center justify-center font-bold text-sm text-white shadow-md">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{child.name}</h4>
                      <div className="text-xs text-slate-400 font-mono">
                        #{child.id} · {child.age} yrs ({child.gender})
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    {child.roomOrUnit}
                  </span>
                </div>

                {/* Academic & Guardianship Box */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 mb-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      Enrolled Grade:
                    </span>
                    <span className="font-semibold text-white">{child.schoolGrade}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">School Attendance:</span>
                    <span className="font-mono font-bold text-emerald-400">{child.attendanceRate}%</span>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-slate-400">Appointed Guardian:</span>
                    <span className="text-slate-200 truncate max-w-[130px]">{child.guardianName}</span>
                  </div>
                </div>

                {/* Dietary Profile */}
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Diet Scheme:</span>
                    <span className="text-emerald-300 font-medium">{child.foodCategory}</span>
                  </div>
                  {child.allergies.length > 0 && (
                    <div className="flex items-center gap-1 text-rose-300 text-[11px]">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      <span>Allergy: {child.allergies.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-white/8 flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenBeneficiaryDetail(child)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Full Profile
                </button>

                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedCaseNoteChild(child)}
                  icon={<FileText className="w-3.5 h-3.5 text-cyan-300" />}
                >
                  Case Notes ({savedNotes[child.id]?.length || 0})
                </GlassButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Case Notes Drawer/Modal */}
      {selectedCaseNoteChild && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCaseNoteChild(null)}
          title={`Confidential Case Notes: ${selectedCaseNoteChild.name}`}
          subtitle={`Child Trust Ward #${selectedCaseNoteChild.id} · Academic Year 2026-27`}
          maxWidth="xl"
        >
          <div className="space-y-4 text-xs">
            {/* Form to log new note */}
            <form onSubmit={handleAddCaseNote} className="space-y-2">
              <label className="block font-semibold text-slate-300">
                Add Welfare / Academic Progress Note
              </label>
              <textarea
                required
                rows={2}
                placeholder="Log academic milestones, behavioral observations, psychological welfare updates..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white text-xs resize-none"
              />
              <div className="flex justify-end">
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<Plus className="w-3.5 h-3.5" />}
                >
                  Save Case Entry
                </GlassButton>
              </div>
            </form>

            {/* Existing Timeline Notes */}
            <div className="space-y-2.5 pt-3 border-t border-white/10">
              <div className="font-semibold text-white">Chronological Case Log</div>
              {savedNotes[selectedCaseNoteChild.id]?.length ? (
                savedNotes[selectedCaseNoteChild.id].map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/8 text-slate-300 leading-relaxed">
                    {note}
                  </div>
                ))
              ) : (
                <div className="text-slate-500 py-3 text-center">No additional case notes logged yet.</div>
              )}
            </div>

            <div className="flex justify-end pt-3">
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedCaseNoteChild(null)}
              >
                Close Log
              </GlassButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
