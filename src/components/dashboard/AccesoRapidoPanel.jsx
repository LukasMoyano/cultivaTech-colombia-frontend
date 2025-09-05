import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiClient from "../../api"; // Asegúrate que la ruta al apiClient sea correcta

const AccesoRapidoPanel = ({ setCurrentPage }) => {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCultivos = async () => {
    try {
      // Verificar si hay un token antes de hacer la solicitud
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No se ha encontrado la sesión. Por favor, inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      // El apiClient ya debe estar configurado para enviar el token de autenticación
      const response = await apiClient.get("/api/cultivos");
      setCultivos(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar los cultivos:", err);
      
      // Manejo específico de errores según el código de estado
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            // Opcionalmente, puedes limpiar el token expirado
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            break;
          case 403:
            setError("No tienes permisos para acceder a los cultivos. Por favor, verifica tu cuenta.");
            break;
          case 500:
            setError("Error del servidor. Por favor, inténtalo más tarde.");
            break;
          default:
            setError("No se pudieron cargar los cultivos. Por favor, inténtalo más tarde.");
        }
      } else if (err.request) {
        setError("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      } else {
        setError("Ocurrió un error inesperado. Por favor, inténtalo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCultivos();
  }, []);

  // Función para reintentar la carga de cultivos
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchCultivos();
  };

  return (
    <section aria-labelledby="cultivos-titulo" className="bg-background-card border border-border shadow-md p-6 transition-all duration-300 min-h-[200px]">
      <h2 id="cultivos-titulo" className="flex items-center mb-4 font-heading text-text-accent text-xl">
        <span className="mr-2">🌾</span> ACCESO RÁPIDO A CULTIVOS
      </h2>
      
      {loading && <p className="text-text-main">Cargando tus cultivos...</p>}
      
      {error && (
        <div className="text-center p-4">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            onClick={handleRetry}
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-2">
          {cultivos.length > 0 ? (
            cultivos.map((cultivo) => (
              <button
                key={cultivo.id}
                className="w-full text-left p-3 hover:bg-secondary/10 text-text-main border border-transparent hover:border-secondary/30 transition-all"
                onClick={() => setCurrentPage("cultivos")}
              >
                {cultivo.nombre}
              </button>
            ))
          ) : (
            <div className="text-center p-4">
              <p className="text-text-main mb-4">No tienes cultivos registrados todavía.</p>
              <button
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                onClick={() => setCurrentPage("cultivos")}
              >
                Ir a Mis Cultivos para empezar
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

AccesoRapidoPanel.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default AccesoRapidoPanel;
