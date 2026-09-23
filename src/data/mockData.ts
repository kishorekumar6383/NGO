import {
  Beneficiary,
  FoodItem,
  DailyMealRequirement,
  MedicalRecord,
  MedicineItem,
  PharmacyPartner,
  PharmacyOrder,
  Donation,
  Volunteer,
  AlertNotification,
  AuditLog,
  UserAccount
} from '../types';

export const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'CT-1024',
    name: 'Rameshwar Sharma',
    age: 74,
    gender: 'Male',
    type: 'Adult / Elderly',
    admissionDate: '2025-01-14',
    roomOrUnit: 'Elder Wing - Block A, Room 104',
    foodCategory: 'Diabetes-friendly',
    allergies: ['Peanuts', 'Penicillin'],
    dietaryPlan: 'Low-glycemic, steamed grains, salt-restricted broth',
    primaryCondition: 'Type 2 Diabetes & Mild Hypertension',
    activeMedicationsCount: 3,
    lastConsultationDate: '2026-09-18',
    avatarSeed: 'rameshwar'
  },
  {
    id: 'CT-1025',
    name: 'Ananya Verma',
    age: 9,
    gender: 'Female',
    type: 'Child Trust',
    admissionDate: '2024-08-20',
    roomOrUnit: 'Child Cottage Sunflower - Bed 03',
    foodCategory: 'Pediatric Nutrition',
    allergies: ['Shellfish', 'Soybeans'],
    dietaryPlan: 'High-calcium milk with fortified pulses and fresh seasonal fruit',
    guardianName: 'Aarav Verma (Uncle)',
    guardianContact: '+91 98451 22390',
    schoolGrade: 'Standard 4 - Vidya Mandir',
    attendanceRate: 96,
    activeMedicationsCount: 1,
    lastConsultationDate: '2026-09-14',
    avatarSeed: 'ananya'
  },
  {
    id: 'CT-1026',
    name: 'Devaki Amma',
    age: 82,
    gender: 'Female',
    type: 'Adult / Elderly',
    admissionDate: '2023-11-05',
    roomOrUnit: 'Elder Wing - Block B, Room 202',
    foodCategory: 'Soft-food',
    allergies: ['Lactose Intolerance'],
    dietaryPlan: 'Pureed lentils, mashed khichdi, almond milk, non-acidic stew',
    primaryCondition: 'Osteoarthritis & Swallowing difficulty',
    activeMedicationsCount: 4,
    lastConsultationDate: '2026-09-21',
    avatarSeed: 'devaki'
  },
  {
    id: 'CT-1027',
    name: 'Karan Patel',
    age: 12,
    gender: 'Male',
    type: 'Child Trust',
    admissionDate: '2024-02-11',
    roomOrUnit: 'Child Cottage Banyan - Bed 07',
    foodCategory: 'High-protein',
    allergies: ['None declared'],
    dietaryPlan: 'Standard adolescent meal plan with double lentils & egg/paneer substitute',
    guardianName: 'CareTrust Ward Legal Guardian Board',
    guardianContact: '+91 80 4123 9900',
    schoolGrade: 'Standard 7 - St. Xavier Community School',
    attendanceRate: 98,
    activeMedicationsCount: 0,
    lastConsultationDate: '2026-09-02',
    avatarSeed: 'karan'
  },
  {
    id: 'CT-1028',
    name: 'Narayan Rao',
    age: 69,
    gender: 'Male',
    type: 'Adult / Elderly',
    admissionDate: '2025-06-19',
    roomOrUnit: 'Elder Wing - Block A, Room 112',
    foodCategory: 'General',
    allergies: ['Mustard seeds'],
    dietaryPlan: 'Standard balanced nutritious home-style Indian meals',
    primaryCondition: 'Post-stroke rehab recovery',
    activeMedicationsCount: 2,
    lastConsultationDate: '2026-09-10',
    avatarSeed: 'narayan'
  },
  {
    id: 'CT-1029',
    name: 'Pooja Naik',
    age: 8,
    gender: 'Female',
    type: 'Child Trust',
    admissionDate: '2025-03-30',
    roomOrUnit: 'Child Cottage Sunflower - Bed 05',
    foodCategory: 'Allergy-restricted',
    allergies: ['Gluten / Wheat', 'Sesame'],
    dietaryPlan: 'Gluten-free millet porridge, steamed vegetables, chickpea flour rotis',
    guardianName: 'Suman Naik (Aunt)',
    guardianContact: '+91 97400 58812',
    schoolGrade: 'Standard 3 - Greenfield Public',
    attendanceRate: 94,
    activeMedicationsCount: 1,
    lastConsultationDate: '2026-09-12',
    avatarSeed: 'pooja'
  },
  {
    id: 'CT-1030',
    name: 'Savitri Devi',
    age: 79,
    gender: 'Female',
    type: 'Adult / Elderly',
    admissionDate: '2024-09-15',
    roomOrUnit: 'Elder Wing - Block B, Room 208',
    foodCategory: 'Diabetes-friendly',
    allergies: ['Sulfites'],
    dietaryPlan: 'Low carb, bitter gourd juice mornings, whole grain rotis, spinach dal',
    primaryCondition: 'Hypertension & Diabetic Retinopathy',
    activeMedicationsCount: 3,
    lastConsultationDate: '2026-09-19',
    avatarSeed: 'savitri'
  },
  {
    id: 'CT-1031',
    name: 'Vikram Joshi',
    age: 15,
    gender: 'Male',
    type: 'Child Trust',
    admissionDate: '2023-04-10',
    roomOrUnit: 'Senior Youth Dormitory - Room 02',
    foodCategory: 'General',
    allergies: ['None declared'],
    dietaryPlan: 'Active growing adolescent caloric plan with whole fruits & sprouts',
    guardianName: 'Trustee Board Ward Caretaker',
    guardianContact: '+91 80 4123 9901',
    schoolGrade: 'Standard 10 - Secondary Board Scholar',
    attendanceRate: 99,
    activeMedicationsCount: 0,
    lastConsultationDate: '2026-08-28',
    avatarSeed: 'vikram'
  }
];

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'FOOD-101',
    name: 'Sona Masoori Rice (A-Grade)',
    category: 'Rice & Grains',
    currentStock: 480,
    unit: 'kg',
    minStock: 200,
    supplier: 'Annapurna Agro Co-Op',
    expiryDate: '2027-04-30',
    status: 'Healthy stock',
    dailyConsumptionRate: 22
  },
  {
    id: 'FOOD-102',
    name: 'Fresh Mixed Farm Vegetables',
    category: 'Vegetables',
    currentStock: 42,
    unit: 'kg',
    minStock: 80,
    supplier: 'Cauvery Valley Organic Farm',
    expiryDate: '2026-09-26',
    status: 'Low stock',
    dailyConsumptionRate: 35
  },
  {
    id: 'FOOD-103',
    name: 'Fresh Seasonal Fruits (Apples & Bananas)',
    category: 'Fruits',
    currentStock: 28,
    unit: 'kg',
    minStock: 50,
    supplier: 'Horticulture Trust Market',
    expiryDate: '2026-09-25',
    status: 'Expiring soon',
    dailyConsumptionRate: 18
  },
  {
    id: 'FOOD-104',
    name: 'Pasteurized Fortified Milk',
    category: 'Milk & Dairy',
    currentStock: 18,
    unit: 'liters',
    minStock: 60,
    supplier: 'Nandini Dairy Federation',
    expiryDate: '2026-09-24',
    status: 'Critical',
    dailyConsumptionRate: 40
  },
  {
    id: 'FOOD-105',
    name: 'Toor Dal & Moong Dal (Split Pulses)',
    category: 'Pulses & Lentils',
    currentStock: 195,
    unit: 'kg',
    minStock: 90,
    supplier: 'Karnataka Agro Wholesale',
    expiryDate: '2027-02-15',
    status: 'Healthy stock',
    dailyConsumptionRate: 14
  },
  {
    id: 'FOOD-106',
    name: 'Whole Wheat Atta & Ragi Millet',
    category: 'Rice & Grains',
    currentStock: 220,
    unit: 'kg',
    minStock: 120,
    supplier: 'Annapurna Agro Co-Op',
    expiryDate: '2026-12-10',
    status: 'Healthy stock',
    dailyConsumptionRate: 16
  },
  {
    id: 'FOOD-107',
    name: 'Cold-Pressed Sunflower Cooking Oil',
    category: 'Oils & Spices',
    currentStock: 35,
    unit: 'liters',
    minStock: 40,
    supplier: 'Organic Mills Trust',
    expiryDate: '2027-01-20',
    status: 'Low stock',
    dailyConsumptionRate: 4
  }
];

