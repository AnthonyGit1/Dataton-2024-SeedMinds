import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

export const EmpresasPostulantesChart = ({ data }) => {
  const chartData = Object.entries(data || {})
    .map(([empresa, cantidad]) => ({
      empresa: empresa.substring(0, 12) + '...',
      empresaCompleta: empresa,
      cantidad: Number(cantidad)
    }))
    .sort((a, b) => b.cantidad - a.cantidad);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Empresas más Demandadas
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Top 10 empresas con mayor número de postulantes
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="empresa" 
                type="category" 
                width={120}
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                formatter={(value) => `${value} postulantes`}
                labelFormatter={(label) => label}
              />
              <Bar dataKey="cantidad" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};