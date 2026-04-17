import { User, Mail, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../button/Button";
import { Card } from "../card/Card";

export interface IPatient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment?: string;
  status: "active" | "completed" | "on-hold";
  avatarUrl?: string;
  age: number;
}

interface CardPatientsProps {
  patient: IPatient;
  isSelected?: boolean;
  onOpenDetail: (patient: IPatient) => void;
}

export function CardPatients({
  patient,
  isSelected,
  onOpenDetail,
}: CardPatientsProps): ReactNode {
  const statusColors = {
    active: "bg-emerald-500",
    completed: "bg-blue-500",
    "on-hold": "bg-amber-500",
  };

  return (
    <Card
      className={`group relative border-border/40 transition-all duration-300 overflow-hidden ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "hover:border-primary/30 hover:shadow-sm"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 p-3 px-4">
        {/* Identificación Básica */}
        <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden border border-border/50">
              {patient.avatarUrl ? (
                <img
                  src={patient.avatarUrl}
                  alt={patient.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                  <User size={18} />
                </div>
              )}
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusColors[patient.status]}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate">
              {patient.name}
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
              {patient.age} años • {patient.phone}
            </p>
          </div>
        </div>

        {/* Datos de Contacto rápidos (Solo Desktop) */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail size={12} className="text-primary/40" />
            <span className="text-xs w-auto font-medium truncate text-muted-foreground">
              {patient.email}
              jkvbasiksdv
            </span>
          </div>
        </div>

        {/* Botón de Detalle al final */}
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 flex justify-end">
          <Button
            variant={isSelected ? "primary" : "ghost"}
            size="sm"
            className="rounded-xl font-bold h-9 px-4 group/btn"
            onClick={() => onOpenDetail(patient)}
          >
            Detalle
            <ExternalLink
              size={14}
              className={`ml-2 transition-transform ${isSelected ? "scale-110" : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"}`}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
}
