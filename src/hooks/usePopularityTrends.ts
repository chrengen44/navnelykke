
import { useState, useEffect } from 'react';
import { nameColors } from '@/components/name-trends/trendingNamesData';
import { fetchPopularityTrendData } from '@/services/ssbApiService';
import { toast } from 'sonner';
import { getFallbackData } from '@/utils/nameTrendFallbackData';

export interface NameTrendData {
  year: string;
  [key: string]: string | number;
}

export const usePopularityTrends = (gender: 'girl' | 'boy') => {
  const [data, setData] = useState<NameTrendData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const colors = gender === 'girl' ? nameColors.girl : nameColors.boy;
  const nameKeys = gender === 'girl' 
    ? ['Emma', 'Nora', 'Sophie', 'Ella', 'Maja'] 
    : ['William', 'Noah', 'Oliver', 'Elias', 'Aksel'];

  useEffect(() => {
    let isMounted = true;
    const MAX_RETRIES = 2;
    
    const fetchData = async () => {
      if (!isMounted) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchPopularityTrendData(gender, nameKeys);
        
        if (!isMounted) return;
        
        // Check if we got valid data
        if (!result || !Array.isArray(result) || result.length === 0) {
          throw new Error("No trend data received");
        }
        
        setData(result);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        if (!isMounted) return;
        
        console.error(`Error in usePopularityTrends for ${gender}:`, err);
        
        // Check if we should retry
        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying fetch for ${gender} (attempt ${retryCount + 1})`);
          setRetryCount(prev => prev + 1);
          return; // Will trigger another fetch due to retryCount change
        }
        
        setError(`Kunne ikke hente navnedata fra SSB. Server utilgjengelig.`);
        
        // Use fallback data when all retries fail
        const fallbackData = getFallbackData(gender, nameKeys);
        setData(fallbackData);
        
        try {
          toast.error(`Kunne ikke hente trenddata for ${gender === 'girl' ? 'jente' : 'gutte'}navn. Viser reservedata.`, {
            id: `trend-error-${gender}`, // Prevents duplicate toasts
          });
        } catch (toastError) {
          console.error("Toast error:", toastError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [gender, nameKeys, retryCount]);

  return {
    data,
    loading,
    error,
    colors,
    nameKeys,
    retry: () => setRetryCount(prev => prev + 1)
  };
};
