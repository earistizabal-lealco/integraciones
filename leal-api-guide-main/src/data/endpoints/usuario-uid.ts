export const usuarioUidEndpoint = {
  id: "usuario-uid",
  title: "Consultar x UID",
  description: "Consulta información completa de un usuario específico por su UID.",
  method: "GET" as const,
  endpoint: "/api/usuarios/uid",
  tags: ["Usuarios", "UID", "Consulta"],
  overview: {
    summary: "Consulta detallada de usuario por identificador único",
    details: "Retorna toda la información disponible de un usuario específico usando su UID único.",
    useCases: [
      "Verificación de datos de usuario",
      "Consulta de saldo de puntos",
      "Validación de estado de cuenta"
    ]
  },
  parameters: [
    { 
      name: "uid", 
      type: "string", 
      required: true, 
      description: "UID único del usuario en el sistema",
      example: "12345678901"
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
};