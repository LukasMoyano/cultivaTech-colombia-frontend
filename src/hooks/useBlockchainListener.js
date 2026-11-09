import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { obtenerEventosBlockchain } from "../api";
import { guardarAlertasDB, obtenerAlertasDB } from "../utils/indexedDBStorage";

const ABI = [
  "event RaizAnclada(bytes32 indexed raizBatch, uint256 timestamp, address sensor)",
];

/**
 * Hook de Escucha Silenciosa (useBlockchainListener)
 * - Escucha eventos RaizAnclada en WebSocket Sepolia.
 * - Sincroniza y persiste automáticamente en IndexedDB en segundo plano.
 * - Si no hay WSS, realiza polling al oráculo local para pruebas de simulación.
 */
export const useBlockchainListener = (contractAddress) => {
  const [alertas, setAlertas] = useState([]);
  const [isListening, setIsListening] = useState(false);

  // 1. Carga inicial desde caché persistente IndexedDB
  useEffect(() => {
    let montado = true;
    obtenerAlertasDB(10).then((alertasCacheadas) => {
      if (montado && alertasCacheadas && alertasCacheadas.length > 0) {
        setAlertas(alertasCacheadas);
      }
    });
    return () => {
      montado = false;
    };
  }, []);

  // 2. Listener WSS / Polling con actualización reactiva
  useEffect(() => {
    const WSS_URL = import.meta.env.VITE_SEPOLIA_WSS_URL;
    const direccion = contractAddress || import.meta.env.VITE_CONTRACT_ADDRESS;
    let activo = true;
    let provider;
    let contrato;
    let intervalo;

    if (!WSS_URL || !direccion) {
      const cargarEventosLocales = async () => {
        try {
          const eventos = await obtenerEventosBlockchain();
          if (!activo) return;

          const mapeados = eventos.map((evento) => ({
            hash: evento.raiz,
            timestamp: Date.parse(evento.ancladoEn) || Date.now(),
            txHash: evento.txHash || "0xsimulacion",
            modo: evento.modo || "simulacion",
            urlExplorador: evento.txHash
              ? `https://sepolia.etherscan.io/tx/${evento.txHash}`
              : null,
          }));

          setAlertas((previas) => {
            const combinadas = [...mapeados, ...previas];
            const unicas = Array.from(new Map(combinadas.map((a) => [a.hash, a])).values()).slice(0, 15);
            guardarAlertasDB(unicas); // Persistencia silenciosa en IndexedDB
            return unicas;
          });
        } catch (error) {
          if (activo) {
            console.warn("[BlockchainListener] Oráculo local en reposo:", error.message);
          }
        }
      };

      setIsListening(false);
      cargarEventosLocales();
      intervalo = window.setInterval(cargarEventosLocales, 10000);
      return () => {
        activo = false;
        window.clearInterval(intervalo);
      };
    }

    try {
      provider = new ethers.WebSocketProvider(WSS_URL);
      contrato = new ethers.Contract(direccion, ABI, provider);

      const onRaizAnclada = (raizBatch, timestamp, sensor, event) => {
        if (!activo) return;
        const nuevaAlerta = {
          hash: raizBatch,
          timestamp: Number(timestamp) * 1000,
          sensor,
          txHash: event.log.transactionHash,
          modo: "sepolia",
          urlExplorador: `https://sepolia.etherscan.io/tx/${event.log.transactionHash}`,
        };

        setAlertas((previas) => {
          const unicas = [nuevaAlerta, ...previas.filter((a) => a.hash !== raizBatch)].slice(0, 15);
          guardarAlertasDB(unicas); // Persistencia silenciosa en IndexedDB
          return unicas;
        });
      };

      contrato.on("RaizAnclada", onRaizAnclada);
      setIsListening(true);
    } catch (error) {
      console.error("[BlockchainListener] Error en WSS Sepolia:", error.message);
      setIsListening(false);
    }

    return () => {
      activo = false;
      if (contrato) contrato.off("RaizAnclada");
      if (provider) provider.destroy();
      setIsListening(false);
    };
  }, [contractAddress]);

  return { alertas, isListening };
};
