export const anulacionEndpoint = {
  id: "anulacion",
  title: "Anulación de Transacción",
  description: "Anula una transacción previamente procesada y devuelve los puntos.",
  method: "POST" as const,
  endpoint: "/api/transacciones/anular",
  tags: ["Anulación", "Transacciones", "Reversión"],
  overview: {
    summary: "Sistema de reversión de transacciones y devolución de puntos",
    details: "Permite anular transacciones erróneas y revertir los puntos otorgados o descontados.",
    useCases: [
      "Corrección de errores en facturación",
      "Devoluciones de productos",
      "Anulación de redenciones incorrectas"
    ]
  },
  parameters: [
    { 
      name: "id_transaccion", 
      type: "integer", 
      required: true, 
      description: "ID de la transacción a anular",
      example: 43426958
    },
    { 
      name: "motivo", 
      type: "string", 
      required: true, 
      description: "Motivo detallado de la anulación",
      example: "Error en el monto de la factura"
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
};