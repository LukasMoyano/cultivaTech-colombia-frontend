import React from "react";
import PropTypes from "prop-types";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";
import { formatCop } from "../../data/pilotoFallback";

/**
 * Panel para el Módulo de Agricultores:
 * Explica en lenguaje sencillo cómo el financiamiento colaborativo reemplaza deuda costosa
 * y cómo mantener activos los sensores genera confianza ante los inversionistas.
 */
const MiLoteFinanciadoPanel = ({ onVerBlockchain, onVerInversionista }) => {
  const { resumen } = usePilotoResumen();
  const { lote, confianzaSensor, oraculo } = resumen;

  const ahorroEjemploMin = Math.round(lote.metaCop * 0.24 * (lote.cicloDias / 365));
  const progresoDias = Math.min(100, Math.round((lote.diaActual / lote.cicloDias) * 100));

  return (
    <section
      aria-label="Financiamiento y respaldo digital de mi lote"
      className="bg-background-card border-2 border-accent rounded-lg p-6 shadow-md mb-6 space-y-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-heading text-accent uppercase tracking-wider">
            RESPALDO PRODUCTIVO · FINANCIAMIENTO SIN DEUDA BANCARIA
          </p>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-accent mt-1">
            🌾 Mi Lote Financiado · {lote.nombre}
          </h2>
          <p className="text-sm text-text-main/80 mt-1">
            Tus sensores activos demuestran en tiempo real el cuidado del cultivo para respaldar insumos sin pagar tasas bancarias del 24% – 36% EA.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/20 text-text-main border border-secondary">
          {oraculo?.etiquetaEstado || "Oráculo en Simulación Local (listo para Sepolia)"}
        </span>
      </div>

      {/* 3 Indicadores clave en lenguaje humano */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fondeo del lote */}
        <div className="bg-background border border-border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-text-main/70">
            <span>META DE INSUMOS CUBIERTA</span>
            <span className="text-primary">{lote.porcentajeFondeado}%</span>
          </div>
          <div className="text-xl font-bold font-heading text-text-accent">
            {formatCop(lote.fondeadoCop)}
          </div>
          <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${lote.porcentajeFondeado}%` }}
            />
          </div>
          <p className="text-xs text-text-main/75">
            Meta total: <strong>{formatCop(lote.metaCop)}</strong> · {lote.aliadosActuales} aliados privados (cupo &lt; {lote.maxAliadosPrivados + 1}).
          </p>
        </div>

        {/* Salud de confianza digital */}
        <div className="bg-background border border-border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-text-main/70">
            <span>SALUD DE CONFIANZA DIGITAL</span>
            <span className="text-accent font-bold">Óptimo</span>
          </div>
          <div className="text-xl font-bold font-heading text-accent">
            {confianzaSensor.porcentajeIntegridad}% Lecturas Selladas
          </div>
          <p className="text-xs text-text-main/85 leading-relaxed">
            Hoy tus sensores enviaron trazabilidad continua sin fallos. Esta disciplina protege la cosecha y eleva tu reputación para próximos lotes.
          </p>
        </div>

        {/* Ciclo y beneficio compartido */}
        <div className="bg-background border border-border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-text-main/70">
            <span>AVANCE DEL CICLO PRODUCTIVO</span>
            <span className="text-primary">Día {lote.diaActual} / {lote.cicloDias}</span>
          </div>
          <div className="text-xl font-bold font-heading text-text-accent">
            Ahorro estimado: +{formatCop(ahorroEjemploMin)}
          </div>
          <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progresoDias}%` }}
            />
          </div>
          <p className="text-xs text-text-main/75">
            Si tu cosecha supera la meta en kg y calidad, <strong>crece tanto tu ganancia como la retribución de tus aliados</strong>.
          </p>
        </div>
      </div>

      {/* Guía visual de 3 pasos para el agricultor */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-heading font-bold text-text-accent">
            ¿Cómo te respalda la tecnología paso a paso?
          </h3>
          <div className="flex flex-wrap gap-2">
            {onVerBlockchain && (
              <button
                type="button"
                onClick={onVerBlockchain}
                className="text-xs font-bold px-3 py-1.5 rounded border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                🔗 Ver esquema Blockchain completo
              </button>
            )}
            {onVerInversionista && (
              <button
                type="button"
                onClick={onVerInversionista}
                className="text-xs font-bold px-3 py-1.5 rounded bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                💎 Ver cómo te ve el Inversionista →
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-text-main/85">
          <div className="p-3 rounded bg-background-card border border-border">
            <strong className="text-text-accent block mb-1">1. Cuidas el ambiente</strong>
            Las alertas tempranas te avisan antes de que una variación térmica o de gas dañe los hongos o abejas.
          </div>
          <div className="p-3 rounded bg-background-card border border-border">
            <strong className="text-text-accent block mb-1">2. Tu finca gana credibilidad</strong>
            Cada paquete de 5 mediciones queda sellado automáticamente sin quitar tiempo a tu trabajo diario.
          </div>
          <div className="p-3 rounded bg-background-card border border-border">
            <strong className="text-text-accent block mb-1">3. Capital sin perder tu tierra</strong>
            Recibes apoyo para producir y compartes utilidad al vender la cosecha, sin hipotecas ni deudas impagables.
          </div>
        </div>
      </div>
    </section>
  );
};

MiLoteFinanciadoPanel.propTypes = {
  onVerBlockchain: PropTypes.func,
  onVerInversionista: PropTypes.func,
};

export default MiLoteFinanciadoPanel;
