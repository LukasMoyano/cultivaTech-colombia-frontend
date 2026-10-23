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

// --- CONFIGURACIÓN BLOCKCHAIN CULTIVATECH (SEPOLIA TESTNET) ---
const RPC_URL = process.env.RPC_URL || "https://sepolia.drpc.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const BATCH_SIZE = Math.max(1, Number.parseInt(process.env.BATCH_SIZE || "5", 10));
const MAX_TS_SKEW_MS = Number.parseInt(process.env.MAX_TS_SKEW_MS || "300000", 10);
const ORACLE_STATE_PATH = process.env.ORACLE_STATE_PATH || "./data/oraculo_estado.json";
const ALLOW_SIMULATION = process.env.ALLOW_SIMULATION !== undefined
    ? process.env.ALLOW_SIMULATION === "true"
    : process.env.NODE_ENV !== "production";
const DEFAULT_DEVICE_SECRET = process.env.DEVICE_HMAC_SECRET ||
    (process.env.NODE_ENV === "production" ? null : "dev-hmac-secret-change-me");

let DEVICE_SECRETS = {};
try {
    DEVICE_SECRETS = JSON.parse(process.env.DEVICE_SECRETS || "{}");
} catch (error) {
    console.error("DEVICE_SECRETS no es JSON válido. Se usará DEVICE_HMAC_SECRET.");
}

const ALLOWED_NODES = (process.env.ALLOWED_NODES || "")
    .split(",")
    .map((node) => node.trim())
    .filter(Boolean);
const SIMULATION_NODE = process.env.SIMULATION_NODE || "SIMULADOR-WEB";

// Telemetría en vivo: historial efímero en Render Free.
const TELEMETRY_PATH = process.env.TELEMETRY_PATH || "./data/telemetria.json";
const TELEMETRY_HISTORY_MAX = Math.max(
    10,
    Math.min(1000, Number.parseInt(process.env.TELEMETRY_HISTORY_MAX || "240", 10))
);
const TELEMETRY_SAVE_DEBOUNCE_MS = Math.max(
    500,
    Number.parseInt(process.env.TELEMETRY_SAVE_DEBOUNCE_MS || "2000", 10)
);
const TELEMETRY_HEARTBEAT_MS = Math.max(
    5000,
    Number.parseInt(process.env.TELEMETRY_HEARTBEAT_MS || "15000", 10)
);

const ABI = [
    "function registrarRaizBatch(bytes32 _raizBatch) external",
    "function registrarHashesBatch(bytes32[] calldata hashes) external",
    "event RaizAnclada(bytes32 indexed raizBatch, uint256 timestamp, address sensor)",
    "event HashesLote(bytes32 indexed raizBatch, bytes32[] hashes)"
];

let provider, wallet, contratoTrazabilidad;
try {
    if (PRIVATE_KEY && CONTRACT_ADDRESS) {
        provider = new ethers.JsonRpcProvider(RPC_URL);
        wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        contratoTrazabilidad = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
        console.log("Conectado a Sepolia. Contrato Oráculo listo.");
    } else {
        console.warn("⚠️ Credenciales Web3 no configuradas en .env. Modo simulación activado.");
    }
} catch (error) {
    console.error("Error al inicializar proveedor Web3:", error.message);
}

// =================================================================
// ORÁCULO: PAYLOAD CANÓNICO, HMAC, ANTI-REPLAY Y COLA DURABLE
// =================================================================

fs.ensureDirSync(require("path").dirname(ORACLE_STATE_PATH));

function estadoInicial() {
    return {
        pending: [],
        seen: {},
        anclados: [],
        ultimaRaiz: null,
        ultimaTx: null,
        actualizadoEn: new Date().toISOString()
    };
}

function cargarEstado() {
    try {
        if (fs.existsSync(ORACLE_STATE_PATH)) {
            const guardado = fs.readJsonSync(ORACLE_STATE_PATH);
            return {
                ...estadoInicial(),
                ...guardado,
                pending: Array.isArray(guardado.pending) ? guardado.pending : [],
                anclados: Array.isArray(guardado.anclados) ? guardado.anclados : [],
                seen: guardado.seen && typeof guardado.seen === "object" ? guardado.seen : {}
            };
        }
    } catch (error) {
        console.error("No se pudo leer el estado del oráculo:", error.message);
    }
    return estadoInicial();
}

