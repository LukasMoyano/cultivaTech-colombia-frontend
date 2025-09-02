import React from 'react';

/**
 * @file ProblemSolutionSlide.jsx
 * @description Represents the second slide of the Landing Page, detailing problems in agriculture
 *              and how CultivaTech ColombIA provides solutions.
 *              It uses a two-column layout to visually contrast challenges and their resolutions.
 *              Styling is applied using the application's theming system, mapping problem/solution
 *              to primary/secondary theme colors for visual emphasis.
 *
 * @returns {JSX.Element} The JSX for the problem/solution slide.
 */
const ProblemSolutionSlide = () => {
  return (
    // Main container for the slide content, using a grid for a two-column layout on medium screens and up.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Section for "Current Problems" */}
      {/* Uses primary theme color for border and text, with a light background tint. */}
      <div className="bg-primary/10 p-6 border-l-4 border-primary">
        {/* Title for the problems section. Uses heading font and primary theme color. */}
        <h3 className="font-heading text-xl text-primary mb-4">❌ PROBLEMAS ACTUALES</h3>
        {/* List of problems. Uses main text color. */}
        <ul className="space-y-2 text-sm text-text-main">
          <li>• Falta de monitoreo en tiempo real</li>
          <li>• Pérdidas económicas por decisiones tardías</li>
          <li>• Herramientas costosas e inaccesibles</li>
          <li>• Información fragmentada y poco clara</li>
        </ul>
      </div>
      {/* Section for "Our Solution" */}
      {/* Uses secondary theme color for border and text, with a light background tint. */}
      <div className="bg-secondary/10 p-6 border-l-4 border-secondary">
        {/* Title for the solutions section. Uses heading font and secondary theme color. */}
        <h3 className="font-heading text-xl text-secondary mb-4">✅ NUESTRA SOLUCIÓN</h3>
        {/* List of solutions. Uses main text color. */}
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