import axios from 'axios';

// Production Firebase URL
const API_URL = 'https://us-central1-zerobasebe.cloudfunctions.net/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Transaction (Quick Add)
export const addTransaction = async (data: { userId: string; amount: number; type: 'income' | 'expense'; category?: string; note?: string; date?: string }) => {
  const response = await api.post('/transaction', data);
  return response.data;
};

// Get Budget Summary (Safe-to-Spend & Unallocated)
export const getBudgetSummary = async (userId: string) => {
  const response = await api.get('/budget/summary', { params: { userId } });
  return response.data;

};

// Get User Transactions
export const getTransactions = async (userId: string) => {
  const response = await api.get('/transactions', { params: { userId } });
  return response.data;
};

// Get User Allocations
export const getAllocations = async (userId: string) => {
  const response = await api.get('/allocations', { params: { userId } });
  return response.data;
};

// Allocate Funds (Zero-Based Allocation)
export const allocateFunds = async (data: { userId: string; amount: number; categoryId: string; categoryName?: string }) => {
  const response = await api.post('/budget/allocate', data);
  return response.data;
};

// Login
export const login = async (data: { username: string; password: string }) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

// Sign Up
export const signup = async (data: { username: string; password: string; email: string; name?: string }) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

export default api;
