import React from 'react';

const perfiles = {
  micologia: {
    nombre: '🍄 Micología (Hongos)',
    tempMin: 18,
    tempMax: 24,
    humMin: 80,
    humMax: 95
  },
  apicultura: {
    nombre: '🐝 Apicultura (Abejas)',
    tempMin: 32,
    tempMax: 35,
    humMin: 50,
    humMax: 60
  }
};

export const SelectorPerfilCultivo = ({ perfilActivo, setPerfilActivo }) => {
  return (
    <div className="bg-[#1A1C20] border border-[#00E5FF] p-4 rounded-md font-mono text-white mb-6 shadow-lg shadow-[#00E5FF]/10">
      <h3 className="text-[#00E5FF] text-lg mb-3">▤ [SELECCIÓN_DE_PERFIL]</h3>
      <div className="flex gap-4">
        {Object.entries(perfiles).map(([key, perfil]) => (
          <button
            key={key}
            onClick={() => setPerfilActivo(key)}
            className={`px-4 py-2 transition-all duration-300 ${
              perfilActivo === key
                ? 'bg-[#00E5FF] text-[#1A1C20] shadow-[0_0_10px_#00E5FF]'
                : 'bg-transparent text-[#00E5FF] hover:bg-[#00E5FF]/20'
            } border border-[#00E5FF]`}
          >
            {perfil.nombre}
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-black/50 border-l-4 border-[#388E3C] text-sm">
        <p><span className="text-[#388E3C]">▶ Rango Óptimo Temp:</span> {perfiles[perfilActivo].tempMin}°C - {perfiles[perfilActivo].tempMax}°C</p>
        <p><span className="text-[#388E3C]">▶ Rango Óptimo Hum:</span> {perfiles[perfilActivo].humMin}% - {perfiles[perfilActivo].humMax}%</p>
      </div>
    </div>
  );
};
