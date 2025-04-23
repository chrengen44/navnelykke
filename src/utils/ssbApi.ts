
import { toast } from 'sonner';

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

interface NameTrendData {
  year: string;
  [name: string]: number | string;
}

export const fetchSSBNameData = async (gender: 'girl' | 'boy', namesToFetch: string[]) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    console.log('Fetching name data from SSB API for:', namesToFetch);
    
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
