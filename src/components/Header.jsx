import React from "react";
import PropTypes from "prop-types";
import { ThemeToggleButton } from "./ui/ThemeToggleButton";
import { getNavItems } from "../data/navigation";
export default function Header({
  onMobileMenuClick,
  isAuthenticated,
  currentPage,
  activeModule = "agricultor",
  onSwitchModule,
  onNav,
  sidebarOpen,
  user,
  onLogout,
}) {
  const navItems = getNavItems(activeModule, "header");

  return (
    <header className="bg-background text-text-main shadow-md sticky top-0 z-50 border-b border-border">
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center py-2.5 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => isAuthenticated ? onNav(activeModule === "inversionista" ? "inversion_oferta" : "dashboard") : onNav("landing")}
              className="text-base md:text-lg flex items-center gap-2 shrink-0 whitespace-nowrap hover:opacity-80 transition-opacity font-heading text-text-accent"
            >
              <span role="img" aria-label="logo">🌿</span>
              <span className="hidden sm:inline">CultivaTech ColombIA</span>
              <span className="sm:hidden">CultivaTech</span>
            </button>

            {isAuthenticated && onSwitchModule && (
              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden bg-background-card text-xs font-heading shrink-0">
                <button
                  type="button"
                  onClick={() => onSwitchModule("agricultor")}
                  className={`px-2.5 py-1.5 whitespace-nowrap transition-colors ${
                    activeModule === "agricultor" ? "bg-accent text-white" : "text-text-main hover:bg-secondary/20"
                  }`}
                >
                  🌱 Agricultor
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchModule("inversionista")}
                  className={`px-2.5 py-1.5 whitespace-nowrap transition-colors ${
                    activeModule === "inversionista" ? "bg-primary text-white" : "text-text-main hover:bg-secondary/20"
                  }`}
                >
                  💎 Inversionista
                </button>
              </div>
            )}
          </div>

          {isAuthenticated && (
            <nav className="hidden xl:flex gap-0.5 items-center min-w-0">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNav(item.key)}
                  className={`flex flex-col items-center px-2 py-1 text-xs whitespace-nowrap transition-all duration-200 hover:bg-secondary/20 font-heading ${ 
                    currentPage === item.key
                      ? 'text-primary'
                      : 'text-text-main'
                  }`}
                >
                  <span className="text-base mb-0.5">{item.icon}</span>
                  <span className="text-[10px]">{item.label.toUpperCase()}</span>
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggleButton />

            {isAuthenticated && onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="hidden sm:inline-block px-2.5 py-1.5 rounded border border-border text-xs font-bold whitespace-nowrap text-text-main hover:border-primary hover:text-primary transition-colors"
                title={user?.isDemo ? "Salir del Modo Demo" : "Cerrar Sesión"}
              >
                {user?.isDemo ? "Salir Demo" : "Salir"}
              </button>
            )}

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
  activeModule: PropTypes.string,
  onSwitchModule: PropTypes.func,
  onNav: PropTypes.func,
  sidebarOpen: PropTypes.bool,
  user: PropTypes.object,
  onLogout: PropTypes.func,
};