import React from "react";
import PropTypes from "prop-types";
import RobotStatus from "./RobotStatus";

/**
 * Componente Robot - Control y monitoreo del robot agrícola "R2Campo"
 * @param {function} setCurrentPage - Función para navegar entre páginas
 */
export default function Robot({ setCurrentPage }) {
  // Renderiza el contenido del componente
  return (
    // Contenedor principal con padding y centrado
    <div className="container mx-auto p-6">
      {/* Título principal de la sección */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Control Robot "R2Campo"
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
      <h2 className="text-3xl font-bold cultiva-text-main mb-2">
        Control Robot "R2Campo"
      </h2>
      {/* Descripción breve de la funcionalidad */}
      <p className="mb-8 text-gray-600 text-lg leading-relaxed">
        Visualiza la ubicación de tu robot en tiempo real, su ruta y controla
        sus operaciones básicas. (Visualización de mapa es un placeholder).
      </p>
      {/* Grid principal: 1 columna en móvil, 3 en desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda: Mapa (ocupa 2 columnas en desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {/* Encabezado de la tarjeta del mapa */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <span className="text-2xl">🗺️</span>
            <h3 className="text-xl font-bold text-gray-800">
              Mapa del Lote Agrícola
            </h3>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              En vivo
            </span>
          </div>
          {/* Área del mapa (placeholder visual) */}
          <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
            {/* Texto explicativo y emojis como marcador y robot */}
            <div className="text-center">
              <div className="text-8xl mb-4">📍🤖</div>
              <p className="text-gray-600 text-lg">Integración con Mapbox</p>
              <p className="text-gray-500 text-sm">Próximamente disponible</p>
            </div>
          </div>
        </div>
        {/* Columna derecha: Estado y controles */}
        <div className="lg:col-span-1 space-y-6">
          {/* Tarjeta de estado del robot */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <span className="text-2xl">ℹ️</span>
              <h3 className="text-lg font-bold text-gray-800">Estado del Robot</h3>
            </div>
            <RobotStatus />
          </div>
          {/* Tarjeta de controles básicos */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <span className="text-2xl">⚙️</span>
              <h3 className="text-lg font-bold text-gray-800">Controles Básicos</h3>
            </div>
            {/* Botones de control del robot */}
            <div className="space-y-4">
              {/* Botón para iniciar monitoreo programado */}
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-md">
                Iniciar Monitoreo Programado
              </button>
              {/* Botón de emergencia para detener el robot */}
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-md">
                Detener Robot (Emergencia)
              </button>
              {/* Botón para regresar el robot a la base */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium shadow-md">
                Regresar a Base
              </button>
              {/* Botón para ver cultivos */}
              <button
                className="w-full border border-gray-300 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium"
                onClick={() => setCurrentPage?.("cultivos")}
              >
                Ver Mis Cultivos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Validación de props
Robot.propTypes = {
  setCurrentPage: PropTypes.func,
};