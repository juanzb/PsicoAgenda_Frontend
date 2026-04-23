import { Calendar as CalendarIcon, Clock, MoreVertical, Play, ChevronRight, Stethoscope } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../../ui/button/Button";
import { Card } from "../../ui/card/Card";

export interface IAppointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorId: string;
  doctorName?: string;
  time: string;
  date: string;
  type: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface CardAppointmentProps {
  appointment: IAppointment;
  onStartSession: (id: string, name: string) => void;
  onOpenDetail: (appointment: IAppointment) => void;
}

export function CardAppointment({
  appointment,
  onStartSession,
  onOpenDetail,
}: CardAppointmentProps): ReactNode {
  const initial = appointment.patientName.charAt(0).toUpperCase();
  const isCompleted = appointment.status === "completed";

  return (
    <Card
      className={`group relative border-border/40 transition-all duration-300 overflow-hidden cursor-pointer rounded-md hover:border-primary/20 hover:bg-muted/30`}
      onClick={() => onOpenDetail(appointment)}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 p-2.5 px-4">
        {/* Identificador con Inicial */}
        <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/10">
              <span className="text-sm font-black text-primary">{initial}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
              {appointment.patientName}
            </h3>
            <div className="flex items-center gap-3 mt-0.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tight">
               <span className="flex items-center gap-1"><CalendarIcon size={10} className="text-primary/40" /> {appointment.date}</span>
               <span className="flex items-center gap-1"><Clock size={10} className="text-primary/40" /> {appointment.time}</span>
            </div>
          </div>
        </div>

        {/* Info de la Cita (Solo Desktop) */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Stethoscope size={12} className="text-primary/40" />
            <span className="text-xs font-medium truncate max-w-40">
              {appointment.type}
            </span>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 flex justify-end items-center gap-2">
          <Button
            size="sm"
            className={`h-8 rounded-sm text-[9px] font-black uppercase tracking-widest px-4 transition-all duration-300 ${
              isCompleted
                ? "bg-muted text-muted-foreground border-border/40 cursor-not-allowed opacity-60"
                : "gradient-primary shadow-md shadow-primary/10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isCompleted) onStartSession(appointment.patientId, appointment.patientName);
            }}
            disabled={isCompleted}
            icon={<Play size={10} className={isCompleted ? "text-muted-foreground" : "fill-white"} />}
          >
            {isCompleted ? "Atendida" : "Atender"}
          </Button>

          <button 
            className="p-2 text-muted-foreground hover:bg-muted rounded-md transition-all"
            onClick={(e) => {
                e.stopPropagation();
                // Opciones adicionales si se requieren
            }}
          >
            <MoreVertical size={16} />
          </button>
          
          <ChevronRight
            size={16}
            className="text-muted-foreground/30 transition-transform hidden sm:block group-hover:translate-x-1"
          />
        </div>
      </div>
    </Card>
  );
}
