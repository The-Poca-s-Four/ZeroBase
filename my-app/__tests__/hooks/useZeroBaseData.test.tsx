import { renderHook, waitFor } from '@testing-library/react-native';
  import { useTransactions, useBudgetSummary, KEYS } from '@/hooks/useZeroBaseData';
import * as useZeroBaseData from '@/hooks/useZeroBaseData';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import * as ApiService from '@/services/api';
  
  // Mock API methods
  jest.mock('@/services/api');
  
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  
  describe('useZeroBaseData Hooks', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('useBudgetSummary', () => {
      it('fetches and returns budget summary', async () => {
        const mockData = { safeToSpend: 1000, unallocated: 500 };
        (ApiService.getBudgetSummary as jest.Mock).mockResolvedValue(mockData);
  
        const { result } = renderHook(() => useBudgetSummary('test-user'), {
          wrapper: createWrapper(),
        });
  
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
        expect(result.current.data).toEqual(mockData);
        expect(ApiService.getBudgetSummary).toHaveBeenCalledWith('test-user');
      });
  
      it('does not run if userId is missing', async () => {
          const { result } = renderHook(() => useBudgetSummary(''), {
              wrapper: createWrapper(),
          });
          
          expect(result.current.fetchStatus).toBe('idle');
          expect(ApiService.getBudgetSummary).not.toHaveBeenCalled();
      });
    });
  
    describe('useTransactions', () => {
        it('fetches transactions', async () => {
            const mockTx = [{ id: 1, amount: 100 }];
            (ApiService.getTransactions as jest.Mock).mockResolvedValue(mockTx);
  
            const { result } = renderHook(() => useTransactions('test-user'), {
                wrapper: createWrapper(),
            });
  
            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(mockTx);
        });
    });

    describe('useAllocations', () => {
        it('fetches allocations', async () => {
            const mockAlloc = [{ id: 1, amount: 50 }];
            (ApiService.getAllocations as jest.Mock).mockResolvedValue(mockAlloc);
  
            const { result } = renderHook(() => useZeroBaseData.useAllocations('test-user'), {
                wrapper: createWrapper(),
            });
  
            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(mockAlloc);
        });
    });

    describe('Mutations', () => {
        it('useAddTransaction calls mutation', async () => {
            (ApiService.addTransaction as jest.Mock).mockResolvedValue({ success: true });
            const { result } = renderHook(() => useZeroBaseData.useAddTransaction(), { wrapper: createWrapper() });
            await result.current.mutateAsync({ userId: 'u1', amount: 100, type: 'expense' });
            expect(ApiService.addTransaction).toHaveBeenCalled();
        });

        it('useAllocateFunds calls mutation', async () => {
            (ApiService.allocateFunds as jest.Mock).mockResolvedValue({ success: true });
            const { result } = renderHook(() => useZeroBaseData.useAllocateFunds(), { wrapper: createWrapper() });
            await result.current.mutateAsync({ userId: 'u1', amount: 50, categoryId: 'c1' });
            expect(ApiService.allocateFunds).toHaveBeenCalled();
        });
    });
  });
  
