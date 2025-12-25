import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Balance states
  const [todayLimit, setTodayLimit] = useState(400000);
  const [todaySpent, setTodaySpent] = useState(240000);
  const [unallocatedBalance, setUnallocatedBalance] = useState(1240000);

  // Categories
  const [categoryOptions, setCategoryOptions] = useState([
    { name: 'Food', icon: '🍔', color: '#F4A460', budget: 600000 },
    { name: 'Transportation', icon: '🚗', color: '#4A90E2', budget: 400000 },
    { name: 'Entertainment', icon: '🎮', color: '#FF6B6B', budget: 300000 },
    { name: 'Shopping', icon: '🛍️', color: '#FFD93D', budget: 500000 },
    { name: 'Healthcare', icon: '💊', color: '#50C878', budget: 200000 },
    { name: 'Education', icon: '📚', color: '#9B59B6', budget: 300000 },
  ]);

  // Transactions
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'expense', category: 'Food', amount: 50000, note: 'Lunch', date: new Date().toISOString() },
    { id: '2', type: 'income', category: 'Salary', amount: 1000000, note: 'Monthly salary', date: new Date().toISOString() },
    { id: '3', type: 'expense', category: 'Transportation', amount: 30000, note: 'Taxi', date: new Date().toISOString() },
  ]);

  // Add new category
  const addCategory = (category) => {
    setCategoryOptions([...categoryOptions, category]);
  };

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  // Update balance
  const updateTodaySpent = (amount) => {
    setTodaySpent(todaySpent + amount);
  };

  const updateUnallocatedBalance = (amount) => {
    setUnallocatedBalance(unallocatedBalance + amount);
  };

  // Calculate totals
  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpense = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const value = {
    // States
    todayLimit,
    todaySpent,
    unallocatedBalance,
    categoryOptions,
    transactions,
    
    // Setters
    setTodayLimit,
    setTodaySpent,
    setUnallocatedBalance,
    
    // Actions
    addCategory,
    addTransaction,
    updateTodaySpent,
    updateUnallocatedBalance,
    
    // Getters
    getTotalIncome,
    getTotalExpense,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
