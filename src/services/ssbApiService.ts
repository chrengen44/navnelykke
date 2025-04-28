
import { toast } from 'sonner';
import { getFallbackData, type NameTrendData } from '@/utils/nameTrendFallbackData';

// Centralized cache for API responses
const SSB_CACHE = new Map<string, { data: NameTrendData[], timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour cache TTL
const REQUEST_TIMEOUT = 8000; // 8 second timeout

// Constants 
const SSB_API_URL = 'https://data.ssb.no/api/v0/no/table/10467';

/**
 * Generates a cache key based on gender and names
 */
const getCacheKey = (gender: 'girl' | 'boy', names: string[]): string => {
  return `${gender}:${names.sort().join(',')}`;
};

/**
 * Prepares SSB API request payload for name data
 */
const prepareRequestPayload = (gender: 'girl' | 'boy', namesToFetch: string[]) => {
  return {
    "query": [
      {
        "code": "Fornavn",
        "selection": {
          "filter": gender === 'boy' ? "vs:NavnGutter02" : "vs:NavnJenter02",
          "values": namesToFetch.map(name => 
            (gender === 'boy' ? '2' : '1') + name.toUpperCase()
          )
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
  };
};

/**
 * Fetches name trend data from SSB API with improved error handling and caching
 */
export async function fetchNameTrendData(
  gender: 'girl' | 'boy', 
  namesToFetch: string[]
): Promise<NameTrendData[]> {
  console.log(`Fetching ${gender} name trend data for:`, namesToFetch);
  
  // Check cache first
  const cacheKey = getCacheKey(gender, namesToFetch);
  const cachedData = SSB_CACHE.get(cacheKey);
  const now = Date.now();
  
  if (cachedData && (now - cachedData.timestamp < CACHE_TTL)) {
    console.log('Returning cached data for', cacheKey);
    return cachedData.data;
  }
  
  // Set up the request with timeout and abort controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  
  try {
    // Prepare the request payload
    const payload = prepareRequestPayload(gender, namesToFetch);
    
    // Make the request with retry logic
    let retries = 3;
    let response = null;
    let error = null;
    
    while (retries > 0 && !response) {
      try {
        response = await fetch(SSB_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`SSB API error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        error = err;
        retries--;
        
        if (retries > 0) {
          console.warn(`Retrying SSB API request, ${retries} attempts left`);
          // Add exponential backoff
          await new Promise(resolve => setTimeout(resolve, (4 - retries) * 1000));
        }
      }
    }
    
    clearTimeout(timeoutId);
    
    // If we didn't get a successful response after all retries
    if (!response || !response.ok) {
      console.error('SSB API request failed after retries:', error);
      throw error || new Error('Failed to fetch data from SSB API');
    }
    
    const result = await response.json();
    
    // Process results
    const years = result.dimension.Tid.category.label;
    const names = result.dimension.Fornavn.category.label;
    const values = result.value;
    
    // Format data
    const formattedData: NameTrendData[] = Object.keys(years).map(yearKey => {
      const yearData: NameTrendData = { year: years[yearKey] };
      
      Object.entries(names).forEach(([nameKey, apiName], nameIndex) => {
        // Find original name by comparing with the API name format
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
    
    // Store in cache
    SSB_CACHE.set(cacheKey, { 
      data: formattedData, 
      timestamp: now 
    });
    
    return formattedData;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Error fetching SSB data:', error);
    
    // Use fallback data with clear indication it's fallback
    const fallbackData = getFallbackData(gender, namesToFetch);
    
    toast.error(`Kunne ikke hente ${gender === 'girl' ? 'jente' : 'gutte'}navnedata fra SSB. Viser reservedata.`, {
      duration: 5000,
    });
    
    // Store fallback in cache with shorter TTL (5 minutes) to try again sooner
    SSB_CACHE.set(cacheKey, { 
      data: fallbackData, 
      timestamp: now - (CACHE_TTL - 300000) // 5 minutes before expiring
    });
    
    return fallbackData;
  }
}

/**
 * Central function to fetch data for named popularity trends
 */
export async function fetchPopularityTrendData(
  gender: 'girl' | 'boy',
  nameKeys: string[]
): Promise<NameTrendData[]> {
  return fetchNameTrendData(gender, nameKeys);
}
