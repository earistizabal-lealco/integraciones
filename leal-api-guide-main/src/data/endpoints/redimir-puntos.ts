export const redimirPuntosEndpoint = {
  id: "redimir-puntos",
  title: "Redimir Puntos",
  description: "Procesa la redención de puntos por productos o servicios específicos.",
  method: "POST" as const,
  endpoint: "/api/redenciones/puntos",
  tags: ["Redención", "Puntos", "Transacciones"],
  overview: {
    summary: "Procesamiento de redenciones de puntos por premios",
    details: "Endpoint para ejecutar redenciones de puntos acumulados por premios específicos del catálogo.",
    useCases: [
      "Redención en POS",
      "Canje de puntos por productos",
      "Aplicación de descuentos"
    ]
  },
  parameters: [
    { 
      name: "uid", 
      type: "string", 
      required: true, 
      description: "UID único del usuario",
      example: "12345678901"
    },
    { 
      name: "puntos", 
      type: "number", 
      required: true, 
      description: "Cantidad de puntos a redimir",
      example: 500
    },
    { 
      name: "id_premio", 
      type: "integer", 
      required: true, 
      description: "ID del premio seleccionado",
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
};