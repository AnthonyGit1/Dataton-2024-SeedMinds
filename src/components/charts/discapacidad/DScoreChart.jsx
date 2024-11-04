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

export const DScoreChart = ({ data }) => {
  const scores = [1, 2, 3];
  const chartData = scores.map(score => ({
    nivel: score === 1 ? 'Sin dificultad' : 
          score === 2 ? 'Dificultad leve' : 'Dificultad severa',
    cantidad: data.filter(d => d === score).length
  }));

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución por Nivel de Dificultad
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Clasificación de casos según su nivel de dificultad (DSCORE)
        </p>
      </CardHeader>
      <div className="h-[300px] w-full p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nivel" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
