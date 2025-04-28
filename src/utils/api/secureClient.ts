
import { fetchData, fetchById } from './operations/fetch';
import { createData, updateData } from './operations/update';
import { deleteData } from './operations/delete';
import type { ApiResponse } from './types';
import type { FetchOptions } from './operations/types';
import type { ValidTableName } from './tableValidator';

const CACHE_TTL = 60000; // 1 minute cache TTL
const cache = new Map<string, { data: any, timestamp: number }>();

/**
 * Unified client for handling all secure API operations with improved caching
 */
const secureApi = {
  fetch: async <T>(table: ValidTableName, options?: FetchOptions, endpoint?: string): Promise<ApiResponse<T[]>> => {
    try {
      // Generate cache key based on request parameters
      const cacheKey = `fetch:${table}:${JSON.stringify(options || {})}`;
      const now = Date.now();
      
      // Check if we have a valid cached response
      const cached = cache.get(cacheKey);
      if (cached && now - cached.timestamp < CACHE_TTL) {
        return { data: cached.data, error: null };
      }
      
      // If no cache hit, fetch fresh data
      const data = await fetchData<T>(table, options, endpoint);
      
      // Cache the successful response
      cache.set(cacheKey, { data, timestamp: now });
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  fetchById: async <T>(table: ValidTableName, id: string | number): Promise<ApiResponse<T>> => {
    try {
      // Generate cache key based on request parameters
      const cacheKey = `fetchById:${table}:${id}`;
      const now = Date.now();
      
      // Check if we have a valid cached response
      const cached = cache.get(cacheKey);
      if (cached && now - cached.timestamp < CACHE_TTL) {
        return { data: cached.data, error: null };
      }
      
      // If no cache hit, fetch fresh data
      const data = await fetchById<T>(table, id);
      
      // Cache the successful response
      if (data) {
        cache.set(cacheKey, { data, timestamp: now });
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  create: async <T>(table: ValidTableName, data: T): Promise<ApiResponse<T>> => {
    try {
      const result = await createData<T>(table, data);
      
      // Invalidate related cache entries when data changes
      invalidateTableCache(table);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  update: async <T>(table: ValidTableName, id: string | number, data: Partial<T>): Promise<ApiResponse<T>> => {
    try {
      const result = await updateData<T>(table, id, data);
      
      // Invalidate related cache entries when data changes
      invalidateTableCache(table);
      invalidateSpecificCache(`fetchById:${table}:${id}`);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  delete: async (table: ValidTableName, id: string | number): Promise<ApiResponse<void>> => {
    try {
      await deleteData(table, { column: 'id', value: id });
      
      // Invalidate related cache entries when data changes
      invalidateTableCache(table);
      invalidateSpecificCache(`fetchById:${table}:${id}`);
      return { data: undefined, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  },
  
  clearCache: () => {
    cache.clear();
  }
};

// Helper functions for cache invalidation
function invalidateTableCache(table: string) {
  for (const key of cache.keys()) {
    if (key.includes(`:${table}:`)) {
      cache.delete(key);
    }
  }
}

function invalidateSpecificCache(key: string) {
  cache.delete(key);
}

export { secureApi };
export default secureApi;
