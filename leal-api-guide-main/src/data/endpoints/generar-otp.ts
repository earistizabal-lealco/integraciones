export const generarOtpEndpoint = {
  id: "generar-otp",
  title: "Generar OTP Redención",
  description: "Genera un código OTP para validar redenciones de puntos y promociones.",
  method: "POST" as const,
  endpoint: "/api/otp/generate",
  tags: ["OTP", "Seguridad", "Redención"],
  overview: {
    summary: "Sistema de códigos de un solo uso para redenciones seguras",
    details: "Genera códigos OTP temporales para validar redenciones de puntos, promociones y regalos de manera segura.",
    useCases: [
      "Validación de redenciones",
      "Seguridad en transacciones",
      "Confirmación de operaciones sensibles"
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
      name: "tipo_redencion", 
      type: "string", 
      required: true, 
      description: "Tipo de redención (puntos, promocion, regalo)",
      example: "puntos"
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
};