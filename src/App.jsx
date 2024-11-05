import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Team from './components/pages/Team';
import VacantesDashboard from './components/pages/dashboards/VacantesDashboard';
import DiscapacidadDashboard from './components/pages/dashboards/DiscapacidadDashboard';
import ExperienciaDashboard from './components/pages/dashboards/ExperienciaDashboard';
import EducacionDashboard from './components/pages/dashboards/EducacionDashboard';
import PostulantesDashboard from './components/pages/dashboards/PostulantesDashboard';
import GeneralDashboard from './components/pages/dashboards/GeneralDashboard';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-[1600px] mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/dashboard/vacantes" element={<VacantesDashboard />} />
          <Route path="/dashboard/discapacidad" element={<DiscapacidadDashboard />} />
          <Route path="/dashboard/experiencia" element={<ExperienciaDashboard />} />
          <Route path="/dashboard/educacion" element={<EducacionDashboard />} />
          <Route path="/dashboard/postulantes" element={<PostulantesDashboard />} />
          <Route path="/dashboard/general" element={<GeneralDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;