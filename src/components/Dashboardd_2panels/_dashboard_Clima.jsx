import React, { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../../api"; // Importar el cliente API compartido

/**
 * Componente para mostrar el clima.
 * Intenta obtener la geolocalización del usuario. Si falla, utiliza una ubicación
 * predeterminada (Bogotá, Colombia) como fallback para garantizar que siempre se muestren datos.
 */
export default function DashboardClima() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Cargando ubicación...");
  // Estado para manejar advertencias no fatales, como el fallback de geolocalización.
  const [warning, setWarning] = useState(null);

  // Ubicación predeterminada en caso de que la geolocalización falle.
  const fallbackLocation = { lat: 4.711, lon: -74.0721 };

  // Función para solicitar la ubicación del usuario.
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible en tu navegador");
      return;
    }
    setLoading(true);
    setWarning(null); // Limpia advertencias anteriores al reintentar.
    
    // Opciones para la geolocalización con mayor precisión y tiempo de espera
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 segundos de tiempo de espera
      maximumAge: 300000 // 5 minutos de caché
    };
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          alt: position.coords.altitude || "No disponible",
        });
      },
      (err) => {
        // Inspecciona el código de error para dar un mensaje más útil.
        let userFriendlyMessage = "";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            userFriendlyMessage =
              "Permiso de ubicación denegado. Por favor, habilítalo en la configuración de tu navegador y actualiza.";
            break;
          case err.POSITION_UNAVAILABLE:
            userFriendlyMessage =
              "La información de ubicación no está disponible.";
            break;
          case err.TIMEOUT:
            userFriendlyMessage =
              "La solicitud de ubicación expiró.";
            break;
          default:
            userFriendlyMessage =
              "No se pudo obtener tu ubicación.";
            break;
        }
        setWarning(userFriendlyMessage);
        setError("No se pudo obtener tu ubicación. Por favor, verifica los permisos de ubicación en tu navegador.");
        setLoading(false);
        // No usamos la ubicación de fallback para evitar confusiones
      },
      geoOptions
    );
  };

  const getLocationName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const address = response.data.address;
      const locality =
        address.city || address.town || address.village || address.suburb;
      const region = address.state || address.region;
      setLocationName(`${locality}, ${region}`);
    } catch (err) {
      setLocationName("Ubicación no disponible");
    }
  };

  // Efecto para obtener la ubicación del usuario una sola vez al montar el componente.
  useEffect(() => {
    getUserLocation();
  }, []);

  // Efecto para buscar el clima y el nombre de la ubicación cuando `userLocation` cambia.
  useEffect(() => {
    const fetchWeather = async () => {
      if (!userLocation) return;
      try {
        const response = await apiClient.get(
          `/api/clima?lat=${userLocation.lat}&lon=${userLocation.lon}`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError("Error al obtener datos del clima. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    if (userLocation) {
      fetchWeather();
      getLocationName(userLocation.lat, userLocation.lon);
    }
  }, [userLocation]);

  // Estado de carga mientras se obtiene la ubicación y los datos.
  if (loading) {
    return (
      <div className="bg-background-card border border-border p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mb-4 mx-auto"></div>
          <p className="text-sm text-text-main/70 font-heading">
            OBTENIENDO UBICACIÓN Y CLIMA...
          </p>
        </div>
      </div>
    );
  }

  // Si no hay ubicación y hay un error, mostrar el error con opción de reintentar
  if (!userLocation && error) {
    return (
      <div className="bg-background-card border border-border p-6 flex flex-col items-center justify-center h-full">
        <p className="text-red-500 text-center mb-4">{error}</p>
        <button
          onClick={getUserLocation}
          className="mt-4 bg-secondary text-black py-2 px-4 hover:bg-secondary/80 transition-all text-sm font-bold font-heading"
        >
          🔄 REINTENTAR
        </button>
      </div>
    );
  }

  // Si no hay datos de clima pero sí ubicación, mostrar un mensaje de carga del clima
  if (userLocation && !weather && !error) {
    return (
      <div className="bg-background-card border border-border p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mb-4 mx-auto"></div>
          <p className="text-sm text-text-main/70 font-heading">
            OBTENIENDO DATOS DEL CLIMA...
          </p>
        </div>
      </div>
    );
  }

  // Estado de error fatal (ej. la API del clima no responde).
  if (error) {
    return (
      <div className="bg-background-card border border-border p-6 flex flex-col items-center justify-center h-full">
        <p className="text-red-500 text-center mb-4">{error}</p>
        <button
          onClick={getUserLocation}
          className="mt-4 bg-secondary text-black py-2 px-4 hover:bg-secondary/80 transition-all text-sm font-bold font-heading"
        >
          🔄 REINTENTAR
        </button>
      </div>
    );
  }

  // Si no hay datos de clima o ubicación, no renderiza nada.
  if (!weather || !userLocation) return null;

  return (
    <div className="bg-background-card border border-border shadow-md p-6 transition-all duration-300">
      {/* Muestra la advertencia si la geolocalización falló */}
      {warning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-4 rounded-r-lg" role="alert">
          <p className="font-bold">Aviso de Ubicación</p>
          <p className="text-sm">{warning}</p>
          <div className="mt-2 text-xs">
            <p className="font-semibold">¿Cómo solucionarlo?</p>
            <ol className="list-decimal list-inside">
                <li>Haz clic en el ícono <strong>🔒</strong> junto a la dirección del sitio.</li>
                <li>Activa el permiso de <strong>Ubicación</strong>.</li>
                <li>Recarga la página o haz clic en "Actualizar Ubicación".</li>
            </ol>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <span className="flex items-center gap-2">
          <span className="text-2xl text-accent">📍</span>
          <span
            className="text-lg font-bold text-text-main font-heading truncate max-w-[200px]"
            title={locationName}
          >
            {locationName.toUpperCase()}
          </span>
        </span>
        <span className="text-xs bg-secondary/20 text-text-accent px-2 py-1 font-heading">
          ALT:{" "}
          {userLocation.alt !== "No disponible"
            ? `${Math.round(userLocation.alt)}M`
            : "N/A"}
        </span>
      </div>

      <div className="text-center mb-6">
        <p className="text-6xl font-bold text-primary mb-2 font-heading">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="text-text-main/90 capitalize text-lg mb-4">
          {weather.weather[0].description}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="mx-auto w-20 h-20 filter brightness-110 contrast-125"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-background border border-border">
          <div className="text-2xl mb-2">💧</div>
          <p className="text-sm text-text-main/80 font-medium font-heading">
            HUMEDAD
          </p>
          <p className="font-bold text-text-main text-lg">
            {weather.main.humidity}%
          </p>
        </div>
        <div className="text-center p-4 bg-background border border-border">
          <div className="text-2xl mb-2">💨</div>
          <p className="text-sm text-text-main/80 font-medium font-heading">
            VIENTO
          </p>
          <p className="font-bold text-text-main text-lg">
            {Math.round(weather.wind.speed * 3.6)} km/h
          </p>
        </div>
      </div>

      <div className="flex justify-around mb-6 p-4 bg-background border border-border">
        <div className="text-center">
          <p className="text-sm text-text-main/70 font-heading">MÁXIMA</p>
          <p className="font-bold text-primary">
            {Math.round(weather.main.temp_max)}°C
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-text-main/70 font-heading">MÍNIMA</p>
          <p className="font-bold text-secondary">
            {Math.round(weather.main.temp_min)}°C
          </p>
        </div>
      </div>

      <button
        onClick={getUserLocation}
        className="w-full bg-secondary text-black py-2 px-4 hover:bg-secondary/80 transition-all text-sm font-bold font-heading"
      >
        🔄 ACTUALIZAR UBICACIÓN
      </button>
    </div>
  );
}
