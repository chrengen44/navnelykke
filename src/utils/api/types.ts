
import type { ValidTableName } from './tableValidator';
import type { PostgrestError } from '@supabase/supabase-js';

/**
 * A unified response type for API operations
 */
export type ApiResponse<T = unknown> = {
  data: T | null;
  error: Error | PostgrestError | null;
};

/**
 * Generic error with string message
 * Note: Extended from Error class to be compatible with PostgrestError
 */
export class GenericStringError extends Error {
  details?: string;
  hint?: string;
  code?: string;
  constructor(message: string) {
    super(message);
    this.name = 'GenericStringError';
  }
}

/**
 * Generic query options for fetching data
 */
export type QueryOptions = {
  select?: string;
  eq?: [string, any];
  orderBy?: string;
  ascending?: boolean;
};

/**
 * Define the Session interface for user sessions
 */
export interface Session {
  id: string;
  device_info: string | null;
  ip_address: string | null;
  last_active: string;
  created_at: string;
}

/**
 * Define the PrivacySettings interface for user privacy settings
 */
export interface PrivacySettings {
  user_id: string;
  show_email: boolean;
  show_full_name: boolean;
  allow_public_favorites: boolean;
}
