#!/usr/bin/env python3
"""
Servidor de desarrollo con política de caché agresiva
Fuerza la recarga de archivos para evitar problemas de caché
"""

import http.server
import socketserver
import os
import time
from urllib.parse import urlparse, parse_qs

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Headers para forzar recarga durante desarrollo
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Last-Modified', time.strftime('%a, %d %b %Y %H:%M:%S GMT', time.gmtime()))
        super().end_headers()
    
    def send_response(self, code, message=None):
        super().send_response(code, message)
        # Aplicar headers de caché a todas las respuestas
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
    
    def do_GET(self):
        # Agregar timestamp a archivos estáticos
        if self.path.endswith(('.js', '.css')):
            parsed_url = urlparse(self.path)
            if 'v=' not in parsed_url.query:
                separator = '&' if parsed_url.query else '?'
                self.path = f"{parsed_url.path}{separator}v={int(time.time())}"
        
        super().do_GET()

if __name__ == "__main__":
    PORT = 8000
    
    # Cambiar al directorio del proyecto
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"🚀 Servidor de desarrollo iniciado en http://localhost:{PORT}")
        print("📝 Política de caché: NO-CACHE (desarrollo)")
        print("🔄 Archivos se recargan automáticamente")
        print("⏹️  Presiona Ctrl+C para detener")
        httpd.serve_forever()
