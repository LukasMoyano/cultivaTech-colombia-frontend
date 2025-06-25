import React from "react";

const Dashboard = () => {

    return (
        <div className="dashboard-container">
            {/* Otras secciones del dashboard pueden ir aquí */}

            {/* Sección de Alertas y Recomendaciones */}
            <div className="card">
                <div className="card-header flex flex-col items-start">
                    <span className="icon-placeholder">💡</span> Alertas y Recomendaciones (Hoy)
                    <ul className="space-y-3 w-full mt-2">
                        <li className="flex items-start p-2 rounded-md hover:bg-yellow-50 border border-transparent hover:border-yellow-300">
                            <span className="icon-placeholder text-yellow-500">💧</span>
                            <div>
                                <span className="font-semibold cultiva-text-main">
                                    Riego Necesario Sector A
                                </span>
                                <p className="text-sm cultiva-text-secondary">
                                    Humedad del suelo baja (35%).
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start p-2 rounded-md hover:bg-red-50 border border-transparent hover:border-red-300">
                            <span className="icon-placeholder text-red-600">🐞</span>
                            <div>
                                <span className="font-semibold cultiva-text-main">
                                    Posible Plaga: Mosca Blanca
                                </span>
                                <p className="text-sm cultiva-text-secondary">
                                    Detectada en Lote Luna. Revisar urgentemente.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start p-2 rounded-md hover:bg-green-50 border border-transparent hover:border-green-300">
                            <span className="icon-placeholder text-green-600">🌱</span>
                            <div>
                                <span className="font-semibold cultiva-text-main">
                                    Recomendación: Fertilización
                                </span>
                                <p className="text-sm cultiva-text-secondary">
                                    Aplicar fertilizante NPK en Lote Sol Naciente.
                                </p>
                            </div>
                        </li>
                    </ul>
                    <button
                    <button>
                        className="btn btn-secondary w-full mt-4"
                        // onClick handler removed as currentPage is no longer used
                    >
                        Ver Todas
                    </button>
            </div>

            {/* Puedes mostrar otras secciones según currentPage */}
            {/* {currentPage === "alertas" && <AlertasComponent />} */}
        </div>
    );
};

export default Dashboard;