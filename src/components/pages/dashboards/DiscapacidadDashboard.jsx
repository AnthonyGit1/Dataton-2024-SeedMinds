import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Users, ActivitySquare, Gauge } from 'lucide-react';
import { ChartCard } from '../../ui/ChartCard';
import StatCard from '../../ui/StatCard';
import { CausasChart } from '../../charts/discapacidad/CausasChart';
import { DScoreChart } from '../../charts/discapacidad/DScoreChart';
import { PromedioChart } from '../../charts/discapacidad/PromedioChart';

const statsConfig = [
  {
    key: 'total_casos',
    title: 'Total Casos',
    icon: Users,
    iconColor: 'text-blue-600',
    description: 'Total de casos registrados',
    insight: {
      summary: 'Se han registrado 62,525 casos de discapacidad en total.',
      details: [
        'Representa la población total evaluada con diferentes tipos de discapacidad',
        'Incluye casos de todas las etapas de vida y niveles de dificultad',
        'Base significativa para análisis estadístico y toma de decisiones'
      ],
      recommendation: 'Mantener un registro continuo y detallado para mejorar el seguimiento y atención.'
    }
  },
  {
    key: 'causa_predominante',
    title: 'Causa Principal',
    icon: ActivitySquare,
    iconColor: 'text-green-600',
    description: 'Causa más frecuente',
    insight: {
      summary: 'La causa congénita es predominante con 27,270 casos (43.6%).',
      details: [
        'Casi la mitad de los casos tienen origen congénito',
        'Las causas adquiridas varían según la etapa de vida',
        'Importante para planificación de programas preventivos'
      ],
      recommendation: 'Fortalecer programas de atención temprana y prevención prenatal.'
    }
  },
  {
    key: 'promedio_dificultad',
    title: 'Promedio Dificultad',
    icon: Gauge,
    iconColor: 'text-purple-600',
    description: 'Nivel promedio de dificultad',
    insight: {
      summary: 'El nivel promedio de dificultad es 1.39 en una escala de 1 a 3.',
      details: [
        'Indica predominio de casos leves a moderados',
        'Varía significativamente según la causa',
        'Permite orientar recursos según necesidades'
      ],
      recommendation: 'Personalizar programas de apoyo según el nivel de dificultad de cada grupo.'
    }
  }
];

const chartInsights = {
  causas: {
    title: "Distribución por Causa",
    summary: "Análisis detallado de la distribución de causas de discapacidad",
    details: [
      "La causa congénita representa el 43.6% de todos los casos",
      "Las causas adquiridas en edad adulta son el segundo grupo más común (19.3%)",
      "Menor incidencia en causas adquiridas durante la niñez (8.6%)"
    ],
    recommendation: "Desarrollar programas específicos para cada tipo de causa, con énfasis en prevención y atención temprana."
  },
  dscore: {
    title: "Niveles de Dificultad",
    summary: "Distribución de los diferentes niveles de dificultad en la población",
    details: [
      "La mayoría de casos presentan dificultad leve o moderada",
      "Los casos severos requieren atención especializada",
      "La distribución varía según la causa de la discapacidad"
    ],
    recommendation: "Implementar protocolos de atención diferenciados según el nivel de dificultad."
  },
  promedio: {
    title: "Puntuación Promedio por Causa",
    summary: "Análisis comparativo del nivel de dificultad según la causa",
    details: [
      "Las causas adquiridas en juventud presentan mayor promedio de dificultad",
      "Los casos congénitos muestran niveles intermedios consistentes",
      "Existe variación significativa entre diferentes causas"
    ],
    recommendation: "Ajustar recursos y programas considerando la relación entre causa y nivel de dificultad."
  }
};

const DiscapacidadDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [causeResponse, scoreResponse, avgResponse] = await Promise.all([
          fetch('/data/discapacidad/conteo_causas.json'),
          fetch('/data/discapacidad/distribucion_dscore.json'),
          fetch('/data/discapacidad/puntuacion_promedio.json')
        ]);

        const causasData = await causeResponse.json();
        const scoreData = await scoreResponse.json();
        const avgData = await avgResponse.json();

        setData({
          conteo_causas: causasData,
          distribucion_dscore: scoreData,
          puntuacion_promedio: avgData,
          total_casos: Object.values(causasData).reduce((a, b) => a + b, 0)
        });
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Cargando estadísticas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard de Discapacidad
          </h1>
          <p className="text-gray-500 mt-2">
            Análisis detallado de los casos de discapacidad y sus características
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {statsConfig.map((stat) => (
            <StatCard
              key={stat.key}
              title={stat.title}
              value={
                stat.key === 'total_casos' 
                  ? data.total_casos.toLocaleString()
                  : stat.key === 'causa_predominante'
                    ? 'Congénita'
                    : '1.39'
              }
              description={stat.description}
              icon={stat.icon}
              iconColor={stat.iconColor}
              insight={stat.insight}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartCard 
            className="col-span-full"
            insight={chartInsights.causas}
          >
            <CausasChart data={data.conteo_causas} />
          </ChartCard>

          <ChartCard
            insight={chartInsights.dscore}
          >
            <DScoreChart data={data.distribucion_dscore} />
          </ChartCard>

          <ChartCard
            insight={chartInsights.promedio}
          >
            <PromedioChart data={data.puntuacion_promedio} />
          </ChartCard>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default DiscapacidadDashboard;