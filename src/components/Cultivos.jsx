import React, { useState, useEffect } from "react"; // Importa useEffect para llamadas API
import PropTypes from "prop-types";
import axios from "axios"; // Importa axios para hacer solicitudes HTTP al backend

// Importa los subcomponentes extraídos para mejor organización y legibilidad del código
import CultivoSummaryCard from "./cultivos/CultivoSummaryCard";
import CultivoDetailView from "./cultivos/CultivoDetailView";
import CultivoForm from "./cultivos/CultivoForm";
import CultivoList from "./cultivos/CultivoList";

// La constante 'cultivosIniciales' está comentada ahora ya que los datos se obtendrán del backend.
// const cultivosIniciales = [...];

/**
 * @file Cultivos.jsx
 * @description Componente principal para gestionar y mostrar información de cultivos.
 *              Actúa como un orquestador, gestionando el estado de los cultivos y
 *              renderizando vistas condicionales (resumen, detalle, lista/formulario)
 *              basadas en props y estado interno.
 *              Ahora se integra con una API backend para obtener y añadir datos de cultivos.
 *
 * @param {object} props - Las props del componente.
 * @param {boolean} [props.modoResumen=false] - Si es true, renderiza una vista resumida para usar en el Dashboard.
 * @param {function} [props.onSeleccionar] - Función de callback para seleccionar un cultivo en modo resumen.
 * @param {function} [props.setCurrentPage] - Función de callback para navegar a otras páginas.
 * @returns {JSX.Element} La interfaz de gestión de Cultivos.
 */
export default function Cultivos({ modoResumen = false, onSeleccionar, setCurrentPage }) {
  // Estado para controlar la visualización de una vista detallada del cultivo. Null significa sin vista detallada.
  const [detalle, setDetalle] = useState(null);
  // Estado para almacenar la lista de cultivos. Inicializado como un array vacío, los datos se obtendrán del backend.
  const [cultivos, setCultivos] = useState([]); 

  // Estado para gestionar los datos de un nuevo cultivo que se añade mediante el formulario.
  const [nuevoCultivo, setNuevoCultivo] = useState({
    nombre: "",
    siembra: "",
    estado: "Saludable",
    humedad: "",
    humedad4h: "",
    temperatura4h: "",
    color: "bg-primary", // Color por defecto para nuevos cultivos, usando el primario del tema
    imagen: "",
    fenologico: "",
    ia: [],
  });

  /**
   * Hook useEffect para obtener la lista de cultivos del backend cuando el componente se monta.
   * Esto asegura que la UI se llene con datos persistentes.
   */
  useEffect(() => {
    const fetchCultivos = async () => {
      try {
        // Hace una solicitud GET a la API del backend para obtener todos los cultivos.
        const response = await axios.get('http://localhost:3001/api/cultivos');
        setCultivos(response.data);
      } catch (error) {
        console.error("Error al obtener cultivos:", error);
        // TODO: Implementar visualización de errores amigables (ej. un mensaje de alerta en pantalla).
      }
    };
    fetchCultivos(); // Llama a la función de obtención
  }, []); // Array de dependencias vacío asegura que este efecto se ejecute solo una vez al montar.

  /**
   * Manejador de eventos para añadir un nuevo cultivo.
   * Previene el envío por defecto del formulario, envía datos al backend y actualiza la UI.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleAgregarCultivo = async (e) => { // Hace la función asíncrona
    e.preventDefault(); // Previene el envío por defecto del formulario del navegador
    // Validación básica: asegura que se proporcionen el nombre y la fecha de siembra.
    if (!nuevoCultivo.nombre || !nuevoCultivo.siembra) {
      alert("Por favor, ingresa el nombre y la fecha de siembra del cultivo.");
      return;
    }

    try {
      // Envía los datos del nuevo cultivo al backend usando una solicitud POST.
      const response = await axios.post('http://localhost:3001/api/cultivos', nuevoCultivo);
      console.log("Cultivo añadido exitosamente:", response.data);
      
      // Después de la adición exitosa, vuelve a obtener toda la lista de cultivos del backend
      // para asegurar que la UI esté sincronizada con los últimos datos persistentes.
      const updatedCultivosResponse = await axios.get('http://localhost:3001/api/cultivos');
      setCultivos(updatedCultivosResponse.data);

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
      // Opcionalmente oculta el formulario después de añadir
      document.getElementById("form-nuevo-cultivo").classList.add("hidden");

    } catch (error) {
      console.error("Error al añadir cultivo:", error);
      alert("Error al añadir el cultivo. Por favor, intenta de nuevo.");
    }
  };

  // --- Renderizado condicional basado en el modo de vista ---

  // Renderiza una lista resumida de cultivos, típicamente para mostrar en el Dashboard.
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

  // Renderiza la vista detallada de un cultivo seleccionado.
  if (detalle) {
    // Encuentra el objeto de cultivo específico del array 'cultivos' basado en el estado 'detalle'.
    const cultivo = cultivos.find((c) => c.nombre === detalle);
    return (
      <CultivoDetailView 
        cultivo={cultivo} 
        setDetalle={setDetalle} 
        setCurrentPage={setCurrentPage} 
      />
    );
  }

  // Vista por defecto: Renderiza la lista principal de todos los cultivos y el formulario para añadir nuevos.
  return (
    <div className="container mx-auto p-4">
      {/* Sección de encabezado para la página principal de Cultivos, con título y botón "Añadir Cultivo". */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-accent font-heading">MIS CULTIVOS</h2>
        {/* Botón para alternar la visibilidad del formulario de añadir cultivo. */}
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

      {/* Texto descriptivo para la lista de cultivos. */}
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

// PropTypes para verificación de tipos y documentación de las props del componente.
Cultivos.propTypes = {
  modoResumen: PropTypes.bool, // Booleano opcional para activar el modo resumen.
  onSeleccionar: PropTypes.func, // Función opcional para seleccionar un cultivo en modo resumen.
  setCurrentPage: PropTypes.func, // Función opcional para navegar entre páginas.
};