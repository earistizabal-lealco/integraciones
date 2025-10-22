export const configPaisesEndpoint = {
  id: "config-paises",
  title: "Cnf paises",
  description: "Obtiene la configuración de países disponibles en el sistema.",
  method: "GET" as const,
  endpoint: "/api/cnf_paises",
  tags: ["Configuración", "Países", "Localización"],
  overview: {
    summary: "Configuración de países y monedas disponibles",
    details: "Retorna la lista de países configurados en el sistema con sus códigos, monedas e indicadores telefónicos.",
    useCases: [
      "Configuración de formularios",
      "Validación de países",
      "Localización de aplicaciones"
    ]
  },
  parameters: [],
  requestExample: `{}`,
  responseExample: `{
  "code": 100,
  "data": [
    {
      "cod_pais": "CO",
      "pais": "Colombia",
      "indicador": 57,
      "moneda": "COP",
      "estado": 3
    }
  ]
}`
};