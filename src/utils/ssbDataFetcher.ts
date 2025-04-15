import { BabyName } from '@/data/types';
import { batchInsertNames } from '@/integrations/supabase/client';

interface SSBResponse {
  dimension: {
    Tid: {
      category: {
        index: Record<string, number>;
        label: Record<string, string>;
      };
    };
    Navn: {
      category: {
        index: Record<string, number>;
        label: Record<string, string>;
      };
    };
  };
  value: number[];
}

// Map to store the frequency of names across years for categorization
const nameFrequencyMap: Record<string, { count: number; years: Set<string> }> = {};

export const fetchSSBData = async (gender: 'boy' | 'girl'): Promise<SSBResponse> => {
  // The URL for SSB's API for baby names
  const url = 'https://data.ssb.no/api/v0/en/table/10501';
  
  // Build the query for girl names (code 2)
  // This is the correct format for the SSB API based on their documentation
  const query = {
    query: [
      {
        code: 'Kjonn',
        selection: {
          filter: 'item',
          values: [gender === 'boy' ? '1' : '2'] // 1 for boys, 2 for girls
        }
      },
      {
        code: 'ContentsCode',
        selection: {
          filter: 'item',
          values: ['Antall']
        }
      },
      {
        code: 'Tid',
        selection: {
          filter: 'item',
          values: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
        }
      }
    ],
    response: {
      format: 'json-stat2'
    }
  };

  try {
    console.log('Sending request to SSB API:', JSON.stringify(query));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch data from SSB: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Failed to fetch data from SSB: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received SSB data:', JSON.stringify(data).substring(0, 300) + '...');
    return data;
  } catch (error) {
    console.error('Error fetching SSB data:', error);
    throw error;
  }
};

// Process SSB data to match our schema
export const processSSBData = (
  data: SSBResponse,
  gender: 'boy' | 'girl'
): {
  namesByYear: Record<string, { name: string; count: number }[]>;
  enrichedNames: BabyName[];
} => {
  const namesByYear: Record<string, { name: string; count: number }[]> = {};
  const allNames: Record<string, { counts: Record<string, number>; totalCount: number }> = {};

  try {
    // Extract years and name labels from the response
    // Make sure we're correctly parsing the JSON-stat2 format
    if (!data.dimension || !data.dimension.Tid || !data.dimension.Navn) {
      throw new Error('Unexpected SSB data format: Missing dimensions');
    }
    
    const years = Object.keys(data.dimension.Tid.category.label);
    const nameLabels = Object.entries(data.dimension.Navn.category.label);
    console.log(`Processing ${nameLabels.length} names across ${years.length} years`);

    // Process the data for each year
    years.forEach(yearKey => {
      const year = data.dimension.Tid.category.label[yearKey];
      namesByYear[year] = [];

      nameLabels.forEach(([nameKey, name]) => {
        // Calculate the index for this year and name combination
        const tidIndex = data.dimension.Tid.category.index[yearKey];
        const navnIndex = data.dimension.Navn.category.index[nameKey];
        
        // JSON-stat2 format uses a specific calculation for finding values in the array
        // Usually it's something like: position = Σ(dimensions_before × dimension_size) + current_dimension_index
        const valueIndex = (tidIndex * Object.keys(data.dimension.Navn.category.label).length) + navnIndex;
        const count = data.value[valueIndex] || 0;
        
        if (count > 0) {
          // Add to the yearly data
          namesByYear[year].push({ name, count });

          // Track name across all years
          if (!allNames[name]) {
            allNames[name] = { counts: {}, totalCount: 0 };
          }
          allNames[name].counts[year] = count;
          allNames[name].totalCount += count;
          
          // Update frequency map for categorization
          if (!nameFrequencyMap[name]) {
            nameFrequencyMap[name] = { count: 0, years: new Set() };
          }
          nameFrequencyMap[name].count++;
          nameFrequencyMap[name].years.add(year);
        }
      });

      // Sort by count for each year
      namesByYear[year].sort((a, b) => b.count - a.count);
    });
  } catch (error) {
    console.error('Error processing SSB data:', error);
    // Return empty data rather than crashing
    return { namesByYear: {}, enrichedNames: [] };
  }

  // Generate enriched names for our database
  const enrichedNames: BabyName[] = Object.entries(allNames).map(([name, data], index) => {
    // Calculate normalized popularity (1-100 scale)
    // Find the max count across all names
    const maxCount = Math.max(...Object.values(allNames).map(d => d.totalCount));
    const popularityScore = Math.round((data.totalCount / maxCount) * 100);
    
    // Determine categories
    const categories = determineCategoriesForName(name, gender);
    
    // Determine length category
    const length = determineNameLength(name);

    return {
      id: index + 1, // Temporary ID, will be replaced by the database
      name,
      gender,
      origin: determineNameOrigin(name, gender),
      meaning: generateNameMeaning(name, gender),
      popularity: Math.max(1, Math.min(100, popularityScore)), // Ensure between 1-100
      length,
      categories,
      firstLetter: name.charAt(0).toUpperCase()
    };
  });

  return { namesByYear, enrichedNames };
};

