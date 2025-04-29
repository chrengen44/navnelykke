
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
export type TableNames = keyof Tables;

export interface FetchOptions<T = any> {
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

export interface GenericStringError {
  message: string;
}
