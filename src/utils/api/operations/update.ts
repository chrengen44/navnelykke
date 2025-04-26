
import { supabase } from "@/integrations/supabase/client";
import { ApiResponse } from "../types";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import { validateTableName, type ValidTableName } from '../tableValidator';

export async function updateData<T>(
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
    const result = await supabase
      .from(validTableName)
      .update(sanitizedData)
      .eq(sanitizedQuery.column, sanitizedQuery.value)
      .select();
    
    let safeData: any = null;
    if (result.data) {
      if (Array.isArray(result.data)) {
        safeData = result.data.map(item => {
          if (item && typeof item === 'object') {
            return Object.assign({}, item);
          }
          return item;
        });
      } else if (result.data && typeof result.data === 'object') {
        safeData = Object.assign({}, result.data);
      } else {
        safeData = result.data;
      }
    }
      
    return {
      data: safeData as T,
      error: result.error
    };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
