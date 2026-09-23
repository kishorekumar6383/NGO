import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { GlassButton } from '../../ui/GlassButton';
import { Beneficiary, FoodCategory } from '../../../types';
import { UserPlus, Check } from 'lucide-react';

interface AddBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (beneficiary: Beneficiary) => void;
}

export const AddBeneficiaryModal: React.FC<AddBeneficiaryModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(72);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [type, setType] = useState<'Adult / Elderly' | 'Child Trust'>('Adult / Elderly');
  const [foodCategory, setFoodCategory] = useState<FoodCategory>('Diabetes-friendly');
  const [roomOrUnit, setRoomOrUnit] = useState('Elder Wing - Block A, Room 115');
  const [allergiesText, setAllergiesText] = useState('Peanuts');
  const [dietaryPlan, setDietaryPlan] = useState('Low glycemic, steamed grains, salt restricted');
  const [primaryCondition, setPrimaryCondition] = useState('Type 2 Diabetes & Mild Hypertension');
  const [guardianName, setGuardianName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newId = `CT-${Math.floor(1032 + Math.random() * 900)}`;
    const newBeneficiary: Beneficiary = {
      id: newId,
      name,
      age: Number(age),
      gender,
      type,
      admissionDate: new Date().toISOString().split('T')[0],
      roomOrUnit,
      foodCategory,
      allergies: allergiesText ? allergiesText.split(',').map(s => s.trim()) : [],
      dietaryPlan,
      primaryCondition: type === 'Adult / Elderly' ? primaryCondition : undefined,
      guardianName: type === 'Child Trust' ? (guardianName || 'Trustee Ward Caretaker') : undefined,
      guardianContact: type === 'Child Trust' ? (guardianContact || '+91 80 4123 9900') : undefined,
      schoolGrade: type === 'Child Trust' ? 'Standard 5 - Community School' : undefined,
      attendanceRate: type === 'Child Trust' ? 95 : undefined,
      activeMedicationsCount: type === 'Adult / Elderly' ? 2 : 1,
      lastConsultationDate: new Date().toISOString().split('T')[0],
      avatarSeed: name.toLowerCase().replace(/\s+/g, '')
    };

    onAdd(newBeneficiary);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enroll New Beneficiary"
      subtitle="Register an adult care resident or Child Trust recipient into NGO ledger"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Program Category</label>
            <select
              value={type}
              onChange={(e) => {
                const val = e.target.value as any;
                setType(val);
                if (val === 'Child Trust') {
                  setAge(10);
                  setRoomOrUnit('Child Cottage Sunflower - Bed 08');
                  setFoodCategory('Pediatric Nutrition');
                } else {
                  setAge(75);
                  setRoomOrUnit('Elder Wing - Block A, Room 115');
                  setFoodCategory('Diabetes-friendly');
                }
              }}
              className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer"
            >
              <option value="Adult / Elderly" className="bg-[#141628]">Adult / Elderly Care</option>
              <option value="Child Trust" className="bg-[#141628]">Child Trust Program</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Full Legal Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Anand Murthy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Age</label>
            <input
              type="number"
              required
              min={1}
              max={110}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl glass-input text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer"
            >
              <option value="Male" className="bg-[#141628]">Male</option>
              <option value="Female" className="bg-[#141628]">Female</option>
              <option value="Other" className="bg-[#141628]">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Ward / Room Allocation</label>
            <input
              type="text"
              required
              value={roomOrUnit}
              onChange={(e) => setRoomOrUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Dietary Classification</label>
            <select
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl glass-input text-white cursor-pointer"
            >
              <option value="General" className="bg-[#141628]">General</option>
              <option value="Diabetes-friendly" className="bg-[#141628]">Diabetes-friendly</option>
              <option value="Soft-food" className="bg-[#141628]">Soft-food (Dysphagia)</option>
              <option value="Allergy-restricted" className="bg-[#141628]">Allergy-restricted</option>
              <option value="High-protein" className="bg-[#141628]">High-protein</option>
              <option value="Pediatric Nutrition" className="bg-[#141628]">Pediatric Nutrition</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Allergies (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Peanuts, Penicillin, Lactose"
              value={allergiesText}
              onChange={(e) => setAllergiesText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1.5">Approved Meal Plan Specification</label>
          <input
            type="text"
            required
            value={dietaryPlan}
            onChange={(e) => setDietaryPlan(e.target.value)}
            className="w-full px-3 py-2 rounded-xl glass-input text-white"
          />
        </div>

        {type === 'Adult / Elderly' ? (
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Primary Chronic Condition</label>
            <input
              type="text"
              value={primaryCondition}
              onChange={(e) => setPrimaryCondition(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-white"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Guardian / Relative Name</label>
              <input
                type="text"
                placeholder="e.g. Legal Trustee Board"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Guardian Contact Number</label>
              <input
                type="text"
                placeholder="+91 98450 XXXXX"
                value={guardianContact}
                onChange={(e) => setGuardianContact(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass-input text-white"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
          <GlassButton
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Cancel
          </GlassButton>
          <GlassButton
            type="submit"
            variant="primary"
            size="sm"
            icon={<UserPlus className="w-4 h-4" />}
          >
            Register Beneficiary
          </GlassButton>
        </div>
      </form>
    </Modal>
  );
};
