import React, { useCallback, useEffect, useState } from "react";
import { obtenerEstadoBlockchain, obtenerTelemetriaLatest } from "../../api";

const EstadoBlockchainPanel = () => {
  const [estado, setEstado] = useState(null);
  const [telemetria, setTelemetria] = useState(null);
  const [error, setError] = useState(null);

  const actualizarEstado = useCallback(async () => {
    try {
      const [nuevoEstado, nuevaTelemetria] = await Promise.all([
        obtenerEstadoBlockchain(),
        obtenerTelemetriaLatest().catch(() => null),
      ]);
      setEstado(nuevoEstado);
      setTelemetria(nuevaTelemetria?.latest || null);
      setError(null);
    } catch (err) {
      setError("No se pudo consultar el estado del oráculo.");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    actualizarEstado();
    const intervalo = window.setInterval(actualizarEstado, 10000);
    return () => window.clearInterval(intervalo);
  }, [actualizarEstado]);

  const modo = estado?.modo === "sepolia" ? "Sepolia" : "Simulación";
  const txHash = estado?.ultimaTx;

  return (
    <div className="bg-background-dark p-6 rounded-2xl border-2 border-primary shadow-lg transform transition-all hover:scale-[1.01]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-text-accent font-heading">
          TRAZABILIDAD BLOCKCHAIN
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            estado?.modo === "sepolia"
              ? "bg-green-500/20 text-green-400"
              : "bg-amber-500/20 text-amber-400"
          }`}
        >
          {modo}
        </span>
      </div>

      <p className="text-text-main mb-4 text-sm">
        El oráculo valida HMAC-SHA256, evita replay y ancla una raíz Merkle por lote.
        Sin credenciales Web3 en Sepolia, la cola queda pendiente y se muestra como simulación.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="bg-primary/10 rounded-lg p-3">
          <span className="block text-[10px] text-text-main uppercase">En cola</span>
          <span className="text-xl font-bold text-text-accent">{estado?.pendientes ?? "-"}</span>
        </div>
        <div className="bg-primary/10 rounded-lg p-3">
          <span className="block text-[10px] text-text-main uppercase">Lotes anclados</span>
          <span className="text-xl font-bold text-text-accent">{estado?.anclados?.length ?? "-"}</span>
        </div>
      </div>

      <div className="bg-primary/10 rounded-lg p-3 mb-4">
        <span className="block text-[10px] text-text-main uppercase mb-1">Última lectura MQ-4</span>
        {telemetria ? (
          <>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-mono text-text-accent">
                {telemetria.node || telemetria.mac || "ESP32"}
              </span>
              <span className="text-text-main/60">
                {new Date(telemetria.timestamp).toLocaleTimeString("es-CO", { hour12: false })}
              </span>
            </div>
            <div className="mt-1 text-sm font-bold text-text-accent">
              {telemetria.mq4_raw != null ? `${telemetria.mq4_raw} ADC` : "Sin señal"}
              {telemetria.voltage != null && (
                <span className="ml-2 text-xs font-normal text-text-main/60">
                  {Number(telemetria.voltage).toFixed(2)} V
                </span>
              )}
            </div>
            <code className="mt-2 block text-[9px] bg-black/60 p-2 rounded border border-primary/20 text-primary break-all font-mono leading-tight">
              {telemetria.hash || "hash pendiente"}
            </code>
          </>
        ) : (
          <p className="text-xs text-text-main/60">Sin telemetría recibida todavía.</p>
        )}
      </div>

      {estado?.ultimaRaiz && (
        <div className="mb-4">
          <span className="block text-[10px] text-text-main mb-1">ÚLTIMA RAÍZ MERKLE:</span>
          <code className="block text-[10px] bg-black/60 p-2 rounded border border-primary/20 text-primary break-all font-mono leading-tight">
            {estado.ultimaRaiz}
          </code>
          {txHash ? (
            <a
              href={estado.urlExplorador}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[10px] text-cyan-300 hover:text-cyan-100 underline"
            >
              Ver transacción en Sepolia
            </a>
          ) : (
            <p className="mt-2 text-[10px] text-text-main/50">
              Anclaje on-chain pendiente: sin saldo o contrato en Sepolia.
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default EstadoBlockchainPanel;
