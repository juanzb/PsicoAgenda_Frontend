import {
  X,
  AlertTriangle,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { ReactNode } from "react";

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

  // Mapeo de estilos por variante
  const variants = {
    danger: {
      icon: <AlertCircle className="text-destructive" size={24} />,
      bgIcon: "bg-destructive/10",
      btn: "bg-destructive hover:bg-destructive/90 text-white shadow-destructive/20",
    },
    warning: {
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      bgIcon: "bg-amber-500/10",
      btn: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20",
    },
    success: {
      icon: <CheckCircle2 className="text-primary" size={24} />,
      bgIcon: "bg-primary/10",
      btn: "bg-primary hover:bg-primary/90 text-white shadow-primary/20",
    },
    info: {
      icon: <Info className="text-blue-500" size={24} />,
      bgIcon: "bg-blue-500/10",
      btn: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20",
    },
  };

  const currentVariant = variants[variant];

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
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-6 py-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted rounded-2xl transition-all border border-border disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={onAction}
              disabled={isLoading}
              className={`flex-1 px-6 py-3 text-sm font-bold rounded-2xl transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 ${currentVariant.btn}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                actionLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
