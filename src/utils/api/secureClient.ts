
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, incrementRequestCount } from './rateLimiter';
import { sanitizeInput } from './sanitizer';
import { validateTableName, type ValidTableName } from './tableValidator';

export const secureApi = {
  async fetch<T>(
    tableName: string, 
    query: any = {},
    endpoint = 'default'
  ): Promise<{ data: T | null; error: Error | null }> {
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
          
          return { data: null as T, error };
        }
        return { data: null, error: new Error(`Unsupported auth method: ${tableName}`) };
      }

      if (!validateTableName(tableName)) {
        console.warn(`Warning: ${tableName} is not a recognized table name`);
        return { data: null, error: new Error(`Invalid table name: ${tableName}`) };
      }
      
      // Use a type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Simplify the typing of the result to avoid deep instantiation
      const { data, error } = await supabase
        .from(validTableName)
        .select(query.select || '*')
        .order(query.orderBy || 'created_at', { ascending: false });
      
      return { data: data as T, error };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async insert<T>(
    tableName: string,
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<{ data: T | null; error: Error | null }> {
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
      
      // Use a type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Simplify typing to avoid deep instantiation
      const { data: resultData, error } = await supabase
        .from(validTableName)
        .insert([sanitizedData]);
      
      return { data: resultData as T, error };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async update<T>(
    tableName: string,
    query: { column: string; value: any },
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<{ data: T | null; error: Error | null }> {
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
      
      // Use a type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Use a type cast to any to break the deep instantiation
      const result: any = await supabase
        .from(validTableName)
        .update(sanitizedData)
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      return { 
        data: result.data as T, 
        error: result.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  async delete<T>(
    tableName: string,
    query: { column: string; value: any },
    endpoint = 'update'
  ): Promise<{ data: T | null; error: Error | null }> {
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
      
      // Use a type assertion after validation
      const validTableName = tableName as ValidTableName;
      
      // Use a type cast to any to break the deep instantiation
      const result: any = await supabase
        .from(validTableName)
        .delete()
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      return { 
        data: result.data as T, 
        error: result.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
};

export default secureApi;