export const DAILY_MEAL_REQUIREMENTS: DailyMealRequirement[] = [
  {
    mealType: 'Breakfast',
    generalCount: 45,
    specialDietCount: 8,
    childrenCount: 22,
    totalServings: 75,
    menuSummary: 'Steamed Idli with Sambhar & Mint Chutney, Diabetic Ragi Porridge, Boiled Eggs / Milk'
  },
  {
    mealType: 'Lunch',
    generalCount: 50,
    specialDietCount: 12,
    childrenCount: 25,
    totalServings: 87,
    menuSummary: 'Steamed Rice, Toor Dal, Bottle Gourd Curry, Low-oil Diabetic Stir-fry, Fresh Curd'
  },
  {
    mealType: 'Evening Snack',
    generalCount: 42,
    specialDietCount: 6,
    childrenCount: 24,
    totalServings: 72,
    menuSummary: 'Roasted Makhana & Sprouted Moong, Milk with Turmeric, Cardamom Herbal Infusion'
  },
  {
    mealType: 'Dinner',
    generalCount: 48,
    specialDietCount: 10,
    childrenCount: 23,
    totalServings: 81,
    menuSummary: 'Whole Wheat Phulkas, Soft Moong Khichdi (Elderly), Mixed Vegetable Gravy, Soup'
  }
];

