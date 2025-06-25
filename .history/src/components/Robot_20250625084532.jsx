import React from "react";
import PropTypes from "prop-types";

/**
 * Componente Robot - Control y monitoreo del robot agrícola "R2Campo"
 * @param {function} setCurrentPage - Función para navegar entre páginas
 */
export default function Robot({ setCurrentPage }) {
  // Renderiza el contenido del componente
  return (
    // Contenedor principal con padding y centrado
    <div className="container mx-auto p-4">
      {/* Título principal de la sección */}
      <h2 className="text-3xl font-bold cultiva-text-main mb-2">
        Control Robot "R2Campo"
      </h2>
      {/* Descripción breve de la funcionalidad */}
      <p className="mb-6 cultiva-text-secondary">
        Visualiza la ubicación de tu robot en tiempo real, su ruta y controla
        sus operaciones básicas. (Visualización de mapa es un placeholder).
      </p>
      {/* Grid principal: 1 columna en móvil, 3 en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna izquierda: Mapa (ocupa 2 columnas en desktop) */}
        <div className="md:col-span-2 card">
          {/* Encabezado de la tarjeta del mapa */}
          <div className="card-header">
            🗺️ Mapa del Lote Agrícola (Placeholder)
          </div>
          {/* Área del mapa (placeholder visual) */}
          <div className="w-full h-96 bg-gray-300 rounded flex items-center justify-center cultiva-text-secondary precolumbian-border-subtle">
            {/* Texto explicativo y emojis como marcador y robot */}
            (Aquí iría la integración con Mapbox mostrando el robot y su ruta)
            <span className="icon-placeholder text-6xl">📍🤖</span>
          </div>
        </div>
        {/* Columna derecha: Estado y controles */}
        <div className="md:col-span-1 space-y-4">
          {/* Tarjeta de estado del robot */}
          <div className="card">
            <div className="card-header">ℹ️ Estado del Robot</div>
            {/* Estado de la batería */}
            <p>
              <span className="font-semibold">Batería:</span>{" "}
              <span className="icon-placeholder">🔋</span> 75%
            </p>
            {/* Estado de la señal */}
            <p>
              <span className="font-semibold">Señal:</span>{" "}
              <span className="icon-placeholder">📶</span> Fuerte
            </p>
            {/* Última misión realizada */}
            <p>
              <span className="font-semibold">Última Misión:</span> Monitoreo
              Lote Sol - 19/05/24 14:00
            </p>
          </div>
          {/* Tarjeta de controles básicos */}
          <div className="card">
            <div className="card-header">⚙️ Controles Básicos</div>
            {/* Botones de control del robot */}
            <div className="space-y-3">
              {/* Botón para iniciar monitoreo programado */}
              <button className="btn btn-primary w-full">
                Iniciar Monitoreo Programado
              </button>
              {/* Botón de emergencia para detener el robot */}
              <button className="btn btn-critical w-full">
                Detener Robot (Emergencia)
              </button>
              {/* Botón para regresar el robot a la base */}
              <button className="btn btn-secondary w-full">
                Regresar a Base
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Resumen de integración:
 * - Este componente debe ser mostrado en la sección de monitoreo/control de robots de la app.
 * - El mapa es solo un placeholder visual; para producción, se recomienda integrar Mapbox o similar.
 * - Los datos de estado y controles son estáticos; para una app real, deben venir de props, contexto o API.
 * - Los botones no tienen funcionalidad; se deben conectar a handlers que interactúen con el backend/robot.
 */