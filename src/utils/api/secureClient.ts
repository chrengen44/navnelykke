
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
      
      // Break the complex type chain completely by using Promise and awaiting it
      const response = await supabase
        .from(validTableName)
        .select(query.select || '*')
        .order(query.orderBy || 'created_at', { ascending: false });
      
      // Return with simple structure and no complex type inference
      return { 
        data: response.data as unknown as T, 
        error: response.error 
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
      
      const validTableName = tableName as ValidTableName;
      
      // Break complex type chains with Promise and await
      const response = await supabase
        .from(validTableName)
        .insert([sanitizedData]);
      
      return { 
        data: response.data as unknown as T, 
        error: response.error 
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
      
      const validTableName = tableName as ValidTableName;
      
      // Simplified approach - store the operation in a variable
      const updateQuery = supabase
        .from(validTableName)
        .update(sanitizedData)
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      // Then execute it separately to break the type chain
      const response = await updateQuery;
      
      // Return with simpler typing that avoids deep instantiation
      return {
        data: response.data as unknown as T,
        error: response.error
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
      
      const validTableName = tableName as ValidTableName;
      
      // Simplified approach with separate steps
      const deleteQuery = supabase
        .from(validTableName)
        .delete()
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      // Execute separately to break the type chain
      const response = await deleteQuery;
      
      // Return with simpler typing
      return {
        data: response.data as unknown as T,
        error: response.error
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
};

export default secureApi;
