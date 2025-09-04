// ==============================
// Dashboard.jsx
// Panel principal de CultivaTechColombia
// ==============================

import React from "react";
import PropTypes from "prop-types";

// Import panel components
import EstadoGeneralPanel from "./dashboard/EstadoGeneralPanel";
import GraficoPanel from "./dashboard/GraficoPanel";
import RobotPanel from "./dashboard/RobotPanel";
import AccesoRapidoPanel from "./dashboard/AccesoRapidoPanel";
import ComunidadAyudaPanel from "./dashboard/ComunidadAyudaPanel";
import RecomendacionesPanel from "./dashboard/RecomendacionesPanel";

// Import existing components
import DashboardClima from "./Dashboardd_2panels/_dashboard_Clima";
import DashboardAlertasYRecomendaciones from "./Dashboardd_2panels/_dashboard_alertasyrecomendaciones";

/**
 * Componente principal del Dashboard
 * @param {function} setCurrentPage - Función para cambiar la página actual
 */
const Dashboard = ({ setCurrentPage }) => {
  return (
    // Contenedor principal con padding
    <div className="container mx-auto p-6">
      {/* Título del panel */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-text-accent mb-2 font-heading">
          PANEL PRINCIPAL
        </h1>
        <div className="w-24 h-1 bg-primary rounded-full"></div>
      </header>
      
      {/* Descripción introductoria */}
      <p className="mb-8 text-text-main text-lg leading-relaxed">
        Bienvenido a tu panel de control de CultivaTech ColombIA. Aquí encontrarás un resumen del estado de tus cultivos, alertas importantes y otra información relevante para ayudarte a tomar las mejores decisiones para tu campo.
      </p>

      {/* Sección principal con grid para paneles */}
      <main className="flex-1 min-h-0 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EstadoGeneralPanel setCurrentPage={setCurrentPage} />
          <GraficoPanel />
          <section aria-label="Panel de Clima">
            <DashboardClima />
          </section>
          <section aria-label="Panel de Alertas y Recomendaciones">
            <DashboardAlertasYRecomendaciones setCurrentPage={setCurrentPage} />
          </section>
        </div>
        
        <RobotPanel setCurrentPage={setCurrentPage} />
        <AccesoRapidoPanel setCurrentPage={setCurrentPage} />
        <ComunidadAyudaPanel setCurrentPage={setCurrentPage} />
      </main>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <RecomendacionesPanel />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

// Exporta el componente principal Dashboard
export default Dashboard;

// Exporta el componente de alertas y recomendaciones para uso externo
export { DashboardAlertasYRecomendaciones };