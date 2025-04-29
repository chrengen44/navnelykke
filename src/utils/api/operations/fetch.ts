
import { supabase } from "@/integrations/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import { checkRateLimit, incrementRequestCount } from '../rateLimiter';
import { sanitizeInput } from '../sanitizer';
import type { FetchOptions } from "./types";
import { validateTableName, type ValidTableName } from '../tableValidator';
import { ApiResponse } from "../types";

/**
 * Error class for handling generic string errors
 */
export class GenericStringError extends Error {
  details?: string;
  hint?: string;
  code?: string;
  name: string;
  
  constructor(message: string) {
    super(message);
    this.name = 'GenericStringError';
  }
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
    
    // Execute the query
    const { data, error } = await query as { data: T | null, error: PostgrestError | null };
    
    if (error) {
      return { data: null, error };
    }
    
    // Handle no data case
    if (!data || (Array.isArray(data) && data.length === 0)) {
      const noDataError = new GenericStringError("No data found");
      // Add missing properties to make it compatible with PostgrestError
      noDataError.code = "NOT_FOUND";
      noDataError.details = "No matching records found";
      noDataError.hint = "Try adjusting your search criteria";
      return { data: null, error: noDataError as unknown as PostgrestError };
    }
    
    return { data, error: null };
    
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
