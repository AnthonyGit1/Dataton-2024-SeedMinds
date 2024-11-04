// src/components/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Activity, Search, ChartBar, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section - Mejorado */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-20 text-center">
          <span className="text-purple-600 font-semibold mb-4 bg-purple-50 px-4 py-1 rounded-full">
            DataPerú Insights
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Creando Oportunidades:
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Análisis del Mercado Laboral en Perú
            </span>
            <br />
            para Personas con Discapacidad
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Exploramos y analizamos las tendencias laborales para promover la inclusión 
            y la igualdad de oportunidades en el mercado laboral peruano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard/postulantes"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Explorar Dashboards
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/team"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all shadow-lg hover:shadow-xl"
            >
              Conocer al Equipo
              <Users className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Features Section - Mejorado */}
        <div className="py-20">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold mb-2 inline-block">
              Análisis Integral
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Características Principales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Herramientas avanzadas para comprender y mejorar la inclusión laboral.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-14 w-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <ChartBar className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Análisis Estadístico
              </h3>
              <p className="text-gray-600">
                Datos precisos y visualizaciones interactivas que revelan patrones 
                y oportunidades en el mercado laboral inclusivo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Monitoreo en Tiempo Real
              </h3>
              <p className="text-gray-600">
                Seguimiento actualizado de vacantes, requisitos y oportunidades
                laborales para personas con discapacidad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-14 w-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Insights Estratégicos
              </h3>
              <p className="text-gray-600">
                Descubre tendencias clave y áreas de oportunidad para promover
                la inclusión laboral efectiva.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section - Mejorado */}
        <div className="py-20 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl font-bold text-purple-600 mb-2">400K+</div>
              <div className="text-gray-600 font-medium">Vacantes Analizadas</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl font-bold text-purple-600 mb-2">500K+</div>
              <div className="text-gray-600 font-medium">Postulantes</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Sectores</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl font-bold text-purple-600 mb-2">24</div>
              <div className="text-gray-600 font-medium">Departamentos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;