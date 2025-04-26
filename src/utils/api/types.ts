
/**
 * A simplified response type to use throughout the API
 */
export type ApiResponse<T = unknown> = {
  data: T | null;
  error: Error | null;
};

export type QueryOptions = {
  select?: string;
  eq?: [string, any];
  orderBy?: string;
  ascending?: boolean;
};
