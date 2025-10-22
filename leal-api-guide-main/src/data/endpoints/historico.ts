export const historicoEndpoint = {
  id: "historico",
  title: "Histórico Transacciones",
  description: "Obtiene el historial completo de transacciones de un usuario o comercio.",
  method: "GET" as const,
  endpoint: "/api/transacciones/historial",
  tags: ["Historial", "Transacciones", "Reportes"],
  overview: {
    summary: "Consulta completa del historial de transacciones",
    details: "Retorna el historial detallado de todas las transacciones, acumulaciones y redenciones.",
    useCases: [
      "Reportes de transacciones",
      "Auditoría de movimientos",
      "Análisis de comportamiento"
    ]
  },
  parameters: [
    { 
      name: "uid", 
      type: "string", 
      required: false, 
      description: "UID del usuario (opcional para filtrar por usuario específico)",
      example: "12345678901"
    },
    { 
      name: "fecha_inicio", 
      type: "string", 
      required: false, 
      description: "Fecha inicio del reporte en formato YYYY-MM-DD",
      example: "2024-01-01"
    },
    { 
      name: "fecha_fin", 
      type: "string", 
      required: false, 
      description: "Fecha fin del reporte en formato YYYY-MM-DD",
      example: "2024-12-31"
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
};