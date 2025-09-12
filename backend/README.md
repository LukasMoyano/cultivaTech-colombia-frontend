# CultivaTech Backend

## Descripción
Este es el backend para la aplicación CultivaTech. Proporciona una API REST para la gestión de usuarios, cultivos y datos meteorológicos.

## Tecnologías
- Node.js
- Express.js
- JSON Web Tokens (JWT) para autenticación
- bcrypt para hashing de contraseñas
- CORS para manejo de políticas de mismo origen
- dotenv para manejo de variables de entorno

## Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3001
JWT_SECRET=tu_clave_secreta_super_segura_debe_ser_larga_y_aleatoria
OPENWEATHER_API_KEY=tu_api_key_de_openweathermap
```

Para producción, se recomienda usar un `.env.production` con valores específicos para el entorno de producción.

### Instalación
```bash
npm install
```

### Ejecución en Desarrollo
```bash
npm start
```

### Ejecución en Producción
En producción, el servidor se ejecutará automáticamente con las variables de entorno proporcionadas por la plataforma de despliegue (como Render).

## Despliegue en Render

1. Crea una nueva aplicación web en Render
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno en el dashboard de Render:
   - `JWT_SECRET`: Una cadena segura y única
   - `OPENWEATHER_API_KEY`: Tu clave de API de OpenWeatherMap
   - `PORT`: 3001 (o el puerto que prefieras)
4. Render automáticamente ejecutará `npm start` para iniciar la aplicación

## API Endpoints

### Autenticación
- `POST /api/register` - Registro de nuevo usuario
- `POST /api/login` - Inicio de sesión de usuario

### Datos Meteorológicos
- `GET /api/clima` - Proxy para la API de OpenWeatherMap

### Cultivos
- `GET /api/cultivos` - Obtener todos los cultivos del usuario
- `POST /api/cultivos` - Crear un nuevo cultivo

### Administración (requiere token de admin)
- `GET /api/admin/users` - Obtener todos los usuarios
- `POST /api/admin/reset-password` - Restablecer contraseña de usuario

## Seguridad
- Todas las contraseñas se almacenan con hashing bcrypt
- La autenticación se maneja con tokens JWT
- CORS está configurado para permitir solo orígenes específicos
- Las claves secretas y API keys se deben mantener en variables de entorno

## Desarrollo
Para desarrollar localmente:
1. Clona el repositorio
2. Ejecuta `npm install`
3. Crea un archivo `.env` con tus variables de entorno
4. Ejecuta `npm start`
5. El servidor estará disponible en `http://localhost:3001`