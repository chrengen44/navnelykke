
import { supabase } from "@/integrations/supabase/client";
import { ApiResponse } from "../types";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import { validateTableName, ValidTableName } from '../tableValidator';

export async function deleteData<T>(
  tableName: ValidTableName,
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
    
    // Use the validated table name directly
    const result = await supabase
      .from(tableName)
      .delete()
      .eq(sanitizedQuery.column, sanitizedQuery.value);
    
    // Handle error case
    if (result.error) {
      return { data: null, error: new Error(result.error.message) };
    }
    
    // Fix the excessive type instantiation by using a more direct type assertion
    return { data: null as T, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
