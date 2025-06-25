import React, { useState } from "react";

// Ahora incluye el cultivo de Maíz y permite agregar más cultivos
const cultivosIniciales = [
  {
    nombre: "Tomates - Lote Sol Naciente",
    siembra: "15/01/2024",
    estado: "Saludable",
    humedad: "65%",
    humedad4h: "62%",
    temperatura4h: "22°C",
    color: "bg-green-500",
    imagen: "https://placehold.co/600x400/A77B55/F2E8CF?text=🍅",
    fenologico: "Fructificación",
    ia: [
      "✅ Nivel de nutrientes óptimo.",
      "⚠️ Ligera deficiencia de agua detectada hace 3 horas.",
    ],
  },
  {
    nombre: "Fresas - El Edén",
    siembra: "01/03/2024",
    estado: "Atención",
    humedad: "Temperatura: 28°C (Alta)",
    humedad4h: "58%",
    temperatura4h: "28°C",
    color: "bg-yellow-500",
    imagen: "https://placehold.co/600x400/A77B55/F2E8CF?text=🍓",
    fenologico: "Floración",
    ia: [
      "⚠️ Temperatura alta detectada.",
      "✅ Sin plagas detectadas.",
    ],
  },
  {
    nombre: "Maíz - La Esperanza",
    siembra: "10/02/2024",
    estado: "Saludable",
    humedad: "70%",
    humedad4h: "68%",
    temperatura4h: "21°C",
    color: "bg-green-500",
    imagen: "https://placehold.co/600x400/A77B55/F2E8CF?text=🌽",
    fenologico: "Crecimiento vegetativo",
    ia: [
      "✅ Crecimiento normal.",
      "✅ Sin alertas recientes.",
    ],
  },
];

