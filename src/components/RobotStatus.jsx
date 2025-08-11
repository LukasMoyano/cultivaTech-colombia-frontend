import React, { useState, useEffect } from "react";

/**
 * Componente para mostrar el estado dinámico del robot
 */
export default function RobotStatus() {
  const [robotState, setRobotState] = useState({
    battery: 75,
    connection: "fuerte",
    status: "en_base",
    lastMission: "Monitoreo Lote Sol - 19/05/24 14:00",
    isCharging: false,
    temperature: 24
  });

  // Estados posibles de conexión
  const connectionStates = [
    { key: "nula", label: "Sin Conexión", icon: "📵", color: "text-red-600", bgColor: "bg-red-50", strength: 0 },
    { key: "muy_baja", label: "Muy Baja", icon: "📶", color: "text-red-500", bgColor: "bg-red-50", strength: 1 },
    { key: "baja", label: "Baja", icon: "📶", color: "text-orange-500", bgColor: "bg-orange-50", strength: 2 },
    { key: "media", label: "Media", icon: "📶", color: "text-yellow-500", bgColor: "bg-yellow-50", strength: 3 },
    { key: "alta", label: "Alta", icon: "📶", color: "text-blue-500", bgColor: "bg-blue-50", strength: 4 },
    { key: "fuerte", label: "Fuerte", icon: "📶", color: "text-green-500", bgColor: "bg-green-50", strength: 5 },
    { key: "excelente", label: "Excelente", icon: "📶", color: "text-green-600", bgColor: "bg-green-100", strength: 6 }
  ];

  // Estados del robot
  const robotStates = [
    { key: "en_base", label: "En Base", icon: "🏠", color: "text-blue-600", description: "Robot en estación de carga" },
    { key: "cargando", label: "Cargando", icon: "🔌", color: "text-yellow-600", description: "Recargando batería" },
    { key: "patrullando", label: "Patrullando", icon: "🚶", color: "text-green-600", description: "Recorriendo el cultivo" },
    { key: "trabajando", label: "Trabajando", icon: "⚙️", color: "text-purple-600", description: "Realizando tareas" },
    { key: "regresando", label: "Regresando", icon: "↩️", color: "text-orange-600", description: "Volviendo a base" },
    { key: "mantenimiento", label: "Mantenimiento", icon: "🔧", color: "text-red-600", description: "Requiere atención" }
  ];

  // Simular cambios automáticos del robot cada 20 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotState(prev => {
        let newBattery = prev.battery;
        let newStatus = prev.status;
        let isCharging = prev.isCharging;

        // Lógica de batería
        if (prev.status === "cargando") {
          newBattery = Math.min(100, prev.battery + Math.random() * 15);
          isCharging = true;
          if (newBattery >= 95) {
            newStatus = "en_base";
            isCharging = false;
          }
        } else if (prev.status === "trabajando" || prev.status === "patrullando") {
          newBattery = Math.max(5, prev.battery - Math.random() * 8);
          isCharging = false;
          if (newBattery <= 20) {
            newStatus = "regresando";
          }
        } else if (prev.status === "regresando") {
          newBattery = Math.max(5, prev.battery - Math.random() * 3);
          if (Math.random() > 0.7) {
            newStatus = "cargando";
          }
        } else {
          // Estado aleatorio ocasional
          if (Math.random() > 0.8) {
            const randomState = robotStates[Math.floor(Math.random() * robotStates.length)];
            newStatus = randomState.key;
          }
        }

        const newConnection = connectionStates[Math.floor(Math.random() * connectionStates.length)].key;
        const newTemperature = 20 + Math.random() * 15; // 20-35°C
        
        return {
          ...prev,
          battery: Math.round(newBattery),
          connection: newConnection,
          status: newStatus,
          isCharging,
          temperature: Math.round(newTemperature),
          lastMission: `Actualización automática - ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
        };
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const currentConnection = connectionStates.find(c => c.key === robotState.connection);
  const currentStatus = robotStates.find(s => s.key === robotState.status);

  // Color de la batería según el nivel
  const getBatteryColor = (level) => {
    if (level > 60) return "text-green-600";
    if (level > 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBatteryBgColor = (level) => {
    if (level > 60) return "bg-green-100";
    if (level > 30) return "bg-yellow-100";
    return "bg-red-100";
  };

  // Renderizar barras de señal según la fuerza
  const renderSignalBars = (strength) => {
    return (
      <div className="flex items-end gap-1">
        {[1, 2, 3, 4, 5, 6].map(bar => (
          <div
            key={bar}
            className={`w-1 transition-all duration-300 ${
              bar <= strength 
                ? currentConnection?.color.replace('text-', 'bg-')
                : 'bg-gray-300'
            }`}
            style={{ height: `${bar * 3 + 6}px` }}
          />
        ))}
      </div>
    );
  };

  return (
     // Contenedor principal con padding y centrado
-    <div className="container mx-auto p-4">
+    <div className="container mx-auto p-6">
       {/* Título principal de la sección */}
-      <h2 className="text-3xl font-bold cultiva-text-main mb-2">
-        Control Robot "R2Campo"
-      </h2>
+      <div className="mb-8">
+        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
+          Control Robot "R2Campo"
+        </h2>
+        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
+      </div>
       {/* Descripción breve de la funcionalidad */}
-      <p className="mb-6 cultiva-text-secondary">
+      <p className="mb-8 text-gray-600 text-lg leading-relaxed">
         Visualiza la ubicación de tu robot en tiempo real, su ruta y controla
         sus operaciones básicas. (Visualización de mapa es un placeholder).
       </p>
       {/* Grid principal: 1 columna en móvil, 3 en desktop */}
-      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
+      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Columna izquierda: Mapa (ocupa 2 columnas en desktop) */}
-        <div className="md:col-span-2 card">
+        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
           {/* Encabezado de la tarjeta del mapa */}
-          <div className="card-header">
-            🗺️ Mapa del Lote Agrícola (Placeholder)
+          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
+            <span className="text-2xl">🗺️</span>
+            <h3 className="text-xl font-bold text-gray-800">
+              Mapa del Lote Agrícola
+            </h3>
+            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
+              En vivo
+            </span>
           </div>
           {/* Área del mapa (placeholder visual) */}
-          <div className="w-full h-96 bg-gray-300 rounded flex items-center justify-center cultiva-text-secondary precolumbian-border-subtle">
+          <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
             {/* Texto explicativo y emojis como marcador y robot */}
-            (Aquí iría la integración con Mapbox mostrando el robot y su ruta)
-            <span className="icon-placeholder text-6xl">📍🤖</span>
+            <div className="text-center">
+              <div className="text-8xl mb-4">📍🤖</div>
+              <p className="text-gray-600 text-lg">Integración con Mapbox</p>
+              <p className="text-gray-500 text-sm">Próximamente disponible</p>
+            </div>
           </div>
         </div>
         {/* Columna derecha: Estado y controles */}
-        <div className="md:col-span-1 space-y-4">
+        <div className="lg:col-span-1 space-y-6">
           {/* Tarjeta de estado del robot */}
-          <div className="card">
-            <div className="card-header">ℹ️ Estado del Robot</div>
-            {/* Estado de la batería */}
-            <p>
-              <span className="font-semibold">Batería:</span>{" "}
-              <span className="icon-placeholder">🔋</span> 75%
-            </p>
-            {/* Estado de la señal */}
-            <p>
-              <span className="font-semibold">Señal:</span>{" "}
-              <span className="icon-placeholder">📶</span> Fuerte
-            </p>
-            {/* Última misión realizada */}
-            <p>
-              <span className="font-semibold">Última Misión:</span> Monitoreo
-              Lote Sol - 19/05/24 14:00
-            </p>
+          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
+            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
+              <span className="text-2xl">ℹ️</span>
+              <h3 className="text-lg font-bold text-gray-800">Estado del Robot</h3>
+              <div className="ml-auto flex items-center gap-2">
+                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
+                <span className="text-xs text-gray-500">En línea</span>
+              </div>
+            </div>
+
+            <div className="space-y-4">
+              {/* Estado actual */}
+              <div className={`p-4 rounded-lg border-l-4 ${
+                currentStatus?.color === 'text-green-600' ? 'border-green-400 bg-green-50' : 
+                currentStatus?.color === 'text-red-600' ? 'border-red-400 bg-red-50' : 
+                'border-blue-400 bg-blue-50'
+              }`}>
+                <div className="flex items-center gap-3">
+                  <span className="text-2xl">{currentStatus?.icon}</span>
+                  <div>
+                    <p className="font-semibold text-gray-800">{currentStatus?.label}</p>
+                    <p className="text-xs text-gray-600">{currentStatus?.description}</p>
+                  </div>
+                  {robotState.isCharging && (
+                    <div className="ml-auto">
+                      <span className="text-yellow-500 animate-pulse">⚡</span>
+                    </div>
+                  )}
+                </div>
+              </div>

+              {/* Batería */}
+              <div className={`p-4 rounded-lg ${getBatteryBgColor(robotState.battery)}`}>
+                <div className="flex items-center justify-between mb-3">
+                  <div className="flex items-center gap-2">
+                    <span className="text-xl">🔋</span>
+                    <span className="font-semibold">Batería</span>
+                  </div>
+                  <span className={`font-bold text-lg ${getBatteryColor(robotState.battery)}`}>
+                    {robotState.battery}%
+                  </span>
+                </div>
+                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
+                  <div 
+                    className={`h-3 rounded-full transition-all duration-1000 ${
+                      robotState.battery > 60 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
+                      robotState.battery > 30 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
+                      'bg-gradient-to-r from-red-400 to-red-500'
+                    } ${robotState.isCharging ? 'animate-pulse' : ''}`}
+                    style={{ width: `${robotState.battery}%` }}
+                  ></div>
+                </div>
+                {robotState.battery <= 20 && (
+                  <p className="text-xs text-red-600 mt-2 font-medium">
+                    ⚠️ Batería baja - Se recomienda carga
+                  </p>
+                )}
+              </div>

+              {/* Conexión con barras de señal */}
+              <div className={`p-4 rounded-lg ${currentConnection?.bgColor}`}>
+                <div className="flex items-center justify-between mb-2">
+                  <div className="flex items-center gap-2">
+                    <span className="text-xl">{currentConnection?.icon}</span>
+                    <span className="font-semibold">Conexión</span>
+                  </div>
+                  <div className="flex items-center gap-3">
+                    {renderSignalBars(currentConnection?.strength || 0)}
+                    <span className={`font-bold ${currentConnection?.color}`}>
+                      {currentConnection?.label}
+                    </span>
+                  </div>
+                </div>
+              </div>

+              {/* Temperatura del robot */}
+              <div className="p-4 bg-gray-50 rounded-lg">
+                <div className="flex items-center justify-between">
+                  <div className="flex items-center gap-2">
+                    <span className="text-xl">🌡️</span>
+                    <span className="font-semibold">Temperatura</span>
+                  </div>
+                  <span className={`font-bold ${
+                    robotState.temperature > 30 ? 'text-red-600' : 
+                    robotState.temperature > 25 ? 'text-yellow-600' : 'text-green-600'
+                  }`}>
+                    {robotState.temperature}°C
+                  </span>
+                </div>
+              </div>

+              {/* Última misión */}
+              <div className="p-4 bg-gray-50 rounded-lg">
+                <p className="text-sm text-gray-700">
+                  <span className="font-semibold flex items-center gap-2 mb-2">
+                    <span>📋</span> Última Misión:
+                  </span>
+                  {robotState.lastMission}
+                </p>
+              </div>
+            </div>
           </div>
           {/* Tarjeta de controles básicos */}
-          <div className="card">
-            <div className="card-header">⚙️ Controles Básicos</div>
+          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
+            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
+              <span className="text-2xl">⚙️</span>
+              <h3 className="text-lg font-bold text-gray-800">Controles Básicos</h3>
+            </div>
             {/* Botones de control del robot */}
-            <div className="space-y-3">
+            <div className="space-y-4">
               {/* Botón para iniciar monitoreo programado */}
-              <button className="btn btn-primary w-full">
+              <button 
+                onClick={() => setRobotState(prev => ({ 
+                  ...prev, 
+                  status: "trabajando",
+                  lastMission: `Monitoreo iniciado - ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
+                }))}
+                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-md"
+              >
                 Iniciar Monitoreo Programado
               </button>
               {/* Botón de emergencia para detener el robot */}
