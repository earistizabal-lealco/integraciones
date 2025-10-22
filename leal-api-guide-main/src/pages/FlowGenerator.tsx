import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Bot, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { endpointConfigs } from "@/data/endpoints";
import { Header } from "@/components/layout/Header";
import { supabase } from "@/integrations/supabase/client";

interface FlowStep {
  step: number;
  title: string;
  endpoint: string;
  method: string;
  description: string;
  parameters: string[];
  purpose: string;
}

interface GeneratedFlow {
  title: string;
  description: string;
  steps: FlowStep[];
}

const FlowGenerator = () => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedFlow, setGeneratedFlow] = useState<GeneratedFlow | null>(null);
  const { toast } = useToast();

  const generateFlow = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa una descripción de lo que quieres hacer.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Crear contexto con todos los endpoints disponibles
      const endpointsContext = Object.entries(endpointConfigs).map(([key, config]) => ({
        id: key,
        title: config.title,
        method: config.method,
        endpoint: config.endpoint,
        description: config.description,
        tags: config.tags,
        parameters: config.parameters?.map(p => `${p.name} (${p.type}) - ${p.description}`) || [],
        useCases: config.overview?.useCases || []
      }));

      const { data, error } = await supabase.functions.invoke('generate-flow', {
        body: {
          userInput,
          endpointsContext
        }
      });

      if (error) {
        throw error;
      }
      
      setGeneratedFlow(data);
      
      toast({
        title: "Flujo generado exitosamente",
        description: "Tu guía técnica está lista.",
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al generar el flujo. Verifica la configuración.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Generador de Flujos con IA
            </h1>
            <p className="text-xl text-muted-foreground">
              Describe lo que quieres hacer y obtén una guía técnica paso a paso
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Describe tu necesidad
              </CardTitle>
              <CardDescription>
                Ejemplo: "Quiero que mis usuarios rediman puntos" o "Necesito saber cuántos puntos tiene un usuario"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ej. Quiero permitir que mis usuarios rediman puntos por productos..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[100px]"
              />
              
              <Button 
                onClick={generateFlow} 
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando flujo...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Generar Flujo con IA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedFlow && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  {generatedFlow.title}
                </CardTitle>
                <CardDescription>
                  {generatedFlow.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedFlow.steps.map((step, index) => (
                    <div key={index} className="relative">
                      {index < generatedFlow.steps.length - 1 && (
                        <div className="absolute left-4 top-12 w-0.5 h-16 bg-border"></div>
                      )}
                      
                      <Card className="ml-0">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="font-semibold text-lg">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {step.method}
                                </Badge>
                                <code className="text-sm bg-muted px-2 py-1 rounded">
                                  {step.endpoint}
                                </code>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-sm mb-2">Propósito:</h4>
                                <p className="text-sm text-muted-foreground">{step.purpose}</p>
                              </div>
                              
                              {step.parameters.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Parámetros:</h4>
                                  <ul className="text-sm space-y-1">
                                    {step.parameters.map((param, paramIndex) => (
                                      <li key={paramIndex} className="flex items-center gap-2">
                                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                        <code className="bg-muted px-1 rounded text-xs">{param}</code>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowGenerator;