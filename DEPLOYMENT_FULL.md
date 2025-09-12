# Despliegue Completo de CultivaTech

## Descripción
Este documento proporciona instrucciones detalladas para desplegar tanto el frontend como el backend de la aplicación CultivaTech en producción, asegurando que ambos servicios funcionen correctamente juntos sin problemas de CORS u otros conflictos.

## Arquitectura del Sistema
- **Frontend**: Aplicación React/Vite desplegada en Netlify
- **Backend**: API REST en Node.js/Express desplegada en Render
- **Comunicación**: El frontend se comunica con el backend a través de llamadas API

## Despliegue del Backend (Render)

### 1. Preparación del Código
1. Asegúrate de que el código del backend esté en un repositorio GitHub
2. Verifica que el archivo `server.js` tenga la configuración correcta de CORS
3. Confirma que el `package.json` tenga el script de inicio correcto

### 2. Configuración en Render
1. Accede a [Render Dashboard](https://dashboard.render.com/)
2. Crea una nueva Web Service
3. Conecta tu repositorio de GitHub
4. Configura las siguientes variables de entorno:
   ```
   JWT_SECRET=tu_clave_secreta_super_segura_debe_ser_larga_y_aleatoria
   OPENWEATHER_API_KEY=tu_api_key_de_openweathermap
   PORT=3001
   ```
5. Configura el servicio con:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Despliega el servicio

### 3. Verificación del Backend
Una vez desplegado, verifica que:
1. El servicio esté corriendo en una URL como `https://tu-app.render.app`
2. Los endpoints de la API sean accesibles
3. No haya errores en los logs de Render

## Despliegue del Frontend (Netlify)

### 1. Preparación del Código
1. Asegúrate de tener el archivo `.env.production` en el directorio raíz del frontend:
   ```
   VITE_BACKEND_URL=https://tu-app-backend.render.app
   ```
2. Verifica que el archivo `src/api.js` use correctamente las variables de entorno

### 2. Configuración en Netlify
1. Accede a [Netlify Dashboard](https://app.netlify.com/)
2. Crea un nuevo sitio desde Git
3. Conecta tu repositorio de GitHub
4. Configura el despliegue con:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Agrega las variables de entorno en la configuración del sitio:
   - `VITE_BACKEND_URL`: `https://tu-app-backend.render.app`

### 3. Verificación del Frontend
Una vez desplegado, verifica que:
1. El sitio esté accesible en una URL como `https://tu-sitio.netlify.app`
2. No haya errores de CORS en la consola del navegador
3. Las llamadas a la API del backend funcionen correctamente

## Configuración de CORS

El backend está configurado para aceptar solicitudes de los siguientes orígenes:
- `http://localhost:5173` (Desarrollo local de Vite)
- `http://localhost:3000` (Desarrollo local de React)
- `https://tu-sitio.netlify.app` (Producción en Netlify)

Si necesitas agregar más orígenes, puedes hacerlo mediante la variable de entorno `ALLOWED_ORIGINS` en Render, separando los orígenes con comas.

## Pruebas de Integración

### Prueba de Registro e Inicio de Sesión
1. Accede al frontend desplegado
2. Registra un nuevo usuario
3. Inicia sesión con las credenciales recién creadas
4. Verifica que se redirija correctamente al dashboard

### Prueba de Datos Meteorológicos
1. Una vez iniciada la sesión, verifica que se muestre la información del clima
2. Confirma que los datos se obtengan correctamente del backend

### Prueba de Gestión de Cultivos
1. Verifica que puedas crear nuevos cultivos
2. Confirma que se guarden correctamente en el backend
3. Verifica que se muestren en la lista de cultivos

## Resolución de Problemas

### Errores de CORS
Si encuentras errores de CORS:
1. Verifica que la variable `VITE_BACKEND_URL` en el frontend apunte a la URL correcta del backend
2. Confirma que la variable `ALLOWED_ORIGINS` en el backend incluya la URL del frontend
3. Revisa los logs del backend para ver si hay errores en la configuración de CORS

### Errores de Conexión
Si el frontend no puede conectarse al backend:
1. Verifica que la URL del backend sea accesible desde un navegador
2. Confirma que los puertos estén correctamente configurados
3. Revisa que el backend esté corriendo sin errores

### Errores de Autenticación
Si hay problemas con el registro o inicio de sesión:
1. Verifica que la variable `JWT_SECRET` esté correctamente configurada en el backend
2. Confirma que las contraseñas se estén almacenando correctamente
3. Revisa los logs del backend para ver si hay errores en la autenticación

## Mantenimiento

### Actualizaciones
Para actualizar la aplicación:
1. Realiza los cambios en el código
2. Confirma y empuja los cambios a GitHub
3. Render y Netlify desplegarán automáticamente las nuevas versiones

### Monitoreo
- Monitorea los logs de Render para el backend
- Usa las herramientas de análisis de Netlify para el frontend
- Configura alertas para tiempos de inactividad si es necesario

## Seguridad

### Mejores Prácticas
- Nunca expongas claves secretas o API keys en el código
- Usa siempre variables de entorno para datos sensibles
- Mantén las dependencias actualizadas
- Usa HTTPS en producción
- Implementa límites de tasa (rate limiting) si es necesario

## Contacto y Soporte
Para cualquier problema con el despliegue, contacta al equipo de desarrollo.