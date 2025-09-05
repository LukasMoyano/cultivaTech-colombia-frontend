// src/api.js
import axios from 'axios';

// Crear una instancia de axios con la URL base del backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

// Interceptor para añadir el token de autenticación a todas las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    // Recupera el token de localStorage (o de donde lo estés guardando)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// El interceptor original para prefijos de API ya no es necesario si todas
// las llamadas usan la URL completa con /api, como '/api/cultivos'.
// Si aún lo necesitas para /login o /register, puedes mantenerlo, pero
// es mejor estandarizar las llamadas para que siempre incluyan /api.

export default apiClient;
