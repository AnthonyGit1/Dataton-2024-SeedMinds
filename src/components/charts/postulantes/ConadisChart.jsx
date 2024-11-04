import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

const CONADIS_COLORS = ['#8B5CF6', '#f87171'];

export const ConadisChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data) return [];
    
    const valores = Object.values(data);
    return [
      { name: 'Inscrito', value: valores.filter(v => v === 1).length },
      { name: 'No Inscrito', value: valores.filter(v => v === 0).length }
    ];
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Estado de Inscripción en CONADIS
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribución según estado de inscripción
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={120}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CONADIS_COLORS[index % CONADIS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`${value} postulantes`, 'Cantidad']}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};
