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
    // Contenedor principal centrado y con padding
    <div className="container mx-auto p-4">
      {/* Título del panel */}
      <h2 className="text-3xl font-bold cultiva-text-main mb-6">
        aqui que es esto 
      </h2>
        Panel Principal
      {/* Descripción introductoria */}
      <p className="mb-6 cultiva-text-secondary">
        Bienvenido a tu panel de control CultivaTech. Aquí encontrarás un
        resumen del estado de tus cultivos, alertas importantes y otra
        información relevante para ayudarte a tomar las mejores decisiones para
        tu campo.
      </p>

      {/* Sección principal con grid para paneles */}
      <div className="flex-1 p-4 min-h-0 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* =========================
              Estado General del Cultivo
              ========================= */}
          <div className="card md:col-span-2 lg:col-span-1">
            <div className="card-header flex items-center">
              <span className="icon-placeholder">⭐</span> Estado General:
              Tomates - Lote Sol Naciente
            </div>
            <div className="text-center py-4">

              {/* Indicador visual del estado */}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 cultiva-text-white text-3xl font-bold mb-2">
                OK
              </div>
              <p className="cultiva-text-main text-lg font-semibold">
                Riego óptimo. Sin alertas.
              </p>
              <p className="cultiva-text-secondary text-sm">
                Temperatura promedio: 22°C
              </p>
              {/* Botón para cambiar de cultivo */}
              <button className="mt-3 text-sm btn btn-outline">
                Cambiar Cultivo
              </button>
            </div>
          </div>

          {/* =========================
              Gráfico (placeholder)
              ========================= */}
          <div className="h-48 chart-container flex items-center justify-center">
            {/* Aquí puedes poner un gráfico en el futuro */}
            <span className="text-gray-400">(Gráfico próximamente)</span>
          </div>

          {/* =========================
              Panel de Clima
              ========================= */}
          {/* Componente que muestra información climática */}
          <DashboardClima />

          {/* =========================
              Alertas y Recomendaciones
              ========================= */}
          {/* Componente que muestra alertas y recomendaciones, recibe setCurrentPage como prop */}
          <DashboardAlertasYRecomendaciones setCurrentPage={setCurrentPage} />
        </div>
      </div>

      {/* =========================
          Paneles Secundarios (abajo)
          ========================= */}
      <div className="space-y-4">
        {/* =========================
            Estado del Robot
            ========================= */}
        <div className="card">
          <div className="card-header flex items-center">
            <span className="icon-placeholder">🤖</span> Robot CultivaTech
            "R2Campo"
          </div>
          <p>
            <span className="font-semibold">Estado:</span> En base, cargando
          </p>
          <p>
            <span className="font-semibold">Batería:</span>{" "}
            <span className="icon-placeholder">🔋</span> 75%
          </p>
          <p>
            <span className="font-semibold">Conexión:</span>{" "}
            <span className="icon-placeholder">📶</span> Fuerte
          </p>
          {/* Botones de acción para el robot */}
          <div className="mt-4 space-y-2">
            <button className="btn btn-primary w-full">
              Iniciar Monitoreo Programado
            </button>
            <button
              className="btn btn-outline w-full"
              onClick={() => setCurrentPage("robot")}
            >
              Ver Mapa Robot
            </button>
          </div>
        </div>

        {/* =========================
            Acceso Rápido a Cultivos
            ========================= */}
        <div className="card">
          <div className="card-header flex items-center">
            <span className="icon-placeholder">🌾</span> Acceso Rápido
            Cultivos
          </div>
          {/* Botones para acceder rápidamente a diferentes cultivos */}
          <div className="space-y-2">
            <button
              className="w-full text-left p-2 rounded hover:bg-gray-100 cultiva-text-main"
              onClick={() => setCurrentPage("cultivos")}
            >
              🍅 Tomates - Lote Sol Naciente
            </button>
            <button
              className="w-full text-left p-2 rounded hover:bg-gray-100 cultiva-text-main"
              onClick={() => setCurrentPage("cultivos")}
            >
              🍓 Fresas - El Edén
            </button>
            <button
              className="w-full text-left p-2 rounded hover:bg-gray-100 cultiva-text-main"
              onClick={() => setCurrentPage("cultivos")}
            >
              🌽 Maíz - La Esperanza
            </button>
          </div>
        </div>

        {/* =========================
            Comunidad y Ayuda
            ========================= */}
        <div className="card">
          <div className="card-header flex items-center">
            <span className="icon-placeholder">👥</span> Comunidad y Ayuda
          </div>
          <p className="cultiva-text-secondary mb-3">
            Conéctate con otros agricultores, comparte experiencias y
            resuelve dudas.
          </p>
          {/* Botones para acceder a la comunidad y FAQ */}
          <button className="btn btn-nav w-full mb-2">
            Foro de Agricultores
          </button>
          <button className="btn btn-outline w-full">
            Preguntas Frecuentes (FAQ)
          </button>
        </div>
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
