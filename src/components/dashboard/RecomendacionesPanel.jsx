import React from "react";

const RecomendacionesPanel = () => {
  return (
    <div className="bg-background-card border border-border shadow-md p-6">
      <h3 className="font-heading text-accent mb-2">Recomendaciones Personalizadas</h3>
      <p className="text-text-main">
        Basado en tu actividad reciente, te sugerimos explorar estos cultivos.
      </p>
    </div>
  );
};

export default RecomendacionesPanel;