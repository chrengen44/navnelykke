
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';

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
  gender: 'girl' | 'boy';
}

const PopularityRanking = ({
  selectedYear,
  setSelectedYear,
  years,
  loading,
  top10ForSelectedYear,
  gender
}: PopularityRankingProps) => {
  const hasData = top10ForSelectedYear && top10ForSelectedYear.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center">
        <h3 className="text-lg font-medium">
          Topp 10 {gender === 'girl' ? 'jentenavn' : 'guttenavn'} i Norge {selectedYear}
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
      ) : !hasData ? (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-amber-500" />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Ingen navnedata å vise for {selectedYear}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Vi bruker reservedata ettersom SSB-data ikke er tilgjengelig akkurat nå
            </p>
          </div>
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
                  {item.value} {gender === 'girl' ? 'jenter' : 'gutter'}
                </p>
              </div>
              <div className="hidden sm:flex h-2 bg-muted rounded-full" style={{ width: `${Math.min(200, item.value * 0.3)}px` }}>
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
