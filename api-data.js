// Leal 360 - Datos de Endpoints de API
// Adaptado del proyecto leal-api-guide-main

// Configuración de grupos de endpoints
const API_GROUPS = [
  {
    id: 'autenticacion',
    title: 'Autenticación',
    icon: 'shield',
    description: 'Endpoints para autenticación y gestión de tokens'
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    icon: 'users',
    description: 'Gestión y consulta de usuarios del programa'
  },
  {
    id: 'puntos-redenciones',
    title: 'Puntos y Redenciones',
    icon: 'gift',
    description: 'Acumulación y redención de puntos'
  },
  {
    id: 'transacciones',
    title: 'Transacciones',
    icon: 'credit-card',
    description: 'Historial y gestión de transacciones'
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    icon: 'settings',
    description: 'Configuración del comercio y sistema'
  },
  {
    id: 'promociones-premios',
    title: 'Promociones y Premios',
    icon: 'bar-chart',
    description: 'Catálogo de premios y promociones activas'
  }
];

// Datos completos de endpoints
const API_ENDPOINTS = {
  // ==========================================
  // AUTENTICACIÓN
  // ==========================================
  'login': {
    id: 'login',
    title: 'Login de Usuario',
    description: 'Autenticación de usuarios del sistema comercial. Retorna token de acceso JWT y refresh token para mantener la sesión activa.',
    method: 'POST',
    endpoint: '/api/com_usuarios/login',
    group: 'autenticacion',
    tags: ['Autenticación', 'Seguridad', 'JWT', 'Comercio'],
    overview: {
      summary: 'Servicio para autenticar usuarios del sistema comercial',
      details: 'Este endpoint permite la autenticación de cajeros y administradores del comercio, retornando un token JWT para acceder a los demás servicios del API.',
      useCases: [
        'Autenticación de cajeros en POS',
        'Login de administradores del comercio',
        'Obtención de tokens para acceso a API'
      ]
    },
    parameters: [
      { 
        name: 'usuario', 
        type: 'string', 
        required: true, 
        description: 'Nombre de usuario del cajero o administrador del comercio',
        example: 'cajero01'
      },
      { 
        name: 'contrasena', 
        type: 'string', 
        required: true, 
        description: 'Contraseña del usuario',
        example: 'mi_password_seguro'
      }
    ],
    requestExample: `{
  "usuario": "cajero01",
  "contrasena": "mi_password_seguro"
}`,
    responseExample: `{
  "code": 100,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "16109838266d6ceec26395b98025....",
  "id_rol": 2,
  "plataforma": "CAP"
}`
  },

  'refresh': {
    id: 'refresh',
    title: 'Refresh Token',
    description: 'Renueva el token de acceso usando el refresh token.',
    method: 'POST',
    endpoint: '/api/com_usuarios/refresh_token',
    group: 'autenticacion',
    tags: ['Autenticación', 'Token', 'Seguridad'],
    overview: {
      summary: 'Renovación de tokens de acceso para mantener sesión activa',
      details: 'Permite renovar el token JWT usando el refresh token para extender la sesión sin requerir nuevo login.',
      useCases: [
        'Renovar sesión expirada',
        'Mantener usuario logueado',
        'Gestión automática de tokens'
      ]
    },
    parameters: [
      { 
        name: 'uid_cms', 
        type: 'string', 
        required: true, 
        description: 'UID único del usuario cajero con sesión',
        example: '97f4f7a7a49f7858f3fd9adde1abf88d'
      },
      { 
        name: 'refresh_token', 
        type: 'string', 
        required: true, 
        description: 'Refresh token obtenido del login',
        example: '1688575486e5649d653b859e49f1b951d2b403eb9e'
      },
      { 
        name: 'id_sucursal', 
        type: 'integer', 
        required: true, 
        description: 'ID de la sucursal',
        example: 0
      }
    ],
    requestExample: `{
  "uid_cms": "97f4f7a7a49f7858f3fd9adde1abf88d",
  "refresh_token": "1688575486e5649d653b859e49f1b951d2b403eb9e",
  "id_sucursal": 0
}`,
    responseExample: `{
  "code": 100,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "new_refresh_token_here"
}`
  },

  'me': {
    id: 'me',
    title: 'Información del Comercio',
    description: 'Servicio para obtener detalle del usuario cajero y del comercio. LealAuthToken se obtiene del servicio Login.',
    method: 'GET',
    endpoint: '/api/com_usuarios/me',
    group: 'autenticacion',
    tags: ['Usuario', 'Perfil', 'Autenticación'],
    overview: {
      summary: 'Obtiene la información completa del usuario autenticado',
      details: 'Retorna datos del usuario cajero y configuración del comercio asociado. Requiere token de autenticación válido.',
      useCases: [
        'Información de configuración de comercio',
        'Registro',
        'Acumulación',
        'Redención'
      ]
    },
    parameters: [],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "user": {
    "uid_cms": "97f4f7a7a49f7858f3fd9adde1abf88d",
    "username": "servcliente.3",
    "nombre": "Servicio al Cliente Leal",
    "id_comercio": 3,
    "nombre_comercio": "Leal",
    "miles_cop1": 20,
    "puntos_termometro": 1200
  }
}`
  },

  // ==========================================
  // USUARIOS
  // ==========================================
  'registro-usuarios': {
    id: 'registro-usuarios',
    title: 'Registrar Usuarios',
    description: 'Registra un nuevo usuario en el sistema de puntos Leal.',
    method: 'POST',
    endpoint: '/api/usuarios/register',
    group: 'usuarios',
    tags: ['Registro', 'Usuarios', 'Onboarding'],
    overview: {
      summary: 'Registro de nuevos usuarios en el programa de lealtad',
      details: 'Permite registrar nuevos usuarios en el sistema con sus datos básicos y asignación de puntos de bienvenida.',
      useCases: [
        'Registro desde POS',
        'Onboarding de nuevos clientes',
        'Creación de cuentas desde apps'
      ]
    },
    parameters: [
      { 
        name: 'nombre', 
        type: 'string', 
        required: true, 
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez'
      },
      { 
        name: 'email', 
        type: 'string', 
        required: true, 
        description: 'Correo electrónico del usuario',
        example: 'juan@email.com'
      },
      { 
        name: 'telefono', 
        type: 'string', 
        required: true, 
        description: 'Número de teléfono del usuario',
        example: '3001234567'
      },
      { 
        name: 'documento', 
        type: 'string', 
        required: true, 
        description: 'Documento de identidad único',
        example: '12345678'
      }
    ],
    requestExample: `{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "3001234567",
  "documento": "12345678"
}`,
    responseExample: `{
  "code": 100,
  "data": {
    "uid": "nuevo_uid_usuario",
    "mensaje": "Usuario registrado exitosamente",
    "puntos_bienvenida": 100
  }
}`
  },

  'buscar-usuario': {
    id: 'buscar-usuario',
    title: 'Buscar Usuario',
    description: 'Busca usuarios por diferentes criterios (documento, email, teléfono).',
    method: 'GET',
    endpoint: '/api/usuarios/search',
    group: 'usuarios',
    tags: ['Usuarios', 'Búsqueda', 'Cliente'],
    overview: {
      summary: 'Búsqueda flexible de usuarios en el sistema',
      details: 'Permite encontrar usuarios utilizando diferentes criterios de búsqueda como documento, email o teléfono.',
      useCases: [
        'Búsqueda rápida en POS',
        'Validación de usuarios existentes',
        'Consulta de información de cliente'
      ]
    },
    parameters: [
      { 
        name: 'criterio', 
        type: 'string', 
        required: true, 
        description: 'Documento, email o teléfono del usuario a buscar',
        example: '12345678 o usuario@email.com o 3001234567'
      }
    ],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": {
    "uid": "12345678901",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "3001234567",
    "puntos_activos": 1500,
    "estado": "activo"
  }
}`
  },

  'usuario-uid': {
    id: 'usuario-uid',
    title: 'Consultar x UID',
    description: 'Consulta información completa de un usuario específico por su UID.',
    method: 'GET',
    endpoint: '/api/usuarios/uid',
    group: 'usuarios',
    tags: ['Usuarios', 'UID', 'Consulta'],
    overview: {
      summary: 'Consulta detallada de usuario por identificador único',
      details: 'Retorna toda la información disponible de un usuario específico usando su UID único.',
      useCases: [
        'Verificación de datos de usuario',
        'Consulta de saldo de puntos',
        'Validación de estado de cuenta'
      ]
    },
    parameters: [
      { 
        name: 'uid', 
        type: 'string', 
        required: true, 
        description: 'UID único del usuario en el sistema',
        example: '12345678901'
      }
    ],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": {
    "uid": "12345678901",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "puntos_activos": 1500,
    "fecha_registro": "2023-01-15"
  }
}`
  },

  // ==========================================
  // PUNTOS Y REDENCIONES
  // ==========================================
  'cargar-factura': {
    id: 'cargar-factura',
    title: 'Cargar Factura',
    description: 'Registra una nueva factura en el sistema para generar puntos al usuario.',
    method: 'POST',
    endpoint: '/api/usu_historial_puntos/cargar_factura/:idComercio',
    group: 'puntos-redenciones',
    tags: ['Facturación', 'Puntos', 'Transacciones'],
    overview: {
      summary: 'Procesa facturas de venta y genera puntos para usuarios',
      details: 'Endpoint principal para registrar transacciones de venta y otorgar puntos a usuarios del programa de lealtad.',
      useCases: [
        'Integración con sistemas POS',
        'Acumulación automática de puntos',
        'Registro de transacciones de venta'
      ]
    },
    parameters: [
      { 
        name: 'idComercio', 
        type: 'integer', 
        required: true, 
        description: 'ID único del comercio registrado en Leal (path parameter)',
        example: 3
      },
      { 
        name: 'criterio', 
        type: 'string', 
        required: true, 
        description: 'Documento de usuario final sin espacios',
        example: '12345678'
      },
      { 
        name: 'totalAcum', 
        type: 'number', 
        required: true, 
        description: 'Total valor que para acumular',
        example: 10000
      },
      { 
        name: 'uid', 
        type: 'string', 
        required: false, 
        description: 'ID único del usuario en plataforma Leal (opcional)',
        example: 'usuario_uid_aqui'
      },
      { 
        name: 'transaccion', 
        type: 'object', 
        required: true, 
        description: 'Detalles completos de la factura',
        example: '{ clave: "FDV-1238", noFactura: "FDV-1238", fecha: "2023-08-26 21:05:48", items: [] }'
      }
    ],
    requestExample: `{
  "criterio": "12345678",
  "totalAcum": 10000,
  "uid": "usuario_uid_aqui",
  "transaccion": {
    "clave": "FDV-1238",
    "noFactura": "FDV-1238",
    "fecha": "2023-08-26 21:05:48",
    "items": [
      {
        "idLinea": 1,
        "codigoItem": "dent-1234",
        "descripcion": "pasta dental",
        "cantidad": 2,
        "precioTotal": 50000
      }
    ]
  }
}`,
    responseExample: `{
  "code": 100,
  "no_factura": "F01-6861",
  "id_transaccion": 43426958,
  "puntos_activos": 58575,
  "puntos": 10000
}`
  },

  'redimir-puntos': {
    id: 'redimir-puntos',
    title: 'Redimir Puntos',
    description: 'Procesa la redención de puntos por productos o servicios específicos.',
    method: 'POST',
    endpoint: '/api/redenciones/puntos',
    group: 'puntos-redenciones',
    tags: ['Redención', 'Puntos', 'Transacciones'],
    overview: {
      summary: 'Procesamiento de redenciones de puntos por premios',
      details: 'Endpoint para ejecutar redenciones de puntos acumulados por premios específicos del catálogo.',
      useCases: [
        'Redención en POS',
        'Canje de puntos por productos',
        'Aplicación de descuentos'
      ]
    },
    parameters: [
      { 
        name: 'uid', 
        type: 'string', 
        required: true, 
        description: 'UID único del usuario',
        example: '12345678901'
      },
      { 
        name: 'puntos', 
        type: 'number', 
        required: true, 
        description: 'Cantidad de puntos a redimir',
        example: 500
      },
      { 
        name: 'id_premio', 
        type: 'integer', 
        required: true, 
        description: 'ID del premio seleccionado',
        example: 1
      }
    ],
    requestExample: `{
  "uid": "12345678901",
  "puntos": 500,
  "id_premio": 1
}`,
    responseExample: `{
  "code": 100,
  "data": {
    "id_redencion": "RED-001",
    "puntos_restantes": 1000,
    "premio_obtenido": "Descuento 10%",
    "codigo_redencion": "DESC10-ABC123"
  }
}`
  },

  'redimir-promociones': {
    id: 'redimir-promociones',
    title: 'Redimir Promociones',
    description: 'Aplica promociones especiales disponibles para el usuario.',
    method: 'POST',
    endpoint: '/api/redenciones/promociones',
    group: 'puntos-redenciones',
    tags: ['Promociones', 'Descuentos', 'Redención'],
    overview: {
      summary: 'Aplicación de promociones especiales y ofertas',
      details: 'Permite redimir promociones específicas como 2x1, descuentos especiales u ofertas limitadas.',
      useCases: [
        'Aplicar promociones 2x1',
        'Descuentos especiales',
        'Ofertas por tiempo limitado'
      ]
    },
    parameters: [
      { 
        name: 'uid', 
        type: 'string', 
        required: true, 
        description: 'UID único del usuario',
        example: '12345678901'
      },
      { 
        name: 'id_promocion', 
        type: 'integer', 
        required: true, 
        description: 'ID de la promoción a redimir',
        example: 5
      }
    ],
    requestExample: `{
  "uid": "12345678901",
  "id_promocion": 5
}`,
    responseExample: `{
  "code": 100,
  "data": {
    "promocion_aplicada": "2x1 en productos seleccionados",
    "codigo_promocion": "PROMO2X1-XYZ789",
    "valido_hasta": "2024-12-31"
  }
}`
  },

  // ==========================================
  // TRANSACCIONES
  // ==========================================
  'historico': {
    id: 'historico',
    title: 'Histórico Transacciones',
    description: 'Obtiene el historial completo de transacciones de un usuario o comercio.',
    method: 'GET',
    endpoint: '/api/transacciones/historial',
    group: 'transacciones',
    tags: ['Historial', 'Transacciones', 'Reportes'],
    overview: {
      summary: 'Consulta completa del historial de transacciones',
      details: 'Retorna el historial detallado de todas las transacciones, acumulaciones y redenciones.',
      useCases: [
        'Reportes de transacciones',
        'Auditoría de movimientos',
        'Análisis de comportamiento'
      ]
    },
    parameters: [
      { 
        name: 'uid', 
        type: 'string', 
        required: false, 
        description: 'UID del usuario (opcional para filtrar por usuario específico)',
        example: '12345678901'
      },
      { 
        name: 'fecha_inicio', 
        type: 'string', 
        required: false, 
        description: 'Fecha inicio del reporte en formato YYYY-MM-DD',
        example: '2024-01-01'
      },
      { 
        name: 'fecha_fin', 
        type: 'string', 
        required: false, 
        description: 'Fecha fin del reporte en formato YYYY-MM-DD',
        example: '2024-12-31'
      }
    ],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": [
    {
      "id_transaccion": 43426958,
      "fecha": "2024-01-15 14:30:00",
      "tipo": "acumulacion",
      "puntos": 500,
      "monto": 50000,
      "estado": "completada"
    }
  ]
}`
  },

  'anulacion': {
    id: 'anulacion',
    title: 'Anulación de Transacción',
    description: 'Anula una transacción previamente procesada y devuelve los puntos.',
    method: 'POST',
    endpoint: '/api/transacciones/anular',
    group: 'transacciones',
    tags: ['Anulación', 'Transacciones', 'Reversión'],
    overview: {
      summary: 'Sistema de reversión de transacciones y devolución de puntos',
      details: 'Permite anular transacciones erróneas y revertir los puntos otorgados o descontados.',
      useCases: [
        'Corrección de errores en facturación',
        'Devoluciones de productos',
        'Anulación de redenciones incorrectas'
      ]
    },
    parameters: [
      { 
        name: 'id_transaccion', 
        type: 'integer', 
        required: true, 
        description: 'ID de la transacción a anular',
        example: 43426958
      },
      { 
        name: 'motivo', 
        type: 'string', 
        required: true, 
        description: 'Motivo detallado de la anulación',
        example: 'Error en el monto de la factura'
      }
    ],
    requestExample: `{
  "id_transaccion": 43426958,
  "motivo": "Error en el monto de la factura"
}`,
    responseExample: `{
  "code": 100,
  "data": {
    "transaccion_anulada": true,
    "puntos_devueltos": 500,
    "nuevo_saldo": 1500
  }
}`
  },

  // ==========================================
  // CONFIGURACIÓN
  // ==========================================
  'sucursales': {
    id: 'sucursales',
    title: 'Sucursales Comercio',
    description: 'Servicio para consultar todas las sucursales activas de un comercio.',
    method: 'GET',
    endpoint: '/api/com_sucursales/sucursales_comercio/:idComercio',
    group: 'configuracion',
    tags: ['Configuración', 'Comercio', 'Sucursales'],
    overview: {
      summary: 'Consulta todas las sucursales activas de un comercio específico',
      details: 'Retorna información completa de todas las sucursales registradas y activas para un comercio determinado.',
      useCases: [
        'Listar sucursales disponibles en POS',
        'Configuración de aplicaciones multi-sucursal',
        'Validación de sucursales activas'
      ]
    },
    parameters: [
      { 
        name: 'idComercio', 
        type: 'integer', 
        required: true, 
        description: 'ID único del comercio registrado en Leal (path parameter)',
        example: 3
      }
    ],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": [
    {
      "id_sucursal": 908,
      "id_comercio": 3,
      "nombre": "Comercio Test Andino",
      "email": "andino@puntosleal.com",
      "direccion": "Ak. 11 #84–22",
      "estado": "activa",
      "cod_pais": "CO"
    }
  ]
}`
  },

  'config-paises': {
    id: 'config-paises',
    title: 'Cnf paises',
    description: 'Obtiene la configuración de países disponibles en el sistema.',
    method: 'GET',
    endpoint: '/api/cnf_paises',
    group: 'configuracion',
    tags: ['Configuración', 'Países', 'Localización'],
    overview: {
      summary: 'Configuración de países y monedas disponibles',
      details: 'Retorna la lista de países configurados en el sistema con sus códigos, monedas e indicadores telefónicos.',
      useCases: [
        'Configuración de formularios',
        'Validación de países',
        'Localización de aplicaciones'
      ]
    },
    parameters: [],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": [
    {
      "cod_pais": "CO",
      "pais": "Colombia",
      "indicador": 57,
      "moneda": "COP",
      "estado": 3
    }
  ]
}`
  },

  'config-ciudades': {
    id: 'config-ciudades',
    title: 'Cnf ciudades',
    description: 'Obtiene la configuración de ciudades disponibles por país.',
    method: 'GET',
    endpoint: '/api/cnf_ciudades/:codPais',
    group: 'configuracion',
    tags: ['Configuración', 'Ciudades', 'Localización'],
    overview: {
      summary: 'Configuración de ciudades por país',
      details: 'Retorna las ciudades disponibles para un país específico, útil para formularios y validaciones geográficas.',
      useCases: [
        'Formularios de registro',
        'Validación geográfica',
        'Configuración de envíos'
      ]
    },
    parameters: [
      { 
        name: 'codPais', 
        type: 'string', 
        required: true, 
        description: 'Código del país para consultar sus ciudades (path parameter)',
        example: 'CO'
      }
    ],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": [
    {
      "id_ciudad": 1,
      "ciudad": "Bogotá",
      "cod_pais": "CO",
      "estado": "activa"
    }
  ]
}`
  },

  'config-documentos': {
    id: 'config-documentos',
    title: 'Cnf Tipo Documento',
    description: 'Obtiene los tipos de documentos de identidad configurados en el sistema.',
    method: 'GET',
    endpoint: '/api/cnf_documentos',
    group: 'configuracion',
    tags: ['Configuración', 'Documentos', 'Identidad'],
    overview: {
      summary: 'Tipos de documentos de identidad disponibles',
      details: 'Retorna todos los tipos de documentos de identidad configurados para el registro y validación de usuarios.',
      useCases: [
        'Formularios de registro',
        'Validación de identidad',
        'Configuración de campos'
      ]
    },
    parameters: [],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": [
    {
      "id_tipo": 1,
      "tipo_documento": "Cédula de Ciudadanía",
      "codigo": "CC",
      "estado": "activo"
    }
  ]
}`
  },

  // ==========================================
  // PROMOCIONES Y PREMIOS
  // ==========================================
  'consultar-promociones': {
    id: 'consultar-promociones',
    title: 'Consultar promociones',
    description: 'Lista todas las promociones activas disponibles para el usuario.',
    method: 'GET',
    endpoint: '/api/promociones/consultar',
    group: 'promociones-premios',
    tags: ['Promociones', 'Ofertas', 'Marketing'],
    overview: {
      summary: 'Consulta de promociones y ofertas activas',
      details: 'Retorna todas las promociones vigentes disponibles para usuarios, con detalles de vigencia y condiciones.',
      useCases: [
        'Mostrar promociones disponibles',
        'Validar ofertas activas',
        'Configurar campañas de marketing'
      ]
    },
    parameters: [
      { 
        name: 'uid', 
        type: 'string', 
        required: false, 
        description: 'UID del usuario para personalizar promociones (opcional)',
        example: '12345678901'
      }
    ],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": [
    {
      "id_promocion": 1,
      "titulo": "2x1 en productos seleccionados",
      "descripcion": "Compra uno y lleva dos",
      "vigencia": "2024-12-31",
      "activa": true
    }
  ]
}`
  },

  'premios-homologados': {
    id: 'premios-homologados',
    title: 'Premios Homologados',
    description: 'Lista todos los premios disponibles para redención en el catálogo.',
    method: 'GET',
    endpoint: '/api/premios',
    group: 'promociones-premios',
    tags: ['Premios', 'Catálogo', 'Redención'],
    overview: {
      summary: 'Catálogo completo de premios disponibles para redención',
      details: 'Retorna todos los premios, descuentos y productos disponibles en el catálogo de redenciones del programa de lealtad.',
      useCases: [
        'Mostrar catálogo de premios',
        'Validar premios disponibles',
        'Configurar opciones de redención'
      ]
    },
    parameters: [],
    requestExample: `{}`,
    responseExample: `{
  "code": 100,
  "data": [
    {
      "id_premio": 1,
      "nombre": "Descuento 10%",
      "descripcion": "Descuento del 10% en tu próxima compra",
      "puntos_requeridos": 500,
      "categoria": "descuentos",
      "disponible": true
    }
  ]
}`
  },

  'generar-otp': {
    id: 'generar-otp',
    title: 'Generar OTP Redención',
    description: 'Genera un código OTP para validar redenciones de puntos y promociones.',
    method: 'POST',
    endpoint: '/api/otp/generate',
    group: 'promociones-premios',
    tags: ['OTP', 'Seguridad', 'Redención'],
    overview: {
      summary: 'Sistema de códigos de un solo uso para redenciones seguras',
      details: 'Genera códigos OTP temporales para validar redenciones de puntos, promociones y regalos de manera segura.',
      useCases: [
        'Validación de redenciones',
        'Seguridad en transacciones',
        'Confirmación de operaciones sensibles'
      ]
    },
    parameters: [
      { 
        name: 'uid', 
        type: 'string', 
        required: true, 
        description: 'UID único del usuario',
        example: '12345678901'
      },
      { 
        name: 'tipo_redencion', 
        type: 'string', 
        required: true, 
        description: 'Tipo de redención (puntos, promocion, regalo)',
        example: 'puntos'
      }
    ],
    requestExample: `{
  "uid": "12345678901",
  "tipo_redencion": "puntos"
}`,
    responseExample: `{
  "code": 100,
  "data": {
    "otp_code": "123456",
    "expires_in": 300,
    "message": "OTP generado exitosamente"
  }
}`
  }
};

// Función para obtener endpoint por ID
function getEndpointById(id) {
  return API_ENDPOINTS[id] || null;
}

// Función para obtener endpoints por grupo
function getEndpointsByGroup(groupId) {
  return Object.values(API_ENDPOINTS).filter(endpoint => endpoint.group === groupId);
}

// Función para obtener todos los endpoints
function getAllEndpoints() {
  return Object.values(API_ENDPOINTS);
}

// Función para obtener grupos
function getApiGroups() {
  return API_GROUPS;
}

// Exportar para uso global
window.API_DATA = {
  groups: API_GROUPS,
  endpoints: API_ENDPOINTS,
  getEndpointById,
  getEndpointsByGroup,
  getAllEndpoints,
  getApiGroups
};
