import React, { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "¿Cómo puedo ayudarte?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");

    // Simulación de respuesta automática (reemplaza con tu API)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Recibí tu mensaje: " + userMessage.text }
      ]);
    }, 1000);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white p-4 rounded-lg shadow-lg chatbot-container flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2 max-h-64">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.from === "user" ? "text-right text-blue-600" : "text-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l px-2 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Escribe tu mensaje..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r"
          onClick={handleSend}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
