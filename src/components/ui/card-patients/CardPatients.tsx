import { Phone, Mail, ExternalLink, ChevronRight } from "lucide-react";
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
  const initial = patient.name.charAt(0).toUpperCase();

  const statusColors = {
    active: "bg-emerald-500",
    completed: "bg-blue-500",
    "on-hold": "bg-amber-500",
  };

  return (
    <Card
      className={`group relative border-border/40 transition-all duration-300 overflow-hidden cursor-pointer ${
        isSelected
          ? "border-primary bg-primary/3 shadow-sm"
          : "hover:border-primary/20 hover:bg-muted/30"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 p-2.5 px-4">
        {/* Identificador con Inicial (Ergonómico) */}
        <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
              <span className="text-sm font-black text-primary">{initial}</span>
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColors[patient.status]}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate">
              {patient.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                {patient.age} años
              </span>
              <span className="text-[10px] text-muted-foreground/40 sm:hidden lg:inline">
                •
              </span>
              <div className="hidden sm:flex lg:flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <Phone size={10} className="text-primary/40" /> {patient.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Datos de Contacto (Solo Desktop) */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail size={12} className="text-primary/40" />
            <span className="text-xs font-medium truncate max-w-50">
              {patient.email}
            </span>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 flex justify-end items-center gap-3">
          <Button
            variant={isSelected ? "primary" : "ghost"}
            size="sm"
            className="rounded-xl font-bold h-9 px-4 group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(patient);
            }}
          >
            Detalle
            <ExternalLink
              size={14}
              className={`ml-2 transition-transform ${isSelected ? "scale-110" : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"}`}
            />
          </Button>
          <ChevronRight
            size={16}
            className={`text-muted-foreground/30 transition-transform hidden sm:block ${isSelected ? "translate-x-1 text-primary" : "group-hover:translate-x-1"}`}
          />
        </div>
      </div>
    </Card>
  );
}
