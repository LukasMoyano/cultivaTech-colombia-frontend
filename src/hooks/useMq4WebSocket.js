import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_URL = "ws://localhost:8080";
const DEFAULT_WINDOW = 40;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 15000;

/**
 * @typedef {Object} Mq4Reading
 * @property {string} mac - Dirección MAC del ESP32
 * @property {number} timestamp - Timestamp enviado por el firmware
 * @property {string} sensor - Nombre del sensor ("MQ-4")
 * @property {number} mq4_raw - Valor crudo ADC (0-4095 en ESP32)
 * @property {number} voltage - Voltaje convertido (V)
 * @property {number} receivedAt - Epoch ms local de recepción
 * @property {string} timeLabel - Hora local formateada para el eje X
 */

/**
 * Hook de telemetría MQ-4 vía WebSocket con reconexión automática.
 *
 * - Escucha JSON: { mac, timestamp, sensor, mq4_raw, voltage }
 * - Ventana deslizante de N puntos para la gráfica en tiempo real.
 * - Backoff exponencial ante desconexiones + limpieza total al desmontar.
 * - Seguro bajo React 19 StrictMode (doble montaje en dev).
 *
 * @param {string} [url] - URL del WebSocket. Por defecto VITE_WS_MQ4_URL o ws://localhost:8080
 * @param {Object} [options]
 * @param {number} [options.windowSize=40] - Puntos retenidos (30-50 recomendado)
 * @param {boolean} [options.autoConnect=true]
 */
export function useMq4WebSocket(url, options = {}) {
  const { windowSize = DEFAULT_WINDOW, autoConnect = true } = options;
  const wsUrl =
    url || import.meta.env.VITE_WS_MQ4_URL || DEFAULT_URL;

  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("connecting"); // connecting | online | offline
  const [error, setError] = useState(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const [messagesReceived, setMessagesReceived] = useState(0);

  const wsRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const attemptsRef = useRef(0);
  const mountedRef = useRef(false);
  const manualCloseRef = useRef(false);
  const windowSizeRef = useRef(windowSize);
  windowSizeRef.current = windowSize;

  const clearRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const closeSocket = useCallback(() => {
    if (wsRef.current) {
      try {
        // 1000 = cierre normal; evita que onclose dispare reconexión cuando es manual
        wsRef.current.close(1000, "unmount");
      } catch {
        // ignorar errores al cerrar un socket ya cerrado
      }
      wsRef.current = null;
    }
  }, []);

  /** Normaliza y valida un mensaje crudo del ESP32. Retorna null si es inválido. */
  const parseMessage = useCallback((rawEvent) => {
    let payload;
    try {
      payload =
        typeof rawEvent === "string" ? JSON.parse(rawEvent) : rawEvent;
    } catch {
      return null;
    }
    if (!payload || typeof payload !== "object") return null;

    const mq4Raw = Number(payload.mq4_raw);
    if (!Number.isFinite(mq4Raw)) return null;

    const voltage = Number.isFinite(Number(payload.voltage))
      ? Number(payload.voltage)
      : Number(((mq4Raw * 3.3) / 4095).toFixed(3)); // fallback ADC 12-bit ESP32

    const now = Date.now();
    return {
      mac: typeof payload.mac === "string" ? payload.mac : "—",
      timestamp: Number(payload.timestamp) || now,
      sensor: typeof payload.sensor === "string" ? payload.sensor : "MQ-4",
      mq4_raw: Math.round(mq4Raw),
      voltage: Number(voltage.toFixed(3)),
      receivedAt: now,
      timeLabel: new Date(now).toLocaleTimeString("es-CO", { hour12: false }),
    };
  }, []);

  const scheduleReconnect = useCallback(() => {
    if (!mountedRef.current || manualCloseRef.current) return;
    attemptsRef.current += 1;
    setReconnectAttempt(attemptsRef.current);
    const delay = Math.min(
      BASE_DELAY_MS * 2 ** (attemptsRef.current - 1),
      MAX_DELAY_MS
    );
    clearRetry();
    retryTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current && !manualCloseRef.current) {
        connectRef.current?.();
      }
    }, delay);
  }, [clearRetry]);

  const connectRef = useRef(null);

  const connect = useCallback(() => {
    if (!mountedRef.current || manualCloseRef.current) return;
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }
    clearRetry();
    setStatus((prev) => (prev === "online" ? prev : "connecting"));

    let ws;
    try {
      ws = new WebSocket(wsUrl);
    } catch (err) {
      setError(err?.message || "No se pudo crear el WebSocket");
      setStatus("offline");
      scheduleReconnect();
      return;
    }
    wsRef.current = ws;

    ws.onopen = () => {
      if (!mountedRef.current) return;
      attemptsRef.current = 0;
      setReconnectAttempt(0);
      setStatus("online");
      setError(null);
    };

    ws.onmessage = (event) => {
      if (!mountedRef.current) return;
      const reading = parseMessage(event.data);
      if (!reading) return; // mensaje malformado: se ignora sin romper el stream
      setLatest(reading);
      setMessagesReceived((n) => n + 1);
      setHistory((prev) => {
        const next = [...prev, reading];
        const cap = Math.max(10, Math.min(200, windowSizeRef.current));
        return next.length > cap ? next.slice(next.length - cap) : next;
      });
    };

    ws.onerror = () => {
      // El evento 'close' posterior gestiona la reconexión; aquí solo registramos
      if (!mountedRef.current) return;
      setError("Error de comunicación con el sensor (WebSocket)");
    };

    ws.onclose = (ev) => {
      wsRef.current = null;
      if (!mountedRef.current || manualCloseRef.current) return;
      setStatus("offline");
      if (ev.code !== 1000) {
        setError(`Conexión perdida (código ${ev.code}). Reintentando…`);
      }
      scheduleReconnect();
    };
  }, [wsUrl, clearRetry, parseMessage, scheduleReconnect]);

  connectRef.current = connect;

  /** Reconexión manual (p.ej. botón "Reintentar"). */
  const reconnect = useCallback(() => {
    attemptsRef.current = 0;
    setReconnectAttempt(0);
    setError(null);
    manualCloseRef.current = false;
    closeSocket();
    clearRetry();
    connectRef.current?.();
  }, [clearRetry, closeSocket]);

  useEffect(() => {
    mountedRef.current = true;
    manualCloseRef.current = false;
    if (autoConnect) connect();

    return () => {
      // Limpieza total al desmontar: sin timers vivos ni sockets abiertos
      mountedRef.current = false;
      manualCloseRef.current = true;
      clearRetry();
      closeSocket();
    };
  }, [autoConnect, connect, clearRetry, closeSocket]);

  return {
    latest,
    history,
    status,
    isOnline: status === "online",
    error,
    reconnectAttempt,
    messagesReceived,
    reconnect,
    wsUrl,
  };
}

export default useMq4WebSocket;
