
import { supabase } from "@/integrations/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import { fetchData, fetchById } from "./operations/fetch";
import { updateData, createData } from "./operations/update";
import { deleteData } from "./operations/delete";
import type { FetchOptions } from "./operations/types";
import type { ApiResponse } from "./types";
import type { ValidTableName } from "./tableValidator";

/**
 * Secure client with built-in error handling and validation
 */
export const secureClient = {
  /**
   * Safely fetch data with proper error handling
   */
  async get<T = any>(options: FetchOptions<T>): Promise<ApiResponse<T>> {
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
        error: error instanceof Error ? error : new Error('Unexpected error occurred')
      };
    }
  },
  
  /**
   * Safely fetch a single item by ID
   */
  async getById<T = any>(table: ValidTableName, id: string | number): Promise<ApiResponse<T>> {
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
        error: error instanceof Error ? error : new Error('Unexpected error occurred')
      };
    }
  },

  /**
   * Safely update data with proper error handling
   */
  async update<T = any>(table: ValidTableName, id: string | number, data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      return await updateData<T>(table, id, data);
    } catch (error) {
      console.error('Unexpected error in secureClient.update:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unexpected error occurred')
      };
    }
  },

  /**
   * Safely create data with proper error handling
   */
  async create<T = any>(table: ValidTableName, data: T): Promise<ApiResponse<T>> {
    try {
      return await createData<T>(table, data);
    } catch (error) {
      console.error('Unexpected error in secureClient.create:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unexpected error occurred')
      };
    }
  },

  /**
   * Safely delete data with proper error handling
   */
  async delete(table: ValidTableName, id: string | number): Promise<{ success: boolean; error: Error | PostgrestError | null }> {
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
        error: error instanceof Error ? error : new Error('Unexpected error occurred')
      };
    }
  }
};

// Export as default as well
export default secureClient;
