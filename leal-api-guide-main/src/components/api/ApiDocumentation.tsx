import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ExternalLink, AlertCircle, Play, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ApiDocumentationProps {
  title: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  tags: string[];
  overview?: {
    summary: string;
    details: string;
    useCases: string[];
  };
  requestExample?: string;
  responseExample?: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

const methodColors = {
  GET: "bg-green-500",
  POST: "bg-leal-yellow", 
  PUT: "bg-orange-500",
  DELETE: "bg-red-500",
};

export function ApiDocumentation({
  title,
  description,
  method,
  endpoint,
  tags,
  overview,
  requestExample,
  responseExample,
  parameters = []
}: ApiDocumentationProps) {
  const { toast } = useToast();
  const [testParams, setTestParams] = useState<Record<string, string>>({});

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Código copiado al portapapeles",
    });
  };

  const curlExample = `curl -X ${method} "https://testapi.puntosleal.com${endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN"${requestExample ? ` \\\n  -d '${requestExample}'` : ''}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge className={`${methodColors[method]} text-white font-medium`}>
            {method}
          </Badge>
          <code className="text-lg font-mono bg-muted px-3 py-1 rounded">
            {endpoint}
          </code>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {overview?.useCases?.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                )) || (
                  <li className="text-muted-foreground/50">No hay casos de uso disponibles</li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Try this endpoint button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-black hover:bg-gray-800 text-white gap-2 h-12">
                <Play className="h-4 w-4" />
                Try this endpoint
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Probar {title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Badge className={`${methodColors[method]} text-white`}>
                    {method}
                  </Badge>
                  <code className="font-mono text-sm">
                    https://testapi.puntosleal.com{endpoint}
                  </code>
                </div>
                
                {parameters.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Parámetros</h4>
                    {parameters.map((param) => (
                      <div key={param.name} className="space-y-1">
                        <Label htmlFor={param.name} className="flex items-center gap-2">
                          {param.name}
                          {param.required && <Badge variant="destructive" className="text-xs">Requerido</Badge>}
                        </Label>
                        <Input
                          id={param.name}
                          placeholder={param.description}
                          value={testParams[param.name] || ''}
                          onChange={(e) => setTestParams(prev => ({
                            ...prev,
                            [param.name]: e.target.value
                          }))}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Token de Autorización</Label>
                  <Input placeholder="Bearer token..." />
                </div>
                
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  Ejecutar Prueba
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Important Note */}
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-amber-900">Códigos de Respuesta Importantes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>100:</strong> Exitoso (ej: <code>{`{"code":100, "data":[...]}`}</code>)</p>
              <p><strong>120:</strong> Problema de autenticación (ej: <code>{`{"code":120,"message":"No tiene autorización"}`}</code>)</p>
              <p><strong>130:</strong> Parámetros faltantes (ej: <code>{`{"code":130,"message":"Falta campo requerido"}`}</code>)</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-6">
          {/* Parameters */}
          {parameters.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Parámetros</CardTitle>
                <CardDescription>Parámetros requeridos y opcionales para esta API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parameters.map((param) => (
                    <div key={param.name} className="border-l-2 border-l-muted pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                          {param.name}
                        </code>
                        <Badge variant={param.required ? "default" : "secondary"} className="text-xs">
                          {param.required ? "Requerido" : "Opcional"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{param.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{param.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">No hay parámetros para este endpoint.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          {/* cURL Example */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">cURL Example</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(curlExample)}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copiar
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{curlExample}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Request Example */}
          {requestExample && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Request Body</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(requestExample)}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copiar
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{JSON.stringify(JSON.parse(requestExample), null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          )}

          {/* Response Example */}
          {responseExample && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Response Example</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(responseExample)}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copiar
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{JSON.stringify(JSON.parse(responseExample), null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}