// Nueva estructura principal - Aplicación de Integraciones Leal
// Última actualización: 2025-10-07 15:57:00
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
  console.log('renderOverview() ejecutándose...');
  const content = document.getElementById('mainContent');
  
  if (!content) {
    console.error('No se encontró el elemento mainContent');
    return;
  }
  
  content.innerHTML = `
    <div class="overview-unified">
      <!-- Sección 1: Copy principal con imagen de fondo -->
      <section class="hero-section-bg">
        <div class="hero-bg-image"></div>
        <div class="hero-content">
          <h1 class="hero-main-title">
            <span class="highlight-yellow">Centraliza</span> toda la data transaccional de tus usuarios en una sola plataforma, acciónala y conviértela en <span class="highlight-yellow">ingresos incrementales</span> con Leal 360
          </h1>
        </div>
      </section>

      <!-- Sección 2: Agente de integraciones con imagen de fondo -->
      <section class="agent-section-bg">
        <div class="agent-bg-image"></div>
        <div class="agent-content">
          <h2 class="agent-title">¿Tienes dudas sobre integraciones?</h2>
          <p class="agent-subtitle">Pregúntale a nuestro agente inteligente sobre cualquier tema relacionado con las integraciones de Leal 360</p>
          
          <div class="agent-input-wrapper">
            <input type="text" id="agentInput" class="agent-input" placeholder="Escribe tu pregunta sobre integraciones..." />
            <button class="agent-send-btn" onclick="sendAgentMessage()">
              ${getIconSVG('send')}
            </button>
          </div>
          
          <div class="agent-chat" id="agentChatWindow">
            <div class="chat-messages" id="chatMessages">
              <div class="agent-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                  <p>¡Hola! Soy tu asistente de integraciones. Puedo ayudarte con:</p>
                  <ul>
                    <li>Modalidades de integración (API, Agente, SFTP, Cajero Web)</li>
                    <li>Compatibilidad con tu stack tecnológico</li>
                    <li>Proceso de implementación</li>
                    <li>Beneficios y ROI de Leal 360</li>
                  </ul>
                  <p>¿Qué te gustaría saber?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección 3: Tarjetas de las tres etapas (mitad con imagen de fondo) -->
      <section class="stages-section">
        <div class="stages-bg-image"></div>
        <div class="stages-content">
          <div class="stage-card">
            <div class="stage-number">1</div>
            <div class="stage-info">
              <h3 class="stage-title">Mapear ecosistema de data e integrar</h3>
              <p class="stage-description">Identificamos todas tus fuentes de datos y las conectamos con Leal 360 usando la modalidad más adecuada para tu infraestructura.</p>
            </div>
          </div>
          
          <div class="stage-card">
            <div class="stage-number">2</div>
            <div class="stage-info">
              <h3 class="stage-title">Accionar data desde la herramienta Leal 360</h3>
              <p class="stage-description">Activamos tus datos a través de campañas personalizadas, triggers automáticos y experiencias únicas para cada cliente.</p>
            </div>
          </div>
          
          <div class="stage-card">
            <div class="stage-number">3</div>
            <div class="stage-info">
              <h3 class="stage-title">Monitorea la evolución de tus ingresos y ROI</h3>
              <p class="stage-description">Medimos el impacto de cada acción y optimizamos continuamente para maximizar tus resultados.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección 4: Detalle de Leal 360 como herramienta (fondo gris) -->
      <section class="leal-detail-section">
        <div class="detail-wrapper">
          <div class="detail-text">
            <h2 class="detail-title">Centraliza toda tu data en un sólo lugar</h2>
            <p class="detail-description">
              Una plataforma integral con cuatro módulos para gestionar a tus clientes. Te ayuda a <strong>captar datos</strong> de tus clientes y <strong>segmentarlos</strong> según quiénes son, qué compran y cuándo. <strong>Actívalos</strong> automatizando campañas personalizadas por Email, SMS y WhatsApp. <strong>Mide la experiencia</strong> de tu cliente en cada sucursal. Recolecta y responde a su feedback. Y <strong>fidelíza a tus clientes</strong> con tu programa de puntos, cashback y promociones.
            </p>
          </div>
          <div class="detail-image">
            <img src="Assets Leal 360/General - Group 1171276518 copia.png" alt="Leal 360 Platform" />
          </div>
        </div>
      </section>

      <!-- Sección 5: Beneficios de la integración (fondo gris) -->
      <section class="benefits-section">
        <div class="benefits-wrapper">
          <div class="benefits-image">
            <div class="integration-diagram">
              <div class="diagram-content">
                <div class="diagram-title">Diagrama de Integración</div>
                <div class="diagram-subtitle">Conecta todos tus sistemas con Leal 360</div>
              </div>
            </div>
          </div>
          <div class="benefits-text">
            <h2 class="benefits-title">Integra una vez, activa siempre</h2>
            <p class="benefits-description">
              Tus datos viven en múltiples sistemas: POS, e-commerce, CRM, redes sociales. Leal 360 los unifica en tiempo real, creando una vista 360° de cada cliente. Esta información centralizada se procesa inteligentemente para identificar patrones, se activa a través de campañas automáticas, y se distribuye de vuelta a tus herramientas para maximizar el ROI de cada integración.
            </p>
          </div>
        </div>
      </section>

      <!-- CTA Principal (fondo gris) -->
      <section class="cta-section">
        <div class="cta-wrapper">
          <h2 class="cta-title">¿Listo para integrar Leal 360?</h2>
          <p class="cta-description">Comienza tu transformación digital y convierte tus datos en ingresos incrementales</p>
          <button class="cta-button" onclick="showSection('integrations')">
            ${getIconSVG('layers')}
            <span>Explorar Modalidades de Integración</span>
          </button>
        </div>
      </section>
    </div>
  `;
  
  console.log('renderOverview() completado');
}

