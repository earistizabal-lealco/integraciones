import { Search, Bell, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import lealLogo from "@/assets/leal-logo-final.png";

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ searchTerm = "", onSearchChange }: HeaderProps) {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={lealLogo} alt="Leal" className="w-8 h-8" />
            <span className="text-xl font-bold text-leal-gray">Leal API</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/docs" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === '/docs' ? 'text-primary' : ''
              }`}
            >
              Documentación
            </Link>
            <Link 
              to="/flow-generator" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === '/flow-generator' ? 'text-primary' : ''
              }`}
            >
              Generador IA
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar endpoints, descripciones..."
              className="w-80 pl-10"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
          <Button size="sm" className="gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </Button>
        </div>
      </div>
    </header>
  );
}