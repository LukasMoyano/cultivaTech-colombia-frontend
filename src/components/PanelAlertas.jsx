import React, { useState } from 'react';

/**
 * Perfiles Agronómicos Predefinidos para CultivaTech ColombIA
 * - Micología (Cultivo de Orellanas / Champiñones): Alta humedad, CO2/Gas controlado.
 * - Apicultura (Colmenas Inteligentes): Control de fermentación/gases y temperatura.
 */
export const PERFILES_CULTIVO = {
  micologia: {
    nombre: "🍄 MICOLOGÍA (Hongos / Orellanas)",
    umbralAlerta: 1800,
    umbralCritico: 2600,
    unidad: "RAW MQ-4",
    descripcion: "Alerta por acumulación de CO2 o gases de fermentación en cuarto de fructificación."
  },
  apicultura: {
    nombre: "🐝 APICULTURA (Colmenas de Precisión)",
    umbralAlerta: 1200,
    umbralCritico: 2200,
    unidad: "RAW MQ-4",
    descripcion: "Alerta por estrés en cámara de cría o gases de fermentación de miel."
  }
};

export const PanelAlertas = ({ alertas = [], isListening = false, valorActual = 0 }) => {
  const [perfilActivo, setPerfilActivo] = useState("micologia");
  const config = PERFILES_CULTIVO[perfilActivo];

  const esCritico = valorActual >= config.umbralCritico;
  const esAlerta = valorActual >= config.umbralAlerta && !esCritico;

  return (
    <div className="bg-[#1A1C20] border border-[#5D4037] p-5 rounded-lg font-mono text-white shadow-2xl">
      {/* Encabezado y Selector de Perfil */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 border-b border-[#5D4037] pb-3">
        <div>
          <h3 className="text-[#FFAB00] text-xl font-black tracking-wider flex items-center gap-2">
            ⚠️ [PANEL_DE_ALERTAS_AGROTECH]
          </h3>
          <p className="text-xs text-gray-400 mt-1">{config.descripcion}</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Selector de Perfil */}
          <select 
            value={perfilActivo} 
            onChange={(e) => setPerfilActivo(e.target.value)}
            className="bg-[#111215] border border-[#FFAB00]/50 text-[#FFAB00] text-xs px-2.5 py-1.5 rounded focus:outline-none focus:border-[#00E5FF]"
          >
            <option value="micologia">Perfil: Micología</option>
            <option value="apicultura">Perfil: Apicultura</option>
          </select>

          {/* Indicador WSS */}
          <div className="flex items-center gap-2 bg-black/40 px-2.5 py-1.5 rounded border border-gray-800">
            <span className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]' : 'bg-red-500'}`}></span>
            <span className="text-[11px] text-gray-300">
              {isListening ? 'SEPOLIA WSS: ONLINE' : 'CACHE / SIM'}
            </span>
          </div>
        </div>
      </div>

      {/* Tarjeta de Estado en Vivo (GPIO12) */}
      <div className={`p-4 mb-6 border-2 rounded-md transition-all duration-300 ${
        esCritico
          ? 'border-red-500 bg-red-950/40 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
          : esAlerta
          ? 'border-[#FFAB00] bg-amber-950/30 shadow-[0_0_15px_rgba(255,171,0,0.3)]'
          : 'border-[#388E3C] bg-[#388E3C]/10'
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">Canal Sensor GPIO12 (MQ-4 / Analógico)</span>
            <p className="text-lg font-bold mt-1">
              ESTADO OPERATIVO:
              <span className={`ml-2 ${
                esCritico 
                  ? 'text-red-500 animate-pulse font-black' 
                  : esAlerta 
                  ? 'text-[#FFAB00] font-black' 
                  : 'text-[#388E3C]'
              }`}>
                {esCritico ? 'EXCURSIÓN CRÍTICA FUERA DE RANGO' : esAlerta ? 'ADVERTENCIA PREVENTIVA' : 'RANGO ÓPTIMO'}
              </span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Lectura Actual</span>
            <p className="text-2xl font-black text-white">{valorActual} <span className="text-xs font-normal text-gray-400">{config.unidad}</span></p>
          </div>
        </div>

        {/* Barra de Umbral Visual */}
        <div className="mt-3 bg-black/60 h-2.5 rounded-full overflow-hidden border border-gray-800">
          <div 
            className={`h-full transition-all duration-300 ${esCritico ? 'bg-red-500' : esAlerta ? 'bg-[#FFAB00]' : 'bg-[#388E3C]'}`}
            style={{ width: `${Math.min(100, (valorActual / (config.umbralCritico * 1.2)) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0 (Base)</span>
          <span>Umbral Advertencia: {config.umbralAlerta}</span>
          <span>Umbral Crítico: {config.umbralCritico}</span>
        </div>
      </div>

      {/* Historial Criptográfico Web3 */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-[#00E5FF] text-sm font-bold flex items-center gap-2">
            ▶ REGISTRO_INMUTABLE_BLOCKCHAIN (INDEXEDDB CACHE ACTIVO)
          </h4>
          <span className="text-[11px] text-gray-400">{alertas.length} registros guardados</span>
        </div>

        {alertas.length === 0 ? (
          <p className="text-gray-500 text-xs italic bg-black/40 p-4 rounded border border-gray-800 text-center">
            No hay alertas ancladas aún en la caché local ni en la blockchain...
          </p>
        ) : (
          <ul className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {alertas.map((alerta, idx) => (
              <li key={alerta.hash || idx} className="bg-black/50 border border-[#00E5FF]/20 p-3 rounded flex flex-col gap-1 text-xs hover:border-[#00E5FF] transition-all">
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold text-gray-300">
                    Tx: {alerta.urlExplorador ? (
                      <a href={alerta.urlExplorador} target="_blank" rel="noreferrer" className="text-[#00E5FF] hover:underline font-bold">
                        {alerta.txHash.substring(0, 16)}...
                      </a>
                    ) : (
                      <span className="text-gray-400">{String(alerta.txHash).substring(0, 16)}</span>
                    )}
                  </span>
                  <span className="text-[#388E3C] text-[11px]">
                    {new Date(alerta.timestamp).toLocaleTimeString()} ({alerta.modo || 'sepolia'})
                  </span>
                </div>
                <p className="text-[#FFAB00] font-mono break-all text-[11px]">
                  <span className="text-gray-400 font-normal">RootMerkle:</span> {alerta.hash}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
