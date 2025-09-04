import React from "react";

const GraficoPanel = () => {
  return (
    <section aria-labelledby="grafico-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300 flex items-center justify-center">
      <h2 id="grafico-titulo" className="sr-only">Gráfico</h2>
      <div className="text-center">
        <div className="text-4xl mb-4">📈</div>
        <span className="text-text-main/70 text-lg">(Gráfico próximamente)</span>
      </div>
    </section>
  );
};

export default GraficoPanel;