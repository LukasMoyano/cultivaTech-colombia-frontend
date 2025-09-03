import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoForm.jsx
 * @description Componente de React para el formulario de "Añadir Cultivo".
 *              Permite a los usuarios ingresar detalles para un nuevo cultivo y enviarlo.
 *              La visibilidad del formulario se controla mediante un interruptor en el componente padre.
 *              El estilo se aplica usando el tema de la aplicación (Evangelion/Cyber).
 *
 * @param {object} props - Las props del componente.
 * @param {object} props.nuevoCultivo - El objeto de estado que contiene los datos del nuevo cultivo.
 * @param {function} props.setNuevoCultivo - Función para actualizar el estado del nuevo cultivo.
 * @param {function} props.handleAgregarCultivo - Función de callback para manejar el envío del formulario y añadir el nuevo cultivo.
 * @returns {JSX.Element} Un formulario estilizado para añadir nuevos cultivos.
 */
const CultivoForm = ({ nuevoCultivo, setNuevoCultivo, handleAgregarCultivo }) => {
  // Clases comunes de Tailwind CSS para campos de entrada para asegurar un estilo consistente.
  const inputStyles = "border border-border bg-background text-text-main px-2 py-1";
  // Clases comunes de Tailwind CSS para el botón de envío.
  const buttonStyles = "bg-primary text-white py-2 px-4 font-heading";

  return (
    // Contenedor principal del formulario. Su visibilidad se controla mediante el componente padre (Cultivos.jsx)
    // usando un interruptor de clase (oculto/visible).
    // Usa fondo temático, borde y relleno.
    <form
      id="form-nuevo-cultivo" // ID usado por el padre para alternar la visibilidad
      className="hidden mb-6 bg-background-card p-4 border border-border"
      onSubmit={handleAgregarCultivo} // Manejador de envío del formulario
    >
      {/* Contenedor flexible para campos de entrada, permitiendo envolver y espaciar. */}
      <div className="flex flex-wrap gap-4 mb-2">
        {/* Entrada para el nombre del cultivo */}
        <input
          type="text"
          className={`${inputStyles} w-48`} // Aplica estilos comunes de entrada y ancho específico
          placeholder="Nombre del cultivo"
          value={nuevoCultivo.nombre}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, nombre: e.target.value })}
          required // Atributo requerido de HTML5
        />
        {/* Entrada para la fecha de siembra */}
        <input
          type="date"
          className={`${inputStyles} w-40`}
          placeholder="Fecha de siembra"
          value={nuevoCultivo.siembra}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, siembra: e.target.value })}
          required
        />
        {/* Entrada para la humedad de 4 horas */}
        <input
          type="text"
          className={`${inputStyles} w-32`}
          placeholder="Humedad 4h (%)"
          value={nuevoCultivo.humedad4h}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, humedad4h: e.target.value })}
        />
        {/* Entrada para la temperatura de 4 horas */}
        <input
          type="text"
          className={`${inputStyles} w-32`}
          placeholder="Temp. 4h (°C)"
          value={nuevoCultivo.temperatura4h}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, temperatura4h: e.target.value })}
        />
      </div>
      {/* Entrada para el comentario de IA */}
      <input
        type="text"
        className={`${inputStyles} w-full mb-2`}
        placeholder="Comentario IA (opcional)"
        value={nuevoCultivo.ia[0] || ""} // Muestra el primer comentario de IA si existe
        onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, ia: [e.target.value] })} // Actualiza el comentario de IA
      />
      {/* Botón de envío para el formulario */}
      <button className={buttonStyles} type="submit">
        GUARDAR CULTIVO
      </button>
    </form>
  );
};

// PropTypes para verificación de tipos y documentación
CultivoForm.propTypes = {
  nuevoCultivo: PropTypes.object.isRequired, // El objeto 'nuevoCultivo' es requerido
  setNuevoCultivo: PropTypes.func.isRequired, // La función 'setNuevoCultivo' es requerida
  handleAgregarCultivo: PropTypes.func.isRequired, // La función 'handleAgregarCultivo' es requerida
};

export default CultivoForm;