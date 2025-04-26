
import { supabase } from "@/integrations/supabase/client";
import { ApiResponse, QueryOptions } from "../types";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import { validateTableName, type ValidTableName } from '../tableValidator';

export async function fetchData<T>(
  tableName: string,
  query: QueryOptions = {},
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
        const sanitizedEmail = typeof query.eq?.[1] === 'string' ? sanitizeInput(query.eq[1]) : '';
        const options = {};
        
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
    
    const validTableName = tableName as ValidTableName;
    let queryBuilder = supabase.from(validTableName).select(query.select || '*');
    
    if (query.eq) {
      queryBuilder = queryBuilder.eq(query.eq[0], query.eq[1]);
    }
    
    if (query.orderBy) {
      queryBuilder = queryBuilder.order(query.orderBy, { ascending: query.ascending ?? false });
    } else {
      queryBuilder = queryBuilder.order('created_at', { ascending: false });
    }
    
    const result = await queryBuilder;
    
    // Break the type reference chain completely
    const safeData = result.data ? 
      (Array.isArray(result.data) 
        ? [...result.data].map(item => ({...item})) 
        : {...result.data}) 
      : null;
      
    return {
      data: safeData as any as T,
      error: result.error
    };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