export const INITIAL_MEDICINES: MedicineItem[] = [
  {
    id: 'MED-201',
    name: 'Metformin 500mg (Glucophage)',
    category: 'Diabetes',
    currentStock: 12,
    unit: 'tablets',
    dailyUsage: 2,
    reorderLevel: 20,
    estimatedDaysRemaining: 6, // 12 / 2 = 6 days
    status: 'Reorder',
    batchNo: 'MET-8991',
    expiryDate: '2027-05-30',
    prescribedForCount: 6
  },
  {
    id: 'MED-202',
    name: 'Omeprazole 20mg (Omez Gastro)',
    category: 'Gastrointestinal',
    currentStock: 5,
    unit: 'tablets',
    dailyUsage: 1,
    reorderLevel: 10,
    estimatedDaysRemaining: 5, // 5 / 1 = 5 days
    status: 'Critical',
    batchNo: 'OME-3301',
    expiryDate: '2026-11-20',
    prescribedForCount: 4
  },
  {
    id: 'MED-203',
    name: 'Amlodipine 5mg (Hypertension)',
    category: 'Cardiovascular',
    currentStock: 18,
    unit: 'tablets',
    dailyUsage: 3,
    reorderLevel: 30,
    estimatedDaysRemaining: 6, // 18 / 3 = 6 days
    status: 'Reorder',
    batchNo: 'AML-4102',
    expiryDate: '2027-08-15',
    prescribedForCount: 5
  },
  {
    id: 'MED-204',
    name: 'Amoxicillin Pediatric Susp 125mg/5ml',
    category: 'Antibiotic',
    currentStock: 2,
    unit: 'bottles',
    dailyUsage: 1,
    reorderLevel: 5,
    estimatedDaysRemaining: 2, // 2 / 1 = 2 days
    status: 'Critical',
    batchNo: 'AMX-0094',
    expiryDate: '2026-10-31',
    prescribedForCount: 2
  },
  {
    id: 'MED-205',
    name: 'Atorvastatin 10mg (Lipid Core)',
    category: 'Cardiovascular',
    currentStock: 140,
    unit: 'tablets',
    dailyUsage: 2,
    reorderLevel: 40,
    estimatedDaysRemaining: 70, // 140 / 2 = 70 days
    status: 'Optimal',
    batchNo: 'ATV-7811',
    expiryDate: '2027-12-01',
    prescribedForCount: 4
  },
  {
    id: 'MED-206',
    name: 'Multivitamin & Zinc Syrup (Child Care)',
    category: 'Pediatric',
    currentStock: 35,
    unit: 'bottles',
    dailyUsage: 1,
    reorderLevel: 12,
    estimatedDaysRemaining: 35, // 35 / 1 = 35 days
    status: 'Optimal',
    batchNo: 'MVT-9920',
    expiryDate: '2027-06-30',
    prescribedForCount: 18
  },
  {
    id: 'MED-207',
    name: 'Paracetamol 650mg (Dolo)',
    category: 'Antibiotic',
    currentStock: 210,
    unit: 'tablets',
    dailyUsage: 4,
    reorderLevel: 50,
    estimatedDaysRemaining: 52,
    status: 'Optimal',
    batchNo: 'PCM-1102',
    expiryDate: '2028-01-15',
    prescribedForCount: 12
  }
];

