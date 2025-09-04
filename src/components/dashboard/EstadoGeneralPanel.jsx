import React from "react";
import PropTypes from "prop-types";

const EstadoGeneralPanel = ({ setCurrentPage }) => {
  return (
    <section aria-labelledby="estado-general-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
      <h2 id="estado-general-titulo" className="flex items-center justify-between mb-6 font-heading text-xl">
        <span className="text-accent">⭐ ESTADO GENERAL</span>
        <button
          onClick={() => setCurrentPage("cultivos")}
          className="text-sm bg-secondary/20 text-text-accent px-3 py-1 hover:bg-secondary/40 transition-colors"
        >
          Cambiar Cultivo
        </button>
      </h2>
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-28 h-28 border-4 border-secondary text-accent text-3xl font-bold mb-4">
          OK
        </div>
        <p className="text-text-main text-xl font-semibold mb-2">
          Riego óptimo. Sin alertas.
        </p>
        <p className="text-text-main/80">
          Temperatura promedio: 22°C
        </p>
      </div>
    </section>
  );
};

EstadoGeneralPanel.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default EstadoGeneralPanel;