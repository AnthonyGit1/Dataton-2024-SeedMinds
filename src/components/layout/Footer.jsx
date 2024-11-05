import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

const SocialLink = ({ href, icon: Icon, label, hoverColor }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-400 hover:${hoverColor} transition-colors`}
    title={label}
  >
    <Icon className="h-5 w-5" />
  </a>
);

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/qhatulab",
      icon: Linkedin,
      label: "LinkedIn",
      hoverColor: "text-blue-600"
    },
    {
      href: "https://www.instagram.com/qhatulab",
      icon: Instagram,
      label: "Instagram",
      hoverColor: "text-pink-600"
    },
    {
      href: "https://x.com/QhatuLab",
      icon: Twitter,
      label: "X (Twitter)",
      hoverColor: "text-gray-900"
    },
    {
      href: "https://www.facebook.com/profile.php?id=61567284346378",
      icon: Facebook,
      label: "Facebook",
      hoverColor: "text-blue-800"
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <img
                className="h-8 w-8 rounded-full mr-2"
                src="/images/logo.png"
                alt="Logo"
              />
              <span className="text-xl font-bold text-gray-800">SeedMinds</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Plataforma de análisis del mercado laboral peruano, desarrollada por 
              estudiantes de la Universidad Continental.
            </p>
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.href}
                  icon={social.icon}
                  label={social.label}
                  hoverColor={social.hoverColor}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Dashboards</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard/discapacidad" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Análisis de Discapacidad
                </Link>
              </li>
              <li>
                <Link to="/dashboard/experiencia" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Análisis de Experiencia
                </Link>
              </li>
              <li>
                <Link to="/dashboard/educacion" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Análisis de Educación
                </Link>
              </li>
              <li>
                <Link to="/dashboard/vacantes" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Análisis de Vacantes
                </Link>
              </li>
              <li>
                <Link to="/dashboard/postulantes" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Análisis de Postulantes
                </Link>
              </li>
              <li>
                <Link to="/dashboard/general" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Análisis General
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Equipo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 SeedMinds. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;