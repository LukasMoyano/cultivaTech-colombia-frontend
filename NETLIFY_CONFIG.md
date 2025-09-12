# Configuración de Netlify para CultivaTech

## Problema
El frontend en producción está intentando acceder a `http://localhost:3001` en lugar de usar la URL del backend en producción `https://cultivatech-backend.onrender.com`.

## Causa
La variable de entorno `VITE_BACKEND_URL` no se está cargando correctamente en el entorno de producción de Netlify.

## Solución

### 1. Archivo .env.production
Asegúrate de tener el archivo `.env.production` en la raíz del proyecto con el siguiente contenido:

```
VITE_BACKEND_URL=https://cultivatech-backend.onrender.com
```

### 2. Configuración de Git
El archivo `.gitignore` ha sido actualizado para permitir que `.env.production` se incluya en el repositorio:

```
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.*.local
```

Esto permite que `.env.production` se incluya en el repositorio mientras excluye otros archivos .env sensibles.

### 3. Configuración de Netlify (Dashboard)
Aunque el archivo .env.production debería ser suficiente, también puedes configurar las variables de entorno directamente en el dashboard de Netlify:

1. Accede a tu sitio en Netlify
2. Ve a "Site settings" > "Build & deploy" > "Environment"
3. Agrega la siguiente variable de entorno:
   - Key: `VITE_BACKEND_URL`
   - Value: `https://cultivatech-backend.onrender.com`

### 4. Mejoras en el Código
El archivo `src/api.js` ha sido actualizado para tener un fallback más robusto:

```javascript
// Determina si estamos en un entorno de producción
const isProduction = import.meta.env.PROD || window.location.hostname.includes('netlify.app');

// Crea una instancia de Axios.
// La URL base se toma de las variables de entorno de Vite (VITE_BACKEND_URL).
// Si no está definida, usa 'https://cultivatech-backend.onrender.com' en producción o 'http://localhost:3001' en desarrollo.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || (isProduction ? "https://cultivatech-backend.onrender.com" : "http://localhost:3001"),
});
```

### 5. Verificación
Después de implementar estos cambios:

1. Confirma que el archivo `.env.production` esté en tu repositorio
2. Vuelve a desplegar el sitio en Netlify
3. Verifica en la consola del navegador que las llamadas a la API vayan a `https://cultivatech-backend.onrender.com` en lugar de `http://localhost:3001`

## Solución de Problemas

Si el problema persiste:

1. Verifica que el archivo `.env.production` esté incluido en tu último commit
2. Confirma que la variable `VITE_BACKEND_URL` esté configurada en el dashboard de Netlify
3. Revisa los logs de construcción de Netlify para ver si hay errores
4. Asegúrate de que no haya otros archivos `.env` que puedan estar sobrescribiendo la configuración