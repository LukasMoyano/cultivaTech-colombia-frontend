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
import EstadoBlockchainPanel from "./dashboard/EstadoBlockchainPanel";
import PanelAlertas from "./dashboard/PanelAlertas";

// Import existing components
import DashboardClima from "./Dashboardd_2panels/_dashboard_Clima";
import DashboardAlertasYRecomendaciones from "./Dashboardd_2panels/_dashboard_alertasyrecomendaciones";

// Telemetría en tiempo real MQ-4 / ESP32 (SSE desde Render)
import { Mq4Dashboard } from "./telemetria";
import MiLoteFinanciadoPanel from "./agricultor/MiLoteFinanciadoPanel";

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
          PANEL PRINCIPAL · AGRICULTOR
        </h1>
        <div className="w-24 h-1 bg-primary rounded-full"></div>
      </header>
      
      {/* Descripción introductoria */}
      <p className="mb-8 text-text-main text-lg leading-relaxed">
        Bienvenido a tu panel de control de CultivaTech ColombIA. Aquí encontrarás la telemetría en vivo de tus cultivos, el respaldo financiero de tu lote y alertas tempranas para proteger tu cosecha.
      </p>

      {/* Sección principal ordenada por prioridad para el agricultor */}
      <main className="flex-1 min-h-0 overflow-auto space-y-6">
        {/* 1. Respaldo de financiamiento y salud de confianza digital del lote */}
        <MiLoteFinanciadoPanel
          onVerBlockchain={() => setCurrentPage("como_funciona")}
          onVerInversionista={() => setCurrentPage("inversion_oferta", "inversionista")}
        />

        {/* 2. Trazabilidad y Alertas Blockchain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section aria-label="Panel de Trazabilidad Blockchain">
            <EstadoBlockchainPanel />
          </section>
          <section aria-label="Panel de Alertas Blockchain">
            <PanelAlertas />
          </section>
        </div>

        {/* 3. Telemetría ambiental en vivo (Nodo Granja / ESP32) */}
        <section aria-label="Telemetría MQ-4 en tiempo real">
          <Mq4Dashboard />
        </section>

        {/* 4. Calidad del aire en vivo, Temperatura / Clima, Alertas y Estado General */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GraficoPanel setCurrentPage={setCurrentPage} />
          <section aria-label="Panel de Clima y Temperatura">
            <DashboardClima />
          </section>
          <section aria-label="Panel de Alertas y Recomendaciones">
            <DashboardAlertasYRecomendaciones setCurrentPage={setCurrentPage} />
          </section>
          <EstadoGeneralPanel setCurrentPage={setCurrentPage} />
        </div>

        {/* 5. Robot CultivaTech, Acceso rápido al cultivo y Comunidad de ayuda */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RobotPanel setCurrentPage={setCurrentPage} />
          <AccesoRapidoPanel setCurrentPage={setCurrentPage} />
          <ComunidadAyudaPanel setCurrentPage={setCurrentPage} />
        </div>
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