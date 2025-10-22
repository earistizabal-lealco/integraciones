#!/bin/bash

echo "🚀 Iniciando servidor completo con ngrok..."

# Limpiar procesos existentes
echo "🧹 Limpiando procesos existentes..."
pkill -f "python3.*http.server" 2>/dev/null
pkill -f ngrok 2>/dev/null
sleep 2

# Verificar que el puerto esté libre
if lsof -ti:8000 >/dev/null 2>&1; then
    echo "❌ Puerto 8000 aún en uso, forzando liberación..."
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Iniciar servidor HTTP
echo "🌐 Iniciando servidor HTTP en puerto 8000..."
python3 -m http.server 8000 &
SERVER_PID=$!

# Esperar a que el servidor esté listo
sleep 3

# Verificar que el servidor esté funcionando
if ! curl -s http://localhost:8000 >/dev/null; then
    echo "❌ Error: Servidor HTTP no responde"
    exit 1
fi

echo "✅ Servidor HTTP funcionando correctamente"

# Iniciar ngrok
echo "🔗 Iniciando ngrok..."
ngrok http 8000 --log=stdout &
NGROK_PID=$!

# Esperar a que ngrok esté listo
sleep 5

# Obtener la URL pública
echo "📡 Obteniendo URL pública..."
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['tunnels'][0]['public_url'])" 2>/dev/null)

if [ -z "$NGROK_URL" ]; then
    echo "❌ Error: No se pudo obtener la URL de ngrok"
    echo "🔍 Verificando estado de ngrok..."
    ps aux | grep ngrok
    exit 1
fi

echo "✅ URL pública obtenida: $NGROK_URL"

# Probar la URL
echo "🧪 Probando URL pública..."
if curl -s -I "$NGROK_URL" | grep -q "200 OK"; then
    echo "✅ URL pública funcionando correctamente"
else
    echo "⚠️  URL pública no responde correctamente"
fi

# Abrir URLs
echo "🌐 Abriendo URLs..."
open "$NGROK_URL"
open http://localhost:4040

echo ""
echo "🎉 ¡Servidor completo iniciado!"
echo "📱 URL Pública: $NGROK_URL"
echo "🔧 Dashboard: http://localhost:4040"
echo "🏠 Local: http://localhost:8000"
echo ""
echo "⏹️  Para detener: pkill -f 'python3.*http.server' && pkill -f ngrok"
echo ""

# Mantener el script ejecutándose
wait
