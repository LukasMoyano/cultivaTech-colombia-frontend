/**
 * Constantes y helpers del módulo de telemetría MQ-4 (ESP32).
 * Semáforo de riesgo basado en `mq4_raw` (ADC 12-bit, 0-4095):
 *  - < 1200            → NORMAL   (verde #10B981)  "Nivel Normal / Aire Limpio"
 *  - 1200 – 2200       → MODERADO (ámbar #F59E0B)  "Concentración Moderada / Precaución"
 *  - > 2200            → CRÍTICO  (rojo  #EF4444)  "Alerta Crítica de Gas Detectado"
 */

export const MQ4_THRESHOLDS = {
  MODERATE_MIN: 1200,
  CRITICAL_MIN: 2201, // > 2200
  ADC_MAX: 4095,
  V_REF: 3.3,
};

export const RISK_LEVELS = {
  NORMAL: "normal",
  MODERATE: "moderate",
  CRITICAL: "critical",
};

export const RISK_META = {
  [RISK_LEVELS.NORMAL]: {
    label: "Nivel Normal / Aire Limpio",
    short: "NORMAL",
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.45)",
    icon: "🌿",
    hint: "Concentración de gas dentro de parámetros seguros.",
  },
  [RISK_LEVELS.MODERATE]: {
    label: "Concentración Moderada / Precaución",
    short: "PRECAUCIÓN",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.5)",
    icon: "⚠️",
    hint: "Ventile el área y vigile la tendencia del sensor.",
  },
  [RISK_LEVELS.CRITICAL]: {
    label: "Alerta Crítica de Gas Detectado",
    short: "CRÍTICO",
    color: "#EF4444",
    bg: "rgba(239, 68, 68, 0.14)",
    border: "rgba(239, 68, 68, 0.6)",
    icon: "🚨",
    hint: "Evacúe/ventile de inmediato y verifique fugas de gas.",
  },
};

/** Clasifica un valor crudo MQ-4 en su nivel de riesgo. */
export function getRiskLevel(mq4Raw) {
  const v = Number(mq4Raw);
  if (!Number.isFinite(v)) return RISK_LEVELS.NORMAL;
  if (v > 2200) return RISK_LEVELS.CRITICAL;
  if (v >= 1200) return RISK_LEVELS.MODERATE;
  return RISK_LEVELS.NORMAL;
}

/** Convierte ADC crudo (ESP32 12-bit) a voltaje. */
export function rawToVoltage(raw, vRef = MQ4_THRESHOLDS.V_REF) {
  const v = Number(raw);
  if (!Number.isFinite(v)) return 0;
  return Number(((v * vRef) / MQ4_THRESHOLDS.ADC_MAX).toFixed(3));
}

export const DEFAULT_WS_URL = "ws://127.0.0.1:8080";
export const DEFAULT_WINDOW_SIZE = 40;
