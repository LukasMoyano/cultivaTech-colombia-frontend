import PropTypes from "prop-types";
import IngresoRegistro from "./IngresoRegistro";
import Dashboard from "./Dashboard";
import Cultivos from "./Cultivos";
import Alertas from "./Alertas";
import Robot from "./Robot";

export default function MainContent({ currentPage, setCurrentPage }) {
  return (
    <main className="flex-1 cultiva-bg-light">
      {currentPage === "ingreso" && (
        <IngresoRegistro setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "dashboard" && (
        <Dashboard setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "cultivos" && (
        <Cultivos setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "alertas" && <Alertas />}
      {currentPage === "robot" && <Robot />}
    </main>
  );
}

MainContent.propTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};