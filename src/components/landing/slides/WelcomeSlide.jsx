import React from 'react';

const WelcomeSlide = () => {
  return (
    <div className="space-y-8 text-center">
      <div>
        <div className="text-6xl mb-4">🌿🤖</div>
        <p className="text-lg text-text-main leading-relaxed max-w-3xl mx-auto">
          Una plataforma revolucionaria que combina <strong className="text-accent">sensores inteligentes</strong>, 
          <strong className="text-accent"> inteligencia artificial</strong> y <strong className="text-accent">diseño intuitivo</strong> para 
          transformar la agricultura colombiana.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 bg-background border border-border">
          <div className="text-4xl mb-3 text-primary">🎨</div>
          <h3 className="font-heading text-xl text-text-accent">ARTE</h3>
          <p className="text-sm text-text-main/80">Interfaces intuitivas y visuales</p>
        </div>
        <div className="p-6 bg-background border border-border">
          <div className="text-4xl mb-3 text-primary">🔬</div>
          <h3 className="font-heading text-xl text-text-accent">CIENCIA</h3>
          <p className="text-sm text-text-main/80">Análisis de datos precisos</p>
        </div>
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
