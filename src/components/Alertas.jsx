import React, { useState } from "react";

const alertas = [
  {
    tipo: "critica",
    color: "border-red-500 text-red-500",
    icon: "🚨",
    titulo: "ALERTA CRÍTICA: Detección de Roya",
    desc: "Cultivo: Tomates - Lote Sol Naciente | Fecha: 20/05/2024 10:30 AM",
    info: "Se ha detectado una alta probabilidad de infección por Roya. Se recomienda inspección inmediata y tratamiento fungicida.",
    btn: "Acción Urgente",
    btnClass: "btn btn-critical text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "advertencia",
    color: "border-yellow-500 text-yellow-500",
    icon: "⚠️",
    titulo: "ADVERTENCIA: Nivel Bajo de Batería Robot",
    desc: "Robot: R2Campo | Fecha: 20/05/2024 09:00 AM",
    info: "La batería del robot está al 15%. Regresando a base para recarga.",
    btn: "Ver Estado Robot",
    btnClass: "btn btn-secondary text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "recomendacion",
    color: "border-green-500 text-green-500",
    icon: "💡",
    titulo: "RECOMENDACIÓN: Ajuste de Riego",
    desc: "Cultivo: Fresas - El Edén | Fecha: 19/05/2024 05:00 PM",
    info: "Basado en el pronóstico de lluvia, se recomienda suspender el riego programado para mañana.",
    btn: "Ver Pronóstico",
    btnClass: "btn btn-outline text-xs mt-2 py-1 px-2",
  },
];

const filtros = [
  { key: "todas", label: "Todas" },
  { key: "critica", label: "Críticas" },
  { key: "advertencia", label: "Advertencias" },
  { key: "recomendacion", label: "Recomendaciones" },
];

export default function Alertas() {
  const [filtro, setFiltro] = useState("todas");

  const alertasFiltradas =
    filtro === "todas"
      ? alertas
      : alertas.filter((a) => a.tipo === filtro);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold cultiva-text-main mb-2">
        Alertas y Recomendaciones
      </h2>
      <p className="mb-6 cultiva-text-secondary">
        Revisa todas las alertas y recomendaciones generadas por el sistema y la
        IA para mantener tus cultivos en óptimas condiciones.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f.key}
            className={`btn btn-outline filter-btn ${
              filtro === f.key ? "active" : ""
            }`}
            onClick={() => setFiltro(f.key)}
          >
            {f.label}
          </button>
        ))}
        <select className="p-2 border rounded cultiva-earth-main cultiva-text-light focus:outline-none focus:border-green-500">
          <option>Filtrar por Cultivo</option>
          <option>Tomates - Lote Sol Naciente</option>
          <option>Fresas - El Edén</option>
        </select>
      </div>
      <div className="space-y-3">
        {alertasFiltradas.map((a) => (
          <div
            key={a.titulo}
            className={`card flex items-start p-3 border-l-4 ${a.color}`}
          >
            <span className={`icon-placeholder text-2xl ${a.color} mr-3`}>
              {a.icon}
            </span>
            <div>
              <h3 className="font-semibold cultiva-text-main">{a.titulo}</h3>
              <p className="text-sm cultiva-text-secondary">{a.desc}</p>
              <p className="text-sm cultiva-text-main mt-1">{a.info}</p>
              <button className={a.btnClass}>{a.btn}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}