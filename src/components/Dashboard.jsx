// ==============================
// Dashboard.jsx
// Panel principal de CultivaTechColombia
// ==============================

import React from "react";
import PropTypes from "prop-types";
// Importa el componente del panel de clima
import DashboardClima from "./Dashboardd_2panels/_dashboard_Clima";
// Importa el componente de alertas y recomendaciones
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
          
          <section aria-labelledby="estado-general-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
            <h2 id="estado-general-titulo" className="flex items-center justify-between mb-6 font-heading text-xl">
              <span className="text-accent">⭐ ESTADO GENERAL</span>
              <button
                onClick={() => setCurrentPage("cultivos")}
                className="text-sm bg-secondary/20 text-text-accent px-3 py-1 hover:bg-secondary/40 transition-colors"
              >
                Cambiar Cultivo
              </button>
            </h2>
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-28 h-28 border-4 border-secondary text-accent text-3xl font-bold mb-4">
                OK
              </div>
              <p className="text-text-main text-xl font-semibold mb-2">
                Riego óptimo. Sin alertas.
              </p>
              <p className="text-text-main/80">
                Temperatura promedio: 22°C
              </p>
            </div>
          </section>

          <section aria-labelledby="grafico-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300 flex items-center justify-center">
            <h2 id="grafico-titulo" className="sr-only">Gráfico</h2>
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <span className="text-text-main/70 text-lg">(Gráfico próximamente)</span>
            </div>
          </section>

          <section aria-label="Panel de Clima">
            <DashboardClima />
          </section>
          
          <section aria-label="Panel de Alertas y Recomendaciones">
            <DashboardAlertasYRecomendaciones setCurrentPage={setCurrentPage} />
          </section>

        </div>
      </main>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        <section aria-labelledby="robot-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
          <h2 id="robot-titulo" className="flex items-center mb-4 font-heading text-text-accent text-xl">
            <span className="mr-2">🤖</span> ROBOT CULTIVATECH
          </h2>
          <p className="text-text-main">
            <span className="font-semibold">Estado:</span> En base, cargando
          </p>
          <p className="text-text-main">
            <span className="font-semibold">Batería:</span>
            <span className="text-accent ml-2">🔋 75%</span>
          </p>
          <p className="text-text-main">
            <span className="font-semibold">Conexión:</span>
            <span className="text-accent ml-2">📶 Fuerte</span>
          </p>
          <div className="mt-4 space-y-2">
            <button 
              className="w-full bg-primary text-white py-2 px-4 hover:bg-primary/80 transition-all font-heading"
              onClick={() => setCurrentPage("robot")}
            >
              VER DETALLES ROBOT
            </button>
          </div>
        </section>

        <section aria-labelledby="cultivos-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
          <h2 id="cultivos-titulo" className="flex items-center mb-4 font-heading text-text-accent text-xl">
            <span className="mr-2">🌾</span> CULTIVOS
          </h2>
          <p className="text-text-main mb-4">
            Gestiona tus cultivos y monitorea su estado en tiempo real.
          </p>
          <button
            className="w-full bg-secondary text-black py-2 px-4 hover:bg-secondary/80 transition-all font-heading"
            onClick={() => setCurrentPage("cultivos")}
          >
            VER CULTIVOS
          </button>
        </section>

        <section aria-labelledby="alertas-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
          <h2 id="alertas-titulo" className="flex items-center mb-4 font-heading text-text-accent text-xl">
            <span className="mr-2">⚠️</span> ALERTAS
          </h2>
          <p className="text-text-main mb-4">
            Revisa alertas importantes y recomendaciones para tus cultivos.
          </p>
          <button
            className="w-full bg-accent text-white py-2 px-4 hover:bg-accent/80 transition-all font-heading"
            onClick={() => setCurrentPage("alertas")}
          >
            VER ALERTAS
          </button>
        </section>

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