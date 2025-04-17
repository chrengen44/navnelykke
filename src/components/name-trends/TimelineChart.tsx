
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { COLORS } from './nameTrendConstants';
import { NameTrendData } from '@/hooks/useNameTrendData';

interface TimelineChartProps {
  loading: boolean;
  popularityOverTimeData: {
    name: string;
    data: {
      year: string;
      value: number;
    }[];
  }[];
  gender: string;
}

const TimelineChart = ({ loading, popularityOverTimeData, gender }: TimelineChartProps) => {
  return (
    <>
      <div className="h-[400px] w-full">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                allowDuplicatedCategory={false} 
              />
              <YAxis 
                label={{ 
                  value: 'Antall per 1000 fødte', 
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
              {popularityOverTimeData.map((s, index) => (
                <Line
                  key={s.name}
                  dataKey="value"
                  data={s.data}
                  name={s.name}
                  stroke={COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Popularitetstrend for topp 5 {gender === "girl" ? "jentenavn" : "guttenavn"} i Norge (2013-2024)</p>
      </div>
    </>
  );
};

export default TimelineChart;
