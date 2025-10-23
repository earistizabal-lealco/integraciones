# Plan: Despliegue y Colaboración del Proyecto

## Objetivo
1. Subir la versión actual al repositorio de GitHub
2. Disponibilizar una URL pública mediante GitHub Pages
3. Preparar el repositorio para colaboración del equipo técnico

## Paso 1: Subir al Repositorio de GitHub

### Verificar estado del repositorio
```bash
cd /Users/emilianoaristizabal/Integraciones\ V0
git status
```

### Agregar todos los cambios
```bash
git add .
```

### Crear commit con mensaje descriptivo
```bash
git commit -m "feat: prototipo completo de Leal 360 con Overview e Integraciones"
```

### Subir al repositorio remoto
```bash
git push origin main
```

**Nota**: Si el repositorio ya existe en `git@github.com:earistizabal-lealco/integraciones.git`, esto actualizará la rama main.

## Paso 2: Configurar GitHub Pages

### Opción A: Configurar desde la raíz del proyecto
1. Ir a GitHub: `https://github.com/earistizabal-lealco/integraciones`
2. Ir a **Settings** > **Pages**
3. En **Source**, seleccionar:
   - Branch: `main`
   - Folder: `/ (root)` o `/leal-360-prototype` (según estructura)
4. Click en **Save**
5. GitHub generará una URL como: `https://earistizabal-lealco.github.io/integraciones/`

### Opción B: Crear archivo de configuración para GitHub Pages
Crear archivo `.github/workflows/deploy.yml` para automatizar el despliegue:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./leal-360-prototype
```

### Ajustar rutas en el código
Si GitHub Pages sirve desde un subdirectorio, necesitamos ajustar las rutas:

**Archivo**: `leal-360-prototype/index.html`
- Cambiar rutas relativas a absolutas si es necesario
- Ejemplo: `href="styles.css"` → `href="/integraciones/styles.css"`

## Paso 3: Preparar para Colaboración del Equipo

### 3.1 Crear README.md profesional
**Archivo**: `README.md` en la raíz del proyecto

```markdown
# Leal 360 - Prototipo de Integraciones

## Descripción
Prototipo interactivo de la plataforma Leal 360, incluyendo:
- Vista Overview con hero section y agente inteligente
- Vista de Integraciones con documentación de API
- Tabla comparativa de tipos de integración

## Estructura del Proyecto
```
/leal-360-prototype/
  ├── index.html              # Página principal
  ├── script.js               # Lógica principal
  ├── styles.css              # Estilos globales
  ├── overview-styles.css     # Estilos de Overview
  ├── integrations-styles.css # Estilos de Integraciones
  ├── api-data.js             # Datos de endpoints API
  └── api-components.js       # Componentes de documentación API
```

## Instalación Local
1. Clonar el repositorio:
   ```bash
   git clone git@github.com:earistizabal-lealco/integraciones.git
   cd integraciones
   ```

2. Servir localmente:
   ```bash
   cd leal-360-prototype
   python3 -m http.server 8000
   ```

3. Abrir en navegador: `http://localhost:8000`

## URL de Producción
[URL de GitHub Pages aquí]

## Desarrollo
### Hacer cambios
1. Crear una rama nueva:
   ```bash
   git checkout -b feature/nombre-del-cambio
   ```

2. Hacer cambios y commit:
   ```bash
   git add .
   git commit -m "descripción del cambio"
   ```

3. Subir rama:
   ```bash
   git push origin feature/nombre-del-cambio
   ```

4. Crear Pull Request en GitHub

### Estructura de Commits
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `style:` - Cambios de estilos
- `docs:` - Documentación
- `refactor:` - Refactorización de código

## Tecnologías
- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla)
- No requiere dependencias externas

## Contacto
[Información de contacto del equipo]
```

### 3.2 Crear archivo .gitignore (si no existe)
```
# macOS
.DS_Store

# Editor
.vscode/
.idea/

# Temporales
*.log
*.tmp
*~

# Backups
backup/
*_backup.*
*_old.*
```

### 3.3 Agregar permisos de colaboradores
1. Ir a GitHub: `https://github.com/earistizabal-lealco/integraciones`
2. Ir a **Settings** > **Collaborators**
3. Click en **Add people**
4. Agregar usuarios del equipo técnico por email o username

### 3.4 Configurar protección de rama (opcional pero recomendado)
1. Ir a **Settings** > **Branches**
2. Click en **Add rule**
3. Branch name pattern: `main`
4. Activar:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
5. Click en **Create**

## Paso 4: Documentar para el Equipo

### Crear guía de desarrollo
**Archivo**: `CONTRIBUTING.md`

```markdown
# Guía de Contribución

## Flujo de Trabajo
1. Asignar un issue o crear uno nuevo
2. Crear rama desde `main`: `git checkout -b feature/issue-123`
3. Hacer cambios
4. Commit con mensaje descriptivo
5. Push y crear Pull Request
6. Esperar revisión y aprobación
7. Merge a `main`

## Convenciones de Código
- Usar indentación de 2 espacios
- Nombres de clases en kebab-case: `.hero-section`
- Nombres de funciones en camelCase: `renderOverview()`
- Comentar código complejo

## Testing Local
Siempre probar cambios localmente antes de hacer push:
```bash
python3 -m http.server 8000
```

## Cache Busting
Al hacer cambios en CSS/JS, actualizar el timestamp en `index.html`:
```html
<link rel="stylesheet" href="styles.css?v=2025-10-08-XX-XX">
```
```

## Resumen de Comandos

```bash
# 1. Subir al repositorio
cd /Users/emilianoaristizabal/Integraciones\ V0
git add .
git commit -m "feat: prototipo completo de Leal 360"
git push origin main

# 2. Configurar GitHub Pages (manual en GitHub UI)

# 3. Crear archivos de documentación
# - README.md
# - CONTRIBUTING.md
# - .gitignore

# 4. Agregar colaboradores (manual en GitHub UI)
```

## Resultado Esperado
1. ✅ Código subido a GitHub
2. ✅ URL pública disponible vía GitHub Pages
3. ✅ Repositorio documentado y listo para colaboración
4. ✅ Equipo técnico puede clonar, modificar y contribuir

## Próximos Pasos (para el equipo técnico)
- Resolver el issue del hero copy en 2 líneas
- Optimizar responsive design
- Agregar más endpoints a la documentación API
- Implementar funcionalidad del agente inteligente

