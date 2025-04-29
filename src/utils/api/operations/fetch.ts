
import { supabase } from "@/integrations/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import type { FetchOptions } from "./types";
import { validateTableName, type ValidTableName } from '../tableValidator';
import { GenericStringError } from "../types";

export interface ApiResponse<T> {
  data: T | null;
  error: PostgrestError | Error | null;
}

/**
 * Fetch data based on options
 */
export async function fetchData<T>(
  options: FetchOptions,
  endpoint = 'fetch'
): Promise<ApiResponse<T>> {
  if (!checkRateLimit(endpoint)) {
    return { 
      data: null, 
      error: new Error("Rate limit exceeded")
    };
  }
  
  incrementRequestCount(endpoint);
  
  try {
    if (!validateTableName(options.table)) {
      console.warn(`Warning: ${options.table} is not a recognized table name`);
      return { 
        data: null, 
        error: new Error(`Invalid table name: ${options.table}`) 
      };
    }
    
    const validTableName = options.table as ValidTableName;
    let query = supabase.from(validTableName).select(options.select || '*');
    
    // Apply filters if they exist
    if (options.filters && options.filters.length > 0) {
      for (const filter of options.filters) {
        const { column, operator, value } = filter;
        
        // Sanitize the column and value
        const safeColumn = sanitizeInput(column);
        let safeValue = sanitizeInput(value);
        
        switch (operator) {
          case 'eq':
            query = query.eq(safeColumn, safeValue);
            break;
          case 'neq':
            query = query.neq(safeColumn, safeValue);
            break;
          case 'gt':
            query = query.gt(safeColumn, safeValue);
            break;
          case 'gte':
            query = query.gte(safeColumn, safeValue);
            break;
          case 'lt':
            query = query.lt(safeColumn, safeValue);
            break;
          case 'lte':
            query = query.lte(safeColumn, safeValue);
            break;
          case 'like':
            query = query.like(safeColumn, `%${safeValue}%`);
            break;
          case 'ilike':
            query = query.ilike(safeColumn, `%${safeValue}%`);
            break;
          case 'is':
            query = query.is(safeColumn, safeValue);
            break;
          default:
            return { 
              data: null, 
              error: new Error(`Unsupported operator: ${operator}`)
            };
        }
      }
    }
    
    // Apply ordering if specified
    if (options.order) {
      const { column, ascending = true, nullsFirst = false } = options.order;
      query = query.order(column, { ascending, nullsFirst });
    }
    
    // Apply limit if specified
    if (options.limit && options.limit > 0) {
      query = query.limit(options.limit);
    }
    
    const result = await query;
    
    if (result.error) {
      return { data: null, error: result.error };
    }
    
    // Handle no data case with better typing
    if (!result.data || result.data.length === 0) {
      const noDataError: GenericStringError = { message: "No data found" };
      return { data: null as unknown as T, error: noDataError };
    }
    
    return { data: result.data as unknown as T, error: null };
    
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err : new Error(String(err)) 
    };
  }
}

/**
 * Fetch a single record by ID
 */
export async function fetchById<T>(
  tableName: ValidTableName,
  id: string | number,
  endpoint = 'fetch'
): Promise<ApiResponse<T>> {
  try {
    return await fetchData<T>({
      table: tableName,
      filters: [{ column: 'id', operator: 'eq', value: id }]
    }, endpoint);
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err : new Error(String(err)) 
    };
  }
}
