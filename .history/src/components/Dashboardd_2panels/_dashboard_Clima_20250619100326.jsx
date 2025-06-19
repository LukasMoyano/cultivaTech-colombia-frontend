import React from "react";

export default function Dashboard_Clima() {
  return (
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
  );
}