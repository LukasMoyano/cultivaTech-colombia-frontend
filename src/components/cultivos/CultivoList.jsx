import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoList.jsx
 * @description React component that displays a list of crop cards.
 *              Each card provides a summary of a crop and is clickable to show more details.
 *              This component is used in the main "Cultivos" page.
 *              Styling is applied using the application's theme (Evangelion/Cyber).
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.cultivos - An array of crop objects to display.
 * @param {function} props.setDetalle - Callback function to set the detailed view for a selected crop.
 * @returns {JSX.Element} A styled grid displaying a list of crop cards.
 */
const CultivoList = ({ cultivos, setDetalle }) => {
  return (
    // Grid container for the list of crop cards. Responsive layout for different screen sizes.
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Map through the 'cultivos' array to render each crop as a card. */}
      {cultivos.map((cultivo) => (
        // Individual crop card container.
        // Uses themed background, border, shadow, and hover effects.
        // Clickable to show crop details.
        <div
          key={cultivo.nombre} // Unique key for list rendering
          className="bg-background-card border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
          onClick={() => setDetalle(cultivo.nombre)} // Sets the detail view for the clicked crop
        >
          {/* Crop image */}
          <img src={cultivo.imagen || "https://placehold.co/600x400/A77B55/F2E8CF?text=🌱"} alt={cultivo.nombre} className="rounded-none w-full h-40 object-cover mb-3" />
          {/* Crop name: large heading, bold, themed text, heading font. */}
          <h3 className="text-xl font-semibold text-text-main font-heading mb-1">{cultivo.nombre.toUpperCase()}</h3>
          {/* Planting date */}
          <p className="text-text-main/80 text-sm mb-2">SIEMBRA: {cultivo.siembra}</p>
          {/* Status indicator and text */}
          <div className="flex items-center">
            {/* Small colored square based on cultivo.color (e.g., bg-primary, bg-secondary). */}
            <span className={`inline-block w-3 h-3 rounded-none ${cultivo.color} mr-2`}></span>
            {/* Crop status: uppercase for emphasis. */}
            <span className="text-text-main/80 text-sm">ESTADO: {(cultivo.estado || 'N/D').toUpperCase()}</span>
          </div>
          {/* Humidity metric */}
          <p className="text-text-main/80 text-sm mt-1">
            HUMEDAD SUELO (4H): {cultivo.humedad4h || "N/D"}
          </p>
          {/* Temperature metric */}
          <p className="text-text-main/80 text-sm">
            TEMP. (4H): {cultivo.temperatura4h || "N/D"}
          </p>
          {/* AI insights summary */}
          <p className="text-text-main/80 text-xs mt-1">
            IA: {cultivo.ia && cultivo.ia.length > 0 ? cultivo.ia[0] : "SIN DATOS IA"}
          </p>
        </div>
      ))}
    </div>
  );
};

// PropTypes for type checking and documentation
CultivoList.propTypes = {
  cultivos: PropTypes.array.isRequired, // 'cultivos' array is required
  setDetalle: PropTypes.func.isRequired, // 'setDetalle' function is required
};

export default CultivoList;