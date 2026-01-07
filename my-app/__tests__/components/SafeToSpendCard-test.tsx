import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SafeToSpendCard from '../../components/SafeToSpendCard';
import { router } from 'expo-router';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock LinearGradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, style }: any) => <>{children}</>,
}));

describe('SafeToSpendCard', () => {
  it('renders correctly with default currency', () => {
    const { getByText } = render(
      <SafeToSpendCard safeToSpend={1000000} unallocated={500000} />
    );

    expect(getByText('Safe to Spend')).toBeTruthy();
    // Use regex or partial match for numbers formatted with dots
    expect(getByText(/1.000.000/)).toBeTruthy(); 
    expect(getByText('VND')).toBeTruthy();
    expect(getByText('Unallocated Funds')).toBeTruthy();
    expect(getByText(/500.000/)).toBeTruthy();
  });

  it('renders custom currency', () => {
    const { getByText } = render(
      <SafeToSpendCard safeToSpend={100} unallocated={50} currency="USD" />
    );
    expect(getByText('USD')).toBeTruthy();
  });

  it('handles add transaction press', () => {
    const mockAdd = jest.fn();
    const { getByTestId } = render(
      <SafeToSpendCard safeToSpend={0} unallocated={0} onAddTransaction={mockAdd} />
    );
    
    fireEvent.press(getByTestId('add-button'));
    expect(mockAdd).toHaveBeenCalled();
  });

  it('navigates to guide on info press', () => {
      const { getByTestId } = render(
        <SafeToSpendCard safeToSpend={0} unallocated={0} />
      );
      
      fireEvent.press(getByTestId('info-button'));
      expect(router.push).toHaveBeenCalledWith('/guide');
  });
});
