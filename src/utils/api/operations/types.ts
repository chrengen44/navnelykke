
import type { ValidTableName } from "../tableValidator";

// Simplified interface to avoid excessive type instantiation
export interface FetchOptions {
  table: ValidTableName;
  select?: string;
  limit?: number;
  order?: {
    column: string;
    ascending?: boolean;
    nullsFirst?: boolean;
  };
  filters?: Array<{
    column: string;
    operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "like" | "ilike" | "is";
    value: any;
  }>;
  relationships?: Array<{
    table: string;
    foreignKey: string;
  }>;
}
