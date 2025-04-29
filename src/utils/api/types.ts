
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
