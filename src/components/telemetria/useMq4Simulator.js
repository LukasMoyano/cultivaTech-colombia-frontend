import { useEffect, useRef, useState } from "react";

/**
 * Simulador de telemetría MQ-4 para desarrollo sin hardware.
 * Genera lecturas sintéticas (deriva + picos) cada segundo mientras
 * esté activo y NO haya conexión real. Se apaga solo al llegar el
 * primer mensaje del ESP32.
 *
 * @param {boolean} isOnline - Estado real del WebSocket
 * @param {number} messagesReceived - Contador real (para autodetección)
 * @param {number} windowSize - Puntos retenidos
 */
export function useMq4Simulator(isOnline, messagesReceived, windowSize = 40) {
  const [simOn, setSimOn] = useState(false);
  const [simLatest, setSimLatest] = useState(null);
  const [simHistory, setSimHistory] = useState([]);
  const simSeqRef = useRef(0);

  useEffect(() => {
    if (messagesReceived > 0 && simOn) setSimOn(false);
  }, [messagesReceived, simOn]);

  useEffect(() => {
    if (!simOn || isOnline) return undefined;
    const id = setInterval(() => {
      const now = Date.now();
      simSeqRef.current += 1000;
      setSimLatest((prev) => {
        const base = prev?.mq4_raw ?? 1100;
        const drift = (Math.random() - 0.48) * 160;
        let raw = Math.round(base + drift);
        if (Math.random() < 0.06) raw = 2250 + Math.round(Math.random() * 600);
        else if (Math.random() < 0.12) raw = 1250 + Math.round(Math.random() * 800);
        raw = Math.max(400, Math.min(3300, raw));
        const reading = {
          mac: "SIM:UL:AD:OR:00:01",
          timestamp: simSeqRef.current,
          sensor: "MQ-4 (sim)",
          mq4_raw: raw,
          voltage: Number(((raw * 3.3) / 4095).toFixed(3)),
          receivedAt: now,
          timeLabel: new Date(now).toLocaleTimeString("es-CO", { hour12: false }),
        };
        setSimHistory((h) => {
          const next = [...h, reading];
          return next.length > windowSize ? next.slice(next.length - windowSize) : next;
        });
        return reading;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [simOn, isOnline, windowSize]);

  const stopSim = () => {
    setSimOn(false);
    setSimHistory([]);
    setSimLatest(null);
  };

  return { simOn, setSimOn, simLatest, simHistory, stopSim };
}

export default useMq4Simulator;
