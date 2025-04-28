
import { supabase } from "@/integrations/supabase/client";
import { ApiResponse } from "../types";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import { validateTableName, ValidTableName } from '../tableValidator';

export async function deleteData<T>(
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
    const result = await supabase
      .from(validTableName)
      .delete()
      .eq(sanitizedQuery.column, sanitizedQuery.value);
    
    // Simple version to avoid recursion
    if (result.error) {
      return { data: null, error: new Error(result.error.message) };
    }
    
    return { data: null, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
