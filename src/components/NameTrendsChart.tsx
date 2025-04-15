
import React, { useState, useEffect } from 'react';
import { getTopNamesByYear } from '@/utils/ssbDataFetcher';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE",
  "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
];

// Mock data for when the SSB API fails
const MOCK_DATA = {
  girl: {
    "2013": [
      { name: "Emma", count: 448 },
      { name: "Nora", count: 429 },
      { name: "Sofia", count: 392 },
      { name: "Ella", count: 352 },
      { name: "Maja", count: 343 }
    ],
    "2014": [
      { name: "Emma", count: 461 },
      { name: "Nora", count: 420 },
      { name: "Sofia", count: 407 },
      { name: "Ella", count: 371 },
      { name: "Sara", count: 355 }
    ],
    "2015": [
      { name: "Sofia", count: 434 },
      { name: "Emma", count: 428 },
      { name: "Nora", count: 412 },
      { name: "Ella", count: 386 },
      { name: "Maja", count: 362 }
    ],
    "2016": [
      { name: "Sofia", count: 445 },
      { name: "Emma", count: 436 },
      { name: "Nora", count: 418 },
      { name: "Ella", count: 389 },
      { name: "Olivia", count: 374 }
    ],
    "2017": [
      { name: "Emma", count: 458 },
      { name: "Sofia", count: 442 },
      { name: "Nora", count: 411 },
      { name: "Olivia", count: 398 },
      { name: "Ella", count: 391 }
    ],
    "2018": [
      { name: "Emma", count: 462 },
      { name: "Nora", count: 447 },
      { name: "Sofia", count: 439 },
      { name: "Ella", count: 395 },
      { name: "Maja", count: 392 }
    ],
    "2019": [
      { name: "Emma", count: 471 },
      { name: "Nora", count: 456 },
      { name: "Olivia", count: 428 },
      { name: "Sofia", count: 419 },
      { name: "Ella", count: 402 }
    ],
    "2020": [
      { name: "Emma", count: 485 },
      { name: "Nora", count: 468 },
      { name: "Olivia", count: 446 },
      { name: "Sofia", count: 432 },
      { name: "Ella", count: 415 }
    ],
    "2021": [
      { name: "Nora", count: 479 },
      { name: "Emma", count: 473 },
      { name: "Olivia", count: 459 },
      { name: "Sofia", count: 441 },
      { name: "Ella", count: 422 }
    ],
    "2022": [
      { name: "Nora", count: 483 },
      { name: "Emma", count: 478 },
      { name: "Olivia", count: 465 },
      { name: "Sofia", count: 447 },
      { name: "Ella", count: 432 }
    ],
    "2023": [
      { name: "Emma", count: 492 },
      { name: "Nora", count: 491 },
      { name: "Olivia", count: 474 },
      { name: "Sofia", count: 452 },
      { name: "Ella", count: 441 }
    ],
    "2024": [
      { name: "Nora", count: 498 },
      { name: "Emma", count: 489 },
      { name: "Olivia", count: 476 },
      { name: "Sofia", count: 458 },
      { name: "Ella", count: 449 }
    ]
  },
  boy: {
    "2013": [
      { name: "William", count: 467 },
      { name: "Oliver", count: 431 },
      { name: "Jakob", count: 402 },
      { name: "Lucas", count: 387 },
      { name: "Filip", count: 365 }
    ],
    "2014": [
      { name: "William", count: 478 },
      { name: "Oliver", count: 447 },
      { name: "Jakob", count: 421 },
      { name: "Lucas", count: 401 },
      { name: "Liam", count: 378 }
    ],
    "2015": [
      { name: "William", count: 485 },
      { name: "Oliver", count: 462 },
      { name: "Jakob", count: 434 },
      { name: "Lucas", count: 419 },
      { name: "Liam", count: 396 }
    ],
    "2016": [
      { name: "William", count: 493 },
      { name: "Oliver", count: 475 },
      { name: "Jakob", count: 442 },
      { name: "Liam", count: 425 },
      { name: "Lucas", count: 410 }
    ],
    "2017": [
      { name: "Oliver", count: 489 },
      { name: "William", count: 486 },
      { name: "Liam", count: 447 },
      { name: "Jakob", count: 438 },
      { name: "Noah", count: 428 }
    ],
    "2018": [
      { name: "Oliver", count: 495 },
      { name: "William", count: 489 },
      { name: "Noah", count: 456 },
      { name: "Liam", count: 452 },
      { name: "Jakob", count: 437 }
    ],
    "2019": [
      { name: "Oliver", count: 501 },
      { name: "Noah", count: 486 },
      { name: "William", count: 481 },
      { name: "Liam", count: 458 },
      { name: "Theo", count: 447 }
    ],
    "2020": [
      { name: "Noah", count: 513 },
      { name: "Oliver", count: 508 },
      { name: "William", count: 475 },
      { name: "Liam", count: 465 },
      { name: "Theo", count: 456 }
    ],
    "2021": [
      { name: "Noah", count: 523 },
      { name: "Oliver", count: 512 },
      { name: "Liam", count: 479 },
      { name: "William", count: 469 },
      { name: "Theo", count: 462 }
    ],
    "2022": [
      { name: "Noah", count: 531 },
      { name: "Oliver", count: 517 },
      { name: "Liam", count: 488 },
      { name: "Theo", count: 474 },
      { name: "William", count: 467 }
    ],
    "2023": [
      { name: "Noah", count: 537 },
      { name: "Oliver", count: 521 },
      { name: "Liam", count: 496 },
      { name: "Theo", count: 483 },
      { name: "William", count: 462 }
    ],
    "2024": [
      { name: "Noah", count: 543 },
      { name: "Oliver", count: 528 },
      { name: "Liam", count: 502 },
      { name: "Theo", count: 491 },
      { name: "Emil", count: 469 }
    ]
  }
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
  const [usingMockData, setUsingMockData] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const namesByYear = await getTopNamesByYear(gender, 10);
        
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
        
        // Get the top 10 names that appear most frequently across years
        const nameFrequency: Record<string, number> = {};
        allNames.forEach(name => {
          nameFrequency[name] = years.filter(year => 
            namesByYear[year].some(n => n.name === name)
          ).length;
        });
        
        const mostFrequentNames = [...allNames]
          .sort((a, b) => nameFrequency[b] - nameFrequency[a])
          .slice(0, 10);
        
        setTopNames(mostFrequentNames);
        setUsingMockData(false);
        
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
        
        // Fall back to mock data if the API request fails
        const mockDataForGender = MOCK_DATA[gender];
        const years = Object.keys(mockDataForGender).sort();
        const allNames = new Set<string>();
        
        // Find all unique names in mock data
        years.forEach(year => {
          mockDataForGender[year].forEach(({ name }) => {
            allNames.add(name);
          });
        });
        
        const mockNames = [...allNames].slice(0, 5);
        setTopNames(mockNames);
        setUsingMockData(true);
        
        // Create chart data from mock data
        const data: TrendDataPoint[] = years.map(year => {
          const yearData: TrendDataPoint = { year };
          mockDataForGender[year].forEach(({ name, count }) => {
            if (mockNames.includes(name)) {
              yearData[name] = count;
            }
          });
          return yearData;
        });
        
        setChartData(data);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [gender]);
  
  const toggleGender = () => {
    setGender(prev => prev === 'boy' ? 'girl' : 'boy');
  };
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Navnetrender 2013-2024</h2>
        <Button 
          onClick={toggleGender}
          variant="outline"
          className={gender === 'boy' ? 'bg-blue-100' : 'bg-pink-100'}
        >
          Vis {gender === 'boy' ? 'jentenavn' : 'guttenavn'}
        </Button>
      </div>
      
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
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
      )}
      
      <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
        <span>Kilde: {usingMockData ? 'Simulerte data for demonstrasjon' : 'Statistisk sentralbyrå (SSB)'}</span>
        {usingMockData && (
          <span className="text-orange-500">
            Merk: Viser simulerte data fordi SSB API er utilgjengelig
          </span>
        )}
      </div>
    </Card>
  );
};

export default NameTrendsChart;
