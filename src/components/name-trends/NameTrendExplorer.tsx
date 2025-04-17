
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Interface for name trend data
interface NameTrendData {
  year: string;
  [name: string]: number | string;
}

// List of years for our dataset
const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

// Top popular names to fetch from the API
const girlNames = [
  'Emma', 'Nora', 'Olivia', 'Sofia', 'Ella', 'Maja', 'Emilie', 'Sofie',
  'Leah', 'Ingrid', 'Sara', 'Ida', 'Anna', 'Eva', 'Mia', 'Thea', 'Amalie', 'Frida',
  'Julie', 'Linnea', 'Sigrid', 'Mathilde', 'Aurora', 'Astrid', 'Maria', 'Tuva', 'Tiril'
].sort();

const boyNames = [
  'William', 'Noah', 'Oliver', 'Elias', 'Aksel', 'Emil', 'Theodor', 'Jacob',
  'Magnus', 'Filip', 'Henrik', 'Lucas', 'Isak', 'Mathias', 'Olav', 'Oskar',
  'Tobias', 'Johannes', 'Sander', 'Sebastian', 'Odin', 'Adrian', 'Liam', 'Jonas'
].sort();

// Colors for the chart lines
const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#8AC926", "#1982C4", "#6A4C93", "#F15BB5"
];

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

const NameTrendExplorer = () => {
  const [girlChartData, setGirlChartData] = useState<NameTrendData[]>([]);
  const [boyChartData, setBoyChartData] = useState<NameTrendData[]>([]);
  const [girlRankingData, setGirlRankingData] = useState<any[]>([]);
  const [boyRankingData, setBoyRankingData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("popularity");
  const [gender, setGender] = useState<string>("girl");
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch data from SSB API
  const fetchNameData = async (gender: 'girl' | 'boy'): Promise<NameTrendData[]> => {
    // Determine which names to fetch based on gender
    const namesToFetch = gender === 'girl' 
      ? girlNames.slice(0, 20)  // Limit to top 20 to avoid large payload
      : boyNames.slice(0, 20);  // Limit to top 20 to avoid large payload
    
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
    
    return formattedData;
  };
  
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
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch girl data
        const girlData = await fetchNameData('girl');
        setGirlChartData(girlData);
        setGirlRankingData(generateRankData(girlData));
        
        // Fetch boy data
        const boyData = await fetchNameData('boy');
        setBoyChartData(boyData);
        setBoyRankingData(generateRankData(boyData));
      } catch (err) {
        console.error('Error fetching name trend data:', err);
        setError('Kunne ikke hente navnedata fra SSB.');
        toast.error('Kunne ikke hente navnedata fra SSB. Viser reservedata.');
        
        // Use fallback data
        setGirlChartData(fallbackGirlData);
        setBoyChartData(fallbackBoyData);
        setGirlRankingData(generateRankData(fallbackGirlData));
        setBoyRankingData(generateRankData(fallbackBoyData));
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []); // Only fetch data once on component mount

  // Find data for selected year based on gender
  const selectedYearData = gender === "girl" 
    ? girlRankingData.find(item => item.year === selectedYear)
    : boyRankingData.find(item => item.year === selectedYear);
  
  // Extract the top 10 names for the selected year
  const top10ForSelectedYear = selectedYearData 
    ? Array.from({length: 10}, (_, i) => ({
        rank: i + 1,
        name: selectedYearData[`#${i + 1}`],
        value: selectedYearData[`${selectedYearData[`#${i + 1}`]}_value`],
      }))
    : [];

  // Select the appropriate data for popularity over time chart
  const popularityOverTimeData = gender === "girl"
    ? ["Emma", "Nora", "Olivia", "Sofia", "Ella"].map(name => {
        return {
          name,
          data: girlChartData.map(yearData => ({
            year: yearData.year,
            value: yearData[name] as number
          }))
        };
      })
    : ["William", "Noah", "Oliver", "Elias", "Aksel"].map(name => {
        return {
          name,
          data: boyChartData.map(yearData => ({
            year: yearData.year,
            value: yearData[name] as number
          }))
        };
      });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Velg kjønn</h3>
        <ToggleGroup type="single" value={gender} onValueChange={(value) => value && setGender(value)}>
          <ToggleGroupItem value="girl" aria-label="Jentenavn">
            Jentenavn
          </ToggleGroupItem>
          <ToggleGroupItem value="boy" aria-label="Guttenavn">
            Guttenavn
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="popularity">Popularitetsrangering</TabsTrigger>
          <TabsTrigger value="timeline">Popularitet over tid</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popularity" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center">
            <h3 className="text-lg font-medium">
              {gender === "girl" ? "Topp 10 jentenavn i Norge" : "Topp 10 guttenavn i Norge"}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {years.map(year => (
                <Badge 
                  key={year} 
                  variant={year === selectedYear ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </Badge>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {Array.from({length: 10}).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {top10ForSelectedYear.map((item) => (
                <div 
                  key={item.name} 
                  className="flex items-center gap-4 bg-card p-3 rounded-md border"
                >
                  <div className="flex items-center justify-center bg-primary/10 w-10 h-10 rounded-full">
                    <span className="text-lg font-bold text-primary">
                      {item.rank}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.value} per 1000 fødte {gender === "girl" ? "jenter" : "gutter"}
                    </p>
                  </div>
                  <div className="hidden sm:flex h-2 bg-muted rounded-full" style={{ width: `${Math.min(200, item.value * 3)}px` }}>
                    <div className="h-full bg-primary rounded-full" style={{ 
                      width: `${(item.value / (top10ForSelectedYear[0]?.value || 1)) * 100}%` 
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="timeline">
          <div className="h-[400px] w-full">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    allowDuplicatedCategory={false} 
                  />
                  <YAxis 
                    label={{ 
                      value: 'Antall per 1000 fødte', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }} 
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} per 1000`, '']}
                    labelFormatter={(label) => `År: ${label}`}
                  />
                  <Legend />
                  {popularityOverTimeData.map((s, index) => (
                    <Line
                      key={s.name}
                      dataKey="value"
                      data={s.data}
                      name={s.name}
                      stroke={COLORS[index % COLORS.length]}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Popularitetstrend for topp 5 {gender === "girl" ? "jentenavn" : "guttenavn"} i Norge (2013-2024)</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NameTrendExplorer;
