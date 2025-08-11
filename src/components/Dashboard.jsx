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
    <div className="container mx-auto p-6">
      {/* Título del panel */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Panel Principal
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
      </div>
      {/* Descripción introductoria */}
      <p className="mb-8 text-gray-600 text-lg leading-relaxed">
        Bienvenido a tu panel de control CultivaTech. Aquí encontrarás un
        resumen del estado de tus cultivos, alertas importantes y otra
        información relevante para ayudarte a tomar las mejores decisiones para
        tu campo.
      </p>

      {/* Sección principal con grid para paneles */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* =========================
              Estado General del Cultivo
              ========================= */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <span className="icon-placeholder">⭐</span> Estado General:
              Tomates - Lote Sol Naciente
              <button
                onClick={() => setCurrentPage("cultivos")}
                className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
              >
                Cambiar Cultivo
              </button>
            </div>
            <div className="text-center py-6">

              {/* Indicador visual del estado */}
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white text-3xl font-bold mb-4 shadow-lg">
                OK
              </div>
              <p className="text-gray-800 text-xl font-semibold mb-2">
                Riego óptimo. Sin alertas.
              </p>
              <p className="text-gray-600">
                Temperatura promedio: 22°C
              </p>
            </div>
          </div>

          {/* =========================
              Gráfico (placeholder)
              ========================= */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            {/* Aquí puedes poner un gráfico en el futuro */}
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <span className="text-gray-500 text-lg">(Gráfico próximamente)</span>
            </div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* =========================
            Estado del Robot
            ========================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
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
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all">
              Iniciar Monitoreo Programado
            </button>
            <button
              className="w-full border border-green-500 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 transition-all"
              onClick={() => setCurrentPage("robot")}
            >
              Ver Mapa Robot
            </button>
          </div>
        </div>

        {/* =========================
            Acceso Rápido a Cultivos
            ========================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <span className="icon-placeholder">🌾</span> Acceso Rápido
            Cultivos
          </div>
          {/* Botones para acceder rápidamente a diferentes cultivos */}
          <div className="space-y-2">
            <button
              className="w-full text-left p-3 rounded-lg hover:bg-green-50 text-gray-700 border border-transparent hover:border-green-200 transition-all"
              onClick={() => setCurrentPage("cultivos")}
            >
              🍅 Tomates - Lote Sol Naciente
            </button>
            <button
              className="w-full text-left p-3 rounded-lg hover:bg-green-50 text-gray-700 border border-transparent hover:border-green-200 transition-all"
              onClick={() => setCurrentPage("cultivos")}
            >
              🍓 Fresas - El Edén
            </button>
            <button
              className="w-full text-left p-3 rounded-lg hover:bg-green-50 text-gray-700 border border-transparent hover:border-green-200 transition-all"
              onClick={() => setCurrentPage("cultivos")}
            >
              🌽 Maíz - La Esperanza
            </button>
          </div>
        </div>

        {/* =========================
            Comunidad y Ayuda
            ========================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <span className="icon-placeholder">👥</span> Comunidad y Ayuda
          </div>
          <p className="text-gray-600 mb-4">
            Conéctate con otros agricultores, comparte experiencias y
            resuelve dudas.
          </p>
          {/* Botones para acceder a la comunidad y FAQ */}
          <button 
            onClick={() => setCurrentPage("juegos")}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all mb-2"
          >
            🎮 Juegos IA Colaborativa
          </button>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all mb-2">
            Foro de Agricultores
          </button>
          <button className="w-full border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-all">
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
