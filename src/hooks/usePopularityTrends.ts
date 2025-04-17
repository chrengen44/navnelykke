
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { nameColors } from '@/components/name-trends/trendingNamesData';

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
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://data.ssb.no/api/v0/no/table/10467', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "query": [
              {
                "code": "Navn",
                "selection": {
                  "filter": "item",
                  "values": nameKeys
                }
              },
              {
                "code": "ContentsCode",
                "selection": {
                  "filter": "item",
                  "values": ["Antall"]
                }
              }
            ],
            "response": {
              "format": "json-stat2"
            }
          })
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        
        const years = result.dimension.År.category.label;
        const names = result.dimension.Navn.category.label;
        const values = result.value;
        
        const formattedData: NameTrendData[] = Object.keys(years).map(yearKey => {
          const yearData: NameTrendData = { year: years[yearKey] };
          
          Object.keys(names).forEach((nameKey, nameIndex) => {
            const name = names[nameKey];
            const yearIndex = Object.keys(years).indexOf(yearKey);
            const valueIndex = yearIndex * Object.keys(names).length + nameIndex;
            yearData[name] = values[valueIndex] || 0;
          });
          
          return yearData;
        });
        
        setData(formattedData);
      } catch (err) {
        console.error(`Error fetching ${gender} name trend data:`, err);
        setError(`Kunne ikke hente ${gender === 'girl' ? 'jente' : 'gutte'}navnedata fra SSB.`);
        // Use fallback data if API call fails
        setData(getFallbackData(gender));
        toast.error(`Kunne ikke hente ${gender === 'girl' ? 'jente' : 'gutte'}navnedata fra SSB.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [gender, nameKeys]);

  return {
    data,
    loading,
    error,
    colors,
    nameKeys
  };
};

function getFallbackData(gender: 'girl' | 'boy'): NameTrendData[] {
  const baseData = gender === 'girl' 
    ? [
        { year: '2013', Emma: 62, Nora: 58, Sophie: 52, Ella: 49, Maja: 47 },
        { year: '2014', Emma: 60, Nora: 59, Sophie: 51, Ella: 52, Maja: 46 },
        { year: '2015', Emma: 59, Nora: 63, Sophie: 48, Ella: 53, Maja: 43 },
        { year: '2016', Emma: 58, Nora: 65, Sophie: 45, Ella: 54, Maja: 41 },
        { year: '2017', Emma: 56, Nora: 64, Sophie: 42, Ella: 56, Maja: 40 },
        { year: '2018', Emma: 58, Nora: 62, Sophie: 40, Ella: 59, Maja: 38 },
        { year: '2019', Emma: 61, Nora: 59, Sophie: 38, Ella: 61, Maja: 37 },
        { year: '2020', Emma: 63, Nora: 56, Sophie: 37, Ella: 62, Maja: 36 },
        { year: '2021', Emma: 64, Nora: 54, Sophie: 36, Ella: 64, Maja: 35 },
        { year: '2022', Emma: 65, Nora: 52, Sophie: 35, Ella: 63, Maja: 34 },
        { year: '2023', Emma: 64, Nora: 51, Sophie: 33, Ella: 62, Maja: 33 },
        { year: '2024', Emma: 63, Nora: 50, Sophie: 32, Ella: 61, Maja: 32 }
      ]
    : [
        { year: '2013', William: 58, Noah: 52, Oliver: 49, Elias: 46, Aksel: 45 },
        { year: '2014', William: 60, Noah: 54, Oliver: 51, Elias: 48, Aksel: 46 },
        { year: '2015', William: 59, Noah: 56, Oliver: 53, Elias: 50, Aksel: 44 },
        { year: '2016', William: 56, Noah: 58, Oliver: 55, Elias: 52, Aksel: 43 },
        { year: '2017', William: 54, Noah: 60, Oliver: 57, Elias: 53, Aksel: 42 },
        { year: '2018', William: 52, Noah: 62, Oliver: 59, Elias: 54, Aksel: 41 },
        { year: '2019', William: 50, Noah: 64, Oliver: 61, Elias: 55, Aksel: 40 },
        { year: '2020', William: 48, Noah: 65, Oliver: 63, Elias: 56, Aksel: 39 },
        { year: '2021', William: 46, Noah: 64, Oliver: 65, Elias: 57, Aksel: 38 },
        { year: '2022', William: 45, Noah: 63, Oliver: 66, Elias: 58, Aksel: 37 },
        { year: '2023', William: 44, Noah: 62, Oliver: 67, Elias: 59, Aksel: 36 },
        { year: '2024', William: 43, Noah: 61, Oliver: 68, Elias: 60, Aksel: 35 }
      ];
  
  return baseData;
}

