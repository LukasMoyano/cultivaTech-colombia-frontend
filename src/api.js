import axios from "axios";

// Determina si estamos en un entorno de producción
const isProduction = import.meta.env.PROD || window.location.hostname.includes('netlify.app');

// Crea una instancia de Axios.
// La URL base se toma de las variables de entorno de Vite (VITE_BACKEND_URL).
// Si no está definida, usa 'https://cultivatech-backend.onrender.com' en producción o 'http://localhost:3001' en desarrollo.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || (isProduction ? "https://cultivatech-backend.onrender.com" : "http://localhost:3001"),
});

// Configura un interceptor de peticiones.
// Esto es una pieza clave: se ejecuta ANTES de que cada petición sea enviada.
apiClient.interceptors.request.use(
  (config) => {
    // Obtiene el token de autenticación guardado en localStorage.
    const token = localStorage.getItem("token");

    // Si el token existe, lo añade a las cabeceras de la petición.
    // El backend usará este token para verificar que el usuario está autenticado.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Devuelve la configuración modificada para que la petición continúe.
    return config;
  },
  (error) => {
    // Si hay un error al configurar la petición, lo rechaza.
    return Promise.reject(error);
  }
);

export default apiClient;