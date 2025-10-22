#!/usr/bin/env python3
"""
Servidor HTTP optimizado para ngrok
Evita problemas de caché y headers
"""

import http.server
import socketserver
import os
import time
from urllib.parse import urlparse, parse_qs

class OptimizedHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Headers optimizados para ngrok
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-XSS-Protection', '1; mode=block')
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
    
    # Cambiar al directorio del proyecto (versión más reciente)
    project_dir = os.path.dirname(os.path.abspath(__file__))
    prototype_dir = os.path.join(project_dir, 'leal-360-prototype')
    if os.path.exists(prototype_dir):
        os.chdir(prototype_dir)
        print(f"📁 Sirviendo desde: {prototype_dir}")
    else:
        os.chdir(project_dir)
        print(f"📁 Sirviendo desde: {project_dir}")
    
    with socketserver.TCPServer(("", PORT), OptimizedHTTPRequestHandler) as httpd:
        print(f"🚀 Servidor HTTP optimizado iniciado en http://localhost:{PORT}")
        print("📝 Headers optimizados para ngrok")
        print("🔄 Archivos se recargan automáticamente")
        print("⏹️  Presiona Ctrl+C para detener")
        httpd.serve_forever()
