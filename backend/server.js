const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs-extra'); // Import fs-extra

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Proxy endpoint for OpenWeatherMap API
app.get('/api/clima', async (req, res) => {
    const { lat, lon } = req.query;
    const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }
    if (!OPENWEATHER_API_KEY) {
        console.error('OPENWEATHER_API_KEY is not set in backend/.env');
        return res.status(500).json({ error: 'Server configuration error: API key missing.' });
    }

    try {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`;
        const response = await axios.get(weatherApiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling OpenWeatherMap API:', error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            res.status(500).json({ error: 'No response from OpenWeatherMap API.' });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
});

// API endpoint for Cultivos
const CULTIVOS_FILE_PATH = './backend/data/cultivos.json';

// GET all cultivos
app.get('/api/cultivos', async (req, res) => {
    try {
        const cultivos = await fs.readJson(CULTIVOS_FILE_PATH);
        res.json(cultivos);
    } catch (error) {
        console.error('Error reading cultivos.json:', error.message);
        res.status(500).json({ error: 'Error al obtener los cultivos.' });
    }
});

// POST a new cultivo
app.post('/api/cultivos', async (req, res) => {
    try {
        const newCultivo = req.body;
        if (!newCultivo || !newCultivo.nombre || !newCultivo.siembra) {
            return res.status(400).json({ error: 'Nombre y fecha de siembra son requeridos.' });
        }

        const cultivos = await fs.readJson(CULTIVOS_FILE_PATH);
        cultivos.push(newCultivo);
        await fs.writeJson(CULTIVOS_FILE_PATH, cultivos, { spaces: 2 }); // Pretty print JSON

        res.status(201).json(newCultivo); // 201 Created
    } catch (error) {
        console.error('Error writing to cultivos.json:', error.message);
        res.status(500).json({ error: 'Error al guardar el cultivo.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend proxy server running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});