export const redimirPromocionesEndpoint = {
  id: "redimir-promociones",
  title: "Redimir Promociones",
  description: "Aplica promociones especiales disponibles para el usuario.",
  method: "POST" as const,
  endpoint: "/api/redenciones/promociones",
  tags: ["Promociones", "Descuentos", "Redención"],
  overview: {
    summary: "Aplicación de promociones especiales y ofertas",
    details: "Permite redimir promociones específicas como 2x1, descuentos especiales u ofertas limitadas.",
    useCases: [
      "Aplicar promociones 2x1",
      "Descuentos especiales",
      "Ofertas por tiempo limitado"
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
      name: "id_promocion", 
      type: "integer", 
      required: true, 
      description: "ID de la promoción a redimir",
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
};