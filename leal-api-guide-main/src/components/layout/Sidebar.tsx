import { useState } from "react";
import { ChevronDown, Shield, CreditCard, Gift, Users, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: { title: string; path: string; method?: string }[];
  path?: string;
}

const navigationItems: NavItem[] = [
  {
    title: "Autenticación",
    icon: Shield,
    items: [
      { title: "Login", path: "login", method: "POST" },
      { title: "Refresh Token", path: "refresh", method: "POST" },
      { title: "Me", path: "me", method: "GET" },
    ],
  },
  {
    title: "Usuarios",
    icon: Users,
    items: [
      { title: "Registrar usuarios", path: "registro-usuarios", method: "POST" },
      { title: "Buscar usuario", path: "buscar-usuario", method: "GET" },
      { title: "Consultar x UID", path: "usuario-uid", method: "GET" },
    ],
  },
  {
    title: "Puntos y Redenciones",
    icon: Gift,
    items: [
      { title: "Cargar factura", path: "cargar-factura", method: "POST" },
      { title: "Redimir puntos", path: "redimir-puntos", method: "POST" },
      { title: "Redimir Promociones", path: "redimir-promociones", method: "POST" },
      { title: "Redimir Regalos", path: "redimir-regalos", method: "POST" },
      { title: "Redimir legacy", path: "redimir-legacy", method: "POST" },
    ],
  },
  {
    title: "Transacciones",
    icon: CreditCard,
    items: [
      { title: "Histórico Transacciones", path: "historial-transacciones", method: "GET" },
      { title: "Anulación de transacción", path: "anular-transaccion", method: "POST" },
      { title: "Consultar PIN", path: "consultar-pin", method: "POST" },
    ],
  },
  {
    title: "Configuración",
    icon: Settings,
    items: [
      { title: "Sucursales comercio", path: "sucursales", method: "GET" },
      { title: "Cnf paises", path: "config-paises", method: "GET" },
      { title: "Cnf ciudades", path: "config-ciudades", method: "GET" },
      { title: "Cnf Tipo Documento", path: "config-documentos", method: "GET" },
    ],
  },
  {
    title: "Promociones y Premios",
    icon: BarChart3,
    items: [
      { title: "Consultar promociones", path: "consultar-promociones", method: "GET" },
      { title: "Premios homologados", path: "premios-homologados", method: "GET" },
      { title: "Generar OTP Redención", path: "generar-otp", method: "POST" },
    ],
  },
];

interface SidebarProps {
  onEndpointSelect?: (endpointId: string) => void;
}

export function Sidebar({ onEndpointSelect }: SidebarProps) {
  const [openItems, setOpenItems] = useState<string[]>(["Autenticación"]);

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const getMethodColor = (method?: string) => {
    switch (method) {
      case "GET":
        return "text-green-600 bg-green-50";
      case "POST":
        return "text-leal-gray bg-leal-yellow/20";
      case "PUT":
        return "text-orange-600 bg-orange-50";
      case "DELETE":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="w-80 h-screen bg-card border-r overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">API Reference</h2>
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Collapsible
              key={item.title}
              open={openItems.includes(item.title)}
              onOpenChange={() => toggleItem(item.title)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-muted"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openItems.includes(item.title) && "rotate-180"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-6 mt-1">
                {item.items?.map((subItem) => (
                  <Button
                    key={subItem.title}
                    variant="ghost"
                    className="w-full justify-start text-sm h-8 hover:bg-muted"
                    onClick={() => {
                      // Use the path directly as endpoint ID since we've updated the paths to match
                      onEndpointSelect?.(subItem.path);
                    }}
                  >
                    {subItem.method && (
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium mr-2",
                        getMethodColor(subItem.method)
                      )}>
                        {subItem.method}
                      </span>
                    )}
                    <span className="truncate">{subItem.title}</span>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>
      </div>
    </div>
  );
}