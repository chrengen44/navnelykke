
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, incrementRequestCount } from './rateLimiter';
import { sanitizeInput } from './sanitizer';
import { validateTableName, type ValidTableName } from './tableValidator';

/**
 * A simplified response type to use throughout the API
 */
type ApiResponse<T = unknown> = {
  data: T | null;
  error: Error | null;
};

export const secureApi = {
  /**
   * Fetches data securely from a table with rate limiting and validation
   */
  async fetch<T>(
    tableName: string, 
    query: Record<string, any> = {},
    endpoint = 'default'
  ): Promise<ApiResponse<T>> {
    // Check rate limiting
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
      
      // Use validated table name
      const validTableName = tableName as ValidTableName;
      
      // Create the base query
      let query_builder = supabase.from(validTableName).select(query.select || '*');
      
      // Add filters if provided
      if (query.eq) {
        const [column, value] = query.eq;
        query_builder = query_builder.eq(column, value);
      }
      
      // Add ordering if provided
      if (query.orderBy) {
        const ascending = query.ascending !== undefined ? query.ascending : false;
        query_builder = query_builder.order(query.orderBy, { ascending });
      } else {
        query_builder = query_builder.order('created_at', { ascending: false });
      }
      
      // Execute the query
      const { data, error } = await query_builder;
      
      // Return the result with explicit type casting
      return { 
        data: data as unknown as T, 
        error: error as Error | null
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  /**
   * Inserts data securely into a table with rate limiting and validation
   */
  async insert<T>(
    tableName: string,
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<ApiResponse<T>> {
    // Check rate limiting
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      // Sanitize input data
      const sanitizedData = sanitizeInput(data);
      
      // Validate table name
      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      // Use validated table name
      const validTableName = tableName as ValidTableName;
      
      // Execute the insert operation
      const { data: resultData, error } = await supabase
        .from(validTableName)
        .insert([sanitizedData])
        .select();
      
      // Return the result with explicit type casting
      return { 
        data: resultData as unknown as T, 
        error: error as Error | null
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  /**
   * Updates data securely in a table with rate limiting and validation
   */
  async update<T>(
    tableName: string,
    query: { column: string; value: any },
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<ApiResponse<T>> {
    // Check rate limiting
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      // Sanitize input
      const sanitizedData = sanitizeInput(data);
      const sanitizedQuery = sanitizeInput(query);
      
      // Validate table name
      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      // Use validated table name
      const validTableName = tableName as ValidTableName;
      
      // Execute the update operation
      const { data: resultData, error } = await supabase
        .from(validTableName)
        .update(sanitizedData)
        .eq(sanitizedQuery.column, sanitizedQuery.value)
        .select();
      
      // Return the result with explicit type casting
      return {
        data: resultData as unknown as T,
        error: error as Error | null
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  /**
   * Deletes data securely from a table with rate limiting and validation
   */
  async delete<T>(
    tableName: string,
    query: { column: string; value: any },
    endpoint = 'update'
  ): Promise<ApiResponse<T>> {
    // Check rate limiting
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      // Sanitize query
      const sanitizedQuery = sanitizeInput(query);
      
      // Validate table name
      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      // Use validated table name
      const validTableName = tableName as ValidTableName;
      
      // Execute the delete operation
      const { data: resultData, error } = await supabase
        .from(validTableName)
        .delete()
        .eq(sanitizedQuery.column, sanitizedQuery.value)
        .select();
      
      // Return the result with explicit type casting
      return {
        data: resultData as unknown as T,
        error: error as Error | null
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
};

export default secureApi;
