import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    getTransactions, 
    getBudgetSummary, 
    getAllocations, 
    addTransaction, 
    allocateFunds 
} from '@/services/api';

// Keys for caching
export const KEYS = {
    TRANSACTIONS: 'transactions',
    BUDGET: 'budget',
    ALLOCATIONS: 'allocations',
};

// --- QUERIES ---

export function useTransactions(userId: string) {
    return useQuery({
        queryKey: [KEYS.TRANSACTIONS, userId],
        queryFn: () => getTransactions(userId),
        enabled: !!userId, // Only run if userId exists
        refetchInterval: 5000, // "Reset/Refresh continuously" every 5s
    });
}

export function useBudgetSummary(userId: string) {
    return useQuery({
        queryKey: [KEYS.BUDGET, userId],
        queryFn: () => getBudgetSummary(userId),
        enabled: !!userId,
        refetchInterval: 5000,
    });
}

export function useAllocations(userId: string) {
    return useQuery({
        queryKey: [KEYS.ALLOCATIONS, userId],
        queryFn: () => getAllocations(userId),
        enabled: !!userId,
        refetchInterval: 5000,
    });
}

// --- MUTATIONS ---

export function useAddTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addTransaction,
        onSuccess: (_, variables) => {
            // "Reset" relevant data
            queryClient.invalidateQueries({ queryKey: [KEYS.TRANSACTIONS, variables.userId] });
            queryClient.invalidateQueries({ queryKey: [KEYS.BUDGET, variables.userId] });
        },
    });
}

export function useAllocateFunds() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: allocateFunds,
        onSuccess: (_, variables) => {
             queryClient.invalidateQueries({ queryKey: [KEYS.ALLOCATIONS, variables.userId] });
             queryClient.invalidateQueries({ queryKey: [KEYS.BUDGET, variables.userId] });
        },
    });
}
