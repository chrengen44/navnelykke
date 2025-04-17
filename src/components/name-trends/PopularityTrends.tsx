
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { usePopularityTrends } from '@/hooks/usePopularityTrends';

interface PopularityTrendsProps {
  gender: 'girl' | 'boy';
}

const PopularityTrends = ({ gender = 'girl' }: PopularityTrendsProps) => {
  const { data, loading, error, colors, nameKeys } = usePopularityTrends(gender);

  if (loading) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (error && !data.length) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <p className="text-gray-500 mt-2">Kunne ikke laste inn navnetrender.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} per 1000`, '']}
            labelFormatter={(label) => `År: ${label}`}
          />
          <Legend />
          {nameKeys.map(name => (
            <Line 
              key={name}
              type="monotone" 
              dataKey={name} 
              stroke={colors[name as keyof typeof colors]} 
              strokeWidth={2} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Antall per 1000 fødte {gender === 'girl' ? 'jenter' : 'gutter'} for topp 5 navn</p>
      </div>
    </div>
  );
};

export default PopularityTrends;

