import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Componente de Juegos IA Colaborativa
 * Tres videojuegos para entrenar el modelo de IA mediante interacción del usuario
 */
export default function JuegosIA({ setCurrentPage }) {
  const [juegoActivo, setJuegoActivo] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [preguntasRespondidas, setPreguntasRespondidas] = useState(0);

  const juegos = [
    {
      id: "detector_plagas",
      titulo: "🐛 Detector de Plagas",
      descripcion: "Ayuda a la IA a identificar plagas en imágenes de cultivos",
      color: "bg-primary",
      icono: "🔍",
      dificultad: "Principiante"
    },
    {
      id: "clima_predictor", 
      titulo: "🌤️ Predictor Climático",
      descripcion: "Entrena el modelo para predecir condiciones climáticas óptimas",
      color: "bg-secondary",
      icono: "🌡️",
      dificultad: "Intermedio"
    },
    {
      id: "optimizador_riego",
      titulo: "💧 Optimizador de Riego", 
      descripcion: "Enseña a la IA cuándo y cuánto regar según las condiciones",
      color: "bg-accent",
      icono: "🚿",
      dificultad: "Avanzado"
    }
  ];

  // Componente del juego Detector de Plagas
  const DetectorPlagas = () => {
    const [imagenActual, setImagenActual] = useState(0);
    const [respuestaUsuario, setRespuestaUsuario] = useState("");

    const imagenes = [
      {
        url: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400",
        pregunta: "¿Observas signos de plaga en esta hoja?",
        opciones: ["Sí, hay áfidos", "No, está saludable", "Posible hongo", "Necesito más información"],
        respuestaCorrecta: 1
      },
      {
        url: "https://images.pexels.com/photos/1459506/pexels-photo-1459506.jpeg?auto=compress&cs=tinysrgb&w=400", 
        pregunta: "¿Qué tipo de daño observas?",
        opciones: ["Daño por insectos", "Deficiencia nutricional", "Quemadura solar", "Planta saludable"],
        respuestaCorrecta: 0
      }
    ];

    const handleRespuesta = (opcionIndex) => {
      const esCorrecta = opcionIndex === imagenes[imagenActual].respuestaCorrecta;
      if (esCorrecta) {
        setPuntuacion(prev => prev + 10);
      }
      setPreguntasRespondidas(prev => prev + 1);
      
      // Simular envío de datos a la IA
      console.log("Datos enviados a IA:", {
        imagen: imagenes[imagenActual].url,
        respuestaUsuario: imagenes[imagenActual].opciones[opcionIndex],
        esCorrecta
      });

      // Siguiente imagen
      if (imagenActual < imagenes.length - 1) {
        setImagenActual(prev => prev + 1);
      } else {
        alert(`¡Juego completado! Puntuación: ${puntuacion + (esCorrecta ? 10 : 0)}`);
        setJuegoActivo(null);
        setImagenActual(0);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold font-heading text-text-accent mb-2">🐛 Detector de Plagas</h3>
          <p className="text-text-main/80">Pregunta {imagenActual + 1} de {imagenes.length}</p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="text-sm bg-primary/20 text-text-accent px-3 py-1 rounded-full font-heading">
              Puntuación: {puntuacion}
            </span>
            <span className="text-sm bg-secondary/20 text-text-accent px-3 py-1 rounded-full font-heading">
              Respondidas: {preguntasRespondidas}
            </span>
          </div>
        </div>

        <div className="bg-background-card border border-border rounded-lg p-6 shadow-md">
          <img 
            src={imagenes[imagenActual].url}
            alt="Imagen de cultivo para análisis"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-semibold font-heading text-text-accent mb-4 text-center">
            {imagenes[imagenActual].pregunta}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {imagenes[imagenActual].opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => handleRespuesta(index)}
                className="p-3 border border-border rounded-lg hover:bg-primary/10 hover:border-primary transition-all text-left text-text-main"
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Componente del juego Predictor Climático
  const PredictorClimatico = () => {
    const [escenario, setEscenario] = useState(0);

    const escenarios = [
      {
        condiciones: "Temperatura: 28°C, Humedad: 85%, Viento: 15 km/h",
        pregunta: "¿Cuál es la mejor acción para los tomates?",
        opciones: ["Regar abundantemente", "Reducir riego", "Aplicar sombra", "No hacer nada"],
        respuestaCorrecta: 2
      },
      {
        condiciones: "Temperatura: 18°C, Humedad: 45%, Lluvia pronosticada",
        pregunta: "¿Qué recomiendas para las fresas?",
        opciones: ["Suspender riego", "Riego normal", "Proteger de lluvia", "Fertilizar"],
        respuestaCorrecta: 0
      }
    ];

    const handleRespuesta = (opcionIndex) => {
      const esCorrecta = opcionIndex === escenarios[escenario].respuestaCorrecta;
      if (esCorrecta) {
        setPuntuacion(prev => prev + 15);
      }
      setPreguntasRespondidas(prev => prev + 1);

      if (escenario < escenarios.length - 1) {
        setEscenario(prev => prev + 1);
      } else {
        alert(`¡Predictor completado! Puntuación: ${puntuacion + (esCorrecta ? 15 : 0)}`);
        setJuegoActivo(null);
        setEscenario(0);
      }
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold font-heading text-text-accent mb-2">🌤️ Predictor Climático</h3>
          <p className="text-text-main/80">Escenario {escenario + 1} de {escenarios.length}</p>
        </div>

        <div className="bg-background-card border border-border rounded-lg p-6 shadow-md">
          <div className="bg-secondary/20 border border-secondary/30 p-4 rounded-lg mb-4">
            <h4 className="font-semibold font-heading text-text-accent mb-2">Condiciones Actuales:</h4>
            <p className="text-text-main">{escenarios[escenario].condiciones}</p>
          </div>
          
          <h4 className="text-lg font-semibold font-heading text-text-accent mb-4 text-center">
            {escenarios[escenario].pregunta}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {escenarios[escenario].opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => handleRespuesta(index)}
                className="p-3 border border-border rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all text-left text-text-main"
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Componente del juego Optimizador de Riego
  const OptimizadorRiego = () => {
    const [nivel, setNivel] = useState(1);
    const [aguaDisponible, setAguaDisponible] = useState(100);

    const niveles = [
      {
        cultivo: "Tomates",
        humedad: 35,
        temperatura: 25,
        etapaFenologica: "Floración",
        pregunta: "¿Cuánta agua aplicarías? (litros por m²)"
      },
      {
        cultivo: "Lechugas", 
        humedad: 60,
        temperatura: 22,
        etapaFenologica: "Crecimiento",
        pregunta: "¿Cuánta agua aplicarías? (litros por m²)"
      }
    ];

    const handleRiego = (cantidad) => {
      if (cantidad > aguaDisponible) {
        alert("No tienes suficiente agua disponible!");
        return;
      }

      const nivelActual = niveles[nivel - 1];
      let puntos = 0;
      
      // Lógica de puntuación basada en condiciones
      if (nivelActual.humedad < 40 && cantidad >= 5) puntos += 20;
      if (nivelActual.temperatura > 30 && cantidad >= 3) puntos += 15;
      if (cantidad <= aguaDisponible * 0.3) puntos += 10; // Eficiencia

      setPuntuacion(prev => prev + puntos);
      setAguaDisponible(prev => prev - cantidad);
      setPreguntasRespondidas(prev => prev + 1);

      if (nivel < niveles.length) {
        setNivel(prev => prev + 1);
      } else {
        alert(`¡Optimización completada! Puntuación final: ${puntuacion + puntos}`);
        setJuegoActivo(null);
        setNivel(1);
        setAguaDisponible(100);
      }
    };

    const nivelActual = niveles[nivel - 1];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold font-heading text-text-accent mb-2">💧 Optimizador de Riego</h3>
          <p className="text-text-main/80">Nivel {nivel} de {niveles.length}</p>
          <p className="text-sm text-accent font-heading">Agua disponible: {aguaDisponible}L</p>
        </div>

        <div className="bg-background-card border border-border rounded-lg p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/20 border border-primary/30 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🌱</div>
              <p className="font-semibold font-heading text-text-accent">{nivelActual.cultivo}</p>
              <p className="text-sm text-text-main/80">{nivelActual.etapaFenologica}</p>
            </div>
            <div className="bg-secondary/20 border border-secondary/30 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">💧</div>
              <p className="font-semibold font-heading text-text-accent">Humedad: {nivelActual.humedad}%</p>
              <p className="text-sm text-text-main/80">Suelo</p>
            </div>
            <div className="bg-accent/20 border border-accent/30 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🌡️</div>
              <p className="font-semibold font-heading text-text-accent">Temp: {nivelActual.temperatura}°C</p>
              <p className="text-sm text-text-main/80">Ambiente</p>
            </div>
          </div>

          <h4 className="text-lg font-semibold font-heading text-text-accent mb-4 text-center">
            {nivelActual.pregunta}
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[2, 5, 8, 12].map(cantidad => (
              <button
                key={cantidad}
                onClick={() => handleRiego(cantidad)}
                disabled={cantidad > aguaDisponible}
                className={`p-3 rounded-lg border transition-all ${
                  cantidad > aguaDisponible 
                    ? 'border-border text-text-main/50 cursor-not-allowed' 
                    : 'border-accent text-text-main hover:bg-accent/10'
                }`}
              >
                {cantidad}L/m²
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (juegoActivo) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setJuegoActivo(null)}
            className="border border-secondary text-secondary px-4 py-2 hover:bg-secondary/20 font-heading"
          >
            ← Volver a Juegos
          </button>
        </div>

        {juegoActivo === "detector_plagas" && <DetectorPlagas />}
        {juegoActivo === "clima_predictor" && <PredictorClimatico />}
        {juegoActivo === "optimizador_riego" && <OptimizadorRiego />}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold font-heading text-text-accent mb-4">
          🎮 Juegos IA Colaborativa
        </h2>
        <p className="text-text-main/90 max-w-3xl mx-auto cultivo-description">
          Ayuda a mejorar nuestro modelo de inteligencia artificial jugando. 
          Cada respuesta que das entrena a la IA para tomar mejores decisiones agrícolas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {juegos.map(juego => (
          <div
            key={juego.id}
            className="bg-background-card border border-border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className={`h-32 ${juego.color} flex items-center justify-center`}>
              <span className="text-6xl">{juego.icono}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold font-heading text-text-accent mb-2">{juego.titulo}</h3>
              <p className="text-text-main/80 mb-4 text-sm">{juego.descripcion}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs bg-background border border-border text-text-main px-2 py-1 rounded-full">
                  {juego.dificultad}
                </span>
                <span className="text-xs text-text-main/70">
                  +10-20 puntos
                </span>
              </div>
              <button
                onClick={() => setJuegoActivo(juego.id)}
                className={`w-full ${juego.color} text-text-accent py-3 px-4 rounded-lg hover:opacity-90 transition-all font-heading font-bold`}
              >
                🎮 Jugar Ahora
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas del usuario */}
      <div className="bg-background-card border border-border rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold font-heading text-text-accent mb-4 text-center">📊 Tus Estadísticas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary/20 border border-primary/30 rounded-lg">
            <div className="text-2xl font-bold font-heading text-text-accent">{puntuacion}</div>
            <p className="text-sm text-text-main/80">Puntos Totales</p>
          </div>
          <div className="text-center p-4 bg-secondary/20 border border-secondary/30 rounded-lg">
            <div className="text-2xl font-bold font-heading text-text-accent">{preguntasRespondidas}</div>
            <p className="text-sm text-text-main/80">Preguntas Respondidas</p>
          </div>
          <div className="text-center p-4 bg-accent/20 border border-accent/30 rounded-lg">
            <div className="text-2xl font-bold font-heading text-text-accent">
              {preguntasRespondidas > 0 ? Math.round((puntuacion / (preguntasRespondidas * 20)) * 100) : 0}%
            </div>
            <p className="text-sm text-text-main/80">Precisión</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentPage("dashboard")}
          className="border border-secondary text-secondary px-4 py-2 hover:bg-secondary/20 font-heading"
        >
          ← Volver al Dashboard
        </button>
      </div>
    </div>
  );
}

JuegosIA.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};