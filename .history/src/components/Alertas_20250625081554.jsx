import React from "react";

export default function AlertaCard({ alerta }) {
  return (
    <div className={`card flex items-start p-3 border-l-4 ${alerta.color}`}>
      <span className={`icon-placeholder text-2xl ${alerta.color} mr-3`}>
        {alerta.icon}
      </span>
      <div>
        <h3 className="font-semibold cultiva-text-main">{alerta.titulo}</h3>
        <p className="text-sm cultiva-text-secondary">{alerta.desc}</p>
        <p className="text-sm cultiva-text-main mt-1">{alerta.info}</p>
        <button className={alerta.btnClass}>{alerta.btn}</button>
      </div>
    </div>
  );
}
