
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import { validateTableName, ValidTableName } from '../tableValidator';

/**
 * Fetches data from a table with optional filtering
 */
export async function fetchData<T>(
  table: ValidTableName,
  options: {
    columns?: string;
    filter?: { column: string; value: any };
    limit?: number;
    orderBy?: { column: string; ascending: boolean };
  } = {},
  endpoint = 'fetch'
): Promise<T[]> {
  if (!checkRateLimit(endpoint)) {
    throw new Error("Rate limit exceeded");
  }
  
  incrementRequestCount(endpoint);
  
  try {
    if (!validateTableName(table)) {
      console.warn(`Warning: ${table} is not a recognized table name`);
      throw new Error(`Invalid table name: ${table}`);
    }
    
    let query = supabase.from(table).select(options.columns || '*');
    
    if (options.filter) {
      const sanitizedFilter = sanitizeInput(options.filter);
      query = query.eq(sanitizedFilter.column, sanitizedFilter.value);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Error fetching data from ${table}: ${error.message}`);
    }

    // Use a direct type cast to avoid TS2589 error
    return (data || []) as any as T[];
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
}

/**
 * Fetches a single record by ID
 */
export async function fetchById<T>(
  table: ValidTableName,
  id: number | string,
  columns: string = '*',
  endpoint = 'fetch'
): Promise<T | null> {
  if (!checkRateLimit(endpoint)) {
    throw new Error("Rate limit exceeded");
  }
  
  incrementRequestCount(endpoint);
  
  try {
    if (!validateTableName(table)) {
      console.warn(`Warning: ${table} is not a recognized table name`);
      throw new Error(`Invalid table name: ${table}`);
    }
    
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw error;
    }

    // Use a direct type cast to avoid TS2589 error
    return data as any as T;
  } catch (error) {
    console.error(`Error in fetchById for table ${table} with ID ${id}:`, error);
    return null;
  }
}
