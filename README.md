# Leal API Guide - Documentación Interactiva

Este proyecto es una réplica de la documentación de la API de Leal, creada con HTML, CSS y JavaScript vanilla para proporcionar una experiencia de documentación moderna e interactiva.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional inspirada en las mejores prácticas de documentación de APIs
- **Navegación Intuitiva**: Sidebar con navegación suave y scroll spy automático
- **Búsqueda en Tiempo Real**: Búsqueda instantánea en toda la documentación
- **Ejemplos de Código**: Bloques de código con resaltado de sintaxis y botones de copia
- **Responsive**: Completamente adaptado para dispositivos móviles y tablets
- **Interactividad**: Funcionalidades JavaScript avanzadas para mejorar la experiencia del usuario

## 📂 Estructura del Proyecto

```
Integraciones V0/
├── index.html          # Página principal con la documentación
├── styles.css          # Estilos CSS modernos y responsive
├── script.js           # Funcionalidad JavaScript interactiva
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS personalizadas
  - Grid y Flexbox para layouts
  - Animaciones y transiciones suaves
  - Diseño responsive con mobile-first
- **JavaScript ES6+**:
  - Navegación suave (smooth scrolling)
  - Búsqueda en tiempo real
  - Scroll spy automático
  - API de Clipboard para copiar código
  - Intersection Observer para animaciones
- **Librerías Externas**:
  - [Prism.js](https://prismjs.com/) para resaltado de sintaxis
  - [Google Fonts](https://fonts.google.com/) (Inter) para tipografía

## 🎨 Características de Diseño

### Sistema de Colores
- **Primario**: `#6366f1` (Índigo)
- **Secundario**: `#f1f5f9` (Gris claro)
- **Éxito**: `#10b981` (Verde)
- **Advertencia**: `#f59e0b` (Ámbar)
- **Error**: `#ef4444` (Rojo)

### Tipografía
- **Familia Principal**: Inter (Google Fonts)
- **Código**: SF Mono, Monaco, Cascadia Code, Roboto Mono

### Componentes
- **Sidebar**: Navegación fija con scroll independiente
- **Feature Cards**: Tarjetas con efectos hover
- **Code Blocks**: Bloques de código con botones de copia
- **Endpoints**: Documentación de API con métodos HTTP
- **Tables**: Tablas responsive para limits de rate

## 📱 Funcionalidades Móviles

- **Menú Hamburguesa**: Navegación optimizada para pantallas pequeñas
- **Touch Gestures**: Soporte completo para gestos táctiles
- **Viewport Adaptation**: Layouts que se adaptan automáticamente

## ⌨️ Atajos de Teclado

- **Ctrl/Cmd + K**: Enfocar barra de búsqueda
- **Escape**: Cerrar menú móvil o limpiar búsqueda

## 🔧 Funcionalidades JavaScript

### Navegación
- Scroll suave entre secciones
- Actualización automática de la URL
- Scroll spy para highlighting automático

### Búsqueda
- Filtrado en tiempo real de la navegación
- Búsqueda por contenido y títulos de sección
- Debouncing para optimizar rendimiento

### Interactividad
- Botones de copia de código con feedback visual
- Animaciones de entrada basadas en Intersection Observer
- Manejo responsive automático

### Optimizaciones
- Lazy loading de animaciones
- Debouncing en eventos de resize
- Error handling robusto

## 🌐 Cómo Usar

1. **Abrir el proyecto**: Simplemente abre `index.html` en tu navegador
2. **Navegación**: Usa el sidebar para navegar entre secciones
3. **Búsqueda**: Escribe en la barra de búsqueda para filtrar contenido
4. **Copiar Código**: Haz clic en "Copiar" en cualquier bloque de código
5. **Mobile**: En dispositivos móviles, usa el botón de menú para abrir la navegación

## 🎯 Secciones Incluidas

- **Introducción**
  - Visión General
  - Autenticación
  - Límites de Velocidad

- **Endpoints**
  - Usuarios
  - Programas de Lealtad
  - Puntos
  - Recompensas
  - Transacciones

- **Webhooks**
  - Configuración
  - Eventos

- **SDK**
  - JavaScript
  - Python
  - PHP

## 🔧 Personalización

### Colores
Modifica las variables CSS en `:root` para cambiar el esquema de colores:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #f1f5f9;
  /* ... más variables */
}
```

### Contenido
- Edita `index.html` para modificar el contenido de la documentación
- Añade nuevas secciones siguiendo la estructura existente
- Actualiza los enlaces de navegación en el sidebar

### Funcionalidad
- Modifica `script.js` para añadir nuevas funcionalidades
- Los eventos están modularizados para fácil extensión

## 📈 Rendimiento

- **Tiempo de Carga**: Optimizado para carga rápida
- **Lazy Loading**: Animaciones y elementos pesados se cargan según necesidad
- **Debouncing**: Eventos de alta frecuencia optimizados
- **CSS Optimizado**: Uso eficiente de Grid, Flexbox y variables CSS

## 🔍 SEO y Accesibilidad

- **HTML Semántico**: Estructura accesible para lectores de pantalla
- **Meta Tags**: Configuración básica para SEO
- **Keyboard Navigation**: Soporte completo para navegación por teclado
- **Focus States**: Estados de foco visibles y consistentes

## 🚀 Extensiones Futuras

- [ ] Modo oscuro/claro
- [ ] Ejemplos de API interactivos
- [ ] Búsqueda global avanzada
- [ ] Exportación a PDF
- [ ] Múltiples idiomas
- [ ] Comentarios y feedback

## 📄 Licencia

Este proyecto es una réplica educativa basada en la documentación de Leal API disponible públicamente.

---

**Desarrollado con ❤️ como réplica del proyecto de [Lovable](https://preview--leal-api-guide.lovable.app/)**
