import {
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../../ui/button/Button";
import { Card } from "../../ui/card/Card";

export interface IDoctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: number;
  status: "active" | "inactive" | "on-vacation";
  avatarUrl?: string;
}

interface CardDoctorsProps {
  doctor: IDoctor;
  isSelected?: boolean;
  onOpenDetail: (doctor: IDoctor) => void;
}

export function CardDoctors({
  doctor,
  isSelected,
  onOpenDetail,
}: CardDoctorsProps): ReactNode {
  const initial = doctor.name.charAt(0).toUpperCase();

  const statusColors = {
    active: "bg-emerald-500",
    inactive: "bg-rose-500",
    "on-vacation": "bg-amber-500",
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
        {/* Identificador con Inicial */}
        <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center border border-primary/10">
              <span className="text-sm font-black text-primary">{initial}</span>
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColors[doctor.status]}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate">
              {doctor.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                {doctor.specialty}
              </span>
              <span className="text-[10px] text-muted-foreground/40 sm:hidden lg:inline">
                •
              </span>
              <div className="hidden sm:flex lg:flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <GraduationCap size={10} className="text-primary/40" />{" "}
                {doctor.experience} años exp.
              </div>
            </div>
          </div>
        </div>

        {/* Datos de Contacto (Solo Desktop) */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail size={12} className="text-primary/40" />
            <span className="text-xs font-medium truncate max-w-50">
              {doctor.email}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone size={12} className="text-primary/40" />
            <span className="text-xs font-medium truncate">{doctor.phone}</span>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 flex justify-end items-center gap-3">
          <Button
            variant={isSelected ? "primary" : "ghost"}
            size="sm"
            className="rounded-md font-bold h-9 px-4 group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(doctor);
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
