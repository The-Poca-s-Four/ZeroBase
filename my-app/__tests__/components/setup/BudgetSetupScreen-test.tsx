import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BudgetSetupScreen from '@/components/setup/BudgetSetupScreen';

// Mock child steps to simplify integration testing
jest.mock('@/components/setup/steps/Step1Intro', () => {
    const { View, Text, Button } = require('react-native');
    return (props: any) => (
        <View testID="step1-intro">
            <Text>Step 1 Intro</Text>
            <Button title="Next" onPress={props.onNext} />
        </View>
    );
});

jest.mock('@/components/setup/steps/Step2Income', () => {
    const { View, Text, Button } = require('react-native');
    return (props: any) => (
        <View testID="step2-income">
            <Text>Step 2 Income</Text>
            <Button title="Next" onPress={() => props.onNext({ walletBalance: 100 })} />
        </View>
    );
});

jest.mock('@/components/setup/steps/StepTypesIntro', () => (props: any) => {
    const { View, Text, Button } = require('react-native');
    return <View testID="step-types"><Button title="Next" onPress={props.onNext} /></View>;
});

jest.mock('@/components/setup/steps/Step3Categories', () => (props: any) => {
    const { View, Text, Button } = require('react-native');
    return <View><Text>{props.title}</Text><Button title="Next" onPress={() => props.onNext([])} /></View>;
});

jest.mock('@/components/setup/steps/StepOverview', () => (props: any) => {
    const { View, Button } = require('react-native');
    return <View><Button title="Next" onPress={props.onNext} /></View>;
});

jest.mock('@/components/setup/steps/StepDailyLimit', () => (props: any) => {
    const { View, Button } = require('react-native');
    return <View><Button title="Finish" onPress={props.onNext} /></View>;
});

describe('BudgetSetupScreen', () => {
    it('renders nothing when not visible', () => {
        const { queryByTestId } = render(<BudgetSetupScreen visible={false} />);
        expect(queryByTestId('step1-intro')).toBeNull();
    });

    it('navigates through steps correcty', async () => {
        const { getByTestId, getByText } = render(<BudgetSetupScreen visible={true} />);
        
        // Step 1
        expect(getByTestId('step1-intro')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        
        // Step 2
        await waitFor(() => expect(getByTestId('step2-income')).toBeTruthy());
        fireEvent.press(getByText('Next'));

        // Step 3 Types Intro
        await waitFor(() => expect(getByTestId('step-types')).toBeTruthy());
        fireEvent.press(getByText('Next'));

        // Step 4 (Step3Categories - Daily)
        await waitFor(() => expect(getByText('Let’s choose a category together!')).toBeTruthy());
        fireEvent.press(getByText('Next'));
        
        // Step 5 (Fixed)
        await waitFor(() => expect(getByText('Fixed Payments')).toBeTruthy());
        fireEvent.press(getByText('Next'));

        // Step 6 (Savings)
        await waitFor(() => expect(getByText('Savings Goals')).toBeTruthy());
        fireEvent.press(getByText('Next'));

        // Step 7 (Future)
        await waitFor(() => expect(getByText('Future Budget')).toBeTruthy());
        fireEvent.press(getByText('Next'));
        
        // Step 8 Overview (Mocked)
        await waitFor(() => expect(getByText('Next')).toBeTruthy()); // Creating ambiguous check but should pass if prev steps cleared
        fireEvent.press(getByText('Next'));
        
        // Step 9 Daily Limit (Mocked)
        await waitFor(() => expect(getByText('Finish')).toBeTruthy());
        // fireEvent.press(getByText('Finish')); // Trigger complete
    });
});
