import type { ReactNode } from "react";
import { MoveLeft, Compass, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button/Button";
import { PATHS } from "../../app/router/paths";

export function NotFoundPage(): ReactNode {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* ILUSTRACIÓN / ICONO CENTRAL */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-primary/10 rounded-full" />
          <Compass
            className="w-16 h-16 text-primary animate-in zoom-in-50 duration-1000"
            strokeWidth={1.5}
          />

          {/* Badge de Alerta Flotante */}
          <div className="absolute -top-1 -right-1 bg-white p-1.5 rounded-md shadow-lg border border-border/40">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
        </div>

        {/* TEXTOS */}
        <div className="space-y-3">
          <h1 className="text-8xl font-black text-primary/10 select-none tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Parece que te has desviado del camino
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            No te preocupes, a veces perderse es parte del proceso. Respira
            profundo y volvamos a donde todo está bajo control.
          </p>
        </div>

        {/* ACCIONES */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto rounded-lg font-black text-[10px] uppercase tracking-widest h-12 border border-border/40"
          >
            <MoveLeft className="mr-2 w-4 h-4" /> Volver atrás
          </Button>

          <Button
            onClick={() => navigate(PATHS.HOME)}
            size="lg"
            className="w-full sm:w-auto rounded-lg font-black text-[10px] uppercase tracking-widest h-12 gradient-primary shadow-lg shadow-primary/20"
          >
            Ir al Inicio
          </Button>
        </div>

        {/* DECORACIÓN SUTIL DE FONDO */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-[120px] opacity-20 pointer-events-none">
          <div className="w-[300px] h-[300px] rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
