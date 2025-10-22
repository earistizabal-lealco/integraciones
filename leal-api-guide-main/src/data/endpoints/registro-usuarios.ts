export const registroUsuariosEndpoint = {
  id: "registro-usuarios",
  title: "Registrar Usuarios",
  description: "Registra un nuevo usuario en el sistema de puntos Leal.",
  method: "POST" as const,
  endpoint: "/api/usuarios/register",
  tags: ["Registro", "Usuarios", "Onboarding"],
  overview: {
    summary: "Registro de nuevos usuarios en el programa de lealtad",
    details: "Permite registrar nuevos usuarios en el sistema con sus datos básicos y asignación de puntos de bienvenida.",
    useCases: [
      "Registro desde POS",
      "Onboarding de nuevos clientes",
      "Creación de cuentas desde apps"
    ]
  },
  parameters: [
    { 
      name: "nombre", 
      type: "string", 
      required: true, 
      description: "Nombre completo del usuario",
      example: "Juan Pérez"
    },
    { 
      name: "email", 
      type: "string", 
      required: true, 
      description: "Correo electrónico del usuario",
      example: "juan@email.com"
    },
    { 
      name: "telefono", 
      type: "string", 
      required: true, 
      description: "Número de teléfono del usuario",
      example: "3001234567"
    },
    { 
      name: "documento", 
      type: "string", 
      required: true, 
      description: "Documento de identidad único",
      example: "12345678"
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
};