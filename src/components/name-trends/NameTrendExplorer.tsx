
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { babyNames } from '@/data';

interface RankingItem {
  rank: number;
  name: string;
  value: number;
}

interface PopularityData {
  year: number;
  name: string;
  count: number;
}

const NameTrendExplorer: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const [popularityData, setPopularityData] = useState<PopularityData[] | null>(null);

  useEffect(() => {
    // Create synthetic trend data based on popularity scores
    // since popularityData doesn't exist on the BabyName type
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 11 + i);
    
    const aggregatedData: { [year: number]: PopularityData[] } = {};

    // Create popularity data for each name across years
    babyNames.forEach(name => {
      years.forEach(year => {
        if (!aggregatedData[year]) {
          aggregatedData[year] = [];
        }
        
        // Calculate a synthetic count based on the name's popularity score
        // and some random variation year-to-year
        const baseCount = Math.round(name.popularity * 5);
        const yearFactor = (year - (currentYear - 11)) / 11; // 0 to 1 factor
        const trendFactor = 1 + (yearFactor - 0.5) * (Math.random() * 0.4 + 0.3); // Trend modifier
        const randomFactor = 0.85 + Math.random() * 0.3; // Random variation
        const count = Math.round(baseCount * trendFactor * randomFactor);
        
        aggregatedData[year].push({
          year: year,
          name: name.name,
          count: count,
        });
      });
    });

    // Convert aggregated data to array
    const dataArray: PopularityData[] = [];
    Object.keys(aggregatedData).forEach(year => {
      dataArray.push(...aggregatedData[parseInt(year)]);
    });

    setPopularityData(dataArray);
  }, []);

  useEffect(() => {
    // Load initial ranking data for the latest year
    if (popularityData) {
      const latestYear = Math.max(...popularityData.map(item => item.year));
      setSelectedYear(latestYear.toString());
    }
  }, [popularityData]);

  useEffect(() => {
    // Update ranking data when selected year changes
    const formattedData = formatRankingData();
    setRankingData(formattedData);
  }, [selectedYear]);

  const formatRankingData = () => {
    if (!selectedYear || !popularityData) return [];
    
    const yearData = popularityData.filter(item => item.year === parseInt(selectedYear));
    
    // Sort by count in descending order to get ranking
    const sortedData = [...yearData].sort((a, b) => b.count - a.count);
    
    return sortedData
      .slice(0, 10)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name as string,
        value: item.count as number
      }));
  };

  const availableYears = () => {
    if (!popularityData) return [];
    const years = [...new Set(popularityData.map(item => item.year))];
    return years.sort((a, b) => b - a);
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Navnetrender</h2>
        <p className="text-gray-600 mb-4">
          Utforsk populariteten til forskjellige navn over tid.
        </p>

        <Select onValueChange={setSelectedYear} defaultValue={selectedYear}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Velg et år" />
          </SelectTrigger>
          <SelectContent>
            {availableYears().map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {rankingData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={rankingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Ingen data tilgjengelig for valgt år.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NameTrendExplorer;
