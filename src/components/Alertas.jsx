import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Utilidad para obtener cultivos del localStorage o valores por defecto
function getCultivos() {
  const local = localStorage.getItem("cultivos");
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [
        { nombre: "Tomates - Lote Sol Naciente" },
        { nombre: "Fresas - El Edén" },
        { nombre: "Pimientos - Lote Primavera" },
        { nombre: "Maíz - Lote Esperanza" },
        { nombre: "Lechugas - Lote Verde" },
        { nombre: "Invernadero 1" },
        { nombre: "Invernadero 2" },
        { nombre: "Zona: General" },
        { nombre: "Sistema de Riego" },
        { nombre: "Robot: R2Campo" },
        { nombre: "Robot: AgroBot" },
      ];
    }
  }
  return [
    { nombre: "Tomates - Lote Sol Naciente" },
    { nombre: "Fresas - El Edén" },
    { nombre: "Pimientos - Lote Primavera" },
    { nombre: "Maíz - Lote Esperanza" },
    { nombre: "Lechugas - Lote Verde" },
    { nombre: "Invernadero 1" },
    { nombre: "Invernadero 2" },
    { nombre: "Zona: General" },
    { nombre: "Sistema de Riego" },
    { nombre: "Robot: R2Campo" },
    { nombre: "Robot: AgroBot" },
  ];
}

// Utilidad para asignar aleatoriamente un cultivo a una alerta
function asignarCultivo(alerta, cultivos) {
  const idx = Math.floor(Math.random() * cultivos.length);
  const cultivo = cultivos[idx]?.nombre || "Cultivo Desconocido";
  // Reemplaza el nombre del cultivo en desc si existe el patrón
  let desc = alerta.desc;
  if (desc.includes("Cultivo:")) {
    desc = desc.replace(/Cultivo:.*?\|/, `Cultivo: ${cultivo} |`);
  } else if (desc.includes("Invernadero")) {
    desc = desc.replace(/Invernadero \d+/, cultivo);
  } else if (desc.includes("Zona:")) {
    desc = desc.replace(/Zona:.*?\|/, `Zona: ${cultivo} |`);
  } else if (desc.includes("Sistema de Riego")) {
    desc = desc.replace(/Sistema de Riego/, cultivo);
  } else if (desc.includes("Robot:")) {
    desc = desc.replace(/Robot:.*?\|/, `Robot: ${cultivo} |`);
  }
  return { ...alerta, desc };
}

const baseAlertas = [
  // ... (todas las alertas originales aquí, igual que antes)
  // (Pega aquí el array de alertas que ya tienes, sin cambios)
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
    tipo: "critica",
    color: "border-red-500 text-red-500",
    icon: "🔥",
    titulo: "ALERTA CRÍTICA: Temperatura Elevada",
    desc: "Cultivo: Pimientos - Lote Primavera | Fecha: 20/05/2024 13:15 PM",
    info: "Temperatura superior a 38°C detectada. Riesgo de estrés térmico en plantas.",
    btn: "Ver Medidas",
    btnClass: "btn btn-critical text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "critica",
    color: "border-red-500 text-red-500",
    icon: "💧",
    titulo: "ALERTA CRÍTICA: Fuga de Agua",
    desc: "Sistema de Riego | Fecha: 20/05/2024 08:45 AM",
    info: "Fuga detectada en el sistema de riego. Riesgo de pérdida de agua y daño a cultivos.",
    btn: "Detener Riego",
    btnClass: "btn btn-critical text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "critica",
    color: "border-red-500 text-red-500",
    icon: "🦗",
    titulo: "ALERTA CRÍTICA: Plaga Detectada",
    desc: "Cultivo: Maíz - Lote Esperanza | Fecha: 19/05/2024 17:20 PM",
    info: "Alta presencia de langostas detectada. Se recomienda intervención inmediata.",
    btn: "Ver Plaga",
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
    tipo: "advertencia",
    color: "border-yellow-500 text-yellow-500",
    icon: "🌫️",
    titulo: "ADVERTENCIA: Humedad Ambiental Baja",
    desc: "Invernadero 2 | Fecha: 20/05/2024 11:00 AM",
    info: "Humedad por debajo del 40%. Revisar sistemas de humidificación.",
    btn: "Ajustar Humedad",
    btnClass: "btn btn-secondary text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "advertencia",
    color: "border-yellow-500 text-yellow-500",
    icon: "🌧️",
    titulo: "ADVERTENCIA: Lluvia Intensa Pronosticada",
    desc: "Zona: General | Fecha: 20/05/2024 16:00 PM",
    info: "Se pronostican lluvias intensas. Proteger equipos y cultivos sensibles.",
    btn: "Ver Pronóstico",
    btnClass: "btn btn-secondary text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "advertencia",
    color: "border-yellow-500 text-yellow-500",
    icon: "🕒",
    titulo: "ADVERTENCIA: Retraso en Tareas Programadas",
    desc: "Robot: AgroBot | Fecha: 19/05/2024 18:30 PM",
    info: "Tareas de monitoreo no completadas a tiempo. Revisar programación.",
    btn: "Ver Detalles",
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
  {
    tipo: "recomendacion",
    color: "border-green-500 text-green-500",
    icon: "🌱",
    titulo: "RECOMENDACIÓN: Fertilización Óptima",
    desc: "Cultivo: Lechugas - Lote Verde | Fecha: 20/05/2024 07:30 AM",
    info: "Se recomienda aplicar fertilizante orgánico para mejorar el crecimiento.",
    btn: "Ver Recomendación",
    btnClass: "btn btn-outline text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "recomendacion",
    color: "border-green-500 text-green-500",
    icon: "🧑‍🌾",
    titulo: "RECOMENDACIÓN: Revisión Manual",
    desc: "Cultivo: Tomates - Lote Sol Naciente | Fecha: 19/05/2024 14:00 PM",
    info: "Se sugiere inspección manual para verificar estado de frutos maduros.",
    btn: "Ver Instrucciones",
    btnClass: "btn btn-outline text-xs mt-2 py-1 px-2",
  },
  {
    tipo: "recomendacion",
    color: "border-green-500 text-green-500",
    icon: "🕶️",
    titulo: "RECOMENDACIÓN: Sombra Parcial",
    desc: "Invernadero 1 | Fecha: 20/05/2024 12:00 PM",
    info: "Instalar mallas sombra para proteger cultivos de la radiación solar intensa.",
    btn: "Ver Detalles",
    btnClass: "btn btn-outline text-xs mt-2 py-1 px-2",
  },
];

