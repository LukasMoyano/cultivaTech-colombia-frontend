# CultivaTech ColombIA · Análisis de brecha TRL 6

## 1. Referencia

El informe final de SENA declara **TRL alcanzado: 6**. La definición de TRL 6 exige un
prototipo demostrado en un entorno relevante, con evidencia de operación real y validación
con usuarios o condiciones de campo.

## 2. Alcance real del MVP

| Componente | Estado actual | Evidencia |
|---|---|---|
| Sensor de gas | MQ-4 en GPIO12 | Lectura ADC de 12 bits y voltaje |
| Variable medida | CH₄ | El MQ-4 es sensible a metano; el CO₂ se estima, no se mide |
| Controlador | ESP32 | Firmware Edge V2 con NTP, HMAC-SHA256 y buffer LittleFS |
| Transporte | HTTPS POST | `POST /api/ingest` en Render Free |
| Validación | HMAC, ventana temporal y anti-replay | Respuestas 403/409/422 probadas |
| Visualización | SSE + React/Netlify | Historial efímero y gráfica en vivo |
| Integridad | SHA-256 y raíz Merkle | Cola de anclaje y lote por Merkle |
| Blockchain | Contrato compilado | Sepolia pendiente de fondeo; modo simulación visible |
| Persistencia | Efímera | Render Free sin disco; se pierde al reiniciar o redeployar |

## 3. Brechas frente a TRL 6

1. **CO₂ y pH**: el MVP no mide CO₂ real ni pH. El CO₂ mostrado es una equivalencia
   estimada a partir del MQ-4. Para sostener la afirmación del informe se requiere MQ-135
   o sensor NDIR y un sensor de pH calibrado.
2. **Robot Truper**: no existe integración, control ni evidencia de operación del robot.
3. **LoRaWAN**: el MVP usa Wi-Fi y HTTPS. No hay gateway, nodo LoRaWAN ni pruebas de
   alcance rural.
4. **Validación de campo**: no hay piloto documentado en un cultivo real, con réplicas,
   testigos y registro de condiciones ambientales.
5. **Calibración**: falta curva de calibración del MQ-4, compensación por temperatura y
   humedad, y caracterización de deriva.
6. **Persistencia y disponibilidad**: Render Free no ofrece disco persistente. El historial
   se pierde en cada reinicio. Para una demo continua se debe mantener el servicio despierto
   y no redeployar durante la presentación.
7. **Anclaje on-chain**: la wallet de Sepolia no está fondeada. El contrato está compilado,
   pero no desplegado. El panel muestra simulación, nunca una transacción falsa.
8. **Usuarios beta**: no hay evidencia de usuarios reales operando el sistema en campo.

## 4. Valoración

- **Telemetría y validación de integridad**: TRL 4-5. Funciona en laboratorio y entorno
  controlado, con pruebas reproducibles de HMAC, replay y SSE.
- **Sistema completo con sensores ambientales, robot y LoRaWAN**: TRL 3-4. Los componentes
  existen en el discurso o en prototipos aislados, pero no integrados.
- **TRL 6**: no se sostiene todavía. Se alcanzaría con un piloto de campo documentado,
  sensores calibrados, conectividad validada y evidencia de uso por parte de un usuario.

## 5. Ruta mínima para TRL 6

1. Desplegar el contrato en Sepolia y registrar al menos un lote real.
2. Ejecutar un piloto de 7-14 días en un cultivo, con MQ-4 calibrado y registro de
   temperatura/humedad ambiental.
3. Añadir MQ-135 o NDIR para CO₂ y un sensor de pH si el informe los exige.
4. Documentar el protocolo de prueba, las condiciones, los resultados y las limitaciones.
5. Obtener carta o acta de un usuario beta que haya operado el sistema.
6. Reemplazar el historial efímero por una base de datos gratuita (Turso o Supabase) para
   la fase 2.

## 6. Conclusión

El MVP es una demostración funcional y honesta de telemetría MQ-4 con integridad
criptográfica y visualización en la nube a costo $0. No equivale por sí solo a TRL 6.
La brecha es de validación experimental, sensores y operación de campo, no de arquitectura.
