import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

export const SalarioEmpresaChart = ({ data }) => {
  const chartData = Object.entries(data || {})
    .map(([empresa, salario]) => ({
      empresa: empresa.substring(0, 12) + '...',
      empresaCompleta: empresa,
      salario: Number(salario)
    }))
    .sort((a, b) => b.salario - a.salario)
    .slice(0, 10);  // Top 10 empresas con mejores salarios

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Top 10 Empresas por Salario
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Empresas con mejores niveles salariales
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                tickFormatter={(value) => `S/. ${value.toLocaleString()}`}
              />
              <YAxis 
                dataKey="empresa" 
                type="category" 
                width={120}
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                formatter={(value) => [`S/. ${value.toLocaleString()}`, 'Salario Promedio']}
                labelFormatter={(label) => `Empresa: ${label}`}
              />
              <Bar 
                dataKey="salario" 
                fill="#8884d8"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};