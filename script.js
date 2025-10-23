// Leal 360 - Script Principal Optimizado
let currentSection = 'overview';

const mainNavigation = [
  { id: 'overview', title: 'Overview', icon: 'briefcase' },
  { id: 'integrations', title: 'Integraciones', icon: 'layers' },
  { id: 'recommender', title: 'Recomendador', icon: 'help-circle' }
];

// Datos de tipos de integración
const INTEGRATION_TYPES = {
  'api': {
        id: 'api',
    name: 'API REST',
    icon: '📡',
    status: 'available',
    description: 'Documentación completa de endpoints',
    action: 'showApiDocumentation'
  },
  'cajero-web': {
    id: 'cajero-web',
    name: 'Cajero Web',
    icon: '🖥️',
    status: 'coming-soon',
    description: 'Integración sin código para puntos de venta'
  },
  'sftp': {
        id: 'sftp',
    name: 'SFTP',
    icon: '📁',
    status: 'coming-soon',
    description: 'Transferencia segura de archivos'
  },
  'marketplace': {
    id: 'marketplace',
    name: 'Marketplace',
    icon: '🏪',
    status: 'coming-soon',
    description: 'Integraciones con ERPs y CRMs populares'
  },
  'mcp': {
    id: 'mcp',
    name: 'MCP - Model Context Protocol',
    icon: '🤖',
    status: 'coming-soon',
    description: 'Integración IA con Leal Ecosystem',
    highlight: true
  }
};

function initializeApp() {
  showSection('overview');
}

function showSection(sectionId) {
  currentSection = sectionId;
  
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  if (sectionId === 'overview') {
    renderOverview();
  } else if (sectionId === 'integrations') {
    renderIntegrationsLanding();
  } else if (sectionId === 'recommender') {
    renderRecommender();
  }
}

function renderOverview() {
  const content = document.getElementById('mainContent');
  if (!content) return;
  
  content.innerHTML = `
    <div class="overview-container">
      <section class="hero-section">
        <div class="hero-background"></div>
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="highlight">Centraliza</span> toda la data transaccional de tus usuarios en una sola plataforma,<br>
            acciónala y conviértela en <span class="highlight">ingresos incrementales</span> con Leal 360
          </h1>
          
          <div class="agent-section">
            <h2 class="agent-title">¿Tienes dudas sobre integraciones?</h2>
            <p class="agent-subtitle">Pregúntale a nuestro agente inteligente sobre cualquier tema relacionado con las integraciones de Leal 360</p>
            
            <div class="agent-input-container">
              <input type="text" id="agentInput" class="agent-input" placeholder="Escribe tu pregunta sobre integraciones..." onkeypress="handleAgentInput(event)" />
              <button class="agent-send-btn" onclick="sendAgentMessage()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                </svg>
                </button>
              </div>
          </div>
        </div>
      </section>

      <section class="process-cards">
        <div class="cards-container">
          <div class="process-card">
            <div class="card-number">1</div>
            <h3 class="card-title">Conecta</h3>
            <p class="card-description">Integra tus sistemas con Leal 360 mediante API, Agente, SFTP o Cajero Web</p>
        </div>
        
          <div class="process-card">
            <div class="card-number">2</div>
            <h3 class="card-title">Centraliza</h3>
            <p class="card-description">Unifica toda la data transaccional en una sola plataforma</p>
            </div>
            
          <div class="process-card">
            <div class="card-number">3</div>
            <h3 class="card-title">Acciona</h3>
            <p class="card-description">Convierte la data en acciones que generen ingresos incrementales</p>
              </div>
            </div>
      </section>

      <section class="leal-section">
        <div class="leal-container">
          <div class="leal-text">
            <h2 class="leal-title">Leal 360</h2>
            <p class="leal-description">Una plataforma integral con 4 módulos para gestionar a tus clientes</p>
              </div>
          <div class="leal-image">
            <img src="Assets Leal 360/General - Group 1171276518 copia.png" alt="Leal 360 Platform" />
            </div>
          </div>
      </section>

      <section class="benefits-section">
        <div class="benefits-container">
          <div class="benefits-image">
            <div class="integration-diagram">
              <div class="diagram-content">
                <h3 class="diagram-title">Zero/First/Second Party Data</h3>
                <p class="diagram-subtitle">Prioridad: Zero > First > Second</p>
          </div>
            </div>
          </div>
          <div class="benefits-text">
            <h2 class="benefits-title">Beneficios de la Integración</h2>
            <p class="benefits-description">Incrementa tu ticket promedio y tu frecuencia de compra</p>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="cta-container">
          <h2 class="cta-title">¿Listo para comenzar?</h2>
          <p class="cta-description">Contacta a nuestro equipo para una consulta personalizada</p>
          <button class="cta-button">Contactar Ahora</button>
        </div>
      </section>
              </div>
  `;
}

