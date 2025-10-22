#!/bin/bash

echo "🚀 SOLUCIÓN DEFINITIVA - Servidor con puerto alternativo"

# Limpiar TODO
echo "🧹 Limpiando procesos existentes..."
pkill -f "python3.*http.server" 2>/dev/null
pkill -f ngrok 2>/dev/null
sleep 3

# Liberar puertos
echo "🔓 Liberando puertos..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:8000 | xargs kill -9 2>/dev/null
lsof -ti:4040 | xargs kill -9 2>/dev/null
sleep 2

# Iniciar servidor en puerto 3000 (alternativo)
echo "🌐 Iniciando servidor HTTP en puerto 3000..."
python3 -m http.server 3000 &
SERVER_PID=$!

# Esperar y verificar
sleep 3
if ! curl -s http://localhost:3000 >/dev/null; then
    echo "❌ Error: Servidor no responde"
    exit 1
fi

echo "✅ Servidor HTTP funcionando en puerto 3000"

# Iniciar ngrok
echo "🔗 Iniciando ngrok en puerto 3000..."
ngrok http 3000 &
NGROK_PID=$!

# Esperar y obtener URL
sleep 5
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['tunnels'][0]['public_url'])" 2>/dev/null)

if [ -z "$NGROK_URL" ]; then
    echo "❌ Error: No se pudo obtener URL de ngrok"
    exit 1
fi

echo "✅ URL obtenida: $NGROK_URL"

# Probar URL
if curl -s -I "$NGROK_URL" | grep -q "200 OK"; then
    echo "✅ URL funcionando correctamente"
else
    echo "⚠️  URL no responde correctamente"
fi

# Abrir URLs
open "$NGROK_URL"
open http://localhost:4040

echo ""
echo "🎉 ¡SERVIDOR FUNCIONANDO!"
echo "📱 URL PÚBLICA: $NGROK_URL"
echo "🔧 Dashboard: http://localhost:4040"
echo "🏠 Local: http://localhost:3000"
echo ""
echo "⏹️  Para detener: pkill -f 'python3.*http.server' && pkill -f ngrok"
echo ""

# Mantener ejecutándose
wait
