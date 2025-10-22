#!/bin/bash

# Script para iniciar ngrok con configuración optimizada
echo "🚀 Iniciando ngrok con configuración optimizada..."

# Detener cualquier instancia de ngrok existente
pkill -f ngrok 2>/dev/null
sleep 2

# Iniciar ngrok con configuración que evita la página de advertencia
ngrok http 8000 \
  --host-header=rewrite \
  --log=stdout \
  --log-level=info \
  --log-format=logfmt \
  --web-addr=localhost:4040

echo "✅ Ngrok iniciado correctamente"
echo "📊 Dashboard: http://localhost:4040"
echo "🌐 URL pública disponible en el dashboard"