function renderIntegrationsLanding() {
  const content = document.getElementById('mainContent');
  if (!content) return;
  
  content.innerHTML = `
    <div class="integrations-landing">
      <!-- Hero Section -->
      <section class="integrations-hero">
        <div class="hero-content">
          <h1 class="hero-title">
            Captura la data transaccional de tus usuarios
          </h1>
          <p class="hero-subtitle">
            Elige la herramienta de integración que mejor se adapte a tu 
            infraestructura tecnológica para convertir data en ingresos incrementales
          </p>
        </div>
      </section>
      
      <!-- Flujo del Ecosistema -->
      <section class="ecosystem-flow">
        <h2>¿Cómo funciona el ecosistema Leal 360?</h2>
        
        <div class="flow-diagram">
          <!-- Paso 1: Data Transaccional -->
          <div class="flow-step">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3>Data Transaccional</h3>
            <p>Compras, usuarios, productos</p>
            <ul class="step-sources">
              <li>Apps móviles</li>
              <li>Páginas web</li>
              <li>Puntos de venta</li>
              <li>E-commerce</li>
            </ul>
          </div>
          
          <div class="flow-arrow">→</div>
          
          <!-- Paso 2: Integración -->
          <div class="flow-step highlight">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
              </svg>
            </div>
            <h3>Integración</h3>
            <p>Captura de datos</p>
            <ul class="step-methods">
              <li>API REST</li>
              <li>Agent</li>
              <li>SFTP</li>
              <li>Cajero Web</li>
            </ul>
          </div>
          
          <div class="flow-arrow">→</div>
          
          <!-- Paso 3: Servicios Leal -->
          <div class="flow-step">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                <polyline points="21 12 16.5 14.6 16.5 19.79"/>
              </svg>
            </div>
            <h3>Servicios Leal 360</h3>
            <p>Gestión y activación</p>
            <ul class="step-services">
              <li>Registro de usuarios</li>
              <li>Acumulación de puntos</li>
              <li>Canje de recompensas</li>
              <li>Gestión de promociones</li>
            </ul>
          </div>
          
          <div class="flow-arrow">→</div>
          
          <!-- Paso 4: Ecosistema -->
          <div class="flow-step">
            <div class="step-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                <circle cx="18" cy="6" r="2"/>
              </svg>
            </div>
            <h3>Ingresos Incrementales</h3>
            <p>Resultados del negocio</p>
            <ul class="step-results">
              <li>Mayor frecuencia de compra</li>
              <li>Ticket promedio más alto</li>
              <li>Retención de clientes</li>
              <li>Insights accionables</li>
            </ul>
          </div>
        </div>
        
        <div class="flow-callout">
          <p>
            <strong>La integración es el puente</strong> que conecta tu data 
            transaccional con el ecosistema Leal 360 para convertirla en 
            ingresos incrementales
          </p>
        </div>
      </section>
      
      <!-- Tabla Comparativa -->
      <section class="comparison-section">
        <h2>¿Qué tipo de integración necesitas?</h2>
        <p class="section-subtitle">
          Depende de tu POS y stack tecnológico. Compara las opciones:
        </p>
        
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="criteria-column">Criterio</th>
                <th class="integration-column api">API REST</th>
                <th class="integration-column agent">Agent</th>
                <th class="integration-column sftp">SFTP</th>
                <th class="integration-column cashier">Cajero Web</th>
              </tr>
            </thead>
            <tbody>
              <!-- Quién conecta -->
              <tr>
                <td class="criteria-cell">
                  <strong>¿Quién conecta?</strong>
                </td>
                <td>Comercio/Leal</td>
                <td>Leal</td>
                <td>Comercio/Leal</td>
                <td>Leal</td>
              </tr>
              
              <!-- Qué necesitamos -->
              <tr>
                <td class="criteria-cell">
                  <strong>¿Qué necesitamos?</strong>
                </td>
                <td>Comercio consume Leal</td>
                <td>Instalación con conexiones locales</td>
                <td>Archivo CSV</td>
                <td>Compartir URL y credenciales</td>
              </tr>
              
              <!-- Esfuerzo técnico -->
              <tr>
                <td class="criteria-cell">
                  <strong>Esfuerzo técnico</strong>
                </td>
                <td><span class="effort-badge high">Alto para el cliente</span></td>
                <td><span class="effort-badge low">Bajo</span></td>
                <td><span class="effort-badge medium">Medio</span></td>
                <td><span class="effort-badge none">-</span></td>
              </tr>
              
              <!-- Cuándo recomendado -->
              <tr>
                <td class="criteria-cell">
                  <strong>¿Cuándo se recomienda?</strong>
                </td>
                <td>
                  Tiene capacidades de desarrollo<br>
                  POS propio
                </td>
                <td>Solo si está en lista de POS</td>
                <td>
                  Sin capacidades técnicas o<br>
                  si es difícil para ellos
                </td>
                <td>
                  Sin capacidades técnicas,<br>
                  pocos POS, o busca<br>
                  plug-and-play sin importar POS
                </td>
              </tr>
              
              <!-- Funcionalidades -->
              <tr class="section-header">
                <td colspan="5"><strong>Funcionalidades Disponibles</strong></td>
              </tr>
              
              <tr>
                <td class="criteria-cell">Registro (web/app - tiempo real)</td>
                <td><span class="check">✓</span></td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span> (cashier, Landing, APP)</td>
                <td><span class="check">✓</span></td>
              </tr>
              
              <tr>
                <td class="criteria-cell">Acumulación</td>
                <td><span class="check">✓</span></td>
                <td><span class="check">✓</span></td>
                <td><span class="check">✓</span> (No tiempo real)</td>
                <td><span class="check">✓</span></td>
              </tr>
              
              <tr>
                <td class="criteria-cell">Redención</td>
                <td><span class="check">✓</span></td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span> (Cashier)</td>
                <td><span class="check">✓</span></td>
              </tr>
              
              <tr>
                <td class="criteria-cell">Cancelación</td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span> (Customer Service Leal)</td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span> (Customer Service Leal)</td>
              </tr>
              
              <tr>
                <td class="criteria-cell">Integración E-commerce</td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span></td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span></td>
              </tr>
              
              <tr>
                <td class="criteria-cell">Canje de monedas</td>
                <td><span class="check">✓</span></td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span></td>
                <td><span class="check">✓</span></td>
              </tr>
              
              <tr>
                <td class="criteria-cell">Registro de SKUs</td>
                <td><span class="check">✓</span></td>
                <td><span class="partial">◐</span> (algunos)</td>
                <td><span class="check">✓</span></td>
                <td><span class="cross">✗</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="comparison-cta">
          <p>¿Aún no sabes cuál elegir?</p>
          <button class="cta-button" onclick="showDecisionWizard()">
            Te ayudamos a decidir
          </button>
        </div>
      </section>
      
      <!-- Cards de Integración Simplificadas -->
      <section class="integration-cards-section">
        <h2>Explora cada tipo de integración</h2>
        
        <div class="integration-cards-grid">
          ${Object.values(INTEGRATION_TYPES).filter(integration => integration.id !== 'mcp').map(integration => `
            <div class="integration-card-simple ${integration.status}" onclick="${integration.status === 'available' ? 'showApiDocumentation()' : `showComingSoon('${integration.id}')`}">
              <div class="card-icon-simple">
                ${getIntegrationIcon(integration.id)}
              </div>
              <h3>${integration.name}</h3>
              <p>${integration.description}</p>
              <button class="card-action-simple ${integration.status === 'available' ? 'primary' : 'secondary'}">
                ${integration.status === 'available' ? 'Ver documentación' : 'Notifícame'}
              </button>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function showApiDocumentation() {
  const content = document.getElementById('mainContent');
  if (!content) return;
  
  // Layout principal: sidebar + contenido
  content.innerHTML = `
    <div class="integrations-container">
      <div class="breadcrumbs-wrapper">
        <nav class="breadcrumbs">
          <a href="#" onclick="renderIntegrationsLanding()" class="breadcrumb-item">
            <svg class="breadcrumb-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Integraciones
          </a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item active">API REST</span>
        </nav>
        
        <button class="back-button" onclick="renderIntegrationsLanding()">
          <svg class="back-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver a integraciones
          </button>
            </div>
      <aside id="apiSidebar" class="api-sidebar"></aside>
      <main id="apiContent" class="api-content">
        <!-- Vista inicial con grid de todos los endpoints -->
      </main>
            </div>
  `;
  
  // Renderizar sidebar
  renderApiSidebar();
  
  // Renderizar vista inicial (grid de endpoints)
  renderApiGrid();
}

function showComingSoon(type) {
  const integration = INTEGRATION_TYPES[type];
  if (!integration) return;
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-container">
      <button class="modal-close" onclick="closeComingSoonModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      
      <div class="modal-header">
        <div class="modal-icon-wrapper">
          ${getIntegrationIcon(type)}
        </div>
        <h2 class="modal-title">${integration.name}</h2>
        <p class="modal-subtitle">Próximamente disponible</p>
        </div>
      
      <div class="modal-body">
        <p class="modal-description">
          ${integration.description}. Te notificaremos cuando esté disponible.
        </p>
        
        <form class="notify-form" onsubmit="handleNotifyRequest('${type}'); return false;">
          <div class="form-group">
            <label for="notifyEmail">Email</label>
            <input 
              type="email" 
              id="notifyEmail" 
              placeholder="tu@empresa.com"
              required
            />
          </div>
          
          <button type="submit" class="submit-button">
            Notificarme cuando esté disponible
        </button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeComingSoonModal() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
}

function handleNotifyRequest(type) {
  const email = document.getElementById('notifyEmail').value;
  if (!email) {
    alert('Por favor ingresa tu email');
    return;
  }
  
  // Aquí se podría enviar a un endpoint real
  alert(`Te notificaremos cuando ${INTEGRATION_TYPES[type].name} esté disponible. Email: ${email}`);
  closeComingSoonModal();
}

// Función para obtener iconos SVG profesionales
function getIntegrationIcon(type) {
  const icons = {
    'api': `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>`,
    'cajero-web': `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>`,
    'sftp': `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
      <path d="M13 2v7h7"/>
    </svg>`,
    'marketplace': `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
    </svg>`,
    'mcp': `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
      <polyline points="7.5 19.79 7.5 14.6 3 12"/>
      <polyline points="21 12 16.5 14.6 16.5 19.79"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>`
  };
  return icons[type] || '';
}

// Función para obtener características de cada integración
function getIntegrationFeatures(type) {
  const features = {
    'api': `<ul class="card-features">
      <li>18 endpoints documentados</li>
      <li>Autenticación JWT</li>
      <li>Webhooks en tiempo real</li>
    </ul>`,
    'cajero-web': `<ul class="card-features">
      <li>Sin código requerido</li>
      <li>Configuración visual</li>
      <li>Soporte 24/7</li>
    </ul>`,
    'sftp': `<ul class="card-features">
      <li>Transferencia segura</li>
      <li>Archivos batch</li>
      <li>Automatización completa</li>
    </ul>`,
    'marketplace': `<ul class="card-features">
      <li>Integraciones pre-construidas</li>
      <li>1-click deployment</li>
      <li>ERP y CRM populares</li>
    </ul>`,
    'mcp': `<ul class="card-features">
      <li>Protocolo estandarizado</li>
      <li>IA contextual</li>
      <li>Escalable cross-ecosystem</li>
    </ul>`
  };
  return features[type] || '';
}

// Wizard de decisión para ayudar a elegir integración
function showDecisionWizard() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-container decision-wizard">
      <button class="modal-close" onclick="closeDecisionWizard()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      
      <div class="wizard-header">
        <h2>Te ayudamos a elegir la mejor integración</h2>
        <p>Responde estas preguntas para encontrar la opción ideal</p>
      </div>
      
      <div class="wizard-content">
        <div class="wizard-step active" id="step1">
          <h3>¿Qué tipo de negocio tienes?</h3>
          <div class="wizard-options">
            <button class="wizard-option" onclick="nextWizardStep('retail')">
              <div class="option-icon">🏪</div>
              <div class="option-text">
                <strong>Tienda física</strong>
                <span>Restaurante, retail, farmacia</span>
              </div>
            </button>
            <button class="wizard-option" onclick="nextWizardStep('online')">
              <div class="option-icon">🌐</div>
              <div class="option-text">
                <strong>E-commerce</strong>
                <span>Tienda online, marketplace</span>
              </div>
            </button>
            <button class="wizard-option" onclick="nextWizardStep('enterprise')">
              <div class="option-icon">🏢</div>
              <div class="option-text">
                <strong>Empresa grande</strong>
                <span>Múltiples ubicaciones, ERP</span>
              </div>
            </button>
            <button class="wizard-option" onclick="nextWizardStep('developer')">
              <div class="option-icon">💻</div>
              <div class="option-text">
                <strong>Soy desarrollador</strong>
                <span>Quiero control total</span>
              </div>
            </button>
          </div>
        </div>
        
        <div class="wizard-step" id="step2" style="display: none;">
          <h3>¿Tienes equipo técnico?</h3>
          <div class="wizard-options">
            <button class="wizard-option" onclick="nextWizardStep('yes')">
              <div class="option-icon">✅</div>
              <div class="option-text">
                <strong>Sí, tengo equipo técnico</strong>
                <span>Desarrolladores o IT</span>
              </div>
            </button>
            <button class="wizard-option" onclick="nextWizardStep('no')">
              <div class="option-icon">❌</div>
              <div class="option-text">
                <strong>No, sin equipo técnico</strong>
                <span>Busco solución simple</span>
              </div>
            </button>
          </div>
        </div>
        
        <div class="wizard-result" id="wizardResult" style="display: none;">
          <div class="result-content">
            <h3>Recomendación: <span id="recommendedIntegration"></span></h3>
            <p id="recommendationReason"></p>
            <button class="cta-button" onclick="closeDecisionWizard()">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeDecisionWizard() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) modal.remove();
}

