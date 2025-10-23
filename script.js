// Leal 360 - Script Principal Optimizado
let currentSection = 'overview';

const mainNavigation = [
  { id: 'overview', title: 'Overview', icon: 'briefcase' },
  { id: 'integrations', title: 'Integraciones', icon: 'layers' },
  { id: 'recommender', title: 'Recomendador', icon: 'help-circle' }
];

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
    renderIntegrationsMain();
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

function renderIntegrationsMain() {
  const content = document.getElementById('mainContent');
  if (!content) return;
  
  content.innerHTML = `
    <div class="integrations-container">
      <h1>Integraciones</h1>
      <p>Sección de integraciones en desarrollo...</p>
    </div>
  `;
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
