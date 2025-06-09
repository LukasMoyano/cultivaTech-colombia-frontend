import React from "react";

function ChatBot() {
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white p-4 rounded-lg shadow-lg chatbot-container">
      <div className="text-gray-700 chatbot-message">
        ¿Cómo puedo ayudarte?
      </div>
      {/* Aquí podrías agregar un input y la lista de mensajes */}
    </div>
  );
}

export default ChatBot;
