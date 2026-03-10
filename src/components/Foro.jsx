import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Foro de Agricultores - CultivaTech ColombIA
 * Permite a los usuarios publicar ofertas comerciales o dudas técnicas.
 */
const Foro = ({ setCurrentPage }) => {
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      usuario: "Don Alberto",
      tipo: "Venta",
      titulo: "Semillas de Tomate Chonto certificadas",
      contenido: "Tengo disponible un excedente de semillas de excelente calidad. Ideales para clima medio.",
      fecha: "Hace 2 horas",
      likes: 5,
      comentarios: 2
    },
    {
      id: 2,
      usuario: "María Agro",
      tipo: "Pregunta",
      titulo: "¿Cómo combatir la roya en el café orgánico?",
      contenido: "He notado unas manchas naranjas en mis arbustos. ¿Alguien tiene un remedio natural efectivo?",
      fecha: "Hace 5 horas",
      likes: 12,
      comentarios: 8
    }
  ]);

  const [nuevaPub, setNuevaPub] = useState({ titulo: "", contenido: "", tipo: "Pregunta" });

  const handlePublicar = (e) => {
    e.preventDefault();
    if (!nuevaPub.titulo || !nuevaPub.contenido) return;
    
    const pub = {
      id: Date.now(),
      usuario: "Tú (Usuario)",
      tipo: nuevaPub.tipo,
      titulo: nuevaPub.titulo,
      contenido: nuevaPub.contenido,
      fecha: "Ahora mismo",
      likes: 0,
      comentarios: 0
    };
    
    setPublicaciones([pub, ...publicaciones]);
    setNuevaPub({ titulo: "", contenido: "", tipo: "Pregunta" });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-text-accent mb-2 font-heading">
          FORO DE AGRICULTORES
        </h1>
        <div className="w-24 h-1 bg-primary rounded-full"></div>
        <p className="mt-4 text-text-main text-lg italic">
          "Soberanía alimentaria a través del conocimiento compartido."
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Formulario de Nueva Publicación */}
        <section className="lg:col-span-1">
          <div className="bg-background-card border-2 border-primary/30 p-6 rounded-2xl shadow-lg sticky top-24">
            <h2 className="text-xl font-bold text-text-accent mb-4 font-heading flex items-center">
              <span className="mr-2">📝</span> CREAR PUBLICACIÓN
            </h2>
            <form onSubmit={handlePublicar} className="space-y-4">
              <div>
                <label className="block text-xs text-text-main/70 mb-1 uppercase font-bold">Tipo</label>
                <select 
                  value={nuevaPub.tipo}
                  onChange={(e) => setNuevaPub({...nuevaPub, tipo: e.target.value})}
                  className="w-full bg-background border border-border p-2 rounded-lg text-text-main"
                >
                  <option value="Pregunta">❓ Pregunta / Duda</option>
                  <option value="Venta">💰 Oferta Comercial</option>
                  <option value="Noticia">📢 Noticia Local</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-main/70 mb-1 uppercase font-bold">Título</label>
                <input 
                  type="text"
                  value={nuevaPub.titulo}
                  onChange={(e) => setNuevaPub({...nuevaPub, titulo: e.target.value})}
                  placeholder="Ej: Busco tractor en Fusa"
                  className="w-full bg-background border border-border p-2 rounded-lg text-text-main"
                />
              </div>
              <div>
                <label className="block text-xs text-text-main/70 mb-1 uppercase font-bold">Contenido</label>
                <textarea 
                  value={nuevaPub.contenido}
                  onChange={(e) => setNuevaPub({...nuevaPub, contenido: e.target.value})}
                  rows="4"
                  placeholder="Describe tu situación..."
                  className="w-full bg-background border border-border p-2 rounded-lg text-text-main"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark shadow-button transition-all active:scale-95"
              >
                PUBLICAR EN EL FORO
              </button>
            </form>
          </div>
        </section>

        {/* Columna Derecha: Feed de Publicaciones */}
        <section className="lg:col-span-2 space-y-6">
          {publicaciones.map((pub) => (
            <article 
              key={pub.id} 
              className="bg-background-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-xl">
                    {pub.usuario[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main">{pub.usuario}</h4>
                    <span className="text-[10px] text-text-main/50 uppercase">{pub.fecha}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  pub.tipo === 'Venta' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {pub.tipo}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-text-accent mb-2 font-heading">{pub.titulo}</h3>
              <p className="text-text-main/80 mb-4 leading-relaxed">{pub.contenido}</p>
              
              <div className="flex gap-6 border-t border-border pt-4">
                <button className="flex items-center gap-2 text-xs text-text-main hover:text-primary transition-colors">
                  <span>👍</span> {pub.likes} Me gusta
                </button>
                <button className="flex items-center gap-2 text-xs text-text-main hover:text-primary transition-colors">
                  <span>💬</span> {pub.comentarios} Comentarios
                </button>
                <button className="flex items-center gap-2 text-xs text-text-main hover:text-primary transition-colors ml-auto">
                  <span>🔗</span> Compartir
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

Foro.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Foro;
