// Importa las dependencias necesarias de React: useState para el estado, useRef para referencias a elementos del DOM y useEffect para efectos secundarios.
import React, { useState, useRef, useEffect } from "react";

/**
 * ChatBot Mejorado
 * ----------------
 * Este componente implementa una ventana de chat flotante y movible.
 * - Ícono flotante y movible (drag & drop) con Tailwind.
 * - El chat solo se muestra cuando el usuario hace clic en el ícono.
 * - Historial persistente en localStorage por usuario.
 * - Estilos modernos y claros usando solo Tailwind.
 */

// Constante para identificar al usuario. En una aplicación real, esto debería ser dinámico
// y provenir de un sistema de autenticación (por ejemplo, el ID del usuario logueado).
const USER_ID = "usuario-demo";

/**
 * Obtiene el historial de chat del localStorage para el usuario actual.
 * Si no hay historial, devuelve un mensaje de bienvenida inicial del bot.
 * @returns {Array} El historial de mensajes.
 */
function getHistory() {
  try {
    // Intenta obtener los datos del localStorage.
    const data = localStorage.getItem(`chatbot-history-${USER_ID}`);
    // Si existen datos, los parsea desde JSON. Si no, devuelve el mensaje inicial.
    return data
      ? JSON.parse(data)
      : [{ from: "bot", text: "¿Cómo puedo ayudarte?" }];
  } catch {
    // Si hay un error (ej. JSON malformado), devuelve el mensaje inicial como fallback.
    return [{ from: "bot", text: "¿Cómo puedo ayudarte?" }];
  }
}
/**
 * Guarda el historial de chat actual en el localStorage.
 * @param {Array} history - El array de mensajes a guardar.
 */
function saveHistory(history) {
  localStorage.setItem(`chatbot-history-${USER_ID}`, JSON.stringify(history));
}

function ChatBot() {
  // Estado para controlar la visibilidad de la ventana del chat.
  const [open, setOpen] = useState(false);
  // Estado para almacenar los mensajes del chat. Se inicializa con el historial guardado.
  const [messages, setMessages] = useState(getHistory());
  // Estado para el valor del campo de entrada de texto del usuario.
  const [input, setInput] = useState("");
  // Estado para la posición (x, y) del ícono flotante del chatbot.
  const [iconPos, setIconPos] = useState({ x: 24, y: 24 });
  // Estado para saber si el usuario está actualmente arrastrando el ícono.
  const [dragging, setDragging] = useState(false);
  // Ref para almacenar el desfase entre el clic del mouse y la esquina del ícono durante el arrastre.
  const dragOffset = useRef({ x: 0, y: 0 });
  // Ref para apuntar al final del contenedor de mensajes, para hacer autoscroll.
  const messagesEndRef = useRef(null);

  // Efecto que se ejecuta cada vez que el array de `messages` cambia.
  useEffect(() => {
    // Guarda el historial actualizado en el localStorage.
    saveHistory(messages);
    // Si la referencia al final de los mensajes existe, hace scroll suave hacia abajo.
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /**
   * Maneja el envío de un mensaje del usuario.
   */
  const handleSend = async () => {
    // No hace nada si el input está vacío o solo contiene espacios.
    if (!input.trim()) return;
    // Crea el objeto del mensaje del usuario.
    const userMessage = { from: "user", text: input };
    // Añade el mensaje del usuario al estado de mensajes.
    setMessages((msgs) => [...msgs, userMessage]);
    // Limpia el campo de entrada.
    setInput("");
    // Simula una respuesta del bot después de 1 segundo.
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Recibí tu mensaje: " + userMessage.text },
      ]);
    }, 1000);
  };

  /**
   * Maneja el evento de presionar una tecla en el input.
   * Si la tecla es "Enter", llama a handleSend.
   * @param {React.KeyboardEvent} e - El evento de teclado.
   */
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  /**
   * Inicia el proceso de arrastre del ícono del chatbot.
   * @param {React.MouseEvent} e - El evento del mouse.
   */
  const handleMouseDown = (e) => {
    setDragging(true);
    // Calcula y guarda la diferencia entre la posición del mouse y la del ícono.
    dragOffset.current = {
      x: e.clientX - iconPos.x,
      y: e.clientY - iconPos.y,
    };
    // Evita la selección de texto en la página mientras se arrastra.
    document.body.style.userSelect = "none";
  };

  // Efecto para manejar la lógica de arrastrar y soltar (drag & drop).
  useEffect(() => {
    /**
     * Actualiza la posición del ícono mientras se arrastra.
     * @param {MouseEvent} e - El evento del mouse.
     */
    const handleMouseMove = (e) => {
      if (dragging) {
        // Actualiza la posición del ícono, asegurándose de que no se salga de la pantalla.
        setIconPos({
          x: Math.max(0, e.clientX - dragOffset.current.x),
          y: Math.max(0, e.clientY - dragOffset.current.y),
        });
      }
    };

    /**
     * Finaliza el proceso de arrastre.
     */
    const handleMouseUp = () => {
      setDragging(false);
      // Restaura la selección de texto.
      document.body.style.userSelect = "";
    };

    // Si se está arrastrando, añade los listeners para mover y soltar.
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Función de limpieza: elimina los listeners cuando el componente se desmonta o el estado de `dragging` cambia.
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, iconPos]);

  // Renderizado del componente.
  return (
    <>
      {/* Renderizado condicional: Muestra el ícono flotante solo si la ventana del chat está cerrada. */}
      {!open && (
        <div
          style={{
            // Estilos en línea para posicionar el ícono dinámicamente.
            position: "fixed",
            bottom: iconPos.y,
            right: iconPos.x,
            zIndex: 50,
            cursor: dragging ? "grabbing" : "grab",
          }}
          // Eventos para manejar el drag & drop y la apertura del chat.
          onMouseDown={handleMouseDown}
          onDoubleClick={() => setOpen(true)}
          onClick={() => setOpen(true)}
          title="Abrir ChatBot"
        >
          <div className="bg-gradient-to-br from-blue-500 to-green-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white hover:scale-105 transition-all">
            {/* Ícono SVG simple y amigable que representa al bot. */}
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

      {/* Renderizado condicional: Muestra la ventana del chat solo si está abierta. */}
      {open && (
        <div
          className="fixed bottom-6 right-6 w-80 max-w-full bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col chatbot-container animate-fade-in"
          style={{ zIndex: 100 }}
        >
          {/* Barra superior de la ventana del chat con título y botón de cierre. */}
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
          {/* Área de mensajes con scroll. */}
          <div className="flex-1 overflow-y-auto mb-3 max-h-72 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 pr-1">
            {/* Mapea y renderiza cada mensaje en el historial. */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                // Alinea los mensajes del usuario a la derecha y los del bot a la izquierda.
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  // Estilos de la burbuja del mensaje, con colores diferentes para el usuario y el bot.
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
            {/* Elemento vacío al final para que el autoscroll funcione correctamente. */}
            <div ref={messagesEndRef} />
          </div>
          {/* Campo de entrada de texto y botón de envío. */}
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
      {/* Estilos CSS en línea para definir una animación simple de aparición para la ventana del chat. */}
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
