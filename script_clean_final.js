// =========================
// LEAL 360 - SCRIPT PRINCIPAL
// =========================

// Variables globales
let currentSection = 'overview';

// Navegación principal
const mainNavigation = [
  {
    id: 'overview',
    title: 'Overview',
    icon: 'briefcase'
  },
  {
    id: 'integrations',
    title: 'Integraciones',
    icon: 'layers'
  },
  {
    id: 'recommender',
    title: 'Recomendador',
    icon: 'help-circle'
  }
];

// Funciones principales
function initializeApp() {
  console.log('Inicializando aplicación...');
  showSection('overview');
}

function showSection(sectionId) {
  console.log('Cambiando a sección:', sectionId);
  currentSection = sectionId;
  
  // Actualizar botones de navegación
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Renderizar contenido
  if (sectionId === 'overview') {
    renderOverview();
  } else if (sectionId === 'integrations') {
    renderIntegrationsMain();
  } else if (sectionId === 'recommender') {
    renderRecommender();
  }
}

function renderOverview() {
  console.log('🎯 renderOverview() ejecutándose...');
  
  const content = document.getElementById('mainContent');
  
  if (!content) {
    console.error('❌ No se encontró el elemento mainContent');
    return;
  }
  
  console.log('✅ Elemento mainContent encontrado:', content);
  console.log('📄 Contenido actual ANTES:', content.innerHTML.substring(0, 200) + '...');
  
  // Limpiar completamente el contenido
  content.innerHTML = '';
  
  // Forzar el reemplazo del contenido con estilos inline
  content.style.cssText = 'position: relative; z-index: 10; background: #f8f9fa; min-height: 100vh;';
  
  // Implementar la vista Overview completa según el prompt
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
  
  console.log('📄 Contenido DESPUÉS:', content.innerHTML.substring(0, 200) + '...');
  console.log('✅ renderOverview() completado');
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

// Función para obtener iconos SVG
function getIconSVG(iconName) {
  const icons = {
    'briefcase': '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/></svg>',
    'layers': '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
    'help-circle': '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    'send': '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>'
  };
  
  return icons[iconName] || '';
}

// Funciones placeholder para otras secciones
function renderIntegrationsMain() {
  const content = document.getElementById('mainContent');
  if (!content) return;
  
  content.innerHTML = `
    <div style="padding: 2rem; text-align: center;">
      <h1>Integraciones</h1>
      <p>Esta sección estará disponible próximamente.</p>
    </div>
  `;
}

function renderRecommender() {
  const content = document.getElementById('mainContent');
  if (!content) return;
  
  content.innerHTML = `
    <div style="padding: 2rem; text-align: center;">
      <h1>Recomendador</h1>
      <p>Esta sección estará disponible próximamente.</p>
    </div>
  `;
}

// Inicializar aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeApp);
