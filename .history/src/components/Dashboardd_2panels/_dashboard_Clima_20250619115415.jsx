import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardClima() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [locationName, setLocationName] = useState('Cargando ubicación...');

    // Función para obtener la ubicación del usuario
    const getUserLocation = () => {
        if (!navigator.geolocation) {
            setError('La geolocalización no está disponible en tu navegador');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    alt: position.coords.altitude || 'No disponible'
                });
            },
            (err) => {
                console.error('Error de geolocalización:', err);
                setError('No se pudo obtener tu ubicación. Por favor, permite el acceso a la ubicación.');
                setLoading(false);
            }
        );
    };

    // Función para obtener el nombre de la ubicación
    const getLocationName = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            
            // Extraer información relevante
            const address = response.data.address;
            const locality = address.city || address.town || address.village || address.suburb;
            const region = address.state || address.region;
            const country = address.country;
            const postalCode = address.postcode;
            const countryCode = address.country_code;
            const displayName = response.data.display_name;
            const addressLine = `${locality}, ${region}, ${country} ${postalCode}`;
            const addressLine2 = `${country} ${postalCode}`;
            const addressLine3 = `${countryCode}`;

            console.log('Address:', address);
            console.log('Locality:', locality);
            console.log('Region:', region);
            console.log('Country:', country);
            console.log('Postal Code:', postalCode);
            console.log('Country Code:', countryCode);
            console.log('Display Name:', displayName);
            console.log('Address Line:', addressLine);
            console.log('Address Line 2:', addressLine2);
            
            setLocationName(`${locality}, ${region}`);
            setLoading(false);
            setError(null);
            setLocationName(addressLine);
            setLocationName(addressLine2);
            setLocationName(addressLine3);
            setLocationName(displayName);

            return addressLine;
            return addressLine2;
            return addressLine3;
            return displayName;
            return locality;
            return region;
            return country;
            return postalCode;
            return countryCode;
            

        } catch (err) {
            console.error('Error obteniendo nombre de ubicación:', err);
            setLocationName('Ubicación no disponible');
        }
    };

    // Efecto para solicitar la ubicación al montar el componente
    useEffect(() => {
        getUserLocation();
    }, []);

    // Efecto para obtener el clima y el nombre de la ubicación cuando tenemos la ubicación
    useEffect(() => {
        const fetchWeather = async () => {
            if (!userLocation) return;

            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric&lang=es`
                );
                
                setWeather(response.data);
                setError(null);
            } catch (err) {
                console.error('Error obteniendo el clima:', err);
                setError('Error al obtener datos del clima');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [userLocation]);

    // Efecto para obtener el nombre de la ubicación cuando cambia userLocation
    useEffect(() => {
        if (userLocation) {
            getLocationName(userLocation.lat, userLocation.lon);
        }
    }, [userLocation]);

    // Componente de carga
    if (loading) {
        return (
            <div className="card p-4">
                <div className="flex flex-col items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
                    <p className="text-sm text-gray-500">
                        Obteniendo tu ubicación y clima...
                    </p>
                </div>
            </div>
        );
    }

    // Componente de error
    if (error) {
        return (
            <div className="card p-4">
                <div className="text-red-500 text-center">
                    <p>{error}</p>
                    {error.includes('ubicación') && (
                        <button 
                            onClick={getUserLocation}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Intentar de nuevo
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Si no hay datos del clima
    if (!weather || !userLocation) return null;

    return (
        <div className="card">
            <div className="card-header flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <span className="icon-placeholder">📍</span> 
                    <span className="text-sm font-medium truncate max-w-[200px]" title={locationName}>
                        {locationName}
                    </span>
                </span>
                <span className="text-xs text-gray-500">
                    Alt: {userLocation.alt !== 'No disponible' 
                        ? `${Math.round(userLocation.alt)}m` 
                        : 'No disponible'}
                </span>
            </div>
            
            <div className="text-center mt-4">
                <p className="text-5xl cultiva-text-main">
                    {Math.round(weather.main.temp)}°C
                </p>
                <p className="cultiva-text-secondary capitalize">
                    {weather.weather[0].description}
                </p>
                <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="mx-auto w-16 h-16"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-500">Humedad</p>
                    <p className="font-semibold">{weather.main.humidity}%</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-500">Viento</p>
                    <p className="font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</p>
                </div>
            </div>

            <div className="mt-4 flex justify-around cultiva-text-secondary">
                <p>Máx: {Math.round(weather.main.temp_max)}°C</p>
                <p>Mín: {Math.round(weather.main.temp_min)}°C</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <p className="text-center text-gray-500">
                    Lat: {userLocation.lat.toFixed(4)}
                </p>
                <p className="text-center text-gray-500">
                    Lon: {userLocation.lon.toFixed(4)}
                </p>
            </div>

            <button 
                onClick={getUserLocation}
                className="mt-4 w-full px-4 py-2 text-sm text-green-600 hover:text-green-700 transition"
            >
                🔄 Actualizar ubicación
            </button>
        </div>
    );
}
