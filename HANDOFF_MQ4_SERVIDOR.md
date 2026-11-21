# Handoff — CultivaTech MQ-4 en vivo + PC como servidor público

- **Fecha sesión:** 2026-09-15/16
- **CWD:** `/mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/cultivaTech-colombia-frontend`
- **Etiqueta retomada:** `cultivatech-mq4-y-servidor-publico`
- **Nota IDs:** el asistente no expone IDs de sesión; usar fecha + etiqueta para retomar.

## 1. Objetivo global
1. Dashboard en tiempo real del sensor MQ-4 (ESP32) mostrando **calidad del aire: CH₄ y CO₂**, dentro del Panel Principal existente y su UX día/noche.
2. Servir los proyectos del PC al público con **un clic, HTTP por IP pública, sin ngrok/tailscale/dominio**.

## 2. Entorno y puertos (estado al cerrar sesión)
| Servicio | Puerto/URL | Estado |
|---|---|---|
| Frontend vite | `http://localhost:5173/proyectocultivatechcolombia/` | OK (instancia única; duplicada `:5174` eliminada) |
| Backend API | `http://localhost:3001` | Colgado → eliminado (PID 3327769). **Rearrancar: `npm start` en `backend/`** |
| Bridge Serie→WS | `ws://127.0.0.1:8080` (verificado `WS_HANDSHAKE_OK`) | **Suspendido `Tl` (PID 3308848, Ctrl+Z). Reanudar con `fg` o `node bridge.js`** |
| nginx local | `:80` (NO es Apache) | Sirve sitio IR desactualizado |
| ESP32 serie | `/dev/ttyUSB0` @115200 (CH340) | Presente; sketch actual NO emite Serial |

- `.env.development`: `VITE_WS_MQ4_URL=ws://127.0.0.1:8080` → **reiniciar `npm run dev` para que aplique**.
- Payload ESP32→bridge→WS: `{"mac":"…","timestamp":…,"sensor":"MQ-4","mq4_raw":1350,"voltage":1.08}` + `\r\n`.
- Conversión: `V=raw/4095*3.3`, `Rs=(5-V)/V*10k`, `CH4=200*(ratio/1.8)^-2.82` (piso 200); **CO₂ es estimado** (real requeriría MQ-135).
- Semáforo: `<1200` verde `#10B981`, `1200–2200` ámbar `#F59E0B`, `>2200` rojo `#EF4444`.

## 3. Archivos creados/modificados (frontend)
- `src/hooks/useMq4WebSocket.js` — WS + ventana 40 + backoff + reconnect.
- `src/components/telemetria/`: `Mq4Dashboard.jsx` (título "Calidad del aire · ESP32"), `KpiCard.jsx`, `RiskSemaphore.jsx` (sin literales MQ-4), `Mq4Chart.jsx`, `GasChart.jsx` (dual CH₄/CO₂), `gas-concentration.js`, `useMq4Simulator.js`, `telemetria.constants.js` (`DEFAULT_WS_URL=ws://127.0.0.1:8080`), `Mq4Dashboard.css`, `index.js`.
- `src/components/dashboard/GraficoPanel.jsx` — sección `h2#grafico-titulo` "📡 CALIDAD DEL AIRE · EN VIVO", KPIs CH₄/CO₂/señal/estado, botón ↻ Reintentar, URL y conteo de mensajes.
- Integración: `Dashboard.jsx` (pasa `setCurrentPage`), `MainContent.jsx`, `Sidebar.jsx`, `Header.jsx`.
- Verificado: `npx eslint` limpio, `npm run build ✓`.

## 4. Firmware ESP32
- Sketch del usuario (OLED SSD1306) **no imprime Serial** → causa de "Canal abierto — esperando al ESP32".
- Creado: `ESP32_project001_IDE_Comunication/Proyect001_MQ4/firmware/ESP32_MQ4_OLED_Telemetria.ino` (misma pantallita `GAS: 0–40` + JSON/s por Serial). **Flashear + cerrar Monitor Serie antes de `node bridge.js`.**
- Referencia solo-JSON: `firmware/ESP32_MQ4_Telemetria.ino`. Bridge sin cambios: `Proyect001_MQ4/bridge.js`.
- Al encender con datos reales, el simulador **se apaga solo** y el panel muestra `⛓ Fuente: ESP32`.

## 5. Servidor propio (hallazgos solo-lectura)
- `:80` = **nginx en el PC** (desde 09-sep), root `/var/www/masterlukasmoyano.irproductions.local/html/dist` (build viejo), `server_name masterlukasmoyano.irproductions.local masterlukasmoyano.duckdns.org`. Sin oyente `:443`.
- `100.93.134.33` = IP **Tailscale** (`tailscale0`, RFC 6598): imposible exponerla a internet. `localhost` ≠ alcance público.
- Red: LAN `192.168.0.3`, IPv6 pública `2800:484:2d81:faa0:…`, IPv4 pública por confirmar (posible CGNAT).
- Conflicto: contenedor `cazador_convocatorias_web` publica `:8080` (choca con bridge).
- Ya existen contenedores ngrok (no usar por decisión del usuario).

## 6. Decisiones del usuario (firmes)
- Visitantes: cualquiera en internet. Dominio propio en fiasco (posible traslado futuro).
- Rechazado: ngrok, Tailscale Serve, DuckDNS+HTTPS.
- **Aprobado: IP pública numérica, HTTP puerto 80, "sin más"** (se acepta etiqueta "No es seguro"; con IP no existe HTTPS público).

## 7. Plan aprobado para la próxima sesión
1. **Red:** IPv4 pública + CGNAT, forward TCP 80 → `.0.3`, `ufw allow 80`; añadir `listen [::]:80` si se usa IPv6.
2. **Conflictos:** reanudar bridge, liberar `:8080`.
3. **Código mínimo:** frontend con API/WS por mismo origen (`window.location` + override env) para no atarse a `localhost` ni rebuilds por IP.
4. **Deploy:** `npm run build` → roots nginx (`/` sitio IR; `/proyectocultivatechcolombia/` CultivaTech, se conserva `base`); `default_server` para IP cruda; `/api/`→`:3001`, `/ws/`→`:8080` con `Upgrade`; `nginx -t` + reload.
5. **Verificación:** curl local → LAN `http://192.168.0.3/...` → externo real (móvil sin wifi) IPv4 y `[IPv6]`.
6. **Persistencia:** systemd para backend+bridge+nginx. Contingencia: si ISP bloquea 80/CGNAT → `http://IP:PUERTO/`.
7. HTTPS solo cuando se traslade el dominio (`certbot --nginx`).

## 8. Comandos rápidos
```bash
npm run dev            # frontend :5173 (reiniciar por .env)
npm start              # en backend/ :3001
node bridge.js         # en Proyect001_MQ4/ :8080 (cerrar antes Monitor Serie)
ss -ltnp | grep -E ':80 |:3001|:5173|:8080'
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/proyectocultivatechcolombia/
```
