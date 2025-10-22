#!/bin/bash

echo "🎉 SOLUCIÓN FINAL - Servidor local + Cloudflare Tunnel"

# Limpiar procesos existentes
echo "🧹 Limpiando procesos existentes..."
pkill -f "python3.*simple_server" 2>/dev/null
pkill -f cloudflared 2>/dev/null
sleep 2

# Liberar puerto 3000
echo "🔓 Liberando puerto 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2

# Iniciar servidor local
echo "🌐 Iniciando servidor HTTP en puerto 3000..."
python3 simple_server.py &
SERVER_PID=$!

# Esperar a que el servidor esté listo
sleep 3

# Verificar que el servidor esté funcionando
if ! curl -s http://localhost:3000 >/dev/null; then
    echo "❌ Error: Servidor HTTP no responde"
    exit 1
fi

echo "✅ Servidor HTTP funcionando correctamente"

# Iniciar Cloudflare Tunnel
echo "🔗 Iniciando Cloudflare Tunnel..."
cloudflared tunnel --url http://localhost:3000 &
TUNNEL_PID=$!

# Esperar a que el túnel esté listo
sleep 5

echo ""
echo "🎉 ¡SERVIDOR Y TÚNEL FUNCIONANDO!"
echo "🏠 Local: http://localhost:3000"
echo "🌐 Público: https://[subdomain].trycloudflare.com"
echo ""
echo "💡 Para obtener la URL pública:"
echo "   1. Revisa los logs de cloudflared arriba"
echo "   2. Busca la línea: 'Your quick Tunnel has been created! Visit it at'"
echo ""
echo "⏹️  Para detener: pkill -f 'python3.*simple_server' && pkill -f cloudflared"
echo ""

# Mantener ejecutándose
wait
