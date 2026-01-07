import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StepDailyLimit from '@/components/setup/steps/StepDailyLimit';

// Mock the child modal component as it's tested separately or we just want to verify it opens
jest.mock('@/components/setup/modals/CustomizeLimitModal', () => {
    const { View, Text } = require('react-native');
    return (props: any) => props.visible ? <View testID="customize-modal"><Text>Modal Open</Text></View> : null;
});

describe('StepDailyLimit', () => {
    it('renders interactions correctly', () => {
        const mockNext = jest.fn();
        const { getByText, getByTestId, queryByTestId } = render(<StepDailyLimit onNext={mockNext} onBack={jest.fn()} />);
        
        // Check text
        expect(getByText('Set Your Daily Limit')).toBeTruthy();
        expect(getByText('Customize Safe to Spend')).toBeTruthy();
        
        // Modal should be hidden initially
        expect(queryByTestId('customize-modal')).toBeNull();
        
        // Open modal
        fireEvent.press(getByText('Customize Safe to Spend'));
        expect(getByTestId('customize-modal')).toBeTruthy();
        
        // Click Next
        fireEvent.press(getByText("Next →"));
        expect(mockNext).toHaveBeenCalled();
    });
});
