import React from "react";
import PropTypes from "prop-types";

const AccesoRapidoPanel = ({ setCurrentPage }) => {
  return (
    <section aria-labelledby="cultivos-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
      <h2 id="cultivos-titulo" className="flex items-center mb-4 font-heading text-accent text-xl">
        <span className="mr-2">🌾</span> ACCESO RÁPIDO
      </h2>
      <div className="space-y-2">
        <button
          className="w-full text-left p-3 hover:bg-secondary/10 text-text-main border border-transparent hover:border-secondary/30 transition-all"
          onClick={() => setCurrentPage("cultivos")}
        >
          🍅 Tomates - Lote Sol Naciente
        </button>
        <button
          className="w-full text-left p-3 hover:bg-secondary/10 text-text-main border border-transparent hover:border-secondary/30 transition-all"
          onClick={() => setCurrentPage("cultivos")}
        >
          🍓 Fresas - El Edén
        </button>
        <button
          className="w-full text-left p-3 hover:bg-secondary/10 text-text-main border border-transparent hover:border-secondary/30 transition-all"
          onClick={() => setCurrentPage("cultivos")}
        >
          🌽 Maíz - La Esperanza
        </button>
      </div>
    </section>
  );
};

AccesoRapidoPanel.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default AccesoRapidoPanel;