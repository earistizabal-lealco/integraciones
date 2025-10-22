#!/bin/bash

# Script de desarrollo con política de caché agresiva
echo "🚀 Iniciando servidor de desarrollo con política NO-CACHE"

# Matar cualquier servidor existente
pkill -f "python3.*http.server" 2>/dev/null
pkill -f "dev-server.py" 2>/dev/null

# Esperar un momento
sleep 1

# Iniciar servidor con headers de caché
python3 -c "
import http.server
import socketserver
import os

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

PORT = 8000
with socketserver.TCPServer(('', PORT), NoCacheHandler) as httpd:
    print(f'🚀 Servidor iniciado en http://localhost:{PORT}')
    print('📝 Política: NO-CACHE (desarrollo)')
    print('🔄 Archivos se recargan automáticamente')
    print('⏹️  Presiona Ctrl+C para detener')
    httpd.serve_forever()
"

