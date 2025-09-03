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
const StepCard = ({ icon, title, subtitle, borderColor }) => (
  // Contenedor de tarjeta: texto centrado, relleno temático, borde superior y fondo.
  // El color del borde es dinámico basado en las props.
  <div className={`text-center p-6 border-t-4 ${borderColor} bg-background-card`}>
    {/* Ícono: texto grande. */}
    <div className="text-5xl mb-4">{icon}</div>
    {/* Título: usa fuente de encabezado, texto grande y color de énfasis. */}
    <h3 className="font-heading text-xl text-text-accent">{title}</h3>
    {/* Subtítulo: texto más pequeño, color de texto principal ligeramente atenuado. */}
    <p className="text-sm text-text-main/80">{subtitle}</p>
  </div>
);

/**
 * @file HowItWorksSlide.jsx
 * @description Representa la cuarta diapositiva de la página de inicio, explicando el proceso simple y efectivo
 *              de CultivaTech ColombIA en cuatro pasos.
 *              Utiliza el componente `StepCard` para mostrar consistentemente cada paso.
 *              El diseño usa una cuadrícula con un espacio de 1px para crear separadores visuales temáticos, y todo el estilo
 *              está integrado con el sistema de temas de la aplicación.
 *
 * @returns {JSX.Element} El JSX para la diapositiva "Cómo Funciona".
 */
const HowItWorksSlide = () => {
  return (
    // Contenedor principal para el contenido de la diapositiva. Usa space-y para espaciado vertical.
    <div className="space-y-8">
      {/* Cuadrícula para los cuatro pasos. El `gap-px bg-border` crea divisores delgados temáticos entre tarjetas. */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
        {/* Componentes StepCard individuales para cada paso, con colores de borde dinámicos. */}
        <StepCard icon="📡" title="1. SENSORES" subtitle="Recolectan datos 24/7" borderColor="border-primary" />
        <StepCard icon="🧠" title="2. IA ANALIZA" subtitle="Procesa y predice" borderColor="border-secondary" />
        <StepCard icon="⚠️" title="3. ALERTAS" subtitle="Notifica problemas" borderColor="border-primary" />
        <StepCard icon="🎯" title="4. ACCIÓN" subtitle="Tomas decisiones" borderColor="border-secondary" />
      </div>
      {/* Texto de resumen del resultado. */}
      <div className="text-center pt-4">
        {/* Usa color de texto temático y color de énfasis para énfasis. */}
        <p className="text-lg text-text-main">
          <strong className="text-accent font-heading">RESULTADO:</strong> Cultivos más saludables, mayor productividad y decisiones informadas.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksSlide;