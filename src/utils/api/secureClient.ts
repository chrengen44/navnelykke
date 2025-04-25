
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, incrementRequestCount } from './rateLimiter';
import { sanitizeInput } from './sanitizer';
import { validateTableName, type ValidTableName } from './tableValidator';

// Define a simple response type to use throughout the file
type ApiResponse<T = any> = {
  data: T | null;
  error: Error | null;
};

export const secureApi = {
  async fetch<T = any>(
    tableName: string, 
    query: any = {},
    endpoint = 'default'
  ): Promise<ApiResponse<T>> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      // Handle auth-related endpoints
      if (typeof tableName === 'string' && tableName.startsWith('auth.')) {
        if (tableName === 'auth.resetPasswordForEmail') {
          const sanitizedEmail = typeof query.email === 'string' ? sanitizeInput(query.email) : '';
          const options = query.options || {};
          
          const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, options);
          
          return { data: null, error };
        }
        return { data: null, error: new Error(`Unsupported auth method: ${tableName}`) };
      }

      // Validate table name
      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      // Type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // First step: Create the query object
      const selectQuery = supabase
        .from(validTableName)
        .select(query.select || '*');
      
      // Second step: Add ordering if needed
      const orderedQuery = selectQuery.order(query.orderBy || 'created_at', { ascending: false });
      
      // Third step: Execute query and get raw response
      const rawResponse = await orderedQuery;
      
      // Fourth step: Return with simple typing to avoid deep instantiation
      return { 
        data: rawResponse.data as unknown as T, 
        error: rawResponse.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async insert<T = any>(
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
      
      // Type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Step 1: Create insert query
      const insertQuery = supabase
        .from(validTableName)
        .insert([sanitizedData]);
      
      // Step 2: Execute query and get raw response
      const rawResponse = await insertQuery;
      
      // Step 3: Return with explicit type to break complex chains
      return { 
        data: rawResponse.data as unknown as T, 
        error: rawResponse.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async update<T = any>(
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
      
      // Type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Step 1: Build query without executing
      const baseQuery = supabase.from(validTableName);
      
      // Step 2: Add update operation
      const updateOperation = baseQuery.update(sanitizedData);
      
      // Step 3: Add filter
      const filteredOperation = updateOperation.eq(sanitizedQuery.column, sanitizedQuery.value);
      
      // Step 4: Execute and get raw response
      const rawResponse = await filteredOperation;
      
      // Step 5: Return with explicit type casting to avoid inference chains
      return {
        data: rawResponse.data as unknown as T,
        error: rawResponse.error
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async delete<T = any>(
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
      
      // Type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Step 1: Build base query
      const baseQuery = supabase.from(validTableName);
      
      // Step 2: Add delete operation
      const deleteOperation = baseQuery.delete();
      
      // Step 3: Add filter
      const filteredOperation = deleteOperation.eq(sanitizedQuery.column, sanitizedQuery.value);
      
      // Step 4: Execute and get raw response
      const rawResponse = await filteredOperation;
      
      // Step 5: Return with explicit type casting
      return {
        data: rawResponse.data as unknown as T,
        error: rawResponse.error
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
};

export default secureApi;
