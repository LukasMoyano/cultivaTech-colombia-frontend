import React from "react";

function RobotStatus({ isConnected }) {
  return (
    <div className={`p-2 rounded ${isConnected ? "bg-green-200" : "bg-red-200"}`}>
      <span>
        Estado del robot:{" "}
        <strong>{isConnected ? "Conectado" : "Desconectado"}</strong>
      </span>
    </div>
  );
}

export default RobotStatus;