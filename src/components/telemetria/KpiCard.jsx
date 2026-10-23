import React from "react";
import PropTypes from "prop-types";

/**
 * Tarjeta KPI del dashboard de telemetría.
 * Estilo agro-tech oscuro autocontenido (no depende del tema global).
 */
function KpiCard({ icon, label, value, sub, accent = "#34D399", pulse = false }) {
  return (
    <div
      className="mq4-kpi"
      style={{ "--mq4-accent": accent }}
    >
      <div className="mq4-kpi-top">
        <span className="mq4-kpi-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="mq4-kpi-label">{label}</span>
        {pulse && <span className="mq4-live-dot" aria-hidden="true" />}
      </div>
      <div className="mq4-kpi-value">{value}</div>
      {sub && <div className="mq4-kpi-sub">{sub}</div>}
    </div>
  );
}

KpiCard.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  sub: PropTypes.node,
  accent: PropTypes.string,
  pulse: PropTypes.bool,
};

export default React.memo(KpiCard);
