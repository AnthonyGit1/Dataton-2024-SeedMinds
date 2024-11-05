import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CardHeader, CardTitle, CardContent } from "../../ui/card";

export const SalarioMaximoChart = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data) return [];
    return Object.values(data)
      .map((item) => ({
        carrera: item.CARRERA_CORREGIDA,
        salario: item.SALARIO_MAX,
      }))
      .sort((a, b) => b.salario - a.salario);
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Salarios Máximos por Carrera
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Ranking de carreras por salario máximo
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={processedData}
              layout="vertical"
              margin={{ left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="carrera" type="category" width={150} />
              <Tooltip
                formatter={(value) => [
                  `S/. ${value.toLocaleString()}`,
                  "Salario Máximo",
                ]}
              />
              <Bar dataKey="salario" fill="#4ade80" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};
