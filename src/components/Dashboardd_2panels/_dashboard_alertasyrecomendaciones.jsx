import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Alertas base con clases semánticas para theming
const alertasBase = [
  {
    tipo: "critica",
    icon: "🚨",
    titulo: "ALERTA CRÍTICA: Detección de Roya",
    info: "Se ha detectado una alta probabilidad de infección por Roya. Se recomienda inspección inmediata y tratamiento fungicida.",
    cultivos: ["Tomates", "Pimientos", "Fresas"]
  },
  {
    tipo: "critica", 
    icon: "🔥",
    titulo: "ALERTA CRÍTICA: Temperatura Elevada",
    info: "Temperatura superior a 38°C detectada. Riesgo de estrés térmico en plantas.",
    cultivos: ["Tomates", "Pimientos", "Lechugas"]
  },
  {
    tipo: "advertencia",
    icon: "💧",
    titulo: "ADVERTENCIA: Humedad del Suelo Baja",
    info: "Nivel de humedad por debajo del óptimo. Se recomienda riego inmediato.",
    cultivos: ["Fresas", "Lechugas", "Maíz"]
  },
  {
    tipo: "advertencia",
    icon: "🦗",
    titulo: "ADVERTENCIA: Actividad de Plagas",
    info: "Detectada actividad inusual de insectos. Monitorear de cerca.",
    cultivos: ["Maíz", "Tomates", "Pimientos"]
  },
  {
    tipo: "recomendacion",
    icon: "🌱",
    titulo: "RECOMENDACIÓN: Fertilización Óptima", 
    info: "Momento ideal para aplicar fertilizante orgánico según análisis de suelo.",
    cultivos: ["Lechugas", "Fresas", "Tomates"]
  },
  {
    tipo: "recomendacion",
    icon: "☀️",
    titulo: "RECOMENDACIÓN: Protección Solar",
    info: "Instalar mallas sombra para proteger cultivos de radiación intensa.",
    cultivos: ["Lechugas", "Fresas", "Pimientos"]
  }
];

// Mapeo de tipos de alerta a clases de estilo
const alertTypeStyles = {
  critica: {
    container: "bg-primary/10 border-l-4 border-primary text-primary",
    title: "text-primary",
    text: "text-text-main",
  },
  advertencia: {
    container: "bg-secondary/10 border-l-4 border-secondary text-secondary",
    title: "text-secondary",
    text: "text-text-main",
  },
  recomendacion: {
    container: "bg-background border-l-4 border-border",
    title: "text-text-main",
    text: "text-text-main/80",
  }
};

const cultivosDisponibles = [
  "Tomates - Lote Sol Naciente",
  "Fresas - El Edén", 
  "Pimientos - Lote Primavera",
  "Maíz - Lote Esperanza",
  "Lechugas - Lote Verde"
];

const DashboardAlertasYRecomendaciones = ({ setCurrentPage }) => {
  const [alertasActuales, setAlertasActuales] = useState([]);
  const [cultivoSeleccionado, setCultivoSeleccionado] = useState("Tomates");

  const generarAlertasRotativas = (cultivo) => {
    const alertasFiltradas = alertasBase.filter(alerta => 
      alerta.cultivos.some(c => cultivo.includes(c.split(' ')[0]))
    );
    const alertasSeleccionadas = [];
    const alertasDisponibles = [...alertasFiltradas];
    for (let i = 0; i < Math.min(3, alertasDisponibles.length); i++) {
      const randomIndex = Math.floor(Math.random() * alertasDisponibles.length);
      const alertaSeleccionada = alertasDisponibles.splice(randomIndex, 1)[0];
      alertasSeleccionadas.push({
        ...alertaSeleccionada,
        desc: `Cultivo: ${cultivo} | Fecha: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
      });
    }
    return alertasSeleccionadas;
  };

  useEffect(() => {
    const actualizarAlertas = () => {
      const nuevasAlertas = generarAlertasRotativas(cultivoSeleccionado);
      setAlertasActuales(nuevasAlertas);
    };
    actualizarAlertas();
    const interval = setInterval(actualizarAlertas, 10000);
    return () => clearInterval(interval);
  }, [cultivoSeleccionado]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCultivo = cultivosDisponibles[Math.floor(Math.random() * cultivosDisponibles.length)];
      setCultivoSeleccionado(randomCultivo);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background-card border border-border shadow-md p-6 transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <h3 className="text-lg font-bold text-text-main font-heading">
            ALERTAS Y RECOMENDACIONES
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <span className="text-xs text-text-main/70 font-heading">EN VIVO</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-background border-l-4 border-accent">
        <p className="text-sm text-text-accent font-bold font-heading">
          CULTIVO ACTUAL: {cultivoSeleccionado.toUpperCase()}
        </p>
        <p className="text-xs text-text-main/80 mt-1">
          Alertas se actualizan cada 10 segundos
        </p>
      </div>

      <div className="space-y-3 flex-1">
        {alertasActuales.map((alerta, index) => {
          const styles = alertTypeStyles[alerta.tipo];
          return (
            <div
              key={`${alerta.titulo}-${index}`}
              className={`p-4 transition-all duration-200 ${styles.container}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{alerta.icon}</span>
                <div className="flex-1">
                  <h4 className={`font-bold text-sm mb-1 font-heading ${styles.title}`}>
                    {alerta.titulo}
                  </h4>
                  <p className={`text-xs mb-2 ${styles.text}`}>
                    {alerta.desc}
                  </p>
                  <p className={`text-sm ${styles.text}`}>
                    {alerta.info}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setCurrentPage("alertas")}
        className="w-full mt-4 bg-primary text-white py-3 px-4 hover:bg-primary/80 transition-all font-heading"
      >
        VER TODAS LAS ALERTAS ({alertasBase.length})
      </button>
    </div>
  );
};

DashboardAlertasYRecomendaciones.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default DashboardAlertasYRecomendaciones;