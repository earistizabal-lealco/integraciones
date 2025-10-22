export const refreshEndpoint = {
  id: "refresh",
  title: "Refresh Token",
  description: "Renueva el token de acceso usando el refresh token.",
  method: "POST" as const,
  endpoint: "/api/com_usuarios/refresh_token",
  tags: ["Autenticación", "Token", "Seguridad"],
  overview: {
    summary: "Renovación de tokens de acceso para mantener sesión activa",
    details: "Permite renovar el token JWT usando el refresh token para extender la sesión sin requerir nuevo login.",
    useCases: [
      "Renovar sesión expirada",
      "Mantener usuario logueado",
      "Gestión automática de tokens"
    ]
  },
  parameters: [
    { 
      name: "uid_cms", 
      type: "string", 
      required: true, 
      description: "UID único del usuario cajero con sesión",
      example: "97f4f7a7a49f7858f3fd9adde1abf88d"
    },
    { 
      name: "refresh_token", 
      type: "string", 
      required: true, 
      description: "Refresh token obtenido del login",
      example: "1688575486e5649d653b859e49f1b951d2b403eb9e"
    },
    { 
      name: "id_sucursal", 
      type: "integer", 
      required: true, 
      description: "ID de la sucursal",
      example: 0
    }
  ],
  requestExample: `{
  "uid_cms": "97f4f7a7a49f7858f3fd9adde1abf88d",
  "refresh_token": "1688575486e5649d653b859e49f1b951d2b403eb9e",
  "id_sucursal": 0
}`,
  responseExample: `{
  "code": 100,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "new_refresh_token_here"
}`
};