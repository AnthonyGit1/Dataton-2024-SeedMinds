// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import path from 'path';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const dashboards = [
    { 
      name: 'Análisis de Discapacidad',
      path: '/dashboard/discapacidad',
      description: 'Estadísticas de inclusión laboral'
    },
    { 
      name: 'Análisis de Experiencia',
      path: '/dashboard/experiencia',
      description: 'Requerimientos del mercado'
    },
    {
      name: 'Análisis de Educación',
      path: '/dashboard/educacion',
      description: 'Niveles de formación académica'
    },
    { 
      name: 'Análisis de Vacantes',
      path: '/dashboard/vacantes',
      description: 'Análisis del mercado laboral'
    },
    { 
      name: 'Análisis de Postulantes',
      path: '/dashboard/postulantes',
      description: 'Perfil de candidatos'
    },
    {
      name: 'Análisis General',
      path: '/dashboard/general',
      description: 'Resumen de datos'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={handleNavigation}>
              <img
                src="/images/logo.png"
                alt="SeedMinds Logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-xl font-bold text-gray-800">SeedMinds</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/') 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Inicio
            </Link>

            {/* Dashboards Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname.includes('/dashboard')
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Dashboards
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop Dropdown Menu */}
              <div
                className={`
                  absolute top-full left-0 w-72 bg-white rounded-lg shadow-lg border border-gray-100
                  transform transition-all duration-200 origin-top
                  ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}
                `}
                style={{ marginTop: '-1px' }} // Elimina el espacio entre el botón y el menú
              >
                <div className="py-2">
                  {dashboards.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-3 hover:bg-gray-50 ${
                        isActive(item.path) ? 'bg-purple-50' : ''
                      }`}
                      onClick={handleNavigation}
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              to="/team" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/team')
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Equipo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={handleNavigation}
              >
                Inicio
              </Link>

              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-600">
                  Dashboards
                </div>
                {dashboards.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium pl-6 ${
                      isActive(item.path)
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={handleNavigation}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/team"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/team')
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={handleNavigation}
              >
                Equipo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;