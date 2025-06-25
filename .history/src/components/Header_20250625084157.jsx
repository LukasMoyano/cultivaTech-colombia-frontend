import React from "react";
import PropTypes from "prop-types";

/**
 * Header component - Barra de navegación principal
 * @param {function} onMobileMenuClick - Callback para abrir/cerrar menú móvil
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @param {string} currentPage - Página actual para resaltar en navegación
 * @param {function} onNav - Función de navegación
 * @param {boolean} sidebarOpen - Estado del sidebar móvil
 */
export default function Header({
  onMobileMenuClick,
  isAuthenticated,
  currentPage,
  onNav,
  sidebarOpen
}) {
  // Elementos de navegación principales - conectados con el sidebar
  const navItems = [
    { key: "dashboard", icon: "📊", label: "Panel" },
    { key: "cultivos", icon: "🌱", label: "Cultivos" },
    { key: "alertas", icon: "⚠️", label: "Alertas" },
    { key: "robot", icon: "🤖", label: "Robot" },
  ];

  // Estilos condicionales mejorados
  const headerClass = isAuthenticated
    ? "backdrop-blur-md bg-white/90 shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-gray-200"
    : "cultiva-green-main shadow-md sticky top-0 z-50 transition-all duration-300";

  const textColorClass = isAuthenticated
    ? "text-cultiva-text-main"
    : "text-cultiva-text-light";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo/Título - clickeable para ir al dashboard */}
          <button
            onClick={() => isAuthenticated ? onNav("dashboard") : onNav("ingreso")}
            className={`text-xl md:text-2xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity ${textColorClass}`}
          >
            <span role="img" aria-label="logo">🌿</span>
            <span className="hidden sm:inline">CultivaTech ColombIA</span>
            <span className="sm:hidden">CultivaTech</span>
          </button>

          {/* Navegación para pantallas grandes - solo si está autenticado */}
          {isAuthenticated && (
            <nav className="hidden lg:flex gap-1 items-center">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNav(item.key)}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-white/20 ${
                    currentPage === item.key
                      ? 'bg-cultiva-green-main text-white shadow-md'
                      : textColorClass
                  }`}
                >
                  <span className="text-lg mb-1">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {/* Botón menú móvil - mejorado */}
          <button
            onClick={onMobileMenuClick}
            className={`lg:hidden p-2 rounded-lg transition-all duration-200 hover:bg-white/20 ${textColorClass}`}
            aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`w-6 h-6 transition-transform duration-200 ${sidebarOpen ? 'rotate-90' : ''}`}
            >
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Navegación móvil horizontal - solo en tablets */}
        {isAuthenticated && (
          <nav className="hidden md:flex lg:hidden border-t border-white/20 pt-2 pb-1 -mx-4 px-4">
            <div className="flex justify-around w-full">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNav(item.key)}
                  className={`flex flex-col items-center px-2 py-1 rounded text-xs transition-all duration-200 ${
                    currentPage === item.key
                      ? 'bg-white/20 text-white'
                      : `${textColorClass} hover:bg-white/10`
                  }`}
                >
                  <span className="text-base mb-1">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Validación de props
Header.propTypes = {
  onMobileMenuClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  currentPage: PropTypes.string,
  onNav: PropTypes.func,
  sidebarOpen: PropTypes.bool,
};

/*
  Explicación:
  - El header cambia de estilo si el usuario está autenticado (más moderno y transparente).
  - En móviles, solo se muestra el botón de menú y, si se despliega, los íconos con textos pequeños.
  - En pantallas grandes, el menú es horizontal, con íconos y textos pequeños y armoniosos.
  - Puedes controlar la visibilidad del menú móvil con un estado externo (ejemplo: showMobileMenu).
  - Personaliza los íconos y textos del menú según tu app.
*/