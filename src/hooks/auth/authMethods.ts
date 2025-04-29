
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, recordFailedAttempt, resetAttempts } from "./rateLimiter";
import { toast } from "@/components/ui/use-toast";

export const signIn = async (email: string, password: string) => {
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

export const signUp = async (email: string, password: string) => {
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

export const signOut = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
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

export const resetPassword = async (email: string) => {
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
