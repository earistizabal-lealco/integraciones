# Guía de Contribución

## Flujo de Trabajo

### 1. Asignar un Issue
- Revisar issues existentes en GitHub
- Asignar un issue o crear uno nuevo
- Describir claramente el problema o funcionalidad

### 2. Crear Rama de Desarrollo
```bash
git checkout -b feature/issue-123-descripcion-corta
```

### 3. Hacer Cambios
- Seguir las convenciones de código establecidas
- Hacer commits descriptivos
- Probar cambios localmente

### 4. Commit y Push
```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/issue-123-descripcion-corta
```

### 5. Crear Pull Request
- Ir a GitHub y crear Pull Request
- Describir los cambios realizados
- Asignar revisores del equipo

### 6. Revisión y Merge
- Esperar revisión y aprobación
- Resolver comentarios si es necesario
- Merge a `main` después de aprobación

## Convenciones de Código

### HTML
- Usar indentación de 2 espacios
- Atributos en comillas dobles
- Nombres de clases en kebab-case: `.hero-section`

### CSS
- Usar indentación de 2 espacios
- Agrupar propiedades lógicamente
- Usar variables CSS para colores y espaciado
- Comentar secciones importantes

```css
/* =========================
   SECCIÓN HERO
   ========================= */
.hero-section {
  /* Estilos aquí */
}
```

### JavaScript
- Usar indentación de 2 espacios
- Nombres de funciones en camelCase: `renderOverview()`
- Nombres de variables descriptivos
- Comentar funciones complejas

```javascript
/**
 * Renderiza la vista de Overview
 * @param {Object} data - Datos para renderizar
 */
function renderOverview(data) {
  // Implementación
}
```

## Estructura de Commits

### Formato
```
tipo: descripción corta

Descripción más detallada si es necesario
```

### Tipos de Commit
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `style:` - Cambios de estilos (CSS, formato)
- `docs:` - Documentación
- `refactor:` - Refactorización de código
- `test:` - Agregar o modificar tests
- `chore:` - Tareas de mantenimiento

### Ejemplos
```bash
git commit -m "feat: agregar funcionalidad de chat flotante"
git commit -m "fix: corregir responsive en vista móvil"
git commit -m "style: mejorar espaciado en hero section"
git commit -m "docs: actualizar README con nuevas funcionalidades"
```

## Testing Local

### Servidor de Desarrollo
```bash
cd leal-360-prototype
python3 -m http.server 8000
```

### Verificaciones Antes de Commit
- [ ] Código funciona en navegador
- [ ] Responsive design funciona
- [ ] No hay errores en consola
- [ ] Cache busting actualizado si es necesario

### Cache Busting
Al modificar CSS o JS, actualizar timestamp en `index.html`:
```html
<!-- Antes -->
<link rel="stylesheet" href="styles.css?v=2025-10-08-19-50">

<!-- Después -->
<link rel="stylesheet" href="styles.css?v=2025-10-08-20-15">
```

## Estructura de Archivos

### Archivos Principales
- `index.html` - Página principal
- `script.js` - Lógica principal
- `styles.css` - Estilos globales

### Archivos de Estilos Específicos
- `overview-styles.css` - Estilos de vista Overview
- `integrations-styles.css` - Estilos de vista Integraciones
- `integrations-landing-styles.css` - Estilos de landing

### Archivos de API
- `api-data.js` - Datos de endpoints
- `api-components.js` - Componentes de documentación

## Resolución de Conflictos

### Si hay conflictos de merge:
1. Abrir archivos con conflictos
2. Resolver manualmente manteniendo cambios necesarios
3. Eliminar marcadores de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Hacer commit de la resolución

```bash
git add archivo-resuelto.js
git commit -m "resolve: resolver conflictos en archivo-resuelto.js"
```

## Buenas Prácticas

### Código
- Escribir código limpio y legible
- Usar nombres descriptivos
- Comentar código complejo
- Evitar código duplicado

### Git
- Hacer commits pequeños y frecuentes
- Escribir mensajes de commit claros
- No hacer commit de archivos temporales
- Mantener historial limpio

### Testing
- Probar en diferentes navegadores
- Verificar responsive design
- Comprobar funcionalidad en móvil
- Validar que no hay errores de consola

## Contacto y Soporte

### Para Dudas Técnicas
- Crear issue en GitHub
- Mencionar a @earistizabal-lealco
- Describir problema con detalle

### Para Nuevas Funcionalidades
- Crear issue con label `enhancement`
- Describir funcionalidad deseada
- Incluir mockups o referencias si es posible

## Recursos Útiles

### Documentación
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Herramientas
- [GitHub Desktop](https://desktop.github.com/) - Cliente Git visual
- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - Debugging
