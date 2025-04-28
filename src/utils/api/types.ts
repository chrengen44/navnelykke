
/**
 * A unified response type for API operations
 */
export type ApiResponse<T = unknown> = {
  data: T | null;
  error: Error | null;
};

/**
 * Generic query options for fetching data
 */
export type QueryOptions = {
  select?: string;
  eq?: [string, any];
  orderBy?: string;
  ascending?: boolean;
};
