import React, { useState, useRef, useEffect } from "react";

/**
 * ChatBot Mejorado
 * ----------------
 * - Ícono flotante y movible (drag & drop) con Tailwind.
 * - El chat solo se muestra cuando el usuario hace clic en el ícono.
 * - Historial persistente en localStorage por usuario.
 * - Estilos modernos y claros usando solo Tailwind.
 */

// Cambia esto por el ID real del usuario si tienes autenticación
const USER_ID = "usuario-demo";

// Utilidades para historial persistente
function getHistory() {
  try {
    const data = localStorage.getItem(`chatbot-history-${USER_ID}`);
    return data
      ? JSON.parse(data)
      : [{ from: "bot", text: "¿Cómo puedo ayudarte?" }];
  } catch {
    return [{ from: "bot", text: "¿Cómo puedo ayudarte?" }];
  }
}
function saveHistory(history) {
  localStorage.setItem(`chatbot-history-${USER_ID}`, JSON.stringify(history));
}

function ChatBot() {
  // Estado para mostrar/ocultar el chat
  const [open, setOpen] = useState(false);
  // Estado para los mensajes (historial)
  const [messages, setMessages] = useState(getHistory());
  // Estado para el input de texto
  const [input, setInput] = useState("");
  // Estado para la posición flotante del ícono
  const [iconPos, setIconPos] = useState({ x: 24, y: 24 });
  // Estado para saber si se está arrastrando el ícono
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  // Ref para el área de mensajes (autoscroll)
  const messagesEndRef = useRef(null);

  // Guarda historial y autoscroll
  useEffect(() => {
    saveHistory(messages);
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Enviar mensaje
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Recibí tu mensaje: " + userMessage.text },
      ]);
    }, 1000);
  };

  // Permite enviar con Enter
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Drag & drop para el ícono flotante
  const handleMouseDown = (e) => {
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - iconPos.x,
      y: e.clientY - iconPos.y,
    };
    document.body.style.userSelect = "none";
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
    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = "";
    };
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, iconPos]);

  // Renderizado
  return (
    <>
      {/* Ícono flotante y movible */}
      {!open && (
        <div
          style={{
            position: "fixed",
            bottom: iconPos.y,
            right: iconPos.x,
            zIndex: 50,
            cursor: dragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={() => setOpen(true)}
          onClick={() => setOpen(true)}
          title="Abrir ChatBot"
        >
          <div className="bg-gradient-to-br from-blue-500 to-green-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white hover:scale-105 transition-all">
            {/* Ícono SVG simple y amigable */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#fff" />
              <ellipse cx="18" cy="20" rx="10" ry="7" fill="#60a5fa" />
              <ellipse cx="18" cy="16" rx="7" ry="5" fill="#34d399" />
              <circle cx="14" cy="18" r="2" fill="#fff" />
              <circle cx="22" cy="18" r="2" fill="#fff" />
              <rect x="15" y="22" width="6" height="2" rx="1" fill="#fff" />
            </svg>
          </div>
        </div>
      )}

      {/* Ventana del chat */}
      {open && (
        <div
          className="fixed bottom-6 right-6 w-80 max-w-full bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col chatbot-container animate-fade-in"
          style={{ zIndex: 100 }}
        >
          {/* Barra superior */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold text-lg text-blue-600">
              <span>🤖</span> CultivaBot
            </div>
            <button
              className="text-gray-400 hover:text-red-500 text-xl font-bold px-2"
              onClick={() => setOpen(false)}
              title="Cerrar"
            >
              ×
            </button>
          </div>
          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto mb-3 max-h-72 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 pr-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[80%] break-words shadow-sm ${
                    msg.from === "user"
                      ? "bg-gradient-to-br from-blue-500 to-green-400 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input y botón para enviar */}
          <div className="flex mt-2">
            <input
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Escribe tu mensaje..."
            />
            <button
              className="bg-gradient-to-br from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white px-5 py-2 rounded-r-lg font-semibold transition"
              onClick={handleSend}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
      {/* Animación simple para la ventana */}
      <style>{`
        .animate-fade-in {
          animation: fadeInChat 0.25s;
        }
        @keyframes fadeInChat {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
}

export default ChatBot;

/**
 * Resumen de integración:
 * - Este componente se muestra en todas las páginas de la app (se importa en App.jsx).
 * - Permite al usuario interactuar con un bot simulado.
 * - El estado de los mensajes es local y no se guarda al recargar.
 * - Para producción, se puede conectar a una API real de chatbot.
 */
