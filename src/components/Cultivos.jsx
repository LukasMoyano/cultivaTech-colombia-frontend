import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiClient from "../api"; // Cambiado de axios a apiClient

// Importa los subcomponentes extraídos
import CultivoSummaryCard from "./cultivos/CultivoSummaryCard";
import CultivoDetailView from "./cultivos/CultivoDetailView";
import CultivoForm from "./cultivos/CultivoForm";
import CultivoList from "./cultivos/CultivoList";

export default function Cultivos({ modoResumen = false, onSeleccionar, setCurrentPage }) {
  const [detalle, setDetalle] = useState(null);
  const [cultivos, setCultivos] = useState([]);
  const [nuevoCultivo, setNuevoCultivo] = useState({
    nombre: "",
    siembra: "",
    estado: "Saludable",
    humedad: "",
    humedad4h: "",
    temperatura4h: "",
    color: "bg-primary",
    imagen: "",
    fenologico: "",
    ia: [],
  });

  // Función para obtener los cultivos, reutilizable
  const fetchCultivos = async () => {
    try {
      const response = await apiClient.get('/api/cultivos'); // Usa apiClient y ruta relativa
      setCultivos(response.data);
    } catch (error) {
      console.error("Error al obtener cultivos:", error);
    }
  };

  useEffect(() => {
    fetchCultivos();
  }, []);

  const handleAgregarCultivo = async (e) => {
    e.preventDefault();
    if (!nuevoCultivo.nombre || !nuevoCultivo.siembra) {
      alert("Por favor, ingresa el nombre y la fecha de siembra del cultivo.");
      return;
    }

    try {
      // Usa apiClient para la solicitud POST
      const response = await apiClient.post('/api/cultivos', nuevoCultivo);
      console.log("Cultivo añadido exitosamente:", response.data);
      
      // Vuelve a cargar los cultivos para reflejar el nuevo
      fetchCultivos();

      // Reinicia el formulario
      setNuevoCultivo({
        nombre: "",
        siembra: "",
        estado: "Saludable",
        humedad: "",
        humedad4h: "",
        temperatura4h: "",
        color: "bg-primary",
        imagen: "",
        fenologico: "",
        ia: [],
      });
      document.getElementById("form-nuevo-cultivo").classList.add("hidden");

    } catch (error) {
      console.error("Error al añadir cultivo:", error);
      alert("Error al añadir el cultivo. Por favor, intenta de nuevo.");
    }
  };

  // --- Renderizado condicional ---

  if (modoResumen) {
    return (
      <div className="space-y-4">
        {cultivos.map((cultivo) => (
          <CultivoSummaryCard 
            key={cultivo.nombre} 
            cultivo={cultivo} 
            onSeleccionar={onSeleccionar} 
          />
        ))}
      </div>
    );
  }

  if (detalle) {
    const cultivo = cultivos.find((c) => c.nombre === detalle);
    return (
      <CultivoDetailView 
        cultivo={cultivo} 
        setDetalle={setDetalle} 
        setCurrentPage={setCurrentPage} 
      />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-accent font-heading">MIS CULTIVOS</h2>
        <button
          className="bg-primary text-white py-2 px-4 font-heading flex items-center"
          onClick={() => document.getElementById("form-nuevo-cultivo").classList.toggle("hidden")}
        >
          <span className="text-xl mr-1">➕</span> AÑADIR CULTIVO
        </button>
      </div>
      
      <CultivoForm 
        nuevoCultivo={nuevoCultivo} 
        setNuevoCultivo={setNuevoCultivo} 
        handleAgregarCultivo={handleAgregarCultivo} 
      />

      <p className="mb-6 text-text-main cultivo-description">
        Gestiona y monitorea todos tus cultivos registrados. Selecciona un cultivo para ver su estado detallado, historial de sensores y alertas específicas.
      </p>
      
      <CultivoList 
        cultivos={cultivos} 
        setDetalle={setDetalle} 
      />
    </div>
  );
}

Cultivos.propTypes = {
  modoResumen: PropTypes.bool,
  onSeleccionar: PropTypes.func,
  setCurrentPage: PropTypes.func,
};
