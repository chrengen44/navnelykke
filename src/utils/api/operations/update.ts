
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
    
    // Handle data without causing type recursion
    let processedData = null;
    if (result.data) {
      // Simple conversion to avoid deep nesting/recursion in types
      processedData = JSON.parse(JSON.stringify(result.data));
    }
      
    return {
      data: processedData as T,
      error: result.error
    };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
