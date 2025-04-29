
import { supabase } from "@/integrations/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import { fetchData, fetchById } from "./operations/fetch";
import { updateData } from "./operations/update";
import { deleteData } from "./operations/delete";
import type { FetchOptions } from "./operations/types";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type TableNames = keyof Tables;

/**
 * Secure client with built-in error handling and validation
 */
export const secureClient = {
  /**
   * Safely fetch data with proper error handling
   */
  async get<T = any>(options: FetchOptions<T>) {
    try {
      const result = await fetchData<T>(options);
      
      if (result.error) {
        console.error('Error fetching data:', result.error);
        return { data: null, error: result.error };
      }
      
      return { data: result.data, error: null };
    } catch (error) {
      console.error('Unexpected error in secureClient.get:', error);
      return { 
        data: null, 
        error: { message: 'Unexpected error occurred' } as PostgrestError 
      };
    }
  },
  
  /**
   * Safely fetch a single item by ID
   */
  async getById<T = any>(table: TableNames, id: string | number) {
    try {
      const result = await fetchById<T>(table, id);
      
      if (result.error) {
        console.error('Error fetching data by ID:', result.error);
        return { data: null, error: result.error };
      }
      
      return { data: result.data, error: null };
    } catch (error) {
      console.error('Unexpected error in secureClient.getById:', error);
      return { 
        data: null, 
        error: { message: 'Unexpected error occurred' } as PostgrestError 
      };
    }
  },

  /**
   * Safely update data with proper error handling
   */
  async update<T = any>(table: TableNames, id: string | number, data: Partial<T>) {
    try {
      const result = await updateData<T>(table, id, data);
      return { data: result, error: null };
    } catch (error) {
      console.error('Unexpected error in secureClient.update:', error);
      return {
        data: null,
        error: error instanceof Error ? error : { message: 'Unexpected error occurred' } as PostgrestError
      };
    }
  },

  /**
   * Safely delete data with proper error handling
   */
  async delete(table: TableNames, id: string | number) {
    try {
      const result = await deleteData(table, { column: 'id', value: id });
      
      if (result.error) {
        console.error('Error deleting data:', result.error);
        return { success: false, error: result.error };
      }
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Unexpected error in secureClient.delete:', error);
      return {
        success: false,
        error: error instanceof Error ? error : { message: 'Unexpected error occurred' } as PostgrestError
      };
    }
  }
};

// Export as default as well
export default secureClient;
