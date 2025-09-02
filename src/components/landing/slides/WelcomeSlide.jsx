import React from 'react';

/**
 * @file WelcomeSlide.jsx
 * @description Represents the first slide of the Landing Page, introducing CultivaTech ColombIA.
 *              It highlights the core pillars of the platform: Art, Science, and Technology.
 *              This component is designed to be visually striking and uses the application's
 *              theming system for consistent appearance (colors, fonts, borders).
 *
 * @returns {JSX.Element} The JSX for the welcome slide.
 */
const WelcomeSlide = () => {
  return (
    // Main container for the slide content. Uses space-y for vertical spacing.
    <div className="space-y-8 text-center">
      {/* Introduction text block */}
      <div>
        {/* Decorative icons */}
        <div className="text-6xl mb-4">🌿🤖</div>
        {/* Main descriptive paragraph. Uses themed text color and accent color for strong tags. */}
        <p className="text-lg text-text-main leading-relaxed max-w-3xl mx-auto">
          Una plataforma revolucionaria que combina <strong className="text-accent">sensores inteligentes</strong>, 
          <strong className="text-accent"> inteligencia artificial</strong> y <strong className="text-accent">diseño intuitivo</strong> para 
          transformar la agricultura colombiana.
        </p>
      </div>
      {/* Grid for the "Art, Science, Technology" pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Card for "Art" pillar. Uses themed background, border, and text colors. */}
        <div className="p-6 bg-background border border-border">
          <div className="text-4xl mb-3 text-primary">🎨</div> {/* Icon with primary theme color */}
          <h3 className="font-heading text-xl text-text-accent">ARTE</h3> {/* Title with heading font and accent color */}
          <p className="text-sm text-text-main/80">Interfaces intuitivas y visuales</p> {/* Description with main text color */}
        </div>
        {/* Card for "Science" pillar */}
        <div className="p-6 bg-background border border-border">
          <div className="text-4xl mb-3 text-primary">🔬</div>
          <h3 className="font-heading text-xl text-text-accent">CIENCIA</h3>
          <p className="text-sm text-text-main/80">Análisis de datos precisos</p>
        </div>
        {/* Card for "Technology" pillar */}
        <div className="p-6 bg-background border border-border">
          <div className="text-4xl mb-3 text-primary">💻</div>
          <h3 className="font-heading text-xl text-text-accent">TECNOLOGÍA</h3>
          <p className="text-sm text-text-main/80">Hardware de código abierto</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSlide;