
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Sample data structure for name trends
interface NameTrendData {
  year: string;
  [name: string]: number | string;
}

// List of years for our dataset
const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

// Top popular female names - we'll use these for our demo
const availableGirlNames = [
  'Emma', 'Nora', 'Olivia', 'Sofia', 'Ella', 'Maja', 'Emilie', 'Sofie',
  'Leah', 'Ingrid', 'Sara', 'Ida', 'Anna', 'Eva', 'Mia', 'Thea', 'Amalie', 'Frida',
  'Julie', 'Linnea', 'Sigrid', 'Mathilde', 'Aurora', 'Astrid', 'Maria', 'Tuva', 'Tiril'
].sort();

// Top popular boy names - we'll use these for our demo
const availableBoyNames = [
  'William', 'Noah', 'Oliver', 'Elias', 'Aksel', 'Emil', 'Theodor', 'Jacob', 
  'Magnus', 'Filip', 'Henrik', 'Lucas', 'Isak', 'Mathias', 'Olav', 'Oskar',
  'Tobias', 'Johannes', 'Sander', 'Sebastian', 'Odin', 'Adrian', 'Liam', 'Jonas'
].sort();

// Colors for the chart lines
const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#8AC926", "#1982C4", "#6A4C93", "#F15BB5"
];

// Sample trend dataset for girls
const generateSampleGirlData = (): NameTrendData[] => {
  return years.map(year => {
    const yearData: NameTrendData = { year };
    
    availableGirlNames.forEach(name => {
      // Base value with some randomness
      const baseValue = Math.floor(Math.random() * 50) + 10;
      
      // Create some trend patterns
      const yearIndex = parseInt(year) - 2013;
      let trendModifier = 0;
      
      // Some names get more popular over time
      if (['Emma', 'Olivia', 'Sofia', 'Ella'].includes(name)) {
        trendModifier = yearIndex * 2;
      }
      // Some get less popular
      else if (['Eva', 'Ida', 'Sara', 'Julie'].includes(name)) {
        trendModifier = -yearIndex * 1.5;
      }
      // Some have spikes
      else if (['Maja', 'Thea', 'Frida'].includes(name)) {
        trendModifier = Math.sin(yearIndex * 0.8) * 15;
      }
      // Some start rising then fall
      else if (['Nora', 'Emilie', 'Sofie'].includes(name)) {
        trendModifier = yearIndex < 6 ? yearIndex * 3 : (12 - yearIndex) * 3;
      }
      
      yearData[name] = Math.max(1, Math.round(baseValue + trendModifier));
    });
    
    return yearData;
  });
};

// Sample trend dataset for boys
const generateSampleBoyData = (): NameTrendData[] => {
  return years.map(year => {
    const yearData: NameTrendData = { year };
    
    availableBoyNames.forEach(name => {
      // Base value with some randomness
      const baseValue = Math.floor(Math.random() * 50) + 10;
      
      // Create some trend patterns
      const yearIndex = parseInt(year) - 2013;
      let trendModifier = 0;
      
      // Some names get more popular over time
      if (['Oliver', 'Noah', 'Elias', 'Liam'].includes(name)) {
        trendModifier = yearIndex * 2;
      }
      // Some get less popular
      else if (['Jacob', 'Mathias', 'Tobias', 'Jonas'].includes(name)) {
        trendModifier = -yearIndex * 1.5;
      }
      // Some have spikes
      else if (['Odin', 'Filip', 'Sander'].includes(name)) {
        trendModifier = Math.sin(yearIndex * 0.8) * 15;
      }
      // Some start rising then fall
      else if (['William', 'Emil', 'Aksel'].includes(name)) {
        trendModifier = yearIndex < 6 ? yearIndex * 3 : (12 - yearIndex) * 3;
      }
      
      yearData[name] = Math.max(1, Math.round(baseValue + trendModifier));
    });
    
    return yearData;
  });
};

// Generate yearly rank data
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

const NameTrendExplorer = () => {
  const [girlChartData, setGirlChartData] = useState<NameTrendData[]>([]);
  const [boyChartData, setBoyChartData] = useState<NameTrendData[]>([]);
  const [girlRankingData, setGirlRankingData] = useState<any[]>([]);
  const [boyRankingData, setBoyRankingData] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("popularity");
  const [gender, setGender] = useState<string>("girl");
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call to SSB
        // For now, we'll use our sample data generation function
        const girlData = generateSampleGirlData();
        const boyData = generateSampleBoyData();
        
        setGirlChartData(girlData);
        setBoyChartData(boyData);
        setGirlRankingData(generateRankData(girlData));
        setBoyRankingData(generateRankData(boyData));
      } catch (error) {
        console.error('Error fetching name trend data:', error);
        toast.error('Kunne ikke hente navnedata.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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
