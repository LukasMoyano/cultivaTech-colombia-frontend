// Importa PropTypes para validar los tipos de las props que recibe el componente.
import PropTypes from "prop-types";

// Importa los componentes hijos que se mostrarán según la página actual.
import IngresoRegistro from "./IngresoRegistro";
import Dashboard from "./Dashboard";
import Cultivos from "./Cultivos";
import Alertas from "./Alertas";
import Robot from "./Robot";
import LandingPage from "./LandingPage";
import JuegosIA from "./JuegosIA";
import CultivoDetailView from "./cultivos/CultivoDetailView";

// Componente principal que renderiza el contenido central de la aplicación.
// Recibe dos props:
// - currentPage: indica qué sección/página debe mostrarse.
// - setCurrentPage: función para cambiar la página actual.
export default function MainContent({ currentPage, setCurrentPage }) {
  return (
    // El main ocupa el espacio principal y aplica un fondo personalizado.
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
      {/* Página de presentación inicial */}
      {currentPage === "landing" && (
        <LandingPage setCurrentPage={setCurrentPage} />
      )}

      {/* Si la página actual es "ingreso", muestra el componente de ingreso/registro.
          Le pasa la función setCurrentPage para poder cambiar de página desde ese componente. */}

      {currentPage === "ingreso" && (
        <IngresoRegistro setCurrentPage={setCurrentPage} />
      )}

      {/* Si la página actual es "dashboard", muestra el dashboard principal.
          También recibe setCurrentPage para navegación interna. */}

      {currentPage === "dashboard" && (
        <Dashboard setCurrentPage={setCurrentPage} />
      )}

      {/* Si la página actual es "cultivos", muestra el componente Cultivos.
          Este componente debería permitir seleccionar un cultivo específico.
          También recibe setCurrentPage para navegación. */}

      {currentPage === "cultivos" && (
        <Cultivos setCurrentPage={setCurrentPage} />
      )}

      {/* Si la página actual es "alertas", muestra el componente de alertas.
          Recibe setCurrentPage para navegación desde las alertas. */}
      {currentPage === "alertas" && <Alertas setCurrentPage={setCurrentPage} />}


      {
      }

      {/* Si la página actual es "robot", muestra el componente del robot.
          Recibe setCurrentPage para navegación desde el control del robot. */}
      {currentPage === "robot" && <Robot setCurrentPage={setCurrentPage} />}

      {/* Página de juegos IA colaborativa */}
      {currentPage === "juegos" && (
        <JuegosIA setCurrentPage={setCurrentPage} />
      )}
    </main>
  );
}

// Define los tipos de las props para asegurar que se usen correctamente.
// currentPage debe ser un string y es obligatorio.
// setCurrentPage debe ser una función y es obligatoria.
MainContent.propTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};