export const configDocumentosEndpoint = {
  id: "config-documentos",
  title: "Cnf Tipo Documento",
  description: "Obtiene los tipos de documentos de identidad configurados en el sistema.",
  method: "GET" as const,
  endpoint: "/api/cnf_documentos",
  tags: ["Configuración", "Documentos", "Identidad"],
  overview: {
    summary: "Tipos de documentos de identidad disponibles",
    details: "Retorna todos los tipos de documentos de identidad configurados para el registro y validación de usuarios.",
    useCases: [
      "Formularios de registro",
      "Validación de identidad",
      "Configuración de campos"
    ]
  },
  parameters: [],
  requestExample: `{}`,
  responseExample: `{
  "code": 100,
  "data": [
    {
      "id_tipo": 1,
      "tipo_documento": "Cédula de Ciudadanía",
      "codigo": "CC",
      "estado": "activo"
    }
  ]
}`
};