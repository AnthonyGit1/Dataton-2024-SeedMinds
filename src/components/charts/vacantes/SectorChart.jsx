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

const SectorChart = ({ data }) => {
  const preparedData = Object.entries(data)
    .map(([sector, vacantes]) => ({
      sector,
      vacantes: Number(vacantes)
    }))
    .sort((a, b) => b.vacantes - a.vacantes)
    .slice(0, 10);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Top 10 Sectores con más Vacantes
        </CardTitle>
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
                dataKey="sector" 
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
                dataKey="vacantes" 
                fill="#4F46E5"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};

export default SectorChart;