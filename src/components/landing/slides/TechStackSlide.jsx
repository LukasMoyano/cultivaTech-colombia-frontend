import React from 'react';

/**
 * @file TechStackSlide.jsx
 * @description Representa un componente de tarjeta reutilizable para mostrar información de tecnología (ej. características de hardware/software).
 *              Toma un ícono, título y subtítulo como props y aplica un estilo consistente.
 *
 * @param {object} props - Las props del componente.
 * @param {string} props.icon - El emoji o ícono que representa la tecnología.
 * @param {string} props.title - El título principal de la característica de tecnología.
 * @param {string} props.subtitle - Una breve descripción o subtítulo para la tecnología.
 * @returns {JSX.Element} Una tarjeta estilizada que muestra información de tecnología.
 */
const TechInfoCard = ({ icon, title, subtitle }) => (
  // Contenedor de tarjeta: diseño flexible, relleno temático, borde y fondo.
  <div className="flex items-center gap-4 p-4 bg-background border border-border">
    {/* Ícono: texto grande, color de énfasis temático. */}
    <span className="text-3xl text-accent">{icon}</span>
    {/* Contenido de texto: título y subtítulo. */}
    <div>
      {/* Título: usa fuente sans, peso seminegrita y color de texto principal. */}
      <p className="font-sans font-semibold text-text-main">{title}</p>
      {/* Subtítulo: texto más pequeño, color de texto principal ligeramente atenuado. */}
      <p className="text-xs text-text-main/70">{subtitle}</p>
    </div>
  </div>
);

/**
 * @file TechStackSlide.jsx
 * @description Representa la tercera diapositiva de la página de inicio, mostrando las tecnologías y características
 *              de CultivaTech ColombIA, divididas en categorías de Hardware y Software.
 *              Utiliza el componente `TechInfoCard` para mostrar consistentemente cada elemento de tecnología.
 *              El estilo se aplica usando el sistema de temas de la aplicación.
 *
 * @returns {JSX.Element} El JSX para la diapositiva de pila tecnológica.
 */
const TechStackSlide = () => {
  return (
    // Contenedor principal para el contenido de la diapositiva, usando una cuadrícula para un diseño de dos columnas en pantallas medianas y superiores.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Sección para tecnologías de Hardware */}
      <div className="space-y-4">
        {/* Título de sección: usa fuente de encabezado, texto grande y color de énfasis. */}
        <h3 className="font-heading text-2xl text-text-accent">🔧 HARDWARE</h3>
        {/* Contenedor para tarjetas de información de hardware. */}
        <div className="space-y-4">
          {/* Componentes TechInfoCard individuales para características de hardware. */}
          <TechInfoCard icon="📡" title="Sensores ESP32" subtitle="Temperatura, humedad, pH" />
          <TechInfoCard icon="🤖" title="Robots Autónomos" subtitle="Monitoreo y análisis" />
        </div>
      </div>
      {/* Sección para tecnologías de Software */}
      <div className="space-y-4">
        {/* Título de sección: usa fuente de encabezado, texto grande y color de énfasis. */}
        <h3 className="font-heading text-2xl text-text-accent">💻 SOFTWARE</h3>
        {/* Contenedor para tarjetas de información de software. */}
        <div className="space-y-4">
          {/* Componentes TechInfoCard individuales para características de software. */}
          <TechInfoCard icon="🧠" title="IA Predictiva" subtitle="Detección de anomalías" />
          <TechInfoCard icon="📱" title="App Multiplataforma" subtitle="Web y móvil" />
        </div>
      </div>
    </div>
  );
};

export default TechStackSlide;