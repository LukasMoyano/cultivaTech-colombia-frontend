import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoForm.jsx
 * @description React component for the "Add Crop" form.
 *              It allows users to input details for a new crop and submit it.
 *              The form's visibility is controlled by a toggle in the parent component.
 *              Styling is applied using the application's theme (Evangelion/Cyber).
 *
 * @param {object} props - The component props.
 * @param {object} props.nuevoCultivo - The state object holding the new crop's data.
 * @param {function} props.setNuevoCultivo - Function to update the new crop's state.
 * @param {function} props.handleAgregarCultivo - Callback function to handle form submission and add the new crop.
 * @returns {JSX.Element} A styled form for adding new crops.
 */
const CultivoForm = ({ nuevoCultivo, setNuevoCultivo, handleAgregarCultivo }) => {
  // Common Tailwind CSS classes for input fields to ensure consistent styling.
  const inputStyles = "border border-border bg-background text-text-main px-2 py-1";
  // Common Tailwind CSS classes for the submit button.
  const buttonStyles = "bg-primary text-white py-2 px-4 font-heading";

  return (
    // Main form container. Its visibility is controlled by the parent component (Cultivos.jsx)
    // using a class toggle (hidden/visible).
    // Uses themed background, border, and padding.
    <form
      id="form-nuevo-cultivo" // ID used by parent to toggle visibility
      className="hidden mb-6 bg-background-card p-4 border border-border"
      onSubmit={handleAgregarCultivo} // Form submission handler
    >
      {/* Flex container for input fields, allowing wrapping and spacing. */}
      <div className="flex flex-wrap gap-4 mb-2">
        {/* Input for crop name */}
        <input
          type="text"
          className={`${inputStyles} w-48`} // Apply common input styles and specific width
          placeholder="Nombre del cultivo"
          value={nuevoCultivo.nombre}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, nombre: e.target.value })}
          required // HTML5 required attribute
        />
        {/* Input for planting date */}
        <input
          type="date"
          className={`${inputStyles} w-40`}
          placeholder="Fecha de siembra"
          value={nuevoCultivo.siembra}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, siembra: e.target.value })}
          required
        />
        {/* Input for 4-hour humidity */}
        <input
          type="text"
          className={`${inputStyles} w-32`}
          placeholder="Humedad 4h (%)"
          value={nuevoCultivo.humedad4h}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, humedad4h: e.target.value })}
        />
        {/* Input for 4-hour temperature */}
        <input
          type="text"
          className={`${inputStyles} w-32`}
          placeholder="Temp. 4h (°C)"
          value={nuevoCultivo.temperatura4h}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, temperatura4h: e.target.value })}
        />
      </div>
      {/* Input for AI comment */}
      <input
        type="text"
        className={`${inputStyles} w-full mb-2`}
        placeholder="Comentario IA (opcional)"
        value={nuevoCultivo.ia[0] || ""} // Display first AI comment if exists
        onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, ia: [e.target.value] })} // Update AI comment
      />
      {/* Submit button for the form */}
      <button className={buttonStyles} type="submit">
        GUARDAR CULTIVO
      </button>
    </form>
  );
};

// PropTypes for type checking and documentation
CultivoForm.propTypes = {
  nuevoCultivo: PropTypes.object.isRequired, // 'nuevoCultivo' object is required
  setNuevoCultivo: PropTypes.func.isRequired, // 'setNuevoCultivo' function is required
  handleAgregarCultivo: PropTypes.func.isRequired, // 'handleAgregarCultivo' function is required
};

export default CultivoForm;