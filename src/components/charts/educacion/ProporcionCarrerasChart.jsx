import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CardHeader, CardTitle, CardContent } from '../../ui/card';

const COLORS = [
  '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b',
  '#6366f1', '#14b8a6', '#8b5cf6', '#f43f5e', '#84cc16'
];

export const ProporcionCarrerasChart = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data) return [];
    
    return Object.entries(data)
      .map(([nombre, porcentaje]) => ({
        name: nombre,
        value: parseFloat(porcentaje)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución de Principales Carreras
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Proporción porcentual de las carreras más solicitadas
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={processedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                labelLine={true}
              >
                {processedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value.toFixed(1)}%`, 'Proporción']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};