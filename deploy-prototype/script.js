// Nueva estructura principal - Aplicación de Integraciones Leal
let currentSection = 'overview';
let currentSubsection = null;

// Variables del carrusel
let currentCarouselIndex = 0;
let carouselInterval = null;

// Copys comerciales para el carrusel
const overviewCarouselItems = [
  "Crea un perfil 360 de cada cliente unificando todas tus fuentes en Leal 360.",
  "Convierte datos transaccionales en ingresos incrementales con IA.",
  "Cada cliente, una oferta pensada solo para él.",
  "Identifica cambios de comportamiento y actúa en minutos, no semanas.",
  "Toda la operación se automatiza y aprende con cada interacción.",
  "Captura, gestiona y activa los datos de tus clientes en un solo lugar.",
  "Aumenta la frecuencia y el ticket promedio con mensajes hiper-relevantes.",
  "Reduce el churn anticipándote a señales de abandono.",
  "Activa campañas en tiempo real en POS, e‑commerce y apps.",
  "Mide impacto de punta a punta: adquisición, conversión y fidelización."
];

// Estructura de navegación principal
const mainNavigation = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'Cómo Leal 360 procesa tu data transaccional y de contexto',
    icon: 'overview'
  },
  {
    id: 'integrations',
    title: 'Integraciones',
    description: 'Modalidades de integración para conectar Leal con tus sistemas',
    icon: 'layers',
    subsections: [
      {
        id: 'api',
        title: 'API',
        description: 'Integración completa via API REST',
        connection: 'Comercio/Leal',
        requirement: 'Nos Consuman',
        effort: 'Alto para el cliente',
        recommendation: 'Tiene capacidad de desarrollo + POS Propio',
        capabilities: {
          registro: true,
          acumulacion: true,
          redencion: true,
          anulacion: true,
          ecommerce: true,
          coins: true,
          skus: true
        }
      },
      {
        id: 'agente',
        title: 'Agente',
        description: 'Widget que captura data de POS compatibles',
        connection: 'Leal',
        requirement: 'Instalación con conexiones Locales',
        effort: 'Bajo',
        recommendation: 'Únicamente si está en la lista de POS',
        capabilities: {
          registro: true,
          acumulacion: true,
          redencion: true,
          anulacion: false,
          ecommerce: false,
          coins: true,
          skus: 'partial'
        }
      },
      {
        id: 'sftp',
        title: 'SFTP',
        description: 'Transferencia segura de archivos CSV',
        connection: 'Comercio/Leal',
        requirement: 'Archivo CSV',
        effort: 'Medio',
        recommendation: 'Sin capacidad técnica o se le dificulta',
        capabilities: {
          registro: false,
          acumulacion: 'delayed',
          redencion: false,
          anulacion: true,
          ecommerce: true,
          coins: false,
          skus: true
        }
      },
      {
        id: 'cajero-web',
        title: 'Cajero Web',
        description: 'Interface web plug & play para POS sin integración',
        connection: 'Leal',
        requirement: 'Compartir URL y Credenciales',
        effort: '-',
        recommendation: 'Sin capacidad técnica, pocos PDV o busca una solución plug and play independiente PDV',
        capabilities: {
          registro: true,
          acumulacion: true,
          redencion: true,
          anulacion: false,
          ecommerce: false,
          coins: true,
          skus: false
        }
      },
      {
        id: 'ipaas',
        title: 'iPaaS',
        description: 'Platform as a Service para comercios enterprise',
        connection: 'Comercio/Leal',
        requirement: 'Configuración de conectores',
        effort: 'Medio-Alto',
        recommendation: 'Comercios grandes con data en múltiples plataformas',
        capabilities: {
          registro: true,
          acumulacion: true,
          redencion: true,
          anulacion: true,
          ecommerce: true,
          coins: true,
          skus: true
        }
      }
    ]
  },
  {
    id: 'recommender',
    title: 'Recomendador',
    description: 'Sugerencia automática del mejor tipo de integración',
    icon: 'help-circle'
  }
];

// Funciones principales
function initializeApp() {
  initializeHeaderCarousel();
  initializeSidebar();
  renderMainSidebar();
  showSection('overview');
}

function initializeHeaderCarousel() {
  const headerCarousel = document.getElementById('headerCarouselContent');
  if (!headerCarousel) return;
  
  // Crear el contenedor del carrusel
  createSimpleCarousel();
  
  // Iniciar auto-rotación cada 5 segundos
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
  carouselInterval = setInterval(() => {
    rotateCarousel();
  }, 5000);
}

function createSimpleCarousel() {
  const headerCarousel = document.getElementById('headerCarouselContent');
  if (!headerCarousel) return;
  
  // Crear solo UN elemento principal
  const mainCopy = document.createElement('p');
  mainCopy.className = 'carousel-main-copy';
  mainCopy.textContent = overviewCarouselItems[currentCarouselIndex];
  
  headerCarousel.innerHTML = '';
  headerCarousel.appendChild(mainCopy);
}

function rotateCarousel() {
  const headerCarousel = document.getElementById('headerCarouselContent');
  if (!headerCarousel) return;
  
  // Avanzar al siguiente elemento
  currentCarouselIndex = (currentCarouselIndex + 1) % overviewCarouselItems.length;
  
  // Crear el nuevo copy que entrará
  const newCopy = document.createElement('p');
  newCopy.className = 'carousel-main-copy carousel-entering';
  newCopy.textContent = overviewCarouselItems[currentCarouselIndex];
  
  // Buscar el copy actual
  const currentCopy = headerCarousel.querySelector('.carousel-main-copy:not(.carousel-entering)');
  
  if (currentCopy) {
    // Agregar el nuevo copy al contenedor
    headerCarousel.appendChild(newCopy);
    
    // Animar la salida del copy actual
    currentCopy.classList.add('carousel-exiting');
    
    // Animar la entrada del nuevo copy
    setTimeout(() => {
      newCopy.classList.remove('carousel-entering');
    }, 50);
    
    // Limpiar después de la animación
    setTimeout(() => {
      if (currentCopy.parentNode) {
        currentCopy.remove();
      }
    }, 800);
  } else {
    // Si no hay copy actual, simplemente agregar el nuevo
    headerCarousel.appendChild(newCopy);
    newCopy.classList.remove('carousel-entering');
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  const toggleButton = document.getElementById('sidebarToggle');
  
  if (sidebar && toggleButton) {
    sidebar.classList.toggle('collapsed');
    
    // Opcional: guardar el estado en localStorage
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }
}

// Restaurar estado del sidebar al cargar la página
function initializeSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  const savedState = localStorage.getItem('sidebarCollapsed');
  
  if (savedState === 'true' && sidebar) {
    sidebar.classList.add('collapsed');
  }
}

