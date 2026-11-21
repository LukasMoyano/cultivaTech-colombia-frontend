import React, { useState, useTransition } from 'react';

const PERFILES = [
  { id: 'micologia', nombre: 'Micología (Hongos)', limites: { min: 1000, max: 2000 } },
  { id: 'apicultura', nombre: 'Apicultura (Abejas)', limites: { min: 500, max: 1500 } },
  { id: 'horticultura', nombre: 'Horticultura Básica', limites: { min: 800, max: 2500 } }
];

export const SelectorPerfilCultivo = ({ onSelectPerfil }) => {
  const [perfilActivo, setPerfilActivo] = useState(PERFILES[0].id);
  // useTransition permite actualizaciones de estado no bloqueantes 
  // garantizando un renderizado rápido (<300ms) de la UI.
  const [isPending, startTransition] = useTransition();

  const handleChange = (id) => {
    setPerfilActivo(id);
    startTransition(() => {
      const perfilSeleccionado = PERFILES.find(p => p.id === id);
      onSelectPerfil(perfilSeleccionado);
    });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 border border-gray-700">
      <h3 className="text-xl font-semibold text-green-400 mb-3">Perfil Agrícola Activo</h3>
      <div className="flex space-x-2">
        {PERFILES.map((perfil) => (
          <button
            key={perfil.id}
            onClick={() => handleChange(perfil.id)}
            disabled={isPending}
            className={`px-4 py-2 rounded transition-colors duration-200 ease-in-out font-medium
              ${perfilActivo === perfil.id 
                ? 'bg-green-600 text-white border-green-500' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
              ${isPending ? 'opacity-50 cursor-wait' : ''}
            `}
          >
            {perfil.nombre}
          </button>
        ))}
      </div>
      {isPending && <p className="text-sm text-gray-400 mt-2">Cambiando perfil...</p>}
    </div>
  );
};