export const INITIAL_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'MED-REC-01',
    beneficiaryId: 'CT-1024',
    beneficiaryName: 'Rameshwar Sharma',
    beneficiaryType: 'Adult / Elderly',
    date: '2026-09-10',
    doctorName: 'Dr. Priya Sundaram, MD (Geriatrics)',
    diagnosisNotes: 'Routine quarterly diabetic evaluation. Blood pressure at 134/86 mmHg. Mild peripheral neuropathy noted on lower extremities.',
    prescription: 'Rx #Rx-2026-081',
    medicationName: 'Metformin 500mg',
    dosage: '1 tab with morning breakfast & 1 tab after dinner',
    frequency: 'Twice daily',
    startDate: '2026-09-12',
    endDate: '2026-12-12',
    followUpDate: '2026-10-10',
    status: 'Active',
    documentsAttached: ['Quarterly_HbA1c_Report.pdf', 'ECG_Baseline_Chart.pdf'],
    confidentialityLevel: 'Medical Staff Only'
  },
  {
    id: 'MED-REC-02',
    beneficiaryId: 'CT-1025',
    beneficiaryName: 'Ananya Verma',
    beneficiaryType: 'Child Trust',
    date: '2026-09-14',
    doctorName: 'Dr. S. K. Mehta, MBBS, DCH (Pediatrics)',
    diagnosisNotes: 'Seasonal allergic rhinitis checkup. Weight gain 1.4kg in last trimester. Lungs clear, throat mild erythematous.',
    prescription: 'Rx #Rx-2026-099',
    medicationName: 'Multivitamin Pediatric drops + Cetirizine 2.5mg syrup',
    dosage: '5ml syrup at bedtime for 5 days',
    frequency: 'Once daily at bedtime',
    startDate: '2026-09-15',
    endDate: '2026-09-20',
    followUpDate: '2026-09-28',
    status: 'Follow-up Due',
    documentsAttached: ['Child_Growth_Percentile_Sept.pdf'],
    confidentialityLevel: 'Restricted (Child Trust)'
  },
  {
    id: 'MED-REC-03',
    beneficiaryId: 'CT-1026',
    beneficiaryName: 'Devaki Amma',
    age: 82,
    beneficiaryType: 'Adult / Elderly',
    date: '2026-09-18',
    doctorName: 'Dr. Priya Sundaram, MD (Geriatrics)',
    diagnosisNotes: 'Osteoarthritis flare in bilateral knees. Requested soft food diet continuation due to dysphagia risk.',
    prescription: 'Rx #Rx-2026-112',
    medicationName: 'Calcium Carbonate + Vit D3 with Glucosamine',
    dosage: '1 tablet crushed with evening meal',
    frequency: 'Once daily',
    startDate: '2026-09-19',
    endDate: '2026-12-19',
    followUpDate: '2026-10-18',
    status: 'Active',
    documentsAttached: ['Knee_Joint_Mobility_Assessment.pdf'],
    confidentialityLevel: 'Standard'
  }
];

