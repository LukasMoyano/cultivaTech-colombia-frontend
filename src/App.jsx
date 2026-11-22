import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import IngresoRegistro from "./components/IngresoRegistro";
import { Chart, registerables } from 'chart.js';
import { useTheme } from "./hooks/useTheme"; // Importa el hook del tema

Chart.register(...registerables);

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState("agricultor");
  const [participacionDemo, setParticipacionDemo] = useState({
    montoCop: 1200000,
    participaciones: 10,
    porcentajeLote: 10,
    txHash: null,
    confirmado: false,
  });
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const { theme, toggleTheme } = useTheme(); // Activa el hook del tema

  const handleNav = (page, nextModule = null) => {
    if (nextModule) {
      setActiveModule(nextModule);
    } else if (page.startsWith("inversion_")) {
      setActiveModule("inversionista");
    } else if (["dashboard", "telemetria", "cultivos", "foro", "alertas", "robot"].includes(page)) {
      setActiveModule("agricultor");
    }
    setCurrentPage(page === "juegos" ? "dashboard" : page);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (authResponse) => {
    const loggedUser = authResponse?.user || authResponse;
    setUser(loggedUser);
    const defaultModule = loggedUser?.role === "investor" ? "inversionista" : "agricultor";
    setActiveModule(defaultModule);
    handleNav(defaultModule === "inversionista" ? "inversion_oferta" : "dashboard", defaultModule);
  };

  const handleEnterDemo = (targetModule = "inversionista", targetPage = null) => {
    setUser({
      id: 0,
      email: "jurado-demo@cultivatech.local",
      role: "demo",
      isDemo: true,
    });
    const moduleResolved = targetModule === "agricultor" ? "agricultor" : "inversionista";
    const pageResolved =
      targetPage || (moduleResolved === "agricultor" ? "dashboard" : "inversion_oferta");
    handleNav(pageResolved, moduleResolved);
  };

  const handleSwitchModule = (targetModule) => {
    const mod = targetModule === "inversionista" ? "inversionista" : "agricultor";
    handleNav(mod === "inversionista" ? "inversion_oferta" : "dashboard", mod);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setActiveModule("agricultor");
    handleNav("landing");
  };

  const isAuthenticated = user !== null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        onMobileMenuClick={() => setSidebarOpen(!sidebarOpen)}
        isAuthenticated={isAuthenticated}
        currentPage={currentPage}
        activeModule={activeModule}
        onSwitchModule={handleSwitchModule}
        onNav={handleNav}
        sidebarOpen={sidebarOpen}
        user={user}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme} // Pasa la función para cambiar el tema
      />
      <div className="flex flex-1 flex-col lg:flex-row">
        {isAuthenticated && (
          <Sidebar
            currentPage={currentPage}
            activeModule={activeModule}
            onSwitchModule={handleSwitchModule}
            onNav={handleNav}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onLogout={handleLogout}
            user={user}
          />
        )}

        {currentPage === 'ingreso' && !isAuthenticated ? (
          <IngresoRegistro onLoginSuccess={handleLoginSuccess} setCurrentPage={handleNav} />
        ) : (
          <MainContent
            currentPage={currentPage}
            setCurrentPage={handleNav}
            isAuthenticated={isAuthenticated}
            activeModule={activeModule}
            onEnterDemo={handleEnterDemo}
            participacionDemo={participacionDemo}
            onConfirmarParticipacion={setParticipacionDemo}
          />
        )}
      </div>
      
      {isAuthenticated && (
        <>
          <div className="chatbot-container">
            <ChatBot />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

