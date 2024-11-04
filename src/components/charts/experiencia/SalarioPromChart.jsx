import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CardHeader, CardTitle } from '../../ui/card';

export const SalarioPromChart = ({ data = [] }) => {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) {
      console.error('Data must be an array');
      return [];
    }
    
    // Agrupar salarios en rangos para reducir la cantidad de puntos
    const step = 1000; // Agrupar por cada 1000 soles
    const salaryRanges = {};
    
    data.filter(salary => salary && !isNaN(salary) && salary > 0)
        .forEach(salary => {
          const range = Math.floor(salary / step) * step;
          salaryRanges[range] = (salaryRanges[range] || 0) + 1;
        });

    return Object.entries(salaryRanges)
      .map(([range, count]) => ({
        rango: `S/. ${Number(range).toLocaleString()}`,
        cantidad: count
      }))
      .sort((a, b) => Number(a.rango.replace(/[^0-9.-]+/g, '')) - Number(b.rango.replace(/[^0-9.-]+/g, '')));
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución de Salarios
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribución de salarios agrupados por rangos de S/. 1,000
        </p>
      </CardHeader>
      <div className="h-[300px] w-full p-4">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="rango"
              tick={{ fontSize: 10 }}
              interval={Math.floor(chartData.length / 10)}
            />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} postulantes`, 'Cantidad']}
              labelFormatter={(label) => `Rango: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="cantidad" 
              stroke="#8884d8" 
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};