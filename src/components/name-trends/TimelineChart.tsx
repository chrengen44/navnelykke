
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';

interface TimelineChartProps {
  data: {
    year: string;
    [key: string]: string | number;
  }[];
  loading: boolean;
  gender: 'girl' | 'boy';
  hasError?: boolean;
}

const TimelineChart = ({ data, loading, gender, hasError = false }: TimelineChartProps) => {
  if (loading) {
    return <Skeleton className="h-[400px] w-full rounded-md" />;
  }

  const hasValidData = data && data.length > 0 && Object.keys(data[0]).length > 1;

  if (!hasValidData) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-md p-6">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">Ingen data å vise</h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          Vi kunne ikke hente navnedata for denne perioden
        </p>
      </div>
    );
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

      {hasError && (
        <div className="text-xs text-amber-600 mt-2 p-2 bg-amber-50 rounded flex items-center gap-2">
          <AlertTriangle className="h-3 w-3" />
          <span>Viser reservedata. SSB API er ikke tilgjengelig.</span>
        </div>
      )}
    </div>
  );
};

export default TimelineChart;
