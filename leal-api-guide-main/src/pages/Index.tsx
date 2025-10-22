import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Bot, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import lealLogo from "@/assets/leal-logo-final.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <img src={lealLogo} alt="Leal" className="w-16 h-16 mr-4" />
            <h1 className="text-5xl font-bold text-foreground">
              Leal API
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Documentación completa de la API de Leal - Sistema de puntos de lealtad. 
            Explora endpoints, genera flujos automáticamente con IA y empieza a integrar.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Documentación API
                </CardTitle>
                <CardDescription className="text-left">
                  Explora todos los endpoints disponibles, ejemplos de código, parámetros y respuestas detalladas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/docs">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Ver Documentación
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Bot className="h-6 w-6 text-primary" />
                  Generador con IA
                </CardTitle>
                <CardDescription className="text-left">
                  Describe lo que quieres hacer en lenguaje natural y obtén guías técnicas paso a paso automáticamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/flow-generator">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Generar Flujo IA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">¿Cómo empezar?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">Explora la API</h3>
                <p className="text-sm text-muted-foreground">
                  Revisa los endpoints disponibles en la documentación para familiarizarte con las funcionalidades.
                </p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">Genera tu flujo</h3>
                <p className="text-sm text-muted-foreground">
                  Usa el generador IA para obtener guías técnicas personalizadas según tu caso de uso específico.
                </p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">Implementa</h3>
                <p className="text-sm text-muted-foreground">
                  Sigue las guías paso a paso y comienza a integrar el sistema de puntos Leal en tu aplicación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
