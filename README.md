# Leal 360 - Prototipo de Integraciones

## Descripción
Prototipo interactivo de la plataforma Leal 360, incluyendo:
- Vista Overview con hero section y agente inteligente
- Vista de Integraciones con documentación de API completa
- Tabla comparativa de tipos de integración
- Documentación funcional de endpoints API

## Estructura del Proyecto
```
/leal-360-prototype/
  ├── index.html                    # Página principal
  ├── script.js                     # Lógica principal
  ├── styles.css                    # Estilos globales
  ├── overview-styles.css          # Estilos de Overview
  ├── integrations-styles.css      # Estilos de Integraciones
  ├── integrations-landing-styles.css # Estilos de landing de integraciones
  ├── api-data.js                   # Datos de endpoints API
  ├── api-components.js            # Componentes de documentación API
  ├── package.json                 # Configuración del proyecto
  └── config.json                  # Configuración adicional
```

## Características Principales

### Vista Overview
- Hero section con imagen de fondo
- Agente inteligente con chat flotante
- Sección de beneficios de Leal 360
- Flujo del ecosistema de integraciones
- Call-to-action para explorar integraciones

### Vista de Integraciones
- Landing page con tipos de integración
- Documentación completa de API REST
- Tabla comparativa de funcionalidades
- Navegación intuitiva entre secciones

### Documentación de API
- Endpoints organizados por categorías
- Ejemplos de código (cURL, Request Body, Response)
- Testing interactivo de endpoints
- Parámetros y respuestas detalladas

## Instalación Local

### Prerrequisitos
- Python 3.x (para servidor local)
- Git

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone git@github.com:earistizabal-lealco/integraciones.git
   cd integraciones
   ```

2. **Navegar al directorio del prototipo:**
   ```bash
   cd leal-360-prototype
   ```

3. **Servir localmente:**
   ```bash
   python3 -m http.server 8000
   ```

4. **Abrir en navegador:**
   ```
   http://localhost:8000
   ```

## URL de Producción
[URL de GitHub Pages se configurará]

## Tecnologías Utilizadas
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsive
- **JavaScript (Vanilla)** - Lógica sin dependencias
- **Git** - Control de versiones

## Desarrollo

### Estructura de Commits
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `style:` - Cambios de estilos
- `docs:` - Documentación
- `refactor:` - Refactorización de código

### Hacer Cambios
1. **Crear una rama nueva:**
   ```bash
   git checkout -b feature/nombre-del-cambio
   ```

2. **Hacer cambios y commit:**
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

3. **Subir rama:**
   ```bash
   git push origin feature/nombre-del-cambio
   ```

4. **Crear Pull Request en GitHub**

### Cache Busting
Al hacer cambios en CSS/JS, actualizar el timestamp en `index.html`:
```html
<link rel="stylesheet" href="styles.css?v=2025-10-08-XX-XX">
```

## Funcionalidades Implementadas

### ✅ Completadas
- [x] Vista Overview con hero section
- [x] Agente inteligente con chat flotante
- [x] Vista de integraciones con landing page
- [x] Documentación completa de API REST
- [x] Tabla comparativa de tipos de integración
- [x] Navegación entre secciones
- [x] Diseño responsive
- [x] Estructura modular de archivos

### 🔄 En Desarrollo
- [ ] Funcionalidad completa del agente inteligente
- [ ] Más endpoints en la documentación API
- [ ] Optimización del hero copy en 2 líneas

### 📋 Pendientes
- [ ] Implementar integraciones SFTP
- [ ] Implementar integraciones Cajero Web
- [ ] Implementar marketplace de integraciones
- [ ] Testing automatizado

## Contacto
- **Repositorio:** [GitHub](https://github.com/earistizabal-lealco/integraciones)
- **Equipo:** Leal 360 Development Team

## Licencia
Proyecto interno de Leal 360