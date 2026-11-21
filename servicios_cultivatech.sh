#!/usr/bin/env bash
# 🌾 Control Unificado de Servicios CultivaTech ColombIA
# IR Productions 2026 - Fusagasugá

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$DIR/backend"
EDGE_INJECTOR="/mnt/Proyectos4TB/backup_masterlukas/Documents/_-IR_Productions_2025/WwW_EndesarrolloWEB/ESP32_project001_IDE_Comunication/Proyect001_MQ4/inyector_telemetria_edge.py"

function start() {
    echo "🌾 Iniciando Servicios CultivaTech ColombIA..."
    fuser -k 3001/tcp 2>/dev/null
    fuser -k 5173/tcp 2>/dev/null
    pkill -f "inyector_telemetria_edge.py" 2>/dev/null
    sleep 1

    echo "⚡ Arrancando Backend (:3001)..."
    cd "$BACKEND_DIR" && node server.js > "$DIR/backend.log" 2>&1 &
    echo $! > "$DIR/.backend.pid"

    echo "🌐 Arrancando Frontend Vite (:5173 en 0.0.0.0)..."
    cd "$DIR" && npm run dev -- --host 0.0.0.0 --port 5173 > "$DIR/frontend.log" 2>&1 &
    echo $! > "$DIR/.frontend.pid"

    echo "📡 Arrancando Inyector Canónico Edge (HMAC-SHA256 NODE-CULTIVA-01)..."
    python3 "$EDGE_INJECTOR" > "$DIR/edge_telemetria.log" 2>&1 &
    echo $! > "$DIR/.edge.pid"

    sleep 2
    echo ""
    echo "=========================================================="
    echo "🌾 CULTIVATECH COLOMBIA EN VIVO Y TRANSMITIENDO:"
    echo "  • Tailscale VPN: http://100.93.134.33:5173"
    echo "  • LAN Local:     http://192.168.1.7:5173"
    echo "  • Telemetría API: http://100.93.134.33:3001/api/telemetry/latest"
    echo "  • Log Ingesta:   tail -f edge_telemetria.log"
    echo "=========================================================="
}

function stop() {
    echo "🛑 Deteniendo Servicios CultivaTech..."
    fuser -k 3001/tcp 2>/dev/null
    fuser -k 5173/tcp 2>/dev/null
    pkill -f "inyector_telemetria_edge.py" 2>/dev/null
    rm -f "$DIR/.backend.pid" "$DIR/.frontend.pid" "$DIR/.edge.pid"
    echo "✓ Servicios detenidos."
}

function status() {
    echo "📊 Estado Servicios CultivaTech:"
    if curl -s http://127.0.0.1:3001/api/telemetry/latest >/dev/null; then
        echo "  • Backend (:3001):          [ACTIVO ✓]"
    else
        echo "  • Backend (:3001):          [INACTIVO ✗]"
    fi

    if curl -s http://127.0.0.1:5173/ >/dev/null; then
        echo "  • Frontend (:5173):         [ACTIVO ✓]"
    else
        echo "  • Frontend (:5173):         [INACTIVO ✗]"
    fi

    if pgrep -f "inyector_telemetria_edge.py" >/dev/null; then
        echo "  • Telemetría Edge Activa:   [TRANSMITIENDO ✓]"
    else
        echo "  • Telemetría Edge Activa:   [DETENIDO ✗]"
    fi
}

case "$1" in
    start) start ;;
    stop) stop ;;
    restart) stop; sleep 1; start ;;
    status) status ;;
    *) echo "Uso: ./servicios_cultivatech.sh {start|stop|restart|status}"; exit 1 ;;
esac
