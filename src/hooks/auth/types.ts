
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    success: boolean;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    success: boolean;
  }>;
  resetPassword: (email: string) => Promise<{
    error: Error | null;
    success: boolean;
  }>;
}

// Rate limiting related types
export interface LoginAttempt {
  count: number;
  timestamp: number;
}

export const MAX_ATTEMPTS = 5;
export const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
