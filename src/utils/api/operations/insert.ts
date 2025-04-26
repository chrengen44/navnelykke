
import { supabase } from "@/integrations/supabase/client";
import { ApiResponse } from "../types";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import { validateTableName, type ValidTableName } from '../tableValidator';

export async function insertData<T>(
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
    const result = await supabase
      .from(validTableName)
      .insert([sanitizedData])
      .select();
    
    // Break the type chain by first casting to any, then to the generic type
    const typedData = (result.data || null) as any as T;
    
    return {
      data: typedData,
      error: result.error
    };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