const oracleState = cargarEstado();

// =================================================================
// TELEMETRÍA EN VIVO (SSE)
// =================================================================

fs.ensureDirSync(require("path").dirname(TELEMETRY_PATH));

function estadoTelemetriaInicial() {
    return { latest: null, history: [] };
}

function cargarTelemetria() {
    try {
        if (!fs.existsSync(TELEMETRY_PATH)) return estadoTelemetriaInicial();
        const guardado = fs.readJsonSync(TELEMETRY_PATH);
        const history = Array.isArray(guardado.history)
            ? guardado.history.filter((item) => item && Number.isFinite(Number(item.timestamp)))
            : [];
        const recortada = history.slice(-TELEMETRY_HISTORY_MAX);
        return {
            latest: guardado.latest || recortada[recortada.length - 1] || null,
            history: recortada
        };
    } catch (error) {
        console.error("No se pudo leer el historial de telemetría:", error.message);
        return estadoTelemetriaInicial();
    }
}

const telemetryState = cargarTelemetria();
const telemetryClients = new Set();
let telemetrySaveTimer = null;

function guardarTelemetria() {
    const tmpPath = `${TELEMETRY_PATH}.tmp`;
    fs.writeJsonSync(tmpPath, telemetryState, { spaces: 2 });
    fs.renameSync(tmpPath, TELEMETRY_PATH);
}

function programarGuardadoTelemetria() {
    if (telemetrySaveTimer) return;
    telemetrySaveTimer = setTimeout(() => {
        telemetrySaveTimer = null;
        try {
            guardarTelemetria();
        } catch (error) {
            console.error("No se pudo persistir la telemetría:", error.message);
        }
    }, TELEMETRY_SAVE_DEBOUNCE_MS);
    if (typeof telemetrySaveTimer.unref === "function") telemetrySaveTimer.unref();
}

function normalizarLecturaTelemetria({ node, ts, sensors, hash, nonce }) {
    const mq4Raw = Number(sensors?.mq4_raw);
    const voltageMv = Number(sensors?.voltage_mv);
    return {
        node: String(node),
        mac: String(node),
        timestamp: Number(ts),
        sensor: "MQ-4",
        mq4_raw: Number.isFinite(mq4Raw) ? mq4Raw : null,
        voltage_mv: Number.isFinite(voltageMv) ? voltageMv : null,
        voltage: Number.isFinite(voltageMv) ? Number((voltageMv / 1000).toFixed(3)) : null,
        hash: hash || null,
        nonce: nonce ?? null,
        receivedAt: new Date().toISOString()
    };
}

function emitirTelemetria(lectura) {
    const mensaje = `data: ${JSON.stringify(lectura)}\n\n`;
    for (const cliente of telemetryClients) {
        try {
            cliente.write(mensaje);
        } catch {
            telemetryClients.delete(cliente);
            try { cliente.end(); } catch { /* ignorar */ }
        }
    }
}

function registrarTelemetria(lectura) {
    telemetryState.latest = lectura;
    telemetryState.history.push(lectura);
    if (telemetryState.history.length > TELEMETRY_HISTORY_MAX) {
        telemetryState.history = telemetryState.history.slice(-TELEMETRY_HISTORY_MAX);
    }
    programarGuardadoTelemetria();
    emitirTelemetria(lectura);
    return lectura;
}

function limpiarSeen() {
    const retencionMs = Math.max(MAX_TS_SKEW_MS * 2, 10 * 60 * 1000);
    const limite = Date.now() - retencionMs;
    for (const [clave, fecha] of Object.entries(oracleState.seen)) {
        const momento = Date.parse(fecha);
        if (!Number.isFinite(momento) || momento < limite) {
            delete oracleState.seen[clave];
        }
    }

    const entradas = Object.entries(oracleState.seen);
    if (entradas.length > 5000) {
        entradas
            .sort((a, b) => Date.parse(b[1]) - Date.parse(a[1]))
            .slice(5000)
            .forEach(([clave]) => delete oracleState.seen[clave]);
    }
}

function guardarEstado() {
    limpiarSeen();
    oracleState.actualizadoEn = new Date().toISOString();
    const tmpPath = `${ORACLE_STATE_PATH}.tmp`;
    fs.writeJsonSync(tmpPath, oracleState, { spaces: 2 });
    fs.renameSync(tmpPath, ORACLE_STATE_PATH);
}

