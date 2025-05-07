
import type { PostgrestError } from "@supabase/supabase-js";

// Simple API response type to avoid recursive references
export interface ApiResponse<T> {
  data: T | null;
  error: PostgrestError | Error | null;
}
