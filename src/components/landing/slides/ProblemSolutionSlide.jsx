import React from 'react';

/**
 * @file ProblemSolutionSlide.jsx
 * @description Representa la segunda diapositiva de la página de inicio, detallando problemas en la agricultura
 *              y cómo CultivaTech ColombIA proporciona soluciones.
 *              Usa un diseño de dos columnas para contrastar visualmente los desafíos y sus resoluciones.
 *              El estilo se aplica usando el sistema de temas de la aplicación, mapeando problema/solución
 *              a los colores primario/secundario del tema para énfasis visual.
 *
 * @returns {JSX.Element} El JSX para la diapositiva de problema/solución.
 */
const ProblemSolutionSlide = () => {
  return (
    // Contenedor principal para el contenido de la diapositiva, usando una cuadrícula para un diseño de dos columnas en pantallas medianas y superiores.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sección para "Problemas Actuales" */}
      {/* Usa el color primario del tema para el borde y el texto, con un tinte de fondo claro. */}
      <div className="bg-primary/10 p-6 border-l-4 border-primary">
        {/* Título para la sección de problemas. Usa fuente de encabezado y color primario del tema. */}
        <h3 className="font-heading text-xl text-primary mb-4">❌ PROBLEMAS ACTUALES</h3>
        {/* Lista de problemas. Usa el color de texto principal. */}
        <ul className="space-y-2 text-sm text-text-main">
          <li>• Falta de monitoreo en tiempo real</li>
          <li>• Pérdidas económicas por decisiones tardías</li>
          <li>• Herramientas costosas e inaccesibles</li>
          <li>• Información fragmentada y poco clara</li>
        </ul>
      </div>
      {/* Sección para "Nuestra Solución" */}
      {/* Usa el color secundario del tema para el borde y el texto, con un tinte de fondo claro. */}
      <div className="bg-secondary/10 p-6 border-l-4 border-secondary">
        {/* Título para la sección de soluciones. Usa fuente de encabezado y color secundario del tema. */}
        <h3 className="font-heading text-xl text-secondary mb-4">✅ NUESTRA SOLUCIÓN</h3>
        {/* Lista de soluciones. Usa el color de texto principal. */}
        <ul className="space-y-2 text-sm text-text-main">
          <li>• Monitoreo 24/7 con sensores IoT</li>
          <li>• Alertas inteligentes y preventivas</li>
          <li>• Tecnología accesible y escalable</li>
          <li>• Dashboard unificado e intuitivo</li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemSolutionSlide;