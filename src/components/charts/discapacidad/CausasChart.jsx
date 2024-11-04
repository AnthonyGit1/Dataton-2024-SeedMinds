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

export const CausasChart = ({ data }) => {
  const chartData = Object.entries(data).map(([causa, cantidad]) => ({
    causa: causa.replace('Adquirida - ', ''),
    cantidad
  })).sort((a, b) => b.cantidad - a.cantidad);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución por Causa de Discapacidad
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Análisis de las principales causas y su frecuencia en la población
        </p>
      </CardHeader>
      <div className="h-[400px] w-full p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="causa" 
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};