function nextWizardStep(choice) {
  // Lógica simple de decisión
  let recommendation = '';
  let reason = '';
  
  if (choice === 'developer') {
    recommendation = 'API REST';
    reason = 'Perfecto para desarrolladores que quieren control total y flexibilidad máxima.';
  } else if (choice === 'retail') {
    recommendation = 'Cajero Web';
    reason = 'Ideal para tiendas físicas sin equipo técnico. Plug & play simple.';
  } else if (choice === 'online') {
    recommendation = 'SFTP';
    reason = 'Excelente para e-commerce. Transferencia segura de archivos batch.';
  } else if (choice === 'enterprise') {
    recommendation = 'API REST';
    reason = 'Para empresas grandes con equipo técnico y necesidades complejas.';
  } else if (choice === 'yes') {
    recommendation = 'API REST';
    reason = 'Con equipo técnico, API REST te da la máxima flexibilidad.';
  } else if (choice === 'no') {
    recommendation = 'Cajero Web';
    reason = 'Sin equipo técnico, Cajero Web es la opción más simple.';
  }
  
  // Mostrar resultado
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'none';
  document.getElementById('wizardResult').style.display = 'block';
  document.getElementById('recommendedIntegration').textContent = recommendation;
  document.getElementById('recommendationReason').textContent = reason;
}