// Helper function to determine name length category
const determineNameLength = (name: string): 'short' | 'medium' | 'long' => {
  const nameLength = name.length;
  if (nameLength <= 4) return 'short';
  if (nameLength <= 7) return 'medium';
  return 'long';
};

// Helper function to determine name categories based on patterns
const determineCategoriesForName = (name: string, gender: 'boy' | 'girl'): string[] => {
  const categories: string[] = [];
  
  // Check if name appears across many years - mark as classic
  const nameData = nameFrequencyMap[name];
  if (nameData && nameData.years.size >= 8) {
    categories.push('klassisk');
  } else if (nameData && nameData.years.size <= 3) {
    categories.push('moderne');
  }
  
  // Check for Nordic patterns
  if (
    name.includes('ø') || 
    name.includes('å') || 
    name.includes('æ') ||
    name.endsWith('ild') ||
    name.endsWith('unn') ||
    name.endsWith('bjørn') ||
    name.endsWith('ar')
  ) {
    categories.push('nordisk');
  }
  
  // Check for Viking name patterns
  if (
    gender === 'boy' && (
      name.endsWith('ulf') || 
      name.endsWith('ald') || 
      name.endsWith('ar') || 
      name.endsWith('orn') ||
      ['Thor', 'Odin', 'Leif', 'Erik', 'Bjørn', 'Ivar', 'Gunnar'].includes(name)
    )
  ) {
    categories.push('vikingnavn');
  }
  
  if (
    gender === 'girl' && (
      name.endsWith('hild') ||
      name.endsWith('dís') ||
      name.endsWith('a') ||
      ['Frida', 'Astrid', 'Ingrid', 'Sigrid', 'Freya', 'Saga', 'Sol', 'Idun'].includes(name)
    )
  ) {
    categories.push('vikingnavn');
  }
  
  // Check for biblical names
  const biblicalNames = [
    'Johannes', 'Daniel', 'David', 'Noah', 'Adam', 'Josef', 'Gabriel', 'Samuel', 
    'Jakob', 'Elias', 'Maria', 'Sara', 'Eva', 'Rebekka', 'Hanna', 'Ester', 'Miriam'
  ];
  
  if (biblicalNames.includes(name)) {
    categories.push('bibelsk');
  }
  
  // International names (simplified logic)
  const internationalEndings = gender === 'boy' 
    ? ['o', 'an', 'in', 'ian', 'as'] 
    : ['ia', 'na', 'elle', 'ina', 'a'];
  
  const nameEnding = name.toLowerCase().slice(-2);
  if (internationalEndings.some(ending => name.toLowerCase().endsWith(ending))) {
    categories.push('internasjonal');
  }
  
  // Nature-inspired names
  const natureNames = [
    'Bjørk', 'Sol', 'Storm', 'Sky', 'Bris', 'Fjell', 'Fjord', 'Luna', 
    'Stella', 'Lily', 'Rose', 'Willow', 'Aurora', 'Flora'
  ];
  
  if (natureNames.includes(name)) {
    categories.push('naturnavn');
  }
  
  // If no categories were determined, add at least one
  if (categories.length === 0) {
    if (gender === 'boy') {
      categories.push('internasjonal');
    } else {
      categories.push('internasjonal');
    }
  }
  
  return categories;
};

