import React from "react";
import PropTypes from "prop-types";

const RobotPanel = ({ setCurrentPage }) => {
  return (
    <section aria-labelledby="robot-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
      <h2 id="robot-titulo" className="flex items-center mb-4 font-heading text-accent text-xl">
        <span className="mr-2">🤖</span> ROBOT CULTIVATECH
      </h2>
      <p className="text-text-main">
        <span className="font-semibold">Estado:</span> En base, cargando
      </p>
      <p className="text-text-main">
        <span className="font-semibold">Batería:</span>
        <span className="text-accent ml-2">🔋 75%</span>
      </p>
      <p className="text-text-main">
        <span className="font-semibold">Conexión:</span>
        <span className="text-accent ml-2">📶 Fuerte</span>
      </p>
      <div className="mt-4 space-y-2">
        <button className="w-full bg-primary text-white py-2 px-4 hover:bg-primary/80 transition-all font-heading">
          INICIAR MONITOREO
        </button>
        <button
          className="w-full border border-secondary text-secondary py-2 px-4 hover:bg-secondary/20 transition-all font-heading"
          onClick={() => setCurrentPage("robot")}>
          VER MAPA ROBOT
        </button>
      </div>
    </section>
  );
};

RobotPanel.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default RobotPanel;