// Hook para generar alertas con cultivos aleatorios
function useAlertasConCultivos() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const cultivos = getCultivos();
    // Asigna aleatoriamente un cultivo a cada alerta
    const alertasConCultivos = baseAlertas.map((a) =>
      asignarCultivo(a, cultivos)
    );
    setAlertas(alertasConCultivos);
  }, []);

  return alertas;
}

const filtros = [
  { key: "todas", label: "Todas" },
  { key: "critica", label: "Críticas" },
  { key: "advertencia", label: "Advertencias" },
  { key: "recomendacion", label: "Recomendaciones" },
];

export default function Alertas({ setCurrentPage }) {
  const [filtro, setFiltro] = useState("todas");
  const alertas = useAlertasConCultivos();

  const alertasFiltradas =
    filtro === "todas" ? alertas : alertas.filter((a) => a.tipo === filtro);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-heading text-text-accent mb-2">
        Alertas y Recomendaciones
      </h2>
      <p className="mb-6 text-text-main">
        Revisa todas las alertas y recomendaciones generadas por el sistema y la
        IA para mantener tus cultivos en óptimas condiciones.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f.key}
            className={`btn filter-btn px-3 py-1.5 text-sm font-heading ${
              filtro === f.key 
                ? "bg-primary text-white" 
                : "bg-background-card border border-border text-text-main hover:bg-secondary/20"
            }`}
            onClick={() => setFiltro(f.key)}
          >
            {f.label}
          </button>
        ))}
        <select className="p-2 border border-border rounded bg-background-card text-text-main focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Filtrar por Cultivo</option>
          <option>Tomates - Lote Sol Naciente</option>
          <option>Fresas - El Edén</option>
        </select>
      </div>
      <div className="space-y-3">
        {alertasFiltradas.map((a) => (
          <div
            key={a.titulo}
            className={`flex items-start p-4 border-l-4 bg-background-card border-border shadow-md ${a.color}`}
          >
            <span className={`text-2xl mr-3`}>
              {a.icon}
            </span>
            <div>
              <h3 className="font-heading text-text-accent text-lg">{a.titulo}</h3>
              <p className="text-sm text-text-main/80">{a.desc}</p>
              <p className="text-sm text-text-main mt-1">{a.info}</p>
              <button
                className={`mt-2 px-3 py-1 text-xs font-heading ${
                  a.tipo === "critica" 
                    ? "bg-red-500 text-white" 
                    : a.tipo === "advertencia" 
                    ? "bg-yellow-500 text-black" 
                    : "bg-green-500 text-white"
                }`}
                onClick={() => {
                  if (a.btn.includes("Robot") && setCurrentPage) {
                    setCurrentPage("robot");
                  } else if (a.btn.includes("Cultivo") && setCurrentPage) {
                    setCurrentPage("cultivos");
                  }
                }}
              >
                {a.btn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Validación de props
Alertas.propTypes = {
  setCurrentPage: PropTypes.func,
};
