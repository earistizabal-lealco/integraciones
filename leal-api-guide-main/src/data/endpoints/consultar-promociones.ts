export const consultarPromocionesEndpoint = {
  id: "consultar-promociones",
  title: "Consultar promociones",
  description: "Lista todas las promociones activas disponibles para el usuario.",
  method: "GET" as const,
  endpoint: "/api/promociones/consultar",
  tags: ["Promociones", "Ofertas", "Marketing"],
  overview: {
    summary: "Consulta de promociones y ofertas activas",
    details: "Retorna todas las promociones vigentes disponibles para usuarios, con detalles de vigencia y condiciones.",
    useCases: [
      "Mostrar promociones disponibles",
      "Validar ofertas activas",
      "Configurar campañas de marketing"
    ]
  },
  parameters: [
    { 
      name: "uid", 
      type: "string", 
      required: false, 
      description: "UID del usuario para personalizar promociones (opcional)",
      example: "12345678901"
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
};