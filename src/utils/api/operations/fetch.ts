
// This is a simplified version that fixes the excessive recursion type error
// by limiting the depth of type instantiation
import { supabase } from "@/integrations/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type TableNames = keyof Tables;

interface FetchOptions<T = any> {
  table: TableNames;
  select?: string;
  limit?: number;
  order?: {
    column: string;
    ascending?: boolean;
    nullsFirst?: boolean;
  };
  filters?: {
    column: string;
    operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "like" | "ilike" | "is";
    value: any;
  }[];
  relationships?: {
    table: string;
    foreignKey: string;
  }[];
}

interface FetchResult<T> {
  data: T[] | null;
  error: PostgrestError | null;
}

export async function fetchData<T = any>(
  options: FetchOptions<T>
): Promise<FetchResult<T>> {
  try {
    let query = supabase.from(options.table).select(
      options.select || "*"
    );

    // Apply filters if provided
    if (options.filters && options.filters.length > 0) {
      options.filters.forEach(filter => {
        switch (filter.operator) {
          case "eq":
            query = query.eq(filter.column, filter.value);
            break;
          case "neq":
            query = query.neq(filter.column, filter.value);
            break;
          case "gt":
            query = query.gt(filter.column, filter.value);
            break;
          case "gte":
            query = query.gte(filter.column, filter.value);
            break;
          case "lt":
            query = query.lt(filter.column, filter.value);
            break;
          case "lte":
            query = query.lte(filter.column, filter.value);
            break;
          case "like":
            query = query.like(filter.column, filter.value);
            break;
          case "ilike":
            query = query.ilike(filter.column, filter.value);
            break;
          case "is":
            query = query.is(filter.column, filter.value);
            break;
        }
      });
    }

    // Apply order if provided
    if (options.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending ?? true,
        nullsFirst: options.order.nullsFirst ?? false,
      });
    }

    // Apply limit if provided
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    
    return { data, error };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { 
      data: null, 
      error: error as PostgrestError 
    };
  }
}

export async function fetchById<T = any>(
  table: TableNames, 
  id: string | number,
  select: string = "*"
): Promise<{ data: T | null; error: PostgrestError | null }> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq('id', id)
      .single();
    
    return { data, error };
  } catch (error) {
    console.error('Error fetching by ID:', error);
    return { 
      data: null, 
      error: error as PostgrestError 
    };
  }
}

export default {
  fetchData,
  fetchById
};
