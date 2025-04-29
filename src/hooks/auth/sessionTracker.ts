
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Function to log initial session activity
export const logInitialSession = async (user: User) => {
  try {
    // Record the session for activity tracking
    await supabase.from('user_sessions').upsert({
      user_id: user.id,
      last_active: new Date().toISOString(),
      ip_address: 'client-side',
      device_info: navigator.userAgent || 'Unknown device'
    }, {
      onConflict: 'user_id',
    });
  } catch (error) {
    console.error("Error logging session activity:", error);
  }
};

// Function to update session activity
export const updateSessionActivity = async (user: User | null) => {
  if (!user) return;
  
  try {
    await supabase.from('user_sessions').upsert({
      user_id: user.id,
      last_active: new Date().toISOString()
    }, {
      onConflict: 'user_id',
    });
  } catch (error) {
    console.error("Error updating session activity:", error);
  }
};

// Function to handle auth state changes
export const handleAuthStateChange = async (session: any) => {
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
};
