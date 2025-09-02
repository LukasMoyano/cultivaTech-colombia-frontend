import React from "react";
import PropTypes from "prop-types";
import { ThemeToggleButton } from "./ui/ThemeToggleButton";
export default function Header({
  onMobileMenuClick,
  isAuthenticated,
  currentPage,
  onNav,
  sidebarOpen
}) {
  // Base nav items
  const navItems = [
    { key: "dashboard", icon: "📊", label: "Panel" },
    { key: "cultivos", icon: "🌱", label: "Cultivos" },
    { key: "alertas", icon: "⚠️", label: "Alertas" },
    { key: "robot", icon: "🤖", label: "Robot" },
  ];
  
  // Add "Presentation" link if authenticated
  if (isAuthenticated) {
    navItems.unshift({ key: "landing", icon: "🏠", label: "Presentación" });
  }

  return (
    <header className="bg-background text-text-main shadow-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <button
            onClick={() => isAuthenticated ? onNav("dashboard") : onNav("landing")}
            className="text-xl md:text-2xl flex items-center gap-2 hover:opacity-80 transition-opacity font-heading text-text-accent"
          >
            <span role="img" aria-label="logo">🌿</span>
            <span className="hidden sm:inline">CultivaTech ColombIA</span>
            <span className="sm:hidden">CultivaTech</span>
          </button>

          {isAuthenticated && (
            <nav className="hidden lg:flex gap-1 items-center">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNav(item.key)}
                  className={`flex flex-col items-center px-3 py-2 text-sm transition-all duration-200 hover:bg-secondary/20 font-heading ${ 
                    currentPage === item.key
                      ? 'text-primary'
                      : 'text-text-main'
                  }`}
                >
                  <span className="text-lg mb-1">{item.icon}</span>
                  <span className="text-xs">{item.label.toUpperCase()}</span>
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            {isAuthenticated && (
              <button
                onClick={onMobileMenuClick}
                className="lg:hidden p-2 transition-all duration-200 hover:bg-secondary/20 text-text-main"
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onMobileMenuClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  currentPage: PropTypes.string,
  onNav: PropTypes.func,
  sidebarOpen: PropTypes.bool,
};