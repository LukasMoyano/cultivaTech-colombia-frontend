import React, { useState } from "react";

/**
 * Componente ChatBot
 * ------------------
 * Este componente representa un chatbot simple que permite la interacción básica
 * entre el usuario y un bot simulado. Es ideal para integrarse como asistente virtual
 * en la aplicación, ayudando a los usuarios con preguntas frecuentes o soporte.
 * 
 * Estructura general:
 * - Ventana flotante fija en la esquina inferior derecha.
 * - Área de mensajes con scroll.
 * - Input de texto y botón para enviar mensajes.
 * 
 * Props: Ninguna. El estado es local y simulado.
 * 
 * Uso: Se importa y se renderiza en App.jsx, generalmente en todas las páginas,
 * para que el usuario siempre tenga acceso al asistente virtual.
 */

function ChatBot() {
  // Estado para almacenar los mensajes del chat (array de objetos {from, text})
  const [messages, setMessages] = useState([
    { from: "bot", text: "¿Cómo puedo ayudarte?" } // Mensaje inicial del bot
  ]);
  // Estado para el texto que el usuario está escribiendo
  const [input, setInput] = useState("");

  /**
   * handleSend
   * ----------
   * Función que se ejecuta cuando el usuario envía un mensaje.
   * - Agrega el mensaje del usuario al array de mensajes.
   * - Limpia el input.
   * - Simula una respuesta automática del bot después de 1 segundo.
   */
  const handleSend = async () => {
    if (!input.trim()) return; // No enviar si está vacío
    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]); // Agrega mensaje del usuario
    setInput(""); // Limpia el input

    // Simula respuesta del bot (en una app real aquí iría la llamada a la API)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Recibí tu mensaje: " + userMessage.text }
      ]);
    }, 1000);
  };

  /**
   * handleInputKeyDown
   * ------------------
   * Permite enviar el mensaje al presionar Enter en el input.
   */
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Renderizado del componente
  return (
    // Contenedor principal del chatbot, fijo en la esquina inferior derecha
    <div className="fixed bottom-6 right-6 w-80 max-w-full bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col chatbot-container">
      {/* Área de mensajes, con scroll si hay muchos mensajes */}
      <div className="flex-1 overflow-y-auto mb-3 max-h-72 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.map((msg, idx) => (
          // Cada mensaje se alinea a la derecha si es del usuario, a la izquierda si es del bot
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Burbuja de mensaje, con estilos diferentes para usuario y bot */}
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] break-words ${
                msg.from === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input y botón para enviar mensajes */}
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-r-lg font-semibold transition"
          onClick={handleSend}
        >
          Enviar
        </button>
      </div>
    </div>
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
