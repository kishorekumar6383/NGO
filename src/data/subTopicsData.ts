export interface KeyMetric {
  label: string;
  value: string;
  unit: string;
}

export interface SubSectionItem {
  id: string;
  title: string;
  summary: string;
  detailedPoints: string[];
}

export interface CaseStudy {
  beneficiaryName: string;
  age: number;
  location: string;
  background: string;
  intervention: string;
  currentOutcome: string;
  quote: string;
}

export interface BudgetAllocation {
  category: string;
  percentage: number;
  amountPerMonth: string;
  description: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  details: string;
}

export interface DonationTier {
  amount: number;
  title: string;
  impactText: string;
}

export interface SubTopic {
  id: string;
  title: string;
  subtitle: string;
  category: 'Elder Care' | 'Child Trust' | 'Nutrition & Kitchen' | 'Healthcare & Pharmacy' | 'Governance & Tax' | 'Community & Volunteers';
  shortDescription: string;
  heroPhotographyTheme: string;
  heroTagline: string;
  overviewNarrative: string[];
  keyMetrics: KeyMetric[];
  subSections: SubSectionItem[];
  caseStudy: CaseStudy;
  budgetBreakdown: BudgetAllocation[];
  dailySchedule?: ScheduleItem[];
  howToSupportTiers: DonationTier[];
  faqs: { question: string; answer: string }[];
}

