import React from 'react';

/**
 * @file TechStackSlide.jsx
 * @description Represents a reusable card component for displaying technology information (e.g., hardware/software features).
 *              It takes an icon, title, and subtitle as props and applies consistent styling.
 *
 * @param {object} props - The component props.
 * @param {string} props.icon - The emoji or icon representing the technology.
 * @param {string} props.title - The main title of the technology feature.
 * @param {string} props.subtitle - A brief description or subtitle for the technology.
 * @returns {JSX.Element} A styled card displaying technology information.
 */
const TechInfoCard = ({ icon, title, subtitle }) => (
  // Card container: flex layout, themed padding, border, and background.
  <div className="flex items-center gap-4 p-4 bg-background border border-border">
    {/* Icon: large text, themed accent color. */}
    <span className="text-3xl text-accent">{icon}</span>
    {/* Text content: title and subtitle. */}
    <div>
      {/* Title: uses sans font, semibold weight, and main text color. */}
      <p className="font-sans font-semibold text-text-main">{title}</p>
      {/* Subtitle: smaller text, slightly muted main text color. */}
      <p className="text-xs text-text-main/70">{subtitle}</p>
    </div>
  </div>
);

/**
 * @file TechStackSlide.jsx
 * @description Represents the third slide of the Landing Page, showcasing the technologies and features
 *              of CultivaTech ColombIA, divided into Hardware and Software categories.
 *              It utilizes the `TechInfoCard` component for consistent display of each technology item.
 *              Styling is applied using the application's theming system.
 *
 * @returns {JSX.Element} The JSX for the technology stack slide.
 */
const TechStackSlide = () => {
  return (
    // Main container for the slide content, using a grid for a two-column layout on medium screens and up.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Section for Hardware technologies */}
      <div className="space-y-4">
        {/* Section title: uses heading font, large text, and accent color. */}
        <h3 className="font-heading text-2xl text-text-accent">🔧 HARDWARE</h3>
        {/* Container for hardware info cards. */}
        <div className="space-y-4">
          {/* Individual TechInfoCard components for hardware features. */}
          <TechInfoCard icon="📡" title="Sensores ESP32" subtitle="Temperatura, humedad, pH" />
          <TechInfoCard icon="🤖" title="Robots Autónomos" subtitle="Monitoreo y análisis" />
        </div>
      </div>
      {/* Section for Software technologies */}
      <div className="space-y-4">
        {/* Section title: uses heading font, large text, and accent color. */}
        <h3 className="font-heading text-2xl text-text-accent">💻 SOFTWARE</h3>
        {/* Container for software info cards. */}
        <div className="space-y-4">
          {/* Individual TechInfoCard components for software features. */}
          <TechInfoCard icon="🧠" title="IA Predictiva" subtitle="Detección de anomalías" />
          <TechInfoCard icon="📱" title="App Multiplataforma" subtitle="Web y móvil" />
        </div>
      </div>
    </div>
  );
};

export default TechStackSlide;