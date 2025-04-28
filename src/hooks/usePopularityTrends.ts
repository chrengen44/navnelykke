
import { useState, useEffect } from 'react';
import { nameColors } from '@/components/name-trends/trendingNamesData';
import { fetchPopularityTrendData } from '@/services/ssbApiService';

export interface NameTrendData {
  year: string;
  [key: string]: string | number;
}

export const usePopularityTrends = (gender: 'girl' | 'boy') => {
  const [data, setData] = useState<NameTrendData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const colors = gender === 'girl' ? nameColors.girl : nameColors.boy;
  const nameKeys = gender === 'girl' 
    ? ['Emma', 'Nora', 'Sophie', 'Ella', 'Maja'] 
    : ['William', 'Noah', 'Oliver', 'Elias', 'Aksel'];

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (!isMounted) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchPopularityTrendData(gender, nameKeys);
        
        if (!isMounted) return;
        
        setData(result);
      } catch (err) {
        if (!isMounted) return;
        
        console.error(`Error in usePopularityTrends for ${gender}:`, err);
        setError(`Kunne ikke hente navnedata fra SSB. Server utilgjengelig.`);
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
  }, [gender, nameKeys.join(',')]);

  return {
    data,
    loading,
    error,
    colors,
    nameKeys
  };
};
