import React, { useMemo } from "react";
import PropTypes from "prop-types";
import useTelemetryStream from "../../hooks/useTelemetryStream";
import GasChart from "../telemetria/GasChart";
import { enrichReading } from "../telemetria/gas-concentration";
import { RISK_META, getRiskLevel } from "../telemetria/telemetria.constants";

function formatPpm(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat("es-CO").format(n);
}

const GraficoPanel = ({ setCurrentPage }) => {
  const {
    latest,
    history,
    status,
    isOnline,
    isStale,
    error,
    messagesReceived,
    reconnect,
    streamUrl,
  } = useTelemetryStream({ windowSize: 40 });

  const enriched = useMemo(
    () => history.map((h) => enrichReading(h)).filter(Boolean),
    [history]
  );
  const current = useMemo(() => enrichReading(latest), [latest]);
  const risk = getRiskLevel(latest?.mq4_raw);
  const riskMeta = RISK_META[risk];

  const connBadge = isOnline
    ? "bg-green-500 text-white"
    : isStale
      ? "bg-amber-500 text-black"
      : status === "connecting"
        ? "bg-yellow-500 text-black"
        : "bg-red-500 text-white";
  const connLabel = isOnline
    ? "● En línea"
    : isStale
      ? "● Sin datos recientes"
      : status === "connecting"
        ? "● Conectando…"
        : "● Desconectado";

  const kpis = [
    { label: "Metano CH₄", value: formatPpm(current?.ch4Ppm), unit: "ppm", accent: "text-accent" },
    { label: "CO₂ eq. (est.)", value: formatPpm(current?.co2Ppm), unit: "ppm", accent: "text-secondary" },
    {
      label: "Señal del sensor",
      value: latest?.mq4_raw != null ? String(latest.mq4_raw) : "—",
      unit: "ADC",
      accent: "text-text-main",
    },
    { label: "Estado del aire", value: riskMeta.short, unit: "", accent: "", dot: riskMeta.color },
  ];

  return (
    <section
      aria-labelledby="grafico-titulo"
      className="bg-background-card border border-border shadow-md p-6 transition-all duration-300"
    >
      <h2 id="grafico-titulo" className="flex items-center justify-between mb-4 font-heading text-xl">
        <span className="text-accent">📡 CALIDAD DEL AIRE · EN VIVO</span>
        <span className={`text-xs font-sans font-bold px-2 py-1 rounded-full ${connBadge}`}>
          {connLabel}
        </span>
      </h2>

      {enriched.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {kpis.map((k) => (
              <div key={k.label} className="border border-border p-3 bg-background">
                <p className="text-xs text-text-main/70 uppercase tracking-wide">{k.label}</p>
                <p className={`text-2xl font-bold ${k.accent}`}>
                  {k.dot && (
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: k.dot }}
                      aria-hidden="true"
                    />
                  )}
                  {k.value}
                  {k.unit && <span className="text-sm font-normal text-text-main/60"> {k.unit}</span>}
                </p>
              </div>
            ))}
          </div>

          <GasChart history={enriched} />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-text-main/60">
            <span>
              ⛓ Fuente: ESP32 {latest?.node ?? latest?.mac ?? ""} · CO₂ equivalente estimado
              (el sensor mide CH₄; para CO₂ real usar MQ-135)
            </span>
            {setCurrentPage && (
              <button
                type="button"
                onClick={() => setCurrentPage("telemetria")}
                className="text-accent font-bold hover:underline"
              >
                Ver telemetría completa →
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="text-4xl mb-3" aria-hidden="true">📈</div>
          <p className="text-text-main text-lg font-semibold mb-1">
            {isOnline
              ? "Canal abierto — esperando al ESP32…"
              : isStale
                ? "Canal abierto, pero sin telemetría reciente"
                : status === "connecting"
                  ? "Conectando al backend público…"
                  : "Sin conexión con el backend"}
          </p>
          <p className="text-text-main/70 text-sm mb-4">
            {isOnline ? (
              <>
                SSE <code>{streamUrl}</code> conectado · {messagesReceived} mensajes recibidos ·
                enciende el ESP32 y verifica que publique cada 10 s.
              </>
            ) : (
              <>
                No se pudo abrir <code>{streamUrl}</code>. Revisa que Render esté despierto y
                pulsa Reintentar.
              </>
            )}
          </p>
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button
            type="button"
            onClick={reconnect}
            className="px-4 py-2 text-sm font-heading border border-accent text-accent hover:opacity-80 transition-opacity"
          >
            ↻ Reintentar
          </button>
        </div>
      )}
    </section>
  );
};

GraficoPanel.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default GraficoPanel;
