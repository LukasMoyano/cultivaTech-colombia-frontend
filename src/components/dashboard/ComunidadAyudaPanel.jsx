import React from "react";
import PropTypes from "prop-types";

const ComunidadAyudaPanel = ({ setCurrentPage }) => {
  return (
    <section aria-labelledby="comunidad-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
      <h2 id="comunidad-titulo" className="flex items-center mb-4 font-heading text-accent text-xl">
        <span className="mr-2">👥</span> COMUNIDAD Y AYUDA
      </h2>
      <p className="text-text-main/90 mb-4">
        Conéctate con otros agricultores, comparte experiencias y resuelve dudas.
      </p>
      <div className="space-y-2">
        <button
          onClick={() => setCurrentPage("juegos")}
          className="w-full bg-primary text-white py-2 px-4 hover:bg-primary/80 transition-all font-heading"
        >
          🎮 JUEGOS IA COLABORATIVA
        </button>
        <button className="w-full bg-secondary text-black py-2 px-4 hover:bg-secondary/80 transition-all font-heading">
          FORO DE AGRICULTORES
        </button>
        <button className="w-full border border-border text-text-main py-2 px-4 hover:bg-background transition-all">
          Preguntas Frecuentes (FAQ)
        </button>
      </div>
    </section>
  );
};

ComunidadAyudaPanel.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default ComunidadAyudaPanel;