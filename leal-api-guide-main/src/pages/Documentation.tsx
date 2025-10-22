import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ApiGrid } from "@/components/api/ApiGrid";
import { ApiDocumentation } from "@/components/api/ApiDocumentation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles } from "lucide-react";
import heroBanner from "@/assets/api-hero-banner.jpg";
import { getEndpointDetails } from "@/data/endpoints";

export default function Documentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (selectedEndpoint) {
    const config = getEndpointDetails(selectedEndpoint);
    return (
      <div className="min-h-screen bg-background">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="flex">
          <Sidebar onEndpointSelect={setSelectedEndpoint} />
          <main className="flex-1 p-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedEndpoint(null)}
              className="mb-6"
            >
              ← Volver a la documentación
            </Button>
            <ApiDocumentation
              title={config.title}
              description={config.description}
              method={config.method}
              endpoint={config.endpoint}
              tags={config.tags}
              overview={config.overview}
              parameters={config.parameters}
              requestExample={config.requestExample}
              responseExample={config.responseExample}
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="flex">
        <Sidebar onEndpointSelect={setSelectedEndpoint} />
        <main className="flex-1 p-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative mb-8 rounded-xl overflow-hidden bg-black h-48 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                  API de Puntos Leal
                </h1>
                <p className="text-xl max-w-2xl">
                  APIs completas para gestión de puntos, redenciones y programa de fidelización para retail moderno
                </p>
              </div>
            </div>
            
            {/* AI Assistant Card */}
            <Card className="max-w-4xl mx-auto mb-8 border-leal-yellow/20 bg-gradient-to-r from-leal-yellow/5 to-leal-yellow/10">
              <CardHeader>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-leal-yellow" />
                  <CardTitle className="text-leal-gray">Asistente IA</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Cuéntame qué quieres construir y te recomendaré los endpoints correctos de Leal y te explicaré cómo usarlos para tu plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <input 
                    type="text" 
                    placeholder="ej. Quiero implementar un sistema de puntos para mi app de e-commerce, o necesito validar redenciones en mi POS..."
                    className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-leal-yellow/50 focus:border-leal-yellow"
                  />
                  <Button className="bg-leal-yellow hover:bg-leal-yellow-dark text-leal-gray font-medium gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Obtener Recomendaciones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Grid */}
          <ApiGrid onEndpointSelect={setSelectedEndpoint} searchTerm={searchTerm} />

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Base URL</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="bg-muted px-3 py-2 rounded text-sm block">
                  https://testapi.puntosleal.com
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Autenticación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bearer Token JWT obtenido del endpoint de login
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate Limiting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  1000 requests por minuto por API key
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}