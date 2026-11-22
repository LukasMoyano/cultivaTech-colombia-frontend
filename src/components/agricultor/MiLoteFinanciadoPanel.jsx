import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";
import { formatCop } from "../../data/pilotoFallback";

const PASOS_RESPALDO_CAMPESINO = [
  {
    numero: "01",
    badge: "CUIDADO EN VIVO",
    icono: "🌿",
    titulo: "Cuidas el ambiente 24/7",
    detalle:
      "El dispositivo vigila CO₂, oxígeno, humedad y temperatura sin parar. Si algo cambia de golpe, te avisa antes de que dañe tus hongos, abejas o cualquier cultivo.",
    resumenEjemplo: "Alerta temprana automática directo a tu panel antes de perder cosecha.",
    bordeActivo: "border-accent bg-accent/10",
    franja: "bg-accent",
    badgeClase: "bg-accent/20 text-accent",
  },
  {
    numero: "02",
    badge: "SELLO AUTOMÁTICO",
    icono: "📦",
    titulo: "Tu finca gana credibilidad",
    detalle:
      "Cada paquete de 5 mediciones reales se sella solo como prueba de trabajo bien hecho. No pierdes tiempo llenando planillas ni haciendo filas en bancos.",
    resumenEjemplo: "Tu historial limpio aumenta la confianza para financiar próximos ciclos.",
    bordeActivo: "border-secondary bg-secondary/15",
    franja: "bg-secondary",
    badgeClase: "bg-secondary/25 text-text-accent",
  },
  {
    numero: "03",
    badge: "CERO HIPOTECAS",
    icono: "🤝",
    titulo: "Capital sin arriesgar tu tierra",
    detalle:
      "Consigues respaldo para insumos y tecnología compartiendo utilidad al vender la cosecha. Sin hipotecar la finca ni cargar cuotas bancarias impagables.",
    resumenEjemplo: "Si la cosecha rinde más y sale sana, crecen tanto tus ingresos como los de tus aliados.",
    bordeActivo: "border-primary bg-primary/10",
    franja: "bg-primary",
    badgeClase: "bg-primary/20 text-primary",
  },
];

/**
 * Panel para el Módulo de Agricultores:
 * Explica en lenguaje sencillo cómo el financiamiento colaborativo reemplaza deuda costosa
 * y cómo mantener activos los sensores genera confianza ante los inversionistas.
 */
const MiLoteFinanciadoPanel = ({ onVerBlockchain, onVerInversionista }) => {
  const { resumen } = usePilotoResumen();
  const { lote, confianzaSensor, oraculo } = resumen;
  const [pasoSeleccionado, setPasoSeleccionado] = useState(0);

  const ahorroEjemploMin = Math.round(lote.metaCop * 0.24 * (lote.cicloDias / 365));
  const progresoDias = Math.min(100, Math.round((lote.diaActual / lote.cicloDias) * 100));
  const pasoActual = PASOS_RESPALDO_CAMPESINO[pasoSeleccionado];

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

      {/* Guía visual destacada de 3 pasos para el agricultor */}
      <div className="bg-gradient-to-br from-accent/10 via-background to-primary/10 border-2 border-primary/70 rounded-xl p-5 sm:p-6 shadow-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-bold bg-primary text-white tracking-wide">
              🚀 RESPALDO PRODUCTIVO · FINANCIAMIENTO SIN DEUDA BANCARIA
            </span>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-text-accent">
              ✨ ¿Cómo te respalda la tecnología paso a paso?
            </h3>
            <p className="text-xs sm:text-sm text-text-main/85">
              Tu dispositivo trabaja en silencio mientras cultivas: protege la cosecha, certifica tu esfuerzo y abre capital justo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {onVerBlockchain && (
              <button
                type="button"
                onClick={onVerBlockchain}
                className="text-xs font-heading font-bold px-3.5 py-2 rounded-lg border-2 border-primary bg-background text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                🔗 Ver esquema Blockchain completo
              </button>
            )}
            {onVerInversionista && (
              <button
                type="button"
                onClick={onVerInversionista}
                className="text-xs font-heading font-bold px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 shadow transition-colors cursor-pointer"
              >
                💎 Ver cómo te ve el Inversionista →
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PASOS_RESPALDO_CAMPESINO.map((paso, index) => {
            const activo = pasoSeleccionado === index;
            return (
              <button
                key={paso.numero}
                type="button"
                onClick={() => setPasoSeleccionado(index)}
                className={`text-left relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  activo
                    ? `${paso.bordeActivo} shadow-lg -translate-y-0.5`
                    : "border-border bg-background-card hover:border-primary/60 hover:shadow"
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${paso.franja}`} aria-hidden="true" />
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-2xl shadow-sm"
                      aria-hidden="true"
                    >
                      {paso.icono}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-heading font-bold ${paso.badgeClase}`}>
                      PASO {paso.numero} · {paso.badge}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-heading font-bold text-text-accent">
                    {paso.titulo}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-main/90 leading-relaxed">
                    {paso.detalle}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/70 flex items-center justify-between text-[11px] font-bold text-text-accent">
                  <span>{activo ? "● En foco ahora" : "Toca para resaltar"}</span>
                  <span aria-hidden="true">{index < 2 ? "Siguiente →" : "✓ Meta"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Ventana dinámica del paso enfocado + beneficios sin deuda */}
        <div className="bg-background-card border border-border rounded-lg p-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-xl" aria-hidden="true">{pasoActual.icono}</span>
            <div>
              <strong className="text-text-accent font-heading">
                En resumen (Paso {pasoActual.numero}):
              </strong>{" "}
              <span className="text-text-main">{pasoActual.resumenEjemplo}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded bg-accent/15 text-accent font-bold">
              🚫 Cero hipotecas
            </span>
            <span className="px-2.5 py-1 rounded bg-primary/15 text-primary font-bold">
              🛡️ Sin intereses 24%–36% EA
            </span>
            <span className="px-2.5 py-1 rounded bg-secondary/20 text-text-accent font-bold">
              🌾 Pago al cosechar
            </span>
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
