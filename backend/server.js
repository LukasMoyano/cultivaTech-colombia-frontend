const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs-extra');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken
const { ethers } = require("ethers");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS para producción
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como móvil apps o curl)
    if (!origin) return callback(null, true);
    
    // Obtener orígenes permitidos de las variables de entorno o usar lista por defecto
    const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
    const allowedOrigins = allowedOriginsEnv 
      ? allowedOriginsEnv.split(',').map(origin => origin.trim())
      : [
          'http://localhost:5173', // Vite dev server
          'http://localhost:3000', // React dev server
          'https://cultivatech-colombia-frontend.netlify.app', // Tu frontend en producción
          'https://cultivatech-backend.onrender.com' // Backend en producción (por si acaso)
        ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// =================================================================
// MIDDLEWARE
// =================================================================

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // Si no hay token, no autorizado

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Si el token no es válido, prohibido
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};


// =================================================================
// AUTHENTICATION ENDPOINTS
// =================================================================

const USERS_FILE_PATH = './data/usuarios.json';

// Register a new user
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, tipoDocumento, numeroDocumento, telefono } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const users = await fs.readJson(USERS_FILE_PATH);

        const userExists = users.some(user => user.email === email);
        if (userExists) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            email,
            passwordHash,
            tipoDocumento,
            numeroDocumento,
            telefono,
            role: 'user' // Default role
        };

        users.push(newUser);
        await fs.writeJson(USERS_FILE_PATH, users, { spaces: 2 });

        // --- Add Default Cultivos for the new user ---
        const cultivos = await fs.readJson(CULTIVOS_FILE_PATH);
        const newUserId = newUser.id;
        const cultivoIdBase = cultivos.length > 0 ? Math.max(...cultivos.map(c => c.id)) + 1 : 1;

        const defaultCultivos = [
            { 
                id: cultivoIdBase, 
                userId: newUserId, 
                nombre: '🍅 Tomates - Lote Sol Naciente', 
                estado: 'Saludable',
                siembra: new Date().toISOString().split('T')[0], // Fecha actual
                humedad: '',
                humedad4h: '',
                temperatura4h: '',
                color: 'bg-primary',
                imagen: '',
                fenologico: '',
                ia: []
            },
            { 
                id: cultivoIdBase + 1, 
                userId: newUserId, 
                nombre: '🍓 Fresas - El Edén', 
                estado: 'Saludable',
                siembra: new Date().toISOString().split('T')[0],
                humedad: '',
                humedad4h: '',
                temperatura4h: '',
                color: 'bg-primary',
                imagen: '',
                fenologico: '',
                ia: []
            },
            { 
                id: cultivoIdBase + 2, 
                userId: newUserId, 
                nombre: '🌽 Maíz - La Esperanza', 
                estado: 'Monitoreando',
                siembra: new Date().toISOString().split('T')[0],
                humedad: '',
                humedad4h: '',
                temperatura4h: '',
                color: 'bg-primary',
                imagen: '',
                fenologico: '',
                ia: []
            }
        ];

        cultivos.push(...defaultCultivos);
        await fs.writeJson(CULTIVOS_FILE_PATH, cultivos, { spaces: 2 });
        // --- End of Default Cultivos ---

        // No devolver el hash de la contraseña
        const userForResponse = { ...newUser };
        delete userForResponse.passwordHash;

        res.status(201).json(userForResponse);

    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Error registering user.' });
    }
});

// Login a user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const users = await fs.readJson(USERS_FILE_PATH);
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Crear el payload para el token
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        // Firmar el token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            message: "Login successful",
            user: payload,
            token 
        });

    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ error: 'Error logging in user.' });
    }
});

// =================================================================
// ADMIN ENDPOINTS
// =================================================================

app.get('/api/admin/users', [authenticateToken, isAdmin], async (req, res) => {
    try {
        const users = await fs.readJson(USERS_FILE_PATH);
        // Devuelve todos los datos de los usuarios, incluido el hash, para el admin
        res.json(users);
    } catch (error) {
        console.error('Error reading users.json:', error.message);
        res.status(500).json({ error: 'Error fetching users.' });
    }
});

// Reset a user's password
app.post('/api/admin/reset-password', [authenticateToken, isAdmin], async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        if (!userId || !newPassword) {
            return res.status(400).json({ error: 'User ID and new password are required.' });
        }

        const users = await fs.readJson(USERS_FILE_PATH);
        
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        users[userIndex].passwordHash = passwordHash;

        await fs.writeJson(USERS_FILE_PATH, users, { spaces: 2 });

        res.json({ message: `Password for user ${userId} has been reset successfully.` });

    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ error: 'Error resetting password.' });
    }
});


// =================================================================
// GENERAL API ENDPOINTS
// =================================================================

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

// API endpoint for Cultivos
const CULTIVOS_FILE_PATH = './data/cultivos.json';

// GET all cultivos for the logged-in user
app.get('/api/cultivos', authenticateToken, async (req, res) => {
    try {
        const cultivos = await fs.readJson(CULTIVOS_FILE_PATH);
        const userCultivos = cultivos.filter(c => c.userId === req.user.id);
        res.json(userCultivos);
    } catch (error) {
        console.error('Error reading cultivos.json:', error.message);
        res.status(500).json({ error: 'Error fetching cultivos.' });
    }
});

// POST a new cultivo for the logged-in user
app.post('/api/cultivos', authenticateToken, async (req, res) => {
    try {
        const cultivos = await fs.readJson(CULTIVOS_FILE_PATH);
        const newCultivo = {
            id: cultivos.length > 0 ? Math.max(...cultivos.map(c => c.id)) + 1 : 1,
            userId: req.user.id, // Associate with logged-in user
            ...req.body // Add all other properties from request
        };

        cultivos.push(newCultivo);
        await fs.writeJson(CULTIVOS_FILE_PATH, cultivos, { spaces: 2 });

        res.status(201).json(newCultivo);
    } catch (error) {
        console.error('Error creating cultivo:', error.message);
        res.status(500).json({ error: 'Error creating cultivo.' });
    }
});

// --- CONFIGURACIÓN BLOCKCHAIN CULTIVATECH (GANACHE LOCAL) ---
const RPC_URL = "http://127.0.0.1:7545"; // Puerto estándar de Ganache
let provider, wallet;
try {
    provider = new ethers.JsonRpcProvider(RPC_URL);
    // Llave privada de prueba de Ganache (Cuenta 1) - Reemplazar en producción
    const privateKeyTest = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"; 
    wallet = new ethers.Wallet(privateKeyTest, provider);
} catch (error) {
    console.log("Servidor Blockchain no iniciado aún. Ganache debe estar corriendo.");
}

app.post('/api/blockchain/registrar', async (req, res) => {
    const { temperatura, humedad } = req.body;
    try {
        // Simulación Edge Computing: Generar Hash del paquete de datos
        const dataString = JSON.stringify({ temp: temperatura, hum: humedad, time: Date.now() });
        const hashDato = "0x" + crypto.createHash('sha256').update(dataString).digest('hex');

        // Aquí iría la llamada al contrato inteligente instanciado con ethers.js
        // const tx = await contrato.registrarLectura(temperatura, humedad, hashDato);
        // await tx.wait();

        res.status(200).json({ 
            success: true, 
            mensaje: "Lectura inyectada en Blockchain local", 
            hashGenerado: hashDato,
            txStatus: "Simulado (Ganache)"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('CultivaTech Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Backend proxy server running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});
