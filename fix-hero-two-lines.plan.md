# Plan: Hero Copy en Exactamente 2 Líneas

## Objetivo
Asegurar que el texto "Centraliza toda la data de tus usuarios, conviértela en ingresos con Leal 360" aparezca en exactamente **2 líneas** en el hero de la vista Overview.

## Texto Objetivo
```
Línea 1: "Centraliza toda la data de tus usuarios,"
Línea 2: "conviértela en ingresos con Leal 360"
```

## Problema Actual
El texto está apareciendo en 3 líneas porque el tamaño de fuente es demasiado grande para el ancho disponible.

## Solución: Ajustar Tamaño de Fuente

### Paso 1: Verificar el HTML actual
**Archivo**: `leal-360-prototype/script.js` (líneas 83-86)

**Código actual:**
```javascript
<h1 class="hero-title">
  <span class="highlight">Centraliza</span> toda la data de tus usuarios,<br>
  conviértela en <span class="highlight">ingresos</span> con Leal 360
</h1>
```

**Acción**: Verificar que el `<br>` esté en el lugar correcto (después de "usuarios,")

### Paso 2: Ajustar el tamaño de fuente en CSS
**Archivo**: `leal-360-prototype/overview-styles.css`

**Estilos actuales (línea 74):**
```css
.hero-title {
  font-size: 2rem;  /* Actualmente 2rem */
  line-height: 1.3;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;
  max-width: 900px;
  text-align: justify;
  text-align-last: left;
}
```

**Ajuste propuesto:**
```css
.hero-title {
  font-size: 1.875rem;  /* Reducir de 2rem a 1.875rem (30px) */
  line-height: 1.3;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;
  max-width: 900px;
  text-align: justify;
  text-align-last: left;
}
```

**Razón**: 1.875rem (30px) debería ser suficiente para que el texto quepa en 2 líneas en pantallas estándar.

### Paso 3: Ajustar responsive breakpoints
**Archivo**: `leal-360-prototype/overview-styles.css`

**Tablet (1024px):**
```css
@media (max-width: 1024px) {
  .hero-title {
    font-size: 1.625rem;  /* 26px */
    max-width: 750px;
  }
}
```

**Tablet pequeño (768px):**
```css
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.375rem;  /* 22px */
    max-width: 100%;
    text-align: left;
    margin-bottom: 2rem;
  }
}
```

**Móvil (480px):**
```css
@media (max-width: 480px) {
  .hero-title {
    font-size: 1.125rem;  /* 18px */
    margin-bottom: 1.5rem;
  }
}
```

### Paso 4: Actualizar cache busting
**Archivo**: `leal-360-prototype/index.html`

Actualizar timestamp de `overview-styles.css` a nueva versión (ej: `v=2025-10-08-19-05`)

## Verificación
Después de implementar:
1. Recargar la página con cache limpio (Cmd+Shift+R)
2. Verificar que el texto aparezca en exactamente 2 líneas
3. Si aún aparece en 3 líneas, reducir más el `font-size` (probar con 1.75rem)

## Archivos a Modificar
1. ✅ `leal-360-prototype/script.js` - Verificar HTML (ya está correcto)
2. ⚠️ `leal-360-prototype/overview-styles.css` - Ajustar font-size
3. ⚠️ `leal-360-prototype/index.html` - Actualizar timestamp

## Notas Importantes
- **NO quitar palabras del texto**
- **SOLO ajustar el tamaño de fuente**
- El objetivo es que el texto quepa en 2 líneas sin modificar el contenido
- El `<br>` debe permanecer después de "usuarios,"

