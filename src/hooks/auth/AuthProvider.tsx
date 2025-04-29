
import { useState, useEffect, createContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { signIn, signOut, signUp, resetPassword } from "./authMethods";
import { handleAuthStateChange, updateSessionActivity } from "./sessionTracker";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  signIn: async () => ({ error: null, success: false }),
  signUp: async () => ({ error: null, success: false }),
  resetPassword: async () => ({ error: null, success: false }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
          handleAuthStateChange(data.session);
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
        handleAuthStateChange(session);
      }
    );

    // Update activity periodically while the app is open
    const activityInterval = setInterval(() => {
      updateSessionActivity(user);
    }, 5 * 60 * 1000); // Update every 5 minutes

    return () => {
      subscription.unsubscribe();
      clearInterval(activityInterval);
    };
  }, [user]);

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

export default AuthContext;
