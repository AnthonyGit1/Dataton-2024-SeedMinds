import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CardHeader, CardTitle } from '../../ui/card';

export const PromedioChart = ({ data }) => {
  const chartData = Object.entries(data).map(([causa, promedio]) => ({
    causa: causa.replace('Adquirida - ', ''),
    promedio: Number(promedio).toFixed(2)
  }));

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Promedio de Dificultad por Causa
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Nivel promedio de dificultad según la causa de la discapacidad
        </p>
      </CardHeader>
      <div className="h-[300px] w-full p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="causa" 
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis domain={[1, 3]} />
            <Tooltip />
            <Bar dataKey="promedio" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};