export const SUB_TOPICS: SubTopic[] = [
  {
    id: 'elder-assisted-living',
    title: 'Elderly Assisted Living & Geriatric Care',
    subtitle: 'Full-time compassionate residential care, 24/7 nursing, and specialized memory support for destitute and abandoned senior citizens.',
    category: 'Elder Care',
    shortDescription: 'Round-the-clock assisted living, palliative nursing, diabetic dietary monitoring, and dignified shelter for over 180 senior citizens.',
    heroPhotographyTheme: 'Elderly residents sharing stories, participating in gentle movement classes, and receiving doctor health checkups in a sunlit courtyard.',
    heroTagline: 'No elder in our community walks alone through their twilight years.',
    overviewNarrative: [
      'The Elderly Assisted Living program is the foundational pillar of CareTrust. Established in 2018, this program provides round-the-clock shelter, nutritious meal matrices, medical monitoring, and psychological accompaniment for destitute, abandoned, and low-income senior citizens who lack family care structures.',
      'Our residential sanctuary accommodates 184 permanent residents across four dedicated wings: The Green Meadows Pavilion for independent living, The Ashoka Wing for semi-assisted mobility, The Bodhi Memory Care Wing for Alzheimer’s and dementia patients, and The Shanti Hospice for advanced palliative nursing.',
      'Every resident is treated as family. We uphold zero-compromise standards on hygiene, balanced caloric intake, clinical vitals logging, and daily mental enrichment programs including classical music, horticultural therapy, and intergenerational storytelling with our Child Trust pupils.'
    ],
    keyMetrics: [
      { label: 'Permanent Residents', value: '184', unit: 'seniors' },
      { label: '24/7 Nursing Staff', value: '28', unit: 'licensed nurses' },
      { label: 'Monthly Health Checkups', value: '720+', unit: 'consultations' },
      { label: 'Average Stay Duration', value: '4.8', unit: 'years of care' }
    ],
    subSections: [
      {
        id: 'geriatric-medical-management',
        title: '01. Geriatric Medical & Chronic Illness Management',
        summary: 'Daily vitals recording, diabetic management, hypertension tracking, and visiting specialist consultations.',
        detailedPoints: [
          'Twice-daily clinical charting of blood pressure, blood glucose, SpO2, and medication administration compliance.',
          'Weekly visiting geriatrician and cardiologist rounds with digital EHR records synchronized to our central medical registry.',
          'Dedicated oxygen concentrators, hospital-grade electric beds, and emergency ambulance transport on permanent call with Apollo and Fortis partner hospitals.',
          'Preventative fall-prevention architecture: anti-skid flooring, continuous wall-mounted grab rails, barrier-free ramps, and non-glare illumination.'
        ]
      },
      {
        id: 'memory-dementia-care',
        title: '02. Cognitive Stimulation & Dementia Support Wing',
        summary: 'Specialized 32-bed enclave with structured sensory therapy for residents navigating Alzheimer’s and cognitive decline.',
        detailedPoints: [
          'Sensory memory gardens with tactile flora, soothing fountains, and safe circular walking pathways that eliminate disorientation.',
          'Daily music and nostalgia therapy sessions led by certified clinical psychologists to reinforce emotional grounding.',
          '1:3 caregiver-to-resident ratio during waking hours to assist with feeding, hygiene, and calm emotional re-orientation.',
          'GPS-beaconed comfortable wristlets ensuring maximum resident freedom of movement within secure, fenced green perimeters.'
        ]
      },
      {
        id: 'palliative-hospice-care',
        title: '03. Palliative Care & End-of-Life Dignity',
        summary: 'Comfort-focused palliative protocol ensuring absolute pain management and peaceful presence.',
        detailedPoints: [
          'Full-spectrum pain management and palliative protocols supervised by licensed oncologists and palliative care physicians.',
          'Trained grief and spiritual counselors respecting all faiths, personal cultural traditions, and individualized requests.',
          'Compassionate bereavement support and traditional dignified last rites performed according to each resident’s personal wishes.'
        ]
      },
      {
        id: 'community-intergenerational',
        title: '04. Intergenerational Connection & Social Wellness',
        summary: 'Bridging generations through daily interactions between resident elders and Child Trust students.',
        detailedPoints: [
          'Daily "Grandparent Reading Circle" where resident elders read stories, teach regional folk arts, and help school students with homework.',
          'Weekly community garden plots where elders nurture organic vegetable patches used directly in the community kitchen.',
          'Festivals, birthdays, and anniversaries celebrated with full cultural fervor and home-cooked festive feasts.'
        ]
      }
    ],
    caseStudy: {
      beneficiaryName: 'Mr. Raghunath V. Shastri',
      age: 79,
      location: 'South Bangalore Resident Campus',
      background: 'Found severely dehydrated and malnourished near City Central Railway Station in October 2021 after being displaced by estranged relatives. He suffered from chronic stage-2 hypertension and severe diabetic neuropathy.',
      intervention: 'Enrolled in CareTrust Green Meadows Wing within 2 hours of outreach. Admitted to 14 days of nutritional stabilization, prescribed bi-daily insulin, and enrolled in daily physical therapy to regain leg mobility.',
      currentOutcome: 'Today, Mr. Shastri walks unassisted, tends the rose garden daily, and leads the morning bhajan prayer group for 45 other residents. His HbA1c dropped from 11.4% to 6.8%.',
      quote: '“I thought my story was over on that railway platform. At CareTrust, I discovered that my golden years could actually be the most peaceful years of my entire life.”'
    },
    budgetBreakdown: [
      { category: 'Nutritional Food & Meal Matrices', percentage: 36, amountPerMonth: '₹4,32,000', description: 'Procurement of grains, fresh milk, vegetables, diabetic diets, and fruit.' },
      { category: 'Prescription Medicines & Clinical Care', percentage: 30, amountPerMonth: '₹3,60,000', description: 'Chronic pharmaceuticals, diagnostics, oxygen, and visiting physician retainers.' },
      { category: 'Resident Caregivers & Nursing Staff', percentage: 22, amountPerMonth: '₹2,64,000', description: 'Salaries and training for 28 round-the-clock licensed nurses and orderlies.' },
      { category: 'Facility, Power & Sanitation', percentage: 12, amountPerMonth: '₹1,44,000', description: 'Water purification, medical waste disposal, linen washing, and electricity.' }
    ],
    dailySchedule: [
      { time: '06:00 AM - 07:00 AM', activity: 'Morning Vitals & Herbal Tea', details: 'Blood pressure and glucose checks, warm ginger-tulsi tea, assisted personal hygiene.' },
      { time: '07:30 AM - 08:30 AM', activity: 'Gentle Yoga & Courtyard Walk', details: 'Chair-based physical mobility, breathwork, and courtyard stroll under early morning sunlight.' },
      { time: '08:45 AM - 09:45 AM', activity: 'Nutritious Breakfast', details: 'Steamed idli/upma, freshly squeezed papaya juice, sprouted pulses, and morning medicine dispensing.' },
      { time: '10:30 AM - 12:30 PM', activity: 'Medical Doctor Rounds & Physio', details: 'Consultations with visiting physicians, specialized physical therapy, and cognitive games.' },
      { time: '01:00 PM - 02:00 PM', activity: 'Balanced Diabetic Lunch', details: 'Brown rice/millet roti, nutrient-dense dal, greens, steamed vegetables, and probiotic curd.' },
      { time: '02:00 PM - 04:00 PM', activity: 'Afternoon Rest & Quiet Hours', details: 'Comfortable rest in air-cooled dormitories with quiet background ambient sitar music.' },
      { time: '04:30 PM - 05:30 PM', activity: 'Intergenerational Reading & Tea', details: 'Child Trust students join elders for evening milk, roasted nuts, and collaborative storytelling.' },
      { time: '07:30 PM - 08:30 PM', activity: 'Light Dinner & Evening Vitals', details: 'Easily digestible khichdi, vegetable soup, warm spiced milk, and nighttime medication.' }
    ],
    howToSupportTiers: [
      { amount: 1500, title: 'One Month Essential Medicines', impactText: 'Funds complete daily diabetic and cardiac prescriptions for one elder.' },
      { amount: 3500, title: 'Two Weeks Total Living & Meals', impactText: 'Covers 42 hot meals, dietary supplements, and round-the-clock nursing care.' },
      { amount: 7500, title: 'Full Month Elder Sponsorship', impactText: 'Comprehensive shelter, doctor consultations, nutrition, laundry, and companionship for 30 days.' }
    ],
    faqs: [
      {
        question: 'Can families or community members visit the residents?',
        answer: 'Yes. We encourage visiting between 10:00 AM – 12:00 PM and 4:30 PM – 6:30 PM daily. We also arrange video calls for outstation well-wishers.'
      },
      {
        question: 'How are medical emergencies handled during the night?',
        answer: 'Two licensed nurses and an ambulance driver remain on duty 24/7 on campus. We maintain an emergency protocol agreement with partner hospitals less than 12 minutes away.'
      },
      {
        question: 'Are donations for elder care eligible for Section 80G tax deductions?',
        answer: 'Yes. All donations to CareTrust Foundation receive instant Section 80G tax-exempt receipts valid across India, qualifying for a 50% tax deduction under the Income Tax Act.'
      }
    ]
  },
  {
    id: 'child-trust-education',
    title: 'Child Trust: Education & Nutrition Sponsorship',
    subtitle: 'Nurturing orphans, street-connected youth, and vulnerable children through English-medium education, digital literacy, and holistic healthcare.',
    category: 'Child Trust',
    shortDescription: 'Full schooling sponsorship, balanced daily nutrition, STEM labs, and psychological counseling for 820+ vulnerable children.',
    heroPhotographyTheme: 'Young students smiling brightly in school uniforms with notebooks, participating in robotics labs, and playing football.',
    heroTagline: 'Breaking cycles of poverty through unconditional education and care.',
    overviewNarrative: [
      'The CareTrust Child Trust program provides long-term, comprehensive support for children who have lost parental care or come from ultra-poor migrant backgrounds. We believe education without proper nutrition and emotional stability is incomplete.',
      'Currently supporting 820 boys and girls, our model covers tuition at certified partner institutions, after-school academic remedial coaching, computer programming labs, sports coaching, and round-the-clock residential foster homes for orphaned children.',
      'Our children do not just pass school; they thrive. Over the last 5 years, 100% of our Class 10 and 12 batches have cleared state board examinations, with 68 scholars currently enrolled in undergraduate engineering, nursing, and commerce programs on full scholarships.'
    ],
    keyMetrics: [
      { label: 'Children Enrolled', value: '820', unit: 'active scholars' },
      { label: 'Board Exam Pass Rate', value: '100%', unit: '5 consecutive years' },
      { label: 'College Scholars', value: '68', unit: 'higher education' },
      { label: 'Nutritional Meals/Day', value: '3', unit: 'per child' }
    ],
    subSections: [
      {
        id: 'academic-sponsorship',
        title: '01. Formal Schooling & Tuition Sponsorship',
        summary: 'Covering 100% of school admission, books, uniforms, shoes, and transport for every student.',
        detailedPoints: [
          'Direct partnerships with accredited English and bilingual schools within a 5-kilometer radius of our community centers.',
          'Annual distribution of school bags, complete textbook sets, geometry kits, art supplies, and durable leather school shoes.',
          'Daily monitored transport via dedicated school buses ensuring safe transit to and from residential dormitories and informal settlements.'
        ]
      },
      {
        id: 'digital-stem-literacy',
        title: '02. Digital Learning & Future STEM Labs',
        summary: 'Equipping pupils with real-world computing, coding fundamentals, and science experiments.',
        detailedPoints: [
          'State-of-the-art computer labs with 40 workstations offering Scratch programming, Python basics, and web literacy.',
          'Practical STEM science tables where children build solar circuits, water filtration models, and basic robotic kits.',
          'English communication and public speaking clubs mentored by international and corporate volunteer fellows.'
        ]
      },
      {
        id: 'pediatric-health-nutrition',
        title: '03. Pediatric Healthcare & Growth Tracking',
        summary: 'Routine health audits, dental clinics, deworming, and micronutrient supplementation.',
        detailedPoints: [
          'Quarterly comprehensive pediatric screenings tracking height, weight, BMI, vision, and hemoglobin levels.',
          'Daily fortified milk, boiled eggs, iron-folic supplements, and seasonal fresh fruits to eradicate childhood stunting.',
          'Dedicated child adolescent counselor providing safe psychological space, emotional resilience coaching, and career guidance.'
        ]
      },
      {
        id: 'arts-sports-development',
        title: '04. Creative Expression, Music & Sports',
        summary: 'Fostering confidence, team spirit, and creative passion outside traditional textbooks.',
        detailedPoints: [
          'Weekly classical Bharatnatyam, folk dance, and vocal Carnatic music training taught by resident masters.',
          'Football, cricket, and athletic academies with licensed coaches, including 6 students selected for state junior athletic trials.',
          'Weekend camping trips, nature hikes, and educational visits to scientific planetariums and museums.'
        ]
      }
    ],
    caseStudy: {
      beneficiaryName: 'Kumari Ananya Rao',
      age: 16,
      location: 'Viveknagar Trust Home',
      background: 'Orphaned at age 7 following a fatal industrial fire that claimed both parents. She was rescued from child domestic servitude by child welfare authorities and placed under CareTrust guardianship.',
      intervention: 'Enrolled in 2nd grade at Vidya Mandir School with full scholarship. Given intensive remedial reading support, daily protein-rich meals, and access to our digital coding lab.',
      currentOutcome: 'Ananya scored 94.6% in her 10th ICSE Board exams in 2024. She recently built a weather alert web prototype in Python and dreams of pursuing Computer Science at National Institute of Technology (NIT).',
      quote: '“CareTrust did not just pay my school fees; they gave me a desk, a library, and people who believed I could become an engineer.”'
    },
    budgetBreakdown: [
      { category: 'School Tuition, Books & Exam Fees', percentage: 42, amountPerMonth: '₹5,04,000', description: 'Accredited school admissions, textbooks, state board fees, and uniforms.' },
      { category: 'Pediatric Nutrition & Daily Meals', percentage: 28, amountPerMonth: '₹3,36,000', description: '3 balanced hot meals daily, eggs, dairy, and essential micronutrient powders.' },
      { category: 'Remedial Tutors & Lab Instructors', percentage: 18, amountPerMonth: '₹2,16,000', description: 'Salaries for full-time teachers in Mathematics, Science, and Coding.' },
      { category: 'Healthcare, Counseling & Transport', percentage: 12, amountPerMonth: '₹1,44,000', description: 'School bus diesel, dental treatments, vaccines, and psychological counseling.' }
    ],
    howToSupportTiers: [
      { amount: 1200, title: 'One Month Educational Kit', impactText: 'Provides notebooks, textbooks, stationery, and school bag for 1 child.' },
      { amount: 2800, title: 'One Month Nutrition & Tuition', impactText: 'Funds daily hot school lunch, milk, snacks, and evening remedial coaching.' },
      { amount: 6000, title: 'Complete Child Sponsorship (1 Month)', impactText: 'Full tuition, uniform, medical screening, computer lab access, and residential care.' }
    ],
    faqs: [
      {
        question: 'Can donors communicate with or mentor their sponsored child?',
        answer: 'Yes. We facilitate quarterly handwritten progress letters and supervised annual donor meet-ups, strictly adhering to POCSO child protection and identity privacy guidelines.'
      },
      {
        question: 'What happens to the children after they complete high school at 18?',
        answer: 'CareTrust supports every scholar through our Higher Education & Vocational Bridge Fund until they attain gainful employment or complete their degree.'
      }
    ]
  },
  {
    id: 'community-nutrition-kitchen',
    title: 'Daily Nutrition & Zero-Waste Community Kitchen',
    subtitle: 'Preparing and distributing over 1,200 calorie-balanced, freshly cooked meals daily with rigorous culinary hygiene and zero food waste.',
    category: 'Nutrition & Kitchen',
    shortDescription: 'Industrial-grade steam kitchen producing 450,000+ nutritious meals annually with specialized diabetic and soft-texture food preparation.',
    heroPhotographyTheme: 'Volunteers and master chefs wearing hygiene caps stirring stainless steel steam cauldrons of aromatic dal and steamed vegetables.',
    heroTagline: 'Nutritious, hot meals prepared with respect, cleanliness, and love.',
    overviewNarrative: [
      'Food is healthcare. At CareTrust, we treat our community kitchen not as a cafeteria, but as an essential nutritional dispensary. Our central automated steam kitchen operates 365 days a year from 4:30 AM to produce balanced breakfast, lunch, and dinner services for our residential elder wards, school students, visiting patients, and outpatient street clinics.',
      'Every menu is curated by certified clinical nutritionists. We maintain separate cooking streams for low-glycemic diabetic elder meals, bland restorative meals for post-operative patients, and protein-dense growth meals for growing children.',
      'Through farm-direct bulk procurement and automated vegetable prep lines, our operational cost per nutritious three-course meal is maintained under ₹38 while maintaining FSSAI grade-A hygiene compliance.'
    ],
    keyMetrics: [
      { label: 'Meals Served Annually', value: '450,000+', unit: 'nutritious meals' },
      { label: 'Cost Per Meal', value: '₹36.50', unit: 'including logistics' },
      { label: 'FSSAI Hygiene Rating', value: '5-Star', unit: 'certified' },
      { label: 'Food Waste Diverted', value: '99.4%', unit: 'composted' }
    ],
    subSections: [
      {
        id: 'specialized-dietary-matrices',
        title: '01. Tailored Clinical Dietary Matrices',
        summary: 'Individual dietary flags recorded in our system ensuring zero accidental allergen exposure.',
        detailedPoints: [
          'Diabetic Matrix: Zero refined sugar, whole grains (foxtail millet, ragi, brown rice), high-fiber legumes, and bitter gourd supplements.',
          'Soft & Pureed Matrix: Tailored for elders with dentition loss or dysphagia, blending high-calorie lentils and steamed vegetables without sacrificing flavor.',
          'Pediatric High-Protein Stream: Double-egg or paneer inclusions, sprouted green gram, and calcium-fortified hot milk.'
        ]
      },
      {
        id: 'hygiene-cold-chain',
        title: '02. Industrial Steam Facility & Cold Storage',
        summary: 'Commercial grade stainless-steel steam kettles and walk-in cold rooms ensuring safety.',
        detailedPoints: [
          'LPG and solar-steam pressure cooking boilers that retain 90% of heat-sensitive vitamins compared to open-flame cooking.',
          'Walk-in refrigeration units maintaining dairy at 3°C and vegetables at 6°C with multi-tier FIFO inventory rotation.',
          'UV-treated water purification plant processing 10,000 liters daily for all cooking and washing processes.'
        ]
      },
      {
        id: 'zero-waste-ecosystem',
        title: '03. Zero Food Waste & Organic Composting',
        summary: 'Transforming kitchen peels and leftovers into organic soil fertilizer for community gardens.',
        detailedPoints: [
          'All non-edible vegetable peels and trimmings processed through dual on-site aerobic composting pits.',
          'Resulting vermicompost nourishes our 1.5-acre on-campus vegetable garden, producing organic spinach, mint, tomatoes, and gourds.',
          'Zero single-use plastic policy across all dining halls and mobile outreach vehicles.'
        ]
      }
    ],
    caseStudy: {
      beneficiaryName: 'Smt. Gangamma',
      age: 72,
      location: 'CareTrust Central Dining Facility',
      background: 'Suffered from severe chronic acid reflux, peptic ulcers, and weight loss dropping below 34 kg prior to arrival at the foundation.',
      intervention: 'Placed on a customized 5-meal daily micro-diet consisting of probiotic rice gruel, steamed bottle gourd, stewed apples, and alkaline herbal teas.',
      currentOutcome: 'Over 8 months, her gastrointestinal inflammation completely subsided. She has gained 8.5 kg of healthy lean mass and now assists with sorting fresh lentils in the morning kitchen.',
      quote: '“Here, they ask what my stomach needs before they give me a plate. It is medicine on a banana leaf.”'
    },
    budgetBreakdown: [
      { category: 'Whole Grains, Millets & Pulses', percentage: 40, amountPerMonth: '₹3,20,000', description: 'Bulk sourcing of Sona Masoori, Toor Dal, Moong, Ragi, and Oats.' },
      { category: 'Fresh Farm Vegetables & Greens', percentage: 25, amountPerMonth: '₹2,00,000', description: 'Daily direct procurement from local farmer cooperatives.' },
      { category: 'Dairy (Milk, Curd, Ghee) & Eggs', percentage: 22, amountPerMonth: '₹1,76,000', description: 'Pasteurized buffalo milk, daily fresh curd, and organic poultry eggs.' },
      { category: 'Cooking Fuel, Solar & Sanitation', percentage: 13, amountPerMonth: '₹1,04,000', description: 'Commercial LPG, steam boiler maintenance, and food-grade sanitizers.' }
    ],
    howToSupportTiers: [
      { amount: 1000, title: '25 Nutritious Meals', impactText: 'Feeds 25 senior citizens or schoolchildren a full, hot three-course meal.' },
      { amount: 2500, title: 'One Day Vegetable Sourcing', impactText: 'Funds the entire morning fresh vegetable harvest for the central community kitchen.' },
      { amount: 5000, title: 'Full Day Community Feast', impactText: 'Sponsors all 1,200 meals across breakfast, lunch, and dinner for the entire residential campus.' }
    ],
    faqs: [
      {
        question: 'Can I sponsor meals on a special family occasion like a birthday or memorial?',
        answer: 'Yes. Donors frequently sponsor "Annadanam" for special days. We display your name or memorial plaque in the dining hall and send you photo/video confirmations of the meal service.'
      }
    ]
  },
  {
    id: 'charitable-dispensary-medicines',
    title: 'Charitable Dispensary & Chronic Medicine Supply',
    subtitle: 'Free essential pharmaceuticals, diagnostic laboratory testing, and prescription fulfillment for low-income patients battling chronic conditions.',
    category: 'Healthcare & Pharmacy',
    shortDescription: 'Free chronic medicine dispensary dispensing over 12,000 unit doses monthly for diabetes, cardiac conditions, and arthritis.',
    heroPhotographyTheme: 'A focused pharmacist carefully packaging amber bottles and strip medicines into labeled prescription envelopes with clear dosage icons.',
    heroTagline: 'No patient should ever have to choose between food and life-saving medication.',
    overviewNarrative: [
      'Chronic medical conditions such as Type-2 Diabetes, Coronary Artery Disease, and Hypertension require unbroken, lifelong pharmacotherapy. For destitute elders and low-income daily wage earners, the recurrent monthly cost of medicines (often ₹2,000 to ₹4,500) represents an impossible financial burden.',
      'The CareTrust Charitable Dispensary bridges this critical healthcare gap. Working in partnership with registered wholesale pharmaceutical distributors and licensed medical practitioners, we stock over 280 critical WHO-essential medications.',
      'Every patient undergoes doctor consultation, receives a digital pharmacy card, and obtains their monthly blister-pack medications completely free of charge, with dosage guidance translated into native regional languages.'
    ],
    keyMetrics: [
      { label: 'Doses Dispensed / Mo', value: '14,500+', unit: 'prescriptions' },
      { label: 'Registered Patients', value: '1,340', unit: 'active cards' },
      { label: 'Essential Drugs in Stock', value: '280+', unit: 'formulations' },
      { label: 'On-Time Fulfillment', value: '99.2%', unit: 'zero stock-outs' }
    ],
    subSections: [
      {
        id: 'chronic-drug-inventory',
        title: '01. Chronic Disease Pharmaceutical Inventory',
        summary: 'Continuous stock maintenance for cardiovascular, endocrine, and pulmonary treatments.',
        detailedPoints: [
          'Anti-Diabetic: Metformin 500mg/1000mg, Glimepiride, Teneligliptin, and cold-chain stored Human Regular/NPH Insulin cartridges.',
          'Cardiovascular: Amlodipine, Telmisartan, Atorvastatin, Clopidogrel, and beta-blockers.',
          'Respiratory & Arthritis: Salbutamol inhalers, Budesonide nebulizer respules, Calcium-VitD3, and Paracetamol.'
        ]
      },
      {
        id: 'cold-chain-governance',
        title: '02. Stringent Cold-Chain & Expiry Auditing',
        summary: 'Temperature-monitored pharmaceutical refrigerators with automated battery backups.',
        detailedPoints: [
          'Continuous 2°C to 8°C IoT temperature monitoring with automated SMS alerts for refrigeration excursions.',
          'Strict FEFO (First-Expired, First-Out) shelf-life auditing discarding zero compromised drugs.',
          'Batch barcode tracking linked to the manufacturer verification database preventing spurious medications.'
        ]
      },
      {
        id: 'mobile-health-camps',
        title: '03. Outreach Diagnostic Camps in Slum Clusters',
        summary: 'Taking primary diagnostics and free medicines directly to doorstep communities.',
        detailedPoints: [
          'Bi-weekly mobile medical vans equipped with automated biochemistry analyzers, ECG, and eye screening devices.',
          'Doorstep blood pressure and rapid capillary blood sugar screening for elderly citizens who cannot travel.',
          'Free referral cards for complex tertiary procedures through our hospital CSR networks.'
        ]
      }
    ],
    caseStudy: {
      beneficiaryName: 'Mr. Syed Khaleel',
      age: 68,
      location: 'D.J. Halli Community Ward',
      background: 'Retired tailor surviving on ₹800 monthly pension. Suffered two minor ischemic strokes in 2022 and had stopped taking his anti-platelet and blood pressure medicines because he could not afford the monthly cost.',
      intervention: 'Identified during our mobile medical camp. Given emergency cardiology evaluation and registered in our Free Dispensary Program with home delivery of Telmisartan and Atorvastatin.',
      currentOutcome: 'Zero stroke recurrences in 24 months. His blood pressure has stabilized at 128/82 mmHg, and his digital dispensary card ensures monthly refills arrive without interruption.',
      quote: '“Before CareTrust, I counted my pills and skipped days to make them last. Now, my medicine box is never empty.”'
    },
    budgetBreakdown: [
      { category: 'Pharmaceutical Wholesaler Procurement', percentage: 55, amountPerMonth: '₹4,40,000', description: 'Direct procurement of WHO-GMP approved generic pharmaceuticals.' },
      { category: 'Diagnostic Reagents & Test Strips', percentage: 20, amountPerMonth: '₹1,60,000', description: 'Blood glucose strips, HbA1c cartridges, lipid profile reagents, and ECG rolls.' },
      { category: 'Licensed Pharmacists & Technicians', percentage: 15, amountPerMonth: '₹1,20,000', description: 'Full-time licensed pharmacists and medical lab technicians.' },
      { category: 'Cold Chain Logistics & Packing', percentage: 10, amountPerMonth: '₹80,000', description: 'Refrigeration power, tamper-evident prescription packaging, and dispensary software.' }
    ],
    howToSupportTiers: [
      { amount: 1500, title: 'One Month Cardiac Medicine for 1 Elder', impactText: 'Funds complete daily blood pressure, cholesterol, and blood thinner medication.' },
      { amount: 3000, title: 'Insulin & Diabetic Care Package', impactText: 'Provides 30 days of cold-chain insulin pens, glucometer strips, and needles.' },
      { amount: 8000, title: 'Sponsor a Community Mobile Clinic', impactText: 'Funds free doctor consultations, diagnostic tests, and medicines for 60 slum residents.' }
    ],
    faqs: [
      {
        question: 'Are the medicines provided genuine and safe?',
        answer: 'All pharmaceuticals in our dispensary are procured directly from certified WHO-GMP licensed manufacturers through audited wholesale channels. We never accept expired or unsealed sample medicines.'
      }
    ]
  },
  {
    id: 'financial-governance-80g',
    title: 'Financial Governance, Audits & Section 80G Tax Exemption',
    subtitle: 'Absolute fiscal transparency, statutory compliance, quarterly audited balance sheets, and seamless 50% tax deductions for all Indian donors.',
    category: 'Governance & Tax',
    shortDescription: '100% public financial audits, Section 80G and 12A certifications, zero administrative waste, and instant downloadable tax certificates.',
    heroPhotographyTheme: 'Board members and external chartered accountants reviewing ledger books and audit reports around a clean conference table.',
    heroTagline: 'Every rupee accounted for. Trust earned through radical transparency.',
    overviewNarrative: [
      'CareTrust Foundation operates under a strict "Glass Ledger" philosophy. We believe public philanthropy is a sacred public trust. Every rupee contributed by individual citizens and corporate partners is tracked in real-time and allocated strictly to program deliverables.',
      'We maintain an industry-leading 87% direct program expenditure ratio, with administrative and compliance overhead kept under 6% through automated donor receipts and lean operations.',
      'All Indian individual and corporate taxpayers are entitled to a 50% tax deduction under Section 80G of the Income Tax Act. Our automated donor portal issues verified Form 10BE compliant tax receipts instantly upon contribution.'
    ],
    keyMetrics: [
      { label: 'Direct Program Ratio', value: '87.4%', unit: 'spent on beneficiaries' },
      { label: 'Admin & Overhead', value: '5.2%', unit: 'industry leading lean' },
      { label: 'Statutory Audits', value: 'Clean', unit: 'unqualified audit opinion' },
      { label: '80G Tax Certificates Issued', value: '4,850+', unit: 'instant digital receipts' }
    ],
    subSections: [
      {
        id: 'statutory-certifications',
        title: '01. Registrations & Legal Authority',
        summary: 'Fully licensed Indian Public Charitable Trust recognized by central tax authorities.',
        detailedPoints: [
          'Registered Public Charitable Trust under the Indian Trusts Act (Registration No: BLR-TRUST-2018-0941).',
          'Section 12A Income Tax Exemption Certification (URN: AABTC8823ME20214).',
          'Section 80G Tax Exemption Certification with perpetual validity under amended Finance Act rules.',
          'NITI Aayog Darpan Registered NGO (ID: KA/2019/0248812).'
        ]
      },
      {
        id: 'quarterly-independent-audits',
        title: '02. Independent External Audits',
        summary: 'Audited annually by leading independent Chartered Accountancy firms.',
        detailedPoints: [
          'Full-scope statutory audit executed annually by M/s R. Narayanan & Associates, Chartered Accountants.',
          'Complete Balance Sheet, Income & Expenditure Accounts, and Receipts & Payments published publicly on our portal.',
          'Internal audit cell conducting bi-monthly spot checks on commodity inventories, medicine stocks, and bank balances.'
        ]
      },
      {
        id: 'instant-tax-receipt-system',
        title: '03. Automated Section 80G Receipt Issuance',
        summary: 'Instant PDF tax receipts with verified QR code and annual filing in Form 10BD.',
        detailedPoints: [
          'Donors receive an immediate digital receipt featuring transaction hash, PAN recognition, and trust 80G approval number.',
          'Automated year-end consolidation and filing of Form 10BD with the Income Tax Department ensures direct auto-population into your ITR AIS/TIS portal.',
          'Dedicated Donor Helpdesk responding to receipt queries and corporate CSR certificates within 24 hours.'
        ]
      }
    ],
    caseStudy: {
      beneficiaryName: 'Mr. Arvind Venkatraman',
      age: 44,
      location: 'Corporate Donating Partner (Bengaluru Tech Hub)',
      background: 'Wanted to establish a recurring employee giving program for 120 software engineers but was skeptical due to past experiences with non-transparent charities that lacked verifiable receipts.',
      intervention: 'CareTrust shared full audited ledgers, arranged on-site campus visits for the employee committee, and set up an automated payroll giving integration with instant 80G tax certificates.',
      currentOutcome: 'His firm has contributed ₹14.5 Lakhs over 3 years, sponsoring 40 children through high school. In their annual CSR audit, CareTrust was rated as their most transparent non-profit partner.',
      quote: '“The level of transparency here is equal to a listed public company. We know down to the rupee how our contributions feed and educate these children.”'
    },
    budgetBreakdown: [
      { category: 'Direct Elder Shelter, Healthcare & Food', percentage: 48, amountPerMonth: '₹5,76,000', description: 'Nursing, clinic medicines, dietary meals, and residential maintenance.' },
      { category: 'Child Education & School Sponsorship', percentage: 39, amountPerMonth: '₹4,68,000', description: 'School fees, books, teachers, computer labs, and pediatric care.' },
      { category: 'Chartered Audit, Legal & Compliance', percentage: 7, amountPerMonth: '₹84,000', description: 'External statutory audit fees, legal compliance, and tax filings.' },
      { category: 'Administrative & Financial Systems', percentage: 6, amountPerMonth: '₹72,000', description: 'Accounting software, donor support, and banking transactions.' }
    ],
    howToSupportTiers: [
      { amount: 2500, title: 'Corpus Sustenance Contribution', impactText: 'Strengthens our emergency healthcare reserve fund for sudden hospitalizations.' },
      { amount: 10000, title: 'Quarterly Resident Elder Guardian', impactText: 'Complete financial adoption of an elder resident for 3 full months with tax deduction.' },
      { amount: 25000, title: 'Classroom Technology Endowment', impactText: 'Funds 2 new refurbished laptops and digital science courseware for the child trust lab.' }
    ],
    faqs: [
      {
        question: 'How do I claim my 50% tax deduction under Section 80G?',
        answer: 'When filing your Income Tax Return (ITR), enter the CareTrust PAN and Registration Number from your receipt under Section 80G schedule. Because we file Form 10BD annually, your donation will also auto-reflect in your AIS (Annual Information Statement).'
      },
      {
        question: 'Do foreign passport holders qualify for tax deduction?',
        answer: 'Section 80G applies to income taxed in India. Foreign citizens with taxable income in India can claim this deduction using their Indian PAN number.'
      }
    ]
  },
  {
    id: 'volunteer-fellowship',
    title: 'Volunteer Fellowship & Fieldwork Operations',
    subtitle: 'Empowering doctors, teachers, college students, and professionals to directly contribute their skills in field clinics, tutoring, and kitchen service.',
    category: 'Community & Volunteers',
    shortDescription: 'Mobilizing over 450 verified community volunteers contributing 18,000+ service hours annually in clinics, classrooms, and elder care.',
    heroPhotographyTheme: 'Volunteers laughing and teaching children mathematics on whiteboards, and organizing medicine kits in the community hall.',
    heroTagline: 'Hands that serve are holier than lips that pray.',
    overviewNarrative: [
      'The heart and spirit of CareTrust is powered by our vibrant community of volunteer fellows. We believe volunteering should not be a superficial photo-op, but a meaningful, accountable commitment where professional skills create tangible impact.',
      'Our Volunteer Fellowship connects over 450 verified volunteers each year. From retired physicians conducting weekly clinical reviews to software engineers teaching coding, university students assisting with weekend reading circles, and community cooks serving festival lunches—every volunteer brings irreplaceable warmth.',
      'We provide formal background verification, onboarding training in elder empathy and child safeguarding (POCSO compliance), and verified service hour certificates recognized by leading universities and corporations.'
    ],
    keyMetrics: [
      { label: 'Active Volunteers', value: '450+', unit: 'verified fellows' },
      { label: 'Service Hours / Year', value: '18,400+', unit: 'hours of service' },
      { label: 'Corporate Partners', value: '24', unit: 'giving alliances' },
      { label: 'Specialist Doctors', value: '18', unit: 'pro-bono doctors' }
    ],
    subSections: [
      {
        id: 'volunteer-tracks',
        title: '01. Structured Volunteer Fellowship Tracks',
        summary: 'Matching your unique professional capabilities to real community needs.',
        detailedPoints: [
          'Clinical & Healthcare Track: Licensed physicians, nurses, dentists, and physiotherapists conducting health screenings and patient reviews.',
          'Education & Mentorship Track: Teaching English, Mathematics, Science, and Coding, or providing one-on-one career guidance for teenagers.',
          'Elder Companionship Track: Spending quality time playing chess, reading newspapers, recording oral histories, and assisting with walks.',
          'Kitchen & Logistics Track: Assisting with early morning vegetable chopping, food packing, and weekend meal distribution drives.'
        ]
      },
      {
        id: 'verification-safeguarding',
        title: '02. Safety, Verification & Child Safeguarding',
        summary: 'Zero compromise on the safety of our vulnerable residents and scholars.',
        detailedPoints: [
          'Mandatory identity check (Aadhaar/Passport) and two personal reference checks for all applicants.',
          'Mandatory 2-hour orientation on Child Protection Policy (POCSO Act) and Elder Dignity Guidelines prior to active deployment.',
          'All interactions with minors take place in open, supervised common spaces under staff observation.'
        ]
      },
      {
        id: 'recognition-certificates',
        title: '03. Service Hours & University Accreditations',
        summary: 'Official verifiable certificates for academic credit and corporate social responsibility tracking.',
        detailedPoints: [
          'Digital dashboard tracking every logged service hour with supervisor sign-off.',
          'Official Letter of Recommendation and verified Certificate of Social Service for college admissions and internship requirements.',
          'Annual "Seva Ratna" Volunteer Recognition Awards celebrating exceptional community champions.'
        ]
      }
    ],
    caseStudy: {
      beneficiaryName: 'Dr. Meenakshi Sundaram',
      age: 38,
      location: 'Volunteer Medical Lead (Bangalore)',
      background: 'Associate Professor of Geriatric Medicine who wanted to dedicate her free Saturday mornings to destitute elderly patients rather than private commercial practice.',
      intervention: 'Joined CareTrust as a Medical Volunteer in 2020. She redesigned our elder clinical vitals tracking sheet, trained 14 community nurses, and conducts clinical rounds every weekend.',
      currentOutcome: 'Over 4 years, Dr. Meenakshi has contributed over 600 hours of pro-bono clinical care, managing chronic conditions for more than 150 resident elders.',
      quote: '“At CareTrust, I get to practice pure medicine without insurance forms or commercial pressures. The smiles of these elders are the greatest honor of my career.”'
    },
    budgetBreakdown: [
      { category: 'Volunteer Training, Manuals & Orientations', percentage: 35, amountPerMonth: '₹42,000', description: 'Workshops, child safeguarding modules, and digital volunteer handbooks.' },
      { category: 'Safety Equipment, Aprons & Badges', percentage: 30, amountPerMonth: '₹36,000', description: 'Hygiene aprons, medical gloves, photo IDs, and safety equipment.' },
      { category: 'Logistics, Transport & Refreshments', percentage: 25, amountPerMonth: '₹30,000', description: 'Volunteer tea, light meals during field camps, and outreach transport.' },
      { category: 'Certificate Verification Portal', percentage: 10, amountPerMonth: '₹12,000', description: 'Server maintenance for logging service hours and verifying certificates.' }
    ],
    howToSupportTiers: [
      { amount: 1000, title: 'Volunteer Field Kit', impactText: 'Equips 2 new volunteers with safety gear, ID badges, and training handbooks.' },
      { amount: 2500, title: 'Weekend Medical Camp Kit', impactText: 'Supplies test kits, gloves, and sanitizers for 10 volunteer doctors during a community outreach camp.' },
      { amount: 5000, title: 'Monthly Fellowship Mentorship Fund', impactText: 'Supports youth leadership workshops and educational supplies for 30 student fellows.' }
    ],
    faqs: [
      {
        question: 'Can I volunteer if I can only commit 2 hours on weekends?',
        answer: 'Absolutely! Many of our most impactful mentors and reading companions participate just on Saturday or Sunday mornings.'
      },
      {
        question: 'How do I register as a volunteer?',
        answer: 'You can submit your application directly on this website under the Volunteer section or reach out to our team. An onboarding coordinator will reach out within 48 hours.'
      }
    ]
  }
];
