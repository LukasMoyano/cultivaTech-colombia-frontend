import React from 'react';

/**
 * @file HowItWorksSlide.jsx
 * @description Reusable component for displaying a single step in the "How It Works" section.
 *              It takes an icon, title, subtitle, and a border color class as props.
 *              Styling is applied using the application's theming system.
 *
 * @param {object} props - The component props.
 * @param {string} props.icon - The emoji or icon representing the step.
 * @param {string} props.title - The title of the step (e.g., "1. Sensores").
 * @param {string} props.subtitle - A brief description of the step.
 * @param {string} props.borderColor - Tailwind CSS class for the top border color (e.g., "border-primary").
 * @returns {JSX.Element} A styled card representing a step in the process.
 */
const StepCard = ({ icon, title, subtitle, borderColor }) => (
  // Card container: centered text, themed padding, top border, and background.
  // The border color is dynamic based on props.
  <div className={`text-center p-6 border-t-4 ${borderColor} bg-background-card`}>
    {/* Icon: large text. */}
    <div className="text-5xl mb-4">{icon}</div>
    {/* Title: uses heading font, large text, and accent color. */}
    <h3 className="font-heading text-xl text-text-accent">{title}</h3>
    {/* Subtitle: smaller text, slightly muted main text color. */}
    <p className="text-sm text-text-main/80">{subtitle}</p>
  </div>
);

/**
 * @file HowItWorksSlide.jsx
 * @description Represents the fourth slide of the Landing Page, explaining the simple, effective process
 *              of CultivaTech ColombIA in four steps.
 *              It utilizes the `StepCard` component for consistent display of each step.
 *              The layout uses a grid with a 1px gap to create visual separators, and all styling
 *              is integrated with the application's theming system.
 *
 * @returns {JSX.Element} The JSX for the "How It Works" slide.
 */
const HowItWorksSlide = () => {
  return (
    // Main container for the slide content. Uses space-y for vertical spacing.
    <div className="space-y-8">
      {/* Grid for the four steps. The `gap-px bg-border` creates thin, themed dividers between cards. */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
        {/* Individual StepCard components for each step, with dynamic border colors. */}
        <StepCard icon="📡" title="1. SENSORES" subtitle="Recolectan datos 24/7" borderColor="border-primary" />
        <StepCard icon="🧠" title="2. IA ANALIZA" subtitle="Procesa y predice" borderColor="border-secondary" />
        <StepCard icon="⚠️" title="3. ALERTAS" subtitle="Notifica problemas" borderColor="border-primary" />
        <StepCard icon="🎯" title="4. ACCIÓN" subtitle="Tomas decisiones" borderColor="border-secondary" />
      </div>
      {/* Result summary text. */}
      <div className="text-center pt-4">
        {/* Uses themed text color and accent color for emphasis. */}
        <p className="text-lg text-text-main">
          <strong className="text-accent font-heading">RESULTADO:</strong> Cultivos más saludables, mayor productividad y decisiones informadas.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksSlide;