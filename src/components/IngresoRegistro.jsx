import React, { useState } from "react";
import PropTypes from "prop-types";

export default function IngresoRegistro({ setCurrentPage }) {
  const [showRegistro, setShowRegistro] = useState(false);

  const formContainerStyles = "bg-background-card border border-border p-8";
  const inputStyles = "appearance-none border border-border bg-background w-full py-3 px-4 text-text-main leading-tight focus:outline-none focus:border-primary";
  const labelStyles = "block text-text-main text-sm font-bold mb-2 font-heading";
  const buttonPrimaryStyles = "w-full bg-primary text-white py-3 px-4 font-heading hover:bg-primary/80 transition-colors";
  const buttonSecondaryStyles = "font-bold text-accent hover:text-accent/80";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="container mx-auto max-w-md">
        <h2 className="text-3xl font-heading text-text-accent mb-6 text-center">
          BIENVENIDO A CULTIVATECH
        </h2>
        <div className={formContainerStyles}>
          {!showRegistro ? (
            // --- FORMULARIO DE INGRESO ---
            <div>
              <h3 className="text-2xl font-heading text-text-main mb-4 text-center">
                INGRESAR
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Ingreso simulado exitoso!");
                  setCurrentPage("dashboard");
                }}
                className="space-y-6"
              >
                <div>
                  <label className={labelStyles}>
                    CORREO O TELÉFONO:
                  </label>
                  <input
                    type="text"
                    className={inputStyles}
                    placeholder="su@correo.com"
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>
                    CONTRASEÑA:
                  </label>
                  <input
                    type="password"
                    className={inputStyles}
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    className="inline-block align-baseline text-xs font-bold text-text-main/70 hover:text-accent mt-2"
                    onClick={() => alert("Funcionalidad de recuperación de contraseña próximamente disponible.")}
                  >
                    ¿OLVIDASTE TU CONTRASEÑA?
                  </button>
                </div>
                <div>
                  <button className={buttonPrimaryStyles} type="submit">
                    INGRESAR
                  </button>
                </div>
              </form>
              <p className="text-center text-text-main/80 mt-6">
                ¿No tienes cuenta?{" "}
                <button
                  className={buttonSecondaryStyles}
                  onClick={() => setShowRegistro(true)}
                >
                  Regístrate
                </button>
              </p>
            </div>
          ) : (
            // --- FORMULARIO DE REGISTRO ---
            <div>
              <h3 className="text-2xl font-heading text-text-main mb-4 text-center">
                CREAR CUENTA
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Registro simulado exitoso!");
                  setShowRegistro(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className={labelStyles}>TIPO DE DOCUMENTO:</label>
                  <select className={inputStyles} required defaultValue="">
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="cc">Cédula de Ciudadanía</option>
                    <option value="ce">Cédula de Extranjería</option>
                    <option value="rm">Registro Migratorio</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyles}>NÚMERO DE DOCUMENTO:</label>
                  <input type="text" className={inputStyles} required />
                </div>
                <div>
                  <label className={labelStyles}>CORREO ELECTRÓNICO:</label>
                  <input type="email" className={inputStyles} required />
                </div>
                <div>
                  <label className={labelStyles}>CONTRASEÑA:</label>
                  <input type="password" className={inputStyles} required />
                </div>
                <div>
                  <label className={labelStyles}>CONFIRMAR CONTRASEÑA:</label>
                  <input type="password" className={inputStyles} required />
                </div>
                <div>
                  <button className={buttonPrimaryStyles} type="submit">
                    REGISTRARME
                  </button>
                </div>
              </form>
              <p className="text-center text-text-main/80 mt-6">
                ¿Ya tienes cuenta?{" "}
                <button
                  className={buttonSecondaryStyles}
                  onClick={() => setShowRegistro(false)}
                >
                  Ingresa
                </button>
              </p>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-text-main/60 mt-6">
          Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
        </p>
      </div>
    </div>
  );
}

IngresoRegistro.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};