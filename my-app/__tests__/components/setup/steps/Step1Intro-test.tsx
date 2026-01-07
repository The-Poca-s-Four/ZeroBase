import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Step1Intro from '@/components/setup/steps/Step1Intro';

describe('Step1Intro', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Step1Intro onNext={jest.fn()} />);
        
        expect(getByText('Let’s plan your budget')).toBeTruthy();
        expect(getByText("Next →")).toBeTruthy();
    });

    it('navigates to next step on button press', () => {
        const mockNext = jest.fn();
        const { getByText } = render(<Step1Intro onNext={mockNext} />);
        
        fireEvent.press(getByText("Next →"));
        expect(mockNext).toHaveBeenCalled();
    });
});
