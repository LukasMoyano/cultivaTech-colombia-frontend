import React from 'react';
import PropTypes from 'prop-types';

/**
 * @file CtaSlide.jsx
 * @description Reusable component for displaying a single statistic card within the CTA slide.
 *              It takes a value and a label as props and applies consistent styling.
 *
 * @param {object} props - The component props.
 * @param {string} props.value - The main statistic value (e.g., "+35%").
 * @param {string} props.label - The descriptive label for the statistic (e.g., "Aumento en productividad").
 * @returns {JSX.Element} A styled card displaying a key statistic.
 */
const StatCard = ({ value, label }) => (
  // Card container: centered text, themed padding, border, and background.
  <div className="p-6 bg-background border border-border text-center">
    {/* Statistic value: large text, heading font, and accent color. */}
    <div className="text-4xl font-heading text-accent">{value}</div>
    {/* Label: smaller text, slightly muted main text color. */}
    <p className="text-sm text-text-main/80">{label}</p>
  </div>
);

/**
 * @file CtaSlide.jsx
 * @description Represents the final slide of the Landing Page, serving as a Call to Action (CTA).
 *              It highlights key achievements and prompts the user to start their digital transformation.
 *              It includes a button to navigate to the registration/login page.
 *              Styling is integrated with the application's theming system.
 *
 * @param {object} props - The component props.
 * @param {function} props.setCurrentPage - Function to change the current page of the application.
 * @returns {JSX.Element} The JSX for the Call to Action slide.
 */
const CtaSlide = ({ setCurrentPage }) => {
  return (
    // Main container for the slide content. Uses space-y for vertical spacing and centered text.
    <div className="space-y-8 text-center">
      {/* Introduction text block */}
      <div>
        {/* Decorative icons */}
        <div className="text-6xl mb-4">🌾✨</div>
        {/* Main descriptive paragraph, highlighting user trust. Uses themed text color and accent color for strong tags. */}
        <p className="text-xl text-text-main mb-6">
          Los<strong className="text-accent"> Agricultores </strong>en Colombia ya confían en CultivaTech ColombIA
        </p>
      </div>
      {/* Grid for key statistics. Uses `gap-px bg-border` to create thin, themed dividers between cards. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {/* Individual StatCard components for each key metric. */}
        <StatCard value="+35%" label="Aumento en productividad" />
        <StatCard value="-50%" label="Reducción de pérdidas" />
        <StatCard value="24/7" label="Monitoreo continuo" />
      </div>
      {/* Call to Action section. */}
      <div className="space-y-4 pt-6">
        {/* CTA question: uses heading font, large text, and accent color. */}
        <p className="font-heading text-xl text-text-accent">
          ¿LISTO PARA REVOLUCIONAR TU AGRICULTURA?
        </p>
        {/* Button container. */}
        <div className="space-x-4">
          {/* Primary CTA button: navigates to the registration/login page. */}
          {/* Uses primary theme color for background, white text, heading font, and hover effects. */}
          <button
            onClick={() => setCurrentPage("ingreso")}
            className="bg-primary text-white py-3 px-8 font-heading hover:bg-primary/80 transition-colors"
          >
            🚀 COMENZAR AHORA
          </button>
        </div>
      </div>
    </div>
  );
};

CtaSlide.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default CtaSlide;