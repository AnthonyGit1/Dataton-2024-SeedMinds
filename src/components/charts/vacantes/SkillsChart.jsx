import React from 'react';
import { CardHeader, CardTitle, CardContent } from '../../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const SkillsChart = ({ data }) => {
  const preparedData = Object.entries(data || {})
    .map(([competencia, cantidad]) => ({
      competencia,
      cantidad: Number(cantidad)
    }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10); // Top 10 competencias

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Competencias más Solicitadas
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Top 10 habilidades requeridas en las vacantes
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={preparedData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number"
                tick={{ fill: '#6b7280' }}
                axisLine={{ stroke: '#9CA3AF' }}
              />
              <YAxis 
                dataKey="competencia" 
                type="category"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                width={140}
                axisLine={{ stroke: '#9CA3AF' }}
              />
              <Tooltip 
                formatter={(value) => new Intl.NumberFormat().format(value)}
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '12px'
                }}
              />
              <Bar 
                dataKey="cantidad" 
                fill="#8B5CF6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};