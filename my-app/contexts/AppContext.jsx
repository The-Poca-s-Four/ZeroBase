import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useTransactions, 
  useBudgetSummary, 
  useAllocations, 
  useAddTransaction, 
  useAllocateFunds 
} from '@/hooks/useZeroBaseData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // User Info
  const [user, setUser] = useState({ name: 'ZeroBase User', email: '' });
  
  // Categories
  const [expenseCategories, setExpenseCategories] = useState([
    { id: 'food', name: 'Food', icon: '🍔', color: '#F4A460' },
    { id: 'transport', name: 'Transportation', icon: '🚗', color: '#4A90E2' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎮', color: '#FF6B6B' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#FFD93D' },
    { id: 'healthcare', name: 'Healthcare', icon: '💊', color: '#50C878' },
    { id: 'education', name: 'Education', icon: '📚', color: '#9B59B6' },
  ]);

  const [incomeCategories, setIncomeCategories] = useState([
    { id: 'allowance', name: 'Family Allowance', icon: '👪', color: '#81C784' },
    { id: 'parttime', name: 'Part-time Job', icon: '💼', color: '#64B5F6' },
    { id: 'scholarship', name: 'Scholarship', icon: '🎓', color: '#BA68C8' },
  ]);

  // Load User on Mount
  useEffect(() => {
    const loadUser = async () => {
        try {
            const userInfoStr = await AsyncStorage.getItem('userInfo');
            if (userInfoStr) {
                const parsedUser = JSON.parse(userInfoStr);
                setUser(parsedUser);
            }
        } catch (e) {
            console.error("Failed to load user", e);
        }
    };
    loadUser();
  }, []);

  const userId = user?.id === 'guest' ? null : user?.id;

  // TanStack Query Hooks
  const { 
      data: transactions = [], 
      isLoading: isLoadingTx, 
      refetch: refetchTx 
  } = useTransactions(userId);

  const { 
      data: budgetSummary, 
      isLoading: isLoadingBudget,
      refetch: refetchBudget,
      remove: removeBudget
  } = useBudgetSummary(userId);

  const { 
      data: allocations = [], 
      isLoading: isLoadingAllocNotifications,
      refetch: refetchAllocations
  } = useAllocations(userId);

  const addTransactionMutation = useAddTransaction();
  const allocateFundsMutation = useAllocateFunds();

  // Auth Actions
  const login = async (userData) => {
      // Clear previous user data from cache
      queryClient.removeQueries(); 
      queryClient.clear();

      // Persist new user
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      
      setUser(userData);
      
      // Data will be refetched automatically because `userId` (derived from user) changes.
  };

  const logout = async () => {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userInfo');
      setUser(null);
      
      queryClient.removeQueries();
      queryClient.clear();
  };

  // Derived State
  const safeToSpend = useMemo(() => {
      if (user?.id === 'guest') return 5000000; 
      return budgetSummary?.safeToSpend || 0;
  }, [budgetSummary, user?.id]);

  const unallocatedBalance = useMemo(() => {
     if (user?.id === 'guest') return 2000000;
     return budgetSummary?.unallocated || 0;
  }, [budgetSummary, user?.id]);

  const isLoading = isLoadingTx || isLoadingBudget;

  const categoryOptions = useMemo(() => {
      if (user?.id === 'guest') return expenseCategories.map(c => ({...c, budget: 0, spent: 0}));

      return expenseCategories.map(cat => {
          // Calculate Allocated Budget
          const totalAllocated = allocations
              .filter(a => a.categoryId === cat.id)
              .reduce((sum, a) => sum + (Number(a.amount) || 0), 0);
          
          // Calculate Spent Amount
          const totalSpent = transactions
              .filter(t => t.type === 'expense' && t.category === cat.name) 
              .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

          return { ...cat, budget: totalAllocated, spent: totalSpent };
      });
  }, [expenseCategories, allocations, transactions, user?.id]);

  const incomeOptions = useMemo(() => incomeCategories, [incomeCategories]);

  // Actions
  const refreshData = () => {
      refetchTx();
      refetchBudget();
      refetchAllocations();
  };

  const addTransaction = async (transaction) => {
      if (!user?.id) return;
      if (user.id === 'guest') {
          alert("Guest mode: Transaction not saved to backend.");
          return;
      }

      try {
          await addTransactionMutation.mutateAsync({
              userId: user.id,
              ...transaction
          });
      } catch (e) {
          console.error("Add transaction failed", e);
      }
  };

  const allocateFunds = async (amount, categoryId) => {
      if (!user?.id || user.id === 'guest') return;
      
      try {
          await allocateFundsMutation.mutateAsync({
              userId: user.id,
              amount,
              categoryId,
              categoryName: expenseCategories.find(c => c.id === categoryId)?.name
          });
      } catch (e) {
          console.error("Allocation failed", e);
      }
  };

  const addCategory = (category) => {
      if (category.type === 'income') {
          setIncomeCategories([...incomeCategories, { ...category, id: Date.now().toString() }]);
      } else {
          setExpenseCategories([...expenseCategories, { ...category, id: Date.now().toString() }]);
      }
  };

  const getTotalIncome = () => {
    return transactions
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  };

  const getTotalExpense = () => {
    return transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  };

  const value = {
    safeToSpend,
    unallocatedBalance,
    categoryOptions, 
    incomeOptions,
    transactions,
    isLoading,
    user,
    login, // Exposed
    logout, // Exposed
    addCategory,
    addTransaction,
    allocateFunds,
    refreshData,
    getTotalIncome,
    getTotalExpense
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
