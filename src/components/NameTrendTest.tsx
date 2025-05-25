import React, { useEffect } from 'react';
import { useNameTrendData } from '../hooks/useNameTrendData';
import { log } from '@/utils/logger';

const NameTrendTest: React.FC = () => {
  // Test with the correct top 5 girls' names in Norway for 2024
  const testNames = React.useMemo(() => [
    'Emma',    // 1st place 2024
    'Nora',    // 2nd place 2024
    'Olivia',  // 3rd place 2024
    'Ella',    // 4th place 2024
    'Selma'    // 5th place 2024
  ], []);
  
  const { chartData, rankingData, loading, error } = useNameTrendData('girl', testNames);
  
  useEffect(() => {
    if (chartData.length > 0) {
      const data2024 = chartData.find(d => d.year === '2024');
      if (data2024) {
        log('2024 Exact Numbers:', {
          'Emma': data2024['Emma'] || 0,
          'Nora': data2024['Nora'] || 0,
          'Olivia': data2024['Olivia'] || 0,
          'Ella': data2024['Ella'] || 0,
          'Selma': data2024['Selma'] || 0
        });
      }
    }
  }, [chartData]);
  
  if (loading) return <div>Laster data...</div>;
  if (error) return <div>Feil: {error}</div>;
  
  const data2024 = chartData.find(d => d.year === '2024');
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">2024 Jentenavn - Nøyaktige tall</h2>
      
      <div className="bg-gray-100 p-4 rounded">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Plass</th>
              <th className="px-4 py-2">Navn</th>
              <th className="px-4 py-2">Antall</th>
            </tr>
          </thead>
          <tbody>
            {testNames.map((name, index) => {
              const count = data2024 ? data2024[name] || 0 : 0;
              return (
                <tr key={name} className="bg-white">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2 font-mono">{count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NameTrendTest; 