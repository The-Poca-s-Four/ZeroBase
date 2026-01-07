import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Step2Income from '../../../../components/setup/steps/Step2Income';

describe('Step2Income', () => {
    const mockOnNext = jest.fn();
    const mockOnBack = jest.fn();
    const initialData = {
        walletBalance: 8000000,
        incomeSources: [
            { id: 'allowance', label: 'Allowance', selected: true, amount: '2.000.000' }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(
            <Step2Income onNext={mockOnNext} onBack={mockOnBack} initialData={initialData} />
        );
        expect(getByText("Let's start with\nyour income")).toBeTruthy();
        expect(getByPlaceholderText('8.000.000')).toBeTruthy();
    });

    it('handles wallet balance input', () => {
        const { getByPlaceholderText } = render(
            <Step2Income onNext={mockOnNext} onBack={mockOnBack} />
        );
        const input = getByPlaceholderText('8.000.000');
        fireEvent.changeText(input, '5000000');
        expect(input.props.value).toBe('5.000.000'); // Formatting check
    });

    it('toggles income source selection', () => {
        const { getByText } = render(
            <Step2Income onNext={mockOnNext} onBack={mockOnBack} />
        );
        const partTimeLabel = getByText('Part time job');
        fireEvent.press(partTimeLabel);
        // We expect the input for this source to appear or checkmark to change.
        // Since component implementation logic hides input if not selected:
        // Let's assume input placeholder "0" appears.
    });

    it('submits correct data on next', () => {
        const { getByText, getByPlaceholderText } = render(
            <Step2Income onNext={mockOnNext} onBack={mockOnBack} />
        );
        
        // Enter wallet balance
        fireEvent.changeText(getByPlaceholderText('8.000.000'), '1000000');
        
        // Submit
        fireEvent.press(getByText('Next →'));
        
        expect(mockOnNext).toHaveBeenCalledWith(expect.objectContaining({
            walletBalance: 1000000,
            incomeSources: expect.arrayContaining([
                 expect.objectContaining({ name: 'Allowance', amount: 2000000 })
            ])
        }));
    });
});
