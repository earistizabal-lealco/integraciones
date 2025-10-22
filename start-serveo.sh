#!/bin/bash

echo "🚀 SOLUCIÓN ALTERNATIVA - Usando serveo.net (gratuito y confiable)"

# Limpiar procesos existentes
echo "🧹 Limpiando procesos existentes..."
pkill -f "python3.*http.server" 2>/dev/null
pkill -f ngrok 2>/dev/null
pkill -f cloudflared 2>/dev/null
sleep 2

# Liberar puertos
echo "🔓 Liberando puertos..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:8000 | xargs kill -9 2>/dev/null
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

# Usar serveo.net como túnel (gratuito y confiable)
echo "🔗 Creando túnel público con serveo.net..."
echo "📱 Esto puede tomar unos segundos..."

# Crear túnel con serveo
ssh -R 80:localhost:3000 serveo.net &
TUNNEL_PID=$!

# Esperar a que el túnel esté listo
sleep 5

echo ""
echo "🎉 ¡SERVIDOR Y TÚNEL FUNCIONANDO!"
echo "🏠 Local: http://localhost:3000"
echo "🌐 Público: https://[subdomain].serveo.net"
echo ""
echo "💡 Para obtener la URL pública:"
echo "   1. Ve a https://serveo.net"
echo "   2. O usa: ssh -R 80:localhost:3000 serveo.net"
echo ""
echo "⏹️  Para detener: pkill -f 'python3.*simple_server' && pkill -f ssh"
echo ""

# Mantener ejecutándose
wait
