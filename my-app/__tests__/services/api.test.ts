import api, { 
    addTransaction, 
    getBudgetSummary, 
    allocateFunds, 
    getTransactions,
    getAllocations,
    login,
    signup
  } from '@/services/api';
  
  // Mock axios factory pattern to avoid hoisting issues
  jest.mock('axios', () => ({
      create: jest.fn(() => ({
          get: jest.fn(),
          post: jest.fn(),
          defaults: { headers: {} },
          interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }
      })),
  }));
  
  describe('API Service', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('addTransaction', () => {
      it('calls POST /transaction with correct data', async () => {
        const mockData = { userId: '123', amount: 100, type: 'expense' as const };
        const mockResponse = { data: { success: true, id: 'tx_1' } };
        // Use the exported api instance methods which are now mocks
        (api.post as jest.Mock).mockResolvedValue(mockResponse);
  
        const result = await addTransaction(mockData);
  
        expect(api.post).toHaveBeenCalledWith('/transaction', mockData);
        expect(result).toEqual(mockResponse.data);
      });
    });
  
    describe('getBudgetSummary', () => {
      it('calls GET /budget/summary with userId params', async () => {
        const userId = 'user_123';
        const mockResponse = { data: { safeToSpend: 500, unallocated: 200 } };
        (api.get as jest.Mock).mockResolvedValue(mockResponse);
  
        const result = await getBudgetSummary(userId);
  
        expect(api.get).toHaveBeenCalledWith('/budget/summary', { params: { userId } });
        expect(result).toEqual(mockResponse.data);
      });
    });
  
    describe('allocateFunds', () => {
      it('calls POST /budget/allocate', async () => {
        const payload = { userId: 'u1', amount: 50, categoryId: 'c1' };
        (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
  
        await allocateFunds(payload);
  
        expect(api.post).toHaveBeenCalledWith('/budget/allocate', payload);
      });
    });

    describe('getTransactions', () => {
        it('calls GET /transactions', async () => {
            const userId = 'u1';
            (api.get as jest.Mock).mockResolvedValue({ data: [] });
            await getTransactions(userId);
            expect(api.get).toHaveBeenCalledWith('/transactions', { params: { userId } });
        });
    });

    describe('getTransactions', () => {
        it('calls GET /transactions', async () => {
            const userId = 'u1';
            (api.get as jest.Mock).mockResolvedValue({ data: [] });
            await getTransactions(userId);
            expect(api.get).toHaveBeenCalledWith('/transactions', { params: { userId } });
        });
    });
    
    describe('getAllocations', () => {
        it('calls GET /allocations', async () => {
            const userId = 'u1';
            (api.get as jest.Mock).mockResolvedValue({ data: [] });
            await getAllocations(userId);
            expect(api.get).toHaveBeenCalledWith('/allocations', { params: { userId } });
        });
    });

    describe('Auth', () => {
        it('login calls POST /auth/login', async () => {
            const data = { username: 'test', password: 'password' };
            const mockResponse = { data: { token: 'abc' } };
            (api.post as jest.Mock).mockResolvedValue(mockResponse);

            const result = await login(data);
            expect(api.post).toHaveBeenCalledWith('/auth/login', data);
            expect(result).toEqual(mockResponse.data);
        });

        it('signup calls POST /auth/signup', async () => {
            const data = { username: 'test', password: 'password', email: 'test@test.com' };
            const mockResponse = { data: { userId: '123' } };
            (api.post as jest.Mock).mockResolvedValue(mockResponse);

            const result = await signup(data);
            expect(api.post).toHaveBeenCalledWith('/auth/signup', data);
            expect(result).toEqual(mockResponse.data);
        });
    });
  });
  
