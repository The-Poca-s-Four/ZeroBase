import React from 'react';
import { render } from '@testing-library/react-native';
import BudgetInfoCard from '../../../components/Reuse/BudgetInfoCard';

jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>,
  Circle: () => null,
  G: ({ children }: any) => <>{children}</>,
}));

describe('BudgetInfoCard', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <BudgetInfoCard
                type="daily"
                color="red"
                icon="food"
                title="Food Budget"
                progressText="500 / 1000"
                statusTitle="Status"
                statusValue="50%"
                percent={50}
            />
        );
        expect(getByText('Food Budget')).toBeTruthy();
        expect(getByText('Status')).toBeTruthy();
        expect(getByText('50%')).toBeTruthy();
        expect(getByText('500')).toBeTruthy();
        expect(getByText(/1000/)).toBeTruthy();
    });

    it('renders different colors based on props', () => {
         const { getByText } = render(
            <BudgetInfoCard
                type="daily"
                color="#123456"
                icon="food"
                title="Color Test"
                progressText="100/100"
                statusTitle="Color Status"
                statusValue="Val"
            />
        );
        const val = getByText('Val');
        expect(val.props.style).toEqual(expect.arrayContaining([
            expect.objectContaining({ color: '#123456' })
        ]));
    });
});
