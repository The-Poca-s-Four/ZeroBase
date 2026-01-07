import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StepOverview from '@/components/setup/steps/StepOverview';

describe('StepOverview', () => {
    const mockOnNext = jest.fn();
    const mockOnBack = jest.fn();

    it('renders correctly', () => {
        const { getByText } = render(
            <StepOverview onNext={mockOnNext} onBack={mockOnBack} data={{}} />
        );
        expect(getByText('Let’s plan your budget')).toBeTruthy();
        expect(getByText('Next →')).toBeTruthy();
    });

    it('handles navigation', () => {
        const { getByText } = render(
            <StepOverview onNext={mockOnNext} onBack={mockOnBack} data={{}} />
        );
        
        fireEvent.press(getByText('Next →'));
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('renders chart legend correctly', () => {
        const { getByText } = render(
            <StepOverview onNext={mockOnNext} onBack={mockOnBack} data={{}} />
        );
        expect(getByText('Daily Spending')).toBeTruthy();
        expect(getByText('Fixed Payments')).toBeTruthy();
    });
});
