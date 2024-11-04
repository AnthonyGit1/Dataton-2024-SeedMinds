// src/components/pages/dashboards/VacantesDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { TimelineChart } from '../../charts/vacantes/TimelineChart';
import { ExperienceChart } from '../../charts/vacantes/ExperienceChart';
import { GeographicChart } from '../../charts/vacantes/GeographicChart';
import { SkillsChart } from '../../charts/vacantes/SkillsChart';
import SectorChart from '../../charts/vacantes/SectorChart';
import { Users, Briefcase, Clock, Award } from 'lucide-react';
import StatCard from '../../ui/StatCard';
import { InsightButton, InsightModal } from '../../ui/InsightModal';

const statsConfig = [
  {
    key: 'total_vacantes',
    title: 'Total Vacantes',
    icon: Briefcase,
    iconColor: 'text-blue-600',
    description: 'Oportunidades laborales activas',
    insight: {
      summary: 'Se han analizado 418,553 vacantes en total, mostrando un mercado laboral activo.',
      details: [
        'Representa un incremento del 15% respecto al período anterior',
        'El 60% de las vacantes están concentradas en 3 sectores principales',
        'El mercado muestra una tendencia creciente en oportunidades laborales'
      ],
      recommendation: 'Enfocarse en sectores con mayor demanda para optimizar la búsqueda de empleo.'
    }
  },
  {
    key: 'total_postulantes',
    title: 'Total Postulantes',
    icon: Users,
    iconColor: 'text-green-600',
    description: 'Candidatos registrados',
    insight: {
      summary: '494,104 postulantes han participado en el proceso de selección.',
      details: [
        'Promedio de 1.18 postulantes por vacante',
        'Mayor participación en sectores tecnológicos y servicios',
        'El 45% de postulantes aplican a múltiples vacantes'
      ],
      recommendation: 'Mejorar la especificidad en las postulaciones para aumentar las tasas de éxito.'
    }
  },
  {
    key: 'promedio_duracion',
    title: 'Promedio Duración',
    icon: Clock,
    iconColor: 'text-purple-600',
    description: 'Tiempo promedio de publicación',
    insight: {
      summary: 'Las vacantes permanecen activas un promedio de 20.2 días.',
      details: [
        'El tiempo de publicación varía significativamente por sector',
        'Las posiciones más especializadas tienen mayor duración',
        'Existe correlación entre duración y requisitos específicos'
      ],
      recommendation: 'Optimizar los tiempos de publicación según el tipo de posición y sector.'
    }
  },
  {
    key: 'competencias_por_aviso',
    title: 'Competencias por Aviso',
    icon: Award,
    iconColor: 'text-orange-600',
    description: 'Promedio de habilidades requeridas',
    insight: {
      summary: 'En promedio, cada vacante requiere 5.7 competencias específicas.',
      details: [
        'Las competencias técnicas son las más solicitadas',
        'Habilidades blandas aparecen en el 80% de las vacantes',
        'Tendencia creciente en requisitos de competencias digitales'
      ],
      recommendation: 'Desarrollar un balance entre habilidades técnicas y blandas para aumentar empleabilidad.'
    }
  }
];

