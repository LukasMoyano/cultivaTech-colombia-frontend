import React, { useState } from "react";

export default function IngresoRegistro({ setCurrentPage }) {
  const [showRegistro, setShowRegistro] = useState(false);

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-3xl font-bold cultiva-text-main mb-6 text-center">
        Bienvenido a CultivaTech
      </h2>
      <div className="card">
        {!showRegistro ? (
          <div>
            <h3 className="text-2xl font-semibold cultiva-text-main mb-4 text-center">
              Ingresar
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Ingreso simulado exitoso!");
                setCurrentPage("dashboard");
              }}
            >
              <div className="mb-4">
                <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                  Correo o Teléfono:
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                  placeholder="su@correo.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="inline-block align-baseline font-bold text-sm text-cultiva-green-secondary hover:text-green-700 mt-2 bg-transparent border-none cursor-pointer p-0"
                  onClick={() => alert("Funcionalidad de recuperación de contraseña próximamente disponible.")}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button className="btn btn-primary w-full" type="submit">
                  Ingresar
                </button>
              </div>
            </form>
            <p className="text-center cultiva-text-secondary mt-4">
              ¿No tienes cuenta?{" "}
              <button
                className="font-bold cultiva-green-secondary hover:text-green-700"
                onClick={() => setShowRegistro(true)}
              >
                Regístrate
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold cultiva-text-main mb-4 text-center">
              Crear Cuenta
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Registro simulado exitoso!");
                setShowRegistro(false);
              }}
            >
              {/* Tipo de documento */}
              <div className="mb-4">
                <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                  Tipo de Documento:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="cc">Cédula de Ciudadanía</option>
                  <option value="ce">Cédula de Extranjería</option>
                  <option value="rm">Registro Migratorio</option>
                  <option value="pasaporte">Pasaporte</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              {/* Número de documento */}
              <div className="mb-4">
                <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                  Número de Documento:
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                  placeholder="Número de documento"
                  onKeyPress={(e) => {
                    const charCode = e.charCode;
                    if (charCode < 48 || charCode > 57) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
              </div>
              {/* Número de celular */}
              <div className="mb-4 flex gap-2">
                <div className="w-1/3">
                  <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                    País
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-3 px-2 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                    required
                    defaultValue="+57"
                  >
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+34">🇪🇸 +34</option>
                  </select>
                </div>
                <div className="w-2/3">
                  <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                    Celular
                  </label>
                  <input
                    type="tel"
                    className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                    placeholder="3001234567"
                    required
                  />
                </div>
              </div>
              {/* Correo electrónico */}
              <div className="mb-4">
                <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              {/* Contraseña */}
              <div className="mb-4">
                <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                  Contraseña: <span className="icon-placeholder">🔑</span>
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                  placeholder="Mínimo 16 caracteres, 129 bits"
                  minLength={16}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{16,}$"
                  title="Debe tener mínimo 16 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Usa al menos 16 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos. Ejemplo: <span className="font-mono">C0ntr@s3ñA!Segura2024</span>
                </p>
              </div>
              {/* Confirmar contraseña */}
              <div className="mb-6">
                <label className="block cultiva-text-secondary text-sm font-bold mb-2">
                  Confirmar Contraseña:
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-3 px-4 cultiva-text-main leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                  placeholder="Repite tu contraseña"
                  minLength={16}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{16,}$"
                  title="Debe tener mínimo 16 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos."
                  required
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  autoComplete="new-password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Repite la contraseña. El copiado y pegado está deshabilitado por seguridad.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button className="btn btn-primary w-full" type="submit">
                  Registrarme
                </button>
              </div>
            </form>
            <p className="text-center cultiva-text-secondary mt-4">
              ¿Ya tienes cuenta?{" "}
              <button
                className="font-bold cultiva-green-secondary hover:text-green-700"
                onClick={() => setShowRegistro(false)}
              >
                Ingresa
              </button>
            </p>
          </div>
        )}
      </div>
      <p className="text-center text-xs cultiva-text-secondary mt-6">
        Al continuar, aceptas nuestros Términos de Servicio y Política de
        Privacidad.
      </p>
    </div>
  );
}