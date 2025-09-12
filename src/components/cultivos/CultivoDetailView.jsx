import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoDetailView.jsx
 * @description Componente de React que muestra la vista detallada de un solo cultivo.
 *              Muestra varias métricas, detecciones de IA y proporciona opciones de navegación.
 *              Este componente está estilizado según el tema de la aplicación (Evangelion/Cyber).
 *
 * @param {object} props - Las props del componente.
 * @param {object} props.cultivo - Un objeto que contiene los datos detallados del cultivo.
 * @param {function} props.setDetalle - Función de callback para limpiar la vista detallada y volver a la lista de cultivos.
 * @param {function} [props.setCurrentPage] - Función de callback opcional para navegar a otras páginas (ej. "robot").
 * @returns {JSX.Element} Una vista estilizada que muestra información detallada del cultivo.
 */
const CultivoDetailView = ({ cultivo, setDetalle, setCurrentPage }) => {
  return (
    // Contenedor principal para la vista detallada. Usa fondo temático, borde y sombra.
    <div className="container mx-auto p-4 bg-background-card border border-border shadow-md">
      {/* Botón para volver a la lista de cultivos. */}
      <button className="border border-secondary text-secondary px-4 py-2 hover:bg-secondary/20 font-heading mb-4" onClick={() => setDetalle(null)}>
        ← VOLVER A MIS CULTIVOS
      </button>
      {/* Nombre del cultivo: encabezado grande, en negrita, color de énfasis temático, fuente de encabezado. */}
      <h3 className="text-2xl font-bold text-text-accent font-heading mb-2">{cultivo.nombre.toUpperCase()}</h3>
      {/* Detalles del cultivo: usa el color de texto principal, algo en negrita. */}
      <p className="text-text-main/80 mb-1">FECHA DE SIEMBRA: {cultivo.siembra}</p>
      <p className="text-text-main/80 mb-4">
        ESTADO FENOLÓGICO: <span className="font-semibold">{cultivo.fenologico ? cultivo.fenologico.toUpperCase() : 'NO DISPONIBLE'}</span>
      </p>
      {/* Cuadrícula para varias tarjetas de información (humedad, temperatura, detecciones de IA). */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de marcador de posición del gráfico de humedad */}
        <div className="bg-background-card border border-border shadow-md p-6">
          <div className="font-heading text-text-main text-lg mb-4">💧 HUMEDAD DEL SUELO (ÚLTIMAS 24H)</div>
          <div className="chart-container h-64 md:h-80 flex items-center justify-center text-text-main/70">
            (Gráfico próximamente)
          </div>
        </div>
        {/* Tarjeta de marcador de posición del gráfico de temperatura */}
        <div className="bg-background-card border border-border shadow-md p-6">
          <div className="font-heading text-text-main text-lg mb-4">🌡️ TEMPERATURA AMBIENTE (ÚLTIMAS 24H)</div>
          <div className="chart-container h-64 md:h-80 flex items-center justify-center text-text-main/70">
            (Gráfico próximamente)
          </div>
        </div>
        {/* Tarjeta de detecciones de IA */}
        <div className="bg-background-card border border-border shadow-md p-6 md:col-span-2">
          <div className="font-heading text-text-main text-lg mb-4">💡 ÚLTIMAS DETECCIONES IA</div>
          <ul className="space-y-2 text-text-main">
            {cultivo.ia && Array.isArray(cultivo.ia) ? (
              cultivo.ia.map((comentario, idx) => (
                <li key={idx}>
                  <span className="mr-2">
                    {/* Ícono condicional basado en el contenido del comentario */}
                    {comentario.startsWith("✅") ? "✅" : comentario.startsWith("⚠️") ? "⚠️" : "💡"}
                  </span>{" "}
                  {comentario}
                </li>
              ))
            ) : (
              <li>No hay detecciones de IA disponibles</li>
            )}
          </ul>
        </div>
      </div>
      {/* Botones de acción */}
      <div className="mt-6 space-x-3">
        {/* Botón "Ver Historial Completo" */}
        <button className="bg-secondary text-black px-4 py-2 hover:bg-secondary/80 font-heading">VER HISTORIAL COMPLETO</button>
        {/* Botón "Programar Tarea Robot", navega a la página del robot */}
        <button
          className="bg-primary text-white px-4 py-2 hover:bg-primary/80 font-heading"
          onClick={() => setCurrentPage && setCurrentPage("robot")}
        >
          PROGRAMAR TAREA ROBOT
        </button>
      </div>
    </div>
  );
};

// PropTypes para verificación de tipos y documentación
CultivoDetailView.propTypes = {
  cultivo: PropTypes.object.isRequired, // El objeto 'cultivo' es requerido
  setDetalle: PropTypes.func.isRequired, // La función 'setDetalle' es requerida
  setCurrentPage: PropTypes.func, // 'setCurrentPage' es una función opcional
};

export default CultivoDetailView;