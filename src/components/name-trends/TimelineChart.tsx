import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface TimelineChartProps {
  data: {
    year: string;
    [key: string]: string | number;
  }[];
  loading: boolean;
  gender: 'girl' | 'boy';
}

const TimelineChart = ({ data, loading, gender }: TimelineChartProps) => {
  if (loading) {
    return <Skeleton className="h-[400px] w-full rounded-md" />;
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            label={{ 
              value: 'År', 
              position: 'insideBottom', 
              offset: -5 
            }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ 
              value: gender === 'girl' ? 'Antall jenter' : 'Antall gutter', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10
            }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value} ${gender === 'girl' ? 'jenter' : 'gutter'}`, 'Antall']}
          />
          <Legend />
          {Object.keys(data[0] || {}).filter(key => key !== 'year').map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={`hsl(${index * 30}, 70%, 50%)`}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