// Función para manejar el agente de integraciones
function sendAgentMessage() {
  const input = document.getElementById('agentInput');
  const chatMessages = document.getElementById('chatMessages');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Agregar mensaje del usuario
  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(userMessage);
  
  // Limpiar input
  input.value = '';
  
  // Simular respuesta del agente
  setTimeout(() => {
    const agentResponse = document.createElement('div');
    agentResponse.className = 'agent-message';
    agentResponse.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <p>${getAgentResponse(message)}</p>
      </div>
    `;
    chatMessages.appendChild(agentResponse);
    
    // Scroll al final del chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

// Función para generar respuestas del agente
function getAgentResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('api') || lowerMessage.includes('rest')) {
    return 'La integración por API es ideal si tienes capacidad de desarrollo y un POS propio. Te permite máxima flexibilidad y control total sobre la integración. ¿Te gustaría conocer más detalles sobre los endpoints disponibles?';
  }
  
  if (lowerMessage.includes('agente') || lowerMessage.includes('widget')) {
    return 'El Agente es un widget que se instala en tu POS compatible. Es la opción más sencilla si tu sistema está en nuestra lista de compatibilidad. ¿Quieres verificar si tu POS es compatible?';
  }
  
  if (lowerMessage.includes('sftp') || lowerMessage.includes('archivo')) {
    return 'SFTP es perfecto para transferir archivos CSV de manera segura. Ideal si no tienes capacidad técnica o se te dificulta la integración directa. ¿Necesitas ayuda con el formato de archivos?';
  }
  
  if (lowerMessage.includes('cajero') || lowerMessage.includes('web')) {
    return 'El Cajero Web es una interfaz plug & play para POS sin integración. Solo necesitas compartir URL y credenciales. ¿Te interesa esta modalidad?';
  }
  
  if (lowerMessage.includes('beneficio') || lowerMessage.includes('roi') || lowerMessage.includes('ventaja')) {
    return 'Con Leal 360 puedes esperar: +40% en retención de clientes, +35% en ticket promedio, +60% en relevancia de mensajes y +50% en ROI medible. ¿Quieres conocer cómo medimos estos resultados?';
  }
  
  if (lowerMessage.includes('implementación') || lowerMessage.includes('proceso') || lowerMessage.includes('tiempo')) {
    return 'El proceso de implementación típico es: 1) Evaluación de tu stack (1-2 días), 2) Configuración de integración (3-7 días), 3) Pruebas y ajustes (2-3 días). ¿En qué etapa te encuentras?';
  }
  
  if (lowerMessage.includes('costo') || lowerMessage.includes('precio') || lowerMessage.includes('inversión')) {
    return 'Los costos varían según la modalidad de integración y el volumen de transacciones. Te recomiendo usar nuestro recomendador para obtener una estimación personalizada. ¿Quieres que te ayude a evaluarlo?';
  }
  
  // Respuesta genérica
  return 'Excelente pregunta. Para darte la mejor respuesta, ¿podrías ser más específico sobre qué aspecto de las integraciones te interesa? Puedo ayudarte con modalidades, compatibilidad, implementación o beneficios.';
}

// Funciones auxiliares necesarias
function getIconSVG(iconName) {
  const icons = {
    'overview': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/></svg>',
    'layers': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h8M8 14h8"/></svg>',
    'help-circle': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    'send': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>'
  };
  return icons[iconName] || '';
}

function getIntegrationIcon(integrationId) {
  const icons = {
    'api': 'code',
    'agente': 'monitor',
    'sftp': 'folder',
    'cajero-web': 'globe',
    'ipaas': 'cloud'
  };
  return icons[integrationId] || 'layers';
}

// Funciones placeholder para otras secciones
function renderIntegrationsMain() {
  const content = document.getElementById('mainContent');
  content.innerHTML = '<div style="padding: 2rem;"><h1>Integraciones</h1><p>Contenido de integraciones...</p></div>';
}

function renderRecommender() {
  const content = document.getElementById('mainContent');
  content.innerHTML = '<div style="padding: 2rem;"><h1>Recomendador</h1><p>Contenido del recomendador...</p></div>';
}

function renderIntegrationDetail(integration) {
  const content = document.getElementById('mainContent');
  content.innerHTML = `<div style="padding: 2rem;"><h1>${integration.title}</h1><p>${integration.description}</p></div>`;
}

// Hacer funciones globales
window.showSection = showSection;
window.showSubsection = showSubsection;
window.sendAgentMessage = sendAgentMessage;
window.toggleSidebar = toggleSidebar;

// Inicializar la aplicación cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});
