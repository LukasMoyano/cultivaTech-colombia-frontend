/**
 * Definición única del orden de navegación para Header y Sidebar.
 * Mantiene sincronizados los módulos Agricultor e Inversionista sin duplicar listas.
 */

export const NAV_AGRICULTOR = [
  { key: "landing", icon: "🏠", headerLabel: "Inicio", sidebarLabel: "Presentación" },
  { key: "como_funciona", icon: "⛓️", headerLabel: "Blockchain", sidebarLabel: "Cómo Funciona Blockchain" },
  { key: "dashboard", icon: "📊", headerLabel: "Panel", sidebarLabel: "Panel" },
  { key: "telemetria", icon: "📡", headerLabel: "Telemetría", sidebarLabel: "Telemetría MQ-4" },
  { key: "cultivos", icon: "🌱", headerLabel: "Cultivos", sidebarLabel: "Cultivos" },
  { key: "alertas", icon: "⚠️", headerLabel: "Alertas", sidebarLabel: "Alertas" },
  { key: "foro", icon: "🗣️", headerLabel: "Foro", sidebarLabel: "Foro de Agricultores" },
  { key: "robot", icon: "🤖", headerLabel: "Robot", sidebarLabel: "Robot" },
];

export const NAV_INVERSIONISTA = [
  { key: "landing", icon: "🏠", headerLabel: "Inicio", sidebarLabel: "Presentación" },
  { key: "como_funciona", icon: "⛓️", headerLabel: "Blockchain", sidebarLabel: "Cómo Funciona Blockchain" },
  { key: "inversion_oferta", icon: "📋", headerLabel: "1. Oferta", sidebarLabel: "1. Ficha Oferta (Entiende)" },
  { key: "inversion_simulador", icon: "🪙", headerLabel: "2. Invertir", sidebarLabel: "2. Invertir (★ Delicado)" },
  { key: "inversion_portafolio", icon: "📈", headerLabel: "3. Portafolio", sidebarLabel: "3. Mi Portafolio (Sigue)" },
  { key: "inversion_salida", icon: "💸", headerLabel: "4. Salida", sidebarLabel: "4. Salida / Liquidación" },
];

/**
 * Devuelve los ítems ordenados según el módulo activo y el contenedor ("header" | "sidebar").
 */
export function getNavItems(activeModule = "agricultor", variant = "header") {
  const source = activeModule === "inversionista" ? NAV_INVERSIONISTA : NAV_AGRICULTOR;
  const labelKey = variant === "sidebar" ? "sidebarLabel" : "headerLabel";
  return source.map(({ key, icon, ...labels }) => ({
    key,
    icon,
    label: labels[labelKey],
  }));
}
