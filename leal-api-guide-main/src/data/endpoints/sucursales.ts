export const sucursalesEndpoint = {
  id: "sucursales",
  title: "Sucursales Comercio",
  description: "Servicio para consultar todas las sucursales activas de un comercio.",
  method: "GET" as const,
  endpoint: "/api/com_sucursales/sucursales_comercio/:idComercio",
  tags: ["Configuración", "Comercio", "Sucursales"],
  overview: {
    summary: "Consulta todas las sucursales activas de un comercio específico",
    details: "Retorna información completa de todas las sucursales registradas y activas para un comercio determinado.",
    useCases: [
      "Listar sucursales disponibles en POS",
      "Configuración de aplicaciones multi-sucursal",
      "Validación de sucursales activas"
    ]
  },
  parameters: [
    { 
      name: "idComercio", 
      type: "integer", 
      required: true, 
      description: "ID único del comercio registrado en Leal (path parameter)",
      example: 3
    }
  ],
  requestExample: `{}`,
  responseExample: `{
  "code": 100,
  "data": [
    {
      "id_sucursal": 908,
      "id_comercio": 3,
      "nombre": "Comercio Test Andino",
      "email": "andino@puntosleal.com",
      "direccion": "Ak. 11 #84–22",
      "estado": "activa",
      "cod_pais": "CO"
    }
  ]
}`
};