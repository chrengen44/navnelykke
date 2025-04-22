import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import PopularityRanking from './PopularityRanking';
import TimelineChart from './TimelineChart';
import { useNameTrendData } from '@/hooks/useNameTrendData';
import { boyNames, girlNames, years } from './nameTrendConstants';

const NameTrendExplorer = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [activeTab, setActiveTab] = useState<string>("popularity");
  const [gender, setGender] = useState<'girl' | 'boy'>('girl');
  
  // Use the hook for each gender type
  const namesToFetch = gender === 'girl' 
    ? girlNames.slice(0, 50)
    : boyNames.slice(0, 50);
  
  const {
    chartData,
    rankingData,
    loading,
    error
  } = useNameTrendData(gender, namesToFetch);

  // Find data for selected year
  const selectedYearData = rankingData.find(item => item.year === selectedYear);
  
  // Extract the top 10 names for the selected year
  const top10ForSelectedYear = selectedYearData 
    ? Array.from({length: 10}, (_, i) => {
        const name = selectedYearData[`#${i + 1}`] as string;
        const value = selectedYearData[`${name}_value`] as number;
        return {
          rank: i + 1,
          name,
          value
        };
      })
    : [];

  // Select the appropriate data for popularity over time chart
  const topNames = gender === 'girl' 
    ? ["Emma", "Nora", "Olivia", "Sofia", "Ella"]
    : ["William", "Noah", "Oliver", "Elias", "Aksel"];

  const popularityOverTimeData = topNames.map(name => {
    return {
      name,
      data: chartData.map(yearData => ({
        year: yearData.year,
        value: yearData[name] as number
      }))
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Velg kjønn</h3>
        <ToggleGroup type="single" value={gender} onValueChange={(value) => value && setGender(value as 'girl' | 'boy')}>
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
          <PopularityRanking 
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            years={years}
            loading={loading}
            top10ForSelectedYear={top10ForSelectedYear}
            gender={gender}
          />
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4">
          <TimelineChart 
            popularityOverTimeData={popularityOverTimeData}
            loading={loading}
            gender={gender}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NameTrendExplorer;
