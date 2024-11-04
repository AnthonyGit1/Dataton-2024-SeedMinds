// src/components/pages/Team.jsx
import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const TeamMember = ({ name, role, tasks, image, githubUrl, linkedinUrl }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <div className="aspect-square overflow-hidden bg-gray-100">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-purple-600 mb-4">{role}</p>
      <ul className="space-y-2 mb-6">
        {tasks.map((task, index) => (
          <li key={index} className="text-gray-600 text-sm">
            • {task}
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        {githubUrl && (
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
            title="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        {linkedinUrl && (
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
            title="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const Team = () => {
  const teamMembers = [
    {
      name: 'Anthony Rosas',
      role: 'Desarrollador Backend',
      image: '/images/anthony.jpg',
      githubUrl: 'https://github.com/AnthonyGit1',
      linkedinUrl: 'https://www.linkedin.com/in/anthony-luis-rosas-pisco-75b53b273',
      tasks: [
        'Gestión de Bases de Datos',
        'Implementación de APIs',
        'Mantenimiento del Servidor'
      ]
    },
    {
      name: 'Joshelyn Riveros',
      role: 'Especialista en Calidad y UX',
      image: '/images/josh.jpg',
      githubUrl: 'https://github.com/joshRiveros',
      linkedinUrl: 'https://www.linkedin.com/in/joshelyn-riveros-pariona-380160145',
      tasks: [
        'Documentar el flujo del proyecto',
        'Validar la plataforma con usuarios',
        'Crear guías y tutoriales para el usuario'
      ]
    },
    {
      name: 'Jaci Lucas',
      role: 'Desarrolladora Frontend',
      image: '/images/jaci.png',
      githubUrl: 'https://github.com/JaciLucasEulogio',
      linkedinUrl: 'https://www.linkedin.com/in/jaci-lucas',
      tasks: [
        'Desarrollo de Interfaces de Usuario',
        'Optimización de Performance',
        'Colaboración en Diseño UX/UI'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conoce a nuestro equipo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hola! Somos el equipo <span className="text-purple-600 font-semibold">SeedMinds</span>. 
            Estudiantes de la Universidad Continental, nos apasiona la tecnología y los retos, 
            por eso hemos creado esta plataforma. ¡Conócenos!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;