function normalizarSensores(sensors) {
    if (Array.isArray(sensors)) {
        return sensors.map((valor) => normalizarValor(valor));
    }
    if (sensors && typeof sensors === "object") {
        const normalizado = {};
        Object.keys(sensors).sort().forEach((clave) => {
            normalizado[clave] = normalizarValor(sensors[clave]);
        });
        return normalizado;
    }
    throw new Error("sensors debe ser un objeto o un arreglo.");
}

function normalizarValor(valor) {
    if (typeof valor === "number") {
        if (!Number.isFinite(valor)) throw new Error("Valor numérico no finito.");
        return Number(valor.toFixed(6));
    }
    return valor;
}

// Payload canónico: node / ts / sensors (+ nonce opcional).
// El orden de las claves y de los sensores es determinista.
function construirPayload({ node, ts, sensors, nonce }) {
    const base = {
        node: String(node),
        ts: Number(ts),
        sensors: normalizarSensores(sensors)
    };
    if (nonce !== undefined && nonce !== null && String(nonce) !== "") {
        base.nonce = String(nonce);
    }
    return JSON.stringify(base);
}

function hashPayload(payload) {
    return `0x${crypto.createHash("sha256").update(payload).digest("hex")}`;
}

function hmacPayload(payload, secreto) {
    return crypto.createHmac("sha256", secreto).update(payload).digest("hex");
}

function secretoDispositivo(node) {
    return DEVICE_SECRETS[node] || DEFAULT_DEVICE_SECRET;
}

function nodoAutorizado(node) {
    const nodo = String(node);
    if (ALLOW_SIMULATION && nodo === SIMULATION_NODE) return true;
    if (ALLOWED_NODES.length > 0 && !ALLOWED_NODES.includes(nodo)) return false;
    if (Object.keys(DEVICE_SECRETS).length > 0 && !DEVICE_SECRETS[nodo]) return false;
    return true;
}

function firmasIguales(recibida, esperada) {
    const a = Buffer.from(String(recibida || "").replace(/^0x/i, "").toLowerCase(), "hex");
    const b = Buffer.from(String(esperada || "").replace(/^0x/i, "").toLowerCase(), "hex");
    return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
}

function raizMerkle(hashes) {
    if (!hashes.length) throw new Error("Lote vacío.");
    let capa = hashes.map((hash) => hash.toLowerCase());

    while (capa.length > 1) {
        const siguiente = [];
        for (let i = 0; i < capa.length; i += 2) {
            const izquierda = capa[i];
            const derecha = i + 1 < capa.length ? capa[i + 1] : capa[i];
            siguiente.push(ethers.keccak256(ethers.solidityPacked(
                ["bytes32", "bytes32"],
                [izquierda, derecha]
            )));
        }
        capa = siguiente;
    }

    return capa[0];
}

function crearLectura({ node, ts, sensors, nonce }) {
    const payload = construirPayload({ node, ts, sensors, nonce });
    return { payload, hash: hashPayload(payload) };
}

function encolarLectura({ node, ts, sensors, nonce, hash }) {
    const hashFinal = hash || crearLectura({ node, ts, sensors, nonce }).hash;
    const entrada = {
        id: crypto.randomUUID(),
        node: String(node),
        ts: Number(ts),
        hash: hashFinal,
        recibidoEn: new Date().toISOString()
    };
    oracleState.pending.push(entrada);
    return { hash: hashFinal, entrada };
}

let procesandoCola = false;

async function anclarLote(lote) {
    const hashes = lote.map((lectura) => lectura.hash);
    const raiz = raizMerkle(hashes);

    if (!contratoTrazabilidad) {
        return {
            modo: "simulacion",
            raiz,
            txHash: null,
            blockNumber: null
        };
    }

    const tx = await contratoTrazabilidad.registrarHashesBatch(hashes, { gasLimit: 600000 });
    const receipt = await tx.wait();
    return {
        modo: "sepolia",
        raiz,
        txHash: tx.hash,
        blockNumber: receipt.blockNumber
    };
}

