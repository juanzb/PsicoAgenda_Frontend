import {
  X,
  AlertTriangle,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../button/Button";

export type TActionVariant = "danger" | "info" | "success" | "warning";

type TActionModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  variant?: TActionVariant;
  actionLabel?: string;
  onAction: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export function ActionModal({
  isOpen,
  title,
  description,
  variant = "info",
  actionLabel = "Confirmar",
  onAction,
  onCancel,
  isLoading = false,
}: TActionModalProps): ReactNode {
  if (!isOpen) return null;

  // Mapeo de estilos por variante para el icono y el botón
  const variantConfig: Record<
    TActionVariant,
    {
      icon: ReactNode;
      bgIcon: string;
      btnVariant: "primary" | "secondary" | "destructive" | "ghost" | "link" | "outline";
      btnClass?: string;
    }
  > = {
    danger: {
      icon: <AlertCircle className="text-destructive" size={24} />,
      bgIcon: "bg-destructive/10",
      btnVariant: "destructive" as const,
      btnClass: "",
    },
    warning: {
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      bgIcon: "bg-amber-500/10",
      btnVariant: "primary" as const, // Podríamos añadir una variante 'warning' al Button si fuera necesario
      btnClass: "bg-amber-500 hover:bg-amber-600 border-none shadow-amber-500/20",
    },
    success: {
      icon: <CheckCircle2 className="text-primary" size={24} />,
      bgIcon: "bg-primary/10",
      btnVariant: "primary" as const,
      btnClass: "",
    },
    info: {
      icon: <Info className="text-blue-500" size={24} />,
      bgIcon: "bg-blue-500/10",
      btnVariant: "primary" as const,
      btnClass: "bg-blue-500 hover:bg-blue-600 border-none shadow-blue-500/20",
    },
  };

  const currentVariant = variantConfig[variant];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop con Blur */}
      <div
        className="absolute inset-0 bg-sidebar/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onCancel}
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-md bg-background rounded-3xl shadow-elevated border border-border overflow-hidden animate-in fade-in scale-in duration-300">
        {/* Header con botón de cerrar */}
        <div className="flex justify-end p-4 absolute right-0 top-0 z-10">
          <button
            onClick={onCancel}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {/* Icono y Título */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div
              className={`w-16 h-16 ${currentVariant.bgIcon} rounded-2xl flex items-center justify-center mb-2`}
            >
              {currentVariant.icon}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              variant="secondary"
              className="flex-1 rounded-2xl h-12"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant={currentVariant.btnVariant}
              className={`flex-1 rounded-2xl h-12 shadow-lg ${currentVariant.btnClass || ""}`}
              onClick={onAction}
              isLoading={isLoading}
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
