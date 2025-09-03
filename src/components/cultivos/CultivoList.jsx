import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoList.jsx
 * @description Componente de React que muestra una lista de tarjetas de cultivos.
 *              Cada tarjeta proporciona un resumen de un cultivo y se puede hacer clic para mostrar más detalles.
 *              Este componente se usa en la página principal "Cultivos".
 *              El estilo se aplica usando el tema de la aplicación (Evangelion/Cyber).
 *
 * @param {object} props - Las props del componente.
 * @param {Array<object>} props.cultivos - Un array de objetos de cultivos para mostrar.
 * @param {function} props.setDetalle - Función de callback para establecer la vista detallada de un cultivo seleccionado.
 * @returns {JSX.Element} Una cuadrícula estilizada que muestra una lista de tarjetas de cultivos.
 */
const CultivoList = ({ cultivos, setDetalle }) => {
  return (
    // Contenedor de cuadrícula para la lista de tarjetas de cultivos. Diseño responsivo para diferentes tamaños de pantalla.
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Itera a través del array 'cultivos' para renderizar cada cultivo como una tarjeta. */}
      {cultivos.map((cultivo) => (
        // Contenedor de tarjeta de cultivo individual.
        // Usa fondo temático, borde, sombra y efectos de desplazamiento.
        // Se puede hacer clic para mostrar detalles del cultivo.
        <div
          key={cultivo.nombre} // Clave única para renderizado de lista
          className="bg-background-card border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
          onClick={() => setDetalle(cultivo.nombre)} // Establece la vista detallada para el cultivo clicado
        >
          {/* Imagen del cultivo */}
          <img src={cultivo.imagen || "https://placehold.co/600x400/A77B55/F2E8CF?text=🌱"} alt={cultivo.nombre} className="rounded-none w-full h-40 object-cover mb-3" />
          {/* Nombre del cultivo: encabezado grande, en negrita, texto temático, fuente de encabezado. */}
          <h3 className="text-xl font-semibold text-text-main font-heading mb-1">{cultivo.nombre.toUpperCase()}</h3>
          {/* Fecha de siembra */}
          <p className="text-text-main/80 text-sm mb-2">SIEMBRA: {cultivo.siembra}</p>
          {/* Indicador de estado y texto */}
          <div className="flex items-center">
            {/* Pequeño cuadrado de color basado en cultivo.color (ej. bg-primary, bg-secondary). */}
            <span className={`inline-block w-3 h-3 rounded-none ${cultivo.color} mr-2`}></span>
            {/* Estado del cultivo: en mayúsculas para énfasis. */}
            <span className="text-text-main/80 text-sm">ESTADO: {(cultivo.estado || 'N/D').toUpperCase()}</span>
          </div>
          {/* Métrica de humedad */}
          <p className="text-text-main/80 text-sm mt-1">
            HUMEDAD SUELO (4H): {cultivo.humedad4h || "N/D"}
          </p>
          {/* Métrica de temperatura */}
          <p className="text-text-main/80 text-sm">
            TEMP. (4H): {cultivo.temperatura4h || "N/D"}
          </p>
          {/* Resumen de conocimientos de IA */}
          <p className="text-text-main/80 text-xs mt-1">
            IA: {cultivo.ia && cultivo.ia.length > 0 ? cultivo.ia[0] : "SIN DATOS IA"}
          </p>
        </div>
      ))}
    </div>
  );
};

// PropTypes para verificación de tipos y documentación
CultivoList.propTypes = {
  cultivos: PropTypes.array.isRequired, // El array 'cultivos' es requerido
  setDetalle: PropTypes.func.isRequired, // La función 'setDetalle' es requerida
};

export default CultivoList;