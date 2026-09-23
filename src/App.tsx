import React, { useState } from 'react';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { HeroSection } from './components/landing/HeroSection';
import { ImpactStrip } from './components/landing/ImpactStrip';
import { PlatformSection } from './components/landing/PlatformSection';
import { SubtleGlassDonationSection } from './components/landing/SubtleGlassDonationSection';
import { TransparencySection } from './components/landing/TransparencySection';
import { LandingFooter } from './components/landing/LandingFooter';

import { SubTopicDetailPage } from './components/pages/SubTopicDetailPage';

import { AppHeader } from './components/layout/AppHeader';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { BeneficiaryModule } from './components/modules/beneficiaries/BeneficiaryModule';
import { AddBeneficiaryModal } from './components/modules/beneficiaries/AddBeneficiaryModal';
import { FoodModule } from './components/modules/food/FoodModule';
import { PurchaseRequestModal } from './components/modules/food/PurchaseRequestModal';
import { MedicalModule } from './components/modules/medical/MedicalModule';
import { MedicineInventoryModule } from './components/modules/medicines/MedicineInventoryModule';
import { PharmacyModule } from './components/modules/pharmacy/PharmacyModule';
import { DonationModule } from './components/modules/donations/DonationModule';
import { VolunteerModule } from './components/modules/volunteers/VolunteerModule';
import { ChildTrustModule } from './components/modules/childtrust/ChildTrustModule';
import { ReportsModule } from './components/modules/reports/ReportsModule';
import { SecurityModule } from './components/modules/security/SecurityModule';

import { AlertCenterModal } from './components/common/AlertCenterModal';
import { AuthModal } from './components/common/AuthModal';

import { 
  initialBeneficiaries, 
  initialFoodItems, 
  initialMealRequirements, 
  initialMedicalRecords, 
  initialMedicines, 
  initialPharmacyPartners, 
  initialPharmacyOrders, 
  initialDonations, 
  initialVolunteers, 
  initialAuditLogs, 
  initialAlerts, 
  initialUsers 
} from './data/mockData';
import { SUB_TOPICS } from './data/subTopicsData';
import { 
  RoleType, 
  Beneficiary, 
  FoodItem, 
  MedicalRecord, 
  PharmacyOrder, 
  OrderStatus, 
  Donation, 
  Volunteer, 
  AlertNotification 
} from './types';

