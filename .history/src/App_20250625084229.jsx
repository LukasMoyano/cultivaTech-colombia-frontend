import React, { useState } from "react";
// Importa los componentes principales de la app
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

// Importa y registra los módulos de Chart.js para gráficos
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function App() {
  // Estado para la página actual ("ingreso" o "dashboard")
  const [currentPage, setCurrentPage] = useState("ingreso");
  // Estado para controlar si el sidebar está abierto (en móvil)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Maneja la navegación entre páginas y cierra el sidebar en móvil
  const handleNav = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Cierra sidebar móvil
    window.scrollTo(0, 0); // Sube al top al navegar
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header mejorado con navegación completa */}
      <Header
        onMobileMenuClick={() => setSidebarOpen(!sidebarOpen)}
        isAuthenticated={currentPage !== "ingreso"}
        currentPage={currentPage}
        onNav={handleNav}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar de navegación, recibe el estado y función de navegación */}
        <Sidebar
          currentPage={currentPage}
          onNav={handleNav}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Contenido principal, cambia según la página actual */}
        <MainContent currentPage={currentPage} setCurrentPage={handleNav} />
      </div>
      {/* Chatbot fijo en la interfaz */}
      <div className="chatbot-container">
        <ChatBot />
      </div>
      {/* Footer fijo abajo */}
      <Footer />
    </div>
  );
}

export default App;