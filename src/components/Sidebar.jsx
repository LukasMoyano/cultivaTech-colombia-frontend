import React from "react";
import PropTypes from "prop-types";

export default function Sidebar({
  currentPage,
  activeModule = "agricultor",
  onSwitchModule,
  onNav,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  user,
}) {
  const navAgricultor = [
    { key: "landing", icon: "🏠", label: "Presentación" },
    { key: "dashboard", icon: "📊", label: "Panel" },
    { key: "telemetria", icon: "📡", label: "Telemetría MQ-4" },
    { key: "cultivos", icon: "🌱", label: "Cultivos" },
    { key: "alertas", icon: "⚠️", label: "Alertas" },
    { key: "foro", icon: "🗣️", label: "Foro de Agricultores" },
    { key: "robot", icon: "🤖", label: "Robot" },
    { key: "como_funciona", icon: "⛓️", label: "Cómo Funciona Blockchain" },
  ];

  const navInversionista = [
    { key: "landing", icon: "🏠", label: "Presentación" },
    { key: "inversion_oferta", icon: "📋", label: "1. Ficha Oferta (Entiende)" },
    { key: "inversion_simulador", icon: "🪙", label: "2. Invertir (★ Delicado)" },
    { key: "inversion_portafolio", icon: "📈", label: "3. Mi Portafolio (Sigue)" },
    { key: "inversion_salida", icon: "💸", label: "4. Salida / Liquidación" },
    { key: "como_funciona", icon: "⛓️", label: "Cómo Funciona Blockchain" },
  ];

  const navItems = activeModule === "inversionista" ? navInversionista : navAgricultor;

  const handleNavigation = (page) => {
    onNav(page);
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleOverlayClick = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden"
          onClick={handleOverlayClick}
          aria-label="Cerrar menú"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 h-full
          bg-background p-4
          lg:w-64 lg:min-h-screen
          w-80 max-w-[80vw]
          z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          border-r border-border flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header del sidebar solo en móvil */}
        <div className="lg:hidden mb-4 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading text-text-accent flex items-center gap-2">
              <span>🌿</span>
              CultivaTech ColombIA
            </h2>
            <button
              onClick={handleOverlayClick}
              className="text-text-main hover:text-accent transition-colors p-1"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Selector de módulo visible siempre en el panel lateral */}
        {onSwitchModule && (
          <div className="mb-4 p-2 rounded-lg bg-background-card border border-border space-y-1.5">
            <span className="block text-[10px] font-heading text-text-main/70 uppercase tracking-wider">
              Vista de Módulo Activa
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  onSwitchModule("agricultor");
                  if (setSidebarOpen) setSidebarOpen(false);
                }}
                className={`py-1.5 px-2 rounded text-xs font-heading transition-colors ${
                  activeModule === "agricultor"
                    ? "bg-accent text-white"
                    : "bg-background text-text-main border border-border"
                }`}
              >
                🌱 Campo
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchModule("inversionista");
                  if (setSidebarOpen) setSidebarOpen(false);
                }}
                className={`py-1.5 px-2 rounded text-xs font-heading transition-colors ${
                  activeModule === "inversionista"
                    ? "bg-primary text-white"
                    : "bg-background text-text-main border border-border"
                }`}
              >
                💎 Invierte
              </button>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`
                w-full text-left
                transition-all duration-200
                flex items-center gap-3 p-2.5 rounded
                font-heading text-xs
                ${currentPage === item.key
                  ? "bg-primary text-white"
                  : "text-text-main hover:bg-secondary/20"
                }
              `}
              onClick={() => handleNavigation(item.key)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label.toUpperCase()}</span>
            </button>
          ))}
        </nav>

        {/* Footer del sidebar */}
        <div className="mt-6 pt-4 border-t border-border space-y-2">
          {user?.isDemo && (
            <div className="px-2 py-1 rounded bg-secondary/20 text-[11px] text-center font-bold text-text-main">
              Modo Demo Jurado (Lectura / Simulación)
            </div>
          )}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="w-full py-1.5 rounded border border-border text-xs font-bold text-text-main hover:border-primary hover:text-primary transition-colors"
            >
              {user?.isDemo ? "Salir del Modo Demo" : "Cerrar Sesión"}
            </button>
          )}
          <div className="text-[11px] text-text-main/60 text-center">
            <p>CultivaTech ColombIA</p>
            <p>Demo Day CCB 2026</p>
          </div>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  activeModule: PropTypes.string,
  onSwitchModule: PropTypes.func,
  onNav: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
  onLogout: PropTypes.func,
  user: PropTypes.object,
};