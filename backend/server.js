const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs-extra');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
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
        const { email, password } = req.body;
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
            role: 'user' // Default role
        };

        users.push(newUser);
        await fs.writeJson(USERS_FILE_PATH, users, { spaces: 2 });

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

        const isMatch = user.passwordHash.startsWith('$2b

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
        // Nunca devuelvas las contraseñas, ni siquiera hasheadas
        const safeUsers = users.map(({ passwordHash, ...user }) => user);
        res.json(safeUsers);
    } catch (error) {
        console.error('Error reading users.json:', error.message);
        res.status(500).json({ error: 'Error fetching users.' });
    }
});


// =================================================================
// GENERAL API ENDPOINTS
// =================================================================

// Proxy endpoint for OpenWeatherMap API
app.get('/api/clima', async (req, res) => {
    // ... (código existente sin cambios)
});

// API endpoint for Cultivos
const CULTIVOS_FILE_PATH = './data/cultivos.json';

// GET all cultivos
app.get('/api/cultivos', async (req, res) => {
    // ... (código existente sin cambios)
});

// POST a new cultivo
app.post('/api/cultivos', async (req, res) => {
    // ... (código existente sin cambios)
});

app.listen(PORT, () => {
    console.log(`Backend proxy server running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});
)
          ? await bcrypt.compare(password, user.passwordHash)
          : password === user.passwordHash;

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
        // Nunca devuelvas las contraseñas, ni siquiera hasheadas
        const safeUsers = users.map(({ passwordHash, ...user }) => user);
        res.json(safeUsers);
    } catch (error) {
        console.error('Error reading users.json:', error.message);
        res.status(500).json({ error: 'Error fetching users.' });
    }
});


// =================================================================
// GENERAL API ENDPOINTS
// =================================================================

// Proxy endpoint for OpenWeatherMap API
app.get('/api/clima', async (req, res) => {
    // ... (código existente sin cambios)
});

// API endpoint for Cultivos
const CULTIVOS_FILE_PATH = './data/cultivos.json';

// GET all cultivos
app.get('/api/cultivos', async (req, res) => {
    // ... (código existente sin cambios)
});

// POST a new cultivo
app.post('/api/cultivos', async (req, res) => {
    // ... (código existente sin cambios)
});

app.listen(PORT, () => {
    console.log(`Backend proxy server running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});
