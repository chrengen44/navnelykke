
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
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

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({ error: null, success: false }),
  signUp: async () => ({ error: null, success: false }),
  resetPassword: async () => ({ error: null, success: false }),
});

// Track login attempts to implement basic rate limiting
const loginAttempts: Record<string, { count: number; timestamp: number }> = {};
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Function to check if login attempts are within limits
  const checkRateLimit = (email: string): boolean => {
    const normalizedEmail = email.toLowerCase();
    const now = Date.now();
    
    // Clean up expired entries
    Object.keys(loginAttempts).forEach(key => {
      if (now - loginAttempts[key].timestamp > LOCKOUT_TIME) {
        delete loginAttempts[key];
      }
    });
    
    if (loginAttempts[normalizedEmail]) {
      // Check if account is locked out
      if (
        loginAttempts[normalizedEmail].count >= MAX_ATTEMPTS &&
        now - loginAttempts[normalizedEmail].timestamp < LOCKOUT_TIME
      ) {
        return false;
      }
    } else {
      loginAttempts[normalizedEmail] = { count: 0, timestamp: now };
    }
    
    return true;
  };

  // Function to record a failed login attempt
  const recordFailedAttempt = (email: string): void => {
    const normalizedEmail = email.toLowerCase();
    const now = Date.now();
    
    if (!loginAttempts[normalizedEmail]) {
      loginAttempts[normalizedEmail] = { count: 1, timestamp: now };
    } else {
      loginAttempts[normalizedEmail].count += 1;
      loginAttempts[normalizedEmail].timestamp = now;
    }
  };

  // Function to reset login attempts counter on successful login
  const resetAttempts = (email: string): void => {
    const normalizedEmail = email.toLowerCase();
    if (loginAttempts[normalizedEmail]) {
      delete loginAttempts[normalizedEmail];
    }
  };

  useEffect(() => {
    // Get initial session with improved error handling
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting initial session:", error);
          return;
        }
        
        setSession(data.session);
        setUser(data.session?.user ?? null);

        // If session exists, log session activity
        if (data.session?.user) {
          try {
            // Record the session for activity tracking
            await supabase.from('user_sessions').upsert({
              user_id: data.session.user.id,
              last_active: new Date().toISOString(),
              ip_address: 'client-side',
              device_info: navigator.userAgent || 'Unknown device'
            }, {
              onConflict: 'user_id',
            });
          } catch (sessionError) {
            console.error("Error logging session activity:", sessionError);
          }
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes with improved subscription handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Update session activity when auth state changes
        if (session?.user) {
          try {
            await supabase.from('user_sessions').upsert({
              user_id: session.user.id,
              last_active: new Date().toISOString(),
              ip_address: 'client-side',
              device_info: navigator.userAgent || 'Unknown device'
            }, {
              onConflict: 'user_id',
            });
          } catch (error) {
            console.error("Error updating session activity:", error);
          }
        }
      }
    );

    // Update activity periodically while the app is open
    const activityInterval = setInterval(() => {
      if (user) {
        // Fixed: Removed .catch() and used proper error handling
        supabase.from('user_sessions').upsert({
          user_id: user.id,
          last_active: new Date().toISOString()
        }, {
          onConflict: 'user_id',
        }).then(result => {
          if (result.error) {
            console.error("Error updating session activity:", result.error);
          }
        });
      }
    }, 5 * 60 * 1000); // Update every 5 minutes

    return () => {
      subscription.unsubscribe();
      clearInterval(activityInterval);
    };
  }, [user]);

  const signIn = async (email: string, password: string) => {
    // Check rate limiting
    if (!checkRateLimit(email)) {
      toast({
        title: "Konto midlertidig låst",
        description: "For mange mislykkede innloggingsforsøk. Prøv igjen senere.",
        variant: "destructive",
      });
      return { error: new Error("Too many login attempts"), success: false };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        recordFailedAttempt(email);
        return { error, success: false };
      }
      
      resetAttempts(email);
      
      // Log the successful sign-in with device info
      await supabase.from('user_sessions').insert({
        user_id: data.user?.id,
        device_info: navigator.userAgent || 'Unknown device',
        ip_address: 'client-side', // We can't get real IP on client-side
        last_active: new Date().toISOString()
      });
      
      return { error: null, success: true };
    } catch (error: any) {
      recordFailedAttempt(email);
      return { error, success: false };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        return { error, success: false };
      }
      
      return { error: null, success: true };
    } catch (error: any) {
      return { error, success: false };
    }
  };

  const signOut = async () => {
    try {
      // Delete current session record before signing out
      if (user) {
        await supabase
          .from('user_sessions')
          .delete()
          .eq('user_id', user.id)
          .eq('device_info', navigator.userAgent || 'Unknown device');
      }
      
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset`,
      });
      
      if (error) {
        return { error, success: false };
      }
      
      return { error: null, success: true };
    } catch (error: any) {
      return { error, success: false };
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
