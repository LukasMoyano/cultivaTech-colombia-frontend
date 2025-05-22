import React from "react";

export default function Robot() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold cultiva-text-main mb-2">
        Control Robot "R2Campo"
      </h2>
      <p className="mb-6 cultiva-text-secondary">
        Visualiza la ubicación de tu robot en tiempo real, su ruta y controla
        sus operaciones básicas. (Visualización de mapa es un placeholder).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card">
          <div className="card-header">
            🗺️ Mapa del Lote Agrícola (Placeholder)
          </div>
          <div className="w-full h-96 bg-gray-300 rounded flex items-center justify-center cultiva-text-secondary precolumbian-border-subtle">
            (Aquí iría la integración con Mapbox mostrando el robot y su ruta)
            <span className="icon-placeholder text-6xl">📍🤖</span>
          </div>
        </div>
        <div className="md:col-span-1 space-y-4">
          <div className="card">
            <div className="card-header">ℹ️ Estado del Robot</div>
            <p>
              <span className="font-semibold">Batería:</span>{" "}
              <span className="icon-placeholder">🔋</span> 75%
            </p>
            <p>
              <span className="font-semibold">Señal:</span>{" "}
              <span className="icon-placeholder">📶</span> Fuerte
            </p>
            <p>
              <span className="font-semibold">Última Misión:</span> Monitoreo
              Lote Sol - 19/05/24 14:00
            </p>
          </div>
          <div className="card">
            <div className="card-header">⚙️ Controles Básicos</div>
            <div className="space-y-3">
              <button className="btn btn-primary w-full">
                Iniciar Monitoreo Programado
              </button>
              <button className="btn btn-critical w-full">
                Detener Robot (Emergencia)
              </button>
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