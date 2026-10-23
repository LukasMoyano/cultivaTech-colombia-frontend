import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { obtenerEventosBlockchain } from "../api";

const ABI = [
  "event RaizAnclada(bytes32 indexed raizBatch, uint256 timestamp, address sensor)",
];

/**
 * Escucha en tiempo real el evento RaizAnclada.
 * Si no hay WSS configurado, hace polling del oráculo local para mostrar
 * los anclajes en modo simulación.
 */
export const useBlockchainListener = (contractAddress) => {
  const [alertas, setAlertas] = useState([]);
  const [isListening, setIsListening] = useState(false);

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
          setAlertas(
            eventos.map((evento) => ({
              hash: evento.raiz,
              timestamp: Date.parse(evento.ancladoEn),
              txHash: evento.txHash,
              modo: evento.modo,
              urlExplorador: evento.txHash
                ? `https://sepolia.etherscan.io/tx/${evento.txHash}`
                : null,
            }))
          );
        } catch (error) {
          if (activo) {
            console.warn("No se pudo consultar el oráculo local:", error.message);
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
        setAlertas((previas) => [
          {
            hash: raizBatch,
            timestamp: Number(timestamp) * 1000,
            sensor,
            txHash: event.log.transactionHash,
            modo: "sepolia",
            urlExplorador: `https://sepolia.etherscan.io/tx/${event.log.transactionHash}`,
          },
          ...previas,
        ].slice(0, 5));
      };

      contrato.on("RaizAnclada", onRaizAnclada);
      setIsListening(true);
    } catch (error) {
      console.error("No se pudo iniciar el listener WebSocket:", error.message);
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
