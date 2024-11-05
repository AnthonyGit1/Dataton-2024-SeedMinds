import React, { useMemo } from "react";
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

export const CarreraGeneroChart = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data) return [];

    const countMap = data.reduce((acc, [carrera, genero]) => {
      if (!acc[carrera]) {
        acc[carrera] = { carrera, M: 0, F: 0 };
      }
      acc[carrera][genero]++;
      return acc;
    }, {});

    return Object.values(countMap)
      .sort((a, b) => b.M + b.F - (a.M + a.F))
      .slice(0, 10);
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución de Género por Carrera
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Top 10 carreras y su distribución por género
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="M" name="Masculino" fill="#93c5fd" />
              <Bar dataKey="F" name="Femenino" fill="#f9a8d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};