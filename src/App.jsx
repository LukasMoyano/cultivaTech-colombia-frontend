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
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useTheme(); // Activa el hook del tema

  const handleNav = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    handleNav("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    handleNav("landing");
  };

  const isAuthenticated = user !== null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        onMobileMenuClick={() => setSidebarOpen(!sidebarOpen)}
        isAuthenticated={isAuthenticated}
        currentPage={currentPage}
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
            onNav={handleNav}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
        
        {currentPage === 'ingreso' && !isAuthenticated ? (
          <IngresoRegistro onLoginSuccess={handleLoginSuccess} />
        ) : (
          <MainContent 
            currentPage={currentPage} 
            setCurrentPage={handleNav} 
            isAuthenticated={isAuthenticated}
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