export const INITIAL_PHARMACY_PARTNERS: PharmacyPartner[] = [
  {
    id: 'PHARM-01',
    name: 'MedPlus Charitable Healthcare Network',
    contactPerson: 'Dr. Sandeep Rao (Chief Pharmacist)',
    phone: '+91 80 2341 5590',
    email: 'ngo.desk@medpluscare.org',
    address: 'Plot 44, 14th Main Rd, Indiranagar, Bengaluru 560038',
    rating: 4.9,
    discountRate: '28% NGO Subsidized',
    availableMedicinesCount: 1420,
    averageDeliveryHours: 4
  },
  {
    id: 'PHARM-02',
    name: 'Apollo Trust Lifecare Pharmacy',
    contactPerson: 'Kavitha Nambiar',
    phone: '+91 80 4910 8820',
    email: 'kavitha.n@apollotrust.in',
    address: 'Near Old Airport Road Junction, Kodihalli, Bengaluru 560008',
    rating: 4.8,
    discountRate: '25% Non-Profit Rate',
    availableMedicinesCount: 2200,
    averageDeliveryHours: 6
  },
  {
    id: 'PHARM-03',
    name: 'Jan Aushadhi Kendra (Govt. Subsidized Generic)',
    contactPerson: 'Ramanathan G.',
    phone: '+91 94480 19283',
    email: 'janaushadhi.central@gov.in',
    address: 'Civil Hospital Complex, Shivaji Nagar, Bengaluru 560051',
    rating: 4.7,
    discountRate: '60% Generic Rebate',
    availableMedicinesCount: 850,
    averageDeliveryHours: 12
  }
];

