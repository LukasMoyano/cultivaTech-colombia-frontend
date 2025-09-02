import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoDetailView.jsx
 * @description React component that displays the detailed view of a single crop.
 *              It shows various metrics, AI detections, and provides navigation options.
 *              This component is styled according to the application's theme (Evangelion/Cyber).
 *
 * @param {object} props - The component props.
 * @param {object} props.cultivo - An object containing the detailed crop data.
 * @param {function} props.setDetalle - Callback function to clear the detail view and return to the crop list.
 * @param {function} [props.setCurrentPage] - Optional callback function to navigate to other pages (e.g., "robot").
 * @returns {JSX.Element} A styled view displaying detailed crop information.
 */
const CultivoDetailView = ({ cultivo, setDetalle, setCurrentPage }) => {
  return (
    // Main container for the detail view. Uses themed background, border, and shadow.
    <div className="container mx-auto p-4 bg-background-card border border-border shadow-md">
      {/* Button to go back to the list of crops. */}
      <button className="border border-secondary text-secondary px-4 py-2 hover:bg-secondary/20 font-heading mb-4" onClick={() => setDetalle(null)}>
        ← VOLVER A MIS CULTIVOS
      </button>
      {/* Crop name: large heading, bold, themed accent color, heading font. */}
      <h3 className="text-2xl font-bold text-text-accent font-heading mb-2">{cultivo.nombre.toUpperCase()}</h3>
      {/* Crop details: uses main text color, some bolding. */}
      <p className="text-text-main/80 mb-1">FECHA DE SIEMBRA: {cultivo.siembra}</p>
      <p className="text-text-main/80 mb-4">
        ESTADO FENOLÓGICO: <span className="font-semibold">{cultivo.fenologico.toUpperCase()}</span>
      </p>
      {/* Grid for various information cards (humidity, temperature, AI detections). */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Humidity Chart Placeholder Card */}
        <div className="bg-background-card border border-border shadow-md p-6">
          <div className="font-heading text-text-main text-lg mb-4">💧 HUMEDAD DEL SUELO (ÚLTIMAS 24H)</div>
          <div className="chart-container h-64 md:h-80 flex items-center justify-center text-text-main/70">
            (Gráfico próximamente)
          </div>
        </div>
        {/* Temperature Chart Placeholder Card */}
        <div className="bg-background-card border border-border shadow-md p-6">
          <div className="font-heading text-text-main text-lg mb-4">🌡️ TEMPERATURA AMBIENTE (ÚLTIMAS 24H)</div>
          <div className="chart-container h-64 md:h-80 flex items-center justify-center text-text-main/70">
            (Gráfico próximamente)
          </div>
        </div>
        {/* AI Detections Card */}
        <div className="bg-background-card border border-border shadow-md p-6 md:col-span-2">
          <div className="font-heading text-text-main text-lg mb-4">💡 ÚLTIMAS DETECCIONES IA</div>
          <ul className="space-y-2 text-text-main">
            {cultivo.ia.map((comentario, idx) => (
              <li key={idx}>
                <span className="mr-2">
                  {/* Conditional icon based on comment content */}
                  {comentario.startsWith("✅") ? "✅" : comentario.startsWith("⚠️") ? "⚠️" : "💡"}
                </span>{" "}
                {comentario}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Action buttons */}
      <div className="mt-6 space-x-3">
        {/* "Ver Historial Completo" button */}
        <button className="bg-secondary text-black px-4 py-2 hover:bg-secondary/80 font-heading">VER HISTORIAL COMPLETO</button>
        {/* "Programar Tarea Robot" button, navigates to robot page */}
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

// PropTypes for type checking and documentation
CultivoDetailView.propTypes = {
  cultivo: PropTypes.object.isRequired, // 'cultivo' object is required
  setDetalle: PropTypes.func.isRequired, // 'setDetalle' function is required
  setCurrentPage: PropTypes.func, // 'setCurrentPage' is an optional function
};

export default CultivoDetailView;