import { fetchData, GenericStringError } from '@/utils/api';
import secureClient from '@/utils/api/secureClient';

jest.mock('@/utils/api/operations/fetch');
jest.mock('@/utils/api/rateLimiter');
jest.mock('@/integrations/supabase/client', () => ({
  supabase: { from: jest.fn() }
}));

import { supabase } from '@/integrations/supabase/client';
import { checkRateLimit, incrementRequestCount } from '@/utils/api/rateLimiter';
import { fetchData as fetchDataFn } from '@/utils/api/operations/fetch';

const mockQuery = (result: any) => ({
  select: jest.fn().mockReturnThis(),
  then: (resolve: any) => Promise.resolve(result).then(resolve)
});

describe('fetchData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns rate limit error when limit exceeded', async () => {
    (checkRateLimit as jest.Mock).mockReturnValue(false);
    const result = await fetchData<{ id: number }>({ table: 'baby_names' });
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe('Rate limit exceeded');
    expect(supabase.from).not.toHaveBeenCalled();
  });

  test('returns error from supabase', async () => {
    (checkRateLimit as jest.Mock).mockReturnValue(true);
    (supabase.from as jest.Mock).mockReturnValue(mockQuery({ data: null, error: new Error('db fail') }));

    const result = await fetchData<{ id: number }>({ table: 'baby_names' });
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe('db fail');
  });

  test('returns GenericStringError when no data', async () => {
    (checkRateLimit as jest.Mock).mockReturnValue(true);
    (supabase.from as jest.Mock).mockReturnValue(mockQuery({ data: [], error: null }));

    const result = await fetchData<{ id: number }>({ table: 'baby_names' });
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(GenericStringError);
  });

  test('returns data on success and increments rate count', async () => {
    (checkRateLimit as jest.Mock).mockReturnValue(true);
    (supabase.from as jest.Mock).mockReturnValue(mockQuery({ data: [{ id: 1 }], error: null }));

    const result = await fetchData<{ id: number }>({ table: 'baby_names' });
    expect(result.error).toBeNull();
    expect(result.data).toEqual([{ id: 1 }]);
    expect(incrementRequestCount).toHaveBeenCalledWith('fetch');
  });
});

describe('secureClient.get', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns data when fetchData succeeds', async () => {
    (fetchDataFn as jest.Mock).mockResolvedValue({ data: [1], error: null });
    const result = await secureClient.get<{ id: number }>({ table: 'baby_names' });
    expect(result.data).toEqual([1]);
    expect(result.error).toBeNull();
  });

  test('handles errors from fetchData', async () => {
    const err = new Error('oops');
    (fetchDataFn as jest.Mock).mockResolvedValue({ data: null, error: err });
    const result = await secureClient.get<{ id: number }>({ table: 'baby_names' });
    expect(result.data).toBeNull();
    expect(result.error).toBe(err);
  });

  test('catches unexpected errors', async () => {
    (fetchDataFn as jest.Mock).mockRejectedValue(new Error('boom'));
    const result = await secureClient.get<{ id: number }>({ table: 'baby_names' });
    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
  });
});