async function procesarCola({ force = false } = {}) {
    if (procesandoCola) return { procesando: true };
    if (oracleState.pending.length === 0) return { procesando: false, anclados: 0 };
    if (!force && oracleState.pending.length < BATCH_SIZE) {
        return { procesando: false, pendientes: oracleState.pending.length };
    }

    procesandoCola = true;
    const tamanoLote = force ? oracleState.pending.length : BATCH_SIZE;
    const lote = oracleState.pending.slice(0, tamanoLote);
    let exito = false;

    try {
        const resultado = await anclarLote(lote);
        const idsAnclados = new Set(lote.map((lectura) => lectura.id));

        oracleState.pending = oracleState.pending.filter(
            (lectura) => !idsAnclados.has(lectura.id)
        );
        oracleState.ultimaRaiz = resultado.raiz;
        oracleState.ultimaTx = resultado.txHash;
        oracleState.anclados.unshift({
            ...resultado,
            hashes: lote.map((lectura) => lectura.hash),
            ancladoEn: new Date().toISOString()
        });
        oracleState.anclados = oracleState.anclados.slice(0, 50);
        guardarEstado();
        exito = true;

        console.log(
            `[Anclaje] ${lote.length} lecturas | raíz ${resultado.raiz} | ` +
            `${resultado.txHash ? `tx ${resultado.txHash}` : "modo simulación"}`
        );
        return { procesando: false, anclados: lote.length, ...resultado };
    } catch (error) {
        console.error("[Anclaje] Falló el lote; las lecturas permanecen en cola:", error.message);
        return { procesando: false, error: error.message };
    } finally {
        procesandoCola = false;
        if (exito && oracleState.pending.length >= BATCH_SIZE) {
            setImmediate(() => procesarCola().catch((error) => console.error(error.message)));
        }
    }
}

function estadoPublico() {
    return {
        modo: contratoTrazabilidad ? "sepolia" : "simulacion",
        batchSize: BATCH_SIZE,
        pendientes: oracleState.pending.length,
        ultimaRaiz: oracleState.ultimaRaiz,
        ultimaTx: oracleState.ultimaTx,
        urlExplorador: oracleState.ultimaTx
            ? `https://sepolia.etherscan.io/tx/${oracleState.ultimaTx}`
            : null,
        anclados: oracleState.anclados.slice(0, 10),
        telemetria: {
            puntos: telemetryState.history.length,
            clientesSse: telemetryClients.size,
            ultimaLectura: telemetryState.latest
        },
        actualizadoEn: oracleState.actualizadoEn
    };
}

app.get('/api/telemetry/latest', (req, res) => {
    res.json({ latest: telemetryState.latest });
});

app.get('/api/telemetry/history', (req, res) => {
    const solicitado = Number.parseInt(req.query.limit || "40", 10);
    const limite = Number.isFinite(solicitado)
        ? Math.max(1, Math.min(TELEMETRY_HISTORY_MAX, solicitado))
        : 40;
    const history = telemetryState.history.slice(-limite);
    res.json({ history, count: history.length });
});

app.get('/api/telemetry/stream', (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();

    res.write("retry: 5000\n\n");
    if (telemetryState.latest) {
        res.write(`data: ${JSON.stringify(telemetryState.latest)}\n\n`);
    }

    telemetryClients.add(res);

    const heartbeat = setInterval(() => {
        try {
            res.write(": keep-alive\n\n");
        } catch {
            clearInterval(heartbeat);
        }
    }, TELEMETRY_HEARTBEAT_MS);
    if (typeof heartbeat.unref === "function") heartbeat.unref();

    req.on("close", () => {
        clearInterval(heartbeat);
        telemetryClients.delete(res);
    });
});

