
import { supabase } from '@/integrations/supabase/client';
import { validateTable, sanitizeData } from '../helpers';
import { ValidTableName } from '../tableValidator';
import { ApiResponse } from '../types';

/**
 * Creates a new record in the specified table
 */
export const createData = async <T,>(table: ValidTableName, data: T): Promise<T> => {
  try {
    validateTable(table);
    const sanitizedData = sanitizeData(data);

    const { data: result, error } = await supabase
      .from(table)
      .insert([sanitizedData])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating data in ${table}: ${error.message}`);
    }

    return result as unknown as T;
  } catch (error) {
    console.error('Error in createData:', error);
    throw error;
  }
};

/**
 * Updates a record in the specified table by ID
 */
export const updateData = async <T,>(
  table: ValidTableName,
  id: string | number,
  data: Partial<T>
): Promise<T> => {
  try {
    validateTable(table);
    const sanitizedData = sanitizeData(data);

    const { data: result, error } = await supabase
      .from(table)
      .update(sanitizedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating data in ${table}: ${error.message}`);
    }

    return result as unknown as T;
  } catch (error) {
    console.error('Error in updateData:', error);
    throw error;
  }
};

// Note: The deleteData function has been removed from this file to avoid duplication.
// It now exists solely in operations/delete.ts and is re-exported from index.ts as deleteDataV2.
