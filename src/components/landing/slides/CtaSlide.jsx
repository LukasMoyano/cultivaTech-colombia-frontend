import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CtaSlide.jsx
 * @description Componente reutilizable para mostrar una sola tarjeta de estadística dentro de la diapositiva CTA.
 *              Toma un valor y una etiqueta como props y aplica un estilo consistente.
 *
 * @param {object} props - Las props del componente.
 * @param {string} props.value - El valor estadístico principal (ej. "+35%").
 * @param {string} props.label - La etiqueta descriptiva para la estadística (ej. "Aumento en productividad").
 * @returns {JSX.Element} Una tarjeta estilizada que muestra una estadística clave.
 */
const StatCard = ({ value, label }) => (
  // Contenedor de tarjeta: texto centrado, relleno temático, borde y fondo.
  <div className="p-6 bg-background border border-border text-center">
    {/* Valor estadístico: texto grande, fuente de encabezado y color de énfasis. */}
    <div className="text-4xl font-heading text-accent">{value}</div>
    {/* Etiqueta: texto más pequeño, color de texto principal ligeramente atenuado. */}
    <p className="text-sm text-text-main/80">{label}</p>
  </div>
);

/**
 * @file CtaSlide.jsx
 * @description Representa la diapositiva final de la página de inicio, sirviendo como Llamado a la Acción (CTA).
 *              Destaca logros clave y anima al usuario a comenzar su transformación digital.
 *              Incluye un botón para navegar a la página de registro/inicio de sesión.
 *              El estilo está integrado con el sistema de temas de la aplicación.
 *
 * @param {object} props - Las props del componente.
 * @param {function} props.setCurrentPage - Función para cambiar la página actual de la aplicación.
 * @returns {JSX.Element} El JSX para la diapositiva de Llamado a la Acción.
 */
const CtaSlide = ({ setCurrentPage, onEnterDemo }) => {
  return (
    // Contenedor principal para el contenido de la diapositiva. Usa space-y para espaciado vertical y texto centrado.
    <div className="space-y-8 text-center">
      {/* Bloque de texto de introducción */}
      <div>
        {/* Iconos decorativos */}
        <div className="text-6xl mb-4">🌾✨</div>
        {/* Párrafo descriptivo principal, destacando la confianza del usuario. Usa color de texto temático y color de énfasis para etiquetas strong. */}
        <p className="text-xl text-text-main mb-6">
          Los<strong className="text-accent"> Agricultores </strong>e <strong className="text-primary">Inversionistas</strong> en Colombia confían en CultivaTech ColombIA
        </p>
      </div>
      {/* Cuadrícula para estadísticas clave. Usa `gap-px bg-border` para crear divisores delgados temáticos entre tarjetas. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {/* Componentes StatCard individuales para cada métrica clave. */}
        <StatCard value="+35%" label="Aumento en productividad" />
        <StatCard value="-50%" label="Reducción de pérdidas" />
        <StatCard value="24/7" label="Monitoreo + Trazabilidad Blockchain" />
      </div>
      {/* Sección de Llamado a la Acción. */}
      <div className="space-y-4 pt-6">
        {/* Pregunta CTA: usa fuente de encabezado, texto grande y color de énfasis. */}
        <p className="font-heading text-xl text-text-accent">
          ¿LISTO PARA EXPLORAR CULTIVATECH COLOMBIA?
        </p>
        {/* Contenedor de botones. */}
        <div className="flex flex-wrap justify-center gap-3">
          {onEnterDemo && (
            <>
              <button
                type="button"
                onClick={() => onEnterDemo("inversionista")}
                className="bg-primary text-white py-3 px-6 font-heading hover:bg-primary/80 transition-colors text-sm"
              >
                💎 EXPLORAR DEMO INVERSIONISTA
              </button>
              <button
                type="button"
                onClick={() => onEnterDemo("agricultor")}
                className="bg-accent text-white py-3 px-6 font-heading hover:opacity-90 transition-opacity text-sm"
              >
                🌱 EXPLORAR DEMO AGRICULTOR
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setCurrentPage("ingreso")}
            className="border border-border bg-background text-text-main py-3 px-6 font-heading hover:border-primary transition-colors text-sm"
          >
            🔐 INICIAR SESIÓN / REGISTRO
          </button>
        </div>
      </div>
    </div>
  );
};

CtaSlide.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  onEnterDemo: PropTypes.func,
};

export default CtaSlide;