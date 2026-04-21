import { Brain, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../../components/ui/button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card/Card";
import { PATHS } from "../../app/router/paths";

export function LoginPage(): ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de login
    setTimeout(() => {
      setIsLoading(false);
      navigate(PATHS.ADMIN.DASHBOARD);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden font-sans">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-primary rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-foreground">
              PsiAgenda
            </span>
          </NavLink>
        </div>

        <Card className="border-none shadow-elevated overflow-hidden rounded-lg">
          <CardHeader className="pt-8 pb-4 text-center">
            <CardTitle className="text-2xl font-bold">
              Bienvenido de nuevo
            </CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu panel
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground ml-1">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-foreground">
                    Contraseña
                  </label>
                  <a
                    href="#"
                    className="text-xs font-medium text-primary hover:underline transition-all"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg h-12 text-base font-bold gradient-primary shadow-lg shadow-primary/20 mt-2"
                isLoading={isLoading}
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-8">
            <div className="relative w-full text-center py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <span className="relative bg-white px-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                O también
              </span>
            </div>

            <NavLink to={PATHS.REGISTER} className="w-full">
              <Button
                variant="outline"
                className="w-full rounded-lg h-12 font-bold border-2 border-primary/20 hover:border-primary/50"
              >
                Crear una cuenta nueva
              </Button>
            </NavLink>

            <NavLink
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium mt-2"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </NavLink>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
