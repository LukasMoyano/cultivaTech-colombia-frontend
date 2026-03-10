import React, { useState } from 'react';
import { registrarDatosBlockchain } from '../../api';

/**
 * Panel de Estado de Blockchain para CultivaTech ColombIA
 * Permite simular el registro de datos del ESP32 y visualizar la trazabilidad inmutable.
 */
const EstadoBlockchainPanel = () => {
  const [loading, setLoading] = useState(false);
  const [registro, setRegistro] = useState(null);
  const [error, setError] = useState(null);

  const handleSimularLectura = async () => {
    setLoading(true);
    setError(null);
    try {
      // Valores aleatorios para la simulación
      const tempSimulada = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
      const humSimulada = Math.floor(Math.random() * (90 - 40 + 1)) + 40;

      const data = await registrarDatosBlockchain({
        temperatura: tempSimulada,
        humedad: humSimulada
      });

      setRegistro({
        ...data,
        temp: tempSimulada,
        hum: humSimulada,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (err) {
      setError("No se pudo conectar con el servidor de Blockchain local.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-dark p-6 rounded-2xl border-2 border-primary shadow-lg transform transition-all hover:scale-[1.01]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-text-accent font-heading flex items-center">
          <span className="mr-2">🔗</span> TRAZABILIDAD BLOCKCHAIN
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${registro ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
          {registro ? 'Sincronizado' : 'Esperando Datos'}
        </span>
      </div>

      <p className="text-text-main mb-6 text-sm">
        Valida la integridad de tus datos agrícolas mediante el cálculo de hash SHA-256 inyectado en la red local de IR Productions.
      </p>

      <div className="space-y-4">
        <button
          onClick={handleSimularLectura}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all 
            ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark shadow-button active:scale-95'}`}
        >
          {loading ? 'PROCESANDO EN BLOCKCHAIN...' : '🚀 SIMULAR LECTURA ESP32'}
        </button>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs">
            {error}
          </div>
        )}

        {registro && (
          <div className="mt-6 p-4 bg-black/40 rounded-xl border border-primary/30 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-primary/10 rounded-lg">
                <span className="block text-[10px] text-text-main uppercase">Temp</span>
                <span className="text-xl font-bold text-text-accent">{registro.temp}°C</span>
              </div>
              <div className="text-center p-2 bg-primary/10 rounded-lg">
                <span className="block text-[10px] text-text-main uppercase">Hum</span>
                <span className="text-xl font-bold text-text-accent">{registro.hum}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-text-main">
                <span>ESTADO TX:</span>
                <span className="text-green-400 font-mono">{registro.txStatus}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-main mb-1">HASH SHA-256 (INMUTABLE):</span>
                <code className="text-[10px] bg-black/60 p-2 rounded border border-primary/20 text-primary break-all font-mono leading-tight">
                  {registro.hashGenerado}
                </code>
              </div>
              <div className="text-[9px] text-right text-text-main/50 italic">
                Verificado a las {registro.timestamp}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstadoBlockchainPanel;
