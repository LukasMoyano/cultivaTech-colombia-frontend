import axios from "axios";

// Crea una instancia de Axios.
// La URL base se toma de las variables de entorno de Vite (VITE_BACKEND_URL).
// Si no está definida (como en el desarrollo local), usa 'http://localhost:3001' como fallback.
const apiClient = axios.create({
  baseURL: "https://cultivatech-backend.onrender.com",
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