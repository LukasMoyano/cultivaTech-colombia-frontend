import React, { useEffect, useState } from "react";
import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function DashboardClima() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=4.6097&lon=-74.0817&appid=${WEATHER_API_KEY}&units=metric&lang=es`
                );
                setWeather(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching weather:", err);
                setError("Error al obtener datos del clima");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

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

    if (!weather) return null;

    return (
        <div className="card p-6 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                    Clima Actual
                </h3>
                <span className="text-sm text-gray-500">
                    Bogotá
                </span>
            </div>

            <div className="space-y-6">
                <div className="text-center">
                    <div className="text-6xl font-bold text-gray-800 mb-2">
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="text-xl text-gray-600 capitalize">
                        {weather.weather[0].description}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">Humedad</div>
                        <div className="text-xl font-semibold text-gray-800">
                            {weather.main.humidity}%
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-500 mb-1">Viento</div>
                        <div className="text-xl font-semibold text-gray-800">
                            {Math.round(weather.wind.speed * 3.6)} km/h
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
