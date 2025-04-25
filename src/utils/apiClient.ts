
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import DOMPurify from 'dompurify';
import { useState, useEffect } from "react";

// Rate limiting settings
const API_RATE_LIMITS: Record<string, { maxRequests: number; timeWindow: number }> = {
  default: { maxRequests: 30, timeWindow: 60000 }, // 30 requests per minute
  search: { maxRequests: 10, timeWindow: 30000 },   // 10 search requests per 30 seconds
  update: { maxRequests: 5, timeWindow: 10000 }     // 5 updates per 10 seconds
};

// Track API requests with a request counter
const requestCounts: Record<string, { count: number; timestamp: number }> = {};

/**
 * Check if a request would exceed rate limits
 */
export const checkRateLimit = (endpoint: string): boolean => {
  const now = Date.now();
  const limits = API_RATE_LIMITS[endpoint] || API_RATE_LIMITS.default;
  
  // Create a new counter if none exists
  if (!requestCounts[endpoint]) {
    requestCounts[endpoint] = { count: 0, timestamp: now };
    return true;
  }

  // Reset counter if time window has passed
  if (now - requestCounts[endpoint].timestamp > limits.timeWindow) {
    requestCounts[endpoint] = { count: 0, timestamp: now };
    return true;
  }

  // Check if limit is exceeded
  return requestCounts[endpoint].count < limits.maxRequests;
};

/**
 * Increment request counter for an endpoint
 */
export const incrementRequestCount = (endpoint: string): void => {
  const now = Date.now();
  
  if (!requestCounts[endpoint]) {
    requestCounts[endpoint] = { count: 1, timestamp: now };
  } else {
    requestCounts[endpoint].count += 1;
  }
};

/**
 * Sanitize API input to prevent injection
 */
export const sanitizeInput = (input: string | Record<string, any>): any => {
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input);
  } else if (typeof input === 'object' && input !== null) {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === 'string') {
        sanitized[key] = DOMPurify.sanitize(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
  return input;
};

/**
 * Custom hook for secure data fetching with rate limiting
 */
export function useSecureData<T>(
  fetcher: () => Promise<{ data: T | null; error: Error | null }>,
  endpoint = 'default',
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setIsLoading(true);
      
      // Check rate limiting
      if (!checkRateLimit(endpoint)) {
        setError(new Error("Too many requests. Please try again later."));
        toast({
          title: "Rate limit exceeded",
          description: "For mange forespørsler. Vennligst prøv igjen senere.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      try {
        incrementRequestCount(endpoint);
        const result = await fetcher();
        
        if (isMounted) {
          if (result.error) {
            setError(result.error);
            setData(null);
          } else {
            setData(result.data);
            setError(null);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, error, isLoading };
}

// Define a list of all valid table names as a literal union type
type TableName = 'baby_names' | 'favorites' | 'profiles' | 'name_categories' | 
  'name_category_mappings' | 'name_list_items' | 'name_lists' | 'name_polls' | 
  'name_visits' | 'poll_analytics' | 'poll_items' | 'poll_votes' | 
  'suggested_names' | 'user_privacy_settings' | 'user_sessions';

// This type helps us handle cases where a string might be used as a table name
type TableNameInput = TableName | string;

/**
 * Helper function to safely handle table name type casting
 * This avoids excessive type instantiations
 */
const toTableName = (tableName: TableNameInput): TableName => {
  // Type checking for table names at runtime
  const validTableNames: TableName[] = [
    'baby_names', 'favorites', 'profiles', 'name_categories',
    'name_category_mappings', 'name_list_items', 'name_lists', 'name_polls',
    'name_visits', 'poll_analytics', 'poll_items', 'poll_votes',
    'suggested_names', 'user_privacy_settings', 'user_sessions'
  ];

  if (!validTableNames.includes(tableName as TableName)) {
    console.warn(`Warning: ${tableName} is not a recognized table name`);
  }
  
  return tableName as TableName;
};

/**
 * Secure API client for handling data operations
 */
export const secureApi = {
  /**
   * Securely fetch data from Supabase
   */
  async fetch<T>(
    tableName: TableNameInput, 
    query: any = {},
    endpoint = 'default'
  ): Promise<{ data: T | null; error: Error | null }> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      // Fix: Handle special cases for auth-related actions
      if (typeof tableName === 'string' && tableName.startsWith('auth.')) {
        if (tableName === 'auth.resetPasswordForEmail') {
          const sanitizedEmail = typeof query.email === 'string' ? sanitizeInput(query.email) : '';
          const options = query.options || {};
          
          const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, options);
          
          return { data: null as T, error };
        }
        // Add other auth methods as needed
        return { data: null, error: new Error(`Unsupported auth method: ${tableName}`) };
      }

      // For regular table operations, proceed with the tableName cast
      const safeTableName = toTableName(tableName);
      
      const { data, error } = await supabase
        .from(safeTableName)
        .select(query.select || '*')
        .order(query.orderBy || 'created_at', { ascending: false });
      
      return { 
        data: data as T, 
        error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  /**
   * Securely insert data into Supabase
   */
  async insert<T>(
    tableName: TableNameInput,
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<{ data: T | null; error: Error | null }> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      // Sanitize the input data
      const sanitizedData = sanitizeInput(data);
      const safeTableName = toTableName(tableName);
      
      // Insert the data
      const result = await supabase
        .from(safeTableName)
        .insert([sanitizedData]);
      
      return { 
        data: result.data as T, 
        error: result.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  /**
   * Securely update data in Supabase
   */
  async update<T>(
    tableName: TableNameInput,
    query: { column: string; value: any },
    data: Record<string, any>,
    endpoint = 'update'
  ): Promise<{ data: T | null; error: Error | null }> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      // Sanitize the input data
      const sanitizedData = sanitizeInput(data);
      const sanitizedQuery = sanitizeInput(query);
      const safeTableName = toTableName(tableName);
      
      // Update the data
      const result = await supabase
        .from(safeTableName)
        .update(sanitizedData)
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      return { 
        data: result.data as T, 
        error: result.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },
  
  /**
   * Securely delete data from Supabase
   */
  async delete<T>(
    tableName: TableNameInput,
    query: { column: string; value: any },
    endpoint = 'update'
  ): Promise<{ data: T | null; error: Error | null }> {
    if (!checkRateLimit(endpoint)) {
      return { data: null, error: new Error("Rate limit exceeded") };
    }
    
    incrementRequestCount(endpoint);
    
    try {
      const sanitizedQuery = sanitizeInput(query);
      const safeTableName = toTableName(tableName);
      
      // Delete the data
      const result = await supabase
        .from(safeTableName)
        .delete()
        .eq(sanitizedQuery.column, sanitizedQuery.value);
      
      return { 
        data: result.data as T, 
        error: result.error 
      };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
};

export default secureApi;
