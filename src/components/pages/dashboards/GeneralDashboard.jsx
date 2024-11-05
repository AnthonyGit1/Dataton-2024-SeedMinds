import React, { useState, useEffect } from "react";
import { BookOpen, Brain, DollarSign } from "lucide-react";
import { ChartCard } from "../../ui/ChartCard";
import StatCard from "../../ui/StatCard";
import { CarreraCausaChart } from "../../charts/general/CarreraCausaChart";
import { CarreraDepartamentoChart } from "../../charts/general/CarreraDepartamentoChart";
import { CarreraGeneroChart } from "../../charts/general/CarreraGeneroChart";
import { ExperienciaSalarioChart } from "../../charts/general/ExperienciaSalarioChart";
import { SalarioMaximoChart } from "../../charts/general/SalarioMaximoChart";

const statsConfig = [
  {
    key: "carrera_principal",
    title: "Carrera Principal",
    icon: BookOpen,
    iconColor: "text-blue-600",
    description: "Carrera más demandada",
    insight: {
      summary: "Administración de Empresas es la carrera más solicitada",
      details: [
        "Representa el 25% del total de postulantes",
        "Fuerte presencia en el sector empresarial",
        "Alta empleabilidad en diversos sectores",
      ],
      recommendation:
        "Potenciar especializaciones en áreas emergentes de administración",
    },
  },
  {
    key: "promedio_experiencia",
    title: "Experiencia Promedio",
    icon: Brain,
    iconColor: "text-purple-600",
    description: "Años promedio de experiencia",
    insight: {
      summary: "La experiencia promedio refleja madurez profesional",
      details: [
        "Promedio balanceado entre junior y senior",
        "Distribución equilibrada por sectores",
        "Experiencia alineada con el mercado",
      ],
      recommendation:
        "Implementar programas de mentoring y desarrollo de carrera",
    },
  },
  {
    key: "salario_maximo",
    title: "Salario Máximo",
    icon: DollarSign,
    iconColor: "text-green-600",
    description: "Salario más alto registrado",
    insight: {
      summary: "Los salarios top alcanzan S/. 10,000",
      details: [
        "Concentrado en roles directivos",
        "Predominante en tecnología y finanzas",
        "Refleja alta especialización",
      ],
      recommendation:
        "Desarrollar planes de carrera hacia roles de alta especialización",
    },
  },
];

const chartInsights = {
  genero: {
    title: "Distribución por Género",
    summary: "Análisis detallado de la equidad de género por carrera",
    details: [
      "Tendencias de paridad en carreras técnicas",
      "Mayor presencia femenina en ciencias sociales",
      "Oportunidades de balance en tecnología",
    ],
    recommendation:
      "Impulsar programas de inclusión y diversidad en áreas subrepresentadas",
  },
  causa: {
    title: "Análisis por Tipo de Carrera",
    summary: "Distribución y tendencias por área profesional",
    details: [
      "Dominancia del sector empresarial",
      "Crecimiento en carreras tecnológicas",
      "Nichos emergentes en sectores específicos",
    ],
    recommendation:
      "Diversificar la oferta formativa según demanda del mercado",
  },
  departamento: {
    title: "Cobertura Regional",
    summary: "Mapeo de oportunidades por región",
    details: [
      "Lima concentra el 60% de postulantes",
      "Potencial de crecimiento en regiones",
      "Necesidad de descentralización",
    ],
    recommendation: "Desarrollar programas de alcance regional",
  },
  experienciaSalario: {
    title: "Correlación Experiencia-Salario",
    summary: "Análisis de la progresión salarial",
    details: [
      "Incremento significativo post 5 años",
      "Variación por especialización",
      "Premios a la experiencia específica",
    ],
    recommendation:
      "Establecer bandas salariales basadas en experiencia y habilidades",
  },
  salarioMaximo: {
    title: "Topes Salariales por Carrera",
    summary: "Análisis comparativo de remuneraciones máximas",
    details: [
      "Tecnología lidera los salarios top",
      "Brecha significativa entre sectores",
      "Influencia de la especialización",
    ],
    recommendation: "Promover especialización en áreas de alta remuneración",
  },
};

const GeneralDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          carreraGeneroResponse,
          carreraCausaResponse,
          carreraDepartamentoResponse,
          experienciaSalarioResponse,
          salarioMaximoResponse,
        ] = await Promise.all([
          fetch("/data/general/cantidad_postulantes_carrera_genero.json"),
          fetch("/data/general/relacion_carrera_causa_dscore.json"),
          fetch("/data/general/relacion_carrera_departamento.json"),
          fetch("/data/general/experiencia_salario.json"),
          fetch("/data/general/salario_max_carrera.json"),
        ]);

        const [
          carreraGeneroData,
          carreraCausaData,
          carreraDepartamentoData,
          experienciaSalarioData,
          salarioMaximoData,
        ] = await Promise.all([
          carreraGeneroResponse.json(),
          carreraCausaResponse.json(),
          carreraDepartamentoResponse.json(),
          experienciaSalarioResponse.json(),
          salarioMaximoResponse.json(),
        ]);

        setData({
          carreraGenero: carreraGeneroData,
          carreraCausa: carreraCausaData,
          carreraDepartamento: carreraDepartamentoData,
          experienciaSalario: experienciaSalarioData,
          salarioMaximo: salarioMaximoData,
        });
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatsValue = (key) => {
    if (!data) return "Cargando...";

    switch (key) {
      case "carrera_principal": {
        const carrerasCount = {};
        data.carreraGenero.forEach(([carrera]) => {
          carrerasCount[carrera] = (carrerasCount[carrera] || 0) + 1;
        });
        const carreraPrincipal = Object.entries(carrerasCount).sort(
          (a, b) => b[1] - a[1]
        )[0];
        return carreraPrincipal ? carreraPrincipal[0] : "N/A";
      }
      case "promedio_experiencia": {
        if (!data.experienciaSalario) return "N/A";
        const experiencias = Object.values(data.experienciaSalario)
          .map((item) => parseFloat(item.AÑOS_EXP))
          .filter((exp) => exp >= 0 && exp <= 50); // Filtrar valores razonables
        const promedio =
          experiencias.reduce((a, b) => a + b, 0) / experiencias.length;
        return `${promedio.toFixed(1)} años`;
      }
      case "salario_maximo": {
        if (!data.salarioMaximo) return "N/A";
        const maxSalario = Math.max(
          ...Object.values(data.salarioMaximo).map((item) => item.SALARIO_MAX)
        );
        return `S/. ${maxSalario.toLocaleString()}`;
      }
      default:
        return "N/A";
    }
  };

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
            Dashboard General
          </h1>
          <p className="text-gray-500 mt-2">
            Análisis integral de postulantes, carreras, experiencia y salarios
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {statsConfig.map((stat) => {
            const { key, ...statProps } = stat;
            return (
              <StatCard key={key} {...statProps} value={getStatsValue(key)} />
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartCard className="lg:col-span-2" insight={chartInsights.genero}>
            <CarreraGeneroChart data={data.carreraGenero} />
          </ChartCard>

          <ChartCard className="lg:col-span-2" insight={chartInsights.causa}>
            <CarreraCausaChart data={data.carreraCausa} />
          </ChartCard>

          <ChartCard
            className="lg:col-span-2"
            insight={chartInsights.experienciaSalario}
          >
            <ExperienciaSalarioChart data={data.experienciaSalario} />
          </ChartCard>

          <ChartCard insight={chartInsights.departamento}>
            <CarreraDepartamentoChart data={data.carreraDepartamento} />
          </ChartCard>

          <ChartCard insight={chartInsights.salarioMaximo}>
            <SalarioMaximoChart data={data.salarioMaximo} />
          </ChartCard>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default GeneralDashboard;
