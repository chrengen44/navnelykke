
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface PopularityRankingProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  years: string[];
  loading: boolean;
  top10ForSelectedYear: {
    rank: number;
    name: string;
    value: number;
  }[];
  gender: string;
}

const PopularityRanking = ({
  selectedYear,
  setSelectedYear,
  years,
  loading,
  top10ForSelectedYear,
  gender
}: PopularityRankingProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default PopularityRanking;
