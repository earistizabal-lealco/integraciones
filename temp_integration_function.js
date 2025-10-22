function showIntegrations() {
  const content = `
    <div class="integrations-container">
      <div class="integrations-header">
        <h1>Integraciones</h1>
        <p>Conecta tus sistemas con Leal 360</p>
      </div>
      
      <div class="integrations-navigation">
        <div class="nav-tabs">
          <button class="nav-tab active" onclick="showIntegrationSection('scenarios')">Escenarios</button>
          <button class="nav-tab" onclick="showIntegrationSection('endpoints')">Endpoints</button>
        </div>
      </div>
      
      <div class="integrations-content" id="integrationsContent">
        <!-- Contenido se carga dinámicamente -->
      </div>
    </div>
  `;
  
  document.getElementById('mainContent').innerHTML = content;
  showIntegrationSection('scenarios');
}

function showIntegrationSection(section) {
  const content = document.getElementById('integrationsContent');
  const tabs = document.querySelectorAll('.nav-tab');
  
  // Actualizar tabs activos
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  if (section === 'scenarios') {
    content.innerHTML = `
      <div class="scenarios-grid">
        <div class="scenario-card" onclick="showScenarioDetail('pos')">
          <h3>POS</h3>
          <p>Integra tu sistema de punto de venta</p>
        </div>
        <div class="scenario-card" onclick="showScenarioDetail('ecommerce')">
          <h3>E-commerce</h3>
          <p>Conecta tu tienda online</p>
        </div>
        <div class="scenario-card" onclick="showScenarioDetail('crm')">
          <h3>CRM</h3>
          <p>Sincroniza tu sistema de gestión</p>
        </div>
      </div>
    `;
  } else if (section === 'endpoints') {
    content.innerHTML = `
      <div class="endpoints-grid">
        <div class="endpoint-category">
          <h3>Autenticación</h3>
          <div class="endpoint-list">
            <div class="endpoint-item">POST /auth/login</div>
            <div class="endpoint-item">POST /auth/refresh</div>
            <div class="endpoint-item">POST /auth/logout</div>
          </div>
        </div>
        <div class="endpoint-category">
          <h3>Usuarios</h3>
          <div class="endpoint-list">
            <div class="endpoint-item">GET /users</div>
            <div class="endpoint-item">POST /users</div>
            <div class="endpoint-item">PUT /users/{id}</div>
          </div>
        </div>
      </div>
    `;
  }
}
