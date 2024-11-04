import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

export const EdadChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data) return [];
    
    const edades = Object.values(data);
    const rangos = [
      '20-24', '25-29', '30-34', '35-39', '40-44',
      '45-49', '50-54', '55-59', '60-64', '65-69',
      '70-74', '75-79', '80-84', '85-89'
    ];
    
    return rangos.map(rango => ({
      rango,
      cantidad: edades.filter(edad => {
        const [min, max] = rango.split('-').map(Number);
        return edad >= min && edad <= max;
      }).length
    }));
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución por Rango de Edad
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Análisis de la distribución etaria de los postulantes
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <AreaChart 
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis 
                dataKey="rango"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`${value} postulantes`, 'Cantidad']}
              />
              <Area 
                type="monotone"
                dataKey="cantidad"
                stroke="#a78bfa"
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