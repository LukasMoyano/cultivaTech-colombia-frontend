import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Bar } from 'react-chartjs-2';

function App() {
  const [currentPage, setCurrentPage] = useState("ingreso"); // "ingreso" o "dashboard"
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Cierra sidebar móvil
    window.scrollTo(0, 0); // Subir al top al navegar
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMobileMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          currentPage={currentPage}
          onNav={handleNav}
          sidebarOpen={sidebarOpen}
        />
        <MainContent currentPage={currentPage} setCurrentPage={handleNav} />
      </div>

      <iframe src="https://chat.openai.com/chat" frameborder="0">
        <div className="chatbot-container">
      import { Chart } from "ChatBot.js";
          <ChatBot />
        </div>
      </iframe>

      <Footer />
    </div>
  );
}

export default App;