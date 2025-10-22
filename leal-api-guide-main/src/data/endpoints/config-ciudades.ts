export const configCiudadesEndpoint = {
  id: "config-ciudades",
  title: "Cnf ciudades",
  description: "Obtiene la configuración de ciudades disponibles por país.",
  method: "GET" as const,
  endpoint: "/api/cnf_ciudades/:codPais",
  tags: ["Configuración", "Ciudades", "Localización"],
  overview: {
    summary: "Configuración de ciudades por país",
    details: "Retorna las ciudades disponibles para un país específico, útil para formularios y validaciones geográficas.",
    useCases: [
      "Formularios de registro",
      "Validación geográfica",
      "Configuración de envíos"
    ]
  },
  parameters: [
    { 
      name: "codPais", 
      type: "string", 
      required: true, 
      description: "Código del país para consultar sus ciudades (path parameter)",
      example: "CO"
    }
  ],
  requestExample: `{}`,
  responseExample: `{
  "code": 100,
  "data": [
    {
      "id_ciudad": 1,
      "ciudad": "Bogotá",
      "cod_pais": "CO",
      "estado": "activa"
    }
  ]
}`
};