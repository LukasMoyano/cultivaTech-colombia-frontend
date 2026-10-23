import axios from "axios";

// Determina si estamos en un entorno de producción
const isProduction = import.meta.env.PROD || window.location.hostname.includes("netlify.app");

// Crea una instancia de Axios.
// La URL base se toma de las variables de entorno de Vite (VITE_BACKEND_URL).
const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URL ||
    (isProduction ? "https://cultivatech-backend.onrender.com" : "http://localhost:3001"),
});

// Ejecuta este interceptor ANTES de cada petición.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Devuelve el estado real de la cola y del último anclaje.
 * @returns {Promise} - Estado público del oráculo
 */
export const obtenerEstadoBlockchain = async () => {
  const response = await apiClient.get("/api/blockchain/status");
  return response.data;
};

/**
 * Devuelve la última lectura MQ-4 recibida por el backend.
 * @returns {Promise} - { latest }
 */
export const obtenerTelemetriaLatest = async () => {
  const response = await apiClient.get("/api/telemetry/latest");
  return response.data;
};

/**
 * Devuelve el historial reciente de telemetría.
 * @param {number} limit - Número de puntos (1-240)
 * @returns {Promise} - { history, count }
 */
export const obtenerTelemetriaHistorial = async (limit = 40) => {
  const response = await apiClient.get("/api/telemetry/history", { params: { limit } });
  return response.data;
};

/**
 * Devuelve los últimos lotes anclados (raíz, tx y hashes).
 * @returns {Promise} - Eventos locales del oráculo
 */
export const obtenerEventosBlockchain = async () => {
  const response = await apiClient.get("/api/blockchain/eventos");
  return response.data.eventos || [];
};

export default apiClient;
