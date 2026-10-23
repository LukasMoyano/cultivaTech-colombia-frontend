import React, { useMemo } from "react";
import { useBlockchainListener } from "../../hooks/useBlockchainListener";

export const PanelAlertas = ({ lecturaActual, perfilActual }) => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const { alertas, isListening } = useBlockchainListener(contractAddress);

  const alerta = useMemo(() => {
    if (!lecturaActual || !perfilActual) return null;

    const raw = Number(lecturaActual.raw);
    const { limites, nombre } = perfilActual;

    if (!Number.isFinite(raw) || !limites) return null;
    if (raw >= limites.min && raw <= limites.max) return null;

    const ultimoEvento = alertas[0];

    return {
      mensaje: `Límite crítico cruzado para ${nombre}. Lectura: ${raw}`,
      txLink: ultimoEvento?.urlExplorador || null,
    };
  }, [lecturaActual, perfilActual, alertas]);

  return (
    <div className="bg-background-dark p-6 rounded-2xl border-2 border-primary shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-text-accent font-heading">
          ALERTAS BLOCKCHAIN
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            isListening
              ? "bg-green-500/20 text-green-400"
              : "bg-amber-500/20 text-amber-400"
          }`}
        >
          {isListening ? "WSS activo" : "Oráculo local"}
        </span>
      </div>

      {alerta && (
        <div className="bg-red-900 border border-red-500 text-white px-4 py-3 rounded-lg mb-4 shadow-lg">
          <strong className="font-bold">Atención biológica: </strong>
          <span>{alerta.mensaje}</span>
          {alerta.txLink && (
            <a
              href={alerta.txLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 underline text-cyan-300 hover:text-cyan-100"
            >
              Verificar anclaje
            </a>
          )}
        </div>
      )}

      <p className="text-text-main text-sm mb-3">
        Últimos lotes anclados por el oráculo:
      </p>

      {alertas.length === 0 ? (
        <p className="text-text-main/60 text-xs">
          Sin anclajes registrados. Configure VITE_CONTRACT_ADDRESS y
          VITE_SEPOLIA_WSS_URL, o use el oráculo local.
        </p>
      ) : (
        <ul className="space-y-2">
          {alertas.slice(0, 3).map((evento) => (
            <li
              key={`${evento.hash}-${evento.timestamp}`}
              className="bg-black/40 rounded-lg p-3 border border-primary/20 text-xs"
            >
              <div className="flex justify-between gap-3">
                <code className="text-primary break-all font-mono">
                  {evento.hash ? `${evento.hash.slice(0, 18)}...` : "sin raíz"}
                </code>
                <span className="text-text-main/60 whitespace-nowrap">
                  {evento.timestamp ? new Date(evento.timestamp).toLocaleTimeString() : "-"}
                </span>
              </div>
              <div className="flex justify-between gap-3 mt-1">
                <span className="text-text-main/60">
                  {evento.modo === "sepolia" ? "Sepolia" : "Simulación local"}
                </span>
                {evento.urlExplorador ? (
                  <a
                    href={evento.urlExplorador}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-100 underline"
                  >
                    Ver transacción
                  </a>
                ) : (
                  <span className="text-text-main/40">Sin tx on-chain</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelAlertas;
