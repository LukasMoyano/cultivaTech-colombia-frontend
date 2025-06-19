import React from "react";

export default function Dashboard_Clima() {
  return (
    <div className="container mx-auto p-4">
      {/* Clima */}
      <div className="card">
        <div className="card-header flex items-center">
          <span className="icon-placeholder">☀️</span> Clima y Pronóstico (24h)
        </div>
        <div className="text-center">
          <p className="text-5xl cultiva-text-main">25°C</p>
          <p className="cultiva-text-secondary">Parcialmente Nublado</p>
        </div>
      </div>
    </div>
  );
}