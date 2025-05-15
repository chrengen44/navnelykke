
import type { PostgrestError } from "@supabase/supabase-js";

// Simple API response type to avoid recursive references
export interface ApiResponse<T> {
  data: T | null;
  error: PostgrestError | Error | null;
}

/**
 * Define the Session interface for user sessions
 */
export interface Session {
  id: string;
  user_id?: string; 
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