export default function App() {
  // Navigation view modes: 'landing' (Main NGO Page) | 'detail' (Sub-Topic Dossier) | 'app' (Back-office ERP)
  const [viewMode, setViewMode] = useState<'landing' | 'detail' | 'app'>('landing');
  const [activeSubTopicId, setActiveSubTopicId] = useState<string>('elder-assisted-living');
  const [preselectedCause, setPreselectedCause] = useState<string | undefined>();
  const [preselectedAmount, setPreselectedAmount] = useState<number | undefined>();

  // Operations ERP state
  const [currentSection, setCurrentSection] = useState<string>('dashboard');
  const [currentRole, setCurrentRole] = useState<RoleType>('Super Admin');
  const [currentUserName, setCurrentUserName] = useState<string>('Dr. Swaminathan Iyer');
  const [searchQuery, setSearchQuery] = useState('');

  // Persistent live data state
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(initialBeneficiaries);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [mealRequirements] = useState(initialMealRequirements);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(initialMedicalRecords);
  const [medicines, setMedicines] = useState(initialMedicines);
  const [pharmacyPartners] = useState(initialPharmacyPartners);
  const [pharmacyOrders, setPharmacyOrders] = useState<PharmacyOrder[]>(initialPharmacyOrders);
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [alerts, setAlerts] = useState<AlertNotification[]>(initialAlerts);
  const [users] = useState(initialUsers);

  // Modals state
  const [showAlertCenter, setShowAlertCenter] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [showPurchaseRequest, setShowPurchaseRequest] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Scroll to anchor on landing page
  const scrollToSection = (sectionId: string) => {
    if (viewMode !== 'landing') {
      setViewMode('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Redirection to sub-topic detail page
  const handleSelectTopic = (topicId: string) => {
    setActiveSubTopicId(topicId);
    setViewMode('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to landing page overview
  const handleReturnToLanding = () => {
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger donation modal/flow for a specific topic
  const handleOpenDonateForTopic = (causeTitle: string, defaultAmount?: number) => {
    setPreselectedCause(causeTitle);
    if (defaultAmount) setPreselectedAmount(defaultAmount);
    setViewMode('landing');
    setTimeout(() => {
      const el = document.getElementById('donate');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Switch to back-office ERP suite
  const handleOpenApp = (section?: string) => {
    setViewMode('app');
    if (section) {
      setCurrentSection(section);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State handlers for ERP operations
  const handleAddBeneficiary = (newBeneficiary: Beneficiary) => {
    setBeneficiaries(prev => [newBeneficiary, ...prev]);
    const log = {
      id: `LOG-${Math.floor(2100 + Math.random() * 900)}`,
      timestamp: 'Just now',
      userName: currentUserName,
      userRole: currentRole,
      action: `Enrolled new beneficiary (${newBeneficiary.name})`,
      targetResource: newBeneficiary.id,
      ipAddress: '10.0.1.15',
      status: 'Success' as const
    };
    setAuditLogs(prev => [log, ...prev]);
    showToast(`Beneficiary ${newBeneficiary.name} registered successfully`);
  };

  const handleAddMedicalRecord = (record: MedicalRecord) => {
    setMedicalRecords(prev => [record, ...prev]);
    showToast(`Prescription & consultation logged for ${record.beneficiaryName}`);
  };

  const handleAddDonation = (donation: Donation) => {
    setDonations(prev => [donation, ...prev]);
    const newAlert: AlertNotification = {
      id: `ALT-${Date.now()}`,
      title: 'Donation Received',
      message: `${donation.amountOrQuantity} received from ${donation.donorName} for ${donation.allocatedProgram}.`,
      priority: 'Success',
      timestamp: 'Just now',
      category: 'Donations',
      isRead: false
    };
    setAlerts(prev => [newAlert, ...prev]);
    showToast(`Donation of ${donation.amountOrQuantity} logged with 80G certificate`);
  };

  const handleAddVolunteer = (vol: Volunteer) => {
    setVolunteers(prev => [vol, ...prev]);
    showToast(`Volunteer ${vol.name} registered and verified`);
  };

  const handleAssignVolunteerTask = (volId: string, task: string) => {
    setVolunteers(prev => prev.map(v => v.id === volId ? { ...v, assignedTask: task } : v));
    showToast(`Task assigned successfully`);
  };

  const handleUpdateStock = (foodId: string, newStock: number) => {
    setFoodItems(prev => prev.map(item => {
      if (item.id === foodId) {
        let status: any = 'Optimal';
        if (newStock <= item.minStock) status = 'Critical';
        else if (newStock <= item.minStock * 1.5) status = 'Low stock';
        return { ...item, currentStock: newStock, status };
      }
      return item;
    }));
    showToast(`Commodity inventory count updated`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setPharmacyOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    showToast(`Pre-Order #${orderId} transitioned to ${newStatus}`);
  };

  const handleMarkAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
    showToast('All alerts marked as read');
  };

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;
  const lowFoodCount = foodItems.filter(f => f.status === 'Low stock' || f.status === 'Critical').length;
  const lowMedicineCount = medicines.filter(m => m.status === 'Critical' || m.status === 'Reorder').length;
  const pendingOrdersCount = pharmacyOrders.filter(o => o.status === 'Pending Approval' || o.status === 'Ordered').length;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-3.5 px-4 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2.5 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIEW 1: CLEAN MINIMALIST NGO LANDING PAGE */}
      {viewMode === 'landing' && (
        <div className="flex flex-col min-h-screen">
          <LandingNavbar
            onOpenApp={handleOpenApp}
            onOpenAuth={() => setShowAuthModal(true)}
            onScrollToSection={scrollToSection}
            onSelectTopic={handleSelectTopic}
          />

          <main className="flex-1">
            <HeroSection
              onScrollToDonate={() => scrollToSection('donate')}
              onScrollToSubTopics={() => scrollToSection('subtopics')}
            />

            <ImpactStrip />

            <PlatformSection
              onSelectTopic={handleSelectTopic}
              onOpenApp={handleOpenApp}
            />

            <SubtleGlassDonationSection
              preselectedCause={preselectedCause}
              preselectedAmount={preselectedAmount}
              onDonationSuccess={(rec) => {
                showToast(`Donation of ₹${rec.amount} confirmed! Section 80G receipt issued.`);
              }}
            />

            <TransparencySection />
          </main>

          <LandingFooter 
            onOpenApp={handleOpenApp}
            onSelectTopic={handleSelectTopic}
            onScrollToSection={scrollToSection}
          />
        </div>
      )}

      {/* VIEW 2: DEDICATED SUB-TOPIC DETAIL PAGE (REDIRECTION DESTINATION) */}
      {viewMode === 'detail' && (
        <div className="flex flex-col min-h-screen">
          <SubTopicDetailPage
            topicId={activeSubTopicId}
            onBack={handleReturnToLanding}
            onSelectTopic={handleSelectTopic}
            onOpenDonateForTopic={handleOpenDonateForTopic}
          />

          <LandingFooter
            onOpenApp={handleOpenApp}
            onSelectTopic={handleSelectTopic}
            onScrollToSection={scrollToSection}
          />
        </div>
      )}

      {/* VIEW 3: APPLICATION WORKSPACE (OPERATIONS & ERP SUITE) */}
      {viewMode === 'app' && (
        <div className="flex flex-1 min-h-screen bg-slate-950 text-slate-100">
          {/* Left Navigation Sidebar */}
          <Sidebar
            currentSection={currentSection}
            onNavigate={(sec) => setCurrentSection(sec)}
            onReturnToLanding={handleReturnToLanding}
            userRole={currentRole}
            lowFoodCount={lowFoodCount}
            lowMedicineCount={lowMedicineCount}
            pendingOrdersCount={pendingOrdersCount}
          />

          {/* Main Content Workspace */}
          <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
            {/* Top Workspace Bar */}
            <AppHeader
              currentSection={currentSection}
              currentRole={currentRole}
              onRoleChange={(r) => {
                setCurrentRole(r);
                showToast(`Switched active role persona to ${r}`);
              }}
              onOpenAlerts={() => setShowAlertCenter(true)}
              unreadAlertsCount={unreadAlertsCount}
              onBackToLanding={handleReturnToLanding}
              onQuickAction={(action) => {
                if (action === 'new-beneficiary') setShowAddBeneficiary(true);
                else if (action === 'new-order') setShowPurchaseRequest(true);
                else if (action === 'new-consult') {
                  setCurrentSection('medical');
                  showToast('Opened Medical Module: Clinical Consultations');
                }
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Quick Banner to Return to Public Site */}
            <div className="px-6 py-2 bg-blue-950/40 border-b border-blue-900/40 text-xs text-blue-200 flex items-center justify-between">
              <span>CareTrust Internal Operations Management ERP</span>
              <button
                onClick={handleReturnToLanding}
                className="text-blue-400 hover:text-white font-medium underline cursor-pointer"
              >
                ← Return to Public Website
              </button>
            </div>

            {/* Render Selected Module */}
            <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
              {currentSection === 'dashboard' && (
                <AdminDashboard
                  onNavigate={(sec: string) => setCurrentSection(sec)}
                  onOpenOrderModal={() => setCurrentSection('pharmacy')}
                  onGenerateFoodRequest={() => setShowPurchaseRequest(true)}
                  foodItems={foodItems}
                  medicines={medicines}
                  pharmacyOrders={pharmacyOrders}
                  donations={donations}
                  alerts={alerts}
                />
              )}

              {currentSection === 'beneficiaries' && (
                <BeneficiaryModule
                  beneficiaries={beneficiaries}
                  onAddBeneficiary={() => setShowAddBeneficiary(true)}
                  onViewMedicalRecord={() => setCurrentSection('medical')}
                />
              )}

              {currentSection === 'food' && (
                <FoodModule
                  foodItems={foodItems}
                  mealRequirements={mealRequirements}
                  onGeneratePurchaseRequest={() => setShowPurchaseRequest(true)}
                  onUpdateStock={handleUpdateStock}
                />
              )}

              {currentSection === 'medical' && (
                <MedicalModule
                  medicalRecords={medicalRecords}
                  beneficiaries={beneficiaries}
                  onAddRecord={handleAddMedicalRecord}
                />
              )}

              {currentSection === 'medicines' && (
                <MedicineInventoryModule
                  medicines={medicines}
                  onOpenPreOrder={() => setCurrentSection('pharmacy')}
                  onUpdateMedicineStock={() => {}}
                />
              )}

              {currentSection === 'pharmacy' && (
                <PharmacyModule
                  pharmacyPartners={pharmacyPartners}
                  orders={pharmacyOrders}
                  medicines={medicines}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onCreateOrder={(order) => setPharmacyOrders(prev => [order, ...prev])}
                />
              )}

              {currentSection === 'donations' && (
                <DonationModule
                  donations={donations}
                  onAddDonation={handleAddDonation}
                />
              )}

              {currentSection === 'volunteers' && (
                <VolunteerModule
                  volunteers={volunteers}
                  onAddVolunteer={handleAddVolunteer}
                  onAssignTask={handleAssignVolunteerTask}
                />
              )}

              {currentSection === 'children' && (
                <ChildTrustModule
                  childrenBeneficiaries={beneficiaries.filter(b => b.type === 'Child Trust')}
                  onOpenBeneficiaryDetail={() => {}}
                  onAddChild={() => setShowAddBeneficiary(true)}
                />
              )}

              {currentSection === 'reports' && (
                <ReportsModule />
              )}

              {currentSection === 'security' && (
                <SecurityModule
                  auditLogs={auditLogs}
                  users={users}
                />
              )}
            </main>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav
            currentSection={currentSection}
            onNavigate={(sec) => setCurrentSection(sec)}
          />
        </div>
      )}

      {/* Global Modals */}
      <AlertCenterModal
        isOpen={showAlertCenter}
        onClose={() => setShowAlertCenter(false)}
        alerts={alerts}
        onMarkAsRead={handleMarkAlertRead}
        onMarkAllAsRead={handleMarkAllAlertsRead}
        onNavigateToModule={(mod) => {
          setShowAlertCenter(false);
          if (viewMode !== 'app') setViewMode('app');
          if (mod) setCurrentSection(mod);
        }}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(role, name) => {
          setCurrentRole(role);
          setCurrentUserName(name);
          setShowAuthModal(false);
          setViewMode('app');
          showToast(`Welcome, ${name} (${role})`);
        }}
      />

      <AddBeneficiaryModal
        isOpen={showAddBeneficiary}
        onClose={() => setShowAddBeneficiary(false)}
        onAdd={handleAddBeneficiary}
      />

      <PurchaseRequestModal
        isOpen={showPurchaseRequest}
        onClose={() => setShowPurchaseRequest(false)}
        foodItems={foodItems}
        onSubmit={() => {
          setShowPurchaseRequest(false);
          showToast('Procurement requisition raised');
        }}
      />

    </div>
  );
}
