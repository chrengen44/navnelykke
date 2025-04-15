
import React, { useState, useEffect } from 'react';
import { getTopNamesByYear } from '@/utils/ssbDataFetcher';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE",
  "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
];

interface TrendDataPoint {
  year: string;
  [key: string]: string | number;
}

const NameTrendsChart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<TrendDataPoint[]>([]);
  const [topNames, setTopNames] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Always fetch girl names (as requested)
        const namesByYear = await getTopNamesByYear('girl', 5); // Top 5 names for better visualization
        
        // Check if we got valid data back
        const validData = Object.keys(namesByYear).length > 0;
        
        if (!validData) {
          throw new Error('No data returned from SSB API');
        }
        
        // Transform data for the chart
        const years = Object.keys(namesByYear).sort();
        const allNames = new Set<string>();
        
        // Find all unique names
        years.forEach(year => {
          namesByYear[year].forEach(({ name }) => {
            allNames.add(name);
          });
        });
        
        // Get the top 5 names that appear most frequently across years
        const nameFrequency: Record<string, number> = {};
        allNames.forEach(name => {
          nameFrequency[name] = years.filter(year => 
            namesByYear[year].some(n => n.name === name)
          ).length;
        });
        
        const mostFrequentNames = [...allNames]
          .sort((a, b) => nameFrequency[b] - nameFrequency[a])
          .slice(0, 5);
        
        setTopNames(mostFrequentNames);
        
        // Create chart data
        const data: TrendDataPoint[] = years.map(year => {
          const yearData: TrendDataPoint = { year };
          namesByYear[year].forEach(({ name, count }) => {
            if (mostFrequentNames.includes(name)) {
              yearData[name] = count;
            }
          });
          return yearData;
        });
        
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        toast.error('Kunne ikke hente data fra SSB API. Importer data først med knappen øverst.');
        setChartData([]);
        setTopNames([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Jentenavn: Trender 2013-2023</h2>
      </div>
      
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : chartData.length > 0 ? (
        <div className="w-full h-[400px]">
          <ChartContainer 
            config={topNames.reduce((acc, name, index) => {
              acc[name] = { color: COLORS[index % COLORS.length] };
              return acc;
            }, {} as Record<string, { color: string }>)}
          >
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
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
          <p className="text-lg text-gray-500 mb-4">
            Ingen data å vise. Bruk "Importer jentenavn fra SSB" knappen øverst på siden for å importere navnedata.
          </p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <span>Kilde: Statistisk sentralbyrå (SSB)</span>
      </div>
    </Card>
  );
};

export default NameTrendsChart;
