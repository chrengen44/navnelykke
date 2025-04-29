
import { supabase } from '@/integrations/supabase/client';
import { validateTable, sanitizeData } from '../helpers';
import { ValidTableName } from '../tableValidator';
import { ApiResponse } from '../types';

/**
 * Creates a new record in the specified table
 */
export const createData = async <T>(table: ValidTableName, data: T): Promise<ApiResponse<T>> => {
  try {
    validateTable(table);
    const sanitizedData = sanitizeData(data);

    // Use type assertion to avoid excessive type instantiation
    const { data: responseData, error } = await supabase
      .from(table)
      .insert([sanitizedData])
      .select();

    if (error) {
      return { data: null, error };
    }

    // Handle the data safely
    return { 
      data: (responseData?.[0] as T) || null, 
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
  data: Partial<T>
): Promise<ApiResponse<T>> => {
  try {
    validateTable(table);
    const sanitizedData = sanitizeData(data);

    // Use type assertion to avoid excessive type instantiation
    const { data: responseData, error } = await supabase
      .from(table)
      .update(sanitizedData)
      .eq('id', id)
      .select();

    if (error) {
      return { data: null, error };
    }

    // Handle the data safely
    return { 
      data: (responseData?.[0] as T) || null, 
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
