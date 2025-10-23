// Leal 360 - Sistema de Componentes para API Documentation
// Componentes reutilizables para la sección de integraciones

// Estado global para la sección de integraciones
window.IntegrationsState = {
  selectedEndpoint: null,
  expandedGroups: ['autenticacion'],
  testParams: {},
  callHistory: []
};

// ==========================================
// COMPONENTE SIDEBAR
// ==========================================
function renderApiSidebar() {
  const sidebar = document.getElementById('apiSidebar');
  if (!sidebar) return;

  const groups = window.API_DATA.getApiGroups();
  
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h3>API Reference</h3>
      <p class="sidebar-subtitle">Documentación completa de endpoints</p>
    </div>
    <nav class="sidebar-nav">
      ${groups.map(group => renderSidebarGroup(group)).join('')}
    </nav>
  `;

  // Agregar event listeners
  addSidebarEventListeners();
}

function renderSidebarGroup(group) {
  const endpoints = window.API_DATA.getEndpointsByGroup(group.id);
  const isExpanded = window.IntegrationsState.expandedGroups.includes(group.id);
  
  return `
    <div class="sidebar-group" data-group="${group.id}">
      <button class="group-header" onclick="toggleGroup('${group.id}')">
        <div class="group-icon">
          ${getGroupIcon(group.icon)}
        </div>
        <span class="group-title">${group.title}</span>
        <div class="group-arrow ${isExpanded ? 'expanded' : ''}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      </button>
      <div class="group-content ${isExpanded ? 'expanded' : ''}">
        ${endpoints.map(endpoint => renderSidebarEndpoint(endpoint)).join('')}
      </div>
    </div>
  `;
}

function renderSidebarEndpoint(endpoint) {
  const isSelected = window.IntegrationsState.selectedEndpoint === endpoint.id;
  
  return `
    <button class="endpoint-item ${isSelected ? 'selected' : ''}" 
            onclick="selectEndpoint('${endpoint.id}')"
            data-endpoint="${endpoint.id}">
      <span class="endpoint-method ${endpoint.method.toLowerCase()}">
        ${endpoint.method}
      </span>
      <span class="endpoint-name">${endpoint.title}</span>
    </button>
  `;
}

function getGroupIcon(iconName) {
  const icons = {
    'shield': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    'users': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    'gift': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,12 20,22 4,22 4,12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>',
    'credit-card': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
    'settings': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    'bar-chart': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>'
  };
  return icons[iconName] || '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>';
}

function toggleGroup(groupId) {
  const expandedGroups = window.IntegrationsState.expandedGroups;
  if (expandedGroups.includes(groupId)) {
    window.IntegrationsState.expandedGroups = expandedGroups.filter(id => id !== groupId);
  } else {
    window.IntegrationsState.expandedGroups.push(groupId);
  }
  
  // Re-renderizar sidebar
  renderApiSidebar();
}

function selectEndpoint(endpointId) {
  window.IntegrationsState.selectedEndpoint = endpointId;
  
  // Actualizar sidebar
  renderApiSidebar();
  
  // Mostrar documentación del endpoint
  renderEndpointDetail(endpointId);
}

function addSidebarEventListeners() {
  // Event listeners ya están en los botones onclick
}

// ==========================================
// COMPONENTE GRID DE ENDPOINTS
// ==========================================
function renderApiGrid() {
  const content = document.getElementById('apiContent');
  if (!content) return;

  const endpoints = window.API_DATA.getAllEndpoints();
  
  content.innerHTML = `
    <div class="api-grid-container">
      <div class="api-grid-header">
        <h2>API Endpoints</h2>
        <p>Selecciona un endpoint para ver su documentación completa</p>
      </div>
      <div class="api-grid">
        ${endpoints.map(endpoint => renderEndpointCard(endpoint)).join('')}
      </div>
    </div>
  `;
}

function renderEndpointCard(endpoint) {
  return `
    <div class="endpoint-card" onclick="selectEndpoint('${endpoint.id}')">
      <div class="card-header">
        <div class="method-badge ${endpoint.method.toLowerCase()}">
          ${endpoint.method}
        </div>
        <div class="endpoint-path">${endpoint.endpoint}</div>
      </div>
      <div class="card-content">
        <h3 class="card-title">${endpoint.title}</h3>
        <p class="card-description">${endpoint.description}</p>
        <div class="card-tags">
          ${endpoint.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// COMPONENTE DOCUMENTACIÓN DE ENDPOINT
// ==========================================
function renderEndpointDetail(endpointId) {
  const content = document.getElementById('apiContent');
  if (!content) return;

  const endpoint = window.API_DATA.getEndpointById(endpointId);
  if (!endpoint) return;

  content.innerHTML = `
    <div class="endpoint-detail">
      <div class="detail-header">
        <button class="back-button" onclick="renderApiGrid()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
          Volver a la documentación
        </button>
        
        <div class="endpoint-info">
          <div class="method-badge large ${endpoint.method.toLowerCase()}">
            ${endpoint.method}
          </div>
          <div class="endpoint-path large">${endpoint.endpoint}</div>
        </div>
        
        <h1 class="endpoint-title">${endpoint.title}</h1>
        <p class="endpoint-description">${endpoint.description}</p>
        
        <div class="endpoint-tags">
          ${endpoint.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="detail-tabs">
        <div class="tab-nav">
          <button class="tab-button active" data-tab="overview">Overview</button>
          <button class="tab-button" data-tab="parameters">Parameters</button>
          <button class="tab-button" data-tab="code">Code</button>
        </div>
        
        <div class="tab-content">
          <div class="tab-panel active" id="overview-panel">
            ${renderOverviewTab(endpoint)}
          </div>
          
          <div class="tab-panel" id="parameters-panel">
            ${renderParametersTab(endpoint)}
          </div>
          
          <div class="tab-panel" id="code-panel">
            ${renderCodeTab(endpoint)}
          </div>
        </div>
      </div>
    </div>
  `;

  // Agregar event listeners para tabs
  addTabEventListeners();
}

function renderOverviewTab(endpoint) {
  return `
    <div class="overview-content">
      <div class="overview-section">
        <h3>Resumen</h3>
        <p>${endpoint.overview.summary}</p>
      </div>
      
      <div class="overview-section">
        <h3>Detalles</h3>
        <p>${endpoint.overview.details}</p>
      </div>
      
      <div class="overview-section">
        <h3>Casos de Uso</h3>
        <ul class="use-cases">
          ${endpoint.overview.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
        </ul>
      </div>
      
      <div class="test-section">
        <button class="test-button" onclick="openTestModal('${endpoint.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5,3 19,12 5,21 5,3"></polygon>
          </svg>
          Probar Endpoint
        </button>
      </div>
    </div>
  `;
}

function renderParametersTab(endpoint) {
  if (!endpoint.parameters || endpoint.parameters.length === 0) {
    return `
      <div class="no-parameters">
        <p>Este endpoint no requiere parámetros.</p>
      </div>
    `;
  }

  return `
    <div class="parameters-content">
      <div class="parameters-table">
        <table>
          <thead>
            <tr>
              <th>Parámetro</th>
              <th>Tipo</th>
              <th>Requerido</th>
              <th>Descripción</th>
              <th>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            ${endpoint.parameters.map(param => `
              <tr>
                <td><code class="param-name">${param.name}</code></td>
                <td><span class="param-type">${param.type}</span></td>
                <td>
                  <span class="required-badge ${param.required ? 'required' : 'optional'}">
                    ${param.required ? 'Sí' : 'No'}
                  </span>
                </td>
                <td>${param.description}</td>
                <td><code class="param-example">${param.example || '-'}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderCodeTab(endpoint) {
  const curlExample = generateCurlExample(endpoint);
  
  return `
    <div class="code-content">
      <!-- Card 1: cURL Example -->
      <div class="code-card">
        <div class="code-card-header">
          <h4>cURL Example</h4>
          <button class="copy-button" onclick="copyToClipboard('${curlExample.replace(/'/g, "\\'")}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copiar
          </button>
        </div>
        <div class="code-card-content">
          <pre class="code-block"><code>${escapeHtml(curlExample)}</code></pre>
        </div>
      </div>
      
      <!-- Card 2: Request Body (solo si existe) -->
      ${endpoint.requestExample ? `
        <div class="code-card">
          <div class="code-card-header">
            <h4>Request Body</h4>
            <button class="copy-button" onclick="copyToClipboard('${endpoint.requestExample.replace(/'/g, "\\'")}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar
            </button>
          </div>
          <div class="code-card-content">
            <pre class="code-block"><code>${escapeHtml(JSON.stringify(JSON.parse(endpoint.requestExample), null, 2))}</code></pre>
          </div>
        </div>
      ` : ''}
      
      <!-- Card 3: Response Example (solo si existe) -->
      ${endpoint.responseExample ? `
        <div class="code-card">
          <div class="code-card-header">
            <h4>Response Example</h4>
            <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(endpoint.responseExample, null, 2).replace(/'/g, "\\'")}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar
            </button>
          </div>
          <div class="code-card-content">
            <pre class="code-block"><code>${escapeHtml(JSON.stringify(endpoint.responseExample, null, 2))}</code></pre>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// Función helper para escapar HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ==========================================
// COMPONENTE MODAL DE PRUEBA
// ==========================================
function openTestModal(endpointId) {
  const endpoint = window.API_DATA.getEndpointById(endpointId);
  if (!endpoint) return;

  // Crear modal
  const modal = document.createElement('div');
  modal.className = 'test-modal-overlay';
  modal.innerHTML = `
    <div class="test-modal">
      <div class="modal-header">
        <h3>Probar Endpoint: ${endpoint.title}</h3>
        <button class="close-modal" onclick="closeTestModal()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-content">
        <div class="test-form">
          <h4>Parámetros</h4>
          <div class="form-fields">
            ${renderTestFormFields(endpoint)}
          </div>
          
          <div class="test-actions">
            <button class="execute-button" onclick="executeEndpointTest('${endpointId}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5,3 19,12 5,21 5,3"></polygon>
              </svg>
              Ejecutar
            </button>
          </div>
        </div>
        
        <div class="test-response">
          <h4>Respuesta</h4>
          <div class="response-content">
            <p class="response-placeholder">Haz clic en "Ejecutar" para probar el endpoint</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Agregar event listener para cerrar con ESC
  document.addEventListener('keydown', handleModalKeydown);
}

function renderTestFormFields(endpoint) {
  if (!endpoint.parameters || endpoint.parameters.length === 0) {
    return '<p>Este endpoint no requiere parámetros.</p>';
  }

  return endpoint.parameters.map(param => `
    <div class="form-field">
      <label for="param-${param.name}">
        ${param.name}
        ${param.required ? '<span class="required">*</span>' : ''}
      </label>
      <input 
        type="text" 
        id="param-${param.name}" 
        placeholder="${param.example || param.description}"
        ${param.required ? 'required' : ''}
      >
      <small class="field-description">${param.description}</small>
    </div>
  `).join('');
}

function executeEndpointTest(endpointId) {
  const endpoint = window.API_DATA.getEndpointById(endpointId);
  if (!endpoint) return;

  // Recopilar parámetros del formulario
  const params = {};
  endpoint.parameters.forEach(param => {
    const input = document.getElementById(`param-${param.name}`);
    if (input && input.value.trim()) {
      params[param.name] = input.value.trim();
    }
  });

  // Mostrar loading
  const responseContent = document.querySelector('.response-content');
  responseContent.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Ejecutando endpoint...</p>
    </div>
  `;

  // Simular llamada API (en producción sería una llamada real)
  setTimeout(() => {
    const mockResponse = {
      success: true,
      data: endpoint.responseExample,
      timestamp: new Date().toISOString()
    };

    responseContent.innerHTML = `
      <div class="response-success">
        <div class="response-header">
          <div class="response-status">
            <span class="status-code">200 OK</span>
            <span>Respuesta exitosa</span>
          </div>
          <button class="copy-button" onclick="copyToClipboard('${JSON.stringify(mockResponse, null, 2).replace(/'/g, "\\'")}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copiar
          </button>
        </div>
        <pre class="response-json"><code>${JSON.stringify(mockResponse, null, 2)}</code></pre>
      </div>
    `;
  }, 1500);
}

function closeTestModal() {
  const modal = document.querySelector('.test-modal-overlay');
  if (modal) {
    modal.remove();
  }
  document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    closeTestModal();
  }
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================
function addTabEventListeners() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      
      // Remover active de todos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Activar seleccionado
      button.classList.add('active');
      document.getElementById(`${tabId}-panel`).classList.add('active');
    });
  });
}

function generateCurlExample(endpoint) {
  const baseUrl = 'https://testapi.puntosleal.com';
  let curl = `curl -X ${endpoint.method} "${baseUrl}${endpoint.endpoint}" \\\n  -H "Content-Type: application/json"`;
  
  if (endpoint.method !== 'GET') {
    curl += ` \\\n  -d '${endpoint.requestExample}'`;
  }
  
  return curl;
}


function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Mostrar toast de confirmación
    showToast('Código copiado al portapapeles');
  }).catch(err => {
    console.error('Error al copiar:', err);
    showToast('Error al copiar código', 'error');
  });
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Exportar funciones globales
window.toggleGroup = toggleGroup;
window.selectEndpoint = selectEndpoint;
window.openTestModal = openTestModal;
window.executeEndpointTest = executeEndpointTest;
window.closeTestModal = closeTestModal;
window.copyToClipboard = copyToClipboard;
