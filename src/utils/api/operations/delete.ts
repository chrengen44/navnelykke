
import { supabase } from "@/integrations/supabase/client";
import { ApiResponse } from "../types";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import { validateTableName, ValidTableName } from '../tableValidator';

/**
 * Deletes data from a table with improved error handling and validation
 */
export async function deleteData<T = Record<string, unknown>>(
  tableName: ValidTableName,
  query: { column: string; value: any },
  endpoint = 'delete'
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
    
    // Use the validated table name directly
    const result = await supabase
      .from(tableName)
      .delete()
      .eq(sanitizedQuery.column, sanitizedQuery.value);
    
    // Handle error case
    if (result.error) {
      console.error(`Error deleting data from ${tableName}:`, result.error);
      return { data: null, error: new Error(result.error.message) };
    }
    
    return { 
      data: null, 
      error: null 
    };
  } catch (err) {
    console.error(`Error in deleteData for table ${tableName}:`, err);
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