// Generate a placeholder meaning based on name patterns
const generateNameMeaning = (name: string, gender: 'boy' | 'girl'): string => {
  const commonMeanings: Record<string, string> = {
    'Ole': 'Ancestor\'s descendant',
    'Ida': 'Hardworking or prosperous',
    'Emma': 'Universal or whole',
    'Nora': 'Honor or light',
    'Sara': 'Princess',
    'Sofia': 'Wisdom',
    'Jakob': 'Supplanter',
    'Noah': 'Rest or comfort',
    'William': 'Resolute protector',
    'Henrik': 'Ruler of the home',
    'Ola': 'Ancestor\'s descendant',
    'Kari': 'Pure',
  };
  
  if (name in commonMeanings) {
    return commonMeanings[name];
  }
  
  // Generic meanings based on patterns
  if (gender === 'boy') {
    if (name.endsWith('ar')) return 'Warrior or fighter';
    if (name.endsWith('ian')) return 'Grace of God';
    if (name.endsWith('ik')) return 'Ruler or king';
    if (name.endsWith('en')) return 'Strong or brave';
    return 'Strong and brave';
  } else {
    if (name.endsWith('a')) return 'Beautiful or graceful';
    if (name.endsWith('ie')) return 'Beloved or dear';
    if (name.endsWith('ine')) return 'Pure or graceful';
    if (name.endsWith('ia')) return 'God is gracious';
    return 'Beautiful and kind';
  }
};

// Determine name origin (simplified logic)
const determineNameOrigin = (name: string, gender: 'boy' | 'girl'): string => {
  const commonOrigins: Record<string, string> = {
    'Ole': 'Nordic',
    'Ida': 'Germanic',
    'Emma': 'Germanic',
    'Nora': 'Latin',
    'Sara': 'Hebrew',
    'Sofia': 'Greek',
    'Jakob': 'Hebrew',
    'Noah': 'Hebrew',
    'William': 'Germanic',
    'Henrik': 'Germanic',
    'Ola': 'Nordic',
    'Kari': 'Nordic',
  };
  
  if (name in commonOrigins) {
    return commonOrigins[name];
  }
  
  // Generic origins based on patterns
  if (
    name.includes('ø') || 
    name.includes('å') || 
    name.includes('æ') ||
    name.endsWith('ild') ||
    name.endsWith('unn') ||
    name.endsWith('bjørn') ||
    name.endsWith('ar')
  ) {
    return 'Nordic';
  }
  
  if (name.endsWith('o') || name.endsWith('io')) return 'Italian';
  if (name.endsWith('us')) return 'Latin';
  if (name.endsWith('ina')) return 'Russian';
  if (name.endsWith('elle')) return 'French';
  
  // Default fallback
  return 'European';
};

export const importSSBDataToDB = async (): Promise<{
  success: boolean;
  boysImported: number;
  girlsImported: number;
  errors: any[];
}> => {
  try {
    console.log('Starting import of SSB data...');
    
    // For now, focus only on importing girl names (as requested)
    console.log('Fetching girls data from SSB...');
    const girlsData = await fetchSSBData('girl');
    console.log('Processing girls data...');
    const { enrichedNames: girlsNames } = processSSBData(girlsData, 'girl');
    
    // Import to database
    console.log(`Importing ${girlsNames.length} girl names to the database...`);
    const girlsResult = await batchInsertNames(
      girlsNames.map(name => ({
        name: name.name,
        gender: name.gender,
        origin: name.origin,
        meaning: name.meaning,
        popularity: name.popularity,
        length: name.length,
        categories: name.categories,
        firstLetter: name.firstLetter
      }))
    );
    
    return {
      success: girlsResult.success,
      boysImported: 0, // No boys imported in this version
      girlsImported: girlsResult.inserted,
      errors: [...girlsResult.errors]
    };
  } catch (error) {
    console.error('Error importing SSB data:', error);
    return {
      success: false,
      boysImported: 0,
      girlsImported: 0,
      errors: [error]
    };
  }
};

// Extractor function to get top names by year for visualization
export const getTopNamesByYear = async (
  gender: 'boy' | 'girl', 
  limit: number = 10
): Promise<Record<string, { name: string; count: number }[]>> => {
  try {
    const data = await fetchSSBData(gender);
    const { namesByYear } = processSSBData(data, gender);
    
    // Limit the names per year to the requested amount
    const limitedNames: Record<string, { name: string; count: number }[]> = {};
    
    Object.entries(namesByYear).forEach(([year, names]) => {
      limitedNames[year] = names.slice(0, limit);
    });
    
    return limitedNames;
  } catch (error) {
    console.error(`Error getting top ${gender} names:`, error);
    return {};
  }
};
