export const buscarUsuarioEndpoint = {
  id: "buscar-usuario",
  title: "Buscar Usuario",
  description: "Busca usuarios por diferentes criterios (documento, email, teléfono).",
  method: "GET" as const,
  endpoint: "/api/usuarios/search",
  tags: ["Usuarios", "Búsqueda", "Cliente"],
  overview: {
    summary: "Búsqueda flexible de usuarios en el sistema",
    details: "Permite encontrar usuarios utilizando diferentes criterios de búsqueda como documento, email o teléfono.",
    useCases: [
      "Búsqueda rápida en POS",
      "Validación de usuarios existentes",
      "Consulta de información de cliente"
    ]
  },
  parameters: [
    { 
      name: "criterio", 
      type: "string", 
      required: true, 
      description: "Documento, email o teléfono del usuario a buscar",
      example: "12345678 o usuario@email.com o 3001234567"
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
};