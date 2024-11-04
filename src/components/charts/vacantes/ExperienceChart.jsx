import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const ExperienceChart = ({ data }) => {
  const experienceData = Object.entries(data)
    .map(([tipo, cantidad]) => ({
      tipo,
      cantidad: Number(cantidad)
    }));

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Distribución por Experiencia
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Requisitos de experiencia por vacante
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={experienceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="tipo" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(222.2 84% 4.9%)',
                  border: '1px solid hsl(217.2 32.6% 17.5%)',
                  borderRadius: '4px'
                }}
              />
              <Bar dataKey="cantidad" fill="#A78BFA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};