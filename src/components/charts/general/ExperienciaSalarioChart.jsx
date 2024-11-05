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

export const ExperienciaSalarioChart = ({ data }) => {
  const processedData = useMemo(() => {
    if (!data) return [];
    return Object.values(data).map((item) => ({
      departamento: item.DEPARTAMENTO,
      carrera: item.CARRERA_CORREGIDA,
      experiencia: parseFloat(item.AÑOS_EXP).toFixed(2),
      salario: parseFloat(item.SALARIO_PROM).toFixed(2),
    }));
  }, [data]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Relación Experiencia-Salario por Departamento
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Análisis de salarios según años de experiencia
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <BarChart data={processedData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="departamento" type="category" width={120} />
              <Tooltip />
              <Legend />
              <Bar dataKey="salario" name="Salario Promedio" fill="#4ade80" />
              <Bar
                dataKey="experiencia"
                name="Años de Experiencia"
                fill="#f97316"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </>
  );
};
