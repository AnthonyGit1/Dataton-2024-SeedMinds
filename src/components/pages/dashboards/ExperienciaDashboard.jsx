import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Briefcase, Timer, DollarSign, Building } from 'lucide-react';
import StatCard from '../../ui/StatCard';
import { ChartCard } from '../../ui/ChartCard';
import { SalarioPromChart } from '../../charts/experiencia/SalarioPromChart';
import { EmpresasPostulantesChart } from '../../charts/experiencia/EmpresasPostulantesChart';
import { SalarioEmpresaChart } from '../../charts/experiencia/SalarioEmpresaChart';
import { DuracionChart } from '../../charts/experiencia/DuracionChart';

const statsConfig = [
  {
    key: "salario_promedio",
    title: "Salario Promedio",
    icon: DollarSign,
    iconColor: "text-green-600",
    description: "Salario promedio mensual",
    insight: {
      summary: "El salario promedio mensual es S/. 1,728.86",
      details: [
        "Este promedio considera todas las experiencias laborales registradas",
        "Representa el nivel promedio de compensación en el mercado",
        "Sirve como referencia para negociaciones salariales"
      ],
      recommendation: "Usar este promedio como punto de referencia para evaluar ofertas laborales."
    }
  },
  {
    key: "duracion_promedio",
    title: "Duración Promedio",
    icon: Timer,
    iconColor: "text-blue-600",
    description: "Tiempo promedio en empleos",
    insight: {
      summary: "La permanencia promedio es de 20.5 meses",
      details: [
        "Indica una tendencia de estabilidad laboral moderada",
        "Varía significativamente entre sectores y empresas",
        "Refleja el ciclo típico de desarrollo profesional"
      ],
      recommendation: "Considerar este tiempo como referencia para planificar el desarrollo profesional."
    }
  },
  {
    key: "empresas_total",
    title: "Total Empresas",
    icon: Building,
    iconColor: "text-purple-600",
    description: "Empresas analizadas",
    insight: {
      summary: "Se analizaron más de 150 empresas",
      details: [
        "Representan diversos sectores del mercado",
        "Incluye empresas de diferentes tamaños",
        "Proporciona una visión amplia del mercado laboral"
      ],
      recommendation: "Explorar oportunidades en diferentes tipos de empresas para diversificar experiencia."
    }
  }
];

const chartInsights = {
  salarios: {
    title: "Distribución Salarial",
    summary:
      "Análisis detallado de la distribución salarial en el mercado laboral",
    details: [
      "El salario promedio es de S/. 1,728.86",
      "Existe una alta variabilidad en los rangos salariales",
      "Los salarios más altos se concentran en sectores específicos",
    ],
    recommendation:
      "Considerar el salario promedio del mercado como referencia para negociaciones y evaluar la competitividad de las ofertas laborales.",
  },
  empresas: {
    title: "Empresas más Demandadas",
    summary: "Análisis de las empresas con mayor atracción de talento",
    details: [
      "La empresa líder tiene 1,789 postulantes",
      "Las top 10 empresas concentran una parte significativa de las postulaciones",
      "Existe una distribución variada entre diferentes sectores",
    ],
    recommendation:
      "Evaluar las empresas más demandadas para identificar mejores oportunidades laborales y entender sus prácticas de atracción de talento.",
  },
  duracion: {
    title: "Permanencia Laboral",
    summary: "Análisis del tiempo de permanencia en los empleos",
    details: [
      "La duración promedio es de 20.5 meses",
      "Existe una tendencia hacia la permanencia a mediano plazo",
      "Se observan variaciones significativas por sector y empresa",
    ],
    recommendation:
      "Considerar la duración promedio como indicador de estabilidad laboral y factor en la toma de decisiones de carrera.",
  },
  salarioEmpresa: {
    title: "Salarios por Empresa",
    summary: "Análisis comparativo de salarios entre empresas",
    details: [
      "Notable variación en la compensación entre empresas",
      "Las mejores empresas pagadoras ofrecen salarios significativamente superiores",
      "Existe correlación entre el tamaño de la empresa y los niveles salariales",
    ],
    recommendation:
      "Considerar el panorama completo de compensaciones al evaluar oportunidades laborales en diferentes empresas.",
  },
};

const ExperienciaDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          salarioPromResponse,
          empresasResponse,
          salarioEmpresaResponse,
          duracionResponse,
        ] = await Promise.all([
          fetch("/data/experiencia/salario_promedio.json"),
          fetch("/data/experiencia/empresas_mas_postulantes.json"),
          fetch("/data/experiencia/salario_por_empresa.json"),
          fetch("/data/experiencia/duracion_experiencia.json"),
        ]);

        const salarioPromData = await salarioPromResponse.json();
        const empresasData = await empresasResponse.json();
        const salarioEmpresaData = await salarioEmpresaResponse.json();
        const duracionData = await duracionResponse.json();

        // Asegurarse de que los datos sean arrays
        const salariosArray = Array.isArray(salarioPromData)
          ? salarioPromData
          : Object.values(salarioPromData);

        // Calcular el promedio salarial
        const salariosValidos = salariosArray.filter(
          (salario) => salario && !isNaN(salario) && salario > 0
        );
        const promedioSalarial =
          salariosValidos.length > 0
            ? Math.round(
                salariosValidos.reduce((a, b) => a + b, 0) /
                  salariosValidos.length
              )
            : 0;

        setData({
          salario_promedio: promedioSalarial,
          salarios_distribucion: salariosValidos,
          empresas_postulantes: empresasData,
          salario_empresa: salarioEmpresaData,
          duracion: duracionData,
        });
      } catch (error) {
        console.error("Error cargando datos:", error);
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
            Dashboard de Experiencia Laboral
          </h1>
          <p className="text-gray-500 mt-2">
            Análisis detallado de experiencias laborales, salarios y tendencias
            del mercado
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {statsConfig.map((stat) => (
            <StatCard
              key={stat.key}
              title={stat.title}
              value={
                stat.key === "salario_promedio"
                  ? data.salario_promedio > 0
                    ? `S/. ${data.salario_promedio.toLocaleString()}`
                    : "No disponible"
                  : stat.key === "duracion_promedio"
                  ? "20.5 meses"
                  : "150+"
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
          <ChartCard className="col-span-full" insight={chartInsights.salarios}>
            <SalarioPromChart data={data?.salarios_distribucion || []} />
          </ChartCard>

          <ChartCard className="col-span-full" insight={chartInsights.empresas}>
            <EmpresasPostulantesChart data={data?.empresas_postulantes} />
          </ChartCard>

          <ChartCard insight={chartInsights.salarioEmpresa}>
            <SalarioEmpresaChart data={data?.salario_empresa} />
          </ChartCard>

          <ChartCard insight={chartInsights.duracion}>
            <DuracionChart data={data?.duracion} />
          </ChartCard>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default ExperienciaDashboard;