-              <button className="btn btn-critical w-full">
+              <button 
+                onClick={() => setRobotState(prev => ({ 
+                  ...prev, 
+                  status: "en_base",
+                  lastMission: `Detenido por emergencia - ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
+                }))}
+                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-md"
+              >
                 Detener Robot (Emergencia)
               </button>
               {/* Botón para regresar el robot a la base */}
-              <button className="btn btn-secondary w-full">
+              <button 
+                onClick={() => setRobotState(prev => ({ 
+                  ...prev, 
+                  status: "regresando",
+                  lastMission: `Regresando a base - ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
+                }))}
+                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium shadow-md"
+              >
                 Regresar a Base
               </button>
               {/* Botón para ver cultivos */}
               <button
-                className="btn btn-outline w-full"
+                className="w-full border border-gray-300 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium"
                 onClick={() => setCurrentPage?.("cultivos")}
               >
                 Ver Mis Cultivos
               </button>
+              {/* Botón para iniciar carga manual */}
+              <button 
+                onClick={() => setRobotState(prev => ({ 
+                  ...prev, 
+                  status: "cargando",
+                  isCharging: true,
+                  lastMission: `Carga iniciada - ${new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
+                }))}
+                className="w-full border border-yellow-500 text-yellow-600 py-3 px-4 rounded-lg hover:bg-yellow-50 transition-all font-medium"
+              >
+                🔌 Iniciar Carga
+              </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   );

+  // Renderizar barras de señal según la fuerza
+  const renderSignalBars = (strength) => {
+    return (
+      <div className="flex items-end gap-1">
+        {[1, 2, 3, 4, 5, 6].map(bar => (
+          <div
+            key={bar}
+            className={`w-1 transition-all duration-300 ${
+              bar <= strength 
+                ? currentConnection?.color.replace('text-', 'bg-')
+                : 'bg-gray-300'
+            }`}
+            style={{ height: `${bar * 3 + 6}px` }}
+          />
+        ))}
+      </div>
+    );
+  };

+  return (
+    <div className="space-y-4">
+      {/* Estado actual del robot */}
+      <div className={`p-4 rounded-lg border-l-4 ${
+        currentStatus?.color === 'text-green-600' ? 'border-green-400 bg-green-50' : 
+        currentStatus?.color === 'text-red-600' ? 'border-red-400 bg-red-50' : 
+        'border-blue-400 bg-blue-50'
+      }`}>
+        <div className="flex items-center gap-3">
+          <span className="text-2xl">{currentStatus?.icon}</span>
+          <div>
+            <p className="font-semibold text-gray-800">{currentStatus?.label}</p>
+            <p className="text-xs text-gray-600">{currentStatus?.description}</p>
+          </div>
+          {robotState.isCharging && (
+            <div className="ml-auto">
+              <span className="text-yellow-500 animate-pulse text-xl">⚡</span>
+            </div>
+          )}
+        </div>
+      </div>

+      {/* Batería con animación */}
+      <div className={`p-4 rounded-lg ${getBatteryBgColor(robotState.battery)}`}>
+        <div className="flex items-center justify-between mb-3">
+          <div className="flex items-center gap-2">
+            <span className="text-xl">🔋</span>
+            <span className="font-semibold">Batería</span>
+          </div>
+          <span className={`font-bold text-lg ${getBatteryColor(robotState.battery)}`}>
+            {robotState.battery}%
+          </span>
+        </div>
+        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
+          <div 
+            className={`h-3 rounded-full transition-all duration-1000 ${
+              robotState.battery > 60 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
+              robotState.battery > 30 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
+              'bg-gradient-to-r from-red-400 to-red-500'
+            } ${robotState.isCharging ? 'animate-pulse' : ''}`}
+            style={{ width: `${robotState.battery}%` }}
+          ></div>
+        </div>
+        {robotState.battery <= 20 && (
+          <p className="text-xs text-red-600 mt-2 font-medium">
+            ⚠️ Batería baja - Se recomienda carga
+          </p>
+        )}
+      </div>

+      {/* Conexión con barras de señal animadas */}
+      <div className={`p-4 rounded-lg ${currentConnection?.bgColor}`}>
+        <div className="flex items-center justify-between mb-2">
+          <div className="flex items-center gap-2">
+            <span className="text-xl">{currentConnection?.icon}</span>
+            <span className="font-semibold">Conexión</span>
+          </div>
+          <div className="flex items-center gap-3">
+            {renderSignalBars(currentConnection?.strength || 0)}
+            <span className={`font-bold ${currentConnection?.color}`}>
+              {currentConnection?.label}
+            </span>
+          </div>
+        </div>
+      </div>

+      {/* Temperatura del robot */}
+      <div className="p-4 bg-gray-50 rounded-lg">
+        <div className="flex items-center justify-between">
+          <div className="flex items-center gap-2">
+            <span className="text-xl">🌡️</span>
+            <span className="font-semibold">Temperatura</span>
+          </div>
+          <span className={`font-bold ${
+            robotState.temperature > 30 ? 'text-red-600' : 
+            robotState.temperature > 25 ? 'text-yellow-600' : 'text-green-600'
+          }`}>
+            {robotState.temperature}°C
+          </span>
+        </div>
+      </div>

+      {/* Última misión */}
+      <div className="p-4 bg-gray-50 rounded-lg">
+        <p className="text-sm text-gray-700">
+          <span className="font-semibold flex items-center gap-2 mb-2">
+            <span>📋</span> Última Misión:
+          </span>
+          {robotState.lastMission}
+        </p>
+      </div>
+    </div>
+  );
 }