import React from 'react';

const ProblemSolutionSlide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-primary/10 p-6 border-l-4 border-primary">
        <h3 className="font-heading text-xl text-primary mb-4">❌ PROBLEMAS ACTUALES</h3>
        <ul className="space-y-2 text-sm text-text-main">
          <li>• Falta de monitoreo en tiempo real</li>
          <li>• Pérdidas económicas por decisiones tardías</li>
          <li>• Herramientas costosas e inaccesibles</li>
          <li>• Información fragmentada y poco clara</li>
        </ul>
      </div>
      <div className="bg-secondary/10 p-6 border-l-4 border-secondary">
        <h3 className="font-heading text-xl text-secondary mb-4">✅ NUESTRA SOLUCIÓN</h3>
        <ul className="space-y-2 text-sm text-text-main">
          <li>• Monitoreo 24/7 con sensores IoT</li>
          <li>• Alertas inteligentes y preventivas</li>
          <li>• Tecnología accesible y escalable</li>
          <li>• Dashboard unificado e intuitivo</li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemSolutionSlide;
