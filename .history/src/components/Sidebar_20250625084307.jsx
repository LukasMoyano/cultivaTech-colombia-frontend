import React from "react";
import PropTypes from "prop-types";

/**
 * Sidebar component - Navegación lateral responsive
 * @param {string} currentPage - Página actual activa
 * @param {function} onNav - Función de navegación
 * @param {boolean} sidebarOpen - Estado del sidebar en móvil
 * @param {function} setSidebarOpen - Función para controlar el sidebar
 */
export default function Sidebar({ currentPage, onNav, sidebarOpen, setSidebarOpen }) {
  const navItems = [
    { key: "ingreso", icon: "🚪", label: "Ingreso/Registro" },
    { key: "dashboard", icon: "📊", label: "Panel Principal" },
    { key: "cultivos", icon: "🌱", label: "Mis Cultivos" },
    { key: "alertas", icon: "⚠️", label: "Alertas" },
    { key: "robot", icon: "🤖", label: "Control Robot" },
  ];

  // Función para manejar navegación y cerrar sidebar en móvil
  const handleNavigation = (page) => {
    onNav(page);
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // Función para cerrar sidebar al hacer click en overlay
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleOverlayClick}
          aria-label="Cerrar menú"
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed lg:relative top-0 left-0 h-full lg:h-auto
          cultiva-earth-main p-4 space-y-2
          lg:w-64 lg:min-h-screen
          w-80 max-w-[80vw]
          z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:block
          shadow-xl lg:shadow-none
        `}
      >
        {/* Header del sidebar solo en móvil */}
        <div className="lg:hidden mb-6 pb-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-cultiva-text-light flex items-center gap-2">
              <span>🌿</span>
              CultivaTech
            </h2>
            <button
              onClick={handleOverlayClick}
              className="text-cultiva-text-light hover:text-white transition-colors p-1"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Elementos de navegación */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`
                nav-button w-full text-left btn btn-nav
                transition-all duration-200
                hover:scale-105 hover:shadow-md
                flex items-center gap-3 p-3 rounded-lg
                ${currentPage === item.key ? "active shadow-lg" : ""}
              `}
              onClick={() => handleNavigation(item.key)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer del sidebar */}
        <div className="mt-8 pt-4 border-t border-white/20">
          <div className="text-xs text-cultiva-text-light opacity-70 text-center">
            <p>CultivaTech ColombIA</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </nav>
    </>
  );
}

// Validación de props
Sidebar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onNav: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func,
};