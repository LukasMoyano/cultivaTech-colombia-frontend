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
    <div className="fixed bottom-6 right-6 w-80 max-w-full bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col chatbot-container">
      <div className="flex-1 overflow-y-auto mb-3 max-h-72 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
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
