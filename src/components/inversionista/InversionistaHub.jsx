import React from "react";
import PropTypes from "prop-types";
import { formatCop } from "../../data/pilotoFallback";

const PASOS_CCB = [
  { key: "inversion_oferta", paso: "1", titulo: "Ficha de Oferta", sub: "Entiende" },
  { key: "inversion_simulador", paso: "2", titulo: "Antes de Invertir", sub: "Invierte ★" },
  { key: "inversion_portafolio", paso: "3", titulo: "Mi Portafolio", sub: "Sigue" },
  { key: "inversion_salida", paso: "4", titulo: "Salida y Liquidación", sub: "Sale" },
];

/**
 * Barra superior unificada del Módulo de Inversionistas.
 * Mantiene visibles las 4 Pantallas CCB, el estado real del oráculo y la participación demo activa.
 */
const InversionistaHub = ({
  currentPage,
  onNav,
  oraculo,
  participacionDemo,
}) => {
  const esSepolia = oraculo?.modo === "sepolia";

  return (
    <div className="bg-background-card border border-border rounded-lg p-4 mb-6 space-y-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-heading text-primary uppercase tracking-wider">
            MÓDULO INVERSIONISTAS · PILOTO RWA AGROINDUSTRIAL
          </p>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-text-accent">
            Recorrido Transparente del Inversionista
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold border border-border bg-background text-text-main">
            Participación activa: <strong className="text-primary">{formatCop(participacionDemo.montoCop)}</strong> ({participacionDemo.porcentajeLote}%)
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              esSepolia
                ? "bg-accent/20 text-accent border-accent"
                : "bg-secondary/20 text-text-main border-secondary"
            }`}
          >
            {esSepolia
              ? "● Red Sepolia Activa"
              : "◐ Oráculo en Simulación Local (listo para Sepolia)"}
          </span>
        </div>
      </div>

      {/* Stepper interactivo de las 4 Pantallas */}
      <nav aria-label="Etapas del inversionista" className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {PASOS_CCB.map((item) => {
          const activo = currentPage === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNav(item.key)}
              className={`p-3 rounded-lg border text-left transition-all ${
                activo
                  ? "bg-primary text-white border-primary shadow"
                  : "bg-background text-text-main border-border hover:border-primary/70"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] opacity-85">
                <span className="font-heading">PANTALLA {item.paso}</span>
                <span className="font-bold">{item.sub}</span>
              </div>
              <div className="font-heading text-xs sm:text-sm font-bold mt-1">
                {item.titulo}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

InversionistaHub.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onNav: PropTypes.func.isRequired,
  oraculo: PropTypes.object,
  participacionDemo: PropTypes.shape({
    montoCop: PropTypes.number.isRequired,
    porcentajeLote: PropTypes.number.isRequired,
  }).isRequired,
};

export default InversionistaHub;
