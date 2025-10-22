#!/usr/bin/env python3
"""
Servidor HTTP simple y robusto para servir archivos estáticos
Alternativa a ngrok cuando está caído
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Headers para evitar problemas de CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # Servir archivos estáticos
        super().do_GET()
    
    def log_message(self, format, *args):
        # Log personalizado
        print(f"🌐 {self.address_string()} - {format % args}")

def get_local_ip():
    """Obtener la IP local de la máquina"""
    import socket
    try:
        # Conectar a una dirección externa para obtener la IP local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

def main():
    PORT = 3000
    
    # Cambiar al directorio del proyecto
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Verificar que el puerto esté libre
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', PORT))
    sock.close()
    
    if result == 0:
        print(f"❌ Puerto {PORT} ya está en uso")
        print("💡 Intenta con: python3 simple_server.py --port 3001")
        sys.exit(1)
    
    # Crear servidor
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        local_ip = get_local_ip()
        
        print("🚀 Servidor HTTP iniciado")
        print(f"🏠 Local: http://localhost:{PORT}")
        print(f"🌐 Red local: http://{local_ip}:{PORT}")
        print("")
        print("📱 Para acceder desde otros dispositivos:")
        print(f"   - Mismo WiFi: http://{local_ip}:{PORT}")
        print("")
        print("⏹️  Presiona Ctrl+C para detener")
        print("=" * 50)
        
        # Abrir navegador automáticamente
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor detenido")
            sys.exit(0)

if __name__ == "__main__":
    main()
