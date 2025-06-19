import React from "react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Estado General */}
        <div className="card md:col-span-2 lg:col-span-1">
          <div className="card-header flex items-center">
            <span className="icon-placeholder">⭐</span> Estado General: Tomates - Lote Sol Naciente
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
          <div className="h-48 chart-container flex items-center justify-center">
            {/* Aquí puedes poner un gráfico en el futuro */}
            <span className="text-gray-400">(Gráfico próximamente)</span>
          </div>
        </div>
        {/* Alertas y recomendaciones */}
        <div className="card">
          <div className="card-header flex items-center">
            <span className="icon-placeholder">💡</span> Alertas y Recomendaciones (Hoy)
          </div>
          <ul className="space-y-3">
            <li className="flex items-start p-2 rounded-md hover:bg-yellow-50 border border-transparent hover:border-yellow-300">
              <span className="icon-placeholder text-yellow-500">💧</span>
              <div>
                <span className="font-semibold cultiva-text-main">
                  Riego Necesario Sector A
                </span>
                <p className="text-sm cultiva-text-secondary">
                  Humedad del suelo baja (35%).
                </p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md hover:bg-red-50 border border-transparent hover:border-red-300">
              <span className="icon-placeholder text-red-600">🐞</span>
              <div>
                <span className="font-semibold cultiva-text-main">
                  Posible Plaga: Mosca Blanca
                </span>
                <p className="text-sm cultiva-text-secondary">
                  Detectada en Lote Luna. Revisar urgentemente.
                </p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md hover:bg-green-50 border border-transparent hover:border-green-300">
              <span className="icon-placeholder text-green-600">🌱</span>
              <div>
                <span className="font-semibold cultiva-text-main">
                  Recomendación: Fertilización
                </span>
                <p className="text-sm cultiva-text-secondary">
                  Aplicar fertilizante NPK en Lote Sol Naciente.
                </p>
              </div>
            </li>
          </ul>
          <button
            className="btn btn-secondary w-full mt-4"
            onClick={() => setCurrentPage("alertas")}
          >
            Ver Todas
          </button>
        </div>
        {/* Clima */}

        (asdasdasd)
        <div className="card">
          <div className="card-header flex items-center">
            <span className="icon-placeholder">☀️</span> Clima y Pronóstico (24h)
          </div>
          <div className="text-center">
            <p className="text-5xl cultiva-text-main">25°C</p>
            <p className="cultiva-text-secondary">Parcialmente Nublado</p>
          </div>
          <div className="mt-4 flex justify-around cultiva-text-secondary">
            <p>Max: 28°C</p>
            <p>Min: 18°C</p>
          </div>
          <p className="text-xs cultiva-text-secondary text-center mt-3">
            Fuente: OpenMeteo
          </p>
        </div>
        {/* Robot */}
        <div className="card">
          <div className="card-header flex items-center">
            <span className="icon-placeholder">🤖</span> Robot CultivaTech "R2Campo"
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
            Conéctate con otros agricultores, comparte experiencias y resuelve dudas.
          </p>
          <button className="btn btn-nav w-full mb-2">Foro de Agricultores</button>
          <button className="btn btn-outline w-full">Preguntas Frecuentes (FAQ)</button>
        </div>
      </div>
    </div>
  );
}