function renderMainSidebar() {
  const sidebarNav = document.getElementById('mainSidebarNav');
  if (!sidebarNav) return;
  
  sidebarNav.innerHTML = mainNavigation.map(section => `
    <div class="sidebar-nav-section">
      <button class="sidebar-nav-item ${currentSection === section.id ? 'active' : ''}" 
              onclick="showSection('${section.id}')">
        ${getIconSVG(section.icon)}
        <div class="nav-text">
          <div style="font-weight: 600;">${section.title}</div>
        </div>
      </button>
      
      ${section.subsections && currentSection === section.id ? `
        <div style="margin-left: 1.5rem; margin-top: 0.5rem;">
          ${section.subsections.map(sub => `
            <button class="sidebar-nav-item ${currentSubsection === sub.id ? 'active' : ''}" 
                    onclick="showSubsection('${sub.id}')"
                    style="font-size: 0.8rem; padding: 0.5rem 0.75rem;">
              ${getIconSVG(getIntegrationIcon(sub.id))}
              ${sub.title}
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function showSection(sectionId) {
  currentSection = sectionId;
  currentSubsection = null;
  
  renderMainSidebar();
  
  if (sectionId === 'overview') {
    renderOverview();
  } else if (sectionId === 'integrations') {
    renderIntegrationsMain();
  } else if (sectionId === 'recommender') {
    renderRecommender();
  }
}

function showSubsection(subsectionId) {
  currentSubsection = subsectionId;
  renderMainSidebar();
  
  const integration = mainNavigation
    .find(s => s.id === 'integrations')
    ?.subsections?.find(sub => sub.id === subsectionId);
  
  if (integration) {
    renderIntegrationDetail(integration);
  }
}

function renderOverview() {
  const content = document.getElementById('mainContent');
  
  content.innerHTML = `
    <div class="overview-compact">
      <!-- Hero Banner Expandido -->
      <section class="hero-banner-section">
        <div class="hero-banner-expanded">
          <!-- Header del Banner -->
          <div class="hero-banner-header">
            <div class="hero-brand-complete">
              <div class="hero-logo-section">
                <div class="logo-icon-large">${getIconSVG('layers')}</div>
                <div class="brand-info">
                  <h1 class="hero-title-large">Leal 360</h1>
                  <div class="hero-tagline-prominent">Plataforma de Fidelización Empresarial</div>
                </div>
              </div>
              <div class="hero-status-badge">
                <div class="status-indicator"></div>
                <span class="status-text">Activo • Empresarial</span>
              </div>
            </div>
          </div>

          <!-- Propuesta de Valor Principal -->
          <div class="hero-main-content">
            <div class="value-proposition-section">
              <h2 class="main-value-title">Convierte datos de clientes en ingresos incrementales medibles</h2>
              <p class="main-value-description">
                Nuestra plataforma integra tus sistemas existentes (POS, e-commerce, CRM) para crear experiencias 
                personalizadas que aumentan la retención, incrementan el ticket promedio y generan ROI comprobable 
                a través de inteligencia artificial y automatización avanzada.
              </p>
            </div>

            <!-- Métricas de Impacto -->
            <div class="impact-metrics">
              <div class="metric-card">
                <div class="metric-icon">${getIconSVG('user-check')}</div>
                <div class="metric-content">
                  <div class="metric-value">+40%</div>
                  <div class="metric-label">Retención promedio</div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon">${getIconSVG('shopping-cart')}</div>
                <div class="metric-content">
                  <div class="metric-value">+35%</div>
                  <div class="metric-label">Ticket promedio</div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon">${getIconSVG('target')}</div>
                <div class="metric-content">
                  <div class="metric-value">+60%</div>
                  <div class="metric-label">Relevancia mensajes</div>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon">${getIconSVG('pie-chart')}</div>
                <div class="metric-content">
                  <div class="metric-value">+50%</div>
                  <div class="metric-label">ROI medible</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Capacidades Clave -->
          <div class="hero-capabilities">
            <div class="capabilities-header">
              <h3 class="capabilities-title">Capacidades Principales</h3>
              <p class="capabilities-subtitle">Todo lo que necesitas para un programa de lealtad exitoso</p>
            </div>
            
            <div class="capabilities-grid-hero">
              <div class="capability-card-hero">
                <div class="capability-icon-hero">${getIconSVG('database')}</div>
                <div class="capability-content-hero">
                  <h4 class="capability-name">Perfil 360°</h4>
                  <p class="capability-desc">Vista unificada del cliente con datos de todos los touchpoints</p>
                </div>
              </div>
              
              <div class="capability-card-hero">
                <div class="capability-icon-hero">${getIconSVG('activity')}</div>
                <div class="capability-content-hero">
                  <h4 class="capability-name">Triggers en Tiempo Real</h4>
                  <p class="capability-desc">Activación automática de campañas basadas en comportamiento</p>
                </div>
              </div>
              
              <div class="capability-card-hero">
                <div class="capability-icon-hero">${getIconSVG('cpu')}</div>
                <div class="capability-content-hero">
                  <h4 class="capability-name">Personalización IA</h4>
                  <p class="capability-desc">Mensajes y ofertas adaptados a cada cliente individual</p>
                </div>
              </div>
              
              <div class="capability-card-hero">
                <div class="capability-icon-hero">${getIconSVG('shield')}</div>
                <div class="capability-content-hero">
                  <h4 class="capability-name">Seguridad Empresarial</h4>
                  <p class="capability-desc">Cumplimiento normativo y protección de datos garantizada</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="hero-cta-section">
            <div class="cta-content-hero">
              <div class="cta-text-hero">
                <h3 class="cta-title-hero">¿Listo para comenzar?</h3>
                <p class="cta-description-hero">Explora nuestras modalidades de integración o usa nuestro recomendador inteligente</p>
              </div>
              <div class="cta-buttons-hero">
                <button class="cta-primary-hero" onclick="showSection('integrations')">
                  ${getIconSVG('grid')}
                  <span>Ver Integraciones</span>
                </button>
                <button class="cta-secondary-hero" onclick="showSection('recommender')">
                  ${getIconSVG('help-circle')}
                  <span>Usar Recomendador</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Decoración Mejorada -->
          <div class="hero-banner-decoration-expanded">
            <div class="decoration-pattern decoration-pattern-1"></div>
            <div class="decoration-pattern decoration-pattern-2"></div>
            <div class="decoration-gradient"></div>
          </div>
        </div>
      </section>

      <!-- Data Processing Section -->
      <section class="data-processing-section">
        <div class="section-header-compact">
          <h2 class="section-title-compact">Procesamiento de Datos</h2>
        </div>
        
        <div class="data-flow-compact">
          <!-- Grupo de Datos de Entrada - Vertical -->
          <div class="data-types-compact">
            <div class="data-type-compact zero-party" onclick="showDataTypeDetail('zero-party')">
              <div class="data-icon-compact">${getIconSVG('user-check')}</div>
              <div class="data-info">
                <span class="data-label">Zero Party</span>
                <span class="data-desc">Preferencias declaradas</span>
              </div>
              <div class="priority-indicator">1</div>
            </div>
            
            <div class="data-type-compact first-party" onclick="showDataTypeDetail('first-party')">
              <div class="data-icon-compact">${getIconSVG('shopping-cart')}</div>
              <div class="data-info">
                <span class="data-label">First Party</span>
                <span class="data-desc">Transacciones directas</span>
              </div>
              <div class="priority-indicator">2</div>
            </div>
            
            <div class="data-type-compact second-party" onclick="showDataTypeDetail('second-party')">
              <div class="data-icon-compact">${getIconSVG('globe')}</div>
              <div class="data-info">
                <span class="data-label">Second Party</span>
                <span class="data-desc">Contexto externo</span>
              </div>
              <div class="priority-indicator">3</div>
            </div>
          </div>
          
          <!-- Flecha de Procesamiento -->
          <div class="processing-arrow">
            ${getIconSVG('arrow-right')}
          </div>
          
          <!-- Motor Leal 360 -->
          <div class="leal-engine" onclick="showDataTypeDetail('leal-engine')">
            <div class="engine-icon">${getIconSVG('cpu')}</div>
            <div class="engine-info">
              <span class="engine-title">Leal 360</span>
              <span class="engine-desc">Motor de procesamiento</span>
            </div>
          </div>
          
          <!-- Flecha de Salida -->
          <div class="processing-arrow">
            ${getIconSVG('arrow-right')}
          </div>
          
          <!-- Resultado -->
          <div class="revenue-output" onclick="showDataTypeDetail('revenue-output')">
            <div class="output-icon">${getIconSVG('trending-up')}</div>
            <div class="output-info">
              <span class="output-title">Ingresos</span>
              <span class="output-desc">Incrementales medibles</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Capabilities Section -->
      <section class="capabilities-section-modern">
        <div class="section-header-modern">
          <h2 class="section-title-modern">Capacidades Clave</h2>
          <p class="section-description-modern">Funcionalidades que transforman datos en resultados medibles</p>
        </div>
        
        <div class="capabilities-grid-modern">
          <div class="capability-card-modern" onclick="showCapabilityDetail('perfil-360')">
            <div class="capability-header-modern">
              <div class="capability-icon-modern perfil-360">
                ${getIconSVG('users')}
              </div>
              <div class="capability-info-modern">
                <h3 class="capability-title-modern">Perfil 360°</h3>
                <p class="capability-description-modern">Vista unificada del cliente con datos de todos los touchpoints</p>
              </div>
            </div>
          </div>
          
          <div class="capability-card-modern" onclick="showCapabilityDetail('segmentacion')">
            <div class="capability-header-modern">
              <div class="capability-icon-modern segmentacion">
                ${getIconSVG('target')}
              </div>
              <div class="capability-info-modern">
                <h3 class="capability-title-modern">Segmentación</h3>
                <p class="capability-description-modern">Agrupación inteligente basada en comportamiento y preferencias</p>
              </div>
            </div>
          </div>
          
          <div class="capability-card-modern" onclick="showCapabilityDetail('triggers-rt')">
            <div class="capability-header-modern">
              <div class="capability-icon-modern triggers-rt">
                ${getIconSVG('zap')}
              </div>
              <div class="capability-info-modern">
                <h3 class="capability-title-modern">Triggers RT</h3>
                <p class="capability-description-modern">Activación automática de campañas en tiempo real</p>
              </div>
            </div>
          </div>
          
          <div class="capability-card-modern" onclick="showCapabilityDetail('personalizacion')">
            <div class="capability-header-modern">
              <div class="capability-icon-modern personalizacion">
                ${getIconSVG('message-circle')}
              </div>
              <div class="capability-info-modern">
                <h3 class="capability-title-modern">Personalización</h3>
                <p class="capability-description-modern">Experiencias únicas adaptadas a cada cliente</p>
              </div>
            </div>
          </div>
          
          <div class="capability-card-modern" onclick="showCapabilityDetail('medicion-roi')">
            <div class="capability-header-modern">
              <div class="capability-icon-modern medicion-roi">
                ${getIconSVG('bar-chart')}
              </div>
              <div class="capability-info-modern">
                <h3 class="capability-title-modern">Medición ROI</h3>
                <p class="capability-description-modern">Análisis detallado del retorno de inversión en tiempo real</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Integration Process Section -->
      <section class="integration-process-section-modern">
        <div class="section-header-modern">
          <h2 class="section-title-modern">Proceso de Integración</h2>
          <p class="section-description-modern">Tres pasos simples para comenzar con Leal 360</p>
        </div>
        
        <div class="process-steps-horizontal">
          <div class="process-step-modern" onclick="showSection('recommender')">
            <div class="step-header-modern">
              <div class="step-indicator-modern">1</div>
              <div class="step-info-modern">
                <h3 class="step-title-modern">Evaluar Stack Tecnológico</h3>
                <p class="step-description-modern">Revisamos tu infraestructura actual y compatibilidad</p>
              </div>
            </div>
            <div class="step-action-modern">
              <button class="step-button-modern">
                ${getIconSVG('clipboard-list')}
                <span>Checklist</span>
              </button>
            </div>
          </div>
          
          <div class="process-step-modern" onclick="showSection('recommender')">
            <div class="step-header-modern">
              <div class="step-indicator-modern">2</div>
              <div class="step-info-modern">
                <h3 class="step-title-modern">Obtener Recomendación</h3>
                <p class="step-description-modern">Recibe una recomendación personalizada de integración</p>
              </div>
            </div>
            <div class="step-action-modern">
              <button class="step-button-modern">
                ${getIconSVG('help-circle')}
                <span>Recomendador</span>
              </button>
            </div>
          </div>
          
          <div class="process-step-modern" onclick="showSection('integrations')">
            <div class="step-header-modern">
              <div class="step-indicator-modern">3</div>
              <div class="step-info-modern">
                <h3 class="step-title-modern">Seleccionar Modalidad</h3>
                <p class="step-description-modern">Elige la modalidad que mejor se adapte a tus necesidades</p>
              </div>
            </div>
            <div class="step-action-modern">
              <button class="step-button-modern">
                ${getIconSVG('layers')}
                <span>Modalidades</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderRecommender() {
  const content = document.getElementById('mainContent');
  content.innerHTML = `
    <section class="reco">
      <header class="reco-header">
        <h1>Recomendador de Integración</h1>
        <p>Responde algunas preguntas sobre tu stack y te sugerimos la modalidad ideal (API, Agente, iPaaS, Web Cajero o SFTP).</p>
      </header>

      <nav class="reco-stepper" aria-label="Progreso">
        <div class="stepper-track">
          <div class="stepper-progress" id="stepperProgress"></div>
        </div>
        <div class="stepper-steps">
          <button class="stepper-step active" data-step="1">
            <div class="step-circle">
              <span class="step-number">1</span>
            </div>
            <div class="step-info">
              <span class="step-title">Stack</span>
              <span class="step-subtitle">Sistemas actuales</span>
            </div>
          </button>
          <button class="stepper-step" data-step="2">
            <div class="step-circle">
              <span class="step-number">2</span>
            </div>
            <div class="step-info">
              <span class="step-title">Tiempo</span>
              <span class="step-subtitle">Velocidad y equipo</span>
            </div>
          </button>
          <button class="stepper-step" data-step="3">
            <div class="step-circle">
              <span class="step-number">3</span>
            </div>
            <div class="step-info">
              <span class="step-title">Operación</span>
              <span class="step-subtitle">Caja o digital</span>
            </div>
          </button>
          <button class="stepper-step" data-step="4">
            <div class="step-circle">
              <span class="step-number">4</span>
            </div>
            <div class="step-info">
              <span class="step-title">Resultado</span>
              <span class="step-subtitle">Modalidad sugerida</span>
            </div>
          </button>
        </div>
      </nav>

      <div id="recoBody" class="reco-body">
        ${renderRecoStep(1)}
      </div>

      <footer class="reco-footer">
        <button class="btn btn-secondary" id="recoPrev" disabled>← Anterior</button>
        <div class="reco-spacer"></div>
        <button class="btn btn-primary" id="recoNext">Siguiente →</button>
      </footer>
    </section>
  `;

  bindRecoNav();
}

let recoState = { step: 1, answers: {} };

function renderRecoStep(step) {
  if (step === 1) {
    return `
      <section class="reco-step-body">
        <h2>Tu stack tecnológico</h2>
        <p class="muted">Selecciona lo que aplica hoy.</p>
        <div class="tech-stack-grid">
          ${stackOption('pos', 'POS en tienda', 'Lectores, software de caja, integraciones locales')}
          ${stackOption('ecom', 'E‑commerce', 'Shopify, VTEX, WooCommerce, Magento')}
          ${stackOption('crm', 'CRM/Marketing', 'HubSpot, Salesforce, Braze')}
          ${stackOption('dw', 'Data Warehouse', 'BigQuery, Snowflake, Redshift')}
          ${stackOption('app', 'App Móvil', 'iOS/Android con login de clientes')}
          ${stackOption('sftp', 'Canal SFTP', 'Intercambio de archivos programado')}
        </div>
      </section>`;
  }

  if (step === 2) {
    return `
      <section class="reco-step-body">
        <h2>Tiempo y capacidades</h2>
        <div class="reco-grid">
          ${recoChoice('ttm', 'time_fast', 'Necesito salir en < 4 semanas', '⏱️ Prioriza velocidad')}
          ${recoChoice('ttm', 'time_mid', 'Horizonte 1‑2 meses', '⚖️ Balance tiempo/esfuerzo')}
          ${recoChoice('ttm', 'time_long', 'Puedo invertir 2‑3 meses', '🧩 Mayor personalización')}
        </div>
        <h3 style="margin-top:1rem">Equipo técnico</h3>
        <div class="reco-grid">
          ${recoChoice('team', 'own_dev', 'Equipo de desarrollo propio', '🔧 APIs y microservicios')}
          ${recoChoice('team', 'vendor', 'Partner/tercero disponible', '🤝 Implementación asistida')}
          ${recoChoice('team', 'low', 'Capacidad limitada', '🧪 Bajo esfuerzo operativo')}
        </div>
      </section>`;
  }

  if (step === 3) {
    return `
      <section class="reco-step-body">
        <h2>Operación en caja</h2>
        <div class="reco-grid">
          ${recoChoice('cash', 'real_time', 'Necesito redención en tiempo real en caja', '⚡ POS conectado')}
          ${recoChoice('cash', 'batch', 'Puedo operar por lotes (archivos)', '📦 Procesos diarios o programados')}
          ${recoChoice('cash', 'online_only', 'No opero caja física', '🌐 Sólo canales digitales')}
        </div>
      </section>`;
  }

  // step 4 resumen
  return `
    <section class="reco-step-body">
      <h2>Resultado sugerido</h2>
      <div class="reco-result" id="recoResult">Completa el cuestionario para ver la recomendación.</div>
    </section>`;
}

function stackOption(key, title, desc) {
  const isActive = recoState.answers[key] ? 'active' : '';
  const icons = {
    pos: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    ecom: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="m1 1 4 4 13 0 1 6-13 0"/></svg>',
    crm: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-3-3m0 0a2 2 0 0 0 0-4 2 2 0 0 0 0 4"/></svg>',
    dw: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="m21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    app: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="m12 18h.01"/></svg>',
    sftp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>'
  };
  
  return `
    <button class="tech-stack-option ${isActive}" data-type="card" data-key="${key}">
      <div class="tech-stack-icon">${icons[key] || icons.sftp}</div>
      <div class="tech-stack-info">
        <div class="tech-stack-title">${title}</div>
        <div class="tech-stack-desc">${desc}</div>
      </div>
      <div class="tech-stack-check"></div>
    </button>`;
}

function recoCard(key, title, desc, icon) {
  const active = (recoState.answers[key] === true) ? 'active' : '';
  return `
    <button class="reco-card ${active}" data-type="card" data-key="${key}">
      <div class="reco-card-title"><span class="reco-icon">${icon || '📦'}</span>${title}</div>
      <div class="reco-card-desc">${desc}</div>
    </button>`;
}

function recoChoice(group, value, label, sub) {
  const active = (recoState.answers[group] === value) ? 'active' : '';
  return `
    <button class="reco-choice ${active}" data-type="choice" data-group="${group}" data-value="${value}">
      <div class="reco-choice-label">${label}</div>
      ${sub ? `<div class="reco-sub">${sub}</div>` : ''}
    </button>`;
}

function bindRecoNav() {
  const body = document.getElementById('recoBody');
  const steps = document.querySelectorAll('.stepper-step');
  const prev = document.getElementById('recoPrev');
  const next = document.getElementById('recoNext');
  const progress = document.getElementById('stepperProgress');

  // Navegación por clic en pasos
  steps.forEach(stepEl => {
    stepEl.addEventListener('click', () => {
      const s = Number(stepEl.getAttribute('data-step'));
      if (s >= 1 && s <= 4) {
        recoState.step = s;
        body.innerHTML = renderRecoStep(recoState.step);
        if (recoState.step === 4) computeReco();
        updateRecoSteps(steps, prev, next, progress);
      }
    });
  });

  body.addEventListener('click', (e) => {
    const el = e.target.closest('button');
    if (!el) return;
    const type = el.getAttribute('data-type');
    if (type === 'card') {
      const key = el.getAttribute('data-key');
      recoState.answers[key] = !recoState.answers[key];
      body.innerHTML = renderRecoStep(recoState.step);
    }
    if (type === 'choice') {
      const group = el.getAttribute('data-group');
      const value = el.getAttribute('data-value');
      recoState.answers[group] = value;
      body.innerHTML = renderRecoStep(recoState.step);
    }
  });

  prev.onclick = () => {
    if (recoState.step > 1) {
      recoState.step -= 1;
      body.innerHTML = renderRecoStep(recoState.step);
      updateRecoSteps(steps, prev, next, progress);
    }
  };
  next.onclick = () => {
    if (recoState.step < 4) {
      recoState.step += 1;
      body.innerHTML = renderRecoStep(recoState.step);
      if (recoState.step === 4) computeReco();
      updateRecoSteps(steps, prev, next, progress);
    }
  };

  updateRecoSteps(steps, prev, next, progress);
}

function updateRecoSteps(steps, prev, next, progress) {
  steps.forEach(s => {
    const num = Number(s.getAttribute('data-step'));
    s.classList.toggle('active', num === recoState.step);
    s.classList.toggle('completed', num < recoState.step);
  });
  prev.disabled = recoState.step === 1;
  next.textContent = recoState.step === 4 ? 'Finalizar' : 'Siguiente →';

  // Actualiza barra de progreso
  if (progress) {
    const pct = ((recoState.step - 1) / (4 - 1)) * 100; // 0% en paso 1, 100% en paso 4
    progress.style.width = pct + '%';
  }
}

function computeReco() {
  const r = document.getElementById('recoResult');
  if (!r) return;
  // Reglas iniciales (prioridad):
  // 1) Real‑time en caja + POS:
  //    - con equipo propio → API
  //    - sin equipo → Agente
  // 2) Salida rápida (<4 semanas) + SFTP → SFTP
  // 3) Tiene CRM/DW y poca capacidad técnica → iPaaS
  // 4) Sólo online/eCommerce → API
  const a = recoState.answers;
  let suggestion = 'API';
  if (a.cash === 'real_time' && a.pos) suggestion = a.own_dev ? 'API' : 'Agente';
  if (a.ttm === 'time_fast' && a.sftp) suggestion = 'SFTP';
  if ((a.crm || a.dw) && a.team === 'low') suggestion = 'iPaaS';
  if (a.online_only) suggestion = 'API';
  r.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap;">
      <div><strong>Sugerencia:</strong> ${suggestion}</div>
      <button class="btn btn-primary" onclick="navigateToGuide('${suggestion}')">Ir a la guía →</button>
    </div>`;
}

function navigateToGuide(suggestion) {
  // Mapeo simple a subsecciones
  const map = { 'API': 'api', 'Agente': 'agente', 'iPaaS': 'ipaas', 'Web Cajero': 'cajero-web', 'SFTP': 'sftp' };
  const sub = map[suggestion] || 'api';
  showSection('integrations');
  setTimeout(() => showSubsection(sub), 0);
}

function renderIntegrationsMain() {
  const content = document.getElementById('mainContent');
  const integrations = mainNavigation.find(s => s.id === 'integrations');
  
  content.innerHTML = `
    <div class="integrations-main-hero">
      <h1 class="integrations-title">Modalidades de Integración</h1>
      <p class="integrations-subtitle">
        Cada modalidad está diseñada para diferentes tipos de comercios y capacidades técnicas. 
        Selecciona la que mejor se adapte a tu caso de uso.
      </p>
    </div>

    <div class="integrations-grid">
      ${integrations.subsections.map(integration => `
        <div class="integration-card-modern" onclick="showSubsection('${integration.id}')">
          <div class="integration-card-header">
            <div class="integration-icon-modern ${getIntegrationColorClass(integration.id)}">
              ${getIconSVG(getIntegrationIcon(integration.id))}
            </div>
            <div class="integration-title-section">
              <h3 class="integration-card-title">${integration.title}</h3>
              <span class="integration-type-badge">${getIntegrationTypeBadge(integration.id)}</span>
            </div>
          </div>
          
          <p class="integration-card-description">${integration.description}</p>
          
          <div class="integration-specs-compact">
            <div class="spec-item-compact">
              <span class="spec-label">Esfuerzo</span>
              <span class="spec-value ${getEffortClass(integration.effort)}">${integration.effort}</span>
            </div>
            <div class="spec-item-compact">
              <span class="spec-label">Conexión</span>
              <span class="spec-value">${integration.connection}</span>
            </div>
            <div class="spec-item-compact">
              <span class="spec-label">Requisitos</span>
              <span class="spec-value">${integration.requirement}</span>
            </div>
          </div>
          
          <div class="integration-card-footer">
            <span class="integration-recommendation">${integration.recommendation}</span>
            <div class="integration-arrow">
              ${getIconSVG('arrow-right')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="capability-matrix-cta">
      <div class="cta-content">
        <div class="cta-icon">
          ${getIconSVG('grid')}
        </div>
        <div class="cta-text">
          <h3 class="cta-title">Matriz de Capacidades Completa</h3>
          <p class="cta-description">Compara todas las funcionalidades soportadas por cada modalidad</p>
        </div>
        <button class="cta-button" onclick="showCapabilityMatrix()">
          ${getIconSVG('external-link')}
          <span>Ver Matriz</span>
        </button>
      </div>
    </div>
  `;
}

// Funciones auxiliares
function getIntegrationIcon(integrationId) {
  const icons = {
    'api': 'code',
    'agente': 'cpu',
    'sftp': 'database',
    'cajero-web': 'monitor',
    'ipaas': 'layers'
  };
  return icons[integrationId] || 'settings';
}

function getIntegrationColorClass(integrationId) {
  const colors = {
    'api': 'icon-primary',
    'agente': 'icon-success',
    'sftp': 'icon-info',
    'cajero-web': 'icon-warning',
    'ipaas': 'icon-accent'
  };
  return colors[integrationId] || 'icon-primary';
}

function getIntegrationTypeBadge(integrationId) {
  const badges = {
    'api': 'REST API',
    'agente': 'Software',
    'sftp': 'Archivo',
    'cajero-web': 'Web App',
    'ipaas': 'Plataforma'
  };
  return badges[integrationId] || 'Integración';
}

function getEffortClass(effort) {
  if (effort.toLowerCase().includes('bajo')) return 'effort-low';
  if (effort.toLowerCase().includes('medio')) return 'effort-medium';
  if (effort.toLowerCase().includes('alto')) return 'effort-high';
  return 'effort-medium';
}

function getIconSVG(iconName) {
  const icons = {
    'overview': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
    'layers': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8l7-3 7 3-7 3-7-3zM5 12l7 3 7-3M5 16l7 3 7-3"/></svg>',
    'code': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    'cpu': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>',
    'database': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>',
    'monitor': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    'help-circle': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'users': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
    'settings': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    'grid': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
    'external-link': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>',
    'dollar-sign': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
    'message-circle': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
    'shield-check': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'trending-up': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>',
    'target': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    'bar-chart': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13l4-4 4 4 8-8M3 21h18"/></svg>',
    'zap': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    'user-check': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11l2 2 4-4"/></svg>',
    'shopping-cart': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H4"/><circle cx="9" cy="19" r="1"/><circle cx="20" cy="19" r="1"/></svg>',
    'brain': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9l-5.91 5.74L17.18 22 12 19.27 6.82 22l1.09-7.26L2 9l6.91-.74L12 2z"/></svg>',
    'activity': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    'pie-chart': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z"/></svg>',
    'shield': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'clock': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'arrow-right': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"/></svg>',
    'globe': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>'
  };
  return icons[iconName] || icons['settings'];
}

// =========================
// Sección interactiva: Zero / First / Second Party Data
// =========================
const DATA_PARTIES = [
  {
    id: 'zero',
    name: 'Zero Party Data',
    color: 'var(--leal-green)',
    badge: 'PRIORIDAD #1',
    description: 'Información que el usuario comparte voluntariamente contigo.',
    items: [
      'Preferencias declaradas',
      'Encuestas y feedback',
      'Configuraciones de perfil',
      'Intenciones de compra'
    ]
  },
  {
    id: 'first',
    name: 'First Party Data',
    color: 'var(--leal-yellow)',
    badge: 'PRIORIDAD #2',
    description: 'Data transaccional capturada directamente de tus propios canales.',
    items: [
      'Historial de compras',
      'Comportamiento de navegación',
      'Frecuencia de visitas',
      'Productos favoritos'
    ]
  },
  {
    id: 'second',
    name: 'Second Party Data',
    color: 'var(--leal-purple)',
    badge: 'PRIORIDAD #3',
    description: 'Data enriquecida proveniente de socios estratégicos y fuentes confiables.',
    items: [
      'Data demográfica',
      'Segmentación psicográfica',
      'Tendencias de mercado',
      'Contexto geográfico'
    ]
  }
];

function renderDataPartiesSection() {
  return `
  <section class="data-parties">
    <h2 class="dp-title">Ecosistema de Datos</h2>
    <p class="dp-subtitle">Zero en el corazón, luego First y por último Second. Todo se conecta con <strong>Leal 360</strong> para procesar, personalizar y medir.</p>

    <div class="dp-graphic">
      <svg class="dp-svg" viewBox="0 0 640 360" role="img" aria-label="Diagrama concéntrico Zero, First y Second Party Data conectado a Leal 360">
        <defs>
          <linearGradient id="gradSecond" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C084FC"/>
            <stop offset="100%" stop-color="#7C3AED"/>
          </linearGradient>
          <linearGradient id="gradFirst" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFE775"/>
            <stop offset="100%" stop-color="#E4B400"/>
          </linearGradient>
          <radialGradient id="gradZero" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#6EE7B7"/>
            <stop offset="100%" stop-color="#10B981"/>
          </radialGradient>
          <filter id="dpDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Círculos concéntricos -->
        <g class="dp-hit" data-id="second" onclick="selectDataParty('second')">
          <circle cx="180" cy="180" r="110" class="ring-stroke" stroke="url(#gradSecond)" stroke-width="22" fill="none" filter="url(#dpDrop)"/>
          <text x="180" y="56" class="ring-label">Second Party</text>
          <g class="orbiter second" style="transform-origin: 180px 180px;">
            <circle cx="290" cy="180" r="3" class="orbiter-dot second"/>
          </g>
        </g>

        <g class="dp-hit" data-id="first" onclick="selectDataParty('first')">
          <circle cx="180" cy="180" r="78" class="ring-stroke" stroke="url(#gradFirst)" stroke-width="20" fill="none" filter="url(#dpDrop)"/>
          <text x="180" y="92" class="ring-label">First Party</text>
          <g class="orbiter first" style="transform-origin: 180px 180px;">
            <circle cx="258" cy="180" r="3" class="orbiter-dot first"/>
          </g>
        </g>

        <g class="dp-hit" data-id="zero" onclick="selectDataParty('zero')">
          <circle cx="180" cy="180" r="48" class="ring-fill" fill="url(#gradZero)" filter="url(#dpDrop)"/>
          <text x="180" y="184" class="center-label">Zero</text>
          <circle cx="180" cy="180" r="48" class="pulse-ring" fill="none"/>
        </g>

        <!-- Flecha y Tarjeta Leal 360 -->
        <line x1="235" y1="180" x2="350" y2="140" class="dp-arrow-line"/>
        <polygon points="350,140 340,135 340,145" class="dp-arrow-head"/>
        <g class="leal-card">
          <rect x="370" y="90" rx="12" ry="12" width="220" height="180" class="leal-rect"/>
          <text x="480" y="120" class="leal-title">Leal 360</text>
          <text x="385" y="150" class="leal-item">• Perfil 360</text>
          <text x="385" y="170" class="leal-item">• Segmentación</text>
          <text x="385" y="190" class="leal-item">• Triggers</text>
          <text x="385" y="210" class="leal-item">• Personalización</text>
          <text x="385" y="230" class="leal-item">• Medición</text>
          <rect x="400" y="250" rx="8" ry="8" width="160" height="28" class="leal-result"/>
          <text x="480" y="269" class="leal-result-text">Ingresos incrementales</text>
        </g>
      </svg>
    </div>

    <div class="dp-details" id="dpDetails"></div>
  </section>`;
}

function initializeDataParties() {
  selectDataParty('zero');
}

function selectDataParty(id) {
  const nodes = document.querySelectorAll('.dp-node, .dp-circle, .dp-hit');
  nodes.forEach(n => n.classList.toggle('active', n.getAttribute('data-id') === id));

  const data = DATA_PARTIES.find(p => p.id === id) || DATA_PARTIES[0];
  const details = document.getElementById('dpDetails');
  if (!details) return;
  details.innerHTML = `
    <div class="dp-header" style="--dp-color: ${data.color}">
      <div class="dp-header-left">
        <div class="dp-dot"></div>
        <h3>${data.name}</h3>
      </div>
      <span class="dp-priority">${data.badge}</span>
    </div>
    <p class="dp-description">${data.description}</p>
    <ul class="dp-list">
      ${data.items.map(i => `<li><span>✔</span> ${i}</li>`).join('')}
    </ul>
  `;
}

// Funciones globales
window.showSection = showSection;
window.showSubsection = showSubsection;

// Inicializar la aplicación cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function renderIntegrationDetail(integration) {
  const content = document.getElementById('mainContent');
  
  content.innerHTML = `
    <div class="integration-layout">
      <!-- Header compacto -->
      <header class="integration-header">
        <div class="integration-icon">
          ${getIconSVG(getIntegrationIcon(integration.id))}
        </div>
        <div class="integration-title-group">
          <h1 class="integration-title">${integration.title}</h1>
          <p class="integration-subtitle">${integration.description}</p>
        </div>
      </header>

      <!-- Especificaciones técnicas -->
      <section class="integration-specs-banner">
        <div class="specs-banner-header">
          <div class="specs-banner-icon">${getIconSVG('settings')}</div>
          <span class="specs-banner-title">Especificaciones Técnicas</span>
          <div class="specs-banner-badge">Variables de Integración</div>
        </div>
        <div class="specs-banner-grid">
          <div class="spec-variable">
            <div class="spec-var-icon">${getIconSVG('zap')}</div>
            <div class="spec-var-content">
              <span class="spec-var-key">connection</span>
              <span class="spec-var-value">${integration.connection}</span>
            </div>
          </div>
          
          <div class="spec-variable">
            <div class="spec-var-icon">${getIconSVG('cpu')}</div>
            <div class="spec-var-content">
              <span class="spec-var-key">requirements</span>
              <span class="spec-var-value">${integration.requirement}</span>
            </div>
          </div>
          
          <div class="spec-variable">
            <div class="spec-var-icon">${getIconSVG('trending-up')}</div>
            <div class="spec-var-content">
              <span class="spec-var-key">effort_level</span>
              <span class="spec-var-value">${integration.effort}</span>
            </div>
          </div>
          
          <div class="spec-variable">
            <div class="spec-var-icon">${getIconSVG('target')}</div>
            <div class="spec-var-content">
              <span class="spec-var-key">ideal_client</span>
              <span class="spec-var-value">${integration.recommendation}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Layout de dos columnas -->
      <div class="integration-content-grid">
        <!-- Columna izquierda: Contexto y Capacidades -->
        <div class="integration-main-content">
          <section class="integration-section">
            <h2 class="section-title">Contexto de Negocio</h2>
            <p class="section-description">${getContextDescription(integration.id)}</p>
            <div class="section-content">
              ${renderBusinessContext(integration)}
            </div>
          </section>

          <section class="integration-section">
            <h2 class="section-title">Matriz de Compatibilidad</h2>
            <p class="section-description">Revisa qué funcionalidades están disponibles, su nivel de complejidad técnica y tiempo estimado de implementación.</p>
            <div class="compatibility-matrix">
              <table class="capabilities-table">
                <thead>
                  <tr>
                    <th class="capability-header">Capacidad</th>
                    <th class="status-header">Estado</th>
                    <th class="complexity-header">Complejidad</th>
                    <th class="time-header">Tiempo</th>
                    <th class="limitations-header">Limitaciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${renderCapabilityItem('Registro (web/app)', integration.capabilities.registro)}
                  ${renderCapabilityItem('Acumulación', integration.capabilities.acumulacion)}
                  ${renderCapabilityItem('Redención', integration.capabilities.redencion)}
                  ${renderCapabilityItem('Anulación', integration.capabilities.anulacion)}
                  ${renderCapabilityItem('Integración E-commerce', integration.capabilities.ecommerce)}
                  ${renderCapabilityItem('Redimir Coins', integration.capabilities.coins)}
                  ${renderCapabilityItem('Captura SKUs', integration.capabilities.skus)}
                </tbody>
              </table>
            </div>
          </section>

          <section class="integration-section">
            <h2 class="section-title">Casos de Uso Ideales</h2>
            <p class="section-description">Explora escenarios reales donde esta integración aporta mayor valor y se adapta perfectamente a las necesidades del negocio.</p>
            <div class="use-cases-flow">
              ${renderUseCasesFlow(integration)}
            </div>
          </section>
        </div>

        <!-- Columna derecha: Materiales de soporte -->
        <aside class="integration-sidebar">
          <div class="support-materials">
            <div class="support-header">
              <div class="support-header-icon">${getIconSVG('life-buoy')}</div>
              <div class="support-header-content">
                <h3 class="sidebar-title">Centro de Ayuda</h3>
                <p class="sidebar-subtitle">Recursos para tu implementación</p>
              </div>
            </div>
            <div class="support-actions">
              <button class="support-btn support-btn-primary" onclick="showFAQ('${integration.id}')">
                <div class="support-btn-icon">${getIconSVG('help-circle')}</div>
                <div class="support-btn-content">
                  <span class="support-btn-title">FAQ</span>
                  <span class="support-btn-desc">Preguntas frecuentes</span>
                </div>
                <div class="support-btn-arrow">${getIconSVG('arrow-right')}</div>
              </button>
              <button class="support-btn" onclick="showTechnicalDocs('${integration.id}')">
                <div class="support-btn-icon">${getIconSVG('file-text')}</div>
                <div class="support-btn-content">
                  <span class="support-btn-title">Documentación</span>
                  <span class="support-btn-desc">Guías técnicas</span>
                </div>
                <div class="support-btn-arrow">${getIconSVG('arrow-right')}</div>
              </button>
              <button class="support-btn" onclick="createTicket()">
                <div class="support-btn-icon">${getIconSVG('mail')}</div>
                <div class="support-btn-content">
                  <span class="support-btn-title">Crear Ticket</span>
                  <span class="support-btn-desc">Soporte por email</span>
                </div>
                <div class="support-btn-arrow">${getIconSVG('arrow-right')}</div>
              </button>
              <button class="support-btn" onclick="contactSupport()">
                <div class="support-btn-icon">${getIconSVG('phone')}</div>
                <div class="support-btn-content">
                  <span class="support-btn-title">Contactar Soporte</span>
                  <span class="support-btn-desc">Asistencia directa</span>
                </div>
                <div class="support-btn-arrow">${getIconSVG('arrow-right')}</div>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Materiales de Soporte -->

  `;
}

function renderCapabilityItem(name, capability) {
  // Información complementaria por capacidad
  const capabilityDetails = {
    'Registro (web/app)': {
      complexity: 'Básico',
      timeToImplement: 'Inmediato',
      limitations: 'Campos estándar únicamente'
    },
    'Acumulación': {
      complexity: 'Intermedio',
      timeToImplement: '1-2 días',
      limitations: 'Hasta 10K transacciones/día'
    },
    'Redención': {
      complexity: 'Intermedio',
      timeToImplement: '2-3 días',
      limitations: 'Validación en tiempo real'
    },
    'Anulación': {
      complexity: 'Avanzado',
      timeToImplement: '3-5 días',
      limitations: 'Solo últimas 24h'
    },
    'Integración E-commerce': {
      complexity: 'Avanzado',
      timeToImplement: '1 semana',
      limitations: 'Plataformas compatibles'
    },
    'Redimir Coins': {
      complexity: 'Intermedio',
      timeToImplement: '2-3 días',
      limitations: 'Mínimo 100 coins'
    },
    'Captura SKUs': {
      complexity: 'Básico',
      timeToImplement: '1 día',
      limitations: 'Máximo 50 SKUs/transacción'
    }
  };

  let status = '';
  let statusClass = '';
  let statusCode = '';
  let description = '';
  
  if (capability === true) {
    status = 'Soporte Completo';
    statusClass = 'status-full';
    statusCode = 'FULL';
    description = 'Funcionalidad nativa disponible';
  } else if (capability === false) {
    status = 'No Soportado';
    statusClass = 'status-none';
    statusCode = 'NONE';
    description = 'Funcionalidad no disponible';
  } else if (capability === 'partial') {
    status = 'Soporte Parcial';
    statusClass = 'status-partial';
    statusCode = 'PART';
    description = 'Disponible con limitaciones';
  } else if (capability === 'delayed') {
    status = 'Procesamiento Diferido';
    statusClass = 'status-delayed';
    statusCode = 'DELAY';
    description = 'Disponible en modo batch';
  } else {
    status = 'Vía Soporte';
    statusClass = 'status-support';
    statusCode = 'SUP';
    description = 'Requiere asistencia técnica';
  }
  
  const details = capabilityDetails[name] || {
    complexity: 'N/A',
    timeToImplement: 'N/A',
    limitations: 'Consultar documentación'
  };
  
  // Clases para complejidad
  const complexityClass = details.complexity === 'Básico' ? 'complexity-basic' : 
                         details.complexity === 'Intermedio' ? 'complexity-intermediate' : 
                         'complexity-advanced';
  
  // Clases para tiempo
  const timeClass = details.timeToImplement === 'Inmediato' ? 'time-immediate' :
                   details.timeToImplement.includes('día') ? 'time-days' :
                   'time-weeks';
  
  return `
    <tr class="capability-row">
      <td class="capability-name-cell">
        <span class="capability-name">${name}</span>
      </td>
      <td class="capability-status-cell">
        <span class="capability-status-indicator ${statusClass}">${statusCode}</span>
      </td>
      <td class="capability-complexity-cell">
        <span class="info-badge ${complexityClass}">${details.complexity}</span>
      </td>
      <td class="capability-time-cell">
        <span class="info-badge ${timeClass}">${details.timeToImplement}</span>
      </td>
      <td class="capability-limitations-cell">
        <span class="limitations-text">${details.limitations}</span>
      </td>
    </tr>
  `;
}

function renderBusinessContext(integration) {
  // Descripciones específicas por tipo de integración
  const contextDescriptions = {
    'api': 'Integración directa mediante endpoints REST que permite comunicación en tiempo real entre tu sistema y Leal 360.',
    'agente': 'Software ligero que se instala en tu punto de venta para capturar automáticamente las transacciones sin modificar tu sistema actual.',
    'sftp': 'Transferencia segura de archivos CSV con procesamiento batch, ideal para sistemas que no permiten integraciones en tiempo real.',
    'cajero-web': 'Interface web optimizada que permite a tus cajeros gestionar el programa de lealtad sin instalaciones adicionales.',
    'ipaas': 'Conectores pre-construidos para plataformas de automatización que facilitan la integración sin desarrollo técnico.'
  };

  const contexts = {
    'api': `
      <div class="business-context-card">
        <div class="context-header">
          <div class="context-icon">${getIconSVG('activity')}</div>
          <h3 class="context-title">Flujo de Integración API</h3>
        </div>
        <div class="flow-diagram">
          <div class="flow-step">
            <div class="flow-node flow-node-system">
              <div class="node-icon">${getIconSVG('monitor')}</div>
              <div class="node-content">
                <span class="node-title">Tu Sistema</span>
                <span class="node-subtitle">POS/E-commerce</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('arrow-right')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-leal">
              <div class="node-icon">${getIconSVG('zap')}</div>
              <div class="node-content">
                <span class="node-title">API Leal</span>
                <span class="node-subtitle">Endpoints REST</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('arrow-right')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-platform">
              <div class="node-icon">${getIconSVG('database')}</div>
              <div class="node-content">
                <span class="node-title">Leal 360</span>
                <span class="node-subtitle">Procesamiento</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    'agente': `
      <div class="business-context-card">
        <div class="context-header">
          <div class="context-icon">${getIconSVG('cpu')}</div>
          <h3 class="context-title">Flujo de Integración Agente</h3>
        </div>
        <div class="flow-diagram">
          <div class="flow-step">
            <div class="flow-node flow-node-system">
              <div class="node-icon">${getIconSVG('monitor')}</div>
              <div class="node-content">
                <span class="node-title">POS Compatible</span>
                <span class="node-subtitle">Sistema punto de venta</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('zap')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-leal">
              <div class="node-icon">${getIconSVG('cpu')}</div>
              <div class="node-content">
                <span class="node-title">Widget Agente</span>
                <span class="node-subtitle">Captura automática</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('arrow-right')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-platform">
              <div class="node-icon">${getIconSVG('database')}</div>
              <div class="node-content">
                <span class="node-title">Leal API</span>
                <span class="node-subtitle">Envío de data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="key-benefits-card">
        <div class="benefits-header">
          <div class="benefits-icon">${getIconSVG('check-circle')}</div>
          <h4 class="benefits-title">POS Compatibles</h4>
        </div>
        <div class="benefits-grid">
          <div class="benefit-item success">
            <div class="benefit-icon success">${getIconSVG('check')}</div>
            <span class="benefit-text">Siigo POS</span>
          </div>
          <div class="benefit-item success">
            <div class="benefit-icon success">${getIconSVG('check')}</div>
            <span class="benefit-text">Vendty</span>
          </div>
          <div class="benefit-item success">
            <div class="benefit-icon success">${getIconSVG('check')}</div>
            <span class="benefit-text">IconPOS</span>
          </div>
          <div class="benefit-item success">
            <div class="benefit-icon success">${getIconSVG('check')}</div>
            <span class="benefit-text">Revo XEF</span>
          </div>
          <div class="benefit-item info">
            <div class="benefit-icon info">${getIconSVG('plus')}</div>
            <span class="benefit-text">Y más sistemas</span>
          </div>
        </div>
      </div>
    `,
    'sftp': `
      <div class="business-context-card">
        <div class="context-header">
          <div class="context-icon">${getIconSVG('upload')}</div>
          <h3 class="context-title">Flujo de Transferencia SFTP</h3>
        </div>
        <div class="flow-diagram">
          <div class="flow-step">
            <div class="flow-node flow-node-system">
              <div class="node-icon">${getIconSVG('file-text')}</div>
              <div class="node-content">
                <span class="node-title">Tu Sistema</span>
                <span class="node-subtitle">Genera CSV</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('upload')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-leal">
              <div class="node-icon">${getIconSVG('server')}</div>
              <div class="node-content">
                <span class="node-title">Servidor SFTP</span>
                <span class="node-subtitle">Transferencia segura</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('arrow-right')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-platform">
              <div class="node-icon">${getIconSVG('database')}</div>
              <div class="node-content">
                <span class="node-title">Leal Batch</span>
                <span class="node-subtitle">Procesamiento</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="key-benefits-card">
        <div class="benefits-header">
          <div class="benefits-icon">${getIconSVG('code')}</div>
          <h4 class="benefits-title">Formato de Archivo CSV</h4>
        </div>
        <div class="code-sample">
          <div class="code-header">
            <div class="code-lang">CSV</div>
            <button class="code-copy" onclick="copyToClipboard(this)">
              ${getIconSVG('copy')}
              <span>Copiar</span>
            </button>
          </div>
          <pre class="code-content">usuario_id,transaccion_id,valor,fecha,productos
12345,TXN001,50000,2024-01-15,SKU1;SKU2
67890,TXN002,75000,2024-01-15,SKU3</pre>
        </div>
      </div>
    `,
    'cajero-web': `
      <div class="business-context-card">
        <div class="context-header">
          <div class="context-icon">${getIconSVG('globe')}</div>
          <h3 class="context-title">Flujo Cajero Web</h3>
        </div>
        <div class="flow-diagram">
          <div class="flow-step">
            <div class="flow-node flow-node-system">
              <div class="node-icon">${getIconSVG('user')}</div>
              <div class="node-content">
                <span class="node-title">Cajero</span>
                <span class="node-subtitle">Accede a URL</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('link')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-leal">
              <div class="node-icon">${getIconSVG('globe')}</div>
              <div class="node-content">
                <span class="node-title">Interface Web</span>
                <span class="node-subtitle">leal.com/cajero</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('arrow-right')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-platform">
              <div class="node-icon">${getIconSVG('database')}</div>
              <div class="node-content">
                <span class="node-title">Leal Backend</span>
                <span class="node-subtitle">Tiempo real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="key-benefits-card">
        <div class="benefits-header">
          <div class="benefits-icon">${getIconSVG('star')}</div>
          <h4 class="benefits-title">Ventajas Clave</h4>
        </div>
        <div class="benefits-grid">
          <div class="benefit-item success">
            <div class="benefit-icon success">${getIconSVG('zap')}</div>
            <span class="benefit-text">Implementación inmediata (0 desarrollo)</span>
          </div>
          <div class="benefit-item primary">
            <div class="benefit-icon primary">${getIconSVG('monitor')}</div>
            <span class="benefit-text">Interface optimizada para cajeros</span>
          </div>
          <div class="benefit-item info">
            <div class="benefit-icon info">${getIconSVG('globe')}</div>
            <span class="benefit-text">Funciona en cualquier navegador</span>
          </div>
          <div class="benefit-item accent">
            <div class="benefit-icon accent">${getIconSVG('shield')}</div>
            <span class="benefit-text">Acceso con credenciales seguras</span>
          </div>
        </div>
      </div>
    `,
    'ipaas': `
      <div class="business-context-card">
        <div class="context-header">
          <div class="context-icon">${getIconSVG('shuffle')}</div>
          <h3 class="context-title">Arquitectura iPaaS</h3>
        </div>
        <div class="flow-diagram">
          <div class="flow-step">
            <div class="flow-node flow-node-system">
              <div class="node-icon">${getIconSVG('layers')}</div>
              <div class="node-content">
                <span class="node-title">Múltiples Fuentes</span>
                <span class="node-subtitle">CRM, ERP, E-commerce</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('zap')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-leal">
              <div class="node-icon">${getIconSVG('shuffle')}</div>
              <div class="node-content">
                <span class="node-title">Conectores iPaaS</span>
                <span class="node-subtitle">Zapier, Make, etc.</span>
              </div>
            </div>
          </div>
          <div class="flow-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">${getIconSVG('arrow-right')}</div>
          </div>
          <div class="flow-step">
            <div class="flow-node flow-node-platform">
              <div class="node-icon">${getIconSVG('database')}</div>
              <div class="node-content">
                <span class="node-title">Leal 360</span>
                <span class="node-subtitle">Unificado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="key-benefits-card">
        <div class="benefits-header">
          <div class="benefits-icon">${getIconSVG('grid')}</div>
          <h4 class="benefits-title">Plataformas Soportadas</h4>
        </div>
        <div class="benefits-grid">
          <div class="benefit-item brand">
            <div class="benefit-icon brand">${getIconSVG('zap')}</div>
            <span class="benefit-text">Zapier</span>
          </div>
          <div class="benefit-item accent">
            <div class="benefit-icon accent">${getIconSVG('shuffle')}</div>
            <span class="benefit-text">Make (Integromat)</span>
          </div>
          <div class="benefit-item primary">
            <div class="benefit-icon primary">${getIconSVG('grid')}</div>
            <span class="benefit-text">Microsoft Power Automate</span>
          </div>
          <div class="benefit-item info">
            <div class="benefit-icon info">${getIconSVG('layers')}</div>
            <span class="benefit-text">Workato</span>
          </div>
        </div>
      </div>
    `
  };
  
  return contexts[integration.id] || '<p>Contexto de negocio en desarrollo...</p>';
}

function copyToClipboard(button) {
  const codeContent = button.closest('.code-sample').querySelector('.code-content');
  const text = codeContent.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.querySelector('span').textContent;
    button.querySelector('span').textContent = '¡Copiado!';
    button.style.background = 'color-mix(in srgb, var(--bg-brand) 15%, var(--background))';
    button.style.color = 'var(--bg-brand)';
    
    setTimeout(() => {
      button.querySelector('span').textContent = originalText;
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  }).catch(() => {
    button.querySelector('span').textContent = 'Error';
    setTimeout(() => {
      button.querySelector('span').textContent = 'Copiar';
    }, 2000);
  });
}

function createTicket() {
  window.open('mailto:soporte@leal.co?subject=Solicitud de Soporte - Integración&body=Describe tu consulta o problema aquí...', '_blank');
}

function contactSupport() {
  window.open('mailto:soporte@leal.co?subject=Contacto Directo - Soporte Técnico', '_blank');
}

function showFAQ(integrationId) {
  console.log('showFAQ called with:', integrationId);
  const integration = mainNavigation.find(s => s.id === 'integrations')?.subsections?.find(i => i.id === integrationId);
  console.log('Found integration:', integration);
  
  if (!integration) {
    console.error('Integration not found:', integrationId);
    return;
  }

  const faqData = getFAQData(integrationId);
  console.log('FAQ data:', faqData);
  
  document.getElementById('mainContent').innerHTML = `
    <div class="faq-page-container">
      <div class="faq-page-header">
        <button class="back-button" onclick="renderIntegrationDetail('${integrationId}')">
          <div class="back-icon">${getIconSVG('arrow-left')}</div>
          <span>Volver a ${integration.title}</span>
        </button>
        <div class="faq-title-section">
          <div class="faq-title-icon">${getIconSVG('help-circle')}</div>
          <div class="faq-title-content">
            <h1 class="faq-page-title">Preguntas Frecuentes</h1>
            <p class="faq-page-subtitle">Encuentra respuestas rápidas sobre la integración ${integration.title}</p>
          </div>
        </div>
      </div>
      
      <div class="faq-page-content">
        ${Object.entries(faqData).map(([category, faqs]) => `
          <div class="faq-page-category">
            <div class="faq-category-header-page">
              <div class="faq-category-icon-page">${getIconSVG('folder')}</div>
              <h2 class="faq-category-title-page">${category}</h2>
              <div class="faq-category-badge-page">${faqs.length} pregunta${faqs.length !== 1 ? 's' : ''}</div>
            </div>
            <div class="faq-cards-grid-page">
              ${faqs.map((faq, index) => `
                <div class="faq-card-page">
                  <div class="faq-card-header-page" onclick="toggleFAQPage('${integrationId}-${category}-${index}')">
                    <div class="faq-card-icon-page">
                      <div class="faq-icon-circle-page">
                        ${getIconSVG('message-circle')}
                      </div>
                    </div>
                    <div class="faq-card-content-page">
                      <h3 class="faq-card-title-page">${faq.question}</h3>
                      <span class="faq-card-hint-page">Click para ver la respuesta completa</span>
                    </div>
                    <div class="faq-card-chevron-page" id="chevron-${integrationId}-${category}-${index}">
                      ${getIconSVG('chevron-down')}
                    </div>
                  </div>
                  <div class="faq-card-body-page" id="answer-${integrationId}-${category}-${index}" style="max-height: 0; overflow: hidden;">
                    <div class="faq-card-answer-page">
                      <div class="faq-answer-icon-page">${getIconSVG('check-circle')}</div>
                      <div class="faq-answer-text-page">
                        <p>${faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
        
        <div class="faq-page-footer">
          <div class="faq-footer-content">
            <div class="faq-footer-icon">${getIconSVG('mail')}</div>
            <div class="faq-footer-text">
              <h3>¿No encontraste lo que buscabas?</h3>
              <p>Nuestro equipo de soporte está aquí para ayudarte</p>
            </div>
            <div class="faq-footer-actions">
              <button class="faq-footer-btn primary" onclick="createTicket()">
                ${getIconSVG('mail')}
                <span>Crear Ticket</span>
              </button>
              <button class="faq-footer-btn secondary" onclick="contactSupport()">
                ${getIconSVG('phone')}
                <span>Contactar Soporte</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleFAQPage(id) {
  const answer = document.getElementById(`answer-${id}`);
  const chevron = document.getElementById(`chevron-${id}`);
  const card = answer?.closest('.faq-card-page');
  
  if (!answer || !chevron || !card) {
    console.error('FAQ elements not found for id:', id);
    return;
  }
  
  // Cerrar otras FAQs abiertas en la misma categoría
  const category = answer.closest('.faq-page-category');
  if (category) {
    category.querySelectorAll('.faq-card-body-page').forEach(otherAnswer => {
      if (otherAnswer !== answer && otherAnswer.style.maxHeight !== '0px') {
        const otherCard = otherAnswer.closest('.faq-card-page');
        const otherId = otherAnswer.id.replace('answer-', '');
        const otherChevron = document.getElementById(`chevron-${otherId}`);
        
        // Cerrar
        otherAnswer.style.maxHeight = '0px';
        if (otherChevron) {
          otherChevron.style.transform = 'rotate(0deg)';
        }
        if (otherCard) {
          otherCard.classList.remove('faq-card-expanded');
        }
      }
    });
  }
  
  // Toggle actual con animación suave
  const isExpanded = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
  
  if (isExpanded) {
    // Cerrar
    answer.style.maxHeight = '0px';
    chevron.style.transform = 'rotate(0deg)';
    card.classList.remove('faq-card-expanded');
  } else {
    // Abrir
    answer.style.maxHeight = answer.scrollHeight + 'px';
    chevron.style.transform = 'rotate(180deg)';
    card.classList.add('faq-card-expanded');
  }
}

function showTechnicalDocs(integrationId) {
  alert('Abriendo documentación técnica de ' + integrationId);
}

function getContextDescription(integrationId) {
  const descriptions = {
    'api': 'Integración directa mediante endpoints REST que permite comunicación en tiempo real entre tu sistema y Leal 360.',
    'agente': 'Software ligero que se instala en tu punto de venta para capturar automáticamente las transacciones sin modificar tu sistema actual.',
    'sftp': 'Transferencia segura de archivos CSV con procesamiento batch, ideal para sistemas que no permiten integraciones en tiempo real.',
    'cajero-web': 'Interface web optimizada que permite a tus cajeros gestionar el programa de lealtad sin instalaciones adicionales.',
    'ipaas': 'Conectores pre-construidos para plataformas de automatización que facilitan la integración sin desarrollo técnico.'
  };
  
  return descriptions[integrationId] || 'Comprende cómo funciona esta integración y el flujo de datos entre tu sistema y la plataforma Leal 360.';
}


function getFAQData(integrationId) {
  const faqDatabase = {
    'api': {
      'Configuración Inicial': [
        {
          question: '¿Cómo obtengo las credenciales de API?',
          answer: 'Las credenciales se proporcionan durante el proceso de onboarding. Incluyen un API Key y Secret que debes mantener seguros. Contacta a tu representante de Leal para obtenerlas.'
        },
        {
          question: '¿Qué endpoints están disponibles?',
          answer: 'La API incluye endpoints para registro de usuarios, acumulación de puntos, redención, consulta de saldos y gestión de transacciones. Consulta la documentación técnica para la lista completa.'
        },
        {
          question: '¿Hay límites de rate limiting?',
          answer: 'Sí, el límite estándar es de 1000 requests por minuto por API Key. Para volúmenes mayores, contacta al equipo técnico para ajustar los límites según tus necesidades.'
        }
      ],
      'Implementación': [
        {
          question: '¿Cuánto tiempo toma implementar la API?',
          answer: 'La implementación típica toma entre 1-2 semanas, dependiendo de la complejidad de tu sistema y los endpoints que necesites integrar.'
        },
        {
          question: '¿Necesito certificados SSL específicos?',
          answer: 'Todos los endpoints requieren HTTPS. Puedes usar cualquier certificado SSL válido. La API de Leal valida automáticamente la seguridad de la conexión.'
        },
        {
          question: '¿Cómo manejo los errores de API?',
          answer: 'La API retorna códigos HTTP estándar y mensajes de error descriptivos en JSON. Implementa retry logic para errores 5xx y maneja apropiadamente los errores 4xx.'
        }
      ],
      'Troubleshooting': [
        {
          question: '¿Qué hago si recibo error 401?',
          answer: 'Error 401 indica problemas de autenticación. Verifica que tu API Key sea correcta, esté activa y que estés enviando los headers de autorización apropiados.'
        },
        {
          question: '¿Por qué mis transacciones no aparecen?',
          answer: 'Verifica que estés enviando todos los campos requeridos, que el formato de fecha sea correcto (ISO 8601) y que el usuario esté registrado en el sistema.'
        }
      ]
    },
    'agente': {
      'Instalación': [
        {
          question: '¿En qué sistemas operativos funciona el agente?',
          answer: 'El agente es compatible con Windows 10/11, macOS 10.15+ y las principales distribuciones de Linux. Requiere al menos 2GB de RAM y 500MB de espacio en disco.'
        },
        {
          question: '¿Necesito permisos de administrador?',
          answer: 'Sí, la instalación inicial requiere permisos de administrador para configurar los servicios del sistema. Una vez instalado, puede ejecutarse con permisos de usuario normal.'
        }
      ],
      'Configuración': [
        {
          question: '¿Cómo configuro mi POS con el agente?',
          answer: 'El agente incluye conectores pre-configurados para los POS más comunes. Durante la instalación, selecciona tu sistema POS y el agente configurará automáticamente la integración.'
        },
        {
          question: '¿Qué datos captura el agente?',
          answer: 'El agente captura información de transacciones, productos, clientes y promociones aplicadas. Todos los datos se encriptan antes de ser enviados a Leal 360.'
        }
      ]
    },
    'sftp': {
      'Configuración': [
        {
          question: '¿Cómo configuro la conexión SFTP?',
          answer: 'Te proporcionaremos las credenciales SFTP (servidor, usuario, contraseña) y la estructura de carpetas. Configura tu sistema para subir archivos a la carpeta /incoming cada día.'
        },
        {
          question: '¿Qué formato debe tener el archivo CSV?',
          answer: 'El archivo debe incluir las columnas: usuario_id, transaccion_id, valor, fecha (YYYY-MM-DD), productos (separados por ;). La primera fila debe contener los headers.'
        }
      ],
      'Procesamiento': [
        {
          question: '¿Con qué frecuencia se procesan los archivos?',
          answer: 'Los archivos se procesan automáticamente cada hora. Los archivos procesados exitosamente se mueven a /processed y los con errores a /error con un reporte detallado.'
        },
        {
          question: '¿Qué pasa si hay errores en el archivo?',
          answer: 'Se genera un reporte de errores detallando las filas problemáticas. Las filas válidas se procesan normalmente y las inválidas se reportan para corrección.'
        }
      ]
    },
    'cajero-web': {
      'Acceso': [
        {
          question: '¿Cómo acceden los cajeros al sistema?',
          answer: 'Los cajeros acceden a través de la URL proporcionada usando las credenciales asignadas por el administrador. Cada cajero tiene un usuario único con permisos específicos.'
        },
        {
          question: '¿Funciona en tablets y móviles?',
          answer: 'Sí, la interfaz es completamente responsive y funciona en tablets, smartphones y computadores. Se optimiza automáticamente para el tamaño de pantalla.'
        }
      ],
      'Funcionalidades': [
        {
          question: '¿Qué operaciones pueden realizar los cajeros?',
          answer: 'Los cajeros pueden consultar saldos, acumular puntos, procesar redenciones, aplicar promociones y consultar el historial de transacciones del cliente.'
        },
        {
          question: '¿Se puede usar sin conexión a internet?',
          answer: 'No, requiere conexión a internet para funcionar. Sin embargo, es muy liviano y funciona bien con conexiones de baja velocidad.'
        }
      ]
    },
    'ipaas': {
      'Plataformas': [
        {
          question: '¿Qué plataformas iPaaS son compatibles?',
          answer: 'Tenemos conectores nativos para Zapier, Make (Integromat), Microsoft Power Automate y Workato. También ofrecemos webhooks para otras plataformas.'
        },
        {
          question: '¿Necesito conocimientos técnicos?',
          answer: 'No, los conectores están diseñados para usuarios no técnicos. Incluyen templates pre-configurados y documentación paso a paso para configurar flujos comunes.'
        }
      ],
      'Configuración': [
        {
          question: '¿Cómo configuro un flujo en Zapier?',
          answer: 'Busca "Leal" en Zapier, conecta tu cuenta usando las credenciales proporcionadas, selecciona los triggers y acciones que necesites, y activa el Zap.'
        },
        {
          question: '¿Puedo crear flujos personalizados?',
          answer: 'Sí, además de los templates, puedes crear flujos completamente personalizados combinando diferentes triggers, filtros y acciones según tus necesidades específicas.'
        }
      ]
    }
  };

  return faqDatabase[integrationId] || {};
}




function renderUseCasesFlow(integration) {
  const useCaseData = {
    'api': {
      icon: 'code',
      scenarios: [
        {
          title: 'E-commerce Avanzado',
          icon: 'shopping-cart',
          description: 'Tiendas online que necesitan integración completa con acumulación y redención en tiempo real',
          features: ['Sincronización automática', 'Webhooks en tiempo real', 'Gestión de inventario'],
          ideal: 'Shopify, VTEX, WooCommerce con alto volumen',
          color: '#10B981'
        },
        {
          title: 'Retail Omnicanal',
          icon: 'layers',
          description: 'Cadenas con múltiples canales que requieren unificación de datos de lealtad',
          features: ['API unificada', 'Múltiples endpoints', 'Consistencia cross-channel'],
          ideal: 'Retailers con POS + App + Web',
          color: '#3B82F6'
        },
        {
          title: 'Marketplace B2B',
          icon: 'users',
          description: 'Plataformas que manejan múltiples vendedores y necesitan flexibilidad total',
          features: ['Configuración por tenant', 'Reglas personalizadas', 'Reportes avanzados'],
          ideal: 'Marketplaces, distribuidores mayoristas',
          color: '#8B5CF6'
        }
      ]
    },
    'agente': {
      icon: 'user-check',
      scenarios: [
        {
          title: 'Implementación Rápida',
          icon: 'zap',
          description: 'Negocios que necesitan estar operativos en menos de 2 semanas',
          features: ['Setup guiado', 'Configuración visual', 'Soporte dedicado'],
          ideal: 'Startups, nuevos retailers, pruebas de concepto',
          color: '#F59E0B'
        },
        {
          title: 'Migración Asistida',
          icon: 'refresh-cw',
          description: 'Empresas migrando desde otros sistemas de lealtad',
          features: ['Importación de datos', 'Mapeo de reglas', 'Transición gradual'],
          ideal: 'Empresas con programas existentes',
          color: '#06B6D4'
        }
      ]
    },
    'ipaas': {
      icon: 'git-branch',
      scenarios: [
        {
          title: 'Ecosistema Complejo',
          icon: 'network',
          description: 'Organizaciones con múltiples sistemas que necesitan orquestación',
          features: ['Conectores pre-built', 'Flujos visuales', 'Monitoreo centralizado'],
          ideal: 'Empresas con Salesforce, HubSpot, ERP',
          color: '#EF4444'
        },
        {
          title: 'Automatización Avanzada',
          icon: 'settings',
          description: 'Procesos complejos que requieren lógica de negocio personalizada',
          features: ['Workflows condicionales', 'Transformación de datos', 'Triggers automáticos'],
          ideal: 'Operaciones con reglas de negocio complejas',
          color: '#84CC16'
        }
      ]
    },
    'web-cajero': {
      icon: 'monitor',
      scenarios: [
        {
          title: 'Retail Tradicional',
          icon: 'store',
          description: 'Tiendas físicas que quieren digitalizar su programa de lealtad',
          features: ['Interface simple', 'Operación offline', 'Capacitación mínima'],
          ideal: 'Retail tradicional, franquicias pequeñas',
          color: '#F97316'
        },
        {
          title: 'Eventos y Ferias',
          icon: 'calendar',
          description: 'Activaciones temporales que necesitan captura rápida de datos',
          features: ['Setup instantáneo', 'Modo kiosco', 'Sincronización posterior'],
          ideal: 'Eventos, pop-ups, activaciones de marca',
          color: '#EC4899'
        }
      ]
    },
    'sftp': {
      icon: 'server',
      scenarios: [
        {
          title: 'Sistemas Legacy',
          icon: 'database',
          description: 'Empresas con infraestructura antigua que no permite APIs',
          features: ['Intercambio de archivos', 'Procesamiento batch', 'Formatos estándar'],
          ideal: 'Bancos, aseguradoras, grandes corporativos',
          color: '#6366F1'
        },
        {
          title: 'Reportes Masivos',
          icon: 'bar-chart',
          description: 'Organizaciones que manejan grandes volúmenes de datos históricos',
          features: ['Transferencia masiva', 'Procesamiento nocturno', 'Validación automática'],
          ideal: 'Análisis de big data, migraciones masivas',
          color: '#14B8A6'
        }
      ]
    }
  };

  const data = useCaseData[integration.id] || useCaseData['api'];
  
  return `
    <div class="use-cases-accordion">
      ${data.scenarios.map((scenario, index) => `
        <div class="accordion-item" style="--accent-color: ${scenario.color}" data-scenario="${index}">
          <div class="accordion-header" onclick="toggleAccordionItem(this)">
            <div class="accordion-icon">
              ${getIconSVG(scenario.icon)}
            </div>
            <div class="accordion-title-group">
              <h3 class="accordion-title">${scenario.title}</h3>
              <p class="accordion-preview">${scenario.description}</p>
            </div>
            <div class="accordion-controls">
              <div class="accordion-badge">${String(index + 1).padStart(2, '0')}</div>
              <div class="accordion-chevron">
                ${getIconSVG('chevron-down')}
              </div>
            </div>
          </div>
          
          <div class="accordion-content">
            <div class="accordion-body">
              <div class="scenario-details-grid">
                <div class="scenario-features-section">
                  <h4 class="section-subtitle">Características Clave</h4>
                  <div class="features-list">
                    ${scenario.features.map(feature => `
                      <div class="feature-item">
                        <div class="feature-check">${getIconSVG('check')}</div>
                        <span class="feature-text">${feature}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <div class="scenario-ideal-section">
                  <h4 class="section-subtitle">Ideal Para</h4>
                  <div class="ideal-content">
                    <div class="ideal-icon-large">${getIconSVG('target')}</div>
                    <p class="ideal-description">${scenario.ideal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Función para manejar el toggle del acordeón
function toggleAccordionItem(header) {
  const item = header.closest('.accordion-item');
  const content = item.querySelector('.accordion-content');
  const chevron = item.querySelector('.accordion-chevron');
  const isActive = item.classList.contains('active');
  
  // Cerrar todos los otros items del acordeón
  const accordion = item.closest('.use-cases-accordion');
  const allItems = accordion.querySelectorAll('.accordion-item');
  allItems.forEach(otherItem => {
    if (otherItem !== item) {
      otherItem.classList.remove('active');
      const otherContent = otherItem.querySelector('.accordion-content');
      const otherChevron = otherItem.querySelector('.accordion-chevron');
      otherContent.style.maxHeight = '0';
      otherChevron.style.transform = 'rotate(0deg)';
    }
  });
  
  // Toggle el item actual
  if (isActive) {
    item.classList.remove('active');
    content.style.maxHeight = '0';
    chevron.style.transform = 'rotate(0deg)';
  } else {
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
    chevron.style.transform = 'rotate(180deg)';
  }
}

function renderUseCases(integration) {
  const useCases = {
    'api': `
      <div style="margin: 3rem 0;">
        <h2 style="font-size: 1.75rem; margin-bottom: 2rem; text-align: center;">Casos de Éxito</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div style="background: var(--card); padding: 2rem; border-radius: var(--radius);">
            <h4 style="color: var(--leal-yellow); margin-bottom: 1rem;">E-commerce Fashion</h4>
            <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
              Integración completa con Shopify para acumulación de puntos en tiempo real y redenciones.
            </p>
            <div style="font-size: 0.875rem; color: var(--muted-foreground);">
              <strong>Resultado:</strong> +35% retención, +20% AOV
            </div>
          </div>
          <div style="background: var(--card); padding: 2rem; border-radius: var(--radius);">
            <h4 style="color: var(--leal-yellow); margin-bottom: 1rem;">Cadena de Restaurantes</h4>
            <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
              API integrada con sistema POS para programa de lealtad omnicanal.
            </p>
            <div style="font-size: 0.875rem; color: var(--muted-foreground);">
              <strong>Resultado:</strong> +50% usuarios activos
            </div>
          </div>
        </div>
      </div>
    `,
    'agente': `
      <div style="margin: 3rem 0;">
        <h2 style="font-size: 1.75rem; margin-bottom: 2rem; text-align: center;">Casos de Implementación</h2>
        <div style="background: var(--card); padding: 2rem; border-radius: var(--radius);">
          <h4 style="color: var(--leal-yellow); margin-bottom: 1rem;">Retail Multi-tienda</h4>
          <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
            50+ tiendas con POS Siigo implementaron Agente Leal sin modificar su infraestructura existente.
          </p>
          <div style="font-size: 0.875rem; color: var(--muted-foreground);">
            <strong>Tiempo de implementación:</strong> 2 días por tienda
          </div>
        </div>
      </div>
    `,
    'sftp': `
      <div style="margin: 3rem 0;">
        <h2 style="font-size: 1.75rem; margin-bottom: 2rem; text-align: center;">Casos de Uso</h2>
        <div style="background: var(--card); padding: 2rem; border-radius: var(--radius);">
          <h4 style="color: var(--leal-yellow); margin-bottom: 1rem;">Empresa Legacy</h4>
          <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
            Sistema ERP legacy que genera reportes diarios. Implementación de lealtad sin modificar código existente.
          </p>
          <div style="font-size: 0.875rem; color: var(--muted-foreground);">
            <strong>Ventaja:</strong> Piloto de 30 días sin riesgo
          </div>
        </div>
      </div>
    `,
    'cajero-web': `
      <div style="margin: 3rem 0;">
        <h2 style="font-size: 1.75rem; margin-bottom: 2rem; text-align: center;">Casos de Implementación</h2>
        <div style="background: var(--card); padding: 2rem; border-radius: var(--radius);">
          <h4 style="color: var(--leal-yellow); margin-bottom: 1rem;">Franquicia de Cafeterías</h4>
          <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
            15 locales implementaron Cajero Web en una semana. Cada barista accede via tablet a la interface.
          </p>
          <div style="font-size: 0.875rem; color: var(--muted-foreground);">
            <strong>Implementación:</strong> 30 minutos por local
          </div>
        </div>
      </div>
    `,
    'ipaas': `
      <div style="margin: 3rem 0;">
        <h2 style="font-size: 1.75rem; margin-bottom: 2rem; text-align: center;">Casos Enterprise</h2>
        <div style="background: var(--card); padding: 2rem; border-radius: var(--radius);">
          <h4 style="color: var(--leal-yellow); margin-bottom: 1rem;">Grupo Retail</h4>
          <p style="color: var(--muted-foreground); margin-bottom: 1rem;">
            Integración de 5 marcas diferentes (CRM Salesforce, E-commerce Magento, POS Oracle) via Zapier.
          </p>
          <div style="font-size: 0.875rem; color: var(--muted-foreground);">
            <strong>Resultado:</strong> Vista 360° unificada de clientes
          </div>
        </div>
      </div>
    `
  };
  
  return useCases[integration.id] || '';
}

// Sistema de FAQ
const faqData = {
  'api': [
    {
      question: '¿Qué endpoints necesito implementar mínimamente?',
      answer: 'Los endpoints esenciales son: autenticación (/login), cargar factura (/facturas), y consultar usuario (/usuarios/{id}). Con estos 3 endpoints tienes un programa de lealtad funcional.'
    },
    {
      question: '¿Cuánto tiempo toma la implementación completa?',
      answer: 'Para un desarrollador con experiencia en APIs REST, la implementación básica toma entre 1-2 semanas. La implementación completa con todas las funcionalidades puede tomar 4-6 semanas.'
    },
    {
      question: '¿Hay límites de rate limiting?',
      answer: 'Sí, el límite estándar es 1000 requests por minuto por API key. Para necesidades enterprise contacta a nuestro equipo para límites personalizados.'
    },
    {
      question: '¿Cómo manejo los errores de la API?',
      answer: 'Todos los errores siguen el estándar HTTP. Revisa el código de estado y el mensaje en el response body. Implementa retry logic para errores 5xx.'
    },
    {
      question: '¿Puedo hacer pruebas antes de producción?',
      answer: 'Sí, proporcionamos un ambiente de sandbox completo con data de prueba. Las credenciales de testing se envían al aprobar tu solicitud de integración.'
    }
  ],
  'agente': [
    {
      question: '¿Mi POS está en la lista de compatibles?',
      answer: 'Actualmente soportamos Siigo POS, Vendty, IconPOS, Revo XEF, y otros. Envíanos el modelo exacto de tu POS para confirmación de compatibilidad.'
    },
    {
      question: '¿Necesito instalar software adicional?',
      answer: 'Sí, instalamos un pequeño agente (5MB) que se ejecuta en background. No interfiere con el funcionamiento normal de tu POS.'
    },
    {
      question: '¿Qué pasa si mi POS se actualiza?',
      answer: 'El agente es compatible con actualizaciones menores. Para actualizaciones mayores, nuestro equipo técnico ajusta el agente según sea necesario.'
    },
    {
      question: '¿Puedo personalizar qué datos se capturan?',
      answer: 'El agente captura automáticamente los datos estándar (valor, fecha, usuario). Las personalizaciones dependen de las capacidades específicas de tu POS.'
    },
    {
      question: '¿Cómo verifico que está funcionando correctamente?',
      answer: 'Proporcionamos un dashboard en tiempo real donde puedes ver las transacciones que se están capturando y procesando.'
    }
  ],
  'sftp': [
    {
      question: '¿Con qué frecuencia debo enviar los archivos?',
      answer: 'Recomendamos envío diario para mantener los datos actualizados. Soportamos desde envío cada 4 horas hasta envío semanal según tus necesidades.'
    },
    {
      question: '¿Qué formato exacto debe tener el CSV?',
      answer: 'Enviamos la especificación detallada del formato CSV con campos obligatorios y opcionales. También proporcionamos archivos de ejemplo.'
    },
    {
      question: '¿Qué pasa si hay errores en mi archivo?',
      answer: 'El sistema valida cada archivo y genera un reporte de errores detallado. Las filas con errores se rechazan pero el resto se procesa normalmente.'
    },
    {
      question: '¿Puedo reenviar archivos corregidos?',
      answer: 'Sí, puedes reenviar archivos con el mismo nombre. El sistema detecta duplicados por ID de transacción y procesa solo los registros nuevos.'
    },
    {
      question: '¿Hay límite en el tamaño de archivo?',
      answer: 'El límite estándar es 50MB por archivo. Para archivos más grandes, puedes dividirlos o contactar soporte para aumentar el límite.'
    }
  ],
  'cajero-web': [
    {
      question: '¿Necesito instalar algo en mis computadores?',
      answer: 'No, Cajero Web funciona completamente en el navegador. Solo necesitas acceso a internet y un navegador moderno (Chrome, Firefox, Safari).'
    },
    {
      question: '¿Cómo capacito a mis cajeros?',
      answer: 'Proporcionamos un manual de usuario simple y videos de capacitación de 5 minutos. La interface es muy intuitiva y fácil de usar.'
    },
    {
      question: '¿Funciona en tablets y móviles?',
      answer: 'Sí, la interface está optimizada para tablets y móviles. Muchos clientes la usan en tablets en el punto de venta.'
    },
    {
      question: '¿Puedo personalizar la interface?',
      answer: 'La interface mantiene el branding de Leal para consistencia, pero podemos ajustar algunos elementos como colores secundarios.'
    },
    {
      question: '¿Qué pasa si se cae el internet?',
      answer: 'La interface guarda las transacciones localmente y las sincroniza automáticamente cuando se restaura la conexión.'
    }
  ],
  'ipaas': [
    {
      question: '¿Qué plataformas iPaaS soportan?',
      answer: 'Zapier, Make (Integromat), Microsoft Power Automate, y Workato. También podemos desarrollar conectores custom para otras plataformas.'
    },
    {
      question: '¿Hay costos adicionales por usar iPaaS?',
      answer: 'Los costos de la plataforma iPaaS son independientes. Leal no cobra extra por esta modalidad, pero debes considerar los costos de tu plataforma iPaaS.'
    },
    {
      question: '¿Puedo combinar múltiples fuentes de datos?',
      answer: 'Sí, esa es la ventaja principal. Puedes unificar datos de CRM, e-commerce, POS, y otras fuentes en un solo flujo hacia Leal.'
    },
    {
      question: '¿Qué tan rápido se procesan los datos?',
      answer: 'Depende de tu configuración iPaaS. Puede ser desde tiempo real hasta procesamiento por lotes cada hora o día.'
    },
    {
      question: '¿Necesito conocimientos técnicos?',
      answer: 'Las plataformas iPaaS están diseñadas para usuarios de negocio. Con conocimientos básicos de "workflows" puedes configurar las integraciones.'
    }
  ]
};

// Sistema de Documentación Técnica
const technicalDocs = {
  'api': {
    title: 'Documentación API REST',
    sections: [
      {
        title: 'Guía de Inicio Rápido',
        content: 'Pasos para realizar tu primera integración con la API de Leal en menos de 30 minutos.',
        link: '#quickstart-api'
      },
      {
        title: 'Referencia de Endpoints',
        content: 'Documentación completa de todos los endpoints disponibles con ejemplos de request y response.',
        link: '#endpoints-reference'
      },
      {
        title: 'Autenticación y Seguridad',
        content: 'Implementación de JWT, manejo de API keys y mejores prácticas de seguridad.',
        link: '#auth-security'
      },
      {
        title: 'SDKs y Librerías',
        content: 'SDKs oficiales para PHP, Node.js, Python, Java y .NET con ejemplos de código.',
        link: '#sdks'
      },
      {
        title: 'Webhooks',
        content: 'Configuración de webhooks para recibir eventos en tiempo real de Leal.',
        link: '#webhooks'
      },
      {
        title: 'Casos de Uso Avanzados',
        content: 'Implementaciones complejas, manejo de errores y optimizaciones de performance.',
        link: '#advanced'
      }
    ]
  },
  'agente': {
    title: 'Documentación Agente Leal',
    sections: [
      {
        title: 'Requisitos del Sistema',
        content: 'Especificaciones técnicas mínimas y compatibilidad con diferentes versiones de POS.',
        link: '#system-requirements'
      },
      {
        title: 'Proceso de Instalación',
        content: 'Guía paso a paso para instalar y configurar el agente en tu punto de venta.',
        link: '#installation'
      },
      {
        title: 'Configuración Avanzada',
        content: 'Personalización de reglas de captura, filtros de datos y configuraciones específicas.',
        link: '#advanced-config'
      },
      {
        title: 'Monitoreo y Logs',
        content: 'Cómo revisar logs del agente, diagnosticar problemas y monitorear performance.',
        link: '#monitoring'
      },
      {
        title: 'Resolución de Problemas',
        content: 'Soluciones a problemas comunes y guía de troubleshooting técnico.',
        link: '#troubleshooting'
      }
    ]
  },
  'sftp': {
    title: 'Documentación SFTP',
    sections: [
      {
        title: 'Especificación de Archivos CSV',
        content: 'Formato exacto, campos obligatorios, tipos de datos y validaciones.',
        link: '#csv-specification'
      },
      {
        title: 'Configuración del Servidor SFTP',
        content: 'Credenciales, directorios, y configuración de conexión segura.',
        link: '#sftp-setup'
      },
      {
        title: 'Automatización de Envíos',
        content: 'Scripts de ejemplo para automatizar la generación y envío de archivos.',
        link: '#automation'
      },
      {
        title: 'Validación y Reportes',
        content: 'Cómo interpretar reportes de validación y corregir errores en archivos.',
        link: '#validation'
      },
      {
        title: 'Mejores Prácticas',
        content: 'Recomendaciones para optimizar el proceso y evitar errores comunes.',
        link: '#best-practices'
      }
    ]
  },
  'cajero-web': {
    title: 'Documentación Cajero Web',
    sections: [
      {
        title: 'Manual de Usuario',
        content: 'Guía completa para cajeros con screenshots y flujos paso a paso.',
        link: '#user-manual'
      },
      {
        title: 'Configuración Inicial',
        content: 'Setup de credenciales, configuración de sucursales y parámetros iniciales.',
        link: '#initial-setup'
      },
      {
        title: 'Flujos de Operación',
        content: 'Documentación detallada de registro, acumulación, redención y consultas.',
        link: '#operation-flows'
      },
      {
        title: 'Personalización',
        content: 'Opciones de customización disponibles y proceso de solicitud.',
        link: '#customization'
      },
      {
        title: 'Capacitación del Personal',
        content: 'Materiales de capacitación, videos tutoriales y evaluaciones.',
        link: '#training'
      }
    ]
  },
  'ipaas': {
    title: 'Documentación iPaaS',
    sections: [
      {
        title: 'Conectores Disponibles',
        content: 'Lista completa de conectores pre-construidos para cada plataforma iPaaS.',
        link: '#connectors'
      },
      {
        title: 'Configuración en Zapier',
        content: 'Tutorial paso a paso para configurar integración Leal en Zapier.',
        link: '#zapier-setup'
      },
      {
        title: 'Configuración en Make',
        content: 'Guía detallada para implementar workflows en Make (Integromat).',
        link: '#make-setup'
      },
      {
        title: 'Mapeo de Datos',
        content: 'Cómo mapear campos entre tu sistema y Leal usando transformaciones.',
        link: '#data-mapping'
      },
      {
        title: 'Workflows Avanzados',
        content: 'Ejemplos de workflows complejos y casos de uso enterprise.',
        link: '#advanced-workflows'
      }
    ]
  }
};


function showTechnicalDocs(integrationId) {
  const integration = mainNavigation.find(s => s.id === 'integrations')?.subsections?.find(sub => sub.id === integrationId);
  const docs = technicalDocs[integrationId];
  
  const content = document.getElementById('mainContent');
  content.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${docs.title}</h1>
        <p style="color: var(--muted-foreground); font-size: 1.125rem;">
          Documentación técnica completa para implementar ${integration.title}
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
        ${docs.sections.map(section => `
          <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; cursor: pointer; transition: all 0.2s ease; border: 1px solid var(--border);"
               onclick="alert('Redirigiendo a: ${section.link}')">
            <h3 style="color: var(--leal-yellow); margin-bottom: 1rem; font-size: 1.2rem;">
              ${section.title}
            </h3>
            <p style="color: var(--muted-foreground); line-height: 1.6; margin-bottom: 1.5rem;">
              ${section.content}
            </p>
            <div style="color: var(--leal-yellow); font-weight: 600; font-size: 0.9rem;">
              Ver documentación →
            </div>
          </div>
        `).join('')}
      </div>

      <div style="background: var(--leal-yellow); color: var(--leal-gray); border-radius: var(--radius); padding: 2rem; text-align: center; margin: 3rem 0;">
        <h3 style="margin-bottom: 1rem;">¿Necesitas implementación personalizada?</h3>
        <p style="margin-bottom: 1.5rem; opacity: 0.9;">
          Nuestro equipo técnico puede ayudarte con implementaciones custom y optimizaciones avanzadas.
        </p>
        <button class="btn" style="background: var(--background); color: var(--leal-gray); border: none; margin-right: 1rem;" 
                onclick="contactSupport('${integrationId}')">
          Solicitar Consultoría
        </button>
        <button class="btn" style="background: var(--background); color: var(--leal-gray); border: none;" 
                onclick="showSubsection('${integrationId}')">
          Volver a ${integration.title}
        </button>
      </div>
    </div>
  `;
}

function contactSupport(integrationId) {
  const integration = mainNavigation.find(s => s.id === 'integrations')?.subsections?.find(sub => sub.id === integrationId);
  
  const content = document.getElementById('mainContent');
  content.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; text-align: center;">
      <div style="margin-bottom: 3rem;">
        <div style="width: 5rem; height: 5rem; background: var(--leal-yellow); border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: var(--leal-gray);">
          ${getIconSVG('users')}
        </div>
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Soporte Técnico</h1>
        <p style="color: var(--muted-foreground); font-size: 1.125rem;">
          Nuestro equipo especializado en ${integration.title} está listo para ayudarte
        </p>
      </div>

      <div style="background: var(--card); border-radius: var(--radius); padding: 2rem; margin-bottom: 2rem; text-align: left;">
        <h3 style="color: var(--leal-yellow); margin-bottom: 1.5rem; text-align: center;">Canales de Contacto</h3>
        
        <div style="display: grid; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 2.5rem; height: 2.5rem; background: var(--leal-yellow); border-radius: 50%; 
                        display: flex; align-items: center; justify-content: center; color: var(--leal-gray); flex-shrink: 0;">
              📧
            </div>
            <div>
              <strong>Email Técnico</strong><br>
              <span style="color: var(--muted-foreground);">integraciones@leal.co</span>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 2.5rem; height: 2.5rem; background: var(--leal-yellow); border-radius: 50%; 
                        display: flex; align-items: center; justify-content: center; color: var(--leal-gray); flex-shrink: 0;">
              💬
            </div>
            <div>
              <strong>Chat en Vivo</strong><br>
              <span style="color: var(--muted-foreground);">Lun-Vie 8AM-6PM COT</span>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 2.5rem; height: 2.5rem; background: var(--leal-yellow); border-radius: 50%; 
                        display: flex; align-items: center; justify-content: center; color: var(--leal-gray); flex-shrink: 0;">
              📞
            </div>
            <div>
              <strong>Teléfono Directo</strong><br>
              <span style="color: var(--muted-foreground);">+57 1 234 5678</span>
            </div>
          </div>
        </div>
      </div>

      <div style="background: var(--muted); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 2rem;">
        <h4 style="margin-bottom: 1rem;">Información para Acelerar el Soporte</h4>
        <ul style="color: var(--muted-foreground); text-align: left; line-height: 1.6;">
          <li>Tipo de integración: <strong>${integration.title}</strong></li>
          <li>Descripción detallada del problema</li>
          <li>Logs de error (si aplica)</li>
          <li>Ambiente (producción/pruebas)</li>
        </ul>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-primary" onclick="alert('Abriendo chat en vivo...')">
          Iniciar Chat
        </button>
        <button class="btn btn-secondary" onclick="showSubsection('${integrationId}')">
          Volver a ${integration.title}
        </button>
      </div>
    </div>
  `;
}

function showCapabilityMatrix() {
  const content = document.getElementById('mainContent');
  const integrations = mainNavigation.find(s => s.id === 'integrations').subsections;
  
  content.innerHTML = `
    <div style="margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Matriz de Capacidades</h1>
        <p style="color: var(--muted-foreground); font-size: 1.125rem;">
          Comparación completa de funcionalidades soportadas por cada modalidad
        </p>
      </div>

      <div style="overflow-x: auto; margin-bottom: 3rem;">
        <table style="width: 100%; border-collapse: collapse; background: var(--card); border-radius: var(--radius); overflow: hidden;">
          <thead>
            <tr style="background: var(--leal-gray); color: var(--background);">
              <th style="padding: 1rem; text-align: left; font-weight: 600;">Funcionalidad</th>
              ${integrations.map(integration => `
                <th style="padding: 1rem; text-align: center; font-weight: 600;">${integration.title}</th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${['registro', 'acumulacion', 'redencion', 'anulacion', 'ecommerce', 'coins', 'skus'].map(capability => `
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 1rem; font-weight: 600; color: var(--foreground);">
                  ${getCapabilityName(capability)}
                </td>
                ${integrations.map(integration => `
                  <td style="padding: 1rem; text-align: center;">
                    ${getCapabilityIcon(integration.capabilities[capability])}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="text-align: center;">
        <button class="btn btn-secondary" onclick="showSection('integrations')">
          Volver a Integraciones
        </button>
      </div>
    </div>
  `;
}

function getCapabilityName(capability) {
  const names = {
    'registro': 'Registro (web/app)',
    'acumulacion': 'Acumulación',
    'redencion': 'Redención', 
    'anulacion': 'Anulación',
    'ecommerce': 'Integración E-commerce',
    'coins': 'Redimir Coins',
    'skus': 'Captura SKUs'
  };
  return names[capability] || capability;
}

function getCapabilityIcon(capability) {
  if (capability === true) return '✅';
  if (capability === false) return '❌';
  if (capability === 'partial') return '🟡';
  if (capability === 'delayed') return '🟡';
  return '🔄';
}

// Funciones del carrusel
function startCarousel() {
  // Limpiar cualquier intervalo existente
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
  
  // Auto-rotación cada 6 segundos para efecto más lento y elegante
  carouselInterval = setInterval(nextCarouselItem, 6000);
}

function stopCarousel() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function updateCarouselContent() {
  const carouselContent = document.getElementById('carouselContent');
  const container = carouselContent?.parentElement;
  
  if (!carouselContent || !container) return;
  
  // Limpiar cualquier animación pendiente
  const existingNext = document.getElementById('nextCarouselContent');
  if (existingNext) {
    existingNext.remove();
  }
  
  // Crear el contenedor del siguiente mensaje que viene desde la derecha
  const nextContent = document.createElement('div');
  nextContent.id = 'nextCarouselContent';
  nextContent.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
  `;
  
  nextContent.innerHTML = `
    <p style="
      color: #ffffff;
      font-size: 1.125rem;
      line-height: 1.4;
      max-width: 50rem;
      margin: 0;
      font-weight: 400;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      letter-spacing: 0.3px;
      text-align: center;
      padding: 0 2rem;
    ">
      ${overviewCarouselItems[currentCarouselIndex]}
    </p>
  `;
  
  // Agregar el siguiente contenido al contenedor
  container.appendChild(nextContent);
  
  // Iniciar animación simultánea
  requestAnimationFrame(() => {
    // El contenido actual se mueve hacia la izquierda
    carouselContent.style.transform = 'translateX(-100%)';
    carouselContent.style.transition = 'transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
    
    // El nuevo contenido entra desde la derecha
    setTimeout(() => {
      nextContent.style.transform = 'translateX(0%)';
    }, 50);
    
    // Después de la animación, reorganizar el DOM
    setTimeout(() => {
      // Resetear el contenido principal con el nuevo texto
      carouselContent.innerHTML = nextContent.innerHTML;
      carouselContent.style.transform = 'translateX(0)';
      carouselContent.style.transition = 'transform 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
      
      // Remover el elemento temporal
      if (nextContent.parentElement) {
        nextContent.remove();
      }
    }, 1050);
  });
}

function nextCarouselItem() {
  currentCarouselIndex = (currentCarouselIndex + 1) % overviewCarouselItems.length;
  updateCarouselContent();
}

// Función simplificada - solo auto-rotación, sin controles manuales

// Función para mostrar detalles de tipos de datos
function showDataTypeDetail(type) {
  const details = {
    'zero-party': {
      title: 'Zero Party Data',
      subtitle: 'Datos que los usuarios comparten voluntariamente',
      description: 'Información que los clientes proporcionan de manera intencional y proactiva a una marca, incluyendo preferencias, intenciones de compra y cómo quieren ser reconocidos.',
      examples: [
        'Preferencias de productos declaradas en encuestas',
        'Intenciones de compra expresadas en formularios',
        'Datos de perfil completados voluntariamente',
        'Feedback y reseñas proporcionadas por el cliente',
        'Configuraciones de comunicación y privacidad'
      ],
      benefits: [
        'Mayor precisión en la personalización',
        'Cumplimiento total con regulaciones de privacidad',
        'Relación de confianza con el cliente',
        'Datos de alta calidad y relevancia'
      ],
      icon: 'user-check',
      color: 'var(--bg-success)'
    },
    'first-party': {
      title: 'First Party Data',
      subtitle: 'Datos recopilados directamente por tu empresa',
      description: 'Información que recopilas directamente de tus clientes a través de interacciones en tus propios canales digitales y físicos.',
      examples: [
        'Historial de transacciones y compras',
        'Comportamiento de navegación en tu sitio web',
        'Interacciones con emails y campañas',
        'Datos de aplicaciones móviles propias',
        'Información de programas de lealtad'
      ],
      benefits: [
        'Control total sobre la calidad de los datos',
        'Costos de adquisición más bajos',
        'Mejor comprensión del customer journey',
        'Cumplimiento con regulaciones de privacidad'
      ],
      icon: 'shopping-cart',
      color: 'var(--bg-primary)'
    },
    'second-party': {
      title: 'Second Party Data',
      subtitle: 'Datos compartidos por socios estratégicos',
      description: 'Información de first-party de otra organización que se comparte a través de una asociación directa y confiable.',
      examples: [
        'Datos de partners comerciales',
        'Información de proveedores de servicios',
        'Datos de alianzas estratégicas',
        'Información de canales de distribución',
        'Datos de ecosistemas de productos complementarios'
      ],
      benefits: [
        'Ampliación del alcance de audiencia',
        'Enriquecimiento de perfiles de clientes',
        'Nuevas oportunidades de segmentación',
        'Mejor comprensión del mercado'
      ],
      icon: 'globe',
      color: 'var(--bg-info)'
    },
    'leal-engine': {
      title: 'Motor Leal 360',
      subtitle: 'Plataforma de procesamiento inteligente',
      description: 'Nuestro motor de IA procesa y unifica todos los tipos de datos para crear perfiles completos de clientes y generar insights accionables.',
      examples: [
        'Unificación de identidades de clientes',
        'Segmentación automática basada en IA',
        'Predicción de comportamiento de compra',
        'Personalización en tiempo real',
        'Análisis de lifetime value'
      ],
      benefits: [
        'Procesamiento en tiempo real',
        'Algoritmos de machine learning avanzados',
        'Escalabilidad automática',
        'Integración con múltiples fuentes de datos'
      ],
      icon: 'cpu',
      color: 'var(--bg-accent)'
    },
    'revenue-output': {
      title: 'Ingresos Incrementales',
      subtitle: 'Resultados medibles y tangibles',
      description: 'Los insights generados se traducen en acciones concretas que impulsan el crecimiento de ingresos de manera medible y sostenible.',
      examples: [
        'Aumento en tasa de conversión',
        'Incremento en valor promedio de pedido',
        'Mejora en retención de clientes',
        'Optimización de campañas de marketing',
        'Reducción de costos de adquisición'
      ],
      benefits: [
        'ROI medible y transparente',
        'Crecimiento sostenible de ingresos',
        'Optimización continua de estrategias',
        'Mejor experiencia del cliente'
      ],
      icon: 'trending-up',
      color: 'var(--bg-warning)'
    }
  };

  const detail = details[type];
  if (!detail) return;

  // Crear modal con los detalles
  const modal = document.createElement('div');
  modal.className = 'data-detail-modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeDataDetailModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-icon" style="background: color-mix(in srgb, ${detail.color} 12%, var(--card) 88%); color: ${detail.color};">
          ${getIconSVG(detail.icon)}
        </div>
        <div class="modal-title-section">
          <h2 class="modal-title">${detail.title}</h2>
          <p class="modal-subtitle">${detail.subtitle}</p>
        </div>
        <button class="modal-close" onclick="closeDataDetailModal()">
          ${getIconSVG('x')}
        </button>
      </div>
      
      <div class="modal-body">
        <div class="modal-description">
          <p>${detail.description}</p>
        </div>
        
        <div class="modal-section">
          <h3 class="section-title">Ejemplos</h3>
          <ul class="examples-list">
            ${detail.examples.map(example => `<li>${example}</li>`).join('')}
          </ul>
        </div>
        
        <div class="modal-section">
          <h3 class="section-title">Beneficios</h3>
          <ul class="benefits-list">
            ${detail.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Animar la aparición
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
}

function closeDataDetailModal() {
  const modal = document.querySelector('.data-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Función para mostrar detalles de capacidades
function showCapabilityDetail(capabilityId) {
  const capabilities = {
    'perfil-360': {
      title: 'Perfil 360° del Cliente',
      subtitle: 'Vista unificada del cliente',
      description: 'Consolida datos de múltiples fuentes para crear un perfil completo de cada cliente.',
      whatLealDoes: [
        'Unifica datos de diferentes touchpoints',
        'Elimina duplicados automáticamente',
        'Actualiza información en tiempo real',
        '🚧 Funcionalidades adicionales en desarrollo'
      ],
      benefits: [
        'Vista completa del customer journey',
        'Mejor toma de decisiones',
        'Personalización más efectiva',
        '🚧 Beneficios adicionales por definir'
      ],
      metrics: [
        { label: 'Estado', value: 'En desarrollo' },
        { label: 'Disponibilidad', value: 'Q1 2024' },
        { label: 'Cobertura', value: 'Por definir' }
      ],
      icon: 'users',
      color: 'var(--bg-success)'
    },
    'segmentacion': {
      title: 'Segmentación Inteligente',
      subtitle: 'Agrupación automática de clientes',
      description: 'Crea segmentos dinámicos basados en comportamiento y características del cliente.',
      whatLealDoes: [
        'Analiza patrones de comportamiento',
        'Crea segmentos automáticamente',
        'Actualiza grupos dinámicamente',
        '🚧 Algoritmos avanzados en desarrollo'
      ],
      benefits: [
        'Campañas más relevantes',
        'Mayor ROI en marketing',
        'Identificación de oportunidades',
        '🚧 Beneficios adicionales por definir'
      ],
      metrics: [
        { label: 'Estado', value: 'En desarrollo' },
        { label: 'Disponibilidad', value: 'Q2 2024' },
        { label: 'Precisión', value: 'Por definir' }
      ],
      icon: 'target',
      color: 'var(--bg-info)'
    },
    'triggers-rt': {
      title: 'Triggers en Tiempo Real',
      subtitle: 'Activación automática de campañas',
      description: 'Sistema que detecta eventos específicos y activa campañas personalizadas automáticamente.',
      whatLealDoes: [
        'Monitorea eventos en tiempo real',
        'Evalúa reglas de negocio',
        'Activa campañas automáticamente',
        '🚧 Funcionalidades avanzadas en desarrollo'
      ],
      benefits: [
        'Comunicación oportuna',
        'Mayor engagement',
        'Automatización completa',
        '🚧 Beneficios adicionales por definir'
      ],
      metrics: [
        { label: 'Estado', value: 'En desarrollo' },
        { label: 'Disponibilidad', value: 'Q2 2024' },
        { label: 'Latencia', value: 'Por definir' }
      ],
      icon: 'zap',
      color: 'var(--bg-warning)'
    },
    'personalizacion': {
      title: 'Personalización Avanzada',
      subtitle: 'Experiencias únicas para cada cliente',
      description: 'Adapta contenido y ofertas en tiempo real basándose en el perfil del cliente.',
      whatLealDoes: [
        'Analiza preferencias del cliente',
        'Adapta contenido dinámicamente',
        'Optimiza ofertas personalizadas',
        '🚧 Motor de personalización en desarrollo'
      ],
      benefits: [
        'Experiencias más relevantes',
        'Mayor conversión',
        'Diferenciación competitiva',
        '🚧 Beneficios adicionales por definir'
      ],
      metrics: [
        { label: 'Estado', value: 'En desarrollo' },
        { label: 'Disponibilidad', value: 'Q3 2024' },
        { label: 'Mejora esperada', value: 'Por definir' }
      ],
      icon: 'message-circle',
      color: 'var(--bg-accent)'
    },
    'medicion-roi': {
      title: 'Medición de ROI',
      subtitle: 'Análisis del retorno de inversión',
      description: 'Dashboard que mide y analiza el ROI de las iniciativas de fidelización.',
      whatLealDoes: [
        'Rastrea interacciones y conversiones',
        'Calcula ROI por canal y campaña',
        'Genera reportes automáticos',
        '🚧 Analytics avanzados en desarrollo'
      ],
      benefits: [
        'Visibilidad del performance',
        'Optimización basada en datos',
        'Justificación de inversiones',
        '🚧 Beneficios adicionales por definir'
      ],
      metrics: [
        { label: 'Estado', value: 'En desarrollo' },
        { label: 'Disponibilidad', value: 'Q3 2024' },
        { label: 'KPIs', value: 'Por definir' }
      ],
      icon: 'bar-chart',
      color: 'var(--bg-primary)'
    }
  };

  const capability = capabilities[capabilityId];
  if (!capability) return;

  // Crear modal con los detalles
  const modal = document.createElement('div');
  modal.className = 'capability-detail-modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeCapabilityDetailModal()"></div>
    <div class="modal-content-capability">
      <div class="modal-header-capability">
        <div class="modal-icon-capability" style="background: color-mix(in srgb, ${capability.color} 12%, var(--card) 88%); color: ${capability.color};">
          ${getIconSVG(capability.icon)}
        </div>
        <div class="modal-title-section-capability">
          <h2 class="modal-title-capability">${capability.title}</h2>
          <p class="modal-subtitle-capability">${capability.subtitle}</p>
        </div>
        <button class="modal-close-capability" onclick="closeCapabilityDetailModal()">
          ${getIconSVG('x')}
        </button>
      </div>
      
      <div class="modal-body-capability">
        <div class="capability-description-section">
          <p class="capability-main-description">${capability.description}</p>
        </div>
        
        <div class="capability-section">
          <h3 class="capability-section-title">¿Qué hace Leal 360?</h3>
          <ul class="capability-features-list">
            ${capability.whatLealDoes.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="capability-section">
          <h3 class="capability-section-title">Beneficios Clave</h3>
          <ul class="capability-benefits-list">
            ${capability.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
        
        <div class="capability-section">
          <h3 class="capability-section-title">Métricas de Rendimiento</h3>
          <div class="capability-metrics-grid">
            ${capability.metrics.map(metric => `
              <div class="capability-metric-item">
                <span class="metric-item-value">${metric.value}</span>
                <span class="metric-item-label">${metric.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Animar la aparición
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
}

function closeCapabilityDetailModal() {
  const modal = document.querySelector('.capability-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Actualizar las funciones globales
window.showFAQ = showFAQ;
window.showTechnicalDocs = showTechnicalDocs;
window.contactSupport = contactSupport;
window.showCapabilityMatrix = showCapabilityMatrix;
window.showDataTypeDetail = showDataTypeDetail;
window.closeDataDetailModal = closeDataDetailModal;
window.showCapabilityDetail = showCapabilityDetail;
window.closeCapabilityDetailModal = closeCapabilityDetailModal;