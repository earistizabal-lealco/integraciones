import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApiCardProps {
  title: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  tags: string[];
  onClick?: () => void;
}

const methodColors = {
  GET: "bg-green-500 hover:bg-green-600",
  POST: "bg-leal-yellow hover:bg-leal-yellow-dark", 
  PUT: "bg-orange-500 hover:bg-orange-600",
  DELETE: "bg-red-500 hover:bg-red-600",
};

export function ApiCard({ title, description, method, endpoint, tags, onClick }: ApiCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={cn("text-white font-medium", methodColors[method])}>
                {method}
              </Badge>
              <code className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                {endpoint}
              </code>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} className="text-xs bg-muted text-muted-foreground border-muted-foreground/20">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}