function renderIntegrationsMain() {
  // Esta función ahora se llama showApiDocumentation()
  showApiDocumentation();
}

function renderRecommender() {
  const content = document.getElementById('mainContent');
  if (!content) return;
  
  content.innerHTML = `
    <div class="recommender-container">
      <h1>Recomendador</h1>
      <p>Sección de recomendador en desarrollo...</p>
        </div>
  `;
}

// Chat Flotante
function createFloatingChat() {
  const existingChat = document.getElementById('floatingChat');
  if (existingChat) return;
  
  const floatingChat = document.createElement('div');
  floatingChat.id = 'floatingChat';
  floatingChat.className = 'floating-chat';
  floatingChat.innerHTML = `
    <div class="chat-header">
      <div class="header-content">
        <img src="leal-logo-dark.png" alt="Leal 360" class="header-logo" />
        <h3>Agente de Integraciones Leal 360</h3>
        </div>
      <button class="close-chat" onclick="closeFloatingChat()">×</button>
              </div>
    <div class="chat-messages" id="chatMessages">
      <div class="agent-message">
        <div class="message-avatar">🤖</div>
        <div class="message-content">
          <p>¡Hola! Soy tu asistente de integraciones Leal 360.</p>
          <p>¿En qué te puedo ayudar hoy?</p>
          <div class="quick-actions">
            <button class="action-btn" data-topic="modalidades">🔌 Modalidades</button>
            <button class="action-btn" data-topic="compatibilidad">⚙️ Compatibilidad</button>
            <button class="action-btn" data-topic="proceso">📋 Proceso</button>
            <button class="action-btn" data-topic="roi">💰 ROI</button>
            </div>
          </div>
          </div>
              </div>
  `;
  
  document.body.appendChild(floatingChat);
  
  setTimeout(() => floatingChat.classList.add('show'), 10);
    
    setTimeout(() => {
    const actionBtns = floatingChat.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topic = btn.getAttribute('data-topic');
        handleQuickAction(topic);
      });
    });
  }, 100);
}

