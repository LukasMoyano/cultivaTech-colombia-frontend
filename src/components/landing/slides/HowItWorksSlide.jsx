import React from 'react';

const StepCard = ({ icon, title, subtitle, borderColor }) => (
  <div className={`text-center p-6 border-t-4 ${borderColor} bg-background-card`}>
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="font-heading text-xl text-text-accent">{title}</h3>
    <p className="text-sm text-text-main/80">{subtitle}</p>
  </div>
);

const HowItWorksSlide = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
        <StepCard icon="📡" title="1. SENSORES" subtitle="Recolectan datos 24/7" borderColor="border-primary" />
        <StepCard icon="🧠" title="2. IA ANALIZA" subtitle="Procesa y predice" borderColor="border-secondary" />
        <StepCard icon="⚠️" title="3. ALERTAS" subtitle="Notifica problemas" borderColor="border-primary" />
        <StepCard icon="🎯" title="4. ACCIÓN" subtitle="Tomas decisiones" borderColor="border-secondary" />
      </div>
      <div className="text-center pt-4">
        <p className="text-lg text-text-main">
          <strong className="text-accent font-heading">RESULTADO:</strong> Cultivos más saludables, mayor productividad y decisiones informadas.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksSlide;
