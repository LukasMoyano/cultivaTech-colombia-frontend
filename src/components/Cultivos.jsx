import React, { useState, useEffect } from "react"; // Import useEffect for API calls
import PropTypes from "prop-types";
import axios from "axios"; // Import axios for making HTTP requests to the backend

// Import extracted sub-components for better code organization and readability
import CultivoSummaryCard from "./cultivos/CultivoSummaryCard";
import CultivoDetailView from "./cultivos/CultivoDetailView";
import CultivoForm from "./cultivos/CultivoForm";
import CultivoList from "./cultivos/CultivoList";

// The 'cultivosIniciales' constant is now commented out as data will be fetched from the backend.
// const cultivosIniciales = [...];

/**
 * @file Cultivos.jsx
 * @description Main component for managing and displaying crop information.
 *              It acts as an orchestrator, managing the state of crops and
 *              conditionally rendering different views (summary, detail, list/form)
 *              based on props and internal state.
 *              It now integrates with a backend API for fetching and adding crop data.
 *
 * @param {object} props - The component props.
 * @param {boolean} [props.modoResumen=false] - If true, renders a summarized view for use in the Dashboard.
 * @param {function} [props.onSeleccionar] - Callback function for selecting a crop in summary mode.
 * @param {function} [props.setCurrentPage] - Callback function to navigate to other pages.
 * @returns {JSX.Element} The Cultivos management interface.
 */
export default function Cultivos({ modoResumen = false, onSeleccionar, setCurrentPage }) {
  // State to control the display of a detailed crop view. Null means no detail view.
  const [detalle, setDetalle] = useState(null);
  // State to store the list of crops. Initialized as an empty array, data will be fetched from backend.
  const [cultivos, setCultivos] = useState([]); 

  // State to manage the data of a new crop being added via the form.
  const [nuevoCultivo, setNuevoCultivo] = useState({
    nombre: "",
    siembra: "",
    estado: "Saludable",
    humedad: "",
    humedad4h: "",
    temperatura4h: "",
    color: "bg-primary", // Default color for new crops, using theme primary
    imagen: "",
    fenologico: "",
    ia: [],
  });

  /**
   * useEffect hook to fetch the list of crops from the backend when the component mounts.
   * This ensures the UI is populated with persistent data.
   */
  useEffect(() => {
    const fetchCultivos = async () => {
      try {
        // Make a GET request to the backend API to retrieve all crops.
        const response = await axios.get('http://localhost:3001/api/cultivos');
        setCultivos(response.data);
      } catch (error) {
        console.error("Error fetching cultivos:", error);
        // TODO: Implement user-friendly error display (e.g., an alert message on screen).
      }
    };
    fetchCultivos(); // Call the fetch function
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  /**
   * Event handler for adding a new crop.
   * It prevents default form submission, sends data to the backend, and updates the UI.
   * @param {Event} e - The form submission event.
   */
  const handleAgregarCultivo = async (e) => { // Make function async
    e.preventDefault(); // Prevent default browser form submission
    // Basic validation: ensure name and planting date are provided.
    if (!nuevoCultivo.nombre || !nuevoCultivo.siembra) {
      alert("Por favor, ingresa el nombre y la fecha de siembra del cultivo.");
      return;
    }

    try {
      // Send the new crop data to the backend using a POST request.
      const response = await axios.post('http://localhost:3001/api/cultivos', nuevoCultivo);
      console.log("Cultivo added successfully:", response.data);
      
      // After successful addition, re-fetch the entire list of crops from the backend
      // to ensure the UI is synchronized with the latest persistent data.
      const updatedCultivosResponse = await axios.get('http://localhost:3001/api/cultivos');
      setCultivos(updatedCultivosResponse.data);

      // Reset form
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
      // Optionally hide the form after adding
      document.getElementById("form-nuevo-cultivo").classList.add("hidden");

    } catch (error) {
      console.error("Error adding cultivo:", error);
      alert("Error al añadir el cultivo. Por favor, intenta de nuevo.");
    }
  };

  // --- Conditional Rendering based on view mode ---

  // Renders a summarized list of crops, typically for display within the Dashboard.
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

  // Renders the detailed view of a single selected crop.
  if (detalle) {
    // Find the specific crop object from the 'cultivos' array based on the 'detalle' state.
    const cultivo = cultivos.find((c) => c.nombre === detalle);
    return (
      <CultivoDetailView 
        cultivo={cultivo} 
        setDetalle={setDetalle} 
        setCurrentPage={setCurrentPage} 
      />
    );
  }

  // Default view: Renders the main list of all crops and the form to add new ones.
  return (
    <div className="container mx-auto p-4">
      {/* Header section for the main Cultivos page, with title and "Add Crop" button. */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-accent font-heading">MIS CULTIVOS</h2>
        {/* Button to toggle the visibility of the add crop form. */}
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

      {/* Descriptive text for the crop list. */}
      <p className="mb-6 text-text-main/80">
        Gestiona y monitorea todos tus cultivos registrados. Selecciona un cultivo para ver su estado detallado, historial de sensores y alertas específicas.
      </p>
      
      <CultivoList 
        cultivos={cultivos} 
        setDetalle={setDetalle} 
      />
    </div>
  );
}

// PropTypes for type checking and documentation of component props.
Cultivos.propTypes = {
  modoResumen: PropTypes.bool, // Optional boolean to activate summary mode.
  onSeleccionar: PropTypes.func, // Optional function for selecting a crop in summary mode.
  setCurrentPage: PropTypes.func, // Optional function for navigating between pages.
};