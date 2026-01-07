import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Step3Categories from '../../../../components/setup/steps/Step3Categories';

// Mock AddCategoryModal
jest.mock('../../../../components/setup/modals/AddCategoryModal', () => {
  const { View, Button } = require('react-native');
  return ({ visible, onAdd, onClose }: any) => {
    if (!visible) return null;
    return (
      <View testID="add-category-modal">
        <Button title="Mock Add" onPress={() => onAdd({ name: 'New Cat', amount: '100.000', icon: 'star', color: 'red' })} />
        <Button title="Close" onPress={onClose} />
      </View>
    );
  };
});

describe('Step3Categories', () => {
    const mockOnNext = jest.fn();
    const mockOnBack = jest.fn();
    const initialCategories = [
        { name: 'Food', icon: 'food', defaultAmount: '1.000.000', color: 'blue' }
    ];

    it('renders correctly', () => {
        const { getByText } = render(
            <Step3Categories 
                title="Test Title" 
                subTitle="Test Sub" 
                type="expense" 
                initialCategories={initialCategories}
                onNext={mockOnNext}
                onBack={mockOnBack}
            />
        );
        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Food')).toBeTruthy();
        expect(getByText('1.000.000')).toBeTruthy();
    });

    it('opens modal and adds category', () => {
        const { getByText, getByTestId } = render(
            <Step3Categories 
                title="Test Title" 
                subTitle="Test Sub" 
                type="expense" 
                initialCategories={initialCategories}
                onNext={mockOnNext}
                onBack={mockOnBack}
            />
        );
        
        fireEvent.press(getByText('+ Add category'));
        expect(getByTestId('add-category-modal')).toBeTruthy();
        
        fireEvent.press(getByText('Mock Add'));
        // Should now see New Cat
        expect(getByText('New Cat')).toBeTruthy();
    });

     it('submits correct data', () => {
        const { getByText } = render(
            <Step3Categories 
                title="Test Title" 
                subTitle="Test Sub" 
                type="expense" 
                initialCategories={initialCategories}
                onNext={mockOnNext}
                onBack={mockOnBack}
            />
        );
        
        fireEvent.press(getByText('Next →'));
        
        expect(mockOnNext).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ name: 'Food', amount: 1000000 })
        ]));
    });
});
