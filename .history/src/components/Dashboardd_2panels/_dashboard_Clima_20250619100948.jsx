import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard_Clima() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Puedes cambiar estas coordenadas por defecto si quieres una ciudad específica
    const [coords, setCoords] = useState({ lat: 4.6097, lon: -74.0817 }); // Bogotá

    useEffect(() => {
        // Intentar obtener la ubicación del usuario
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });
            },
            () => {
                // Si falla, se usan las coordenadas por defecto
                setLoading(false);
            }
        );
    }, []);

    useEffect(() => {
        const API_KEY = "f61630c5193995d939b6b8024057b009";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`;

        setLoading(true);
        axios
            .get(url)
            .then(({ data }) => {
                setWeather(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("No se pudo obtener el clima.");
                setLoading(false);
            });
    }, [coords]);

    return (
        <div className="card">
            <div className="card-header flex items-center">
                <span className="icon-placeholder">☀️</span> Clima y Pronóstico (24h)
            </div>
            {loading ? (
                <div className="text-center py-6">Cargando clima...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-6">{error}</div>
            ) : weather ? (
                <>
                    <div className="text-center">
                        <p className="text-5xl cultiva-text-main">
                            {Math.round(weather.main.temp)}°C
                        </p>
                        <p className="cultiva-text-secondary capitalize">
                            {weather.weather[0].description}
                        </p>
                    </div>
                    <div className="mt-4 flex justify-around cultiva-text-secondary">
                        <p>Max: {Math.round(weather.main.temp_max)}°C</p>
                        <p>Min: {Math.round(weather.main.temp_min)}°C</p>
                    </div>
                    <p className="text-xs cultiva-text-secondary text-center mt-3">
                        Fuente: OpenWeatherMap
                    </p>
                </>
            ) : (
                <div className="text-center py-6">No hay datos de clima.</div>
            )}
        </div>
    );
}


    const API_KEY = "f61630c5193995d939b6b8024057b009";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import "./App.css";
import SearchBar from "./components/SearchBar";
import PronosticWeather from "./components/PronosticWeather";
import Date_Hour from "./components/Date_Hour";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [city, setCity] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
const InfoCity = city === null ? weatherInfo : city

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const API_KEY = "f61630c5193995d939b6b8024057b009";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    axios
      .get(url)
      .then(({ data }) => setWeatherInfo(data))
      .catch((err) => console.log(err));
  };

  const backgroundImage = isDarkMode
    ? "background/image002_DarkVersion.jpg"
    : "background/image001_LightVersion.jpg";

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <main
        className={`bg-cover bg-center min-h-screen font-lato p-2 grid grid-rows-[1fr_5fr_2fr_1fr_1fr] place-items-center ${
          isDarkMode ? "bg-black bg-opacity-50 text-white" : "bg-white bg-opacity-70 text-black"
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`

        }}
      >
        <SearchBar setCity={setCity} isDarkMode={isDarkMode} />
        <Weather InfoCity={InfoCity} isDarkMode={isDarkMode} />
        
        <Date_Hour isDarkMode={isDarkMode}/>
        
        {/* <PronosticWeather/> */}
        <button
          onClick={toggleDarkMode}
          className={`absolute bottom-5 right-5 px-4 py-2 font-bold rounded ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </main>
    </div>
  );
}

export default App;