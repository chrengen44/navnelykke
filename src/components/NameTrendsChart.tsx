
import React, { useState, useEffect } from 'react';
import { getTopNamesByYear } from '@/utils/ssbDataFetcher';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const COLORS = {
  girl: ['#FF6B6B', '#FF8787', '#FFA5A5', '#FFBEBE', '#FFD8D8'],
  boy: ['#4D96FF', '#6BAAFF', '#8ABEFF', '#A8D1FF', '#C6E5FF']
};

interface TrendDataPoint {
  year: string;
  [key: string]: string | number;
}

const NameTrendsChart = () => {
  const [gender, setGender] = useState<'boy' | 'girl'>('girl');
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<TrendDataPoint[]>([]);
  const [topNames, setTopNames] = useState<string[]>([]);
  const [comparingGenders, setComparingGenders] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'line' | 'area'>('line');
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const namesByYear = await getTopNamesByYear(gender, 10);
        
        // Transform data for the chart
        const years = Object.keys(namesByYear).sort();
        const allNames = new Set<string>();
        
        // Find all unique names
        years.forEach(year => {
          namesByYear[year].forEach(({ name }) => {
            allNames.add(name);
          });
        });
        
        // Get the top 10 names that appear most frequently across years
        const nameFrequency: Record<string, number> = {};
        allNames.forEach(name => {
          nameFrequency[name] = years.filter(year => 
            namesByYear[year].some(n => n.name === name)
          ).length;
        });
        
        const mostFrequentNames = [...allNames]
          .sort((a, b) => nameFrequency[b] - nameFrequency[a])
          .slice(0, 5); // Reducing to top 5 for better visibility
        
        setTopNames(mostFrequentNames);
        
        // Create chart data
        const data: TrendDataPoint[] = years.map(year => {
          const yearData: TrendDataPoint = { year };
          namesByYear[year].forEach(({ name, count }) => {
            if (mostFrequentNames.includes(name)) {
              yearData[name] = count;
              // Adding gender prefix for comparison mode
              if (comparingGenders) {
                yearData[`${gender}_${name}`] = count;
              }
            }
          });
          return yearData;
        });
        
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [gender, comparingGenders]);
  
  const handleGenderToggle = () => {
    setGender(prev => prev === 'boy' ? 'girl' : 'boy');
  };

  const handleCompareToggle = () => {
    setComparingGenders(!comparingGenders);
  };

  const handleViewModeChange = (mode: 'line' | 'area') => {
    setViewMode(mode);
  };

  const renderChartByMode = () => {
    if (viewMode === 'line') {
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          {topNames.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={COLORS[gender][index % COLORS[gender].length]}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name={`${name} (${gender === 'boy' ? 'Gutt' : 'Jente'})`}
            />
          ))}
        </LineChart>
      );
    } else {
      return (
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          {topNames.map((name, index) => (
            <Area
              key={name}
              type="monotone"
              dataKey={name}
              fill={COLORS[gender][index % COLORS[gender].length]}
              stroke={COLORS[gender][index % COLORS[gender].length]}
              fillOpacity={0.6}
              name={`${name} (${gender === 'boy' ? 'Gutt' : 'Jente'})`}
            />
          ))}
        </ComposedChart>
      );
    }
  };
  
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Navnetrender 2013-2024</h2>
          <p className="text-sm text-gray-500 mt-1">Kilde: Statistisk sentralbyrå (SSB)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleGenderToggle}
            variant="outline"
            className={gender === 'boy' ? 'bg-blue-100' : 'bg-pink-100'}
          >
            Vis {gender === 'boy' ? 'jentenavn' : 'guttenavn'}
          </Button>
          <Button
            onClick={() => handleViewModeChange(viewMode === 'line' ? 'area' : 'line')}
            variant="outline"
          >
            {viewMode === 'line' ? 'Områdevisning' : 'Linjevisning'}
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <div className="w-full h-[400px]">
          <ChartContainer 
            config={topNames.reduce((acc, name, index) => {
              const baseColor = COLORS[gender][index % COLORS[gender].length];
              acc[name] = { color: baseColor };
              return acc;
            }, {} as Record<string, { color: string }>)}
          >
            {renderChartByMode()}
          </ChartContainer>
        </div>
      )}
      
      <Tabs className="mt-6" defaultValue="top5">
        <TabsList>
          <TabsTrigger value="top5">Topp 5 navn</TabsTrigger>
          <TabsTrigger value="info">Om dataene</TabsTrigger>
        </TabsList>
        <TabsContent value="top5" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topNames.map((name, index) => (
              <div 
                key={name}
                className="p-3 rounded-lg text-center"
                style={{ backgroundColor: `${COLORS[gender][index % COLORS[gender].length]}20` }}
              >
                <p className="font-medium" style={{ color: COLORS[gender][index % COLORS[gender].length] }}>{name}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="info" className="pt-4">
          <div className="text-sm text-gray-600">
            <p>Dataene er hentet fra Statistisk sentralbyrå (SSB) og viser antall barn som har fått hvert navn per år.</p>
            <p className="mt-2">Grafen viser kun de 5 mest populære navnene over tid for å gi et tydelig bilde av trendene.</p>
            <p className="mt-2">Dataperioden er fra 2013 til 2024.</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default NameTrendsChart;
