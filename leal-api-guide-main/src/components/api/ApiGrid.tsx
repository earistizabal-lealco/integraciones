import { useState } from "react";
import { ApiCard } from "./ApiCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ApiEndpoint {
  id: string;
  title: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  tags: string[];
  category: string;
}

const apiEndpoints: ApiEndpoint[] = [
  {
    id: "login",
    title: "Login",
    description: "Autenticación de usuarios del sistema. Retorna token de acceso y refresh token.",
    method: "POST",
    endpoint: "/api/com_usuarios/login",
    tags: ["Autenticación", "Seguridad", "JWT"],
    category: "authentication"
  },
  {
    id: "me",
    title: "Información del Usuario",
    description: "Obtiene la información del usuario autenticado actual.",
    method: "GET",
    endpoint: "/api/me",
    tags: ["Usuario", "Perfil", "Autenticación"],
    category: "authentication"
  },
  {
    id: "refresh",
    title: "Refresh Token",
    description: "Renueva el token de acceso usando el refresh token.",
    method: "POST",
    endpoint: "/api/refresh",
    tags: ["Autenticación", "Token", "Seguridad"],
    category: "authentication"
  },
  {
    id: "sucursales",
    title: "Sucursales Comercio",
    description: "Lista todas las sucursales disponibles para un comercio específico.",
    method: "GET",
    endpoint: "/api/sucursales",
    tags: ["Configuración", "Comercio", "Sucursales"],
    category: "config"
  },
  {
    id: "cargar-factura",
    title: "Cargar Factura",
    description: "Registra una nueva factura en el sistema para generar puntos.",
    method: "POST",
    endpoint: "/api/facturas",
    tags: ["Facturación", "Puntos", "Transacciones"],
    category: "points"
  },
  {
    id: "buscar-usuario",
    title: "Buscar Usuario",
    description: "Busca usuarios por diferentes criterios (documento, email, teléfono).",
    method: "GET",
    endpoint: "/api/usuarios/search",
    tags: ["Usuarios", "Búsqueda", "Cliente"],
    category: "users"
  },
  {
    id: "generar-otp",
    title: "Generar OTP Redención",
    description: "Genera un código OTP para validar redenciones de puntos y promociones.",
    method: "POST",
    endpoint: "/api/otp/generate",
    tags: ["OTP", "Seguridad", "Redención"],
    category: "rewards"
  },
  {
    id: "premios-homologados",
    title: "Premios Homologados",
    description: "Lista todos los premios disponibles para redención en el catálogo.",
    method: "GET",
    endpoint: "/api/premios",
    tags: ["Premios", "Catálogo", "Redención"],
    category: "rewards"
  },
  {
    id: "redimir-puntos",
    title: "Redimir Puntos",
    description: "Procesa la redención de puntos por productos o servicios específicos.",
    method: "POST",
    endpoint: "/api/redenciones/puntos",
    tags: ["Redención", "Puntos", "Transacciones"],
    category: "points"
  },
  {
    id: "redimir-promociones",
    title: "Redimir Promociones",
    description: "Aplica promociones especiales disponibles para el usuario.",
    method: "POST",
    endpoint: "/api/redenciones/promociones",
    tags: ["Promociones", "Descuentos", "Redención"],
    category: "rewards"
  },
  {
    id: "anulacion",
    title: "Anulación de Transacción",
    description: "Anula una transacción previamente procesada y devuelve los puntos.",
    method: "POST",
    endpoint: "/api/transacciones/anular",
    tags: ["Anulación", "Transacciones", "Reversión"],
    category: "transactions"
  },
  {
    id: "historico",
    title: "Histórico Transacciones", 
    description: "Obtiene el historial completo de transacciones de un usuario o comercio.",
    method: "GET",
    endpoint: "/api/transacciones/historial",
    tags: ["Historial", "Transacciones", "Reportes"],
    category: "transactions"
  },
  {
    id: "historial-transacciones",
    title: "Histórico Transacciones",
    description: "Obtiene el historial completo de transacciones de un usuario o comercio.",
    method: "GET", 
    endpoint: "/api/transacciones/historial",
    tags: ["Historial", "Transacciones", "Reportes"],
    category: "transactions"
  },
  {
    id: "anular-transaccion",
    title: "Anulación de transacción",
    description: "Anula una transacción previamente procesada y devuelve los puntos.",
    method: "POST",
    endpoint: "/api/transacciones/anular", 
    tags: ["Anulación", "Transacciones", "Reversión"],
    category: "transactions"
  },
  {
    id: "consultar-pin",
    title: "Consultar PIN",
    description: "Consulta y valida el PIN de una transacción específica.",
    method: "POST",
    endpoint: "/api/transacciones/pin",
    tags: ["PIN", "Validación", "Seguridad"],
    category: "transactions"
  },
  {
    id: "registro-usuarios",
    title: "Registrar usuarios",
    description: "Registra un nuevo usuario en el sistema de puntos Leal.",
    method: "POST",
    endpoint: "/api/usuarios/register",
    tags: ["Registro", "Usuarios", "Onboarding"],
    category: "users"
  },
  {
    id: "usuario-uid",
    title: "Consultar x UID",
    description: "Consulta información de un usuario específico por su UID.",
    method: "GET",
    endpoint: "/api/usuarios/uid",
    tags: ["Usuarios", "UID", "Consulta"],
    category: "users"
  },
  {
    id: "redimir-regalos",
    title: "Redimir Regalos",
    description: "Procesa la redención de regalos del catálogo de premios.",
    method: "POST",
    endpoint: "/api/redenciones/regalos",
    tags: ["Regalos", "Redención", "Premios"],
    category: "rewards"
  },
  {
    id: "redimir-legacy",
    title: "Redimir legacy",
    description: "Procesa redenciones del sistema legacy para migración.",
    method: "POST",
    endpoint: "/api/redenciones/legacy",
    tags: ["Legacy", "Migración", "Redención"],
    category: "points"
  },
  {
    id: "config-paises",
    title: "Cnf paises",
    description: "Obtiene la configuración de países disponibles en el sistema.",
    method: "GET",
    endpoint: "/api/config/paises",
    tags: ["Configuración", "Países", "Localización"],
    category: "config"
  },
  {
    id: "config-ciudades",
    title: "Cnf ciudades", 
    description: "Obtiene la configuración de ciudades disponibles por país.",
    method: "GET",
    endpoint: "/api/config/ciudades",
    tags: ["Configuración", "Ciudades", "Localización"],
    category: "config"
  },
  {
    id: "config-documentos",
    title: "Cnf Tipo Documento",
    description: "Obtiene los tipos de documentos de identidad configurados.",
    method: "GET",
    endpoint: "/api/config/documentos",
    tags: ["Configuración", "Documentos", "Identidad"],
    category: "config"
  },
  {
    id: "consultar-promociones",
    title: "Consultar promociones",
    description: "Lista todas las promociones activas disponibles para el usuario.",
    method: "GET",
    endpoint: "/api/promociones/consultar",
    tags: ["Promociones", "Ofertas", "Marketing"],
    category: "rewards"
  }
];

