export const loginEndpoint = {
  id: "login",
  title: "Login de Usuario",
  description: "Autenticación de usuarios del sistema comercial. Retorna token de acceso JWT y refresh token para mantener la sesión activa.",
  method: "POST" as const,
  endpoint: "/api/com_usuarios/login",
  tags: ["Autenticación", "Seguridad", "JWT", "Comercio"],
  overview: {
    summary: "Servicio para autenticar usuarios del sistema comercial",
    details: "Este endpoint permite la autenticación de cajeros y administradores del comercio, retornando un token JWT para acceder a los demás servicios del API.",
    useCases: [
      "Autenticación de cajeros en POS",
      "Login de administradores del comercio",
      "Obtención de tokens para acceso a API"
    ]
  },
  parameters: [
    { 
      name: "usuario", 
      type: "string", 
      required: true, 
      description: "Nombre de usuario del cajero o administrador del comercio",
      example: "cajero01"
    },
    { 
      name: "contrasena", 
      type: "string", 
      required: true, 
      description: "Contraseña del usuario",
      example: "mi_password_seguro"
    }
  ],
  requestExample: `{
  "usuario": "cajero01",
  "contrasena": "mi_password_seguro"
}`,
  responseExample: `{
  "code": 100,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "16109838266d6ceec26395b98025....",
  "id_rol": 2,
  "plataforma": "CAP"
}`
};