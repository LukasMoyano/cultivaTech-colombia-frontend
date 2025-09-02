import React from "react";
import PropTypes from "prop-types";

export default function Sidebar({ currentPage, onNav, sidebarOpen, setSidebarOpen }) {
  // Esta lista de navegación puede ser diferente a la del Header,
  // para mostrar más opciones en el menú lateral.
  const navItems = [
    { key: "landing", icon: "🏠", label: "Presentación" },
    { key: "dashboard", icon: "📊", label: "Panel" },
    { key: "cultivos", icon: "🌱", label: "Cultivos" },
    { key: "alertas", icon: "⚠️", label: "Alertas" },
    { key: "robot", icon: "🤖", label: "Robot" },
    { key: "juegos", icon: "🎮", label: "Juegos IA" },
  ];

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
          border-r border-border
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header del sidebar solo en móvil */}
        <div className="lg:hidden mb-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading text-text-accent flex items-center gap-2">
              <span>🌿</span>
              Cultiva Tech ColombIA
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

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`
                w-full text-left
                transition-all duration-200
                flex items-center gap-3 p-3
                font-heading text-sm
                ${currentPage === item.key 
                  ? "bg-primary text-white" 
                  : "text-text-main hover:bg-secondary/20"
                }
              `}
              onClick={() => handleNavigation(item.key)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label.toUpperCase()}</span>
            </button>
          ))}
        </nav>

        {/* Footer del sidebar */}
        <div className="mt-auto pt-4 border-t border-border absolute bottom-4 left-4 right-4">
          <div className="text-xs text-text-main/60 text-center">
            <p>CultivaTech ColombIA</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onNav: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
};