const categories = [
  { value: "all", label: "Todas las categorías" },
  { value: "authentication", label: "Autenticación" },
  { value: "users", label: "Usuarios" },
  { value: "points", label: "Puntos" },
  { value: "rewards", label: "Premios y Promociones" },
  { value: "transactions", label: "Transacciones" },
  { value: "config", label: "Configuración" }
];

interface ApiGridProps {
  onEndpointSelect?: (endpointId: string) => void;
  searchTerm?: string;
}

export function ApiGrid({ onEndpointSelect, searchTerm: externalSearchTerm }: ApiGridProps) {
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Use external search term if provided, otherwise use internal
  const searchTerm = externalSearchTerm !== undefined ? externalSearchTerm : internalSearchTerm;

  const filteredEndpoints = apiEndpoints.filter((endpoint) => {
    const matchesSearch = endpoint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || endpoint.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar endpoints, descripciones o tags..."
            value={searchTerm}
            onChange={(e) => externalSearchTerm !== undefined ? undefined : setInternalSearchTerm(e.target.value)}
            className="pl-10"
            disabled={externalSearchTerm !== undefined}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEndpoints.map((endpoint) => (
          <ApiCard
            key={endpoint.id}
            title={endpoint.title}
            description={endpoint.description}
            method={endpoint.method}
            endpoint={endpoint.endpoint}
            tags={endpoint.tags}
            onClick={() => {
              onEndpointSelect?.(endpoint.id);
            }}
          />
        ))}
      </div>

      {filteredEndpoints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron endpoints que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}