import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ value, label }) => (
  <div className="p-6 bg-background border border-border text-center">
    <div className="text-4xl font-heading text-accent">{value}</div>
    <p className="text-sm text-text-main/80">{label}</p>
  </div>
);

const CtaSlide = ({ setCurrentPage }) => {
  return (
    <div className="space-y-8 text-center">
      <div>
        <div className="text-6xl mb-4">🌾✨</div>
        <p className="text-xl text-text-main mb-6">
          Los<strong className="text-accent"> Agricultores </strong>en Colombia ya confían en CultivaTech ColombIA
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        <StatCard value="+35%" label="Aumento en productividad" />
        <StatCard value="-50%" label="Reducción de pérdidas" />
        <StatCard value="24/7" label="Monitoreo continuo" />
      </div>
      <div className="space-y-4 pt-6">
        <p className="font-heading text-xl text-text-accent">
          ¿LISTO PARA REVOLUCIONAR TU AGRICULTURA?
        </p>
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage("ingreso")}
            className="bg-primary text-white py-3 px-8 font-heading hover:bg-primary/80 transition-colors"
          >
            🚀 COMENZAR AHORA
          </button>
        </div>
      </div>
    </div>
  );
};

CtaSlide.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default CtaSlide;
