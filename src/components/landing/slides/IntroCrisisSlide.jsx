import React, { useState } from "react";
import {
  FUENTES_OFICIALES_CAMPO,
  PILARES_CRISIS_CAMPO,
  RESPUESTA_CULTIVATECH_PILARES,
} from "../../../data/presentacionContexto";

/**
 * Paso 1 de la presentación inicial:
 * Preámbulo conciso del campo actual sustentado en fuentes oficiales (ANT, PND, DANE, UPRA)
 * y respuesta directa de CultivaTech para agricultores, juventudes rurales e inversionistas.
 */
const IntroCrisisSlide = () => {
  const [verFuentes, setVerFuentes] = useState(false);

  return (
    <div className="space-y-5 text-center">
      {/* Planteamiento conciso y directo */}
      <div className="bg-primary/10 border-l-4 border-primary p-4 sm:p-5 text-left space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-heading font-bold text-[var(--color-primary-readable)] uppercase tracking-wider">
            <span aria-hidden="true">🌾</span> El punto de partida en Colombia
          </span>
          <span className="text-lg sm:text-xl" aria-hidden="true">🚜💔🔗</span>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-main leading-relaxed">
          En las áreas rurales de Colombia,{" "}
          <strong className="text-text-accent">3 de cada 4 personas se reconocen campesinas</strong>{" "}
          y sostienen nuestra alimentación frente a una crisis doble: tenencia precaria y falta de
          crédito justo que llevan al agricultor a{" "}
          <strong className="text-[var(--color-primary-readable)]">endeudarse y arriesgar su finca</strong>; un{" "}
          <strong className="text-[var(--color-primary-readable)]">campo que envejece</strong> mientras los jóvenes migran
          a ciudades sobrepobladas perdiendo saberes ancestrales; e{" "}
          <strong className="text-text-accent">inversionistas a ciegas</strong> que hoy no pueden
          vigilar qué pasa en tiempo real con su dinero.
        </p>
      </div>

      {/* 3 cápsulas visuales rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
        {PILARES_CRISIS_CAMPO.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 sm:p-4 bg-background border border-border border-t-4 ${item.borde} space-y-1.5`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl" aria-hidden="true">{item.icono}</span>
              <span className="text-[11px] font-bold text-[var(--color-primary-readable)] bg-primary/10 px-2 py-0.5">
                {item.dato}
              </span>
            </div>
            <h3 className="font-heading text-sm text-text-accent font-bold">{item.titulo}</h3>
            <p className="text-xs text-text-main/85 leading-relaxed">{item.detalle}</p>
          </div>
        ))}
      </div>

      {/* Respuesta directa CultivaTech en 3 pilares con íconos */}
      <div className="bg-accent/10 border border-accent/50 p-3.5 sm:p-4 space-y-2.5">
        <div className="font-heading text-xs font-bold text-text-accent uppercase tracking-wider">
          <span aria-hidden="true">🚀</span> La respuesta de CultivaTech en una sola plataforma
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-text-main">
          {RESPUESTA_CULTIVATECH_PILARES.map((pil) => (
            <div
              key={pil.id}
              className="p-2.5 bg-background border border-border flex items-start gap-2.5 text-left"
            >
              <span className="text-xl shrink-0" aria-hidden="true">{pil.icono}</span>
              <div>
                <strong className="block font-heading text-[11px] text-text-accent">
                  {pil.titulo}
                </strong>
                <span className="text-text-main/80 leading-snug">{pil.texto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Respaldo documental desplegable (PND / ANT / DANE / UPRA) */}
      <div className="text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-text-main/80">
          <span>
            <span aria-hidden="true">📚</span> Sustento oficial en proyecto: PND 2022–2026 (DNP) · Agencia Nacional de Tierras (ANT) · DANE · UPRA
          </span>
          <button
            type="button"
            onClick={() => setVerFuentes((prev) => !prev)}
            aria-expanded={verFuentes}
            className="inline-flex items-center font-bold text-[var(--color-primary-readable)] underline hover:opacity-80 cursor-pointer min-h-[44px] px-3 py-2 border border-border bg-background"
          >
            {verFuentes
              ? "Ocultar cifras oficiales ▲"
              : "📊 Ver respaldo oficial (ANT · PND · DANE) ▼"}
          </button>
        </div>

        {verFuentes && (
          <div className="mt-2 p-3 sm:p-4 bg-background border border-border text-xs space-y-2 text-text-main/90">
            {FUENTES_OFICIALES_CAMPO.map((item) => (
              <div key={item.entidad} className="leading-relaxed">
                <strong className="text-text-accent">{item.entidad}:</strong> {item.resumen}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroCrisisSlide;
