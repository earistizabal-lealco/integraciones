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
  
  // Limpiar completamente el contenido
  content.innerHTML = '';
  content.style.cssText = '';
  
  // Vista Overview completamente nueva
  content.innerHTML = `
    <div class="overview-container">
      <!-- Sección principal con imagen de fondo (70vh) -->
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

      <!-- Cards del proceso (mitad sobre imagen, mitad sobre gris) -->
      <section class="process-cards">
        <div class="cards-container">
          <div class="process-card">
            <div class="card-number">1</div>
            <h3 class="card-title">Mapear ecosistema de data e integrar</h3>
            <p class="card-description">Identificamos todas tus fuentes de datos y las conectamos con Leal 360 usando la modalidad más adecuada para tu infraestructura.</p>
        </div>
        
          <div class="process-card">
            <div class="card-number">2</div>
            <h3 class="card-title">Accionar data desde la herramienta Leal 360</h3>
            <p class="card-description">Activamos tus datos a través de campañas personalizadas, triggers automáticos y experiencias únicas para cada cliente.</p>
            </div>
            
          <div class="process-card">
            <div class="card-number">3</div>
            <h3 class="card-title">Monitorea la evolución de tus ingresos y ROI</h3>
            <p class="card-description">Medimos el impacto de cada acción y optimizamos continuamente para maximizar tus resultados.</p>
          </div>
        </div>
      </section>

      <!-- Sección Leal 360 (fondo gris) -->
      <section class="leal-section">
        <div class="leal-container">
          <div class="leal-text">
            <h2 class="leal-title">Centraliza toda tu data en un sólo lugar</h2>
            <p class="leal-description">
              Una plataforma integral con cuatro módulos para gestionar a tus clientes. Te ayuda a <strong>captar datos</strong> de tus clientes y <strong>segmentarlos</strong> según quiénes son, qué compran y cuándo. <strong>Actívalos</strong> automatizando campañas personalizadas por Email, SMS y WhatsApp. <strong>Mide la experiencia</strong> de tu cliente en cada sucursal. Recolecta y responde a su feedback. Y <strong>fidelíza a tus clientes</strong> con tu programa de puntos, cashback y promociones.
            </p>
        </div>
          <div class="leal-image">
            <img src="Assets Leal 360/General - Group 1171276518 copia.png" alt="Leal 360 Platform" />
          </div>
        </div>
      </section>

      <!-- Sección Beneficios (fondo gris) -->
      <section class="benefits-section">
        <div class="benefits-container">
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
        <div class="cta-container">
          <h2 class="cta-title">¿Listo para integrar Leal 360?</h2>
          <p class="cta-description">Comienza tu transformación digital y convierte tus datos en ingresos incrementales</p>
          <button class="cta-button" onclick="showSection('integrations')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12,2 2,7 12,12 22,7 12,2"></polygon>
              <polyline points="2,17 12,22 22,17"></polyline>
              <polyline points="2,12 12,17 22,12"></polyline>
            </svg>
            <span>Explorar Modalidades de Integración</span>
          </button>
            </div>
    </section>
    </div>
  `;
  
  console.log('✅ renderOverview() completado');
}

// Función para manejar el input del agente
function handleAgentInput(event) {
  if (event.key === 'Enter') {
    sendAgentMessage();
  }
}

// Función para crear ventana flotante del chat
function createFloatingChat() {
  // Remover chat existente si existe
  const existingChat = document.getElementById('floatingChat');
  if (existingChat) {
    existingChat.remove();
  }
  
  // Crear ventana flotante
  const floatingChat = document.createElement('div');
  floatingChat.id = 'floatingChat';
  floatingChat.className = 'floating-chat';
  floatingChat.innerHTML = `
    <div class="chat-header">
      <div class="header-content">
        <img src="leal-logo-dark.png" alt="Leal 360" class="header-logo">
        <h3>Agente de Integraciones Leal 360</h3>
      </div>
      <button class="close-chat" onclick="closeFloatingChat()">×</button>
    </div>
    <div class="chat-messages" id="chatMessages">
              <div class="agent-message">
                <div class="message-avatar">
                  🤖
                </div>
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
  
  // Mostrar con animación
  setTimeout(() => {
    floatingChat.classList.add('show');
  }, 10);
  
  // Agregar event listeners a los botones de acción rápida
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

// Función para cerrar ventana flotante
function closeFloatingChat() {
  const floatingChat = document.getElementById('floatingChat');
  if (floatingChat) {
    floatingChat.classList.remove('show');
    setTimeout(() => {
      floatingChat.remove();
    }, 300);
  }
}

// Función para manejar acciones rápidas
function handleQuickAction(topic) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  // Agregar mensaje del usuario
  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <p>${getTopicText(topic)}</p>
    </div>
  `;
  chatMessages.appendChild(userMessage);
  
  // Mostrar indicador de escritura
  showTypingIndicator();
  
  // Simular respuesta del agente
  setTimeout(() => {
    removeTypingIndicator();
    const agentResponse = document.createElement('div');
    agentResponse.className = 'agent-message';
    agentResponse.innerHTML = `
      <div class="message-avatar">
        🤖
      </div>
      <div class="message-content">
        <p>${getAgentResponse(getTopicText(topic))}</p>
      </div>
    `;
    chatMessages.appendChild(agentResponse);
    
    // Scroll al final del chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1500);
}

// Función para obtener texto del tópico
function getTopicText(topic) {
  const topics = {
    'modalidades': 'Modalidades de integración',
    'compatibilidad': 'Compatibilidad técnica',
    'proceso': 'Proceso de implementación',
    'roi': 'ROI y beneficios'
  };
  return topics[topic] || topic;
}

// Función para mostrar indicador de escritura
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

// Función para remover indicador de escritura
function removeTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) {
    indicator.remove();
  }
}

// Función para manejar el agente de integraciones
function sendAgentMessage() {
  const input = document.getElementById('agentInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Crear ventana flotante si no existe
  let chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) {
    createFloatingChat();
    chatMessages = document.getElementById('chatMessages');
  }
  
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
  
  // Mostrar indicador de escritura
  showTypingIndicator();
  
  // Simular respuesta del agente
  setTimeout(() => {
    removeTypingIndicator();
    const agentResponse = document.createElement('div');
    agentResponse.className = 'agent-message';
    agentResponse.innerHTML = `
      <div class="message-avatar">
        🤖
      </div>
      <div class="message-content">
        <p>${getAgentResponse(message)}</p>
      </div>
    `;
    chatMessages.appendChild(agentResponse);
    
    // Scroll al final del chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1500);
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
