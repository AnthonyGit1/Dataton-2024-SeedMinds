import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

export const SexoDepartamentoChart = ({ sexoData, departamentoData }) => {
  const chartData = useMemo(() => {
    if (!sexoData || !departamentoData) return [];
    
    const deptoCount = {};
    Object.keys(departamentoData).forEach(key => {
      const depto = departamentoData[key];
      const sexo = sexoData[key];
      if (!deptoCount[depto]) {
        deptoCount[depto] = { name: depto, Femenino: 0, Masculino: 0 };
      }
      sexo === 'F' ? deptoCount[depto].Femenino++ : deptoCount[depto].Masculino++;
    });

    return Object.values(deptoCount)
      .sort((a, b) => (b.Femenino + b.Masculino) - (a.Femenino + a.Masculino))
      .slice(0, 15);
  }, [sexoData, departamentoData]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución por Género y Departamento
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Análisis de la distribución de género por departamento
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category"
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="Femenino" stackId="a" fill="#fca5a5" />
              <Bar dataKey="Masculino" stackId="a" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};