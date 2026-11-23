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
      <div>
        <div className="text-5xl sm:text-6xl mb-3" aria-hidden="true">🌾✨</div>
        <p className="text-base sm:text-xl text-text-main mb-4">
          <strong className="text-text-accent">Agricultores</strong>,{" "}
          <strong className="text-text-accent">juventud rural</strong> e{" "}
          <strong className="text-[var(--color-primary-readable)]">inversionistas</strong>{" "}
          conectados en tiempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        <StatCard value="90 Días" label="Ciclo piloto · Lote #01 Sumapaz" />
        <StatCard value="0 Hipotecas" label="Financiamiento sin gota a gota" />
        <StatCard value="Máx. 19" label="Aliados en colocación privada" />
      </div>

      {/* Dos caminos conectados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left text-xs">
        <div className="p-3.5 bg-accent/10 border border-accent/50 flex items-center gap-3">
          <span className="text-2xl shrink-0" aria-hidden="true">🌾</span>
          <div>
            <strong className="font-heading text-text-accent block">PARA EL AGRICULTOR Y JÓVENES</strong>
            <span className="text-text-main/85">
              Respaldo sin tasas del 24 %–36 % EA bancario, relevo rural y monitoreo IoT en la finca.
            </span>
          </div>
        </div>
        <div className="p-3.5 bg-primary/10 border border-primary/50 flex items-center gap-3">
          <span className="text-2xl shrink-0" aria-hidden="true">💎</span>
          <div>
            <strong className="font-heading text-[var(--color-primary-readable)] block">PARA EL INVERSIONISTA</strong>
            <span className="text-text-main/85">
              Lote Piloto #01 privado (&lt; 20 aliados) desde $120K/puesto (sugerido $1M–$3M),
              retorno variable NO garantizado.
            </span>
          </div>
        </div>
      </div>

      {/* Aviso normativo obligatorio (Decreto 2555/2010 · sin garantía de retorno fijo) */}
      <div
        role="note"
        aria-label="Aviso de riesgos y alcance piloto"
        className="p-3 bg-primary/10 border border-primary/50 text-left text-[11px] sm:text-xs text-text-main/90 leading-relaxed"
      >
        <strong className="text-[var(--color-primary-readable)] font-heading">
          ⚠️ Piloto demostrativo (Simulación local / listo para Sepolia):
        </strong>{" "}
        NO es oferta pública de valores (Decreto 2555/2010), NO es un CDT ni garantiza
        rentabilidad fija. Sujeto a riesgo productivo agrícola, liquidación al cierre según venta
        real y sin retiro anticipado durante el ciclo.
      </div>

      {/* Sección de Llamado a la Acción. */}
      <div className="space-y-4 pt-2">
        <p className="font-heading text-lg sm:text-xl text-text-accent">
          ¿LISTO PARA EXPLORAR CULTIVATECH COLOMBIA?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {onEnterDemo && (
            <>
              <button
                type="button"
                onClick={() => onEnterDemo("inversionista")}
                className="w-full sm:w-auto bg-[var(--color-primary-btn)] text-white py-3 px-5 font-heading hover:opacity-90 transition-opacity text-xs sm:text-sm min-h-[44px] cursor-pointer"
              >
                💎 EXPLORAR DEMO INVERSIONISTA
              </button>
              <button
                type="button"
                onClick={() => onEnterDemo("agricultor")}
                className="w-full sm:w-auto bg-[var(--color-accent-btn)] text-[var(--color-on-accent-btn)] py-3 px-5 font-heading hover:opacity-90 transition-opacity text-xs sm:text-sm min-h-[44px] cursor-pointer"
              >
                🌱 EXPLORAR DEMO AGRICULTOR
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setCurrentPage("ingreso")}
            className="w-full sm:w-auto border border-border bg-background text-text-main py-3 px-5 font-heading hover:border-primary transition-colors text-xs sm:text-sm min-h-[44px] cursor-pointer"
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