export const INITIAL_PHARMACY_ORDERS: PharmacyOrder[] = [
  {
    id: 'ORD-1024',
    pharmacyId: 'PHARM-01',
    pharmacyName: 'MedPlus Charitable Healthcare Network',
    items: [
      { medicineName: 'Metformin 500mg', quantity: 60, unitPrice: 3.5, totalPrice: 210 },
      { medicineName: 'Omeprazole 20mg', quantity: 40, unitPrice: 4.2, totalPrice: 168 },
      { medicineName: 'Amlodipine 5mg', quantity: 90, unitPrice: 2.8, totalPrice: 252 }
    ],
    totalAmount: 630,
    requestedBy: 'Sister Mary Joseph (Nursing Supervisor)',
    approvedBy: 'Dr. Priya Sundaram',
    orderDate: '2026-09-22',
    expectedDelivery: '2026-09-23 16:00',
    status: 'Approved',
    urgency: 'Urgent',
    notes: 'Low stock threshold reached for elderly diabetic beneficiaries'
  },
  {
    id: 'ORD-1023',
    pharmacyId: 'PHARM-02',
    pharmacyName: 'Apollo Trust Lifecare Pharmacy',
    items: [
      { medicineName: 'Amoxicillin Pediatric Susp', quantity: 15, unitPrice: 48, totalPrice: 720 },
      { medicineName: 'Zincovit Pediatric Drops', quantity: 25, unitPrice: 36, totalPrice: 900 }
    ],
    totalAmount: 1620,
    requestedBy: 'Dr. S. K. Mehta (Pediatric Lead)',
    approvedBy: 'Dr. Priya Sundaram',
    orderDate: '2026-09-21',
    expectedDelivery: '2026-09-23 11:30',
    status: 'Dispatched',
    urgency: 'Emergency',
    notes: 'Child cottage monsoon seasonal prevention refill'
  },
  {
    id: 'ORD-1022',
    pharmacyId: 'PHARM-03',
    pharmacyName: 'Jan Aushadhi Kendra',
    items: [
      { medicineName: 'Paracetamol 650mg Bulk Pack', quantity: 300, unitPrice: 1.2, totalPrice: 360 },
      { medicineName: 'Cetirizine 10mg Tabs', quantity: 100, unitPrice: 1.5, totalPrice: 150 }
    ],
    totalAmount: 510,
    requestedBy: 'Kishore Kumar (Pharmacy Officer)',
    approvedBy: 'Trust Director Vinod K.',
    orderDate: '2026-09-17',
    expectedDelivery: '2026-09-18 14:00',
    status: 'Delivered',
    urgency: 'Standard',
    notes: 'Replenished central dispensary cupboard'
  }
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'DON-8941',
    donorName: 'Dr. Arvind & Malini Swaminathan',
    donorEmail: 'a.swaminathan@biocon.com',
    type: 'Money',
    amountOrQuantity: '₹1,50,000',
    numericValue: 150000,
    date: '2026-09-21',
    allocatedProgram: 'Medical Clinic Fund',
    status: 'Completed',
    paymentMode: 'Net Banking NEFT',
    isTaxExempt80G: true
  },
  {
    id: 'DON-8942',
    donorName: 'Rotary Club of Bangalore Midtown',
    donorEmail: 'service@rotarybangalore.org',
    type: 'Food Supplies',
    amountOrQuantity: '500 kg Sona Masoori Rice & 100L Oil',
    numericValue: 48000,
    date: '2026-09-20',
    allocatedProgram: 'Elderly Nutrition',
    status: 'Completed',
    paymentMode: 'In-Kind Logistics Delivery',
    isTaxExempt80G: true
  },
  {
    id: 'DON-8943',
    donorName: 'TechVanguard Foundation CSR',
    donorEmail: 'csr@techvanguard.io',
    type: 'School Support',
    amountOrQuantity: '30 Complete Learning Kits & Uniforms',
    numericValue: 75000,
    date: '2026-09-19',
    allocatedProgram: 'Child Education Trust',
    status: 'Allocated',
    paymentMode: 'Direct Vendor Settlement',
    isTaxExempt80G: true
  },
  {
    id: 'DON-8944',
    donorName: 'Sunita & Deepak Singhania',
    donorEmail: 'singhania.deepak@gmail.com',
    type: 'Money',
    amountOrQuantity: '₹50,000',
    numericValue: 50000,
    date: '2026-09-16',
    allocatedProgram: 'General Operations',
    status: 'Completed',
    paymentMode: 'UPI / Razorpay',
    isTaxExempt80G: true
  },
  {
    id: 'DON-8945',
    donorName: 'Apex Lifesciences Alumni Group',
    donorEmail: 'alumni.connect@apexlifesci.org',
    type: 'Medicines',
    amountOrQuantity: '120 Strips Essential Geriatric Medicines',
    numericValue: 32000,
    date: '2026-09-12',
    allocatedProgram: 'Medical Clinic Fund',
    status: 'Allocated',
    paymentMode: 'Physician In-Kind Transfer',
    isTaxExempt80G: true
  }
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 'VOL-301',
    name: 'Sneha Hegde',
    email: 'sneha.hegde@outlook.com',
    phone: '+91 98452 71004',
    skills: ['Pediatric Tutoring', 'Storytelling', 'Mathematics Gr 1-6'],
    availability: 'Weekends',
    verificationStatus: 'Verified',
    assignedTask: 'Child Trust Saturday Math Workshop & Homework Clinic',
    serviceHoursCompleted: 78,
    activeStatus: 'Active Now',
    lastActivity: 'Yesterday at 17:30',
    joinedDate: '2025-02-10'
  },
  {
    id: 'VOL-302',
    name: 'Dr. Rohan Kulkarni',
    email: 'rohan.kulkarni.dentist@gmail.com',
    phone: '+91 99014 38221',
    skills: ['Dental Screening', 'Elderly Mobility Assisting', 'First Aid'],
    availability: 'On-Call',
    verificationStatus: 'Verified',
    assignedTask: 'Bi-weekly Geriatric Oral Hygiene & Mobility Support',
    serviceHoursCompleted: 112,
    activeStatus: 'Active Now',
    lastActivity: '3 days ago',
    joinedDate: '2024-06-18'
  },
  {
    id: 'VOL-303',
    name: 'Aisha Fathima',
    email: 'aisha.design@gmail.com',
    phone: '+91 97412 88491',
    skills: ['Art & Craft', 'Nutrition Meal Prep', 'Hindi & English Teaching'],
    availability: 'Weekdays',
    verificationStatus: 'Verified',
    assignedTask: 'Daily Kitchen Food Portioning & Serving Assistant',
    serviceHoursCompleted: 64,
    activeStatus: 'Active Now',
    lastActivity: 'Today at 08:30',
    joinedDate: '2025-05-14'
  },
  {
    id: 'VOL-304',
    name: 'Gautam Nair',
    email: 'gautam.nair.fin@gmail.com',
    phone: '+91 91081 66320',
    skills: ['Inventory Audit', 'Spreadsheet Analysis', 'Logistics Driving'],
    availability: 'Weekends',
    verificationStatus: 'Pending Background Check',
    assignedTask: 'Pending verification approval for Food warehouse logistics',
    serviceHoursCompleted: 12,
    activeStatus: 'Away',
    lastActivity: '1 week ago',
    joinedDate: '2026-08-29'
  }
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'ALT-01',
    type: 'critical-medicine',
    title: 'Amoxicillin Pediatric Susp Critically Low',
    message: 'Only 2 bottles remaining (estimated 2 days supply remaining). Immediate reorder advised.',
    timestamp: '10 mins ago',
    priority: 'High',
    isRead: false,
    linkModule: 'medicines'
  },
  {
    id: 'ALT-02',
    type: 'food-low',
    title: 'Fortified Milk Stock at 18 Liters',
    message: 'Below minimum threshold of 60 liters. Tomorrow morning breakfast requires 22 liters.',
    timestamp: '25 mins ago',
    priority: 'High',
    isRead: false,
    linkModule: 'food'
  },
  {
    id: 'ALT-03',
    type: 'pharmacy-approval',
    title: 'Pre-Order #ORD-1024 Awaiting Director Sign-off',
    message: 'Order for 3 geriatric cardiovascular medicines ready for final authorization.',
    timestamp: '1 hour ago',
    priority: 'Medium',
    isRead: false,
    linkModule: 'pharmacy'
  },
  {
    id: 'ALT-04',
    type: 'followup-due',
    title: 'Beneficiary #CT-1025 Pediatric Follow-up Due',
    message: 'Dr. Mehta follow-up scheduled for Ananya Verma regarding seasonal rhinitis recovery.',
    timestamp: '3 hours ago',
    priority: 'Medium',
    isRead: true,
    linkModule: 'medical'
  },
  {
    id: 'ALT-05',
    type: 'donation-received',
    title: '₹1,50,000 Donation Received',
    message: 'From Dr. Arvind Swaminathan allocated towards Medical Clinic Fund.',
    timestamp: 'Yesterday',
    priority: 'Low',
    isRead: true,
    linkModule: 'donations'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-881',
    timestamp: '2026-09-23 10:45:12',
    userName: 'Dr. Priya Sundaram',
    userRole: 'Medical Staff',
    action: 'Prescription Updated',
    targetResource: 'Beneficiary #CT-1024 (Rameshwar Sharma)',
    ipAddress: '10.0.4.18 (On-Premises Clinic LAN)',
    status: 'Success'
  },
  {
    id: 'LOG-880',
    timestamp: '2026-09-23 09:30:04',
    userName: 'Vinod K. (Director)',
    userRole: 'NGO Admin',
    action: 'Approved Pharmacy Pre-Order #ORD-1024',
    targetResource: 'MedPlus Charitable Healthcare Network',
    ipAddress: '10.0.1.12 (Admin Terminal)',
    status: 'Success'
  },
  {
    id: 'LOG-879',
    timestamp: '2026-09-23 08:15:33',
    userName: 'Kavita Sen',
    userRole: 'Food Manager',
    action: 'Inventory Audit Logged',
    targetResource: 'Morning Kitchen Requisition (Milk & Dal)',
    ipAddress: '10.0.5.22 (Dining Hall Tablet)',
    status: 'Success'
  },
  {
    id: 'LOG-878',
    timestamp: '2026-09-22 18:20:10',
    userName: 'External API Gateway',
    userRole: 'Super Admin',
    action: 'Database Backup Completed',
    targetResource: 'Encrypted Daily Snapshot #SNAP-20260922',
    ipAddress: '172.16.0.4',
    status: 'Success'
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'USR-01',
    name: 'Dr. Swaminathan Iyer',
    email: 'director@caretrust.org',
    role: 'Super Admin',
    permissions: ['Full Tenant Access', 'User Provisioning', 'Audit Log Export', 'Financial Signoff', 'Clinical Authorization'],
    twoFactorEnabled: true,
    lastLogin: 'Today at 09:15',
    status: 'Active'
  },
  {
    id: 'USR-02',
    name: 'Dr. Priya Sundaram',
    email: 'priya.sundaram@caretrust.org',
    role: 'Medical Staff',
    permissions: ['Clinical Consultations', 'Prescription Issuance', 'Medication Administration', 'Follow-up Scheduling'],
    twoFactorEnabled: true,
    lastLogin: 'Today at 10:45',
    status: 'Active'
  },
  {
    id: 'USR-03',
    name: 'Smt. Lakshmi Narayanan',
    email: 'lakshmi.kitchen@caretrust.org',
    role: 'Food Manager',
    permissions: ['Food Stock Adjustment', 'Meal Matrix Planning', 'Dietary Restrictions Check', 'Vendor Requisitions'],
    twoFactorEnabled: false,
    lastLogin: 'Today at 07:30',
    status: 'Active'
  },
  {
    id: 'USR-04',
    name: 'Rajesh Kulkarni',
    email: 'rajesh.pharmacy@caretrust.org',
    role: 'Pharmacy Manager',
    permissions: ['Dispensary Inventory', 'Pre-Order Dispatch', 'Order Receipt Check-in', 'Pharmacy Partner Coordination'],
    twoFactorEnabled: true,
    lastLogin: 'Yesterday at 16:10',
    status: 'Active'
  },
  {
    id: 'USR-05',
    name: 'Sneha Hegde',
    email: 'sneha.hegde@outlook.com',
    role: 'Volunteer',
    permissions: ['Assigned Task Completion', 'Hour Logging', 'Read-Only Activity Schedule'],
    twoFactorEnabled: false,
    lastLogin: '2 days ago',
    status: 'Active'
  },
  {
    id: 'USR-06',
    name: 'Sundar Pichai Trust',
    email: 'csr@trustpatron.org',
    role: 'Donor',
    permissions: ['Self Donation History', 'Section 80G Tax Receipt Downloads', 'Program Impact Metrics'],
    twoFactorEnabled: true,
    lastLogin: '5 days ago',
    status: 'Active'
  }
];

// CamelCase export aliases
export const initialBeneficiaries = INITIAL_BENEFICIARIES;
export const initialFoodItems = INITIAL_FOOD_ITEMS;
export const initialMealRequirements = DAILY_MEAL_REQUIREMENTS;
export const initialMedicalRecords = INITIAL_MEDICAL_RECORDS;
export const initialMedicines = INITIAL_MEDICINES;
export const initialPharmacyPartners = INITIAL_PHARMACY_PARTNERS;
export const initialPharmacyOrders = INITIAL_PHARMACY_ORDERS;
export const initialDonations = INITIAL_DONATIONS;
export const initialVolunteers = INITIAL_VOLUNTEERS;
export const initialAuditLogs = INITIAL_AUDIT_LOGS;
export const initialAlerts = INITIAL_ALERTS;
export const initialUsers = INITIAL_USERS;
