import React, { useEffect, useState } from "react";
import axios from "axios";
import { getWeatherData } from '../services/weather';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/onecall";

export default function Dashboard_Clima() {
    const [coords, setCoords] = useState({ lat: 4.6097, lon: -74.0817 });
    const [altitude, setAltitude] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener ubicación del usuario
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });
            },
            () => setLoading(false)
        );
    }, []);

    // Obtener altitud
    useEffect(() => {
        axios
            .get(
                `https://api.open-elevation.com/api/v1/lookup?locations=${coords.lat},${coords.lon}`
            )
            .then((res) => setAltitude(res.data.results[0].elevation))
            .catch(() => setAltitude(null));
    }, [coords]);

    // Obtener clima actual y pronóstico
    useEffect(() => {
        setLoading(true);
        setError(null);

        getWeatherData(coords.lat, coords.lon)
            .then((data) => {
                setWeather(data.current);
                setForecast(data.daily.slice(0, 5)); // 5 días próximos
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudo obtener el clima.");
                setLoading(false);
            });
    }, [coords]);

    // Calcular precipitación de los últimos 5 días (usando historial, requiere plan pago)
    // Aquí solo mostramos precipitación de los próximos 5 días por limitación de la API gratuita

    if (error) return <div className="text-red-500">{error}</div>;
    if (loading) return <div className="text-center py-6">Cargando clima...</div>;
    if (!weather || !forecast) return <div className="text-center py-6">No hay datos de clima.</div>;

    return (
        <div className="card">
            <div className="card-header flex items-center">
                <span className="icon-placeholder">☀️</span> Clima y Pronóstico (5 días)
            </div>
            <>
                <div className="text-center">
                    <p className="text-5xl cultiva-text-main">
                        {Math.round(weather.temp)}°C
                    </p>
                    <p className="cultiva-text-secondary capitalize">
                        {weather.weather[0].description}
                    </p>
                </div>
                <div className="mt-4 flex justify-around cultiva-text-secondary">
                    <p>Max: {Math.round(forecast[0].temp.max)}°C</p>
                    <p>Min: {Math.round(forecast[0].temp.min)}°C</p>
                </div>
                <div className="mt-4 text-center text-sm cultiva-text-secondary">
                    <div>
                        <b>Ubicación:</b> {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                        {altitude !== null && (
                            <> | <b>Altitud:</b> {altitude} msnm</>
                        )}
                    </div>
                    <div className="mt-2">
                        <iframe
                            title="map"
                            width="100%"
                            height="180"
                            frameBorder="0"
                            style={{ border: 0, borderRadius: 8 }}
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon-0.01}%2C${coords.lat-0.01}%2C${coords.lon+0.01}%2C${coords.lat+0.01}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`}
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className="mt-4">
                    <h4 className="font-bold text-center">Pronóstico próximos 5 días</h4>
                    <div className="flex flex-wrap justify-around mt-2">
                        {forecast.map((day, idx) => (
                            <div key={idx} className="text-center m-2 p-2 border rounded w-24 bg-gray-50">
                                <div>
                                    {new Date(day.dt * 1000).toLocaleDateString("es-CO", {
                                        weekday: "short",
                                        day: "numeric",
                                        month: "short",
                                    })}
                                </div>
                                <div>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                        alt={day.weather[0].description}
                                        className="mx-auto"
                                    />
                                </div>
                                <div>
                                    <span className="font-bold">{Math.round(day.temp.max)}°</span> / {Math.round(day.temp.min)}°
                                </div>
                                <div className="text-xs">
                                    {day.rain ? <>🌧️ {day.rain} mm</> : "—"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </div>
    );
}
