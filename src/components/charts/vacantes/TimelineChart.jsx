import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const TimelineChart = ({ data }) => {
  const timelineData = Object.entries(data)
    .map(([month, vacantes]) => ({
      month,
      vacantes: Number(vacantes)
    }))
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Evolución Temporal de Vacantes
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Tendencia mensual de publicación de vacantes
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
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
              <Line 
                type="monotone" 
                dataKey="vacantes" 
                stroke="#60A5FA" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};