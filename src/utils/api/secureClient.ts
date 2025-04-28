
import { fetchData, fetchById } from './operations/fetch';
import { createData, updateData, deleteData } from './operations/update';
import type { ApiResponse } from './types';
import type { FetchOptions } from './operations/types';

/**
 * Unified client for handling all secure API operations
 */
const secureApi = {
  fetch: async <T>(table: string, options?: FetchOptions, endpoint?: string): Promise<ApiResponse<T[]>> => {
    try {
      const data = await fetchData<T>(table, options);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  fetchById: async <T>(table: string, id: string | number): Promise<ApiResponse<T>> => {
    try {
      const data = await fetchById<T>(table, id);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  create: async <T>(table: string, data: T): Promise<ApiResponse<T>> => {
    try {
      const result = await createData<T>(table, data);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  update: async <T>(table: string, id: string | number, data: Partial<T>): Promise<ApiResponse<T>> => {
    try {
      const result = await updateData<T>(table, id, data);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  delete: async (table: string, id: string | number): Promise<ApiResponse<void>> => {
    try {
      await deleteData(table, id);
      return { data: undefined, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }
};

export { secureApi };
export default secureApi;
