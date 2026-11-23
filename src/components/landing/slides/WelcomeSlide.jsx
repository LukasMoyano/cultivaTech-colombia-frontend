import React from 'react';

/**
 * @file WelcomeSlide.jsx
 * @description Representa la primera diapositiva de la página de inicio, presentando CultivaTech ColombIA.
 *              Destaca los pilares fundamentales de la plataforma: Arte, Ciencia y Tecnología.
 *              Este componente está diseñado para ser visualmente impactante y utiliza el sistema
 *              de temas de la aplicación para una apariencia consistente (colores, fuentes, bordes).
 *
 * @returns {JSX.Element} El JSX para la diapositiva de bienvenida.
 */
const WelcomeSlide = () => {
  return (
    <div className="space-y-6 text-center">
      <div>
        <div className="text-5xl sm:text-6xl mb-3" aria-hidden="true">🌿🤖⛓️</div>
        <p className="text-sm sm:text-lg text-text-main leading-relaxed max-w-3xl mx-auto">
          Unimos <strong className="text-text-accent">sensores en campo</strong>,{" "}
          <strong className="text-text-accent">alertas inteligentes</strong> y{" "}
          <strong className="text-[var(--color-primary-readable)]">registro digital seguro (Blockchain)</strong>{" "}
          para cuidar la cosecha, atraer a los jóvenes al campo y conectar al{" "}
          <strong className="text-text-accent">agricultor</strong> con{" "}
          <strong className="text-[var(--color-primary-readable)]">inversionistas</strong> en tiempo real.
        </p>
      </div>

      {/* Cuadrícula responsiva para los pilares incluyendo Blockchain */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
        <div className="p-4 sm:p-5 bg-background border border-border space-y-1">
          <div className="text-3xl sm:text-4xl mb-2" aria-hidden="true">🎨</div>
          <h3 className="font-heading text-lg text-text-accent">ARTE</h3>
          <p className="text-xs sm:text-sm text-text-main/80">Fácil de usar y sin palabras enredadas</p>
        </div>
        <div className="p-4 sm:p-5 bg-background border border-border space-y-1">
          <div className="text-3xl sm:text-4xl mb-2" aria-hidden="true">🔬</div>
          <h3 className="font-heading text-lg text-text-accent">CIENCIA</h3>
          <p className="text-xs sm:text-sm text-text-main/80">
            Aire en vivo (MQ-4 / CO₂ est.) y clima extensible
          </p>
        </div>
        <div className="p-4 sm:p-5 bg-background border border-border space-y-1">
          <div className="text-3xl sm:text-4xl mb-2" aria-hidden="true">💻</div>
          <h3 className="font-heading text-lg text-text-accent">TECNOLOGÍA</h3>
          <p className="text-xs sm:text-sm text-text-main/80">
            Nodo ESP32 en campo y alertas por umbral a tiempo
          </p>
        </div>
        <div className="p-4 sm:p-5 bg-background border-2 border-primary space-y-1">
          <div className="text-3xl sm:text-4xl mb-2" aria-hidden="true">⛓️</div>
          <h3 className="font-heading text-lg text-[var(--color-primary-readable)]">BLOCKCHAIN</h3>
          <p className="text-xs sm:text-sm text-text-main/80">
            Huella Merkle auditable (simulación local / Sepolia)
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSlide;