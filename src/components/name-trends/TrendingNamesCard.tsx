
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TrendingNamesCardProps {
  type: 'rising' | 'falling';
}

interface TrendingNameData {
  name: string;
  startValue: number;
  endValue: number;
  changePercent: number;
}

// Sample data for trending names
const risingNames: TrendingNameData[] = [
  { name: 'Olivia', startValue: 23, endValue: 52, changePercent: 126 },
  { name: 'Luna', startValue: 8, endValue: 36, changePercent: 350 },
  { name: 'Frida', startValue: 18, endValue: 41, changePercent: 128 },
  { name: 'Leah', startValue: 12, endValue: 34, changePercent: 183 },
  { name: 'Aurora', startValue: 17, endValue: 38, changePercent: 124 }
];

const fallingNames: TrendingNameData[] = [
  { name: 'Julie', startValue: 48, endValue: 21, changePercent: -56 },
  { name: 'Ida', startValue: 42, endValue: 19, changePercent: -55 },
  { name: 'Maria', startValue: 39, endValue: 18, changePercent: -54 },
  { name: 'Sara', startValue: 35, endValue: 18, changePercent: -49 },
  { name: 'Eva', startValue: 26, endValue: 14, changePercent: -46 }
];

const TrendingNamesCard: React.FC<TrendingNamesCardProps> = ({ type }) => {
  const isRising = type === 'rising';
  const data = isRising ? risingNames : fallingNames;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          {isRising ? (
            <>
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Navn på vei opp</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-5 w-5 text-red-500" />
              <span>Navn på vei ned</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          {isRising
            ? 'Navn som har økt mest i popularitet fra 2013 til 2024.'
            : 'Navn som har falt mest i popularitet fra 2013 til 2024.'}
        </p>
        
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.startValue} → {item.endValue} per 1000
                </div>
              </div>
              <div className={`flex items-center gap-1 font-semibold ${
                isRising ? 'text-green-600' : 'text-red-600'
              }`}>
                {isRising ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {Math.abs(item.changePercent)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingNamesCard;
