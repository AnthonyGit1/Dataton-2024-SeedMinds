```markdown
# Dataton 2024 - Dashboard de Análisis Social 📊

![SeedMinds Banner](/public/images/banner.png)

## 📑 Índice
- [Descripción](#-descripción)
- [Dashboards](#-dashboards)
- [Tecnologías](#-tecnologías)
- [Estructura](#-estructura)
- [Equipo](#-equipo)
- [Instalación](#-instalación)
- [Licencia](#-licencia)

## 🎯 Descripción

Dashboard interactivo desarrollado para el Dataton 2024, enfocado en el análisis y visualización de datos sociales en Perú. La plataforma proporciona insights sobre postulantes, educación, discapacidad, experiencia laboral y vacantes, facilitando la toma de decisiones basada en datos.

## 📊 Dashboards

1. **Dashboard de Postulantes**
   - Análisis demográfico
   - Distribución por departamentos
   - Estadísticas por género
   - Estado de registro CONADIS

2. **Dashboard de Educación**
   - Top 10 carreras más demandadas
   - Distribución por instituciones
   - Análisis de grados académicos
   - Proporción de carreras principales

3. **Dashboard de Discapacidad**
   - Distribución por causa
   - Niveles de dificultad
   - Análisis por edad
   - Puntuación promedio por causa

4. **Dashboard de Experiencia**
   - Duración de experiencias
   - Análisis por empresas
   - Distribución salarial
   - Tendencias laborales

5. **Dashboard de Vacantes**
   - Ofertas por sector
   - Distribución geográfica
   - Análisis salarial
   - Requisitos más demandados

## 🛠️ Tecnologías

- **Frontend:**
  - React 18
  - Tailwind CSS
  - Recharts
  - Shadcn/ui

- **Herramientas de Análisis:**
  - Python
  - Pandas
  - Jupyter Notebook

## 📂 Estructura

```plaintext
dashboard-dataton/
├── public/
│   ├── data/               # Datos JSON para los dashboards
│   │   ├── discapacidad/
│   │   ├── educacion/
│   │   ├── experiencia/
│   │   ├── postulantes/
│   │   └── vacantes/
│   └── images/            # Imágenes del proyecto
├── src/
    ├── components/
    │   ├── charts/        # Componentes de gráficos
    │   ├── layout/        # Componentes de estructura
    │   ├── pages/         # Páginas principales
    │   └── ui/            # Componentes de interfaz
    ├── App.jsx
    └── main.jsx
```

## 👥 Equipo SeedMinds

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/AnthonyGit1">
          <img src="/public/images/anthony.jpg" width="100px;" alt="Anthony Rosas"/><br />
          <b>Anthony Rosas</b>
        </a><br />
        <sub>Desarrollador Backend</sub><br />
        <a href="https://github.com/AnthonyGit1">
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" width="70px"/>
        </a>
        <a href="https://www.linkedin.com/in/anthony-luis-rosas-pisco-75b53b273">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" width="70px"/>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/joshRiveros">
          <img src="/public/images/josh.jpg" width="100px;" alt="Joshelyn Riveros"/><br />
          <b>Joshelyn Riveros</b>
        </a><br />
        <sub>Especialista en Calidad y UX</sub><br />
        <a href="https://github.com/joshRiveros">
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" width="70px"/>
        </a>
        <a href="https://www.linkedin.com/in/joshelyn-riveros-pariona-380160145">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" width="70px"/>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/JaciLucasEulogio">
          <img src="/public/images/jaci.png" width="100px;" alt="Jaci Lucas"/><br />
          <b>Jaci Lucas</b>
        </a><br />
        <sub>Desarrolladora Frontend</sub><br />
        <a href="https://github.com/JaciLucasEulogio">
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" width="70px"/>
        </a>
        <a href="https://www.linkedin.com/in/jaci-lucas">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" width="70px"/>
        </a>
      </td>
    </tr>
  </table>
</div>

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/JaciLucasEulogio/dataton-2024.git
```

2. Instalar dependencias:
```bash
cd dataton-2024
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---
Desarrollado con 💜 por el equipo SeedMinds | Universidad Continental © 2024
```