import React, { useState } from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { StatusBadge } from '../../ui/StatusBadge';
import { Modal } from '../../ui/Modal';
import { Volunteer } from '../../../types';
import { 
  HandHeart, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Briefcase,
  SlidersHorizontal
} from 'lucide-react';

interface VolunteerModuleProps {
  volunteers: Volunteer[];
  onAddVolunteer: (volunteer: Volunteer) => void;
  onAssignTask: (volunteerId: string, task: string) => void;
}

export const VolunteerModule: React.FC<VolunteerModuleProps> = ({
  volunteers,
  onAddVolunteer,
  onAssignTask
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkill, setFilterSkill] = useState('All');
  const [showMatchingModal, setShowMatchingModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Matching tool state
  const [matchSkillRequired, setMatchSkillRequired] = useState('Senior Care Companionship');
  const [matchTaskDescription, setMatchTaskDescription] = useState('Conduct morning mobility walk and reading session with Block A elderly residents');
  const [assignedSuccessVolunteer, setAssignedSuccessVolunteer] = useState<string | null>(null);

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSkills, setRegSkills] = useState('Math & Science Tutoring, Music & Art Therapy');
  const [regAvailability, setRegAvailability] = useState('Weekends (Saturday & Sunday 10am - 3pm)');

  const skillsList = ['All', 'Teaching', 'Elderly Care', 'Kitchen Assistance', 'Medical Support', 'Child Mentorship'];

  const filtered = volunteers.filter(v => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.assignedTask || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalHoursContributed = volunteers.reduce((sum, v) => sum + (v.serviceHoursCompleted ?? v.hoursContributed ?? 0), 0);

  // Suggested candidates matching the skill
  const matchingCandidates = volunteers.filter(v => 
    v.skills.some(s => s.toLowerCase().includes(matchSkillRequired.toLowerCase().split(' ')[0])) ||
    v.status === 'Active'
  );

  const handleExecuteAssignment = (volunteerId: string) => {
    onAssignTask(volunteerId, matchTaskDescription);
    const vol = volunteers.find(v => v.id === volunteerId);
    setAssignedSuccessVolunteer(vol ? vol.name : 'Volunteer');
    setTimeout(() => {
      setAssignedSuccessVolunteer(null);
      setShowMatchingModal(false);
    }, 1800);
  };

  const handleRegisterVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    const newVolunteer: Volunteer = {
      id: `VOL-${Math.floor(400 + Math.random() * 500)}`,
      name: regName,
      email: regEmail || 'volunteer@caretrust.org',
      phone: regPhone || '+91 98450 12345',
      skills: regSkills.split(',').map(s => s.trim()),
      availability: regAvailability,
      verificationStatus: 'Verified',
      assignedTask: 'Orientation & Shadowing',
      hoursContributed: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    onAddVolunteer(newVolunteer);
    setShowRegisterModal(false);
    setRegName('');
  };

  return (
    <div className="space-y-7">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel-elevated border-indigo-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <HandHeart className="w-3.5 h-3.5 text-indigo-400" />
              Community Network & Impact Hours
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Volunteer Management & Skill Matching
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Algorithmically route verified volunteers to senior companionship, meal distribution, and child tutoring tasks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassButton
            variant="secondary"
            size="md"
            onClick={() => setShowMatchingModal(true)}
            icon={<Sparkles className="w-4 h-4 text-purple-300" />}
          >
            Match Volunteer to Need
          </GlassButton>
          <GlassButton
            variant="primary"
            size="md"
            onClick={() => setShowRegisterModal(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Register Volunteer
          </GlassButton>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Verified Active Volunteers</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tabular-nums">
            {volunteers.length} <span className="text-sm font-normal text-slate-400">members</span>
          </div>
          <div className="text-xs text-emerald-300 mt-2">100% background-checked</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Community Hours Logged</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-300 tabular-nums">
            {totalHoursContributed} <span className="text-sm font-normal text-slate-400">hrs</span>
          </div>
          <div className="text-xs text-purple-300 mt-2">Direct caregiving & mentorship</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Skill Matching Engine</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-300">Active</div>
          <div className="text-xs text-indigo-300 mt-2">Auto-matches availability slots</div>
        </GlassCard>
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Active Volunteer Cadre</h3>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search volunteer by skill or task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder:text-slate-500 w-64"
          />
        </div>
      </div>

      {/* Volunteers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((v) => (
          <GlassCard key={v.id} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-white text-base">{v.name}</h4>
                  <div className="text-xs text-slate-400 font-mono">#{v.id} · Joined {v.joinedDate}</div>
                </div>
                <StatusBadge status={v.verificationStatus} />
              </div>

              {/* Skills Tags */}
              <div className="mb-4">
                <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Specialized Skills:</div>
                <div className="flex flex-wrap gap-1.5">
                  {v.skills.map((s, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-purple-950/50 text-purple-200 border border-purple-500/25">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assigned Task */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 mb-3 text-xs">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Current Assignment:</span>
                </div>
                <div className="font-medium text-white line-clamp-2">
                  {v.assignedTask}
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  Availability: <strong className="text-slate-200">{v.availability}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/8 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-purple-300 font-mono font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{v.hoursContributed} hours logged</span>
              </span>

              <button
                onClick={() => {
                  setShowMatchingModal(true);
                }}
                className="text-indigo-300 hover:text-white font-medium cursor-pointer"
              >
                Reassign Task
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Volunteer Matching Modal */}
      {showMatchingModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowMatchingModal(false)}
          title="Volunteer Matching Engine"
          subtitle="Task Need → Required Skill → Availability Check → Assignment"
          maxWidth="2xl"
        >
          {assignedSuccessVolunteer ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Task Assigned to {assignedSuccessVolunteer}!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Schedule invitation and safety protocols have been sent to their registered contact info.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                  Step 1: Define Care Need & Required Competency
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Target Skill Competency</label>
                    <select
                      value={matchSkillRequired}
                      onChange={(e) => setMatchSkillRequired(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer text-xs"
                    >
                      <option value="Senior Care Companionship" className="bg-[#141628]">Senior Care Companionship</option>
                      <option value="Math & Science Tutoring" className="bg-[#141628]">Math & Science Tutoring (Child Trust)</option>
                      <option value="Dietary Kitchen Assistance" className="bg-[#141628]">Dietary Kitchen Assistance</option>
                      <option value="Pediatric Art Therapy" className="bg-[#141628]">Pediatric Art Therapy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Task Assignment Description</label>
                    <input
                      type="text"
                      value={matchTaskDescription}
                      onChange={(e) => setMatchTaskDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-input text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-white mb-2 flex items-center justify-between">
                  <span>Step 2: Recommended Verified Candidates</span>
                  <span className="text-slate-400 text-[11px] font-normal">Ranked by skill match & verified hours</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {matchingCandidates.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/8 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-semibold text-white">{c.name}</div>
                        <div className="text-slate-400 text-[11px]">
                          Availability: {c.availability} · {c.hoursContributed} hrs logged
                        </div>
                        <div className="text-[11px] text-purple-300 mt-0.5">
                          Skills: {c.skills.join(', ')}
                        </div>
                      </div>

                      <GlassButton
                        variant="primary"
                        size="sm"
                        onClick={() => handleExecuteAssignment(c.id)}
                      >
                        Assign Task
                      </GlassButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* Volunteer Registration Modal */}
      {showRegisterModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowRegisterModal(false)}
          title="Register Community Volunteer"
          subtitle="Record volunteer profile, background check credential, and skills"
          maxWidth="lg"
        >
          <form onSubmit={handleRegisterVolunteer} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Joshi"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="volunteer@caretrust.org"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98450 XXXXX"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Specialized Skills (comma separated)</label>
              <input
                type="text"
                value={regSkills}
                onChange={(e) => setRegSkills(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Availability Timings</label>
              <input
                type="text"
                value={regAvailability}
                onChange={(e) => setRegAvailability(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <GlassButton
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowRegisterModal(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                type="submit"
                variant="primary"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Save & Verify Volunteer
              </GlassButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
