import React from "react";
import DashboardClima from "./Dashboardd_2panels/_dashboard_Clima";

export default function Dashboard({ setCurrentPage }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold cultiva-text-main mb-6">
        Panel Principal
      </h2>
      <p className="mb-6 cultiva-text-secondary">
        Bienvenido a tu panel de control CultivaTech. Aquí encontrarás un
        resumen del estado de tus cultivos, alertas importantes y otra
        información relevante para ayudarte a tomar las mejores decisiones para
        tu campo.
      </p>
      <div className="flex-1 p-4 min-h-0 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primera columna del dashboard */}
          <div className="space-y-4">
             {/* Estado General */}
            <div className="card md:col-span-2 lg:col-span-1">
              <div className="card-header flex items-center">
                <span className="icon-placeholder">⭐</span> Estado General:
                Tomates - Lote Sol Naciente
              </div>
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 cultiva-text-white text-3xl font-bold mb-2">
                  OK
                </div>
                <p className="cultiva-text-main text-lg font-semibold">
                  Riego óptimo. Sin alertas.
                </p>
                <p className="cultiva-text-secondary text-sm">
                  Temperatura promedio: 22°C
                </p>
                <button className="mt-3 text-sm btn btn-outline">
                  Cambiar Cultivo
                </button>
              </div>
            </div>
              </div>
              <div className="h-48 chart-container flex items-center justify-center">
                {/* Aquí puedes poner un gráfico en el futuro */}
                <span className="text-gray-400">(Gráfico próximamente)</span>
              </div>


                         {/* Reemplazamos solo la sección del clima */}
            <DashboardClima />
            {/* Alerts and Recommendations */}
            <div className="card">
              <div className="card-header flex items-center">
                <span className="icon-placeholder">💡</span> Alerts and
                Recommendations (Today)
              </div>
              <ul className="space-y-3">
                <li className="flex items-start p-2 rounded-md hover:bg-yellow-50 border border-transparent hover:border-yellow-300">
                  <span className="icon-placeholder text-yellow-500">💧</span>
                  <div>
                    <span className="font-semibold cultiva-text-main">
                      Irrigation Needed Sector A
                    </span>
                    <p className="text-sm cultiva-text-secondary">
                      Low soil moisture (35%).
                    </p>
                  </div>
                </li>
                <li className="flex items-start p-2 rounded-md hover:bg-red-50 border border-transparent hover:border-red-300">
                  <span className="icon-placeholder text-red-600">🐞</span>
                  <div>
                    <span className="font-semibold cultiva-text-main">
                      Possible Pest: Whitefly
                    </span>
                    <p className="text-sm cultiva-text-secondary">
                      Detected in Luna Lot. Check urgently.
                    </p>
                  </div>
                </li>
                <li className="flex items-start p-2 rounded-md hover:bg-green-50 border border-transparent hover:border-green-300">
                  <span className="icon-placeholder text-green-600">🌱</span>
                  <div>
                    <span className="font-semibold cultiva-text-main">
                      Recommendation: Fertilization
                    </span>
                    <p className="text-sm cultiva-text-secondary">
                      Apply NPK fertilizer in Sol Naciente Lot.
                    </p>
                  </div>
                </li>
              </ul>
              <button
                className="btn btn-secondary w-full mt-4"
                onClick={() => setCurrentPage("alerts")}
              >
                View All
              </button>
            </div>
          </div>

          {/* Segunda columna del dashboard */}
          <div className="space-y-4">
            {/* Robot */}
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
            {/* Acceso Rápido Cultivos */}
            <div className="card">
              <div className="card-header flex items-center">
                <span className="icon-placeholder">🌾</span> Acceso Rápido Cultivos
              </div>
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
            {/* Comunidad */}
            <div className="card">
              <div className="card-header flex items-center">
                <span className="icon-placeholder">👥</span> Comunidad y Ayuda
              </div>
              <p className="cultiva-text-secondary mb-3">
                Conéctate con otros agricultores, comparte experiencias y resuelve
                dudas.
              </p>
              <button className="btn btn-nav w-full mb-2">
                Foro de Agricultores
              </button>
              <button className="btn btn-outline w-full">
                Preguntas Frecuentes (FAQ)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}