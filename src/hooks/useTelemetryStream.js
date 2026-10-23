import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_BACKEND_URL = import.meta.env.PROD
  ? "https://cultivatech-backend.onrender.com"
  : "http://localhost:3001";

export const TELEMETRY_BASE_URL = String(
  import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL
).replace(/\/+$/, "");

export const TELEMETRY_STREAM_URL = `${TELEMETRY_BASE_URL}/api/telemetry/stream`;

function numero(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : null;
}

export function normalizarLectura(payload) {
  if (!payload || typeof payload !== "object") return null;

  const sensors = payload.sensors && typeof payload.sensors === "object" ? payload.sensors : {};
  const raw = numero(payload.mq4_raw ?? sensors.mq4_raw);
  const voltageMv = numero(payload.voltage_mv ?? sensors.voltage_mv);
  const tsCrudo = numero(payload.timestamp ?? payload.ts);
  if (tsCrudo == null) return null;

  const timestamp = tsCrudo < 1e12 ? Math.round(tsCrudo * 1000) : Math.round(tsCrudo);
  const node = String(payload.node || payload.mac || "ESP32");
  const voltage = numero(payload.voltage) ?? (voltageMv != null ? voltageMv / 1000 : null);
  const recibido = payload.receivedAt ? Date.parse(payload.receivedAt) : Date.now();

  return {
    ...payload,
    node,
    mac: String(payload.mac || node),
    timestamp,
    sensor: String(payload.sensor || "MQ-4"),
    mq4_raw: raw,
    voltage_mv: voltageMv,
    voltage: voltage != null ? Number(voltage.toFixed(3)) : null,
    receivedAt: Number.isFinite(recibido) ? recibido : Date.now(),
    timeLabel: new Date(timestamp).toLocaleTimeString("es-CO", { hour12: false }),
  };
}

function claveLectura(lectura) {
  return lectura.hash || `${lectura.node}:${lectura.timestamp}:${lectura.mq4_raw}`;
}

export function useTelemetryStream({ windowSize = 40, staleAfterMs = 45000 } = {}) {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [error, setError] = useState(null);
  const [messagesReceived, setMessagesReceived] = useState(0);

  const esRef = useRef(null);
  const mountedRef = useRef(false);
  const seenRef = useRef(new Set());
  const lastEventAtRef = useRef(0);

  const registrarLectura = useCallback(
    (lectura) => {
      const clave = claveLectura(lectura);
      if (seenRef.current.has(clave)) return;
      seenRef.current.add(clave);
      if (seenRef.current.size > 1000) seenRef.current.clear();

      setHistory((prev) => {
        const next = [...prev, lectura].sort((a, b) => a.timestamp - b.timestamp);
        return next.slice(-windowSize);
      });
      setLatest(lectura);
      setMessagesReceived((n) => n + 1);
      lastEventAtRef.current = Date.now();
      setStatus((prev) => (prev === "online" || prev === "stale" ? "online" : prev));
    },
    [windowSize]
  );

  const cargarHistorial = useCallback(async () => {
    const respuesta = await fetch(
      `${TELEMETRY_BASE_URL}/api/telemetry/history?limit=${windowSize}`,
      { cache: "no-store" }
    );
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

    const datos = await respuesta.json();
    const lecturas = (Array.isArray(datos.history) ? datos.history : [])
      .map(normalizarLectura)
      .filter(Boolean);

    if (!mountedRef.current || lecturas.length === 0) return;

    seenRef.current.clear();
    lecturas.forEach((lectura) => seenRef.current.add(claveLectura(lectura)));
    setHistory(lecturas.slice(-windowSize));
    setLatest(lecturas[lecturas.length - 1]);
    setMessagesReceived((n) => Math.max(n, lecturas.length));
    lastEventAtRef.current = Date.now();
  }, [windowSize]);

  const connect = useCallback(() => {
    if (!mountedRef.current) return;

    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }

    setStatus("connecting");
    setError(null);

    const source = new EventSource(TELEMETRY_STREAM_URL);
    esRef.current = source;

    source.onopen = () => {
      if (esRef.current !== source) return;
      setStatus("online");
      setError(null);
    };

    source.onmessage = (event) => {
      if (esRef.current !== source) return;
      try {
        const lectura = normalizarLectura(JSON.parse(event.data));
        if (lectura) registrarLectura(lectura);
      } catch {
        setError("El backend envió un mensaje SSE inválido.");
      }
    };

    source.onerror = () => {
      if (esRef.current !== source) return;
      setStatus("offline");
      setError("Conexión SSE interrumpida; el navegador reintentará automáticamente.");
    };
  }, [registrarLectura]);

  const reconnect = useCallback(() => {
    setError(null);
    cargarHistorial().catch(() => {});
    connect();
  }, [cargarHistorial, connect]);

  useEffect(() => {
    mountedRef.current = true;
    cargarHistorial().catch((err) => {
      if (mountedRef.current) setError(err.message);
    });
    connect();

    const watchdog = window.setInterval(() => {
      if (!mountedRef.current || !lastEventAtRef.current) return;
      if (Date.now() - lastEventAtRef.current > staleAfterMs) {
        setStatus((prev) => (prev === "online" ? "stale" : prev));
      }
    }, 10000);

    return () => {
      mountedRef.current = false;
      window.clearInterval(watchdog);
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
  }, [cargarHistorial, connect, staleAfterMs]);

  return {
    latest,
    history,
    status,
    isOnline: status === "online",
    isStale: status === "stale",
    hasData: history.length > 0,
    error,
    messagesReceived,
    reconnect,
    streamUrl: TELEMETRY_STREAM_URL,
    baseUrl: TELEMETRY_BASE_URL,
  };
}

export default useTelemetryStream;
