import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Alertas base que se rotarán aleatoriamente
const alertasBase = [
  {
    tipo: "critica",
    color: "border-red-500 text-red-500",
    bgColor: "bg-red-50",
    icon: "🚨",
    titulo: "ALERTA CRÍTICA: Detección de Roya",
    info: "Se ha detectado una alta probabilidad de infección por Roya. Se recomienda inspección inmediata y tratamiento fungicida.",
    cultivos: ["Tomates", "Pimientos", "Fresas"]
  },
  {
    tipo: "critica", 
    color: "border-red-500 text-red-500",
    bgColor: "bg-red-50",
    icon: "🔥",
    titulo: "ALERTA CRÍTICA: Temperatura Elevada",
    info: "Temperatura superior a 38°C detectada. Riesgo de estrés térmico en plantas.",
    cultivos: ["Tomates", "Pimientos", "Lechugas"]
  },
  {
    tipo: "advertencia",
    color: "border-yellow-500 text-yellow-500", 
    bgColor: "bg-yellow-50",
    icon: "💧",
    titulo: "ADVERTENCIA: Humedad del Suelo Baja",
    info: "Nivel de humedad por debajo del óptimo. Se recomienda riego inmediato.",
    cultivos: ["Fresas", "Lechugas", "Maíz"]
  },
  {
    tipo: "advertencia",
    color: "border-yellow-500 text-yellow-500",
    bgColor: "bg-yellow-50", 
    icon: "🦗",
    titulo: "ADVERTENCIA: Actividad de Plagas",
    info: "Detectada actividad inusual de insectos. Monitorear de cerca.",
    cultivos: ["Maíz", "Tomates", "Pimientos"]
  },
  {
    tipo: "recomendacion",
    color: "border-green-500 text-green-500",
    bgColor: "bg-green-50",
    icon: "🌱",
    titulo: "RECOMENDACIÓN: Fertilización Óptima", 
    info: "Momento ideal para aplicar fertilizante orgánico según análisis de suelo.",
    cultivos: ["Lechugas", "Fresas", "Tomates"]
  },
  {
    tipo: "recomendacion",
    color: "border-green-500 text-green-500",
    bgColor: "bg-green-50",
    icon: "☀️",
    titulo: "RECOMENDACIÓN: Protección Solar",
    info: "Instalar mallas sombra para proteger cultivos de radiación intensa.",
    cultivos: ["Lechugas", "Fresas", "Pimientos"]
  }
];

// Cultivos disponibles
const cultivosDisponibles = [
  "Tomates - Lote Sol Naciente",
  "Fresas - El Edén", 
  "Pimientos - Lote Primavera",
  "Maíz - Lote Esperanza",
  "Lechugas - Lote Verde"
];

/**
 * Componente de alertas y recomendaciones rotativas para el dashboard
 */
const DashboardAlertasYRecomendaciones = ({ setCurrentPage }) => {
  const [alertasActuales, setAlertasActuales] = useState([]);
  const [cultivoSeleccionado, setCultivoSeleccionado] = useState("Tomates");

  // Función para generar alertas aleatorias basadas en el cultivo
  const generarAlertasRotativas = (cultivo) => {
    const alertasFiltradas = alertasBase.filter(alerta => 
      alerta.cultivos.some(c => cultivo.includes(c.split(' ')[0]))
    );
    
    // Seleccionar 3 alertas aleatorias
    const alertasSeleccionadas = [];
    const alertasDisponibles = [...alertasFiltradas];
    
    for (let i = 0; i < Math.min(3, alertasDisponibles.length); i++) {
      const randomIndex = Math.floor(Math.random() * alertasDisponibles.length);
      const alertaSeleccionada = alertasDisponibles.splice(randomIndex, 1)[0];
      
      // Personalizar la alerta con el cultivo específico
      alertasSeleccionadas.push({
        ...alertaSeleccionada,
        desc: `Cultivo: ${cultivo} | Fecha: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
      });
    }
    
    return alertasSeleccionadas;
  };

  // Efecto para rotar alertas cada 10 segundos
  useEffect(() => {
    const actualizarAlertas = () => {
      const nuevasAlertas = generarAlertasRotativas(cultivoSeleccionado);
      setAlertasActuales(nuevasAlertas);
    };

    // Generar alertas iniciales
    actualizarAlertas();

    // Rotar alertas cada 10 segundos
    const interval = setInterval(actualizarAlertas, 10000);

    return () => clearInterval(interval);
  }, [cultivoSeleccionado]);

  // Efecto para cambiar cultivo cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCultivo = cultivosDisponibles[Math.floor(Math.random() * cultivosDisponibles.length)];
      setCultivoSeleccionado(randomCultivo);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <h3 className="text-lg font-bold text-gray-800">
            Alertas y Recomendaciones
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">En vivo</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-700">
          <strong>Cultivo actual:</strong> {cultivoSeleccionado}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Las alertas se actualizan automáticamente cada 10 segundos
        </p>
      </div>

      <div className="space-y-3">
        {alertasActuales.map((alerta, index) => (
          <div
            key={`${alerta.titulo}-${index}`}
            className={`p-4 rounded-lg border-l-4 ${alerta.color} ${alerta.bgColor} hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{alerta.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  {alerta.titulo}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {alerta.desc}
                </p>
                <p className="text-sm text-gray-700">
                  {alerta.info}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage("alertas")}
        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-medium"
      >
        Ver Todas las Alertas ({alertasBase.length})
      </button>
    </div>
  );
};

DashboardAlertasYRecomendaciones.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default DashboardAlertasYRecomendaciones;