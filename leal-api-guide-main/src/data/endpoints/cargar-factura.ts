export const cargarFacturaEndpoint = {
  id: "cargar-factura",
  title: "Cargar Factura",
  description: "Registra una nueva factura en el sistema para generar puntos al usuario.",
  method: "POST" as const,
  endpoint: "/api/usu_historial_puntos/cargar_factura/:idComercio",
  tags: ["Facturación", "Puntos", "Transacciones"],
  overview: {
    summary: "Procesa facturas de venta y genera puntos para usuarios",
    details: "Endpoint principal para registrar transacciones de venta y otorgar puntos a usuarios del programa de lealtad.",
    useCases: [
      "Integración con sistemas POS",
      "Acumulación automática de puntos",
      "Registro de transacciones de venta"
    ]
  },
  parameters: [
    { 
      name: "idComercio", 
      type: "integer", 
      required: true, 
      description: "ID único del comercio registrado en Leal (path parameter)",
      example: 3
    },
    { 
      name: "criterio", 
      type: "string", 
      required: true, 
      description: "Documento de usuario final sin espacios",
      example: "12345678"
    },
    { 
      name: "totalAcum", 
      type: "number", 
      required: true, 
      description: "Total valor que para acumular",
      example: 10000
    },
    { 
      name: "uid", 
      type: "string", 
      required: false, 
      description: "ID único del usuario en plataforma Leal (opcional)",
      example: "usuario_uid_aqui"
    },
    { 
      name: "transaccion", 
      type: "object", 
      required: true, 
      description: "Detalles completos de la factura",
      example: { 
        clave: "FDV-1238",
        noFactura: "FDV-1238",
        fecha: "2023-08-26 21:05:48",
        items: []
      }
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
};