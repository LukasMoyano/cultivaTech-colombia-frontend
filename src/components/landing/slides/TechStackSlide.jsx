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
  <div className="flex items-center gap-4 p-4 bg-background border border-border">
    <span className="text-3xl shrink-0" aria-hidden="true">{icon}</span>
    <div>
      <p className="font-sans font-semibold text-text-main">{title}</p>
      <p className="text-xs text-text-main/75">{subtitle}</p>
    </div>
  </div>
);

const TechStackSlide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="font-heading text-lg sm:text-xl text-text-accent">
          <span aria-hidden="true">🔧</span> CAMPO Y HARDWARE
        </h3>
        <div className="space-y-3">
          <TechInfoCard
            icon="📡"
            title="Sensores Conectados"
            subtitle="Gases/CH₄ e índice CO₂ est. en vivo (clima/suelo en ruta)"
          />
          <TechInfoCard
            icon="🤖"
            title="Nodos y Robótica"
            subtitle="Nodo ESP32 activo · mapa robot en fase prototipo"
          />
          <TechInfoCard
            icon="🌱"
            title="Piloto + Escalado"
            subtitle="Lote #01 Hongos activo; apicultura y acuaponía en piloto"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-heading text-lg sm:text-xl text-text-accent">
          <span aria-hidden="true">⛓️</span> IA, PRIVACIDAD Y REGISTRO SEGURO
        </h3>
        <div className="space-y-3">
          <TechInfoCard
            icon="🧠"
            title="Alertas por Umbral e IA"
            subtitle="Umbrales en vivo + asistente técnico en evolución"
          />
          <TechInfoCard
            icon="⛓️"
            title="Sello Merkle (Blockchain)"
            subtitle="Agrupa 5 lecturas · simulación local lista para Sepolia"
          />
          <TechInfoCard
            icon="🔒"
            title="Privacidad y Pesos (COP)"
            subtitle="Autorización Ley 1581 · KYC/contratos en arquitectura comercial"
          />
        </div>
      </div>
    </div>
  );
};

export default TechStackSlide;