import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/common/Toast';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { SavingsPage } from './pages/SavingsPage';
import { RecurringPage } from './pages/RecurringPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SecurityPage } from './pages/SecurityPage';

// Modals
import { TransactionModal } from './components/modals/TransactionModal';
import { CategoryModal } from './components/modals/CategoryModal';
import { BudgetModal } from './components/modals/BudgetModal';
import { GoalModal } from './components/modals/GoalModal';
import { RecurringModal } from './components/modals/RecurringModal';
import { CurrencySelectorModal } from './components/modals/CurrencySelectorModal';
import { CurrencyConverterModal } from './components/modals/CurrencyConverterModal';
import { Transaction, Category, Budget, SavingsGoal, RecurringTransaction } from './types';

const MainAppContent: React.FC = () => {
  const { user } = useAuth();
  const {
    activeTab,
    setActiveTab,
    quickAddOpen,
    setQuickAddOpen,
    toast,
  } = useFinance();

  // Layout states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Authentication page mode: 'login' or 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Modal edit states
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [recurringModalOpen, setRecurringModalOpen] = useState(false);
  const [editingRecurring, setEditingRecurring] = useState<RecurringTransaction | null>(null);

  const [toastDismissed, setToastDismissed] = useState(false);

  // REQUIREMENT 1: Unauthenticated visitors MUST see the authentication screen first.
  if (!user) {
    if (authMode === 'register') {
      return (
        <>
          <RegisterPage onSwitchToLogin={() => setAuthMode('login')} />
          {toast && !toastDismissed && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToastDismissed(true)} />
          )}
        </>
      );
    }

    return (
      <>
        <LoginPage onSwitchToRegister={() => setAuthMode('register')} />
        {toast && !toastDismissed && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToastDismissed(true)} />
        )}
      </>
    );
  }

  // Main Authenticated Dashboard Shell
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onOpenQuickAdd={() => {
          setEditingTransaction(null);
          setQuickAddOpen(true);
        }}
      />

      {/* Workspace Body: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <DashboardPage />}

          {activeTab === 'transactions' && (
            <TransactionsPage
              onOpenAddModal={() => {
                setEditingTransaction(null);
                setQuickAddOpen(true);
              }}
              onEditTransaction={(tx) => {
                setEditingTransaction(tx);
                setQuickAddOpen(true);
              }}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesPage
              onOpenAddModal={() => {
                setEditingCategory(null);
                setCategoryModalOpen(true);
              }}
              onEditCategory={(cat) => {
                setEditingCategory(cat);
                setCategoryModalOpen(true);
              }}
            />
          )}

          {activeTab === 'budgets' && (
            <BudgetsPage
              onOpenAddModal={() => {
                setEditingBudget(null);
                setBudgetModalOpen(true);
              }}
              onEditBudget={(b) => {
                setEditingBudget(b);
                setBudgetModalOpen(true);
              }}
            />
          )}

          {activeTab === 'savings' && (
            <SavingsPage
              onOpenAddModal={() => {
                setEditingGoal(null);
                setGoalModalOpen(true);
              }}
              onEditGoal={(g) => {
                setEditingGoal(g);
                setGoalModalOpen(true);
              }}
            />
          )}

          {activeTab === 'recurring' && (
            <RecurringPage
              onOpenAddModal={() => {
                setEditingRecurring(null);
                setRecurringModalOpen(true);
              }}
              onEditRule={(r) => {
                setEditingRecurring(r);
                setRecurringModalOpen(true);
              }}
            />
          )}

          {activeTab === 'reports' && <ReportsPage />}

          {activeTab === 'notifications' && <NotificationsPage />}

          {activeTab === 'profile' && <ProfilePage />}

          {activeTab === 'security' && <SecurityPage />}
        </main>
      </div>

      {/* Global Modals */}
      <TransactionModal
        isOpen={quickAddOpen}
        onClose={() => {
          setQuickAddOpen(false);
          setEditingTransaction(null);
        }}
        initialTransaction={editingTransaction}
      />

      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => {
          setCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        initialCategory={editingCategory}
      />

      <BudgetModal
        isOpen={budgetModalOpen}
        onClose={() => {
          setBudgetModalOpen(false);
          setEditingBudget(null);
        }}
        initialBudget={editingBudget}
      />

      <GoalModal
        isOpen={goalModalOpen}
        onClose={() => {
          setGoalModalOpen(false);
          setEditingGoal(null);
        }}
        initialGoal={editingGoal}
      />

      <RecurringModal
        isOpen={recurringModalOpen}
        onClose={() => {
          setRecurringModalOpen(false);
          setEditingRecurring(null);
        }}
        initialRule={editingRecurring}
      />

      {/* Multi-Currency Selection & Conversion Modals */}
      <CurrencySelectorModal />
      <CurrencyConverterModal />

      {/* Global Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToastDismissed(true)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <MainAppContent />
      </FinanceProvider>
    </AuthProvider>
  );
}
