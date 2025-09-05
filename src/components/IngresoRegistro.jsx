// src/components/IngresoRegistro.jsx
import React, { useState } from 'react';
import apiClient from '../api';

const IngresoRegistro = ({ onLoginSuccess, setCurrentPage }) => {
  const [isRegister, setIsRegister] = useState(false); // Changed default to false to show login first
  const [formData, setFormData] = useState({
    tipoDocumento: '',
    numeroDocumento: '',
    codigoArea: '',
    numeroTelefono: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validación de contraseñas si es registro
    if (isRegister && formData.password !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      if (isRegister) {
        // Para registro, enviamos todos los datos
        const registerPayload = {
          email: formData.email,
          password: formData.password,
          tipoDocumento: formData.tipoDocumento,
          numeroDocumento: formData.numeroDocumento,
          telefono: `${formData.codigoArea}${formData.numeroTelefono}`
        };

        const response = await apiClient.post('/api/register', registerPayload);
        setMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setIsRegister(false); // Cambiar a la vista de login
      } else {
        // Para login, solo enviamos email y contraseña
        const loginPayload = {
          email: formData.email,
          password: formData.password
        };

        const response = await apiClient.post('/api/login', loginPayload);

        // Guardar el token y los datos del usuario en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setMessage('Inicio de sesión exitoso.');
        // Llama a la función onLoginSuccess para notificar al componente padre
        if (onLoginSuccess) {
          onLoginSuccess(response.data);
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-background-card border border-border rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-text-accent mb-4 font-heading">
        {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <div className="mb-4">
              <label className="block text-text-main text-sm font-bold mb-2" htmlFor="tipoDocumento">
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
            
            <div className="mb-4">
              <label className="block text-text-main text-sm font-bold mb-2" htmlFor="numeroDocumento">
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
        
        <div className="mb-4">
          <label className="block text-text-main text-sm font-bold mb-2" htmlFor="email">
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
        
        <div className="mb-4">
          <label className="block text-text-main text-sm font-bold mb-2" htmlFor="password">
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
        
        {isRegister && (
          <div className="mb-6">
            <label className="block text-text-main text-sm font-bold mb-2" htmlFor="confirmPassword">
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
              La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            {isRegister ? 'Registrarse' : 'Entrar'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="inline-block align-baseline font-bold text-sm text-primary hover:text-secondary transition-colors"
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia Sesión' : 'Crear una cuenta'}
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 text-center text-sm font-semibold p-2 rounded ${
          message.includes('Error') || message.includes('error') 
            ? 'text-red-600 bg-red-100' 
            : message.includes('¡Registro exitoso!') 
            ? 'text-green-600 bg-green-100'
            : 'text-text-main bg-background-card'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default IngresoRegistro;