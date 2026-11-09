/**
 * CultivaTech Colombia · Telemetría In Situ (Mi Granja / ESP32)
 * Dashboard en tiempo real vía SSE desde Render / Local.
 * Adaptado dinámicamente al tema global: Modo Claro / Modo Evangelion (Night).
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
  const mac = displayLatest?.node || displayLatest?.mac || "ESP32-GRANJA-01";

  const connLabel = isOnline
    ? "En línea"
    : isStale
      ? "Sin datos recientes"
      : status === "connecting"
        ? "Conectando…"
        : "Desconectado";

  return (
    <section className="mq4" aria-label="Telemetría in situ de la granja en tiempo real">
      <header className="mq4-head">
        <div>
          <p className="mq4-eyebrow">CULTIVATECH COLOMBIA · NODO EN MI GRANJA</p>
          <h2 className="mq4-title">
            <span aria-hidden="true">🌱</span> Telemetría In Situ · Nodo Granja (ESP32)
          </h2>
          <p className="mq4-sub">
            Monitoreo ambiental multivariable · Calidad de aire / Gases · Muestras activas: {displayHistory.length}
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
            <strong>Sin comunicación con el nodo de la granja.</strong>
            <span> {error} Verificando canal de datos en {streamUrl}.</span>
          </div>
        </div>
      )}

      {/* Tarjetas KPI Superiores */}
      <div className="mq4-kpis">
        <KpiCard
          icon="📶"
          label="Estado del Enlace"
          pulse={isOnline}
          value={
            <span className={isOnline ? "mq4-ok" : "mq4-bad"}>
              {connLabel}
            </span>
          }
          sub={`${messagesReceived} paquetes recibidos · ${displayHistory.length}/${windowSize} en memoria`}
        />
        <KpiCard
          icon="📍"
          label="Identificador de Nodo"
          value={<span className="mq4-mono">{mac}</span>}
          sub={displayLatest ? `Sensor Activo: GPIO12 · t=${formatNumber(displayLatest.timestamp)}` : "En espera de ráfaga"}
        />
        <KpiCard
          icon="💨"
          label="Gases / Calidad Aire (MQ-4)"
          value={raw != null ? formatNumber(raw) : "—"}
          sub={stats.avg != null ? `Mín: ${formatNumber(stats.min)} · Prom: ${formatNumber(stats.avg)} · Máx: ${formatNumber(stats.max)}` : "Rango ADC 0–4095"}
        />
        <KpiCard
          icon="⚡"
          label="Voltaje de Salida"
          value={voltage != null ? `${Number(voltage).toFixed(2)} V` : "—"}
          sub="Lectura de referencia 3.3V"
        />
      </div>

      {/* Semáforo de Riesgo */}
      <RiskSemaphore mq4Raw={raw} />

      {/* Gráfica Multivariable */}
      <div className="mq4-chart-card">
        <div className="mq4-chart-head">
          <div>
            <h3 className="mq4-chart-title">Comportamiento Dinámico en Mi Granja</h3>
            <p className="mq4-chart-sub">
              Eje X: Tiempo · Eje Y: {metric === "raw" ? "Señal Sensor (ADC Raw)" : "Voltaje (V)"}
              {displayLatest ? ` · Última actualización: ${displayLatest.timeLabel}` : ""}
            </p>
          </div>
          <div className="mq4-toggle" role="group" aria-label="Métrica graficada">
            <button
              type="button"
              className={`mq4-toggle-btn ${metric === "raw" ? "mq4-toggle-btn--active" : ""}`}
              onClick={() => setMetric("raw")}
            >
              RAW ADC
            </button>
            <button
              type="button"
              className={`mq4-toggle-btn ${metric === "voltage" ? "mq4-toggle-btn--active" : ""}`}
              onClick={() => setMetric("voltage")}
            >
              VOLTAJE (V)
            </button>
          </div>
        </div>

        <div className="mq4-chart-wrap">
          {displayHistory.length > 0 ? (
            <Mq4Chart history={displayHistory} metric={metric} />
          ) : (
            <div className="mq4-chart-empty">
              <span aria-hidden="true">📡</span>
              <p>Esperando telemetría viva del nodo en la granja…</p>
              <small>Canal activo escuchando en tiempo real</small>
            </div>
          )}
        </div>

        <div className="mq4-chart-foot">
          <span>● Nodo en Campo: Granja Fusagasugá</span>
          <span>● Módulo Expansible: Humedad de suelo y Temp ambiente (próximos sensores)</span>
          <span>● Fuente: ESP32 Edge V2</span>
        </div>
      </div>
    </section>
  );
}

Mq4Dashboard.propTypes = {
  windowSize: PropTypes.number,
};

export default Mq4Dashboard;
