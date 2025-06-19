import React, { useEffect, useState } from "react";
import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BOGOTA_COORDS = { lat: 4.6097, lon: -74.0817 };

export default function DashboardClima() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                // Obtener clima actual
                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${BOGOTA_COORDS.lat}&lon=${BOGOTA_COORDS.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=es`
                );
                
                // Obtener pronóstico
                const forecastResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${BOGOTA_COORDS.lat}&lon=${BOGOTA_COORDS.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=es`
                );

                setWeather(weatherResponse.data);
                setForecast(forecastResponse.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching weather:", err);
                setError("Error al obtener datos del clima");
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    // Convertir velocidad del viento de m/s a km/h
    const getWindSpeed = (speed) => Math.round(speed * 3.6);

    // Obtener icono del clima
    const getWeatherIcon = (iconCode) => 
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Formatear fecha
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="card p-6 bg-white rounded-xl shadow-lg">
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card p-6 bg-white rounded-xl shadow-lg">
                <div className="text-red-500 text-center py-4">{error}</div>
            </div>
        );
    }

    if (!weather || !forecast) return null;

    return (
        <div className="card p-6 bg-white rounded-xl shadow-lg">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                    Clima en Bogotá
                </h3>
                <span className="text-sm text-gray-500">
                    {formatDate(weather.dt)}
                </span>
            </div>

            {/* Clima actual */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                    <img 
                        src={getWeatherIcon(weather.weather[0].icon)}
                        alt={weather.weather[0].description}
                        className="w-20 h-20 mx-auto"
                    />
                    <div className="text-5xl font-bold text-gray-800">
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="text-lg text-gray-600 capitalize">
                        {weather.weather[0].description}
                    </div>
                </div>
                <div className="grid grid-rows-3 gap-2">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500">Sensación</div>
                        <div className="text-lg font-semibold">
                            {Math.round(weather.main.feels_like)}°C
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500">Humedad</div>
                        <div className="text-lg font-semibold">
                            {weather.main.humidity}%
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500">Viento</div>
                        <div className="text-lg font-semibold">
                            {getWindSpeed(weather.wind.speed)} km/h
                        </div>
                    </div>
                </div>
            </div>

            {/* Detalles adicionales */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <div className="text-sm text-gray-500">Presión</div>
                    <div className="font-semibold">
                        {weather.main.pressure} hPa
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-gray-500">Visibilidad</div>
                    <div className="font-semibold">
                        {(weather.visibility / 1000).toFixed(1)} km
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-gray-500">Nubes</div>
                    <div className="font-semibold">
                        {weather.clouds.all}%
                    </div>
                </div>
            </div>

            {/* Pronóstico próximas horas */}
            <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Pronóstico próximas horas
                </h4>
                <div className="grid grid-cols-4 gap-2">
                    {forecast.list.slice(0, 4).map((item, index) => (
                        <div key={index} className="text-center">
                            <div className="text-xs text-gray-500">
                                {formatDate(item.dt)}
                            </div>
                            <img 
                                src={getWeatherIcon(item.weather[0].icon)}
                                alt={item.weather[0].description}
                                className="w-8 h-8 mx-auto"
                            />
                            <div className="text-sm font-semibold">
                                {Math.round(item.main.temp)}°C
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
