import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoSummaryCard.jsx
 * @description React component that displays a summarized view of a single crop.
 *              This card is typically used in the Dashboard to provide a quick overview
 *              of each crop's status and key metrics.
 *              It is styled according to the application's theme (Evangelion/Cyber).
 *
 * @param {object} props - The component props.
 * @param {object} props.cultivo - An object containing the crop's data (nombre, imagen, estado, color, humedad4h, temperatura4h, ia).
 * @param {function} [props.onSeleccionar] - Optional callback function to be called when the "Ver Detalle" button is clicked.
 * @returns {JSX.Element} A styled card displaying summarized crop information.
 */
const CultivoSummaryCard = ({ cultivo, onSeleccionar }) => {
  return (
    // Main container for the crop summary card.
    // Uses themed border, padding, background, and shadow.
    <div
      key={cultivo.nombre} // Unique key for list rendering
      className="border border-border p-3 flex flex-col bg-background-card shadow-md"
    >
      <div className="flex items-center mb-2">
        {/* Crop image */}
        <img
          src={cultivo.imagen}
          alt={cultivo.nombre}
          className="w-10 h-10 rounded-none mr-3" // Sharp corners for image
        />
        <div>
          {/* Crop name: uses heading font and main text color. */}
          <span className="font-semibold text-text-main font-heading">
            {cultivo.nombre}
          </span>
          {/* Status indicator: a small colored square based on cultivo.color (e.g., bg-primary, bg-secondary). */}
          <span
            className={`ml-2 inline-block w-3 h-3 rounded-none ${cultivo.color}`}
            title={cultivo.estado} // Tooltip shows crop status
          ></span>
        </div>
      </div>
      {/* Key metrics: humidity and temperature */}
      <div className="flex flex-wrap gap-4 text-sm mb-1 text-text-main/80">
        <span>
          <span className="font-semibold">Humedad suelo (4h):</span>{" "}
          {cultivo.humedad4h || "N/D"}
        </span>
        <span>
          <span className="font-semibold">Temp. (4h):</span>{" "}
          {cultivo.temperatura4h || "N/D"}
        </span>
      </div>
      {/* AI insights summary */}
      <div className="text-xs text-text-main/70 mb-1">
        <span className="font-semibold">IA:</span>{" "}
        {cultivo.ia && cultivo.ia.length > 0
          ? cultivo.ia[0] // Display first AI comment
          : "Sin datos IA"}
      </div>
      {/* "Ver Detalle" button, conditionally rendered */}
      {onSeleccionar && (
        <button
          className="border border-secondary text-secondary text-xs px-2 py-1 hover:bg-secondary/20 font-heading mt-1"
          onClick={() => onSeleccionar(cultivo.nombre)}
        >
          VER DETALLE
        </button>
      )}
    </div>
  );
};

// PropTypes for type checking and documentation
CultivoSummaryCard.propTypes = {
  cultivo: PropTypes.object.isRequired, // 'cultivo' object is required
  onSeleccionar: PropTypes.func, // 'onSeleccionar' is an optional function
};

export default CultivoSummaryCard;