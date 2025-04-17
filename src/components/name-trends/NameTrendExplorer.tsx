
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
  const [gender, setGender] = useState<string>("girl");
  
  // Use the hook for each gender type
  const girlNamesToFetch = girlNames.slice(0, 20); // Limit to avoid large payload
  const boyNamesToFetch = boyNames.slice(0, 20);
  
  const {
    chartData: girlChartData,
    rankingData: girlRankingData,
    loading: girlLoading,
    error: girlError
  } = useNameTrendData('girl', girlNamesToFetch);
  
  const {
    chartData: boyChartData,
    rankingData: boyRankingData,
    loading: boyLoading,
    error: boyError
  } = useNameTrendData('boy', boyNamesToFetch);

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

  const loading = gender === "girl" ? girlLoading : boyLoading;

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
          <PopularityRanking 
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            years={years}
            loading={loading}
            top10ForSelectedYear={top10ForSelectedYear}
            gender={gender}
          />
        </TabsContent>
        
        <TabsContent value="timeline">
          <TimelineChart 
            loading={loading}
            popularityOverTimeData={popularityOverTimeData}
            gender={gender}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NameTrendExplorer;
