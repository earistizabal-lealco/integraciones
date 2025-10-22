export const premiosHomologadosEndpoint = {
  id: "premios-homologados",
  title: "Premios Homologados",
  description: "Lista todos los premios disponibles para redención en el catálogo.",
  method: "GET" as const,
  endpoint: "/api/premios",
  tags: ["Premios", "Catálogo", "Redención"],
  overview: {
    summary: "Catálogo completo de premios disponibles para redención",
    details: "Retorna todos los premios, descuentos y productos disponibles en el catálogo de redenciones del programa de lealtad.",
    useCases: [
      "Mostrar catálogo de premios",
      "Validar premios disponibles",
      "Configurar opciones de redención"
    ]
  },
  parameters: [],
  requestExample: `{}`,
  responseExample: `{
  "code": 100,
  "data": [
    {
      "id_premio": 1,
      "nombre": "Descuento 10%",
      "descripcion": "Descuento del 10% en tu próxima compra",
      "puntos_requeridos": 500,
      "categoria": "descuentos",
      "disponible": true
    }
  ]
}`
};