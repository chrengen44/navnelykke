
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Interface for name trend data
export interface NameTrendData {
  year: string;
  [name: string]: number | string;
}

// Hook to fetch name trend data from SSB API
export const useNameTrendData = (gender: 'girl' | 'boy', namesToFetch: string[]) => {
  const [chartData, setChartData] = useState<NameTrendData[]>([]);
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Generate yearly rank data from chart data
  const generateRankData = (data: NameTrendData[]) => {
    return data.map(yearData => {
      const yearRanks: any = { year: yearData.year };
      const names = Object.keys(yearData).filter(key => key !== 'year');
      const nameValues = names.map(name => ({
        name,
        value: Number(yearData[name])
      }));
      
      // Sort by popularity
      nameValues.sort((a, b) => b.value - a.value);
      
      // Take top 10
      const top10 = nameValues.slice(0, 10);
      
      // Add to yearRanks
      top10.forEach((item, index) => {
        yearRanks[`#${index + 1}`] = item.name;
        yearRanks[`${item.name}_value`] = item.value;
      });
      
      return yearRanks;
    });
  };

  useEffect(() => {
    const fetchNameData = async () => {
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
                  "values": namesToFetch
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
        
        setChartData(formattedData);
        setRankingData(generateRankData(formattedData));
      } catch (err) {
        console.error('Error fetching name trend data:', err);
        setError(`Kunne ikke hente navnedata fra SSB.`);
        
        // Use fallback data based on gender
        if (gender === 'girl') {
          setFallbackGirlData();
        } else {
          setFallbackBoyData();
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchNameData();
  }, [gender, namesToFetch]);

  const setFallbackGirlData = () => {
    // Fallback girl data if API fails
    const fallbackGirlData = [
      { year: '2013', Emma: 62, Nora: 58, Sofia: 52, Olivia: 49, Ella: 47 },
      { year: '2014', Emma: 60, Nora: 59, Sofia: 51, Olivia: 52, Ella: 46 },
      { year: '2015', Emma: 59, Nora: 63, Sofia: 48, Olivia: 53, Ella: 43 },
      { year: '2016', Emma: 58, Nora: 65, Sofia: 45, Olivia: 54, Ella: 41 },
      { year: '2017', Emma: 56, Nora: 64, Sofia: 42, Olivia: 56, Ella: 40 },
      { year: '2018', Emma: 58, Nora: 62, Sofia: 40, Olivia: 59, Ella: 38 },
      { year: '2019', Emma: 61, Nora: 59, Sofia: 38, Olivia: 61, Ella: 37 },
      { year: '2020', Emma: 63, Nora: 56, Sofia: 37, Olivia: 62, Ella: 36 },
      { year: '2021', Emma: 64, Nora: 54, Sofia: 36, Olivia: 64, Ella: 35 },
      { year: '2022', Emma: 65, Nora: 52, Sofia: 35, Olivia: 63, Ella: 34 },
      { year: '2023', Emma: 64, Nora: 51, Sofia: 33, Olivia: 62, Ella: 33 },
      { year: '2024', Emma: 63, Nora: 50, Sofia: 32, Olivia: 61, Ella: 32 }
    ];
    toast.error('Kunne ikke hente navnedata fra SSB. Viser reservedata.');
    setChartData(fallbackGirlData);
    setRankingData(generateRankData(fallbackGirlData));
  };

  const setFallbackBoyData = () => {
    // Fallback boy data if API fails
    const fallbackBoyData = [
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
    toast.error('Kunne ikke hente navnedata fra SSB. Viser reservedata.');
    setChartData(fallbackBoyData);
    setRankingData(generateRankData(fallbackBoyData));
  };

  return {
    chartData,
    rankingData,
    loading,
    error
  };
};

