
import { supabase } from '@/integrations/supabase/client';
import { validateTable, sanitizeData } from '../helpers';
import { ValidTableName } from '../tableValidator';
import { ApiResponse } from '../types';

// Simple record type that avoids recursive type definition
export type ApiRecord = Record<string, any>;

/**
 * Creates a new record in the specified table
 */
export const createData = async <T>(
  table: ValidTableName, 
  data: ApiRecord
): Promise<ApiResponse<T>> => {
  try {
    validateTable(table);
    const sanitizedData = sanitizeData(data);

    const { data: responseData, error } = await supabase
      .from(table)
      .insert(sanitizedData)
      .select();

    if (error) {
      return { data: null, error };
    }

    // Handle the data safely
    const result = responseData?.[0] || null;
    return { 
      data: result as T, 
      error: null 
    };
  } catch (error) {
    console.error('Error in createData:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unexpected error occurred')
    };
  }
};

/**
 * Updates a record in the specified table by ID
 */
export const updateData = async <T>(
  table: ValidTableName,
  id: string | number,
  data: ApiRecord
): Promise<ApiResponse<T>> => {
  try {
    validateTable(table);
    const sanitizedData = sanitizeData(data);

    const { data: responseData, error } = await supabase
      .from(table)
      .update(sanitizedData)
      .eq('id', id)
      .select();

    if (error) {
      return { data: null, error };
    }

    // Handle the data safely
    const result = responseData?.[0] || null;
    return { 
      data: result as T, 
      error: null 
    };
  } catch (error) {
    console.error('Error in updateData:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unexpected error occurred')
    };
  }
};
