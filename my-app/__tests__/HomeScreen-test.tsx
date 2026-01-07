import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '@/components/home/HomeScreen'; // Adjusted import if needed or just '@/components/home' if index exports it
import { AppProvider } from '@/contexts/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as UseZeroBaseData from '@/hooks/useZeroBaseData';

// Mock child components
jest.mock('@/components/Reuse/BudgetInfoCard', () => {
    const { View, Text } = require('react-native'); 
    return (props: any) => <View testID="budget-info-card"><Text>{props.title}</Text></View>;
});

// Mock AppContext directly to avoid provider complexity
const mockContextValue = {
    safeToSpend: 5000000,
    unallocatedBalance: 2000000,
    categoryOptions: [
        { id: '1', name: 'Food', icon: '🍔', color: 'red', budget: 100, spent: 50 }
    ],
    incomeOptions: [
        { id: '2', name: 'Allowance', icon: '💵', color: 'green' }
    ],
    user: { name: 'Test User' },
    addTransaction: jest.fn(),
    allocateFunds: jest.fn(),
    refreshData: jest.fn(),
    getTotalIncome: jest.fn(),
    getTotalExpense: jest.fn(),
    addCategory: jest.fn()
};

jest.mock('@/contexts/AppContext', () => ({
    useAppContext: () => mockContextValue
}));

// We don't need to mock hooks anymore since we mock the Context that uses them?
// Actually HomeScreen uses useAppContext only. It does NOT use useZeroBaseData directly.
// So we can remove useZeroBaseData mock if we mock AppContext.

// However, we keeping mocks for other things is fine.

// Remove AppProvider from wrapper
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('HomeScreen Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Balance Info and Tabs', async () => {
        const { getByText } = render(<HomeScreen />, { wrapper: createWrapper() });

        // Check for inline balance card text
        expect(getByText("Today's Limit")).toBeTruthy();
        expect(getByText("Unallocated balance")).toBeTruthy();

        // Check for Tabs
        expect(getByText('— Expense')).toBeTruthy();
        expect(getByText('+ Income')).toBeTruthy();
        expect(getByText('% Allocate')).toBeTruthy();
        
        // Check for BudgetInfoCards
        expect(getByText('Safe to Spend')).toBeTruthy();
    });

    it('switches to Income view when Income tab is pressed', () => {
        const { getByText } = render(<HomeScreen />, { wrapper: createWrapper() });
        const incomeTab = getByText('+ Income');
        
        fireEvent.press(incomeTab);

        // Expect to see "Confirm Income" button
        expect(getByText('Confirm Income')).toBeTruthy();
    });

    it('switches to Allocate view when Allocate tab is pressed', () => {
        const { getByText } = render(<HomeScreen />, { wrapper: createWrapper() });
        const allocateTab = getByText('% Allocate');
        
        fireEvent.press(allocateTab);
        
        // Expect to see "Confirm Allocation" button
        expect(getByText('Confirm Allocation')).toBeTruthy();
    });
});
