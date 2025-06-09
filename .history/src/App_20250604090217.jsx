import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

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





App.jsx:32 Uncaught ReferenceError: Chart is not defined
    at App (App.jsx:32:16)
    at react-stack-bottom-frame (react-dom_client.js?v=c2dadc9f:17424:20)
    at renderWithHooks (react-dom_client.js?v=c2dadc9f:4206:24)
    at updateFunctionComponent (react-dom_client.js?v=c2dadc9f:6619:21)
    at beginWork (react-dom_client.js?v=c2dadc9f:7654:20)
    at runWithFiberInDEV (react-dom_client.js?v=c2dadc9f:1485:72)
    at performUnitOfWork (react-dom_client.js?v=c2dadc9f:10868:98)
    at workLoopSync (react-dom_client.js?v=c2dadc9f:10728:43)
    at renderRootSync (react-dom_client.js?v=c2dadc9f:10711:13)
    at performWorkOnRoot (react-dom_client.js?v=c2dadc9f:10359:46)Understand this error
react-dom_client.js?v=c2dadc9f:6229 An error occurred in the <App> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.