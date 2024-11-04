import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Building } from 'lucide-react';
import { ChartCard } from '../../ui/ChartCard';
import StatCard from '../../ui/StatCard';
import { CarrerasTopChart } from '../../charts/educacion/CarrerasTopChart';
import { ProporcionCarrerasChart } from '../../charts/educacion/ProporcionCarrerasChart';

const statsConfig = [
  {
    key: "total_carreras",
    title: "Total Carreras",
    icon: BookOpen,
    iconColor: "text-violet-500",
    description: "Diferentes carreras registradas",
    insight: {
      summary: "Se registran 15,049 carreras diferentes en el sistema",
      details: [
        "Amplia diversidad de opciones educativas",
        "Cobertura de múltiples áreas de estudio",
        "Base para análisis de demanda educativa"
      ],
      recommendation: "Mantener actualizado el catálogo de carreras y monitorear tendencias."
    }
  },
  {
    key: "total_grados",
    title: "Total Grados",
    icon: GraduationCap,
    iconColor: "text-pink-500",
    description: "Grados académicos diferentes",
    insight: {
      summary: "Se cuentan con 4,280 grados académicos distintos",
      details: [
        "Variedad de niveles educativos",
        "Diferentes especialidades y menciones",
        "Oportunidades de especialización"
      ],
      recommendation: "Evaluar la pertinencia y demanda de cada grado académico."
    }
  },
  {
    key: "total_instituciones",
    title: "Total Instituciones",
    icon: Building,
    iconColor: "text-cyan-500",
    description: "Instituciones educativas diferentes",
    insight: {
      summary: "46,839 instituciones educativas registradas",
      details: [
        "Amplia cobertura institucional",
        "Diversidad de ofertas educativas",
        "Presencia en diferentes regiones"
      ],
      recommendation: "Fortalecer la calidad educativa en todas las instituciones."
    }
  }
];

const chartInsights = {
  carreras: {
    title: "Carreras más Demandadas",
    summary: "Análisis de las carreras con mayor número de postulantes",
    details: [
      "Administración lidera la demanda con 15,850 postulantes",
      "Las carreras empresariales dominan el top 3",
      "Fuerte presencia de carreras de ingeniería",
      "Tendencia hacia carreras con enfoque tecnológico"
    ],
    recommendation: "Fortalecer la oferta educativa en las áreas de mayor demanda manteniendo estándares de calidad."
  },
  proporcion: {
    title: "Distribución de Carreras",
    summary: "Análisis porcentual de la distribución de postulantes",
    details: [
      "Administración representa el 12.45% del total",
      "Las top 5 carreras suman más del 40%",
      "Concentración en áreas empresariales",
      "Diversificación en carreras tecnológicas"
    ],
    recommendation: "Promover mayor diversificación en la elección de carreras y fortalecer carreras emergentes."
  }
};

const EducacionDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cantidadResponse, proporcionResponse] = await Promise.all([
          fetch('/data/educacion/cantidad_postulantes_carrera.json'),
          fetch('/data/educacion/proporcion_postulantes_carrera.json')
        ]);

        const [cantidadData, proporcionData] = await Promise.all([
          cantidadResponse.json(),
          proporcionResponse.json()
        ]);

        setData({
          cantidad: cantidadData,
          proporcion: proporcionData
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
            Dashboard de Educación
          </h1>
          <p className="text-gray-500 mt-2">
            Análisis detallado de la distribución de carreras y postulantes
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {statsConfig.map(stat => {
            const { key, ...statProps } = stat;
            const value = 
              key === 'total_carreras' ? '15,049' :
              key === 'total_grados' ? '4,280' :
              '46,839';

            return (
              <StatCard
                key={key}
                {...statProps}
                value={value}
              />
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartCard 
            className="lg:col-span-2"
            insight={chartInsights.carreras}
          >
            <CarrerasTopChart data={data.cantidad} />
          </ChartCard>

          <ChartCard 
            className="lg:col-span-2"
            insight={chartInsights.proporcion}
          >
            <ProporcionCarrerasChart data={data.proporcion} />
          </ChartCard>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default EducacionDashboard;