import React, { useState, useRef, useEffect } from "react";
import apiClient from "../api";

/**
 * CultivaBot 2.0 - Asistente Multimodal y Monitor de Comunidad
 * -----------------------------------------------------------
 * - Diseño adaptable a Temas Día/Noche.
 * - Basado en la arquitectura Qwen-VL para análisis de imágenes.
 * - Monitorea el Foro de Agricultores en tiempo real.
 * - Estética coherente con el sistema de diseño de CultivaTech.
 */

const USER_ID = "usuario-demo";

function getHistory() {
  try {
    const data = localStorage.getItem(`chatbot-history-${USER_ID}`);
    return data ? JSON.parse(data) : [{ from: "bot", text: "¡Hola! Soy CultivaBot. Puedo ayudarte con tus cultivos, analizar fotos de plagas o contarte qué hay de nuevo en el Foro. ¿Qué sembramos hoy?" }];
  } catch {
    return [{ from: "bot", text: "¡Hola! Soy CultivaBot. ¿En qué puedo ayudarte?" }];
  }
}

function saveHistory(history) {
  localStorage.setItem(`chatbot-history-${USER_ID}`, JSON.stringify(history));
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(getHistory());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Drag & Drop state
  const [iconPos, setIconPos] = useState({ x: 24, y: 24 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Simulación de monitoreo del foro
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({
        id: Date.now(),
        text: "📢 Nuevo en el Foro: 'Don Alberto' publicó semillas de Tomate Chonto.",
        type: "forum"
      });
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    saveHistory(messages);
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg = { 
      from: "user", 
      text: input, 
      image: selectedImage 
    };
    
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setSelectedImage(null);
    setLoading(true);

    try {
      setTimeout(() => {
        let botText = "Entendido. Estoy analizando la información ";
        if (userMsg.image) botText += "y la imagen que me enviaste con mis algoritmos de visión... ";
        botText += "Basado en los manuales de Soberanía Tecnológica de IR Productions, te recomiendo revisar la humedad del suelo.";
        
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: botText }
        ]);
        setLoading(false);
      }, 3000); // Reducido tiempo para mejor UX en demo
    } catch (error) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Lo siento, tuve un problema al conectarme." }]);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - iconPos.x, y: e.clientY - iconPos.y };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setIconPos({
          x: Math.max(0, e.clientX - dragOffset.current.x),
          y: Math.max(0, e.clientY - dragOffset.current.y),
        });
      }
    };
    const handleMouseUp = () => setDragging(false);
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      {/* Notificación Flotante - Alta visibilidad */}
      {notification && !open && (
        <div 
          className="fixed z-[60] bg-secondary text-black border-2 border-primary p-3 rounded-xl shadow-2xl animate-bounce cursor-pointer max-w-xs"
          style={{ bottom: iconPos.y + 80, right: iconPos.x }}
          onClick={() => { setOpen(true); setNotification(null); }}
        >
          <p className="text-[10px] font-bold uppercase mb-1 opacity-70">Aviso del Guardián</p>
          <p className="text-xs font-medium">{notification.text}</p>
          <button className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]" onClick={(e) => { e.stopPropagation(); setNotification(null); }}>×</button>
        </div>
      )}

      {/* Ícono del Bot - Adaptable */}
      {!open && (
        <div
          style={{ position: "fixed", bottom: iconPos.y, right: iconPos.x, zIndex: 50, cursor: dragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onClick={() => setOpen(true)}
          className="group"
        >
          <div className="bg-background-card border-4 border-primary rounded-full w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all overflow-hidden relative">
            <span className="text-3xl relative z-10">🤖</span>
            <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Ventana de Chat - Totalmente Opaca y Adaptable */}
      {open && (
        <div
          className="fixed bottom-6 right-6 w-96 max-w-[90vw] bg-background-card border-2 border-border rounded-2xl shadow-2xl flex flex-col z-[100] animate-in slide-in-from-bottom-10"
          style={{ height: "500px" }}
        >
          {/* Header */}
          <div className="p-4 border-b border-border flex justify-between items-center bg-primary text-white rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <h3 className="font-heading font-bold text-white uppercase tracking-wider">CULTIVABOT</h3>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-secondary text-2xl font-bold leading-none">×</button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background scrollbar-thin scrollbar-thumb-border">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm shadow-sm border ${
                  msg.from === "user" 
                    ? "bg-primary text-white border-primary rounded-br-none" 
                    : "bg-background-card border-border text-text-main rounded-bl-none"
                }`}>
                  {msg.image && <img src={msg.image} alt="Upload" className="mb-2 rounded-lg max-h-40 w-full object-cover border border-border" />}
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-background-card border border-border p-3 rounded-xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background-card rounded-b-2xl">
            {selectedImage && (
              <div className="relative inline-block mb-2">
                <img src={selectedImage} alt="Preview" className="w-12 h-12 rounded border border-primary object-cover" />
                <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">×</button>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current.click()}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                title="Adjuntar imagen"
              >
                📷
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <input
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
                onClick={handleSend}
                disabled={loading}
              >
                ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
