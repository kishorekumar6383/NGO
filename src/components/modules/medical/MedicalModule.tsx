import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { Modal } from '../../ui/Modal';
import { MedicalRecord, Beneficiary } from '../../../types';
import { 
  FileHeart, 
  Plus, 
  Calendar, 
  Pill, 
  UserCheck, 
  FileText, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Info,
  ChevronRight,
  Activity,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

interface MedicalModuleProps {
  medicalRecords: MedicalRecord[];
  beneficiaries: Beneficiary[];
  onAddRecord: (record: MedicalRecord) => void;
}

export const MedicalModule: React.FC<MedicalModuleProps> = ({
  medicalRecords,
  beneficiaries,
  onAddRecord
}) => {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState<'All' | 'Adult / Elderly' | 'Child Trust'>('All');

  // Form states for new consultation
  const [beneficiaryId, setBeneficiaryId] = useState(beneficiaries[0]?.id || 'CT-1024');
  const [doctorName, setDoctorName] = useState('Dr. Priya Sundaram, MD (Geriatrics)');
  const [diagnosisNotes, setDiagnosisNotes] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Twice daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('2026-12-31');
  const [followUpDate, setFollowUpDate] = useState('2026-10-15');

  const filteredRecords = filterType === 'All'
    ? medicalRecords
    : medicalRecords.filter(r => r.beneficiaryType === filterType);

  const activeMedicationsCount = medicalRecords.filter(r => r.status === 'Active').length;
  const followUpsDueCount = medicalRecords.filter(r => r.status === 'Follow-up Due').length;

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const benef = beneficiaries.find(b => b.id === beneficiaryId);
    const newRecord: MedicalRecord = {
      id: `MED-REC-${String(medicalRecords.length + 1).padStart(2, '0')}`,
      beneficiaryId,
      beneficiaryName: benef ? benef.name : 'Resident',
      beneficiaryType: benef ? benef.type : 'Adult / Elderly',
      date: new Date().toISOString().split('T')[0],
      doctorName,
      diagnosisNotes,
      prescription: `Rx #Rx-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
      followUpDate,
      status: 'Active',
      documentsAttached: ['Clinical_Encounter_Summary.pdf'],
      confidentialityLevel: benef?.type === 'Child Trust' ? 'Restricted (Child Trust)' : 'Medical Staff Only'
    };

    onAddRecord(newRecord);
    setShowAddModal(false);
    setDiagnosisNotes('');
    setMedicationName('');
    setDosage('');
  };

  return (
    <div className="space-y-7">
      {/* Top Banner with Medical Disclaimer */}
      <div className="p-6 rounded-2xl glass-panel-elevated border-rose-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileHeart className="w-3.5 h-3.5 text-rose-400" />
                Clinical Workflow & Health Records
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Medical Records & Treatment Timeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Documenting visiting physician consultations, prescription regimens, and follow-up schedules.
            </p>
          </div>

          <GlassButton
            variant="primary"
            size="md"
            onClick={() => setShowAddModal(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Log Doctor Consultation
          </GlassButton>
        </div>

        {/* Mandatory Regulatory / Safety Disclaimer Box */}
        <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-400/25 flex items-start gap-2.5 text-xs text-purple-200">
          <Info className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-white">Record-Management & Workflow Notice:</span> CareTrust operates exclusively as an organizational record-management and nursing workflow coordination system. The platform does not independently diagnose medical conditions, suggest therapies, or prescribe medications. All clinical entries require authorized visiting physician sign-off.
          </div>
        </div>
      </div>

      {/* 4 Clinical Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Beneficiaries Monitored</span>
            <UserCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">158</div>
          <div className="text-xs text-purple-300 mt-2">100% vital baselines logged</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Active Prescription Regimens</span>
            <Pill className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tabular-nums">
            {activeMedicationsCount}
          </div>
          <div className="text-xs text-emerald-300 mt-2">Nursing shift administration</div>
        </GlassCard>

        <GlassCard className="p-5 border-amber-500/20">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Follow-Ups Due Soon</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300 tabular-nums">
            {followUpsDueCount}
          </div>
          <div className="text-xs text-amber-400 mt-2">Next: Dr. Mehta (Pediatrics)</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Access Guardrails</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">RBAC</div>
          <div className="text-xs text-indigo-300 mt-2">Child Trust dossiers encrypted</div>
        </GlassCard>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setFilterType('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              filterType === 'All' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Encounters ({medicalRecords.length})
          </button>
          <button
            onClick={() => setFilterType('Adult / Elderly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              filterType === 'Adult / Elderly' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Adult / Elderly Care
          </button>
          <button
            onClick={() => setFilterType('Child Trust')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              filterType === 'Child Trust' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Child Trust Pediatrics
          </button>
        </div>
      </div>

      {/* Medical Timeline Records */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <GlassCard
            key={record.id}
            onClick={() => setSelectedRecord(record)}
            className="p-6 cursor-pointer group hover:border-purple-400/40"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                    {record.beneficiaryName}
                  </span>
                  <span className="text-xs font-mono text-slate-400">#{record.beneficiaryId}</span>
                  <StatusBadge status={record.status} />
                  <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {record.confidentialityLevel}
                  </span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
                  <span>Attending: <strong className="text-white">{record.doctorName}</strong></span>
                  <span className="text-slate-500">·</span>
                  <span>Date: {record.date}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-purple-300 bg-purple-950/40 border border-purple-500/25 px-2.5 py-1 rounded-lg">
                  {record.prescription}
                </span>
              </div>
            </div>

            {/* Medical Timeline Visual Flow: Consultation -> Prescription -> Medication -> Follow-up */}
            <div className="pt-5 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              {/* Step 1: Consultation */}
              <div className="p-3 rounded-xl bg-white/[0.025] border border-white/8 relative">
                <div className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  1. Consultation
                </div>
                <div className="font-medium text-white mb-0.5">{record.date}</div>
                <div className="text-slate-400 text-[11px] line-clamp-2">
                  {record.diagnosisNotes}
                </div>
              </div>

              {/* Step 2: Prescription Added */}
              <div className="p-3 rounded-xl bg-white/[0.025] border border-white/8">
                <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                  2. Prescription Added
                </div>
                <div className="font-medium text-white mb-0.5">{record.prescription}</div>
                <div className="text-slate-400 text-[11px]">
                  Authorized by {record.doctorName.split(',')[0]}
                </div>
              </div>

              {/* Step 3: Medication Started */}
              <div className="p-3 rounded-xl bg-white/[0.025] border border-white/8">
                <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                  <Pill className="w-3 h-3 text-emerald-400" />
                  3. Medication Regimen
                </div>
                <div className="font-medium text-emerald-300 mb-0.5 truncate">{record.medicationName}</div>
                <div className="text-slate-400 text-[11px]">
                  {record.dosage} · {record.frequency}
                </div>
              </div>

              {/* Step 4: Follow-up Scheduled */}
              <div className="p-3 rounded-xl bg-white/[0.025] border border-white/8">
                <div className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  4. Follow-Up Date
                </div>
                <div className="font-medium text-amber-300 mb-0.5">{record.followUpDate}</div>
                <div className="text-slate-400 text-[11px]">
                  Scheduled evaluation & vitals check
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3.5 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Documents: {record.documentsAttached.join(', ')}</span>
              </div>
              <span className="text-purple-300 group-hover:text-purple-200 font-medium flex items-center gap-1">
                <span>View Full Clinical Record</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecord(null)}
          title={`Clinical Encounter: ${selectedRecord.beneficiaryName} (${selectedRecord.prescription})`}
          subtitle={`Attending Doctor: ${selectedRecord.doctorName} · Encounter Date: ${selectedRecord.date}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Doctor's Clinical Observations
              </div>
              <p className="text-slate-200 leading-relaxed text-sm">
                {selectedRecord.diagnosisNotes}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-1.5">
                <div className="text-slate-400 font-semibold">Prescribed Medication</div>
                <div className="text-white font-bold text-sm">{selectedRecord.medicationName}</div>
                <div className="text-slate-300">Dosage: {selectedRecord.dosage}</div>
                <div className="text-slate-300">Frequency: {selectedRecord.frequency}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-1.5">
                <div className="text-slate-400 font-semibold">Timeline & Duration</div>
                <div className="text-slate-300">Start Date: <span className="text-white font-mono">{selectedRecord.startDate}</span></div>
                <div className="text-slate-300">End Date: <span className="text-white font-mono">{selectedRecord.endDate}</span></div>
                <div className="text-amber-300 font-semibold mt-1">
                  Follow-up: <span className="font-mono">{selectedRecord.followUpDate}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-slate-300">
              <div className="font-semibold text-purple-200 mb-1">Attached Medical Documents</div>
              <div className="flex items-center gap-2 text-xs">
                {selectedRecord.documentsAttached.map((doc, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedRecord(null)}
              >
                Close Record
              </GlassButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Log Doctor Consultation Modal */}
      {showAddModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowAddModal(false)}
          title="Log Doctor Consultation & Prescription"
          subtitle="Record clinical encounter conducted by visiting physician"
          maxWidth="2xl"
        >
          <form onSubmit={handleCreateRecord} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Beneficiary</label>
                <select
                  value={beneficiaryId}
                  onChange={(e) => setBeneficiaryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer"
                >
                  {beneficiaries.map((b) => (
                    <option key={b.id} value={b.id} className="bg-[#141628]">
                      {b.name} (#{b.id} · {b.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Attending Physician</label>
                <input
                  type="text"
                  required
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Clinical Observations & Diagnosis Notes
              </label>
              <textarea
                required
                rows={2}
                placeholder="Doctor's notes, vitals recorded (BP, pulse, blood glucose), progress assessment..."
                value={diagnosisNotes}
                onChange={(e) => setDiagnosisNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Medication Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Metformin 500mg"
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Dosage</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 tab morning & night"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer"
                >
                  <option value="Once daily" className="bg-[#141628]">Once daily</option>
                  <option value="Twice daily" className="bg-[#141628]">Twice daily</option>
                  <option value="Thrice daily" className="bg-[#141628]">Thrice daily</option>
                  <option value="At bedtime" className="bg-[#141628]">At bedtime</option>
                  <option value="As needed (SOS)" className="bg-[#141628]">As needed (SOS)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Next Follow-Up Date</label>
                <input
                  type="date"
                  required
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <GlassButton
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                type="submit"
                variant="primary"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Save Clinical Encounter
              </GlassButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
