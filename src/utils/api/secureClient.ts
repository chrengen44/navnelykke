
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, incrementRequestCount } from './rateLimiter';
import { sanitizeInput } from './sanitizer';
import { validateTableName, type ValidTableName } from './tableValidator';

// Define a simple response type to use throughout the file
type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};

export const secureApi = {
  async fetch<T>(
    tableName: string, 
    query: any = {},
    endpoint = 'default'
  ): Promise<ApiResponse<T>> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      if (typeof tableName === 'string' && tableName.startsWith('auth.')) {
        if (tableName === 'auth.resetPasswordForEmail') {
          const sanitizedEmail = typeof query.email === 'string' ? sanitizeInput(query.email) : '';
          const options = query.options || {};
          
          const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, options);
          
          return { data: null, error };
        }
        return { data: null, error: new Error(`Unsupported auth method: ${tableName}`) };
      }

      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      // Use a type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Break the complex type chain completely with a two-step approach
      const query_response = await supabase
        .from(validTableName)
        .select(query.select || '*')
        .order(query.orderBy || 'created_at', { ascending: false });
      
      // Return with explicit type casting to avoid deep instantiation
      return { 
        data: query_response.data as any as T, 
        error: query_response.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async insert<T>(
    tableName: string,
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<ApiResponse<T>> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      const sanitizedData = sanitizeInput(data);
      
      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      const validTableName = tableName as ValidTableName;
      
      // Two-step approach to break the type chain
      const query_response = await supabase
        .from(validTableName)
        .insert([sanitizedData]);
      
      return { 
        data: query_response.data as any as T, 
        error: query_response.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async update<T>(
    tableName: string,
    query: { column: string; value: any },
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<ApiResponse<T>> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      const sanitizedData = sanitizeInput(data);
      const sanitizedQuery = sanitizeInput(query);
      
      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      const validTableName = tableName as ValidTableName;
      
      // First define the query without executing it
      const updateOperation = supabase
        .from(validTableName)
        .update(sanitizedData)
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      // Then execute and collect the response as a plain object
      const query_response = await updateOperation;
      
      // Return with explicit type casting
      return {
        data: query_response.data as any as T,
        error: query_response.error
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async delete<T>(
    tableName: string,
    query: { column: string; value: any },
    endpoint = 'update'
  ): Promise<ApiResponse<T>> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      const sanitizedQuery = sanitizeInput(query);
      
      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      const validTableName = tableName as ValidTableName;
      
      // First define the query without executing it
      const deleteOperation = supabase
        .from(validTableName)
        .delete()
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      // Then execute and collect the response as a plain object
      const query_response = await deleteOperation;
      
      // Return with explicit type casting
      return {
        data: query_response.data as any as T,
        error: query_response.error
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
};

export default secureApi;
