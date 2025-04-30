
export interface FetchOptions {
  table: string;
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

// Add explicit types to avoid deep instantiation
export type ApiData = Record<string, any>;
