
import { supabase } from '@/integrations/supabase/client';
import { validateTable, sanitizeData } from '../helpers';
import { ValidTableName } from '../tableValidator';

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

    // Break recursive type chain with type casting
    return result as unknown as T;
  } catch (error) {
    console.error('Error in createData:', error);
    throw error;
  }
};

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

    // Break recursive type chain with type casting
    return result as unknown as T;
  } catch (error) {
    console.error('Error in updateData:', error);
    throw error;
  }
};

export const deleteData = async (table: ValidTableName, id: string | number): Promise<void> => {
  try {
    validateTable(table);

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting data from ${table}: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in deleteData:', error);
    throw error;
  }
};
