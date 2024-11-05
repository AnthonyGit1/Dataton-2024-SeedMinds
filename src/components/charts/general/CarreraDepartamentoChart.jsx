import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CardHeader, CardTitle, CardContent } from "../../ui/card";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const CarreraDepartamentoChart = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data) return [];
    const countMap = data.reduce((acc, [carrera, departamento]) => {
      const key = departamento;
      if (!acc[key]) {
        acc[key] = {
          departamento,
          count: 0,
        };
      }
      acc[key].count++;
      return acc;
    }, {});

    return Object.values(countMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Top 10 Departamentos por Cantidad de Postulantes
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribución geográfica de postulantes
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={processedData}
                dataKey="count"
                nameKey="departamento"
                cx="50%"
                cy="50%"
                label={({ departamento, percent }) =>
                  `${departamento}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {processedData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};
