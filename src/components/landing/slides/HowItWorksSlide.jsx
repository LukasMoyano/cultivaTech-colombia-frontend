import React from 'react';

/**
 * @file HowItWorksSlide.jsx
 * @description Componente reutilizable para mostrar un solo paso en la sección "Cómo Funciona".
 *              Toma un ícono, título, subtítulo y una clase de color de borde como props.
 *              El estilo se aplica usando el sistema de temas de la aplicación.
 *
 * @param {object} props - Las props del componente.
 * @param {string} props.icon - El emoji o ícono que representa el paso.
 * @param {string} props.title - El título del paso (ej. "1. Sensores").
 * @param {string} props.subtitle - Una breve descripción del paso.
 * @param {string} props.borderColor - Clase CSS de Tailwind para el color del borde superior (ej. "border-primary").
 * @returns {JSX.Element} Una tarjeta estilizada que representa un paso en el proceso.
 */
const StepCard = ({ icon, title, subtitle, borderColor, className = "" }) => (
  <div className={`text-center p-4 xl:p-5 border border-border border-t-4 ${borderColor} bg-background flex flex-col justify-start ${className}`}>
    <div className="text-4xl mb-3" aria-hidden="true">{icon}</div>
    <h3 className="font-heading text-base xl:text-lg text-text-accent break-words">{title}</h3>
    <p className="text-xs sm:text-sm text-text-main/80 mt-1">{subtitle}</p>
  </div>
);

const HowItWorksSlide = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        <StepCard icon="📡" title="1. SENSORES" subtitle="Miden gases/CO₂ est. 24/7" borderColor="border-t-primary" />
        <StepCard icon="🧠" title="2. ALERTAS" subtitle="Detecta umbrales a tiempo" borderColor="border-t-secondary" />
        <StepCard icon="⛓️" title="3. REGISTRO" subtitle="Huella Merkle (simulación / Sepolia)" borderColor="border-t-primary" />
        <StepCard icon="🤝" title="4. ALIANZA" subtitle="Capital sin gota a gota" borderColor="border-t-secondary" />
        <StepCard
          icon="💸"
          title="5. COSECHA"
          subtitle="Liquidación tras venta real (sujeta a cosecha y recaudo)"
          borderColor="border-t-primary"
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      <div className="text-center pt-2">
        <p className="text-sm sm:text-lg text-text-main">
          <strong className="text-text-accent font-heading">RESULTADO:</strong> Jóvenes innovando en su tierra, cosechas sanas e inversión 100 % visible.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksSlide;