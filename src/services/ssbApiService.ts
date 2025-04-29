
import { toast } from 'sonner';
import { getFallbackData } from '@/utils/nameTrendFallbackData';

interface SSBResponse {
  value: number[];
  dimension: {
    Tid: {
      category: {
        label: { [key: string]: string };
      };
    };
    Fornavn: {
      category: {
        label: { [key: string]: string };
      };
    };
  };
}

export interface NameTrendData {
  year: string;
  [name: string]: number | string;
}

const CACHE_TTL = 3600000; // 1 hour cache TTL
const API_TIMEOUT = 12000; // 12 seconds timeout - extended for slow connections
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds between retries

// Simple cache implementation
const trendDataCache = new Map<string, { data: NameTrendData[]; timestamp: number }>();

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchNameTrendData = async (gender: 'girl' | 'boy', namesToFetch: string[]): Promise<NameTrendData[]> => {
  const cacheKey = `${gender}-${namesToFetch.join(',')}`;
  const now = Date.now();
  const cachedData = trendDataCache.get(cacheKey);
  
  if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
    console.log('Returning cached SSB data for', gender, namesToFetch);
    return cachedData.data;
  }
  
  // Retry logic
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`Retry attempt ${attempt} for ${gender} data`);
        await delay(RETRY_DELAY);
      }
      
      const data = await fetchSSBNameData(gender, namesToFetch);
      trendDataCache.set(cacheKey, { data, timestamp: now });
      return data;
    } catch (error) {
      console.error(`Error fetching ${gender} name trend data (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, error);
      
      if (attempt === MAX_RETRIES) {
        // All retries failed, use fallback data
        const fallbackData = getFallbackData(gender, namesToFetch);
        
        toast.error(`Kunne ikke hente ${gender === 'girl' ? 'jente' : 'gutte'}navnedata fra SSB. Viser reservedata.`, {
          duration: 5000,
          id: `ssb-error-${gender}`, // Prevents duplicate toasts
        });
        
        return fallbackData;
      }
    }
  }
  
  // This should never be reached due to the retry logic above,
  // but TypeScript needs a return statement
  return getFallbackData(gender, namesToFetch);
};

export const fetchSSBNameData = async (gender: 'girl' | 'boy', namesToFetch: string[]): Promise<NameTrendData[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    console.log('Fetching name data from SSB API for:', namesToFetch);
    
    // Use CORS proxy or direct API call
    const response = await fetch('https://data.ssb.no/api/v0/no/table/10467', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "query": [
          {
            "code": "Fornavn",
            "selection": {
              "filter": gender === 'boy' ? "vs:NavnGutter02" : "vs:NavnJenter02",
              "values": namesToFetch.map(name => (gender === 'boy' ? '2' : '1') + name.toUpperCase())
            }
          },
          {
            "code": "ContentsCode",
            "selection": {
              "filter": "item",
              "values": ["Personer"]
            }
          },
          {
            "code": "Tid",
            "selection": {
              "filter": "item",
              "values": ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`SSB API error: ${response.status}`);
    }
    
    const result: SSBResponse = await response.json();
    
    // Validate response format
    if (!result.dimension?.Tid?.category?.label || !result.dimension?.Fornavn?.category?.label || !result.value) {
      throw new Error('Invalid response format from SSB API');
    }
    
    const years = result.dimension.Tid.category.label;
    const names = result.dimension.Fornavn.category.label;
    const values = result.value;
    
    const formattedData: NameTrendData[] = Object.keys(years).map(yearKey => {
      const yearData: NameTrendData = { year: years[yearKey] };
      
      Object.keys(names).forEach((nameKey, nameIndex) => {
        const apiName = names[nameKey];
        const originalName = namesToFetch.find(name => 
          (gender === 'boy' ? '2' : '1') + name.toUpperCase() === apiName
        );
        if (originalName) {
          const yearIndex = Object.keys(years).indexOf(yearKey);
          const valueIndex = yearIndex * Object.keys(names).length + nameIndex;
          yearData[originalName] = values[valueIndex] || 0;
        }
      });
      
      return yearData;
    });
    
    return formattedData;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// For backward compatibility
export const fetchPopularityTrendData = fetchNameTrendData;
