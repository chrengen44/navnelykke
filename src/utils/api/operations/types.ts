
/**
 * Filter operator types for database queries
 */
export type FilterOperator = 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'ilike' | 'in';

/**
 * Filter definition for database queries
 */
export interface Filter {
  column: string;
  operator: FilterOperator;
  value: any;
}

/**
 * Sort order configuration
 */
export interface OrderBy {
  column: string;
  ascending: boolean;
}

/**
 * Options for fetch operations
 */
export interface FetchOptions {
  columns?: string;
  filters?: Filter[];
  orderBy?: OrderBy;
  limit?: number;
}
