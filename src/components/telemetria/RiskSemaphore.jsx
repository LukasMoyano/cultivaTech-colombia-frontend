import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { RISK_META, getRiskLevel } from "./telemetria.constants";

/**
 * Semáforo de riesgo ambiental para MQ-4.
 * - Verde <1200 · Ámbar 1200-2200 · Rojo >2200 (parpadeo).
 */
function RiskSemaphore({ mq4Raw }) {
  const level = useMemo(() => getRiskLevel(mq4Raw), [mq4Raw]);
  const meta = RISK_META[level];
  const isCritical = level === "critical";

  const steps = [
    { key: "normal", color: "#10B981", active: level === "normal", title: "Normal (<1200)" },
    { key: "moderate", color: "#F59E0B", active: level === "moderate", title: "Moderado (1200–2200)" },
    { key: "critical", color: "#EF4444", active: level === "critical", title: "Crítico (>2200)" },
  ];

  return (
    <div
      className={`mq4-risk ${isCritical ? "mq4-risk--critical" : ""}`}
      style={{ "--mq4-risk": meta.color, "--mq4-risk-bg": meta.bg, "--mq4-risk-border": meta.border }}
      role="alert"
      aria-live="assertive"
    >
      <div className="mq4-risk-lights" aria-hidden="true">
        {steps.map((s) => (
          <span
            key={s.key}
            title={s.title}
            className={`mq4-light ${s.active ? "mq4-light--on" : ""}`}
            style={s.active ? { backgroundColor: s.color, boxShadow: `0 0 14px ${s.color}` } : undefined}
          />
        ))}
      </div>
      <div className="mq4-risk-body">
        <div className="mq4-risk-title">
          <span aria-hidden="true">{meta.icon}</span> {meta.label}
        </div>
        <div className="mq4-risk-hint">{meta.hint}</div>
        <div className="mq4-risk-scale">
          <span>&lt;1200 limpio</span>
          <span>1200–2200 precaución</span>
          <span>&gt;2200 crítico</span>
        </div>
      </div>
      <div
        className={`mq4-risk-badge ${isCritical ? "mq4-blink" : ""}`}
        style={{ backgroundColor: meta.color }}
      >
        {meta.short}
      </div>
    </div>
  );
}

RiskSemaphore.propTypes = {
  mq4Raw: PropTypes.number,
};

export default React.memo(RiskSemaphore);
