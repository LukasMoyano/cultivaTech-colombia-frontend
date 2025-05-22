import React from "react";

export default function Sidebar({ currentPage, onNav, sidebarOpen }) {
  const navItems = [
    { key: "ingreso", icon: "🚪", label: "Ingreso/Registro" },
    { key: "dashboard", icon: "📊", label: "Panel Principal" },
    { key: "cultivos", icon: "🌱", label: "Mis Cultivos" },
    { key: "alertas", icon: "⚠️", label: "Alertas" },
    { key: "robot", icon: "🤖", label: "Control Robot" },
  ];

  return (
    <nav
      className={`cultiva-earth-main p-4 space-y-2 md:w-64 md:min-h-screen ${
        sidebarOpen ? "block" : "hidden"
      } md:block`}
    >
      {navItems.map((item) => (
        <button
          key={item.key}
          className={`nav-button w-full text-left btn btn-nav ${
            currentPage === item.key ? "active" : ""
          }`}
          onClick={() => onNav(item.key)}
        >
          {item.icon} {item.label}
        </button>
      ))}
    </nav>
  );
}