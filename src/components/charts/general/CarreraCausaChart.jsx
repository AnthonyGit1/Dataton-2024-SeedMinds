import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CardHeader, CardTitle, CardContent } from "../../ui/card";

export const CarreraCausaChart = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data) return [];
    const countMap = data.reduce((acc, [carrera, causa, dscore]) => {
      const key = `${carrera}-${causa}`;
      if (!acc[key]) {
        acc[key] = {
          carrera,
          causa,
          count: 0,
          dscore: 0,
        };
      }
      acc[key].count++;
      acc[key].dscore += parseFloat(dscore);
      return acc;
    }, {});

    return Object.values(countMap).map((item) => ({
      ...item,
      dscore: (item.dscore / item.count).toFixed(2),
    }));
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Análisis de Causas por Carrera
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Distribución de causas y puntaje DScore
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] w-full">
          <ResponsiveContainer>
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="carrera"
                angle={-50}
                textAnchor="end"
                height={210}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="count"
                name="Cantidad"
                fill="#8b5cf6"
              />
              <Bar
                yAxisId="right"
                dataKey="dscore"
                name="DScore Promedio"
                fill="#f43f5e"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};
