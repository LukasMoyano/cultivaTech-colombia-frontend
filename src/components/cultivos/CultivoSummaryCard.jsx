import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CultivoSummaryCard.jsx
 * @description Componente de React que muestra una vista resumida de un solo cultivo.
 *              Esta tarjeta se usa típicamente en el Dashboard para proporcionar una vista rápida
 *              del estado y métricas clave de cada cultivo.
 *              Está estilado según el tema de la aplicación (Evangelion/Cyber).
 *
 * @param {object} props - Las props del componente.
 * @param {object} props.cultivo - Un objeto que contiene los datos del cultivo (nombre, imagen, estado, color, humedad4h, temperatura4h, ia).
 * @param {function} [props.onSeleccionar] - Función de callback opcional que se llama cuando se hace clic en el botón "Ver Detalle".
 * @returns {JSX.Element} Una tarjeta estilizada que muestra información resumida del cultivo.
 */
const CultivoSummaryCard = ({ cultivo, onSeleccionar }) => {
  return (
    // Contenedor principal para la tarjeta de resumen del cultivo.
    // Usa borde temático, relleno, fondo y sombra.
    <div
      key={cultivo.nombre} // Clave única para renderizado de lista
      className="border border-border p-3 flex flex-col bg-background-card shadow-md"
    >
      <div className="flex items-center mb-2">
        {/* Imagen del cultivo */}
        <img
          src={cultivo.imagen || "https://placehold.co/600x400/A77B55/F2E8CF?text=🌱"}
          alt={cultivo.nombre}
          className="w-10 h-10 rounded-none mr-3" // Esquinas afiladas para la imagen
        />
        <div>
          {/* Nombre del cultivo: usa fuente de encabezado y color de texto principal. */}
          <span className="font-semibold text-text-main font-heading">
            {cultivo.nombre}
          </span>
          {/* Indicador de estado: un pequeño cuadrado de color basado en cultivo.color (ej. bg-primary, bg-secondary). */}
          <span
            className={`ml-2 inline-block w-3 h-3 rounded-none ${cultivo.color}`}
            title={cultivo.estado} // La descripción emergente muestra el estado del cultivo
          ></span>
        </div>
      </div>
      {/* Métricas clave: humedad y temperatura */}
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
      {/* Resumen de conocimientos de IA */}
      <div className="text-xs text-text-main/70 mb-1">
        <span className="font-semibold">IA:</span>{" "}
        {cultivo.ia && cultivo.ia.length > 0
          ? cultivo.ia[0] // Muestra el primer comentario de IA
          : "Sin datos IA"}
      </div>
      {/* Botón "Ver Detalle", renderizado condicionalmente */}
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

// PropTypes para verificación de tipos y documentación
CultivoSummaryCard.propTypes = {
  cultivo: PropTypes.object.isRequired, // El objeto 'cultivo' es requerido
  onSeleccionar: PropTypes.func, // 'onSeleccionar' es una función opcional
};

export default CultivoSummaryCard;