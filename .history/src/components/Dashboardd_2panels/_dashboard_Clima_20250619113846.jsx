import React, { useEffect, useState } from "react";
import axios from "axios";

// Coordenadas del cultivo (ejemplo: Fusagasugá)
const CULTIVO_COORDS = {
    lat: 4.3352064,
    lon: -74.3800832,
    alt: 1765 // altura en metros
};

export default function DashboardClima() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${CULTIVO_COORDS.lat}&lon=${CULTIVO_COORDS.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric&lang=es`
                );
                
                console.log('Respuesta del clima:', response.data);
                setWeather(response.data);
                setError(null);
            } catch (err) {
                console.error('Error detallado:', err);
                setError('Error al obtener datos del clima');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className="card p-4">
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card p-4">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="card">
            <div className="card-header flex items-center justify-between">
                <span className="flex items-center">
                    <span className="icon-placeholder">🌡️</span> 
                    Clima del Cultivo
                </span>
                <span className="text-xs text-gray-500">
                    Alt: {CULTIVO_COORDS.alt}m
                </span>
            </div>
            
            <div className="text-center mt-4">
                <p className="text-5xl cultiva-text-main">
                    {Math.round(weather.main.temp)}°C
                </p>
                <p className="cultiva-text-secondary capitalize">
                    {weather.weather[0].description}
                </p>
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
                    Lat: {CULTIVO_COORDS.lat.toFixed(4)}
                </p>
                <p className="text-center text-gray-500">
                    Lon: {CULTIVO_COORDS.lon.toFixed(4)}
                </p>
            </div>
        </div>
    );
}
