
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { checkRateLimit, incrementRequestCount } from './rateLimiter';

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
