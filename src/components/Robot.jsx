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
    <div className="container mx-auto p-4 sm:p-6">
      {/* Título principal de la sección */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl font-bold text-text-accent mb-2 font-heading">
          Control Robot "R2Campo"
        </h1>
        <div className="w-24 h-1 bg-primary rounded-full"></div>
      </div>
      
      {/* Descripción breve de la funcionalidad */}
      <p className="mb-6 sm:mb-8 text-text-main text-lg">
        Visualiza la ubicación de tu robot en tiempo real, su ruta y controla
        sus operaciones básicas. (Visualización de mapa es un placeholder).
      </p>
      
      {/* Grid principal: 1 columna en móvil, 3 en desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Columna izquierda: Mapa (ocupa 2 columnas en desktop) */}
        <div className="lg:col-span-2 bg-background-card border border-border shadow-md p-4 sm:p-6">
          {/* Encabezado de la tarjeta del mapa */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 border-b border-border">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-xl font-heading text-text-accent">
              Mapa del Lote Agrícola
            </h2>
            <span className="ml-auto text-xs bg-secondary/20 text-text-accent px-2 py-1 rounded-full">
              En vivo
            </span>
          </div>
          {/* Área del mapa (placeholder visual) */}
          <div className="w-full h-80 sm:h-96 bg-secondary/10 rounded-lg flex items-center justify-center border border-border">
            {/* Texto explicativo y emojis como marcador y robot */}
            <div className="text-center">
              <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">📍🤖</div>
              <p className="text-text-main text-lg">Integración con Mapbox</p>
              <p className="text-text-main/70 text-sm">Próximamente disponible</p>
            </div>
          </div>
        </div>
        
        {/* Columna derecha: Estado y controles */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          {/* Tarjeta de estado del robot */}
          <div className="bg-background-card border border-border shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <span className="text-2xl">ℹ️</span>
              <h2 className="text-xl font-heading text-text-accent">Estado del Robot</h2>
            </div>
            <RobotStatus />
          </div>
          
          {/* Tarjeta de controles básicos */}
          <div className="bg-background-card border border-border shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-xl font-heading text-text-accent">Controles Básicos</h2>
            </div>
            {/* Botones de control del robot */}
            <div className="space-y-3 sm:space-y-4">
              {/* Botón para iniciar monitoreo programado */}
              <button className="w-full bg-accent text-white py-2.5 sm:py-3 px-4 rounded font-heading hover:bg-accent/80 transition-colors">
                Iniciar Monitoreo Programado
              </button>
              {/* Botón de emergencia para detener el robot */}
              <button className="w-full bg-primary text-white py-2.5 sm:py-3 px-4 rounded font-heading hover:bg-primary/80 transition-colors">
                Detener Robot (Emergencia)
              </button>
              {/* Botón para regresar el robot a la base */}
              <button className="w-full bg-secondary text-black py-2.5 sm:py-3 px-4 rounded font-heading hover:bg-secondary/80 transition-colors">
                Regresar a Base
              </button>
              {/* Botón para ver cultivos */}
              <button
                className="w-full border border-border text-text-main py-2.5 sm:py-3 px-4 rounded font-heading hover:bg-background transition-colors"
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