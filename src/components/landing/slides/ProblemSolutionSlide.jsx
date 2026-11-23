import React from 'react';

/**
 * @file ProblemSolutionSlide.jsx
 * @description Representa la segunda diapositiva de la página de inicio, detallando problemas en la agricultura
 *              y cómo CultivaTech ColombIA proporciona soluciones.
 *              Usa un diseño de dos columnas para contrastar visualmente los desafíos y sus resoluciones.
 *              El estilo se aplica usando el sistema de temas de la aplicación, mapeando problema/solución
 *              a los colores primario/secundario del tema para énfasis visual.
 *
 * @returns {JSX.Element} El JSX para la diapositiva de problema/solución.
 */
const ProblemSolutionSlide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      <div className="bg-primary/10 p-5 sm:p-6 border-l-4 border-primary space-y-4">
        <h3 className="font-heading text-lg sm:text-xl text-[var(--color-primary-readable)]">
          <span aria-hidden="true">❌</span> HOY EN EL CAMPO
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-text-main">
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">💸</span>
            <span>Créditos bancarios caros (24 %–36 % al año) y gota a gota que arriesgan la finca</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">🥀</span>
            <span>Pérdidas de cosecha por falta de vigilancia ambiental en vivo</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">🏙️</span>
            <span>Jóvenes migrando a ciudades sobrepobladas y pérdida de saberes ancestrales</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">🙈</span>
            <span>Inversionistas a ciegas sin ver en tiempo real qué pasa con su plata</span>
          </li>
        </ul>
      </div>

      <div className="bg-accent/10 p-5 sm:p-6 border-l-4 border-accent space-y-4">
        <h3 className="font-heading text-lg sm:text-xl text-text-accent">
          <span aria-hidden="true">✅</span> CON CULTIVATECH
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-text-main">
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">🛡️</span>
            <span>Respaldo productivo por cosecha, cero hipotecas ni deudas impagables</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">📡</span>
            <span>Sensores 24/7 (aire/gases MQ-4, CO₂ est. y clima expansible) + alertas por umbral</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">👩‍💻</span>
            <span>Jóvenes operando tecnología e IA junto al saber de sus mayores en la vereda</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true">⛓️</span>
            <span>Oráculo Merkle por lote (simulación local lista para Sepolia) y Ley 1581</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemSolutionSlide;