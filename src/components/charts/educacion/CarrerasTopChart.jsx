import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CardHeader, CardTitle, CardContent } from '../../ui/card';

export const CarrerasTopChart = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data) return [];
    
    return Object.entries(data)
      .map(([nombre, cantidad]) => ({
        nombre,
        cantidad: parseInt(cantidad)
      }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 10);
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Top 10 Carreras más Demandadas
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribución de postulantes por carrera
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={processedData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="nombre"
                type="category"
                tick={{ fontSize: 12, fill: '#666' }}
                width={150}
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
                formatter={(value) => [`${value.toLocaleString()} postulantes`, 'Cantidad']}
              />
              <Bar 
                dataKey="cantidad" 
                fill="#a78bfa" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};