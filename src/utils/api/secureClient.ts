
import { supabase } from "@/integrations/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import { fetchData, fetchById } from "./operations/fetch";
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
  }
};

// Export as default as well
export default secureClient;