// Endpoint Oráculo: valida HMAC-SHA256 del Edge, evita replay y encola.
app.post('/api/ingest', async (req, res) => {
    try {
        const { node, ts, sensors, nonce } = req.body || {};

        if (!node || ts === undefined || sensors === undefined) {
            return res.status(400).json({ error: 'Payload incompleto: se esperan node, ts y sensors.' });
        }

        if (!nodoAutorizado(node)) {
            return res.status(403).json({ error: 'Nodo no autorizado.' });
        }

        const secreto = secretoDispositivo(node);
        if (!secreto) {
            return res.status(503).json({ error: 'HMAC del dispositivo no configurado en el servidor.' });
        }

        const tsNum = Number(ts);
        if (!Number.isFinite(tsNum)) {
            return res.status(400).json({ error: 'ts debe ser un timestamp en milisegundos.' });
        }
        if (Math.abs(Date.now() - tsNum) > MAX_TS_SKEW_MS) {
            return res.status(422).json({ error: 'ts fuera de la ventana permitida. Sincronice NTP.' });
        }

        const payload = construirPayload({ node, ts: tsNum, sensors, nonce });
        const hmacEsperado = hmacPayload(payload, secreto);
        const hmacRecibido = req.body.hmac || req.headers['x-device-signature'];

        if (!firmasIguales(hmacRecibido, hmacEsperado)) {
            console.error(`[ALERTA SEGURIDAD] HMAC inválido para nodo ${node}.`);
            return res.status(403).json({ error: 'Firma HMAC-SHA256 inválida.' });
        }

        const { hash } = crearLectura({ node, ts: tsNum, sensors, nonce });
        const claveReplay = `${node}:${tsNum}:${hash}`;

        if (oracleState.seen[claveReplay]) {
            return res.status(409).json({ error: 'Replay detectado: lectura ya procesada.', hash });
        }

        oracleState.seen[claveReplay] = new Date().toISOString();
        encolarLectura({ node, ts: tsNum, sensors, nonce, hash });
        guardarEstado();

        const lectura = normalizarLecturaTelemetria({
            node,
            ts: tsNum,
            sensors,
            hash,
            nonce
        });
        registrarTelemetria(lectura);

        if (oracleState.pending.length >= BATCH_SIZE) {
            procesarCola().catch((error) => console.error(error.message));
        }

        return res.status(200).json({
            status: 'success',
            message: 'Lectura validada y encolada.',
            hash,
            pendientes: oracleState.pending.length,
            batchSize: BATCH_SIZE
        });
    } catch (error) {
        console.error('Error en /api/ingest:', error.message);
        return res.status(500).json({ error: 'Fallo interno del Oráculo Web3.' });
    }
});

app.get('/api/blockchain/status', (req, res) => {
    res.json(estadoPublico());
});

app.get('/api/blockchain/eventos', (req, res) => {
    res.json({ eventos: oracleState.anclados.slice(0, 20) });
});

app.post('/api/blockchain/flush', async (req, res) => {
    const resultado = await procesarCola({ force: true });
    res.json({ ...resultado, estado: estadoPublico() });
});

// Endpoint de demostración usado por el panel web. Firma en servidor y encola.
app.post('/api/blockchain/registrar', async (req, res) => {
    try {
        if (!ALLOW_SIMULATION) {
            return res.status(403).json({ error: 'Simulación deshabilitada en este entorno.' });
        }

        const temperatura = Number(req.body?.temperatura);
        const humedad = Number(req.body?.humedad);
        if (!Number.isFinite(temperatura) || !Number.isFinite(humedad)) {
            return res.status(400).json({ error: 'Se esperan temperatura y humedad numéricas.' });
        }

        const node = req.body?.node || 'SIMULADOR-WEB';
        const secreto = secretoDispositivo(node);
        if (!secreto) {
            return res.status(503).json({ error: 'HMAC del dispositivo no configurado en el servidor.' });
        }

        const ts = Date.now();
        const sensors = { temperatura, humedad };
        const payload = construirPayload({ node, ts, sensors });
        const hash = hashPayload(payload);

        encolarLectura({ node, ts, sensors, hash });
        oracleState.seen[`${node}:${ts}:${hash}`] = new Date().toISOString();
        guardarEstado();

        if (oracleState.pending.length >= BATCH_SIZE) {
            procesarCola().catch((error) => console.error(error.message));
        }

        return res.status(200).json({
            status: 'success',
            txStatus: contratoTrazabilidad ? 'pendiente_confirmacion' : 'simulacion',
            hashGenerado: hash,
            node,
            ts,
            pendientes: oracleState.pending.length
        });
    } catch (error) {
        console.error('Error en /api/blockchain/registrar:', error.message);
        return res.status(500).json({ error: 'No se pudo registrar la lectura simulada.' });
    }
});

app.get('/', (req, res) => {
    res.send('CultivaTech Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Backend proxy server running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
    if (oracleState.pending.length >= BATCH_SIZE) {
        setImmediate(() => procesarCola().catch((error) => console.error(error.message)));
    }
});
