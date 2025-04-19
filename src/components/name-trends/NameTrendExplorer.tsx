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
    // Aggregate popularity data by year
    const aggregatedData: { [year: number]: PopularityData[] } = {};

    babyNames.forEach(name => {
      name.popularityData.forEach(data => {
        if (!aggregatedData[data.year]) {
          aggregatedData[data.year] = [];
        }
        aggregatedData[data.year].push({
          year: data.year,
          name: name.name,
          count: data.count,
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
    
    return yearData
      .slice(0, 10)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name as string, // Ensure name is typed as string
        value: item.count as number // Ensure value is typed as number
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
