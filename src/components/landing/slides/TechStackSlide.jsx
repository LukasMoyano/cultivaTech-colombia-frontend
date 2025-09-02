import React from 'react';

const TechInfoCard = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 p-4 bg-background border border-border">
    <span className="text-3xl text-accent">{icon}</span>
    <div>
      <p className="font-sans font-semibold text-text-main">{title}</p>
      <p className="text-xs text-text-main/70">{subtitle}</p>
    </div>
  </div>
);

const TechStackSlide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-heading text-2xl text-text-accent">🔧 HARDWARE</h3>
        <div className="space-y-4">
          <TechInfoCard icon="📡" title="Sensores ESP32" subtitle="Temperatura, humedad, pH" />
          <TechInfoCard icon="🤖" title="Robots Autónomos" subtitle="Monitoreo y análisis" />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-heading text-2xl text-text-accent">💻 SOFTWARE</h3>
        <div className="space-y-4">
          <TechInfoCard icon="🧠" title="IA Predictiva" subtitle="Detección de anomalías" />
          <TechInfoCard icon="📱" title="App Multiplataforma" subtitle="Web y móvil" />
        </div>
      </div>
    </div>
  );
};

export default TechStackSlide;
