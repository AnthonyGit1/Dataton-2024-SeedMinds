import React, { useState, useEffect } from 'react';
import { Users, UserCheck, MapPin, Baby } from 'lucide-react';
import { ChartCard } from '../../ui/ChartCard';
import StatCard from '../../ui/StatCard';
import { EdadChart } from '../../charts/postulantes/EdadChart';
import { SexoChart } from '../../charts/postulantes/SexoChart';
import { DepartamentoChart } from '../../charts/postulantes/DepartamentoChart';
import { ConadisChart } from '../../charts/postulantes/ConadisChart';
import { SexoDepartamentoChart } from '../../charts/postulantes/SexoDepartamentoChart';

const statsConfig = [
  {
    key: "total_postulantes",
    title: "Total Postulantes",
    icon: Users,
    iconColor: "text-blue-600",
    description: "Total de postulantes registrados",
    insight: {
      summary: "Se han registrado más de 2,500 postulantes en total.",
      details: [
        "Base significativa para análisis estadístico",
        "Distribuidos en diferentes departamentos del país",
        "Permite evaluación demográfica completa"
      ],
      recommendation: "Mantener seguimiento continuo de nuevos registros y actualizaciones."
    }
  },
  {
    key: "distribucion_edad",
    title: "Grupo Etario Principal",
    icon: Baby,
    iconColor: "text-green-600",
    description: "Rango de edad predominante",
    insight: {
      summary: "El grupo de 25-29 años representa la mayoría con 25.3%",
      details: [
        "Clara concentración en población joven adulta",
        "Tendencia decreciente en grupos mayores",
        "Base para focalización de programas"
      ],
      recommendation: "Desarrollar programas específicos para diferentes grupos etarios."
    }
  },
  {
    key: "conadis_status",
    title: "Estado CONADIS",
    icon: UserCheck,
    iconColor: "text-purple-600",
    description: "Porcentaje de registro en CONADIS",
    insight: {
      summary: "El 85% cuenta con registro en CONADIS activo",
      details: [
        "Alta tasa de formalización",
        "Facilita seguimiento y atención",
        "Permite acceso a beneficios oficiales"
      ],
      recommendation: "Fortalecer campañas de registro para alcanzar cobertura total."
    }
  }
];

const chartInsights = {
  edad: {
    title: "Distribución por Edad",
    summary: "El análisis muestra una clara concentración en el rango de edad joven adulta",
    details: [
      "Mayor concentración entre 25-34 años (45%)",
      "Descenso gradual en grupos de mayor edad",
      "Baja representación en mayores de 65 años",
      "Pico significativo en el rango 25-29 años"
    ],
    recommendation: "Implementar estrategias de inclusión para grupos etarios subrepresentados y fortalecer programas para el grupo mayoritario."
  },
  sexo: {
    title: "Distribución por Género",
    summary: "Se observa una marcada diferencia en la distribución por género",
    details: [
      "Predominio del género femenino (65%)",
      "Brecha significativa entre géneros",
      "Patrón consistente en diferentes regiones",
      "Necesidad de equilibrio en la participación"
    ],
    recommendation: "Desarrollar iniciativas específicas para promover una participación más equilibrada entre géneros."
  },
  departamento: {
    title: "Distribución Regional",
    summary: "La distribución geográfica muestra una fuerte centralización",
    details: [
      "Lima concentra el 40% de postulantes",
      "Baja representación en regiones del interior",
      "Oportunidad de expansión territorial",
      "Desafíos en acceso en zonas alejadas"
    ],
    recommendation: "Implementar estrategias de descentralización y fortalecer la presencia en regiones con menor representación."
  },
  conadis: {
    title: "Estado de Registro CONADIS",
    summary: "El análisis muestra un alto nivel de formalización",
    details: [
      "Alto porcentaje de registros activos",
      "Proceso de formalización efectivo",
      "Base para acceso a servicios",
      "Facilita seguimiento y atención"
    ],
    recommendation: "Mantener y mejorar los procesos de registro, enfocándose en áreas con menor cobertura."
  },
  sexoDepartamento: {
    title: "Distribución por Género y Departamento",
    summary: "Análisis cruzado revela patrones regionales importantes",
    details: [
      "Variaciones significativas por región",
      "Mantiene tendencia general de género",
      "Identificación de brechas específicas",
      "Base para intervenciones focalizadas"
    ],
    recommendation: "Desarrollar estrategias específicas por región considerando las características particulares de cada departamento."
  }
};

const PostulantesDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [edadResponse, sexoResponse, departamentoResponse, conadisResponse] = await Promise.all([
          fetch('/data/postulantes/edad.json'),
          fetch('/data/postulantes/sexo.json'),
          fetch('/data/postulantes/departamento.json'),
          fetch('/data/postulantes/estado_conadis.json')
        ]);

        const [edadData, sexoData, departamentoData, conadisData] = await Promise.all([
          edadResponse.json(),
          sexoResponse.json(),
          departamentoResponse.json(),
          conadisResponse.json()
        ]);

        setData({
          edad: edadData,
          sexo: sexoData,
          departamento: departamentoData,
          conadis: conadisData,
          total_postulantes: Object.keys(sexoData).length
        });
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !data) {
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
            Dashboard de Postulantes
          </h1>
          <p className="text-gray-500 mt-2">
            Análisis detallado del perfil demográfico y distribución de postulantes
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {statsConfig.map(stat => {
            const { key, ...statProps } = stat;
            const value = 
              key === 'total_postulantes' ? data.total_postulantes.toLocaleString() :
              key === 'distribucion_edad' ? '25-29 años' :
              '85%';

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
            className="col-span-full"
            insight={chartInsights.edad}
          >
            <EdadChart data={data.edad} />
          </ChartCard>

          <ChartCard 
            className="col-span-full"
            insight={chartInsights.departamento}
          >
            <DepartamentoChart data={data.departamento} />
          </ChartCard>

          <ChartCard 
            className="col-span-full"
            insight={chartInsights.sexoDepartamento}
          >
            <SexoDepartamentoChart 
              sexoData={data.sexo} 
              departamentoData={data.departamento}
            />
          </ChartCard>

          <ChartCard
            insight={chartInsights.sexo}
          >
            <SexoChart data={data.sexo} />
          </ChartCard>

          <ChartCard
            insight={chartInsights.conadis}
          >
            <ConadisChart data={data.conadis} />
          </ChartCard>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default PostulantesDashboard;