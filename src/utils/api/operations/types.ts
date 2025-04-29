
import type { Database } from "@/integrations/supabase/types";
import type { ValidTableName } from "../tableValidator";

type Tables = Database["public"]["Tables"];
export type TableNames = keyof Tables;

export interface FetchOptions<T = any> {
  table: ValidTableName;
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
