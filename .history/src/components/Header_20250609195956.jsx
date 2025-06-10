import React from "react";

/**
 * Header component
 * @param {function} onMobileMenuClick - Callback for mobile menu button
 * @param {boolean} isAuthenticated - If user is logged in/registered
 */
export default function Header({ onMobileMenuClick, isAuthenticated }) {
  // Menú de ejemplo, puedes personalizarlo
  const menuItems = [
    { icon: "🏠", label: "Inicio" },
    { icon: "🌱", label: "Cultivos" },
    { icon: "📊", label: "Estadísticas" },
    { icon: "👤", label: "Perfil" },
  ];

  // Estilos condicionales para transparencia y modernidad
  const headerClass = isAuthenticated
    ? "backdrop-blur-md bg-white/70 shadow-lg sticky top-0 z-50 transition-all"
    : "cultiva-green-main p-4 shadow-md sticky top-0 z-50";

  return (
    <header className={headerClass}>
      <div className="container mx-auto flex justify-between items-center py-2">
        {/* Logo o título */}
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <span role="img" aria-label="logo">🌿</span>
          CultivaTech ColombIA
        </h1>

        {/* Menú para pantallas grandes */}
        {isAuthenticated && (
          <nav className="hidden md:flex gap-6 items-center">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-sm hover:text-green-700 transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </div>
            ))}
          </nav>
        )}

        {/* Botón menú móvil */}
        <button
          onClick={onMobileMenuClick}
          className="md:hidden cultiva-text-light"
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable solo si está autenticado */}
      {/* Aquí puedes controlar la visibilidad con un estado externo */}
      {/* Ejemplo: showMobileMenu && ... */}
      {/* 
      <nav className="md:hidden flex flex-row justify-around mt-2">
        {menuItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-xs">
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      */}
    </header>
  );
}

/*
  Explicación:
  - El header cambia de estilo si el usuario está autenticado (más moderno y transparente).
  - En móviles, solo se muestra el botón de menú y, si se despliega, los íconos con textos pequeños.
  - En pantallas grandes, el menú es horizontal, con íconos y textos pequeños y armoniosos.
  - Puedes controlar la visibilidad del menú móvil con un estado externo (ejemplo: showMobileMenu).
  - Personaliza los íconos y textos del menú según tu app.
*/