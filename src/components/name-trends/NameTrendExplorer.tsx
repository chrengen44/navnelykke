import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Combobox } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Sample data structure for name trends
interface NameTrendData {
  year: string;
  [name: string]: number | string;
}

// List of years for our dataset
const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

// Top popular female names - we'll use these for our demo
const availableNames = [
  'Emma', 'Nora', 'Olivia', 'Sofia', 'Ella', 'Maja', 'Emilie', 'Sofie',
  'Leah', 'Ingrid', 'Sara', 'Ida', 'Anna', 'Eva', 'Mia', 'Thea', 'Amalie', 'Frida',
  'Julie', 'Linnea', 'Sigrid', 'Mathilde', 'Aurora', 'Astrid', 'Maria', 'Tuva', 'Tiril'
].sort();

// Colors for the chart lines
const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#8AC926", "#1982C4", "#6A4C93", "#F15BB5"
];

// Sample trend dataset
const generateSampleData = (): NameTrendData[] => {
  return years.map(year => {
    const yearData: NameTrendData = { year };
    
    availableNames.forEach(name => {
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

const NameTrendExplorer = () => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [chartData, setChartData] = useState<NameTrendData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call to SSB
        // For now, we'll use our sample data generation function
        const data = generateSampleData();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching name trend data:', error);
        toast.error('Kunne ikke hente navnedata.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSelectName = (name: string) => {
    if (!name || selectedNames.includes(name)) {
      return; // Name already selected or undefined
    }
    
    if (selectedNames.length >= 5) {
      toast.warning('Du kan kun sammenligne opptil 5 navn samtidig.');
      return;
    }
    
    setSelectedNames(prev => [...prev, name]);
  };
  
  const handleRemoveName = (name: string) => {
    setSelectedNames(selectedNames.filter(n => n !== name));
  };
  
  // Format options for the combobox - ensure we always return a valid array
  const nameOptions = React.useMemo(() => {
    // Filter out already selected names
    return availableNames
      .filter(name => !selectedNames.includes(name))
      .map(name => ({
        value: name,
        label: name
      }));
  }, [selectedNames]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Combobox
            items={nameOptions}
            placeholder="Søk etter jentenavn..."
            onSelect={handleSelectName}
            className="max-w-[300px]"
          />
          
          <div className="flex flex-wrap gap-2">
            {selectedNames.map((name, index) => (
              <Badge 
                key={name} 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                className="text-white pl-3 flex items-center gap-1"
              >
                {name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 text-white hover:bg-transparent hover:text-white/80"
                  onClick={() => handleRemoveName(name)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
        
        {selectedNames.length === 0 && (
          <p className="text-sm text-gray-500">
            Velg navn fra listen ovenfor for å se trender over tid.
          </p>
        )}
      </div>
      
      <div className="h-[400px] w-full">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : selectedNames.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                label={{ 
                  value: 'Antall per 1000 fødte jenter', 
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
              {selectedNames.map((name, index) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  name={name}
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center border border-dashed rounded-md">
            <p className="text-gray-400">
              Velg minst ett navn for å se trenddata
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameTrendExplorer;