export default function Cultivos({ modoResumen = false, onSeleccionar }) {
  const [detalle, setDetalle] = useState(null);
  const [cultivos, setCultivos] = useState(cultivosIniciales);

  // Para agregar nuevos cultivos
  const [nuevoCultivo, setNuevoCultivo] = useState({
    nombre: "",
    siembra: "",
    estado: "Saludable",
    humedad: "",
    humedad4h: "",
    temperatura4h: "",
    color: "bg-green-500",
    imagen: "",
    fenologico: "",
    ia: [],
  });

  const handleAgregarCultivo = (e) => {
    e.preventDefault();
    if (!nuevoCultivo.nombre || !nuevoCultivo.siembra) return;
    setCultivos([
      ...cultivos,
      {
        ...nuevoCultivo,
        imagen:
          nuevoCultivo.imagen ||
          "https://placehold.co/600x400/A77B55/F2E8CF?text=🌱",
        ia: nuevoCultivo.ia.length ? nuevoCultivo.ia : ["Sin datos IA."],
      },
    ]);
    setNuevoCultivo({
      nombre: "",
      siembra: "",
      estado: "Saludable",
      humedad: "",
      humedad4h: "",
      temperatura4h: "",
      color: "bg-green-500",
      imagen: "",
      fenologico: "",
      ia: [],
    });
  };

  // Vista RESUMIDA para el Dashboard
  if (modoResumen) {
    return (
      <div className="space-y-4">
        {cultivos.map((cultivo) => (
          <div
            key={cultivo.nombre}
            className="border rounded-lg p-3 flex flex-col bg-white shadow-sm"
          >
            <div className="flex items-center mb-2">
              <img
                src={cultivo.imagen}
                alt={cultivo.nombre}
                className="w-10 h-10 rounded mr-3"
              />
              <div>
                <span className="font-semibold cultiva-text-main">
                  {cultivo.nombre}
                </span>
                <span
                  className={`ml-2 inline-block w-3 h-3 rounded-full ${cultivo.color}`}
                  title={cultivo.estado}
                ></span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm mb-1">
              <span>
                <span className="font-semibold">Humedad suelo (4h):</span>{" "}
                {cultivo.humedad4h || "N/D"}
              </span>
              <span>
                <span className="font-semibold">Temp. (4h):</span>{" "}
                {cultivo.temperatura4h || "N/D"}
              </span>
            </div>
            <div className="text-xs text-gray-600 mb-1">
              <span className="font-semibold">IA:</span>{" "}
              {cultivo.ia && cultivo.ia.length > 0
                ? cultivo.ia[0]
                : "Sin datos IA"}
            </div>
            {onSeleccionar && (
              <button
                className="btn btn-outline btn-xs mt-1"
                onClick={() => onSeleccionar(cultivo.nombre)}
              >
                Ver Detalle
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Vista COMPLETA para la página de cultivos
  if (detalle) {
    const cultivo = cultivos.find((c) => c.nombre === detalle);
    return (
      <div className="container mx-auto p-4">
        <button className="btn btn-outline mb-4" onClick={() => setDetalle(null)}>
          ← Volver a Mis Cultivos
        </button>
        <h3 className="text-2xl font-bold cultiva-text-main mb-2">{cultivo.nombre}</h3>
        <p className="cultiva-text-secondary mb-1">Fecha de Siembra: {cultivo.siembra}</p>
        <p className="cultiva-text-secondary mb-4">
          Estado Fenológico: <span className="font-semibold">{cultivo.fenologico}</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">💧 Humedad del Suelo (Últimas 24h)</div>
            <div className="chart-container h-64 md:h-80 flex items-center justify-center">
              (Gráfico próximamente)
            </div>
          </div>
          <div className="card">
            <div className="card-header">🌡️ Temperatura Ambiente (Últimas 24h)</div>
            <div className="chart-container h-64 md:h-80 flex items-center justify-center">
              (Gráfico próximamente)
            </div>
          </div>
          <div className="card md:col-span-2">
            <div className="card-header">💡 Últimas Detecciones IA</div>
            <ul className="space-y-2">
              {cultivo.ia.map((comentario, idx) => (
                <li key={idx}>
                  <span className="icon-placeholder">
                    {comentario.startsWith("✅") ? "✅" : comentario.startsWith("⚠️") ? "⚠️" : "💡"}
                  </span>{" "}
                  {comentario}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 space-x-3">
          <button className="btn btn-secondary">Ver Historial Completo</button>
          <button className="btn btn-primary">Programar Tarea Robot</button>
        </div>
      </div>
    );
  }

  // Vista de listado y formulario para agregar cultivos
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold cultiva-text-main">Mis Cultivos</h2>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => document.getElementById("form-nuevo-cultivo").classList.toggle("hidden")}
        >
          <span className="icon-placeholder text-xl mr-1 cultiva-text-white">➕</span> Añadir Cultivo
        </button>
      </div>
      <form
        id="form-nuevo-cultivo"
        className="hidden mb-6 bg-gray-50 p-4 rounded-lg border"
        onSubmit={handleAgregarCultivo}
      >
        <div className="flex flex-wrap gap-4 mb-2">
          <input
            type="text"
            className="border rounded px-2 py-1 w-48"
            placeholder="Nombre del cultivo"
            value={nuevoCultivo.nombre}
            onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, nombre: e.target.value })}
            required
          />
          <input
            type="date"
            className="border rounded px-2 py-1 w-40"
            placeholder="Fecha de siembra"
            value={nuevoCultivo.siembra}
            onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, siembra: e.target.value })}
            required
          />
          <input
            type="text"
            className="border rounded px-2 py-1 w-32"
            placeholder="Humedad 4h (%)"
            value={nuevoCultivo.humedad4h}
            onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, humedad4h: e.target.value })}
          />
          <input
            type="text"
            className="border rounded px-2 py-1 w-32"
            placeholder="Temp. 4h (°C)"
            value={nuevoCultivo.temperatura4h}
            onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, temperatura4h: e.target.value })}
          />
        </div>
        <input
          type="text"
          className="border rounded px-2 py-1 w-full mb-2"
          placeholder="Comentario IA (opcional)"
          value={nuevoCultivo.ia[0] || ""}
          onChange={(e) => setNuevoCultivo({ ...nuevoCultivo, ia: [e.target.value] })}
        />
        <button className="btn btn-primary" type="submit">
          Guardar Cultivo
        </button>
      </form>
      <p className="mb-6 cultiva-text-secondary">
        Gestiona y monitorea todos tus cultivos registrados. Selecciona un cultivo para ver su estado detallado, historial de sensores y alertas específicas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cultivos.map((cultivo) => (
          <div
            key={cultivo.nombre}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setDetalle(cultivo.nombre)}
          >
            <img src={cultivo.imagen} alt={cultivo.nombre} className="rounded-t-lg w-full h-40 object-cover mb-3" />
            <h3 className="text-xl font-semibold cultiva-text-main mb-1">{cultivo.nombre}</h3>
            <p className="cultiva-text-secondary text-sm mb-2">Siembra: {cultivo.siembra}</p>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${cultivo.color} mr-2`}></span>
              <span className="cultiva-text-secondary text-sm">Estado: {cultivo.estado}</span>
            </div>
            <p className="cultiva-text-secondary text-sm mt-1">
              Humedad suelo (4h): {cultivo.humedad4h || "N/D"}
            </p>
            <p className="cultiva-text-secondary text-sm">
              Temp. (4h): {cultivo.temperatura4h || "N/D"}
            </p>
            <p className="cultiva-text-secondary text-xs mt-1">
              IA: {cultivo.ia && cultivo.ia.length > 0 ? cultivo.ia[0] : "Sin datos IA"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}