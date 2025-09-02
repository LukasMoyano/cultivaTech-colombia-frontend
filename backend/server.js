const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001; // Server port

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Proxy endpoint for OpenWeatherMap API
app.get('/api/clima', async (req, res) => {
    const { lat, lon } = req.query; // Get lat and lon from frontend query parameters
    const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY; // Get API key from environment variables

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

// Start the server
app.listen(PORT, () => {
    console.log(`Backend proxy server running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});
