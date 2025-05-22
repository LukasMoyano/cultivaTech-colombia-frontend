import React, { useState } from "react";

const cultivos = [
  {
    nombre: "Tomates - Lote Sol Naciente",
    siembra: "15/01/2024",
    estado: "Saludable",
    humedad: "65%",
    color: "bg-green-500",
    imagen: "https://placehold.co/600x400/A77B55/F2E8CF?text=🍅",
    fenologico: "Fructificación",
  },
  {
    nombre: "Fresas - El Edén",
    siembra: "01/03/2024",
    estado: "Atención",
    humedad: "Temperatura: 28°C (Alta)",
    color: "bg-yellow-500",
    imagen: "https://placehold.co/600x400/A77B55/F2E8CF?text=🍓",
    fenologico: "Floración",
  },
];

export default function Cultivos() {
  const [detalle, setDetalle] = useState(null);

  if (detalle) {
    const cultivo = cultivos.find((c) => c.nombre === detalle);
    return (
      <div className="container mx-auto p-4">
        <button className="btn btn-outline mb-4" onClick={() => setDetalle(null)}>
          ← Volver a Mis Cultivos
        </button>
        <h3 className="text-2xl font-bold cultiva-text-main mb-2">{cultivo.nombre}</h3>
        <p className="cultiva-text-secondary mb-1">Fecha de Siembra: {cultivo.siembra}</p>
        <p className="cultiva-text-secondary mb-4">
          Estado Fenológico: <span className="font-semibold">{cultivo.fenologico}</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">💧 Humedad del Suelo (Últimas 24h)</div>
            <div className="chart-container h-64 md:h-80 flex items-center justify-center">
              (Gráfico próximamente)
            </div>
          </div>
          <div className="card">
            <div className="card-header">🌡️ Temperatura Ambiente (Últimas 24h)</div>
            <div className="chart-container h-64 md:h-80 flex items-center justify-center">
              (Gráfico próximamente)
            </div>
          </div>
          <div className="card md:col-span-2">
            <div className="card-header">💡 Últimas Detecciones IA</div>
            <ul className="space-y-2">
              <li>
                <span className="icon-placeholder text-green-500">✅</span> Nivel de nutrientes óptimo.
              </li>
              <li>
                <span className="icon-placeholder text-yellow-500">⚠️</span> Ligera deficiencia de agua detectada hace 3 horas.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 space-x-3">
          <button className="btn btn-secondary">Ver Historial Completo</button>
          <button className="btn btn-primary">Programar Tarea Robot</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold cultiva-text-main">Mis Cultivos</h2>
        <button className="btn btn-primary flex items-center">
          <span className="icon-placeholder text-xl mr-1 cultiva-text-white">➕</span> Añadir Cultivo
        </button>
      </div>
      <p className="mb-6 cultiva-text-secondary">
        Gestiona y monitorea todos tus cultivos registrados. Selecciona un cultivo para ver su estado detallado, historial de sensores y alertas específicas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cultivos.map((cultivo) => (
          <div
            key={cultivo.nombre}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setDetalle(cultivo.nombre)}
          >
            <img src={cultivo.imagen} alt={cultivo.nombre} className="rounded-t-lg w-full h-40 object-cover mb-3" />
            <h3 className="text-xl font-semibold cultiva-text-main mb-1">{cultivo.nombre}</h3>
            <p className="cultiva-text-secondary text-sm mb-2">Siembra: {cultivo.siembra}</p>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${cultivo.color} mr-2`}></span>
              <span className="cultiva-text-secondary text-sm">Estado: {cultivo.estado}</span>
            </div>
            <p className="cultiva-text-secondary text-sm mt-1">{cultivo.humedad}</p>
          </div>
        ))}
      </div>
    </div>
  );
}