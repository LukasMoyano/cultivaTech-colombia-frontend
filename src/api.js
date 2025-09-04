// src/api.js
import axios from 'axios';

// Crear una instancia de axios con la URL base del backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

// Interceptar las solicitudes para agregar el prefijo /api a los endpoints de autenticación
api.interceptors.request.use((config) => {
  // Si la URL no contiene /api, la agregamos
  if (!config.url.startsWith('/api/')) {
    if (config.url === '/register' || config.url === '/login') {
      config.url = '/api' + config.url;
    }
  }
  return config;
});

export default api;