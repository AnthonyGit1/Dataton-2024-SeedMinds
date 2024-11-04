import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

export const DuracionChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    
    const ranges = {};
    data.forEach(duration => {
      if (duration && !isNaN(duration)) {
        const range = Math.floor(duration / 3) * 3;
        ranges[range] = (ranges[range] || 0) + 1;
      }
    });

    return Object.entries(ranges)
      .map(([rango, cantidad]) => ({
        rango: `${rango}-${Number(rango) + 3}m`,
        cantidad
      }))
      .sort((a, b) => Number(a.rango.split('-')[0]) - Number(b.rango.split('-')[0]));
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Duración de Experiencias
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribución del tiempo en empleos (meses)
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="rango"
                tick={{ fontSize: 10, angle: -45 }}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
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
      </CardContent>
    </>
  );
};