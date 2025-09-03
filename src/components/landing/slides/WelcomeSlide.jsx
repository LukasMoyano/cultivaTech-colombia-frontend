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
    // Contenedor principal para el contenido de la diapositiva. Usa space-y para espaciado vertical.
    <div className="space-y-8 text-center">
      {/* Bloque de texto de introducción */}
      <div>
        {/* Iconos decorativos */}
        <div className="text-6xl mb-4">🌿🤖</div>
        {/* Párrafo descriptivo principal. Usa color de texto temático y color de énfasis para etiquetas strong. */}
        <p className="text-lg text-text-main leading-relaxed max-w-3xl mx-auto">
          Una plataforma revolucionaria que combina <strong className="text-accent">sensores inteligentes</strong>, 
          <strong className="text-accent"> inteligencia artificial</strong> y <strong className="text-accent">diseño intuitivo</strong> para 
          transformar la agricultura colombiana.
        </p>
      </div>
      {/* Cuadrícula para los pilares "Arte, Ciencia, Tecnología" */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Tarjeta para el pilar "Arte". Usa colores de fondo, borde y texto temáticos. */}
        <div className="p-6 bg-background border border-border">
          <div className="text-4xl mb-3 text-primary">🎨</div> {/* Icono con color primario del tema */}
          <h3 className="font-heading text-xl text-text-accent">ARTE</h3> {/* Título con fuente de encabezado y color de énfasis */}
          <p className="text-sm text-text-main/80">Interfaces intuitivas y visuales</p> {/* Descripción con color de texto principal */}
        </div>
        {/* Tarjeta para el pilar "Ciencia" */}
        <div className="p-6 bg-background border border-border">
          <div className="text-4xl mb-3 text-primary">🔬</div>
          <h3 className="font-heading text-xl text-text-accent">CIENCIA</h3>
          <p className="text-sm text-text-main/80">Análisis de datos precisos</p>
        </div>
        {/* Tarjeta para el pilar "Tecnología" */}
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