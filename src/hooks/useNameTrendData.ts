
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { fetchNameTrendData } from '@/services/ssbApiService';
import { getFallbackData, type NameTrendData } from '@/utils/nameTrendFallbackData';
import { log } from '@/utils/logger';

interface RankingData {
  year: string;
  [key: string]: string | number;
}

export const useNameTrendData = (gender: 'girl' | 'boy', namesToFetch: string[]) => {
  const [chartData, setChartData] = useState<NameTrendData[]>([]);
  const [rankingData, setRankingData] = useState<RankingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize names array to prevent unnecessary re-fetching
  const memoizedNames = useMemo(() => namesToFetch, [JSON.stringify(namesToFetch)]);

  const generateRankData = (data: NameTrendData[]): RankingData[] => {
    return data.map(yearData => {
      const yearRanks: RankingData = { year: yearData.year };
      const nameValues = memoizedNames.map(name => ({
        name,
        value: Number(yearData[name]) || 0
      }));
      
      nameValues.sort((a, b) => b.value - a.value);
      const top10 = nameValues.slice(0, 10);
      
      top10.forEach((item, index) => {
        yearRanks[`#${index + 1}`] = item.name;
        yearRanks[`${item.name}_value`] = item.value;
      });
      
      return yearRanks;
    });
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (!isMounted) return;
      
      setLoading(true);
      setError(null);
      
      try {
        log(`Fetching name trend data for ${gender}:`, memoizedNames);
        const data = await fetchNameTrendData(gender, memoizedNames);
        
        if (!isMounted) return;
        
        setChartData(data);
        setRankingData(generateRankData(data));
      } catch (err) {
        if (!isMounted) return;
        
        console.error(`Error fetching ${gender} name trend data:`, err);
        setError(`Kunne ikke hente navnedata fra SSB. Server utilgjengelig.`);
        
        // Use fallback data in case of error
        const fallbackData = getFallbackData(gender, memoizedNames);
        setChartData(fallbackData);
        setRankingData(generateRankData(fallbackData));
        
        toast.error(`Kunne ikke hente ${gender === 'girl' ? 'jente' : 'gutte'}navnedata fra SSB. Viser reservedata.`, {
          duration: 5000,
        });
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
  }, [gender, memoizedNames]);

  return {
    chartData,
    rankingData,
    loading,
    error
  };
};
