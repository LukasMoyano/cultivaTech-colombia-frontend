# 🌾 BITÁCORA TÉCNICA MAESTRA — SERVICIOS, TELEMETRÍA Y PLATAFORMA WEB
**Proyecto:** CultivaTech ColombIA — Ecosistema Full Stack & Oráculo  
**Ubicación Física:** `/mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend`  
**Fecha de Corte:** 6 de Noviembre de 2026 — 09:18 AM  
**Sesión Canónica:** `aba55f2b-3e9a-4eb2-b8ab-6d0a09998738`  
**Estado:** Activo, Transmitiendo y Operativo en Producción Local / Red VPN  

---

## 1. INFRAESTRUCTURA Y TOPOLOGÍA DE RED

El sistema está configurado para operar de forma transparente y desacoplada tanto en la red LAN física como a través de la malla privada de **Tailscale**:

| Servicio | Puerto | Binding | Endpoint Principal |
|---|---|---|---|
| **Backend API (Node.js/Express)** | `3001` | `0.0.0.0` | `http://100.93.134.33:3001/` |
| **Frontend React (Vite 6)** | `5173` | `0.0.0.0` | `http://100.93.134.33:5173/` |
| **Ingesta de Borde (Edge HMAC)** | `3001` | Local/Red | `http://127.0.0.1:3001/api/ingest` |
| **WebSocket Telemetría** | `8080` | `0.0.0.0` | `ws://100.93.134.33:8080` |

### Direcciones IP Activas:
* **IP Tailscale (Acceso Remoto Seguro):** `100.93.134.33`
* **IP Red LAN Taller:** `192.168.1.7`

---

## 2. MODIFICACIONES Y BLINDAJE APLICADO EN ESTA SESIÓN

### A. Desacoplamiento Dinámico de Axios y Endpoints Remotos
* **Archivos modificados:**
  * [`src/api.js`](file:///mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend/src/api.js): Se eliminó el hardcodeo a `localhost` sustituyéndolo por un detector dinámico de origen (`window.location.hostname:3001`). Esto permite que al ingresar por Tailscale o por la IP LAN, el frontend despache las peticiones de Login y API al servidor correspondiente sin rechazos de conexión.
  * [`src/hooks/useTelemetryStream.js`](file:///mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend/src/hooks/useTelemetryStream.js): Conexión SSE dinámica para la telemetría viva.
  * [`src/components/telemetria/telemetria.constants.js`](file:///mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend/src/components/telemetria/telemetria.constants.js): Detección automática del puerto WebSocket (`:8080`).

### B. Gestión de Autenticación y Credenciales
* **Base de datos de usuarios:** `backend/data/usuarios.json`
* **Usuarios configurados con hash bcrypt verificado:**
  1. `lukasmoyanomorales@gmail.com` | Clave: `admin1234` (Rol: `user`, Cédula: `1014189995`, Celular: `573197919742`).
  2. `admin@example.com` | Clave: `admin1234` (Rol: `admin`).
* **Verificación:** Autenticación probada por cURL y emisión de token JWT con tiempo de expiración de 1 hora.

### C. Ingesta HMAC-SHA256 y Oráculo Merkle
* **Validación de Firma:** El backend verifica cada paquete contra el secreto del dispositivo en `backend/.env` (`DEVICE_SECRETS={"NODE-CULTIVA-01":"83f4323d..."}`).
* **Agrupación en Lotes:** Al completar cada 5 lecturas consecutivas, el Queue Worker calcula la **Raíz de Merkle** canónica y emite el evento para el anclaje criptográfico (`event RaizAnclada`).

---

## 3. SCRIPT DE CONTROL OPERATIVO UNIFICADO

Para evitar que los servicios queden colgados o requieran comandos manuales largos, se consolidó el script:  
[`./servicios_cultivatech.sh`](file:///mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend/servicios_cultivatech.sh)

### Comandos de uso:
```bash
cd /mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend

# Consultar estado general:
./servicios_cultivatech.sh status

# Reiniciar backend, frontend y telemetría edge:
./servicios_cultivatech.sh restart

# Detener todos los procesos limpiamente:
./servicios_cultivatech.sh stop
```

---

## 4. CHECKLIST DE RECUPERACIÓN ANTE CORTE O REINICIO

Si se pierde la sesión o se reinicia la máquina:
1. Abrir terminal en la estación y navegar a:  
   `cd /mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend`
2. Ejecutar:  
   `./servicios_cultivatech.sh start`
3. Verificar con:  
   `./servicios_cultivatech.sh status`  
   *(Deben figurar los 3 componentes en verde: Backend [ACTIVO], Frontend [ACTIVO], Telemetría [TRANSMITIENDO])*.
4. Abrir en el navegador móvil/PC:  
   `http://100.93.134.33:5173/` e ingresar con las credenciales registradas.
EOF