function closeFloatingChat() {
  const floatingChat = document.getElementById('floatingChat');
  if (floatingChat) {
    floatingChat.classList.remove('show');
    setTimeout(() => floatingChat.remove(), 300);
  }
}

function handleQuickAction(topic) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <p>${getTopicText(topic)}</p>
          </div>
  `;
  chatMessages.appendChild(userMessage);
  
  showTypingIndicator();
  
  setTimeout(() => {
    removeTypingIndicator();
    const agentResponse = document.createElement('div');
    agentResponse.className = 'agent-message';
    agentResponse.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <p>${getAgentResponse(getTopicText(topic))}</p>
    </div>
  `;
    chatMessages.appendChild(agentResponse);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1500);
}

function getTopicText(topic) {
  const topics = {
    'modalidades': 'Modalidades de integración',
    'compatibilidad': 'Compatibilidad técnica',
    'proceso': 'Proceso de implementación',
    'roi': 'ROI y beneficios'
  };
  return topics[topic] || topic;
}

function showTypingIndicator() {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.id = 'typingIndicator';
  indicator.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  chatMessages.appendChild(indicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.remove();
}

function sendAgentMessage() {
  const input = document.getElementById('agentInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  let chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) {
    createFloatingChat();
    chatMessages = document.getElementById('chatMessages');
  }
  
  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(userMessage);
  
  input.value = '';
  showTypingIndicator();
  
  setTimeout(() => {
    removeTypingIndicator();
    const agentResponse = document.createElement('div');
    agentResponse.className = 'agent-message';
    agentResponse.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <p>${getAgentResponse(message)}</p>
    </div>
  `;
    chatMessages.appendChild(agentResponse);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1500);
}

function handleAgentInput(event) {
  if (event.key === 'Enter') {
    sendAgentMessage();
  }
}

function getAgentResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('modalidad') || lowerMessage.includes('api') || lowerMessage.includes('sftp')) {
    return 'Leal 360 ofrece 4 modalidades de integración: API REST, Agente de integración, SFTP y Cajero Web. Cada modalidad se adapta a diferentes necesidades técnicas y de infraestructura.';
  }
  
  if (lowerMessage.includes('compatibilidad') || lowerMessage.includes('tecnología') || lowerMessage.includes('sistema')) {
    return 'Nuestras integraciones son compatibles con la mayoría de sistemas de retail: ERPs, CRMs, sistemas de punto de venta, e-commerce y más. Te ayudo a evaluar la compatibilidad con tu stack tecnológico.';
  }
  
  if (lowerMessage.includes('proceso') || lowerMessage.includes('implementación') || lowerMessage.includes('tiempo')) {
    return 'El proceso de implementación típico incluye: 1) Evaluación técnica, 2) Configuración del entorno, 3) Desarrollo de la integración, 4) Pruebas y 5) Go-live. El tiempo promedio es de 2-4 semanas.';
  }
  
  if (lowerMessage.includes('roi') || lowerMessage.includes('beneficio') || lowerMessage.includes('retorno')) {
    return 'Los clientes de Leal 360 reportan un ROI promedio del 300% en el primer año, con incrementos del 25% en ticket promedio y 40% en frecuencia de compra.';
  }
  
  return 'Gracias por tu pregunta. Nuestro equipo de integraciones puede ayudarte con detalles específicos sobre tu caso. ¿Te gustaría que te conecte con un especialista?';
}

// Inicialización
document.addEventListener('DOMContentLoaded', initializeApp);