const chartInsights = {
  sector: {
    title: 'Distribución por Sectores',
    summary: 'Análisis de la distribución de vacantes por sector económico',
    details: [
      'Consultoría en RRHH lidera con la mayor cantidad de vacantes (71,120)',
      'Agricultura/Ganadería y Telecomunicaciones completan el top 3',
      'Los sectores tradicionales mantienen una demanda estable'
    ],
    recommendation: 'Identificar sectores emergentes y tradicionales para diversificar oportunidades laborales.'
  },
  timeline: {
    title: 'Evolución Temporal',
    summary: 'Tendencias en la publicación de vacantes a lo largo del tiempo',
    details: [
      'Picos de demanda laboral en períodos específicos del año',
      'Tendencia creciente en el último trimestre',
      'Estacionalidad marcada en ciertos sectores'
    ],
    recommendation: 'Planificar la búsqueda de empleo considerando los ciclos estacionales del mercado.'
  },
  geographic: {
    title: 'Distribución Geográfica',
    summary: 'Concentración de oportunidades por región',
    details: [
      'Lima concentra el mayor número de vacantes (26,761)',
      'Descentralización creciente hacia regiones principales',
      'Oportunidades emergentes en nuevos polos de desarrollo'
    ],
    recommendation: 'Considerar oportunidades en regiones con crecimiento emergente.'
  },
  experience: {
    title: 'Requisitos de Experiencia',
    summary: 'Análisis de requerimientos de experiencia laboral',
    details: [
      'El 39% no especifica requisitos de experiencia',
      'Solo el 4% requiere experiencia específica',
      'Tendencia hacia valoración de habilidades sobre experiencia'
    ],
    recommendation: 'Enfatizar habilidades y formación cuando la experiencia es limitada.'
  },
  skills: {
    title: 'Competencias más Solicitadas',
    summary: 'Análisis de las habilidades más demandadas en el mercado laboral',
    details: [
      'Las competencias técnicas específicas son altamente valoradas',
      'Se mantiene un balance entre habilidades técnicas y blandas',
      'Competencias digitales muestran una tendencia creciente',
      'Las habilidades de comunicación aparecen consistentemente en los requisitos'
    ],
    recommendation: 'Desarrollar un portafolio de competencias balanceado, con énfasis en las habilidades más demandadas del sector objetivo.'
  },
};

const ChartCard = ({ children, insight, title }) => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <Card className="bg-white shadow-lg relative">
      <div className="absolute top-4 right-4 z-10">
        <InsightButton onClick={() => setShowInsight(true)} />
      </div>
      {children}
      
      <InsightModal
        isOpen={showInsight}
        onClose={() => setShowInsight(false)}
        title={`Insights: ${title}`}
      >
        <div className="space-y-4">
          <p className="text-lg text-gray-700 font-medium">{insight.summary}</p>
          <div className="space-y-2">
            {insight.details.map((detail, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-purple-600">•</span>
                <p className="text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Recomendación</h4>
            <p className="text-purple-700">{insight.recommendation}</p>
          </div>
        </div>
      </InsightModal>
    </Card>
  );
};

const VacantesDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch('/data/vacantes/resultados_analisis.json');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error cargando las estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
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
            Dashboard de Vacantes Laborales
          </h1>
          <p className="text-gray-500 mt-2">
            Análisis detallado de las vacantes y postulaciones en el mercado laboral peruano
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-4">
          {statsConfig.map((stat) => (
            <StatCard
              key={stat.key}
              title={stat.title}
              value={stat.key.includes('duracion') 
                ? `${stats[stat.key]?.toFixed(1)} días`
                : stats[stat.key]?.toLocaleString()}
              description={stat.description}
              icon={stat.icon}
              iconColor={stat.iconColor}
              insight={stat.insight}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-full">
            <ChartCard insight={chartInsights.sector} title="Distribución por Sectores">
              <SectorChart data={stats?.vacantes_por_sector || {}} />
            </ChartCard>
          </div>

          <div className="col-span-full">
            <ChartCard insight={chartInsights.skills} title="Competencias más Solicitadas">
              <SkillsChart data={stats?.competencias_principales || {}} />
            </ChartCard>
          </div>

          <div className="col-span-full">
            <ChartCard insight={chartInsights.timeline} title="Evolución Temporal">
              <TimelineChart data={stats?.vacantes_por_mes || {}} />
            </ChartCard>
          </div>

          <div className="lg:col-span-1">
            <ChartCard insight={chartInsights.geographic} title="Distribución Geográfica">
              <GeographicChart data={stats?.top_departamentos || {}} />
            </ChartCard>
          </div>

          <div className="lg:col-span-1">
            <ChartCard insight={chartInsights.experience} title="Requisitos de Experiencia">
              <ExperienceChart data={stats?.distribucion_experiencia || {}} />
            </ChartCard>
          </div>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default VacantesDashboard;