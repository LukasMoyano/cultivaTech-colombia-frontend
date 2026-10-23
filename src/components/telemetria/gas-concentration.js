/**
 * CultivaTech Colombia · Conversión MQ-4 (ESP32) → concentración de gas.
 * --------------------------------------------------------------------
 * Cadena de conversión:
 *   raw (ADC 12-bit, 0-4095) → Vout → Rs → Rs/R0 → ppm (ley de potencia)
 *
 * Modelo eléctrico (módulo MQ-4 típico):
 *   Vout = raw / 4095 * 3.3
 *   Rs   = (Vcc - Vout) / Vout * RL, con Vcc = 5.0 V y RL = 10 kΩ
 *
 * Curva de sensibilidad MQ-4 (aproximación log-log de la hoja de datos):
 *   CH4: ppm = 200 * (ratio / 1.8) ^ -2.82, rango útil 200–10.000 ppm.
 *   El MQ-4 NO resuelve metano ambiental (~1.9 ppm): por debajo del
 *   rango se informa el piso de detección (200 ppm).
 *
 * CO2: el MQ-4 NO es un sensor de CO2 (para medición real usar MQ-135).
 *   Se publica un ÍNDICE ESTIMADO anclado al fondo atmosférico (400 ppm)
 *   que sube con la carga de gas detectada. Úsalo como tendencia, no
 *   como metrología.
 *
 * Calibración de R0 (¡recomendada!):
 *   1. Precalienta el sensor 5 min al aire limpio.
 *   2. Lee `raw` estable y calcula Rs con voltageToRs().
 *   3. R0 = Rs_aire_limpio / 4.4  (ratio típico MQ-4 en aire limpio).
 *   4. Pasa ese R0 a enrichReading() / ppmMethane().
 */

export const MQ4_ELEC = {
  ADC_MAX: 4095,
  V_REF: 3.3, // ADC del ESP32
  VCC: 5.0, // alimentación del módulo MQ-4
  RL_OHM: 10_000, // resistencia de carga típica del módulo
  CLEAN_AIR_RATIO: 4.4, // Rs/R0 típico del MQ-4 en aire limpio
};

/** R0 por defecto (Ω). Reemplázalo por tu calibración (ver arriba). */
export const DEFAULT_R0_OHM = 10_000;

export const CH4_MODEL = {
  PPM_REF: 200,
  RATIO_REF: 1.8,
  EXPONENT: -2.82,
  PPM_MIN: 200, // piso de detección del MQ-4
  PPM_MAX: 10_000,
};

export const CO2_MODEL = {
  BASELINE: 400, // fondo atmosférico
  GAIN: 1200,
  RATIO_REF: 0.28,
  PPM_MIN: 400,
  PPM_MAX: 5000,
};

/** raw ADC → voltaje a la salida del divisor del módulo. */
export function rawToVoltage(raw) {
  const v = Number(raw);
  if (!Number.isFinite(v)) return 0;
  const clamped = Math.max(0, Math.min(MQ4_ELEC.ADC_MAX, v));
  return Number(((clamped * MQ4_ELEC.V_REF) / MQ4_ELEC.ADC_MAX).toFixed(3));
}

/** Vout → resistencia del sensor Rs (Ω). */
export function voltageToRs(vout, vcc = MQ4_ELEC.VCC, rl = MQ4_ELEC.RL_OHM) {
  const v = Number(vout);
  if (!Number.isFinite(v) || v <= 0.01 || v >= vcc) return null;
  return ((vcc - v) / v) * rl;
}

/** Rs + R0 → ppm de metano (CH4). Retorna null si no es calculable. */
export function rsToMethanePpm(rs, r0 = DEFAULT_R0_OHM) {
  if (!Number.isFinite(rs) || rs <= 0 || !Number.isFinite(r0) || r0 <= 0) return null;
  const ratio = rs / r0;
  const ppm = CH4_MODEL.PPM_REF * Math.pow(ratio / CH4_MODEL.RATIO_REF, CH4_MODEL.EXPONENT);
  return Math.round(Math.max(CH4_MODEL.PPM_MIN, Math.min(CH4_MODEL.PPM_MAX, ppm)));
}

/** Rs + R0 → CO2 equivalente ESTIMADO (tendencia, no metrología). */
export function rsToCo2Ppm(rs, r0 = DEFAULT_R0_OHM) {
  if (!Number.isFinite(rs) || rs <= 0 || !Number.isFinite(r0) || r0 <= 0) return null;
  const ratio = rs / r0;
  const ppm = CO2_MODEL.BASELINE + CO2_MODEL.GAIN * (1 / ratio - CO2_MODEL.RATIO_REF);
  return Math.round(Math.max(CO2_MODEL.PPM_MIN, Math.min(CO2_MODEL.PPM_MAX, ppm)));
}

/** Atajo: raw ADC → { voltage, rs, ch4Ppm, co2Ppm }. */
export function rawToGases(raw, r0 = DEFAULT_R0_OHM) {
  const voltage = rawToVoltage(raw);
  const rs = voltageToRs(voltage);
  if (rs == null) return { voltage, rs: null, ch4Ppm: null, co2Ppm: null };
  return {
    voltage,
    rs: Math.round(rs),
    ch4Ppm: rsToMethanePpm(rs, r0),
    co2Ppm: rsToCo2Ppm(rs, r0),
  };
}

/** Calibración: raw estable en aire limpio → R0. */
export function r0FromCleanAir(rawAir) {
  const rs = voltageToRs(rawToVoltage(rawAir));
  if (rs == null) return null;
  return Math.round(rs / MQ4_ELEC.CLEAN_AIR_RATIO);
}

/**
 * Enriquece una lectura del hook (o del simulador) con gases en ppm.
 * No muta la lectura original.
 */
export function enrichReading(reading, r0 = DEFAULT_R0_OHM) {
  if (!reading) return null;
  const gases =
    Number.isFinite(Number(reading.mq4_raw))
      ? rawToGases(Number(reading.mq4_raw), r0)
      : { voltage: reading.voltage ?? null, rs: null, ch4Ppm: null, co2Ppm: null };
  return { ...reading, ...gases };
}

export const GAS_META = {
  ch4: { label: "Metano (CH₄)", unit: "ppm", color: "#1a8a40", estimated: false },
  co2: { label: "CO₂ equivalente", unit: "ppm", color: "#B45309", estimated: true },
};
