// src/components/IngresoRegistro.jsx
// Importa las dependencias necesarias: React para crear el componente y useState para manejar el estado.
import React, { useState } from "react";
// Importa el cliente de API configurado para realizar peticiones al backend.
import apiClient from "../api";

/**
 * Componente para el formulario de Inicio de Sesión y Registro de usuarios.
 * Maneja ambos formularios en una sola interfaz, alternando entre ellos.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onLoginSuccess - Callback que se ejecuta cuando el inicio de sesión es exitoso. Pasa los datos del usuario al componente padre.
 * @param {function} props.setCurrentPage - Función para cambiar la página/vista en el componente App.
 */
const IngresoRegistro = ({ onLoginSuccess, setCurrentPage }) => {
  // Estado para controlar si se muestra el formulario de registro (true) o el de inicio de sesión (false).
  const [isRegister, setIsRegister] = useState(false);
  // Estado para almacenar todos los datos del formulario.
  const [formData, setFormData] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    codigoArea: "",
    numeroTelefono: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // Estado para mostrar mensajes de éxito o error al usuario.
  const [message, setMessage] = useState("");

  /**
   * Maneja los cambios en cualquier campo del formulario.
   * Actualiza el estado `formData` de forma dinámica.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e - El evento del cambio.
   */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  /**
   * Maneja el envío del formulario, ya sea para registro o para inicio de sesión.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validación de contraseñas si es registro
    if (isRegister && formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      if (isRegister) {
        // Lógica de REGISTRO: construye el payload y lo envía al endpoint /api/register.
        const registerPayload = {
          email: formData.email,
          password: formData.password,
          tipoDocumento: formData.tipoDocumento,
          numeroDocumento: formData.numeroDocumento,
          telefono: `${formData.codigoArea}${formData.numeroTelefono}`,
        };

        const response = await apiClient.post("/api/register", registerPayload);
        setMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setIsRegister(false); // Cambiar a la vista de login
      } else {
        // Lógica de LOGIN: construye el payload y lo envía al endpoint /api/login.
        const loginPayload = {
          email: formData.email,
          password: formData.password,
        };

        const response = await apiClient.post("/api/login", loginPayload);

        // Si el login es exitoso, guarda el token y los datos del usuario en localStorage para persistir la sesión.
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setMessage("Inicio de sesión exitoso.");
        // Llama a la función onLoginSuccess para actualizar el estado de la aplicación principal.
        if (onLoginSuccess) {
          onLoginSuccess(response.data);
        }
      }
    } catch (error) {
      // Manejo de errores: muestra un mensaje específico si el backend lo proporciona, o uno genérico.
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage("Ocurrió un error. Por favor, inténtalo de nuevo.");
      }
      console.error("Authentication error:", error);
    }
  };

  // Renderizado del componente.
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-background-card border border-border rounded-lg shadow-xl">
      {/* Título dinámico que cambia según si es registro o login. */}
      <h2 className="text-2xl font-bold text-center text-text-accent mb-4 font-heading">
        {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Renderizado condicional de los campos adicionales para el formulario de registro. */}
        {isRegister && (
          <>
            {/* Campo: Tipo de Documento */}
            <div className="mb-4">
              <label
                className="block text-text-main text-sm font-bold mb-2"
                htmlFor="tipoDocumento"
              >
                Tipo de Documento
              </label>
              <select
                id="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleInputChange}
                className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main bg-background-card leading-tight focus:outline-none focus:shadow-outline transition-all"
                required={isRegister}
              >
                <option value="">Seleccionar...</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="PAS">Pasaporte</option>
              </select>
            </div>

            {/* Campo: Número de Documento */}
            <div className="mb-4">
              <label
                className="block text-text-main text-sm font-bold mb-2"
                htmlFor="numeroDocumento"
              >
                Número de Documento
              </label>
              <input
                type="text"
                id="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleInputChange}
                className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main bg-background-card leading-tight focus:outline-none focus:shadow-outline transition-all"
                required={isRegister}
              />
            </div>

            {/* Campo: Número de Teléfono (dividido en código de área y número) */}
            <div className="mb-4">
              <label className="block text-text-main text-sm font-bold mb-2">
                Número de Teléfono
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="codigoArea"
                  placeholder="Código"
                  value={formData.codigoArea}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-border rounded w-1/3 py-2 px-3 text-text-main bg-background-card leading-tight focus:outline-none focus:shadow-outline transition-all"
                  required={isRegister}
                />
                <input
                  type="text"
                  id="numeroTelefono"
                  placeholder="Número"
                  value={formData.numeroTelefono}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-border rounded w-2/3 py-2 px-3 text-text-main bg-background-card leading-tight focus:outline-none focus:shadow-outline transition-all"
                  required={isRegister}
                />
              </div>
            </div>
          </>
        )}

        {/* Campo: Email (común para ambos formularios) */}
        <div className="mb-4">
          <label
            className="block text-text-main text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main bg-background-card leading-tight focus:outline-none focus:shadow-outline transition-all"
            required
          />
        </div>

        {/* Campo: Contraseña (común para ambos formularios) */}
        <div className="mb-4">
          <label
            className="block text-text-main text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main bg-background-card leading-tight focus:outline-none focus:shadow-outline transition-all"
            required
          />
        </div>

        {/* Campo: Confirmar Contraseña (solo para registro) */}
        {isRegister && (
          <div className="mb-6">
            <label
              className="block text-text-main text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text-main bg-background-card leading-tight focus:outline-none focus:shadow-outline transition-all"
              required={isRegister}
            />
            <p className="text-xs text-text-main/80 mt-1 font-medium">
              La contraseña debe tener al menos 8 caracteres, incluyendo
              mayúsculas, minúsculas, números y caracteres especiales.
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex items-center justify-between">
          {/* Botón principal para enviar el formulario */}
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            {isRegister ? "Registrarse" : "Entrar"}
          </button>
          {/* Botón para alternar entre la vista de login y registro */}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="inline-block align-baseline font-bold text-sm text-primary hover:text-secondary transition-colors"
          >
            {isRegister
              ? "¿Ya tienes cuenta? Inicia Sesión"
              : "Crear una cuenta"}
          </button>
        </div>
      </form>
      {/* Área para mostrar mensajes de estado (éxito o error) */}
      {message && (
        <p
          // Clases condicionales para colorear el mensaje según su contenido.
          className={`mt-4 text-center text-sm font-semibold p-2 rounded ${
            message.includes("Error") || message.includes("error")
              ? "text-red-600 bg-red-100"
              : message.includes("¡Registro exitoso!")
              ? "text-green-600 bg-green-100"
              : "text-text-main bg-background-card"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default IngresoRegistro;
