
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data for top 5 names over the years (2013-2024)
const topNamesData = [
  { year: '2013', Emma: 62, Nora: 58, Sophie: 52, Ella: 49, Maja: 47 },
  { year: '2014', Emma: 60, Nora: 59, Sophie: 51, Ella: 52, Maja: 46 },
  { year: '2015', Emma: 59, Nora: 63, Sophie: 48, Ella: 53, Maja: 43 },
  { year: '2016', Emma: 58, Nora: 65, Sophie: 45, Ella: 54, Maja: 41 },
  { year: '2017', Emma: 56, Nora: 64, Sophie: 42, Ella: 56, Maja: 40 },
  { year: '2018', Emma: 58, Nora: 62, Sophie: 40, Ella: 59, Maja: 38 },
  { year: '2019', Emma: 61, Nora: 59, Sophie: 38, Ella: 61, Maja: 37 },
  { year: '2020', Emma: 63, Nora: 56, Sophie: 37, Ella: 62, Maja: 36 },
  { year: '2021', Emma: 64, Nora: 54, Sophie: 36, Ella: 64, Maja: 35 },
  { year: '2022', Emma: 65, Nora: 52, Sophie: 35, Ella: 63, Maja: 34 },
  { year: '2023', Emma: 64, Nora: 51, Sophie: 33, Ella: 62, Maja: 33 },
  { year: '2024', Emma: 63, Nora: 50, Sophie: 32, Ella: 61, Maja: 32 }
];

const COLORS = {
  Emma: "#FF6384",
  Nora: "#36A2EB",
  Sophie: "#FFCE56", 
  Ella: "#4BC0C0",
  Maja: "#9966FF"
};

const PopularityTrends = () => {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={topNamesData}
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
          <Line type="monotone" dataKey="Emma" stroke={COLORS.Emma} strokeWidth={2} />
          <Line type="monotone" dataKey="Nora" stroke={COLORS.Nora} strokeWidth={2} />
          <Line type="monotone" dataKey="Sophie" stroke={COLORS.Sophie} strokeWidth={2} />
          <Line type="monotone" dataKey="Ella" stroke={COLORS.Ella} strokeWidth={2} />
          <Line type="monotone" dataKey="Maja" stroke={COLORS.Maja} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Antall per 1000 fødte jenter for topp 5 navn</p>
      </div>
    </div>
  );
};

export default PopularityTrends;
