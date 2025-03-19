
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rwxjdyudnkkehdjdcbtc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3eGpkeXVkbmtrZWhkamRjYnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDk1MjksImV4cCI6MjA1Nzk4NTUyOX0.mwGzGBpq2Idv8mRUPH-kAYrFUPptcDf2nbNJ50oNpbQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Track a name visit for analytics
export const trackNameVisit = async (nameId: number) => {
  try {
    await supabase
      .from('name_visits')
      .insert({ name_id: nameId });
  } catch (error) {
    console.error('Error tracking name visit:', error);
  }
};
