export type RoleType = 
  | 'Super Admin'
  | 'NGO Admin'
  | 'Medical Staff'
  | 'Food Manager'
  | 'Pharmacy Manager'
  | 'Volunteer'
  | 'Donor';

export type FoodCategory = 
  | 'General'
  | 'Diabetes-friendly'
  | 'Soft-food'
  | 'Allergy-restricted'
  | 'High-protein'
  | 'Pediatric Nutrition';

export type StockStatus = 'Healthy stock' | 'Low stock' | 'Critical' | 'Expiring soon';

export interface Beneficiary {
  id: string; // e.g. CT-1024
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  type: 'Adult / Elderly' | 'Child Trust';
  admissionDate: string;
  roomOrUnit: string;
  foodCategory: FoodCategory;
  allergies: string[];
  dietaryPlan: string;
  primaryCondition?: string;
  guardianName?: string;
  guardianContact?: string;
  schoolGrade?: string;
  attendanceRate?: number;
  activeMedicationsCount: number;
  lastConsultationDate: string;
  avatarSeed: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Rice & Grains' | 'Vegetables' | 'Fruits' | 'Milk & Dairy' | 'Pulses & Lentils' | 'Oils & Spices';
  currentStock: number;
  unit: 'kg' | 'liters' | 'bags' | 'boxes';
  minStock: number;
  supplier: string;
  expiryDate: string;
  status: StockStatus;
  dailyConsumptionRate: number; // e.g. 15 kg/day
}

export interface DailyMealRequirement {
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Evening Snack';
  generalCount: number;
  specialDietCount: number;
  childrenCount: number;
  totalServings: number;
  menuSummary: string;
}

export interface MedicalRecord {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  age?: number;
  beneficiaryType: 'Adult / Elderly' | 'Child Trust';
  date: string;
  doctorName: string;
  diagnosisNotes: string;
  prescription: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  followUpDate: string;
  status: 'Active' | 'Completed' | 'Follow-up Due';
  documentsAttached: string[];
  confidentialityLevel: 'Standard' | 'Restricted (Child Trust)' | 'Medical Staff Only';
}

export interface MedicineItem {
  id: string;
  name: string;
  category: 'Cardiovascular' | 'Diabetes' | 'Antibiotic' | 'Gastrointestinal' | 'Pediatric' | 'Vitamins & Supplements';
  currentStock: number;
  unit: 'tablets' | 'strips' | 'bottles' | 'vials';
  dailyUsage: number;
  reorderLevel: number;
  estimatedDaysRemaining: number; // Calculated: currentStock / dailyUsage
  status: 'Optimal' | 'Reorder' | 'Critical' | 'Overstocked';
  batchNo: string;
  expiryDate: string;
  prescribedForCount: number;
}

export type OrderStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Ordered' | 'Dispatched' | 'Delivered';

export interface PharmacyPartner {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  discountRate: string;
  availableMedicinesCount: number;
  averageDeliveryHours: number;
}

export interface PharmacyOrder {
  id: string; // ORD-1024
  pharmacyId: string;
  pharmacyName: string;
  items: {
    medicineName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalAmount: number;
  requestedBy: string;
  approvedBy?: string;
  orderDate: string;
  expectedDelivery: string;
  status: OrderStatus;
  urgency: 'Standard' | 'Urgent' | 'Emergency';
  notes: string;
}

export type DonationType = 'Money' | 'Food Supplies' | 'Medicines' | 'School Support' | 'Equipment';

export interface Donation {
  id: string; // DON-8941
  donorName: string;
  donorEmail: string;
  type: DonationType;
  amountOrQuantity: string;
  numericValue: number; // in INR for money or estimated value
  date: string;
  allocatedProgram: 'Elderly Nutrition' | 'Child Education Trust' | 'Medical Clinic Fund' | 'General Operations';
  status: 'Completed' | 'Pending Receipt' | 'Allocated';
  paymentMode?: string;
  isTaxExempt80G: boolean;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  verificationStatus: 'Verified' | 'Pending Background Check' | 'Under Review';
  assignedTask?: string;
  serviceHoursCompleted?: number;
  hoursContributed?: number;
  activeStatus?: 'Active Now' | 'Away' | 'Inactive';
  status?: string;
  lastActivity?: string;
  joinedDate: string;
}

export interface AlertNotification {
  id: string;
  type?: string;
  title: string;
  message: string;
  timestamp: string;
  priority: AlertPriority;
  isRead: boolean;
  linkModule?: string;
  actionLink?: string;
  category?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: RoleType;
  action: string;
  targetResource: string;
  ipAddress: string;
  status: 'Success' | 'Flagged' | 'Denied';
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  permissions: string[];
  twoFactorEnabled: boolean;
  lastLogin: string;
  status: 'Active' | 'Suspended' | 'Pending Invite';
}

export type AuditLogEntry = AuditLog;
export type AlertPriority = 'Critical' | 'Warning' | 'Action Required' | 'Success' | 'High' | 'Medium' | 'Low';
