/**
 * CultivaTech Colombia · Telemetría ambiental MQ-4 (ESP32)
 * Dashboard en tiempo real vía SSE desde Render.
 */

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import useTelemetryStream from "../../hooks/useTelemetryStream";
import KpiCard from "./KpiCard";
import RiskSemaphore from "./RiskSemaphore";
import Mq4Chart from "./Mq4Chart";
import { DEFAULT_WINDOW_SIZE } from "./telemetria.constants";
import "./Mq4Dashboard.css";

function formatNumber(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("es-CO").format(n);
}

function Mq4Dashboard({ windowSize = DEFAULT_WINDOW_SIZE }) {
  const [metric, setMetric] = useState("raw");
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
  } = useTelemetryStream({ windowSize });

  const displayLatest = latest;
  const displayHistory = history;

  const stats = useMemo(() => {
    if (displayHistory.length === 0) return { min: null, max: null, avg: null };
    const raws = displayHistory.map((h) => h.mq4_raw).filter((n) => Number.isFinite(n));
    if (raws.length === 0) return { min: null, max: null, avg: null };
    const min = Math.min(...raws);
    const max = Math.max(...raws);
    const avg = Math.round(raws.reduce((a, b) => a + b, 0) / raws.length);
    return { min, max, avg };
  }, [displayHistory]);

  const raw = displayLatest?.mq4_raw;
  const voltage = displayLatest?.voltage;
  const mac = displayLatest?.node || displayLatest?.mac || "—";

  const connLabel = isOnline
    ? "En línea"
    : isStale
      ? "Sin datos recientes"
      : status === "connecting"
        ? "Conectando…"
        : "Desconectado";

  return (
    <section className="mq4" aria-label="Telemetría MQ-4 en tiempo real">
      <header className="mq4-head">
        <div>
          <p className="mq4-eyebrow">CULTIVATECH COLOMBIA · IoT AMBIENTAL</p>
          <h2 className="mq4-title">
            <span aria-hidden="true">🌱</span> Calidad del aire · ESP32
          </h2>
          <p className="mq4-sub">
            Telemetría en tiempo real · <code>{streamUrl}</code> · ventana de {windowSize} puntos
          </p>
        </div>
        <div className="mq4-head-actions">
          <span className={`mq4-conn ${isOnline ? "mq4-conn--on" : "mq4-conn--off"}`} role="status">
            <span className={`mq4-conn-dot ${isOnline ? "mq4-pulse" : ""}`} aria-hidden="true" />
            {connLabel}
          </span>
          {!isOnline && (
            <button type="button" className="mq4-btn" onClick={reconnect}>
              ↻ Reintentar
            </button>
          )}
        </div>
      </header>

      {error && !isOnline && (
        <div className="mq4-error" role="alert">
          <span aria-hidden="true">⚠️</span>
          <div>
            <strong>Sin comunicación con el backend.</strong>
            <span> {error} Verifica Render y que el ESP32 publique en {streamUrl}.</span>
          </div>
        </div>
      )}

      <div className="mq4-kpis">
        <KpiCard
          icon="📶"
          label="Estado de conexión"
          accent={isOnline ? "#10B981" : "#EF4444"}
          pulse={isOnline}
          value={
            <span className={isOnline ? "mq4-ok" : "mq4-bad"}>
              {connLabel}
            </span>
          }
          sub={`${messagesReceived} mensajes · ${displayHistory.length}/${windowSize} puntos`}
        />
        <KpiCard
          icon="🔌"
          label="ID del dispositivo"
          accent="#34D399"
          value={<span className="mq4-mono">{mac}</span>}
          sub={displayLatest ? `Sensor ${displayLatest.sensor} · t=${formatNumber(displayLatest.timestamp)}` : "Sin datos aún"}
        />
        <KpiCard
          icon="🧪"
          label="Señal del sensor (cruda ADC)"
          accent="#A7F3D0"
          value={raw != null ? formatNumber(raw) : "—"}
          sub={stats.avg != null ? `min ${formatNumber(stats.min)} · prom ${formatNumber(stats.avg)} · max ${formatNumber(stats.max)}` : "Escala 0–4095 (ESP32)"}
        />
        <KpiCard
          icon="⚡"
          label="Voltaje (V)"
          accent="#6EE7B7"
          value={voltage != null ? `${Number(voltage).toFixed(2)} V` : "—"}
          sub="Convertido del ADC (ref 3.3 V)"
        />
      </div>

      <RiskSemaphore mq4Raw={raw} />

      <div className="mq4-chart-card">
        <div className="mq4-chart-head">
          <div>
            <h3 className="mq4-chart-title">Concentración en tiempo real</h3>
            <p className="mq4-chart-sub">
              Eje X: tiempo · Eje Y: {metric === "raw" ? "MQ-4 Raw (ADC)" : "voltaje (V)"}
              {displayLatest ? ` · último: ${displayLatest.timeLabel}` : ""}
            </p>
          </div>
          <div className="mq4-toggle" role="group" aria-label="Métrica de la gráfica">
            <button
              type="button"
              className={metric === "raw" ? "mq4-toggle-btn mq4-toggle-btn--active" : "mq4-toggle-btn"}
              onClick={() => setMetric("raw")}
              aria-pressed={metric === "raw"}
            >
              RAW
            </button>
            <button
              type="button"
              className={metric === "voltage" ? "mq4-toggle-btn mq4-toggle-btn--active" : "mq4-toggle-btn"}
              onClick={() => setMetric("voltage")}
              aria-pressed={metric === "voltage"}
            >
              VOLTAJE
            </button>
          </div>
        </div>
        <Mq4Chart history={displayHistory} metric={metric} />
        <div className="mq4-chart-foot">
          <span>● Ventana deslizante · {displayHistory.length} puntos</span>
          <span>● Umbrales: 1200 / 2200 raw</span>
          <span>● Fuente: ESP32 vía Render SSE</span>
        </div>
      </div>
    </section>
  );
}

Mq4Dashboard.propTypes = {
  windowSize: PropTypes.number,
};

export default React.memo(Mq4Dashboard);
